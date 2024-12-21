'use client';

import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface GroupRowProps {
  group: string;
  count: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export function GroupRow({ group, count, isExpanded, onToggle }: GroupRowProps) {
  return (
    <TableRow 
      className="bg-gray-50 hover:bg-gray-100 cursor-pointer"
      onClick={onToggle}
    >
      <TableCell className="py-2">
        {isExpanded ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </TableCell>
      <TableCell colSpan={6} className="font-medium">
        {group} ({count} variables)
      </TableCell>
    </TableRow>
  );
}