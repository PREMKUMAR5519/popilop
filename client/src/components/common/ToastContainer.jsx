export default function ToastContainer({ toasts }) {
  return (
    <div className="c_toast-stack">
      {toasts.map(toast => (
        <div key={toast.id} className={`c_toast c_toast--${toast.tone}`}>
          {toast.message}
        </div>
      ))}
    </div>
  );
}

