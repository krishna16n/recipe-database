import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

/**
 * Service responsible for handling user-related operations.
 */
@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    /**
     * Retrieves a user by ID.
     * @param id The ID of the user to retrieve.
     * @param req The incoming request object.
     * @returns The user with the specified ID.
     * @throws NotFoundException if the user with the specified ID is not found.
     * @throws ForbiddenException if the authenticated user does not have permission to access the user's information.
     */
    async getUser(id: string, req: Request) {
        // Retrieve the user from the database based on the provided ID
        const user = await this.prisma.user.findUnique({ where: { id } });

        // Throw a NotFoundException if no user is found with the provided ID
        if (!user) {
            throw new NotFoundException();
        }

        // Extract the authenticated user from the request
        const decodedUser = req.user as { id: string, email: string };

        // Throw a ForbiddenException if the authenticated user does not have permission to access the user's information
        if (user.id !== decodedUser.id) {
            throw new ForbiddenException();
        }

        // Remove the hashed password from the user object before returning
        delete user.hashedPassword;

        // Return the user object
        return { user };
    }

    /**
     * Retrieves all users.
     * @returns An array of all users with only their IDs and emails.
     */
    async getUsers() {
        // Retrieve all users from the database, selecting only their IDs and emails
        return await this.prisma.user.findMany({
            select: {
                id: true, email: true
            }
        });
    }
}
