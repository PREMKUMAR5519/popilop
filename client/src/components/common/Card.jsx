import clsx from 'clsx';

export default function Card({ children, className, padded = true }) {
  return <div className={clsx('c_card', { 'c_card--flush': !padded }, className)}>{children}</div>;
}

