import {
  ConfigObject,
  ObjectValue,
  StrictKey,
  StrictTarget,
  SymbolObject,
} from './types';

const strictGet = (
  target: SymbolObject,
  key: StrictKey,
  config: ConfigObject = {},
): ObjectValue => {
  if (key === Symbol.toStringTag) {
    return target;
  }

  if (key === '$$typeof') {
    return typeof target;
  }

  if (key in target || key === '_reactFragment') {
    return target[key];
  }

  const env = process.env.NODE_ENV as string;
  if (Object.keys(config).includes(env)) {
    config[env]({ target, key });
  }
  else {
    console.log(key.toString());
    console.error({ target, key });
    const e = Error(`invalid property "${key.toString()}"`);
    console.error(e.stack);
  }
  return undefined;
};

export default (dict: StrictTarget, config = {}) => {
  const get = (target: SymbolObject, name: StrictKey) =>
    strictGet(target, name, config);

  if (Array.isArray(dict)) {
    return new Proxy(
      dict.reduce((obj, curr) => ({ ...obj, [curr]: curr }), {}),
      { get },
    );
  }
  return new Proxy(dict, { get });
};
