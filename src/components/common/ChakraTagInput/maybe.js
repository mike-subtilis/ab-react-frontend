/* FROM: https://codesandbox.io/p/sandbox/chakra-tag-input-d04s0 */

export default function maybeCall(maybeFunc, ...args) {
  if (typeof maybeFunc === 'function') {
    return maybeFunc(...args);
  }
  return maybeFunc;
}
