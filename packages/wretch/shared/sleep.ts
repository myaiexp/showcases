// A wait that rejects with the abort reason as soon as any of its signals aborts

/** Resolves after `ms`, or rejects with the first aborted signal's reason. */
export function sleep(ms: number, signals: (AbortSignal | null | undefined)[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const live = signals.filter((s): s is AbortSignal => !!s);
    const hit = live.find((s) => s.aborted);
    if (hit) return reject(hit.reason);
    const off = (): void => live.forEach((s) => s.removeEventListener('abort', onAbort));
    const onAbort = (e: Event): void => {
      clearTimeout(id);
      off();
      reject((e.target as AbortSignal).reason);
    };
    const id = setTimeout(() => {
      off();
      resolve();
    }, ms);
    live.forEach((s) => s.addEventListener('abort', onAbort, { once: true }));
  });
}
