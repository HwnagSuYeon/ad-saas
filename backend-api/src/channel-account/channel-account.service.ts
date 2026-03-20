import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChannelAccountDto } from './dto/create-channel-account.dto';

@Injectable()
export class ChannelAccountService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createChannelAccountDto: CreateChannelAccountDto) {
        const channelAccount = await this.prisma.channelAccount.create({
            data: {
                projectId: BigInt(createChannelAccountDto.projectId),
                channelType: createChannelAccountDto.channelType,
                accountName: createChannelAccountDto.accountName,
                externalAccountId: createChannelAccountDto.externalAccountId,
            },
        });

        return {
            ...channelAccount,
            id: channelAccount.id.toString(),
            projectId: channelAccount.projectId.toString(),
        };
    }

    async findAll() {
        const channelAccounts = await this.prisma.channelAccount.findMany({
            orderBy: { id: 'desc' },
            include: { project: true },
        });

        return channelAccounts.map((channelAccount) => ({
            ...channelAccount,
            id: channelAccount.id.toString(),
            projectId: channelAccount.projectId.toString(),
            project: channelAccount.project
                ? {
                    ...channelAccount.project,
                    id: channelAccount.project.id.toString(),
                    userId: channelAccount.project.userId.toString(),
                }
                : null,
        }));
    }
}
