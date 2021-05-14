export default (action = () => null, timeoutInMilliseconds = 2): Promise<void> =>
    new Promise<void>(resolve => {
        setTimeout(() => {
            action();
            resolve();
        }, timeoutInMilliseconds);
    });