export default function Avatar({ initials = 'HS', size = 'md' }) {
  return <span className={`c_avatar c_avatar--${size}`}>{initials}</span>;
}

