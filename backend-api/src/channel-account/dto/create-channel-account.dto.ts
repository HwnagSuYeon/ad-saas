export class CreateChannelAccountDto {
    projectId: bigint;
    channelType: string;
    accountName: string;
    externalAccountId?: string;
}