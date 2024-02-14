import StrictDict from './StrictDict';
import { ConfigObject, StrictTarget } from './types';

export default (
  collection: StrictTarget,
  config: ConfigObject = {}
) => StrictDict(Object.keys(collection), config);
