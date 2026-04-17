import { createContext, useState } from 'react';
import ToastContainer from '../components/common/ToastContainer';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const pushToast = (message, tone = 'info') => {
    const id = crypto.randomUUID();
    setToasts(current => [...current, { id, message, tone }]);
    window.setTimeout(() => {
      setToasts(current => current.filter(item => item.id !== id));
    }, 3200);
  };

  const value = {
    toast: pushToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
}

export default ToastContext;
