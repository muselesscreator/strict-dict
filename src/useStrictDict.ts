import React from 'react';
import StrictContext from './StrictContext';
import { StrictTarget } from './types';
import StrictDict from './StrictDict';

export default () => {
  const config = React.useContext(StrictContext);
  return (dict: StrictTarget) => StrictDict(dict, config);
};
