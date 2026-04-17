import Button from './Button';

export default function EmptyState({ title, description, actionLabel }) {
  return (
    <div className="c_empty-state">
      <div className="c_empty-state__orb" />
      <h3>{title}</h3>
      <p>{description}</p>
      {actionLabel ? <Button>{actionLabel}</Button> : null}
    </div>
  );
}

