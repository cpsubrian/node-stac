import Stac from './stac';

export = function createStac(options?: any, items?: any[]): Stac {
  return new Stac(options, items);
}
