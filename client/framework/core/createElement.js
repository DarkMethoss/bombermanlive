export function createElement({ tag, key = null, attrs = {}, children = [] }) {
  return {
    tag,
    key,
    attrs,
    children: children.map(child => {
      if (typeof child === 'string') return createTextElement(child)
      return createElement(child)
    })
  }
}

function createTextElement(text) {
  return { tag: 'TEXT', key: null, attrs: { nodeValue: text }, children: [] }
}

export const generateId = () => Math.random().toString(36).substring(2, 9)
