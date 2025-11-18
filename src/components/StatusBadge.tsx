import React from 'react';

type StatusType = 'scheduled' | 'confirmed' | 'pending' | 'completed' | 'cancelled';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const statusConfig = {
    scheduled: { bg: 'bg-[#4C9AFF]', text: 'text-white', label: label || 'Programada' },
    confirmed: { bg: 'bg-[#10B981]', text: 'text-white', label: label || 'Confirmada' },
    pending: { bg: 'bg-[#F59E0B]', text: 'text-white', label: label || 'Pendiente' },
    completed: { bg: 'bg-[#6B7280]', text: 'text-white', label: label || 'Completada' },
    cancelled: { bg: 'bg-[#EF4444]', text: 'text-white', label: label || 'Cancelada' }
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}
