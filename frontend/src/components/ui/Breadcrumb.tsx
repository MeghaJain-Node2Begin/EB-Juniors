import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <div className={`flex items-center text-sm font-medium text-emerald-600 mb-10 tracking-wide ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.href ? (
            <Link href={item.href} className="hover:text-emerald-800 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-zinc-900">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <ChevronRight size={16} className="mx-2 opacity-50" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
