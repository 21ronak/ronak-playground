export const throttle = (fn, delay) => {
  let shouldThrottle = false;

  return function(...args) {
    if(shouldThrottle) {
      return;
    }

    shouldThrottle = true;
    setTimeout(() => {
      shouldThrottle = false;
    }, delay);

    fn.apply(this, args);
  }
}

export const debounce = (fn, delay) => {
  let timeoutId = null;

  return function(...args) {
    let context = this;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
export default function debounce2(func, wait) {
  let timeoutId = null;
  let argsToInvoke = undefined;
  let context = undefined;

  const debouncedFunction = function(...args) {
    clearTimeout(timeoutId);

    context = this;
    argsToInvoke = args;
    timeoutId = setTimeout(() => {
      func.apply(context, argsToInvoke);
      timeoutId = null;
    }, wait);
  };

  debouncedFunction.flush = function() {
    // Don't invoke if there's no pending callback.
    if(timeoutId) {
      clearTimeout(timeoutId);
      func.apply(context, argsToInvoke);
      timeoutId = null;
    }
  };

  debouncedFunction.cancel =   function() {
    clearTimeout(timeoutId);
    timeoutId = null;
  };

  return debouncedFunction;
}
