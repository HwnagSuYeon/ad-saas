type KpiCardProps = {
    title: string;
    value: number | string;
};

export default function KpiCard({ title, value }: KpiCardProps) {
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
                    fontSize: '32px',
                    fontWeight: 700,
                    color: '#111827',
                }}
            >
                {value}
            </div>
        </div>
    );
}