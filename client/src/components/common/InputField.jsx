export default function InputField({ label, textarea = false, ...props }) {
  const Element = textarea ? 'textarea' : 'input';

  return (
    <label className="c_field">
      <span>{label}</span>
      <Element className="c_input" {...props} />
    </label>
  );
}

