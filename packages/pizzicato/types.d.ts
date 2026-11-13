// Minimal typings for the parts of Pizzicato.js these examples use
declare module 'pizzicato' {
  type Wave = 'sine' | 'square' | 'sawtooth' | 'triangle';

  interface Effect {
    readonly __effect?: never;
  }

  class Sound {
    constructor(description: {
      source: 'wave';
      options: { type?: Wave; frequency?: number };
    });
    playing: boolean;
    volume: number;
    frequency: number;
    play(): void;
    stop(): void;
    addEffect(effect: Effect): void;
    removeEffect(effect: Effect): void;
  }

  interface Effects {
    Distortion: new (options: { gain: number }) => Effect & { gain: number };
    Delay: new (options: { feedback: number; time: number; mix: number }) => Effect & {
      feedback: number;
    };
    Tremolo: new (options: { speed: number; depth: number; mix: number }) => Effect & {
      speed: number;
    };
    LowPassFilter: new (options: { frequency: number; peak: number }) => Effect & {
      frequency: number;
    };
  }

  const Pizzicato: {
    Sound: typeof Sound;
    Effects: Effects;
    context: AudioContext;
  };
  export type { Sound, Effect, Wave };
  export default Pizzicato;
}
