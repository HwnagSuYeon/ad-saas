import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import type { ChannelStat } from '../../types/stats';

type ChannelStatsChartProps = {
    data: ChannelStat[];
};

export default function ChannelStatsChart({ data }: ChannelStatsChartProps) {
    const chartData = data.map((item) => ({
        name: `${item.channelType ?? 'Unknown'} / ${item.accountName ?? 'No Account'}`,
        count: item.count,
    }));

    const chartHeight = Math.max(320, chartData.length * 55);

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

            <div style={{ width: '100%', height: chartHeight }}>
                <ResponsiveContainer>
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ top: 8, right: 24, left: 24, bottom: 8 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" allowDecimals={false} />
                        <YAxis
                            type="category"
                            dataKey="name"
                            width={260}
                        />
                        <Tooltip />
                        <Bar dataKey="count" fill="#6b7280" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}