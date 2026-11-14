// Shared Pizzicato stage: one spec, played live in full view, silent in cards
import type { Cleanup, MountContext } from '@/types.ts';
import { runCard } from './stage-card.ts';
import { runLive } from './stage-live.ts';

/**
 * Pizzicato 0.6.4 traps found while building this gallery, for whoever adds the next example:
 * - Cards must stay silent, so a card never plays: render.ts points Pizzicato.context at an
 *   OfflineAudioContext, runs build() and play(), and the card loops the rendered waveform.
 *   The same build() and play() run live in the full view, behind a Play button.
 * - Pizzicato acts "now": play(), stop(), addEffect() and every property setter take effect
 *   at the current time. Timed steps go through play()'s `at(seconds, fn)`: a timer live,
 *   a suspend of the offline render in a card. Never use setTimeout in a spec.
 * - DOM changes made inside play() or an at() step go through stage.show(fn): a card runs
 *   every step before it animates, and replays what show() recorded at the right moment.
 * - Pizzicato.context is the offline one only while a card renders. Read it inside build(),
 *   play() and at() steps, never at module level or in a frame() callback.
 * - An effect's LFO (Tremolo, Flanger, RingModulator) is an oscillator started for good:
 *   the default dispose stops every OscillatorNode an effect holds, or it runs forever.
 * - Groups refuse detached sounds (the README says so), and both connect to the page-wide
 *   Pizzicato.masterGainNode; the stage scopes that node, so leave sounds attached unless
 *   the example is about `detached`.
 * - stop() and pause() fade over `release` and stop the source on a window timer, so a new
 *   play() inside the release starts a new source while the old one fades out.
 * - A file sound loads with XMLHttpRequest. Cards may not fetch, so paths are blob: URLs
 *   of recordings rendered in code (recordings.ts); build() awaits the load callback.
 * - Pizzicato.volume is page-wide: the stage puts it back to 1 on cleanup, and a card
 *   copies it onto its offline master after every step.
 * - Pizzicato replaces AudioNode.prototype.connect page-wide; vite.config.ts routes the
 *   import through entry.ts, which reinstalls one that keeps output and input indices.
 */

export type At = (seconds: number, fn: () => void) => void;

export interface Variant<G> {
  /** Shown on the card while this variant plays. */
  label: string;
  /** Changes the built sound before play() runs. */
  apply(g: G): void;
}

export interface PzSpec<G> {
  /** Creates sounds and effects. Runs once per mount (once per variant in a card). */
  build(): G | Promise<G>;
  /**
   * Starts one pass and books its timed steps with `at`. The full view repeats it every
   * `seconds`. Return a stop function instead for a sound that runs until Stop (a drone):
   * the full view calls it on Stop, a card simply ends.
   */
  play(g: NoInfer<G>, at: At): void | (() => void);
  /** Full view, on Stop: silence anything play() left running. Defaults to stopping every Sound and Group in `g`. */
  stop?(g: NoInfer<G>): void;
  /** Full view only: inputs that change `g` while it plays. */
  controls?(g: NoInfer<G>, bar: HTMLElement): void;
  /** Card only: versions of the sound rendered and shown in turn. */
  variants?: readonly Variant<NoInfer<G>>[];
  /** Every animation frame, with seconds into the current pass (cards and full view). */
  frame?(time: number): void;
  /** Defaults to releaseAll(g): stops and disconnects every Sound, Group and Effect in `g`. */
  dispose?(g: NoInfer<G>): void;
}

export interface StageOptions {
  /** Length of one pass in seconds: what a card renders and loops. */
  seconds: number;
  /** 2 draws left and right separately, for stereo effects. */
  channels?: 1 | 2;
  /** Card only: true when the example's own visual should fill the card with no scope. */
  hideScopeInCard?: boolean;
  /** Text on the Play button. */
  playLabel?: string;
}

export interface Stage {
  readonly preview: boolean;
  readonly signal: AbortSignal;
  /** Box above the scope for the example's own visuals (keys, pedals, readouts). */
  readonly visual: HTMLElement;
  /** Runs `fn` when the current moment is heard: now live, at its time in a card's loop. */
  show(fn: () => void): void;
  /** The samples heard right now, channel 0 (for meters drawn by the example). */
  samples(): Float32Array;
  run<G>(spec: PzSpec<G>): Promise<Cleanup>;
}

/** Internal wiring shared by the live and card runners. */
export interface StageParts {
  root: HTMLElement;
  visual: HTMLElement;
  scopeBox: HTMLElement;
  opts: Required<StageOptions>;
  signal: AbortSignal;
  setShow(show: (fn: () => void) => void): void;
  setSamples(read: () => Float32Array): void;
}

export function pzStage(el: HTMLElement, ctx: MountContext, options: StageOptions): Stage {
  const opts = { channels: 1 as const, hideScopeInCard: false, playLabel: 'Play', ...options };
  const root = document.createElement('div');
  root.style.cssText = ctx.preview
    ? 'display:flex;flex-direction:column;width:100%;height:200px;gap:4px;padding:6px;box-sizing:border-box'
    : 'display:flex;flex-direction:column;width:100%;gap:10px';
  const visual = document.createElement('div');
  visual.style.cssText = `display:flex;flex-direction:column;justify-content:center;position:relative;${
    ctx.preview ? 'min-height:0' : 'min-height:160px'
  }`;
  const scopeBox = document.createElement('div');
  scopeBox.style.cssText = ctx.preview
    ? 'flex:1 1 0;min-height:0;position:relative'
    : 'height:150px;position:relative;background:var(--bg-surface);border:1px solid var(--border);border-radius:8px';
  root.append(visual, scopeBox);
  el.append(root);

  let show: (fn: () => void) => void = (fn) => fn();
  let read: () => Float32Array = () => new Float32Array(0);
  const parts: StageParts = {
    root,
    visual,
    scopeBox,
    opts,
    signal: ctx.signal,
    setShow: (s) => {
      show = s;
    },
    setSamples: (r) => {
      read = r;
    },
  };

  return {
    preview: ctx.preview,
    signal: ctx.signal,
    visual,
    show: (fn) => show(fn),
    samples: () => read(),
    run: (spec) => (ctx.preview ? runCard(parts, spec) : runLive(parts, spec)),
  };
}
