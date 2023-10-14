import { MetricAction, MetricContext, MetricType } from '@/constants/metrics';

export const metricsApi = async (
  context: MetricContext,
  action: MetricAction,
  type: MetricType,
) => {
  // Визуализировать метрики + сохранять в локал-форейдж

  console.log(
    `Выполнено действие ${action} над ${context}. Результат: ${type}`,
  );

  return true;
};
