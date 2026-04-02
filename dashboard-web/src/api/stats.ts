import {api} from './client';
import type {
    DailyStat,
    ProjectStat,
    ChannelStat,
    EventTypeStat
} from '../types/stats';

// 날짜별 이벤트수 집계 호출
export const getDailyStats = async (): Promise<DailyStat[]> => {
    const res = await api.get('/events/stats/by-daily');
    return res.data;
}

// 프로젝트별 이벤트수 집계 호출
export const getProjectStats = async (): Promise<ProjectStat[]> => {
    const res = await api.get('/events/stats/by-project');
    return res.data;
}

// 채널별 이벤트수 집계 호출
export const getChannelStats = async (): Promise<ChannelStat[]> => {
    const res = await api.get('/events/stats/by-channel');
    return res.data;
}

// 이벤트타입별 이벤트수 집계 호출
export const getTypeStats = async (): Promise<EventTypeStat[]> => {
    const res = await api.get('/events/stats/by-type');
    return res.data;
}