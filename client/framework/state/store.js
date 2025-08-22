import { reconcile } from "../core/reconcile.js"
import { deepEqual } from "../utils/deepEqual.js"

let currentComponent = null

export function useState(initialValue) {
    const component = currentComponent
    if (!component.states) component.states = []

    const stateIndex = component.stateIndex++

    if (component.states[stateIndex] === undefined) {
        component.states[stateIndex] = initialValue
    }

    const setState = (newValue) => {
        const oldValue = component.states[stateIndex]
        if (!deepEqual(oldValue, newValue)) {
            // console.log('************************************');
            // console.log('oldValue', oldValue)
            // console.log('newValue', newValue)
            component.states[stateIndex] = newValue
            rerender(component)
        }

    }

    return [component.states[stateIndex], setState]
}

export function useRef(initialValue) {
    const component = currentComponent
    if (!component.refs) component.refs = []

    const refIndex = component.refIndex++

    if (!component.refs[refIndex]) {
        component.refs[refIndex] = { current: initialValue }
    }

    return component.refs[refIndex]
}

export function useEffect(callback, dependencies) {
    const component = currentComponent
    if (!component.effects) component.effects = []

    const effectIndex = component.effectIndex++

    const prevDeps = component.effects[effectIndex]?.dependencies
    const hasChanged = !prevDeps || dependencies.some((dep, i) => dep !== prevDeps[i])

    if (hasChanged) {
        if (component.effects[effectIndex]?.cleanup) {
            component.effects[effectIndex].cleanup()
        }
        const cleanup = callback()
        component.effects[effectIndex] = { dependencies, cleanup }
    }
}

export function withState(componentFn) {
    return function wrapper() {
        const component = {
            states: [],
            stateIndex: 0,
            effects: [],
            effectIndex: 0,
            refs: [],
            refIndex: 0,
            renderFn: null,
            vnode: null
        }

        currentComponent = component
        const vnode = componentFn(component)
        component.vnode = vnode
        component.renderFn = () => {
            component.stateIndex = 0
            component.effectIndex = 0
            component.refIndex = 0
            return componentFn(component)
        }

        currentComponent = null
        return component
    }
}

export function rerender(component) {
    const root = document.getElementById('root')
    currentComponent = component
    const newVNode = component.renderFn()
    currentComponent = null

    reconcile(root, newVNode, component.vnode)
    component.vnode = newVNode
}