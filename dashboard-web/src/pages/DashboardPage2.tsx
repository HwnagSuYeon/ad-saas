import { useEffect, useMemo, useState } from 'react';
import DailyStatsChart from '../components/dashboard/DailyStatsChart';
import ProjectStatsChart from '../components/dashboard/ProjectStatsChart';
import ChannelStatsChart from '../components/dashboard/ChannelStatsChart';
import EventTypeChart from '../components/dashboard/EventTypeChart';

type DailyStat = {
    date: string;
    count: number;
};

type ProjectStat = {
    projectId: string;
    projectName: string | null;
    count: number;
};

type ChannelStat = {
    channelAccountId: string;
    projectId: string;
    projectName: string | null;
    channelType: string | null;
    accountName: string | null;
    count: number;
};

type EventTypeStat = {
    eventType: string | null;
    count: number;
};

export default function DashboardPage() {
    const [daily, setDaily] = useState<DailyStat[]>([]);
    const [projects, setProjects] = useState<ProjectStat[]>([]);
    const [channels, setChannels] = useState<ChannelStat[]>([]);
    const [types, setTypes] = useState<EventTypeStat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllStats = async () => {
            try {
                const [dailyRes, projectRes, channelRes, typeRes] = await Promise.all([
                    fetch('http://localhost:3000/events/stats/by-daily'),
                    fetch('http://localhost:3000/events/stats/by-project'),
                    fetch('http://localhost:3000/events/stats/by-channel'),
                    fetch('http://localhost:3000/events/stats/by-type'),
                ]);

                const [dailyData, projectData, channelData, typeData] = await Promise.all([
                    dailyRes.json(),
                    projectRes.json(),
                    channelRes.json(),
                    typeRes.json(),
                ]);

                setDaily(dailyData);
                setProjects(projectData);
                setChannels(channelData);
                setTypes(typeData);
            } catch (error) {
                console.error('대시보드 데이터 조회 실패:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllStats();
    }, []);

    const totalEventCount = useMemo(() => {
        return daily.reduce((sum, item) => sum + item.count, 0);
    }, [daily]);

    const projectCount = useMemo(() => {
        return projects.length;
    }, [projects]);

    const channelCount = useMemo(() => {
        return channels.length;
    }, [channels]);

    const eventTypeCount = useMemo(() => {
        return types.length;
    }, [types]);

    const groupedChannels = useMemo(() => {
        const map = new Map<string, ChannelStat[]>();

        channels.forEach((item) => {
            const projectName = item.projectName ?? 'No Project Name';

            if (!map.has(projectName)) {
                map.set(projectName, []);
            }

            map.get(projectName)!.push(item);
        });

        return Array.from(map.entries()).map(([projectName, items]) => ({
            projectName,
            items: [...items].sort((a, b) => b.count - a.count),
        }));
    }, [channels]);

    if (loading) {
        return <div style={{ padding: '24px' }}>Loading...</div>;
    }

    return (
        <div
            style={{
                padding: '24px',
                backgroundColor: '#f8fafc',
                minHeight: '100vh',
            }}
        >
            <h1
                style={{
                    fontSize: '28px',
                    fontWeight: 800,
                    marginBottom: '24px',
                    color: '#111827',
                }}
            >
                Event Dashboard
            </h1>

            {/* summary cards */}
            <section
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '16px',
                    marginBottom: '24px',
                }}
            >
                <SummaryCard title="전체 이벤트 수" value={totalEventCount} />
                <SummaryCard title="프로젝트 수" value={projectCount} />
                <SummaryCard title="채널 계정 수" value={channelCount} />
                <SummaryCard title="이벤트 타입 수" value={eventTypeCount} />
            </section>

            {/* chart grid */}
            <section
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
                    gap: '20px',
                    marginBottom: '24px',
                }}
            >
                <DashboardCard title="일자별 이벤트 수">
                    <DailyStatsChart data={daily} />
                </DashboardCard>

                <DashboardCard title="이벤트 타입별 수">
                    <EventTypeChart data={types} />
                </DashboardCard>

                <DashboardCard title="프로젝트별 이벤트 수">
                    <ProjectStatsChart data={projects} />
                </DashboardCard>

                <DashboardCard title="채널별 이벤트 수">
                    <ChannelStatsChart data={channels} />
                </DashboardCard>
            </section>

            {/* grouped channel list */}
            <section>
                <DashboardCard title="프로젝트별 채널 상세">
                    <div style={{ marginTop: '4px' }}>
                        {groupedChannels.length === 0 ? (
                            <div
                                style={{
                                    padding: '16px',
                                    color: '#6b7280',
                                }}
                            >
                                데이터가 없습니다.
                            </div>
                        ) : (
                            groupedChannels.map((group) => (
                                <div
                                    key={group.projectName}
                                    style={{
                                        marginBottom: '20px',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        backgroundColor: '#ffffff',
                                    }}
                                >
                                    <div
                                        style={{
                                            padding: '14px 16px',
                                            fontWeight: 700,
                                            fontSize: '15px',
                                            backgroundColor: '#f9fafb',
                                            borderBottom: '1px solid #e5e7eb',
                                            color: '#111827',
                                        }}
                                    >
                                        {group.projectName}
                                    </div>

                                    {group.items.map((item, index) => (
                                        <div
                                            key={item.channelAccountId}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '12px 16px',
                                                borderBottom:
                                                    index === group.items.length - 1 ? 'none' : '1px solid #f1f5f9',
                                            }}
                                        >
                      <span style={{ color: '#374151' }}>
                        {item.channelType ?? 'Unknown'} /{' '}
                          {item.accountName ?? 'No Account Name'}
                      </span>
                                            <strong style={{ color: '#111827' }}>{item.count}</strong>
                                        </div>
                                    ))}
                                </div>
                            ))
                        )}
                    </div>
                </DashboardCard>
            </section>
        </div>
    );
}

type SummaryCardProps = {
    title: string;
    value: number;
};

function SummaryCard({ title, value }: SummaryCardProps) {
    return (
        <div
            style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
            }}
        >
            <div
                style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    marginBottom: '8px',
                }}
            >
                {title}
            </div>
            <div
                style={{
                    fontSize: '28px',
                    fontWeight: 800,
                    color: '#111827',
                }}
            >
                {value}
            </div>
        </div>
    );
}

type DashboardCardProps = {
    title: string;
    children: React.ReactNode;
};

function DashboardCard({ title, children }: DashboardCardProps) {
    return (
        <div
            style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
            }}
        >
            <h2
                style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#111827',
                    marginBottom: '16px',
                }}
            >
                {title}
            </h2>
            {children}
        </div>
    );
}