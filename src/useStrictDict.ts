import * as React from 'react';
import StrictContext from './StrictContext';
import { StrictTarget } from './types';
import StrictDict from './StrictDict';

/**
 * Returns a StrictDict method that is explicity tied to the StrictContext config defined
 * at in the component heierarchy.
 * @return {(collection: StrictTarget) => StrictObject} - App-specific StrictDict method.
 */
export default () => {
  const config = React.useContext(StrictContext);
  return (target: StrictTarget) => StrictDict(target, config);
};
