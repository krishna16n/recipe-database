import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signup() {
        
        return { message: 'success' }
    }

    async signin() {
        return { message: 'success' }

    }

    async signout() {
        return { message: 'success' }

    }
}
