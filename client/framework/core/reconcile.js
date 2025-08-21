import { createDomNode } from '../index.js'

// Public API: reconcile an existing subtree (oldVNode already mounted under parentDom)
export function reconcile(parentDom, newVNode, oldVNode) {
    // Create
    if (!oldVNode) {
        const newDom = createDomNode(newVNode)
        newVNode.dom = newDom
        parentDom.appendChild(newDom)
        return
    }

    const dom = oldVNode.dom

    // Remove
    if (!newVNode) {
        if (dom && dom.parentNode) dom.parentNode.removeChild(dom)
        return
    }

    // Replace if tag changed
    if (newVNode.tag !== oldVNode.tag) {
        const newDom = createDomNode(newVNode)
        newVNode.dom = newDom
        if (dom && dom.parentNode) dom.parentNode.replaceChild(newDom, dom)
        return
    }

    // Same tag: reuse DOM
    newVNode.dom = dom

    // TEXT node fast-path
    if (newVNode.tag === 'TEXT') {
        if (newVNode.attrs.nodeValue !== oldVNode.attrs.nodeValue) {
            dom.nodeValue = newVNode.attrs.nodeValue
        }
        return
    }

    // Update attributes (only for elements)
    updateDomAttributes(dom, newVNode.attrs, oldVNode.attrs)

    // Diff children
    diffChildren(dom, newVNode.children || [], oldVNode.children || [])
}

// ---------- keyed children diff ----------

function diffChildren(parentDom, newChildren, oldChildren) {
    const oldKeyed = new Map()
    const oldUnkeyed = []

    for (let i = 0; i < oldChildren.length; i++) {
        const c = oldChildren[i]
        if (c.key != null) oldKeyed.set(c.key, c)
        else oldUnkeyed.push(c)
    }

    let unkeyedIndex = 0
    let anchor = null

    for (let i = 0; i < newChildren.length; i++) {
        const nextVNode = newChildren[i]
        let match = null

        if (nextVNode.key != null && oldKeyed.has(nextVNode.key)) {
            match = oldKeyed.get(nextVNode.key)
            oldKeyed.delete(nextVNode.key)
        } else if (nextVNode.key == null && unkeyedIndex < oldUnkeyed.length) {
            match = oldUnkeyed[unkeyedIndex++]
        }

        if (match) {
            reconcile(parentDom, nextVNode, match)
            anchor = placeChild(parentDom, nextVNode.dom, anchor)
        } else {
            const childDom = createDomNode(nextVNode)
            nextVNode.dom = childDom
            anchor = placeChild(parentDom, childDom, anchor)
        }
    }

    // Remove leftovers
    for (const [key, leftover] of oldKeyed) {
        if (leftover.dom && leftover.dom.parentNode === parentDom) {
            parentDom.removeChild(leftover.dom)
        }
    }
    for (let i = unkeyedIndex; i < oldUnkeyed.length; i++) {
        const leftover = oldUnkeyed[i]
        if (leftover.dom && leftover.dom.parentNode === parentDom) {
            parentDom.removeChild(leftover.dom)
        }
    }
}

function placeChild(parentDom, childDom, anchor) {
    if (!childDom) return anchor

    const nextSibling = anchor ? anchor.nextSibling : parentDom.firstChild

    if (childDom !== nextSibling && childDom.parentNode !== parentDom) {
        parentDom.insertBefore(childDom, nextSibling)
    } 

    return childDom
}

// ---------- attributes ----------

function updateDomAttributes(dom, newAttrs = {}, oldAttrs = {}) {
    if (!dom || dom.nodeType !== 1) return

    // Remove old attrs
    for (const key in oldAttrs) {
        if (!(key in newAttrs)) {
            if (key === "className") dom.removeAttribute("class")
            else if (key === "htmlFor") dom.removeAttribute("for")
            else if (key === "ref") { }
            else if (key.startsWith("on") && typeof oldAttrs[key] === "function") {
                dom[key.toLowerCase()] = null
            } else if (key in dom) {
                try {
                    if (key === "checked") dom.checked = false
                    else if (key === "value") dom.value = ""
                    else dom[key] = ""
                } catch {
                    dom.removeAttribute(key)
                }
            } else {
                dom.removeAttribute(key)
            }
        }
    }

    // Add / update new attrs
    for (const key in newAttrs) {
        const newVal = newAttrs[key]
        const oldVal = oldAttrs[key]
        const alwaysSync = key === "checked" || key === "value"

        if (key === "ref" && typeof newVal === "function") {
            newVal(dom)
            continue
        }
        if (key.startsWith("on") && typeof newVal === "function") {
            dom[key.toLowerCase()] = newVal
            continue
        }
        if (key === "className") {
            dom.setAttribute("class", newVal)
            continue
        }
        if (key === "htmlFor") {
            dom.setAttribute("for", newVal)
            continue
        }

        if (key in dom) {
            if (alwaysSync) {
                try { dom[key] = newVal } catch { dom.setAttribute(key, newVal) }
            } else if (newVal !== oldVal) {
                try { dom[key] = newVal } catch { dom.setAttribute(key, newVal) }
            }
        } else {
            if (alwaysSync || newVal !== oldVal) dom.setAttribute(key, newVal)
        }
    }
}
