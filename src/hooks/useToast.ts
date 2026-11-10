import { useContext } from 'react';
import { ToastContext, ToastContextType, ToastType } from '../context/ToastContext';

export type { ToastType };

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
