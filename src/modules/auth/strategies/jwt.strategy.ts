import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { jwtSecret } from 'src/core/utils/constants';

/**
 * Implements a JWT authentication strategy for Passport.
 * This strategy is used to authenticate requests using a JWT token.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT,
            ]),
            secretOrKey: jwtSecret,
        });
    }

    /**
     * Extracts the JWT token from the request cookies.
     * @param req The incoming request object.
     * @returns The extracted JWT token if found, otherwise null.
     */
    private static extractJWT(req: Request): string | null {
        if (req.cookies && 'token' in req.cookies) {
            return req.cookies.token;
        }
        return null;
    }

    /**
     * Validates the payload extracted from the JWT token.
     * @param payload The payload extracted from the JWT token.
     * @returns The validated payload.
     */
    async validate(payload: { id: string; email: string }) {
        return payload;
    }
}
