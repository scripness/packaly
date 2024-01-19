import { OrderStatus } from '../order.schema';

export const validateStatusTransition = (
  oldStatus: OrderStatus,
  newStatus: OrderStatus,
): boolean => {
  const transitions = {
    [OrderStatus.CREATED]: [OrderStatus.PICKED_UP, OrderStatus.CANCELLED],
    [OrderStatus.PICKED_UP]: [OrderStatus.DELIVERED, OrderStatus.RETURNING],
    [OrderStatus.CANCELLED]: [],
    [OrderStatus.DELIVERED]: [],
    [OrderStatus.RETURNING]: [OrderStatus.RETURNED],
    [OrderStatus.RETURNED]: [],
  };

  return transitions[oldStatus].includes(newStatus);
};
