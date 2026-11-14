// Typings for Pizzicato.js 0.6.4, written from its README and source (it ships none)
declare module 'pizzicato' {
  type Wave = 'sine' | 'square' | 'sawtooth' | 'triangle';
  type Callback = (error?: unknown) => void;
  type EventName = 'play' | 'pause' | 'stop' | 'end';

  interface CommonOptions {
    volume?: number;
    attack?: number;
    release?: number;
    detached?: boolean;
  }

  type Description =
    | { source: 'wave'; options?: CommonOptions & { type?: Wave; frequency?: number } }
    | { source: 'file'; options: CommonOptions & { path: string | string[]; loop?: boolean } }
    | { source: 'input'; options?: CommonOptions }
    | {
        source: 'script';
        options: CommonOptions & { audioFunction: (e: AudioProcessingEvent) => void; bufferSize?: number };
      };

  interface Events {
    on(name: EventName, callback: () => void, context?: unknown): void;
    off(name?: EventName): void;
  }

  /** The base every effect is built on: connect() and disconnect() to Web Audio nodes. */
  interface Effect {
    readonly inputNode: GainNode;
    readonly outputNode: GainNode;
    connect(node: AudioNode | Effect): this;
    disconnect(node?: AudioNode | Effect): this;
  }

  class Sound implements Events {
    constructor(description?: Description | string, callback?: Callback);
    readonly playing: boolean;
    readonly paused: boolean;
    readonly detached: boolean;
    readonly effects: Effect[];
    loop: boolean;
    volume: number;
    attack: number;
    release: number;
    /** An oscillator's frequency; null for sounds that are not a wave. */
    frequency: number | null;
    /** The node producing the sound right now: a new one on every play(). */
    readonly sourceNode: AudioNode | undefined;
    play(when?: number, offset?: number): void;
    pause(): void;
    stop(): void;
    clone(): Sound;
    addEffect(effect: Effect): this;
    removeEffect(effect: Effect): this;
    connect(node: AudioNode | Effect): this;
    disconnect(node?: AudioNode | Effect): this;
    on(name: EventName, callback: () => void, context?: unknown): void;
    off(name?: EventName): void;
  }

  class Group implements Events {
    constructor(sounds?: Sound[]);
    readonly sounds: Sound[];
    readonly effects: Effect[];
    volume: number;
    addSound(sound: Sound): void;
    removeSound(sound: Sound): void;
    addEffect(effect: Effect): this;
    removeEffect(effect: Effect): this;
    play(): void;
    pause(): void;
    stop(): void;
    connect(node: AudioNode | Effect): this;
    disconnect(node?: AudioNode | Effect): this;
    on(name: 'play' | 'pause' | 'stop', callback: () => void, context?: unknown): void;
    off(name?: EventName): void;
  }

  interface Mix {
    mix: number;
  }
  interface DelayLike extends Effect, Mix {
    feedback: number;
    time: number;
  }
  interface Delay extends DelayLike {}
  interface PingPongDelay extends DelayLike {}
  interface DubDelay extends DelayLike {
    cutoff: number;
  }
  interface Distortion extends Effect {
    gain: number;
  }
  interface Quadrafuzz extends Effect {
    lowGain: number;
    midLowGain: number;
    midHighGain: number;
    highGain: number;
  }
  interface Flanger extends Effect, Mix {
    time: number;
    speed: number;
    depth: number;
    feedback: number;
  }
  interface Compressor extends Effect, Mix {
    threshold: number;
    knee: number;
    attack: number;
    release: number;
    ratio: number;
  }
  interface Filter extends Effect {
    frequency: number;
    peak: number;
  }
  interface StereoPanner extends Effect {
    pan: number;
  }
  interface Convolver extends Effect, Mix {}
  interface Reverb extends Effect, Mix {
    time: number;
    decay: number;
    reverse: boolean;
  }
  interface RingModulator extends Effect, Mix {
    distortion: number;
    speed: number;
  }
  interface Tremolo extends Effect, Mix {
    speed: number;
    depth: number;
  }

  type Opts<T> = Partial<Omit<T, keyof Effect>>;

  interface Effects {
    Delay: new (options?: Opts<Delay>) => Delay;
    PingPongDelay: new (options?: Opts<PingPongDelay>) => PingPongDelay;
    DubDelay: new (options?: Opts<DubDelay>) => DubDelay;
    Distortion: new (options?: Opts<Distortion>) => Distortion;
    Quadrafuzz: new (options?: Opts<Quadrafuzz>) => Quadrafuzz;
    Flanger: new (options?: Opts<Flanger>) => Flanger;
    Compressor: new (options?: Opts<Compressor>) => Compressor;
    LowPassFilter: new (options?: Opts<Filter>) => Filter;
    HighPassFilter: new (options?: Opts<Filter>) => Filter;
    StereoPanner: new (options?: Opts<StereoPanner>) => StereoPanner;
    Convolver: new (options: Opts<Convolver> & { impulse: string }, callback?: Callback) => Convolver;
    Reverb: new (options?: Opts<Reverb>) => Reverb;
    RingModulator: new (options?: Opts<RingModulator>) => RingModulator;
    Tremolo: new (options?: Opts<Tremolo>) => Tremolo;
  }

  interface Util {
    isEffect(value: unknown): value is Effect;
    isSound(value: unknown): value is Sound;
  }

  interface PizzicatoStatic {
    Sound: typeof Sound;
    Group: typeof Group;
    Effects: Effects;
    Util: Util;
    /** The one AudioContext every Pizzicato object is built in. */
    context: AudioContext;
    /** General volume of every Pizzicato sound, 0 to 1. */
    volume: number;
    readonly masterGainNode: GainNode;
  }

  const Pizzicato: PizzicatoStatic;
  export type {
    Sound,
    Group,
    Effect,
    Wave,
    Description,
    Delay,
    PingPongDelay,
    DubDelay,
    Distortion,
    Quadrafuzz,
    Flanger,
    Compressor,
    Filter,
    StereoPanner,
    Convolver,
    Reverb,
    RingModulator,
    Tremolo,
    PizzicatoStatic,
  };
  export default Pizzicato;
}

declare module 'pizzicato/distr/Pizzicato.min.js' {
  import Pizzicato from 'pizzicato';
  export default Pizzicato;
}
