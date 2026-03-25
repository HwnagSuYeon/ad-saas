import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
    constructor(private readonly prisma: PrismaService) {}

    // BigInt 처리 공통함수
    private seriallizeEvent(event: any){
        return {
            ...event,
            id: event.id.toString(),
            projectId: event.projectId.toString(),
            channelAccountId: event.channelAccountId?.toString() ?? null,
        };
    }


    async create(createEventDto: CreateEventDto) {
        // project존재 확인
        const project = await this.prisma.project.findUnique({
            where: { id: BigInt(createEventDto.projectId) },
        });

        if (!project) {
            throw new NotFoundException('Project not found');
        }

        // channelAccount 존재 확인
        if (createEventDto.channelAccountId) {
            const channelAccount = await this.prisma.channelAccount.findUnique({
                where: { id: BigInt(createEventDto.channelAccountId) },
            });

            if (!channelAccount) {
                throw new NotFoundException('Channel account not found');
            }
        }

        // event 반환
        const event = await this.prisma.event.create({
            data: {
                projectId: BigInt(createEventDto.projectId),
                channelAccountId: createEventDto.channelAccountId
                    ? BigInt(createEventDto.channelAccountId)
                    : null,
                eventType: createEventDto.eventType,
                visitorId: createEventDto.visitorId ?? null,
                pageUrl: createEventDto.pageUrl,
                referrer: createEventDto.referrer ?? null,
                occurredAt: createEventDto.occurredAt
                    ? new Date(createEventDto.occurredAt)
                    : undefined,
            },
        });

        return this.seriallizeEvent(event);
    }

    async findAll() {

        const events = await this.prisma.event.findMany(({
            orderBy: { id: 'desc' },
        }));

        return events.map((event) => this.seriallizeEvent(event));
    }

    // 이벤트타입별 집계
    async  getStatsByType() {
        const stats = await this.prisma.event.groupBy({
           by: ['eventType'],
           _count: {
               eventType: true,
           },
           orderBy : {
               _count :{
                   eventType: 'desc',
               }
           }
        });

        return stats.map((item) => ({
            eventType: item.eventType,
            count: item._count.eventType
        }));
    }

    // 프로젝트별 이벤트수 집계
    async getStatsByProjects(){
        const stats = await this.prisma.event.groupBy({
            by: ['projectId'],
            _count: {
                projectId: true,
            },
            orderBy: {
                _count: {
                    projectId: 'desc'
                }
            }
        });

        // 프로젝트 아이디로 이름을 가져온다
        const projectIds = stats.map((item) => item.projectId);

        const projects = await this.prisma.project.findMany({
            where : {
                id: {
                    in : projectIds
                }
            },
            select: {
                id: true,
                name: true
            }
        });

        const projectNameMap = new Map(
            projects.map((project) => [project.id.toString(), project.name])
        )

        return stats.map((item) => ({
            projectId: item.projectId.toString(),
            projectName : projectNameMap.get(item.projectId.toString()) ?? null,
            count: item._count.projectId
        }));
    }

    // 날짜별 이벤트 수 집계
    /*async getDailyStats(){
        // 날짜가 같고 시간대가 다르면 같은 datetime으로 인식하므로 날짜만 잘라서 사용하기 위해 rawSQL방식으로 가져온다
        const stats = await this.prisma.$queryRaw<
            Array< {date: Date; count: bigint} >
        >'';
    }*/
}