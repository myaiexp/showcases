// Silent card renders: Pizzicato pointed at an offline context, one at a time
import Pizzicato from 'pizzicato';

/**
 * Pizzicato has one AudioContext for the whole page (Pizzicato.context) and builds every
 * node in it when you call a constructor, play(), addEffect() and so on. It reads the
 * property each time, so pointing it at an OfflineAudioContext for the length of a render
 * makes the example's ordinary calls build an offline graph that renders without a sound.
 *
 * Two things stay tied to the page's context: Pizzicato.masterGainNode, which every
 * non-detached Sound and Group connects to, and Pizzicato.volume, which sets its gain.
 * The facade below hands out gain nodes whose connect() and disconnect() swap the page's
 * master for an offline one, and the renderer copies Pizzicato.volume onto that offline
 * master after every timed step.
 *
 * The swap holds for the whole render, including awaits in build() (a file sound decodes
 * asynchronously), so renders run one at a time and a live example waits for the queue to
 * drain before it builds anything (idle()).
 */
let tail: Promise<unknown> = Promise.resolve();

/** Cards render at this rate: half the work of 44.1 kHz, and plenty for drawing a waveform. */
export const CARD_RATE = 22050;
/** Web Audio renders in blocks of this many frames; suspend() lands on block edges. */
const BLOCK = 128;

export interface Rendered {
  /** One Float32Array per channel. */
  channels: Float32Array[];
  sampleRate: number;
}

export interface OfflineIo {
  /** Runs `fn` when the render reaches `seconds` (now if that has passed). */
  at(seconds: number, fn: () => void): void;
  /** The render's current time in seconds. */
  now(): number;
}

type Connect = (this: AudioNode, ...args: unknown[]) => unknown;

/** The offline context, with createGain() returning nodes that reroute the page's master. */
function facade(off: OfflineAudioContext, master: GainNode): AudioContext {
  const pageMaster = Pizzicato.masterGainNode;
  const swap = (n: unknown): unknown => (n === pageMaster ? master : n);
  const reroute = (node: GainNode): GainNode => {
    const connect = node.connect as unknown as Connect;
    const disconnect = node.disconnect as unknown as Connect;
    Object.assign(node, {
      connect: (dest: unknown, ...rest: unknown[]) => connect.call(node, swap(dest), ...rest),
      disconnect: (...args: unknown[]) => disconnect.call(node, ...args.map((a, i) => (i === 0 ? swap(a) : a))),
    });
    return node;
  };
  return new Proxy(off, {
    get(target, key) {
      if (key === 'createGain') return () => reroute(target.createGain());
      const value: unknown = Reflect.get(target, key, target);
      return typeof value === 'function' ? (value as (...a: unknown[]) => unknown).bind(target) : value;
    },
  }) as unknown as AudioContext;
}

/**
 * Renders `seconds` of whatever `run` builds and schedules, silently. `run` may await
 * (file sounds load asynchronously); the render starts when it resolves. Resolves null
 * when `signal` aborted before the render's turn came.
 */
export function renderOffline(
  run: (io: OfflineIo) => Promise<void> | void,
  seconds: number,
  channels: number,
  signal: AbortSignal,
): Promise<Rendered | null> {
  const job = tail.then(async (): Promise<Rendered | null> => {
    if (signal.aborted) return null;
    const off = new OfflineAudioContext(channels, Math.ceil(seconds * CARD_RATE), CARD_RATE);
    const master = off.createGain();
    master.connect(off.destination);
    const page = Pizzicato.context;
    const pageVolume = Pizzicato.volume;
    const errors: unknown[] = [];
    const steps = new Map<number, (() => void)[]>();
    let time = 0;

    const io: OfflineIo = {
      now: () => time,
      at(at, fn) {
        const block = Math.round((at * CARD_RATE) / BLOCK);
        const t = (block * BLOCK) / CARD_RATE;
        if (t >= seconds) return;
        if (t <= time) {
          fn();
          return;
        }
        let list = steps.get(block);
        if (!list) {
          const fresh: (() => void)[] = [];
          list = fresh;
          steps.set(block, fresh);
          void off.suspend(t).then(() => {
            time = t;
            // A step may book another step at this same time: those run straight away.
            for (const step of fresh) {
              try {
                step();
              } catch (e) {
                errors.push(e);
              }
            }
            steps.delete(block);
            master.gain.setValueAtTime(Pizzicato.volume, t);
            Pizzicato.volume = pageVolume;
            void off.resume();
          });
        }
        list.push(fn);
      },
    };

    Pizzicato.context = facade(off, master);
    try {
      await run(io);
      master.gain.setValueAtTime(Pizzicato.volume, 0);
      Pizzicato.volume = pageVolume;
      const buffer = await off.startRendering();
      if (errors.length) throw errors[0];
      const out: Float32Array[] = [];
      for (let c = 0; c < channels; c++) out.push(buffer.getChannelData(Math.min(c, buffer.numberOfChannels - 1)).slice());
      return { channels: out, sampleRate: buffer.sampleRate };
    } finally {
      Pizzicato.context = page;
      Pizzicato.volume = pageVolume;
    }
  });
  // A failed render rejects its own caller only; the queue carries on.
  tail = job.catch(() => undefined);
  return job;
}

/** Resolves once every queued card render has finished. */
export function idle(): Promise<void> {
  return tail.then(() => undefined);
}
