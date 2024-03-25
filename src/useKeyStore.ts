import * as React from 'react';

import StrictContext from './StrictContext';
import keyStore from './keyStore';

import { StrictTarget } from './types';

/**
 * Returns a keyStore method that is explicity tied to the StrictContext config defined
 * at in the component heierarchy.
 * @return {(collection: StrictTarget) => StrictObject} - App-specific keyStore method.
 */
export default () => {
  const config = React.useContext(StrictContext);
  return (collection: StrictTarget) => keyStore(collection, config);
};
