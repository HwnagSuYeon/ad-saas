import {useEffect, useState} from 'react';
import {
    getDailyStats,
    getProjectStats,
    getChannelStats,
    getTypeStats
} from '../api/stats';
import type {
    DailyStat,
    ProjectStat,
    ChannelStat,
    EventTypeStat
} from '../types/stats';

export default function DashboardPage() {
    const [daily, setDaily] = useState<DailyStat[]>([]);
    const [projects, setProjects] = useState<DailyStat[]>([]);
    const [channels, setChannels] = useState<ChannelStat[]>([]);
    const [types, setTypes] = useState<EventTypeStat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [dailyData, projectData, channelData, typeData] =
                    await Promise.all([
                        getDailyStats(),
                        getProjectStats(),
                        getChannelStats(),
                        getTypeStats()
                    ]);

                setDaily(dailyData);
                setProjects(projectData);
                setChannels(channelData);
                setTypes(typeData);

            } catch (error) {
                console.error('통계조회실패 : ', error)
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if(loading){
        return <div style={{padding:'24px'}}>Loading...</div>;
    }

    return(
      <div style={{padding: '24px'}}>
          <h1>Analytics Dashboard</h1>

          <h2>Daily Stats</h2>
          <pre>{JSON.stringify(daily, null, 2)}</pre>

          <h2>Project Stats</h2>
          <pre>{JSON.stringify(projects, null, 2)}</pre>

          <h2>Channel Stats</h2>
          <pre>{JSON.stringify(channels, null, 2)}</pre>

          <h2>Type Stats</h2>
          <pre>{JSON.stringify(types, null, 2)}</pre>
      </div>
    );
}