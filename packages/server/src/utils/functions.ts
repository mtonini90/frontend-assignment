export function compose<T>(...fns: Array<(_: any) => T>) {
    return (args: any): T => fns.reduce((v, f) => f(v), args);
}
