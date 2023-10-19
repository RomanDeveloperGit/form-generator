import { MetricAction, MetricContext, MetricType } from '@/constants/metrics';

export const metricsApi = async (
  context: MetricContext,
  action: MetricAction,
  type: MetricType,
) => {
  console.log(
    `Выполнено действие ${action} над ${context}. Результат: ${type}`,
  );

  return true;
};
