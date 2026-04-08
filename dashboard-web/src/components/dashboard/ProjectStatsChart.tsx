import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import type { ProjectStat } from '../../types/stats';

type ProjectStatsChartProps = {
    data: ProjectStat[];
};

export default function ProjectStatsChart({ data }: ProjectStatsChartProps) {
    const chartData = data.map((item) => ({
        projectName: item.projectName,
        count: item.count,
    }));

    return (
        <div
            style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
            }}
        >

            <div style={{ width: '100%', height: 320 }}>
                <ResponsiveContainer>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="projectName" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#94a3b8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}