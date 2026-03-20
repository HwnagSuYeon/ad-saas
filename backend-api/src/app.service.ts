import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createTestUser() {
    const user = await this.prisma.user.create({
      data: {
        email: `test${Date.now()}@example.com`,
        name: 'Suyeon',
      },
    });

    return {
      ...user,
      id: user.id.toString(),
    };
  }

  async getUsers() {
    const users = await this.prisma.user.findMany({
      orderBy: { id: 'desc' },
    });

    return users.map((user) => ({
      ...user,
      id: user.id.toString(),
    }));
  }
}