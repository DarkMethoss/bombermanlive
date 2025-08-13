export function generateId(type) {
    return `${type}.${Date.now()}`
}