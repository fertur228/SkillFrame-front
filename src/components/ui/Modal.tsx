import { PropsWithChildren } from 'react';
import { clsx } from 'clsx';

interface ModalProps {
  open: boolean;
  title?: string;
  onClose?: () => void;
}

export const Modal = ({ open, title, onClose, children }: PropsWithChildren<ModalProps>) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-xl">
        <div className={clsx('flex items-center justify-between border-b border-slate-200 px-4 py-3')}>
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close modal" className="text-slate-500 hover:text-slate-700">
            ×
          </button>
        </div>
        <div className="px-4 py-3">{children}</div>
      </div>
    </div>
  );
};
