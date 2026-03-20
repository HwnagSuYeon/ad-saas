export class CreateEventDto {
    projectId: bigint;
    channelAccountId?: bigint;
    eventType: string;
    visitorId?: string;
    pageUrl: string;
    referrer?: string;
}