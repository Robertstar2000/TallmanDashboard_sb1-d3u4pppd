'use client';

import { EditableMetric } from '@/components/metrics/EditableMetric';
import { handleMetricUpdate } from '@/lib/utils/metrics';
import { getMetricIcon, getMetricGradient } from '@/lib/utils/icons';
import { formatTitle } from '@/lib/utils/format';
import { Metric } from '@/lib/types/dashboard';

interface MetricsSectionProps {
  metrics: Metric[];
  onMetricsUpdate: (metrics: Metric[]) => void;
}

export function MetricsSection({ metrics, onMetricsUpdate }: MetricsSectionProps) {
  if (!metrics || metrics.length === 0) {
    return (
      <div className="grid grid-rows-7 gap-1 h-full">
        <div className="text-sm text-gray-500">Loading metrics...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-7 gap-1 h-full">
      {metrics.map((metric) => {
        const Icon = getMetricIcon(metric.name);
        const title = formatTitle(metric.name);

        return (
          <EditableMetric
            key={metric.name}
            icon={<Icon className="w-4 h-4" />}
            title={title}
            value={metric.value}
            gradient={getMetricGradient(metric.name)}
            onUpdate={(value) => handleMetricUpdate(metric.name, value, metrics, onMetricsUpdate)}
          />
        );
      })}
    </div>
  );
}