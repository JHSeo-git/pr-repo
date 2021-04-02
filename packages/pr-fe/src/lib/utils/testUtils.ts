export function sleepPromise(interval: number) {
  console.log('sleep');
  return new Promise((resolve) => {
    setImmediate(() => {
      console.log('awake');
      resolve('complete');
    }, interval);
  });
}
