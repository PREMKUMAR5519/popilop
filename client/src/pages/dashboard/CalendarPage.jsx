import Card from '../../components/common/Card';
import { useAppData } from '../../hooks/useAppData';

export default function CalendarPage() {
  const { scheduler } = useAppData();
  const hasPosts = scheduler && scheduler.length > 0;

  return (
    <Card>
      <p className="c_eyebrow">Content calendar</p>
      <h2>Month / week view scaffold</h2>
      <div className="c_calendar">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div key={day} className="c_calendar__cell c_calendar__cell--head">
            {day}
          </div>
        ))}
        {Array.from({ length: 14 }, (_, index) => {
          const post = hasPosts ? scheduler[index % scheduler.length] : null;
          return (
            <div key={index} className="c_calendar__cell">
              <span className="c_calendar__date">{index + 10}</span>
              {post ? <div className="c_calendar__event">{post.title}</div> : null}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
