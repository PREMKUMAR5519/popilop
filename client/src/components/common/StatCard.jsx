import Card from './Card';

export default function StatCard({ label, value, delta, tone }) {
  return (
    <Card className={`c_stat-card ${tone ? `c_stat-card--${tone}` : ''}`}>
      <p className="c_overline">{label}</p>
      <div className="c_stat-card__value-row">
        <h3>{value}</h3>
        {delta ? <span className="c_delta">{delta}</span> : null}
      </div>
    </Card>
  );
}

