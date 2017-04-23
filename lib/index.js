function defaultCondition (target, source) {
  if (typeof target === 'undefined' || target === null) {
    return true
  }
  if (typeof target === 'number') {
    if (isNaN(target) || !isFinite(target)) {
      return true
    }
    if (typeof source === 'number' && !isNaN(source) && isFinite(source)) {
      return source > target
    }
  }
  if (typeof target === 'string' && target === '') {
    return true
  }
  return `${JSON.stringify(source)}`.length >= `${JSON.stringify(target)}`.length
}

/**
 * Incrementally merge a JSON
 */
function incrementalMerge(target, source, condition) {

  condition = typeof condition === 'function' ? condition : defaultCondition

  const sourceKeys = Object.keys(source)
  for (let i = 0; i < sourceKeys.length; i++) {
    if ((target[sourceKeys[i]] instanceof Object) && (source[sourceKeys[i]] instanceof Object)) {
      incrementalMerge(target[sourceKeys[i]], source[sourceKeys[i]], condition)
    } else if (condition(target[sourceKeys[i]], source[sourceKeys[i]])) {
      target[sourceKeys[i]] = source[sourceKeys[i]]
    }
  }

  return target
}

module.exports = incrementalMerge
