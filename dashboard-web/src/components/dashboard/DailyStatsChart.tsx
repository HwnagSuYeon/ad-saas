import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import type { DailyStat } from '../../types/stats';

type DailyStatsChartProps = {
    data: DailyStat[];
};

export default function DailyStatsChart({ data }: DailyStatsChartProps) {
    const chartData = data.map((item) => ({
        date: formatChartDate(item.date),
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
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

function formatChartDate(dateString: string) {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${month}/${day}`;
}