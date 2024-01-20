import { OrderPackageDTO } from '../dto/order-package.dto';

export function calculatePrice(packages: OrderPackageDTO[]): number {
  /**
   * Each package costs €1.
   * If the volume of the package is less than 5000, then no additional charge.
   * For every 5000 increase in volume, add €0.50 to the price.
   * For every kilogram of weight, add €0.10 to the price.
   */
  const PRICE_PER_PACKAGE = 1;

  const VOLUME_THRESHOLD_CM = 5000;
  const WEIGHT_THRESHOLD_GR = 1000;

  const VOLUME_ADDITIONAL_CHARGE = 0.5;
  const WEIGHT_ADDITIONAL_CHARGE = 0.1;

  let price = packages.length * PRICE_PER_PACKAGE;

  for (const pkg of packages) {
    const volume = pkg.length * pkg.width * pkg.height;

    if (volume > VOLUME_THRESHOLD_CM) {
      price +=
        Math.round(volume / VOLUME_THRESHOLD_CM) * VOLUME_ADDITIONAL_CHARGE;
    }

    price +=
      Math.round((pkg.weight * 1000) / WEIGHT_THRESHOLD_GR) *
      WEIGHT_ADDITIONAL_CHARGE;
  }

  return price;
}
