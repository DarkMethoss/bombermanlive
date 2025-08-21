const listeners = new Map()

export function subscribe(eventType, callback) {
  if (!listeners.has(eventType)) {
    listeners.set(eventType, new Set())
  }
  listeners.get(eventType).add(callback)

  // Return unsubscribe function
  return () => {
    listeners.get(eventType).delete(callback)
    if (listeners.get(eventType).size === 0) {
      listeners.delete(eventType)
    }
  }
}

export function dispatch(eventType, payload) {
  const cbs = listeners.get(eventType)
  if (cbs) {
    for (const cb of cbs) {
      cb(payload)
    }
  }
}
