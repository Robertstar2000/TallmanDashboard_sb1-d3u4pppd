'use client';

import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import type { DashboardVariable } from '@/lib/types/dashboard';

interface DataRowProps {
  row: DashboardVariable;
  rowNumber: number;
  editingCell: { id: number; field: string } | null;
  onEdit: (field: string, value: string) => void;
  onStartEdit: (field: string) => void;
}

export function DataRow({ row, rowNumber, editingCell, onEdit, onStartEdit }: DataRowProps) {
  const isEmptyRow = row.id < 0;

  const renderCell = (field: string, value: string) => {
    if (isEmptyRow) return null;

    const isEditing = editingCell?.id === row.id && editingCell?.field === field;

    if (isEditing) {
      return (
        <Input
          value={value}
          onChange={(e) => onEdit(field, e.target.value)}
          onBlur={() => onEdit(field, value)}
          autoFocus
        />
      );
    }

    return (
      <div 
        onClick={() => onStartEdit(field)}
        className="cursor-pointer hover:bg-gray-50 p-1 rounded"
      >
        {value}
      </div>
    );
  };

  return (
    <TableRow className={isEmptyRow ? 'text-gray-300' : ''}>
      <TableCell>{rowNumber}</TableCell>
      <TableCell>{isEmptyRow ? '-' : renderCell('name', row.name)}</TableCell>
      <TableCell>{isEmptyRow ? '-' : renderCell('value', row.value)}</TableCell>
      <TableCell>{isEmptyRow ? '-' : renderCell('chartGroup', row.chartGroup)}</TableCell>
      <TableCell>{isEmptyRow ? '-' : renderCell('calculation', row.calculation)}</TableCell>
      <TableCell>
        <div className="max-w-[300px] overflow-hidden text-ellipsis">
          {isEmptyRow ? '-' : renderCell('sqlExpression', row.sqlExpression)}
        </div>
      </TableCell>
    </TableRow>
  );
}