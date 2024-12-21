'use client';

import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataRow } from './DataRow';
import { GroupRow } from './GroupRow';
import type { DashboardVariable } from '@/lib/types/dashboard';

interface AdminSpreadsheetProps {
  data: DashboardVariable[];
  onUpdate: (id: number, field: string, value: string) => void;
}

const CHART_GROUPS = [
  'All Variables',
  'Metrics',
  'Historical Trends',
  'Daily Shipments',
  'Site Distribution',
  'Top Products Online',
  'Top Products Inside',
  'Top Products Outside'
];

export function AdminSpreadsheet({ data, onUpdate }: AdminSpreadsheetProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>('All Variables');
  const [editingCell, setEditingCell] = useState<{id: number, field: string} | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(CHART_GROUPS));

  // Group data by chart group
  const groupedData = useMemo(() => {
    const groups = new Map<string, DashboardVariable[]>();
    
    data.forEach(item => {
      const group = groups.get(item.chartGroup) || [];
      groups.set(item.chartGroup, [...group, item]);
    });

    return groups;
  }, [data]);

  // Filter data based on selected group
  const displayData = useMemo(() => {
    if (selectedGroup === 'All Variables') {
      return CHART_GROUPS.slice(1).flatMap(group => {
        if (expandedGroups.has(group)) {
          return groupedData.get(group) || [];
        }
        return [];
      });
    }
    return groupedData.get(selectedGroup) || [];
  }, [selectedGroup, groupedData, expandedGroups]);

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(group)) {
        next.delete(group);
      } else {
        next.add(group);
      }
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Select value={selectedGroup} onValueChange={setSelectedGroup}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select chart group" />
          </SelectTrigger>
          <SelectContent>
            {CHART_GROUPS.map((group) => (
              <SelectItem key={group} value={group}>
                {group}
                {' '}
                ({group === 'All Variables' ? data.length : (groupedData.get(group) || []).length})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)] border rounded-md">
        <Table>
          <TableHeader className="sticky top-0 bg-white">
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead className="w-48">Variable Name</TableHead>
              <TableHead className="w-32">Value</TableHead>
              <TableHead className="w-48">Chart Group</TableHead>
              <TableHead className="w-48">Calculation</TableHead>
              <TableHead>SQL Expression</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedGroup === 'All Variables' ? (
              CHART_GROUPS.slice(1).map(group => {
                const groupData = groupedData.get(group) || [];
                return (
                  <React.Fragment key={group}>
                    <GroupRow
                      group={group}
                      count={groupData.length}
                      isExpanded={expandedGroups.has(group)}
                      onToggle={() => toggleGroup(group)}
                    />
                    {expandedGroups.has(group) && groupData.map((row) => (
                      <DataRow
                        key={row.id}
                        row={row}
                        rowNumber={row.id}
                        editingCell={editingCell}
                        onEdit={(field, value) => {
                          onUpdate(row.id, field, value);
                          setEditingCell(null);
                        }}
                        onStartEdit={(field) => setEditingCell({ id: row.id, field })}
                      />
                    ))}
                  </React.Fragment>
                );
              })
            ) : (
              displayData.map((row) => (
                <DataRow
                  key={row.id}
                  row={row}
                  rowNumber={row.id}
                  editingCell={editingCell}
                  onEdit={(field, value) => {
                    onUpdate(row.id, field, value);
                    setEditingCell(null);
                  }}
                  onStartEdit={(field) => setEditingCell({ id: row.id, field })}
                />
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      
      <div className="text-sm text-gray-500">
        Showing {displayData.length} variables of {data.length} total
        {selectedGroup !== 'All Variables' && ` in ${selectedGroup}`}
      </div>
    </div>
  );
}