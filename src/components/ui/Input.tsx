import { forwardRef, InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => (
    <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
      {label && <span>{label}</span>}
      <input
        id={id}
        ref={ref}
        className={clsx(
          'rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/40',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs font-normal text-red-600">{error}</span>}
    </label>
  )
);

Input.displayName = 'Input';
