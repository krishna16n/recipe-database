import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from 'src/core/utils/constants';
import { Request, Response } from 'express';

/**
 * Service responsible for handling authentication-related operations.
 */
@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    /**
     * Registers a new user with the provided credentials.
     * @param dto The data transfer object containing signup information.
     * @returns A success message upon successful signup.
     * @throws BadRequestException if the provided email already exists.
     */
    async signup(dto: AuthDto) {
        const { email, password } = dto;

        // Check if the email already exists in the database
        const foundUser = await this.prisma.user.findUnique({ where: { email } });

        // Throw a BadRequestException if the email already exists
        if (foundUser) {
            throw new BadRequestException('Email already exists');
        }

        // Hash the provided password
        const hashedPassword = await this.hashPassword(password);

        // Create a new user with the email and hashed password
        await this.prisma.user.create({
            data: {
                email,
                hashedPassword
            }
        });

        // Return a success message
        return { message: 'success' };
    }

    /**
     * Authenticates a user with the provided credentials.
     * @param dto The data transfer object containing signin information.
     * @param req The incoming request object.
     * @param res The outgoing response object.
     * @returns A success message upon successful signin.
     * @throws BadRequestException if the provided credentials are invalid.
     * @throws ForbiddenException if signing the token fails.
     */
    async signin(dto: AuthDto, req: Request, res: Response) {
        const { email, password } = dto;

        // Find the user with the provided email
        const foundUser = await this.prisma.user.findUnique({ where: { email } });

        // Throw a BadRequestException if no user is found with the provided email
        if (!foundUser) {
            throw new BadRequestException('Invalid credentials');
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await this.comparePasswords({ password, hash: foundUser.hashedPassword });

        // Throw a BadRequestException if the password is invalid
        if (!isMatch) {
            throw new BadRequestException('Invalid password');
        }

        // Sign a JWT token with the user ID and email
        const token = await this.signToken({ id: foundUser.id, email: foundUser.email });

        // Throw a ForbiddenException if signing the token fails
        if (!token) {
            throw new ForbiddenException();
        }

        // Remove the hashed password from the user object before returning
        delete foundUser.hashedPassword;

        // Set the token in a cookie and send a success message
        res.cookie('token', token, {
            httpOnly: true,
        });

        return res.send({ message: 'Logged in', user: foundUser});
    }

    /**
     * Logs out the currently signed-in user.
     * @param req The incoming request object.
     * @param res The outgoing response object.
     * @returns A success message upon successful signout.
     */
    async signout(req: Request, res: Response) {
        // Clear the token cookie and send a success message
        res.clearCookie('token');
        return res.send({ message: 'Logged out' });
    }

    /**
     * Hashes a password using bcrypt.
     * @param password The password to be hashed.
     * @returns The hashed password.
     */
    async hashPassword(password: string) {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }

    /**
     * Compares a plain password with a hashed password.
     * @param args The arguments containing the plain password and hashed password.
     * @returns A boolean indicating whether the passwords match.
     */
    async comparePasswords(args: { password: string, hash: string }) {
        return await bcrypt.compare(args.password, args.hash);
    }

    /**
     * Signs a JWT token for the provided payload.
     * @param args The arguments containing the user ID and email.
     * @returns The signed JWT token.
     */
    async signToken(args: { id: string, email: string }) {
        const payload = args;
        return await this.jwtService.signAsync(payload, { secret: jwtSecret });
    }
}
