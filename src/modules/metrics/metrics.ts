import { MetricAction, MetricContext, MetricType } from './constants';

export const sendMetric = async (
  context: MetricContext,
  action: MetricAction,
  type: MetricType,
) => {
  console.log(
    `Выполнено действие ${action} над ${context}. Результат: ${type}`,
  );

  return true;
};
