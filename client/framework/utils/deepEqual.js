export function deepEqual(a, b) {
  // Check primitive types and strict equality
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;

  // Handle objects
  if (typeof a === 'object' && a !== null && b !== null) {
    // Handle arrays
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!deepEqual(a[i], b[i])) return false;
      }
      return true;
    }

    // Handle Sets
    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      for (let item of a) {
        if (!b.has(item)) return false;
      }
      return true;
    }

    // Handle plain objects
    if (!Array.isArray(a) && !Array.isArray(b) && !(a instanceof Set) && !(b instanceof Set)) {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;
      for (let key of keysA) {
        if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
      }
      return true;
    }

    return false;
  }

  return false;
}