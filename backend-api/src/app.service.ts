import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  // test user 생성
  async createTestUser() {
    return this.prisma.user.create({
      data: {
        email: `test${Date.now()}@exmaple.com`,
        name: 'Suyeon',
      },
    });
  }

  async getUser() {
    return this.prisma.user.findMany({
      orderBy: {id: 'desc'},
    });
  }
}
