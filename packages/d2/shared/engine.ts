// One D2.js engine per page: loads the WASM worker once, runs calls in turn
import type { CompileOptions, CompileRequest, CompileResponse, D2 as D2Class, Diagram, RenderOptions } from '@terrastruct/d2';

/**
 * The calls an example makes, with the same shapes as D2.js's own `D2` class. encode,
 * decode, version and jsVersion are in the published source but not in its index.d.ts.
 */
export interface D2Api {
  compile(input: string, options?: CompileOptions): Promise<CompileResponse>;
  compile(input: CompileRequest): Promise<CompileResponse>;
  render(diagram: Diagram, options?: RenderOptions): Promise<string>;
  /** Encodes D2 source into the compressed string the playground puts in its URLs. */
  encode(script: string): Promise<string>;
  decode(encoded: string): Promise<string>;
  /** The D2 language version compiled into the WASM, e.g. "v0.7.0-HEAD". */
  version(): Promise<string>;
  /** The D2.js package version, e.g. "0.1.33". */
  jsVersion(): Promise<string>;
}

/** The D2 instance as built: the methods above plus the worker it posts to. */
type Instance = D2Class & {
  ready: Promise<void>;
  worker: Worker;
  encode(s: string): Promise<string>;
  decode(s: string): Promise<string>;
  version(): Promise<string>;
  jsVersion(): Promise<string>;
};

/** Rejection for a call whose stage was disposed before the call's turn came. */
export const STOPPED = new Error('stopped');

// A worker that has not answered for this long is taken as stuck (a layout that never
// ends): it is terminated and the next call starts a fresh one.
const STUCK_MS = 30_000;

let instance: Promise<Instance> | null = null;
let tail: Promise<unknown> = Promise.resolve();

function load(): Promise<Instance> {
  instance ??= import('@terrastruct/d2').then(async ({ D2 }) => {
    const d2 = new D2() as Instance;
    await d2.ready;
    return d2;
  });
  instance.catch(() => (instance = null));
  return instance;
}

function reset(why: string): void {
  const old = instance;
  instance = null;
  console.error(`d2 engine restarted: ${why}`);
  void old?.then((d2) => d2.worker.terminate()).catch(() => undefined);
}

/**
 * Runs `call` after every earlier call has settled. D2.js keeps one pending promise per
 * instance, so two calls in flight at once would answer each other's callers.
 */
function enqueue<T>(signal: AbortSignal, call: (d2: Instance) => Promise<T>): Promise<T> {
  const run = async (): Promise<T> => {
    if (signal.aborted) throw STOPPED;
    const d2 = await load();
    let timer = 0;
    const stuck = new Promise<never>((_, reject) => {
      timer = window.setTimeout(() => {
        reset('no answer in 30 s');
        reject(new Error('D2 did not answer within 30 seconds'));
      }, STUCK_MS);
    });
    try {
      return await Promise.race([call(d2), stuck]);
    } catch (err) {
      // A Go runtime that has exited answers nothing again, so start a new one.
      if (err instanceof Error && /Go program has already exited/.test(err.message)) reset(err.message);
      throw err;
    } finally {
      clearTimeout(timer);
    }
  };
  const result = tail.then(run, run);
  tail = result.catch(() => undefined);
  return result;
}

/** The page's D2 engine, with calls dropped once `signal` aborts. Loads the WASM on first use. */
export async function loadD2(signal: AbortSignal): Promise<D2Api> {
  await enqueue(signal, async () => undefined);
  const api: D2Api = {
    compile: ((input: string | CompileRequest, options?: CompileOptions) =>
      enqueue(signal, (d2) =>
        // index.d.ts types the second argument as { options }, but the code (and the README)
        // takes the CompileOptions themselves: compile(text, { sketch: true }).
        typeof input === 'string' ? d2.compile(input, options as never) : d2.compile(input),
      )) as D2Api['compile'],
    render: (diagram, options) => enqueue(signal, (d2) => d2.render(diagram, options)),
    encode: (script) => enqueue(signal, (d2) => d2.encode(script)),
    decode: (encoded) => enqueue(signal, (d2) => d2.decode(encoded)),
    version: () => enqueue(signal, (d2) => d2.version()),
    jsVersion: () => enqueue(signal, (d2) => d2.jsVersion()),
  };
  return api;
}
