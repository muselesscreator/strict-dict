import React from 'react';

import StrictContext from './StrictContext';
import keyStore from './keyStore';

import { StrictTarget } from './types';

export default () => {
  const config = React.useContext(StrictContext);
  return (collection: StrictTarget) => keyStore(collection, config);
};
