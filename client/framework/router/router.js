import { dispatch } from '../index.js'

export function getCurrentPath() {
  return location.hash || '#/'
}

export function resolveRoute() {
  const path = getCurrentPath()
  dispatch('route:change', { path })
}

export function startRouter() {
  resolveRoute()
  window.onhashchange = resolveRoute
}
