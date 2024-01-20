import { OrderPackageDTO } from '../dto/order-package.dto';
import { calculatePrice } from './calculatePrice';

describe('calculatePrice()', () => {
  const EXPECTED_PRICE_FOR_ONE_PACKAGE = 7;
  const EXPECTED_PRICE_FOR_TWO_PACKAGES = EXPECTED_PRICE_FOR_ONE_PACKAGE + 1.5;

  it('calculates the order price for one package', async () => {
    const payload: OrderPackageDTO[] = [
      {
        height: 50,
        length: 20,
        width: 10,
        weight: 50,
      },
    ];

    const price = calculatePrice(payload);

    expect(price).toEqual(EXPECTED_PRICE_FOR_ONE_PACKAGE);
  });

  it('calculates the order price for two packages', async () => {
    const payload: OrderPackageDTO[] = [
      {
        height: 50,
        length: 20,
        width: 10,
        weight: 50,
      },
      {
        height: 10,
        length: 10,
        width: 10,
        weight: 5,
      },
    ];

    const price = calculatePrice(payload);

    expect(price).toEqual(EXPECTED_PRICE_FOR_TWO_PACKAGES);
  });
});
