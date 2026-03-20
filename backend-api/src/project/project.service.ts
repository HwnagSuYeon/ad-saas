import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createProjectDto: CreateProjectDto) {
        const project = await this.prisma.project.create({
            data: {
                userId: BigInt(createProjectDto.userId),
                name: createProjectDto.name,
                domain: createProjectDto.domain,
            },
        });

        return {
            ...project,
            id: project.id.toString(),
            userId: project.userId.toString(),
        };
    }

    async findAll() {
        const projects = await this.prisma.project.findMany({
            orderBy: { id: 'desc' },
            include: {
                user: true,
                channelAccounts: true,
            },
        });

        return projects.map((project) => ({
            ...project,
            id: project.id.toString(),
            userId: project.userId.toString(),
            user: project.user
                ? {
                    ...project.user,
                    id: project.user.id.toString(),
                }
                : null,
            channelAccounts: project.channelAccounts.map((channel) => ({
                ...channel,
                id: channel.id.toString(),
                projectId: channel.projectId.toString(),
            })),
        }));
    }
}