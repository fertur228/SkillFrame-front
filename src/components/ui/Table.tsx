import { PropsWithChildren, TableHTMLAttributes } from 'react';
import { clsx } from 'clsx';

export const Table = ({ className, children, ...props }: PropsWithChildren<TableHTMLAttributes<HTMLTableElement>>) => (
  <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
    <table className={clsx('min-w-full divide-y divide-slate-200 text-sm', className)} {...props}>
      {children}
    </table>
  </div>
);

export const TableHead = ({ children, className, ...props }: PropsWithChildren<TableHTMLAttributes<HTMLTableSectionElement>>) => (
  <thead className={clsx('bg-slate-50', className)} {...props}>
    {children}
  </thead>
);

export const TableBody = ({ children, className, ...props }: PropsWithChildren<TableHTMLAttributes<HTMLTableSectionElement>>) => (
  <tbody className={clsx('divide-y divide-slate-200 bg-white', className)} {...props}>
    {children}
  </tbody>
);

export const TableRow = ({ children, className, ...props }: PropsWithChildren<TableHTMLAttributes<HTMLTableRowElement>>) => (
  <tr className={clsx('transition hover:bg-slate-50', className)} {...props}>
    {children}
  </tr>
);

export const TableCell = ({ children, className, ...props }: PropsWithChildren<TableHTMLAttributes<HTMLTableCellElement>>) => (
  <td className={clsx('px-4 py-3 text-slate-700', className)} {...props}>
    {children}
  </td>
);

export const TableHeaderCell = ({ children, className, ...props }: PropsWithChildren<TableHTMLAttributes<HTMLTableCellElement>>) => (
  <th
    scope="col"
    className={clsx('px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500', className)}
    {...props}
  >
    {children}
  </th>
);
