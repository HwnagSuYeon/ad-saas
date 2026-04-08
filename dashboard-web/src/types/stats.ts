export interface DailyStat{
    date: string;
    count: number;
}

export interface ProjectStat {
    projectId: string;
    projectName: string;
    count: number;
}

export interface ChannelStat{
    channelAccountId: string;
    channelType: string | null;
    accountName: string | null;
    projectId: string | null;
    projectName: string | null;
    count: number;
}

export interface EventTypeStat {
    eventType: string;
    count: number;
}