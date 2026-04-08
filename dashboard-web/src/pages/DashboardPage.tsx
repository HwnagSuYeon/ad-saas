import { useEffect, useState } from 'react';
import {
    getDailyStats,
    getProjectStats,
    getChannelStats,
    getTypeStats,
} from '../api/stats';
import type {
    DailyStat,
    ProjectStat,
    ChannelStat,
    EventTypeStat,
} from '../types/stats';

export default function DashboardPage() {
    const [daily, setDaily] = useState<DailyStat[]>([]);
    const [projects, setProjects] = useState<ProjectStat[]>([]);
    const [channels, setChannels] = useState<ChannelStat[]>([]);
    const [types, setTypes] = useState<EventTypeStat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [dailyData, projectData, channelData, typeData] = await Promise.all([
                    getDailyStats(),
                    getProjectStats(),
                    getChannelStats(),
                    getTypeStats(),
                ]);

                setDaily(dailyData);
                setProjects(projectData);
                setChannels(channelData);
                setTypes(typeData);
            } catch (error) {
                console.error('통계 조회 실패:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div style={{ padding: '24px' }}>Loading...</div>;
    }

    return (
        <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '32px' }}>Analytics Dashboard</h1>

            <section style={{ marginBottom: '40px' }}>
                <h2>Daily Stats</h2>
                <div>
                    {daily.map((item) => (
                        <div
                            key={item.date}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '12px 16px',
                                borderBottom: '1px solid #ddd',
                                backgroundColor: '#fff',
                            }}
                        >
                            <span>{formatDate(item.date)}</span>
                            <strong>{item.count}</strong>
                        </div>
                    ))}
                </div>
            </section>

            <section style={{ marginBottom: '40px' }}>
                <h2>Project Stats</h2>
                <div>
                    {projects.map((item) => (
                        <div
                            key={item.projectId}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '12px 16px',
                                borderBottom: '1px solid #ddd',
                                backgroundColor: '#fff',
                            }}
                        >
                            <span>{item.projectName}</span>
                            <strong>{item.count}</strong>
                        </div>
                    ))}
                </div>
            </section>

            <section style={{ marginBottom: '40px' }}>
                <h2>Channel Stats</h2>
                <div>
                    {channels.map((item) => (
                        <div
                            key={item.channelAccountId}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '12px 16px',
                                borderBottom: '1px solid #ddd',
                                backgroundColor: '#fff',
                            }}
                        >
              <span>
                {item.projectName ?? 'No Project Name'} / {item.channelType ?? 'Unknown'} / {item.accountName ?? 'No Account Name'}
              </span>
                            <strong>{item.count}</strong>
                        </div>
                    ))}
                </div>
            </section>

            <section style={{ marginBottom: '40px' }}>
                <h2>Event Type Stats</h2>
                <div>
                    {types.map((item) => (
                        <div
                            key={item.eventType}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '12px 16px',
                                borderBottom: '1px solid #ddd',
                                backgroundColor: '#fff',
                            }}
                        >
                            <span>{item.eventType}</span>
                            <strong>{item.count}</strong>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

function formatDate(dateString: string) {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    return date.toLocaleDateString('ko-KR');
}