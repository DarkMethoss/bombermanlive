export function render(component, container) {
  const dom = createDomNode(component.vnode)
  container.appendChild(dom)
}

export function createDomNode(vnode) {
  const dom = vnode.tag === 'TEXT'
    ? document.createTextNode(vnode.attrs.nodeValue)
    : document.createElement(vnode.tag)

  // Keep stable reference from VNode -> real DOM
  vnode.dom = dom

  for (const [name, value] of Object.entries(vnode.attrs || {})) {
    if (name === "ref" && typeof value === "function") {
      value(dom)
    } else if (name.startsWith("on") && typeof value === "function") {
      dom[name.toLowerCase()] = value
    } else if (name === "className") {
      dom.setAttribute("class", value)
    } else if (name === "htmlFor") {
      dom.setAttribute("for", value)
    } else if (name in dom) {
      dom[name] = value
    } else {
      dom.setAttribute(name, value)
    }
  }

  vnode.children.forEach(child => {
    dom.appendChild(createDomNode(child))
  })

  return dom
}
