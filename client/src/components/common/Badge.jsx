import clsx from 'clsx';

export default function Badge({ children, tone = 'neutral' }) {
  return <span className={clsx('c_badge', `c_badge--${tone}`)}>{children}</span>;
}

