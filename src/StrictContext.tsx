import * as React from 'react';
import { ConfigObject } from './types';

/**
 * StrictContext is a React Context that is used to pass down overrides to behavor
 * when strict objects are called with invalid keys in different build environments.
 */
const StrictContext = React.createContext<ConfigObject>({});
export default StrictContext;
