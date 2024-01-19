import { validateStatusTransition } from './validateStatusTransition';
import { OrderStatus } from '../order.schema';

describe('validateStatusTransition()', () => {
  it(`can transition from ${OrderStatus.CREATED} only to ${OrderStatus.PICKED_UP} or ${OrderStatus.CANCELLED}`, () => {
    expect(
      validateStatusTransition(OrderStatus.CREATED, OrderStatus.PICKED_UP),
    ).toBeTruthy();

    expect(
      validateStatusTransition(OrderStatus.CREATED, OrderStatus.CANCELLED),
    ).toBeTruthy();

    expect(
      validateStatusTransition(OrderStatus.CREATED, OrderStatus.RETURNED),
    ).toBeFalsy();

    expect(
      validateStatusTransition(OrderStatus.CREATED, OrderStatus.RETURNING),
    ).toBeFalsy();

    expect(
      validateStatusTransition(OrderStatus.CREATED, OrderStatus.DELIVERED),
    ).toBeFalsy();
  });

  it(`can transition from ${OrderStatus.PICKED_UP} only to ${OrderStatus.DELIVERED} or ${OrderStatus.RETURNING}`, () => {
    expect(
      validateStatusTransition(OrderStatus.PICKED_UP, OrderStatus.DELIVERED),
    ).toBeTruthy();

    expect(
      validateStatusTransition(OrderStatus.PICKED_UP, OrderStatus.RETURNING),
    ).toBeTruthy();

    expect(
      validateStatusTransition(OrderStatus.PICKED_UP, OrderStatus.RETURNED),
    ).toBeFalsy();

    expect(
      validateStatusTransition(OrderStatus.PICKED_UP, OrderStatus.CANCELLED),
    ).toBeFalsy();

    expect(
      validateStatusTransition(OrderStatus.PICKED_UP, OrderStatus.CREATED),
    ).toBeFalsy();
  });

  it(`can transition from ${OrderStatus.RETURNING} only to ${OrderStatus.RETURNED}`, () => {
    expect(
      validateStatusTransition(OrderStatus.RETURNING, OrderStatus.RETURNED),
    ).toBeTruthy();

    expect(
      validateStatusTransition(OrderStatus.RETURNING, OrderStatus.DELIVERED),
    ).toBeFalsy();

    expect(
      validateStatusTransition(OrderStatus.RETURNING, OrderStatus.PICKED_UP),
    ).toBeFalsy();

    expect(
      validateStatusTransition(OrderStatus.RETURNING, OrderStatus.CANCELLED),
    ).toBeFalsy();

    expect(
      validateStatusTransition(OrderStatus.RETURNING, OrderStatus.CREATED),
    ).toBeFalsy();
  });

  it(`cannot transition from ${OrderStatus.CANCELLED}`, () => {
    expect(
      validateStatusTransition(OrderStatus.CANCELLED, OrderStatus.CREATED),
    ).toBeFalsy();

    expect(
      validateStatusTransition(OrderStatus.CANCELLED, OrderStatus.PICKED_UP),
    ).toBeFalsy();

    expect(
      validateStatusTransition(OrderStatus.CANCELLED, OrderStatus.DELIVERED),
    ).toBeFalsy();

    expect(
      validateStatusTransition(OrderStatus.CANCELLED, OrderStatus.RETURNING),
    ).toBeFalsy();

    expect(
      validateStatusTransition(OrderStatus.CANCELLED, OrderStatus.RETURNED),
    ).toBeFalsy();
  });

  it(`cannot transition from ${OrderStatus.DELIVERED}`, () => {
    expect(
      validateStatusTransition(OrderStatus.DELIVERED, OrderStatus.CREATED),
    ).toBeFalsy();

    expect(
      validateStatusTransition(OrderStatus.DELIVERED, OrderStatus.PICKED_UP),
    ).toBeFalsy();

    expect(
      validateStatusTransition(OrderStatus.DELIVERED, OrderStatus.CANCELLED),
    ).toBeFalsy();

    expect(
      validateStatusTransition(OrderStatus.DELIVERED, OrderStatus.RETURNING),
    ).toBeFalsy();

    expect(
      validateStatusTransition(OrderStatus.DELIVERED, OrderStatus.RETURNED),
    ).toBeFalsy();
  });

  it(`cannot transition from ${OrderStatus.RETURNED}`, () => {
    expect(
      validateStatusTransition(OrderStatus.RETURNED, OrderStatus.CREATED),
    ).toBeFalsy();

    expect(
      validateStatusTransition(OrderStatus.RETURNED, OrderStatus.PICKED_UP),
    ).toBeFalsy();

    expect(
      validateStatusTransition(OrderStatus.RETURNED, OrderStatus.CANCELLED),
    ).toBeFalsy();

    expect(
      validateStatusTransition(OrderStatus.RETURNED, OrderStatus.RETURNING),
    ).toBeFalsy();

    expect(
      validateStatusTransition(OrderStatus.RETURNED, OrderStatus.DELIVERED),
    ).toBeFalsy();
  });
});
