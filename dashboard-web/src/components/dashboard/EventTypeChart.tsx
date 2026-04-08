import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import type { EventTypeStat } from '../../types/stats';

type EventTypeChartProps = {
    data: EventTypeStat[];
};

const COLORS = ['#94a3b8', '#cbd5e1', '#64748b', '#e2e8f0'];

export default function EventTypeChart({ data }: EventTypeChartProps) {
    const chartData = data.map((item) => ({
        name: item.eventType,
        value: item.count,
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

            <div style={{ width: '100%', height: 340 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={110}
                            label
                        >
                            {chartData.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}