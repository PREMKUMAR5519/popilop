import clsx from 'clsx';

export default function Button({ children, className, variant = 'primary', size = 'md', ...props }) {
  return (
    <button className={clsx('c_button', `c_button--${variant}`, `c_button--${size}`, className)} {...props}>
      {children}
    </button>
  );
}

