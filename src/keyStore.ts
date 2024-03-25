import StrictDict from './StrictDict';
import {
  ConfigObject,
  StrictTarget,
  StrictObject,
} from './types';

/**
 * @typedef keystore
 * @return Returns a StrictDict wrapper around the keys for a given collection.
 */
export default (
  /** The collection to extract keys from. */
  collection: StrictTarget,
  /** Optional configuration object. */
  config: ConfigObject = {}
): StrictObject => StrictDict(Object.keys(collection), config);
