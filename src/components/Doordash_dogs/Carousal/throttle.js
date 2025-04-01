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
