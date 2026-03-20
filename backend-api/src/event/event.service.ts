import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createEventDto: CreateEventDto) {
        const event = await this.prisma.event.create({
            data: {
                projectId: BigInt(createEventDto.projectId),
                channelAccountId: createEventDto.channelAccountId
                    ? BigInt(createEventDto.channelAccountId)
                    : null,
                eventType: createEventDto.eventType,
                visitorId: createEventDto.visitorId,
                pageUrl: createEventDto.pageUrl,
                referrer: createEventDto.referrer,
            },
        });

        return {
            ...event,
            id: event.id.toString(),
            projectId: event.projectId.toString(),
            channelAccountId: event.channelAccountId
                ? event.channelAccountId.toString()
                : null,
        };
    }

    async findAll() {

        const events = await this.prisma.event.findMany(({
            orderBy: { id: 'desc' },
            include: {
                project: true,
                channelAccount: true,
            },
        }));

        return events.map(event => ({
            ...event,
            id: event.id.toString(),
            projectId: event.projectId.toString(),
            channelAccountId: event.channelAccountId
                ? event.channelAccountId.toString()
                : null,
            project: event.project
                ? {
                    ...event.project,
                    id: event.project.id.toString(),
                    userId: event.project.userId.toString(),
                }
                : null,
            channelAccount : event.channelAccount
                ? {
                    ...event.channelAccount,
                    id: event.channelAccount.id.toString(),
                    projectId: event.channelAccount.projectId.toString(),
                }
                : null,
        }));

    }
}