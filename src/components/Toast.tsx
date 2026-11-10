import React from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useToast, ToastType } from '../hooks/useToast';

const getToastConfig = (type: ToastType) => {
  switch (type) {
    case 'success':
      return {
        icon: <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />,
        bg: 'bg-[#061811]/95 border-emerald-500/40 text-emerald-100',
        progressBar: 'bg-emerald-400',
      };
    case 'error':
      return {
        icon: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />,
        bg: 'bg-[#1a0808]/95 border-rose-500/40 text-rose-100',
        progressBar: 'bg-rose-400',
      };
    case 'warning':
      return {
        icon: <AlertTriangle className="w-5 h-5 text-[#C2A878] shrink-0 mt-0.5" />,
        bg: 'bg-[#181308]/95 border-[#C2A878]/40 text-[#F5E6CC]',
        progressBar: 'bg-[#C2A878]',
      };
    case 'info':
    default:
      return {
        icon: <Info className="w-5 h-5 text-[#9986B3] shrink-0 mt-0.5" />,
        bg: 'bg-[#120f18]/95 border-[#9986B3]/40 text-[#E8E1F0]',
        progressBar: 'bg-[#9986B3]',
      };
  }
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Notifications"
      aria-live="polite"
      className="fixed top-4 right-4 left-4 sm:left-auto sm:w-96 z-[9999] flex flex-col gap-2.5 pointer-events-none"
    >
      {toasts.map((toast) => {
        const config = getToastConfig(toast.type);
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto relative overflow-hidden rounded-xl border p-4 shadow-2xl backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-top-2 sm:slide-in-from-right-4 ${config.bg}`}
          >
            <div className="flex items-start gap-3">
              {config.icon}
              <div className="flex-1 pr-2">
                {toast.title && (
                  <h4 className="text-xs font-semibold tracking-wider uppercase font-sans mb-1 text-white/90">
                    {toast.title}
                  </h4>
                )}
                <p className="text-xs leading-relaxed text-white/80 font-sans">{toast.message}</p>
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-white/40 hover:text-white transition-colors p-1 -mr-1 -mt-1 rounded-md"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
