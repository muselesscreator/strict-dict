# strict-dict

Trust-worthy key-stores for Javascript.

The purpose of this library is to provide a simple facility for catching a specific category of bug as soon
as it happens in the code: reading an object whose keys you trust, and mis-typing a key.  In Javascript,
this results in an undefined value, which is fine in some cases, but in others where you rely on that value
being present, it is valuable to be able to actively catch these errors early, rather than 4-8 steps down the
line where they start causing problems.

## Utilities

### `StrictDict`, `useStrictDict`- Strict dictionary
Defines object that complain when called with invalid keys. useful for when using defined modules, where you want to treat invalid keys as an error behavior (such as when using an object as a key-store).  Primarily, this is a method to avoid using "magic strings" in javascript code and tests.
An optional config object can be passed to control the behavior in a given run environment.

#### Usage
Wrap an object in StrictDict, and it will raise an error if called with invalid keys.
```js
const selectors = StrictDict({
  validSelector1: () => ({}),
  validSelector2: () => ({}),
});
const selector = selectors.invalidSelector; // raises an error
```
And now with custom behavior in production environment (default in all others)
```js
const selectors = StrictDict({
  validSelector1: () => ({}),
  validSelector2: () => ({}),
}, {
  production: ({ target, key }) => {},
});
const selector = selectors.invalidSelector; // raises custom error in production environment
```
`useStrictDict` is a hook that provides the config object based on a top-level context provider
(StrictContext)
```js
const App = () => (
  <StrictContext.Provider value={{
    production: ({ target, key }) => {},
  }}>
    <MyApp />
  </StrictContext.Provider>
);
const MyApp = () => {
  const selectors = useStrictDict()({
    validSelector1: () => ({}),
    validSelector2: () => ({}),
  });
  const selector = selectors.invalidSelector; // raises custom error in production environment
  ...
}
```

### `keyStore` and `useKeyStore`- Strict Dictionary of keys from a given object.
use `keyStore` to quickly grab the keys from an object or StrictDict as a StrictDict themselves.
#### Usage
```js
const selectorKeys = keyStore(selectors);
selectorKeys.validSelector1; // 'validSelector1';
selectorKeys.invalidSelector; // raises an error;
```

`useKeyStore` is a hook that provides the config object based on a top-level context provider
(StrictContext)
```js
const App = () => (
  <StrictContext.Provider value={{
    production: ({ target, key }) => {},
  }}>
    <MyApp />
  </StrictContext.Provider>
);
const MyApp = () => {
  const selectors = useKeyStore()({
    validSelector1: () => ({}),
    validSelector2: () => ({}),
  });
  const selector = selectors.invalidSelector; // raises custom error in production environment
  ...
}
```

### TypeScript considerations
When using TypeScript, you can type these as `Record<string, targetType>` for easy access during tests.
