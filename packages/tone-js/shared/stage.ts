// Shared Tone.js stage: one spec, played live in full view, rendered silently for cards
import type { Cleanup, MountContext } from '@/types.ts';
import { runCard } from './stage-card.ts';
import { runLive } from './stage-live.ts';

/**
 * Tone.js 15.1 traps found while building this gallery, for whoever adds the next example:
 * - Cards must stay silent, so a card never plays: it renders the spec with Tone.Offline
 *   (render.ts) and animates the rendered waveform. The same build() and play() run live
 *   in the full view, so the card shows what the Play button sounds like.
 * - Tone.Offline swaps Tone's global context while it runs: inside build() and play(),
 *   Tone.getTransport(), Tone.now() and new nodes belong to whichever context is current.
 *   Never cache them at module level; call them inside build() and play().
 * - The Transport, Draw and Destination are page-wide. The stage stops and resets the
 *   Transport (bpm, swing, loop, time signature) and the Destination's volume on cleanup.
 * - Transport callbacks fire ahead of time: schedule sound at the `time` they are given,
 *   and DOM changes through stage.show(time, fn), never directly.
 * - In a card, Tone.Offline restores the page's context before it runs the offline clock,
 *   so Transport, Loop, Part and Sequence callbacks run with the page's context current.
 *   Inside a callback use only its `time` and nodes made in build(): never Tone.now(),
 *   Tone.getTransport() or a new node there.
 * - That clock runs before any audio is rendered, so an analyser (Meter, FFT, Waveform,
 *   Follower) reads silence in a card. Cards draw meters from stage.samples() instead.
 * - A card disposes what build() returned as soon as the render ends, before any cue fires:
 *   read node values (asArray(), response curves, buffers) in play() and let the cue draw.
 * - play() returning a stop function runs one pass until Stop (right for a started
 *   Transport); return nothing for a phrase the full view should repeat.
 * - A variant's apply() is synchronous: await anything async (Reverb.ready) in build().
 * - ToneAudioBuffer.reverse flips the buffer in place, which is why sample() hands out copies.
 * - LowpassCombFilter's feedback delay cannot go below one 128-sample block (5.8 ms at the
 *   card rate), so keep its notes low enough that cards and the full view agree.
 * - Card variants all render before any is shown, so state an apply() sets is the last
 *   variant's by the time the card animates: capture it in play() and draw it via show().
 * - Never call renderOffline() inside build(): it waits for the queue it is running in.
 * - Channel.send()/receive() buses are page-wide statics, never freed, owned by the first
 *   context that names them: use a bus name unique to the mount.
 * - Tone.Analyser, Meter and friends work live: the stage itself taps the Destination
 *   with an Analyser for the scope, so connecting another one there is fine.
 */

export type Show = (time: number, fn: () => void) => void;

export interface Variant<G> {
  /** Shown on the card while this variant plays. */
  label: string;
  /** Changes the built sound before the phrase is scheduled. */
  apply(g: G): void;
}

export interface ToneSpec<G> {
  /** Creates the nodes, connected to the destination. Runs once per mount (once per variant in a card). */
  build(): G | Promise<G>;
  /**
   * Schedules one pass of the phrase at AudioContext `time`. The stage replays it every
   * `seconds`. Return a stop function instead for a sound that runs until stopped (a drone,
   * or a started Transport): the full view stops it on Stop, a card at the end of `seconds`.
   */
  play(g: NoInfer<G>, time: number): void | ((time: number) => void);
  /** Full view, on Stop: silence anything play() left ringing (releaseAll, stop). */
  stop?(g: NoInfer<G>, time: number): void;
  /** Full view only: inputs that change `g` while it plays. */
  controls?(g: NoInfer<G>, bar: HTMLElement): void;
  /** Card only: versions of the sound rendered and shown in turn. */
  variants?: readonly Variant<NoInfer<G>>[];
  /** Every animation frame, with seconds into the current pass (cards and full view). */
  frame?(time: number): void;
  /** Defaults to calling dispose() on `g`, or on each value of an array or object `g`. */
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
  /** Box above the scope for the example's own visuals (keys, pads, readouts). */
  readonly visual: HTMLElement;
  /** Runs `fn` when audio `time` is heard: Tone.Draw live, the card's playhead in cards. */
  show: Show;
  /** The samples heard right now, channel 0 (for meters drawn by the example). */
  samples(): Float32Array;
  run<G>(spec: ToneSpec<G>): Promise<Cleanup>;
}

/** Internal wiring shared by the live and card runners. */
export interface StageParts {
  el: HTMLElement;
  root: HTMLElement;
  visual: HTMLElement;
  scopeBox: HTMLElement;
  opts: Required<Omit<StageOptions, 'playLabel'>> & { playLabel: string };
  signal: AbortSignal;
  setShow(show: Show): void;
  setSamples(read: () => Float32Array): void;
}

export function toneStage(el: HTMLElement, ctx: MountContext, options: StageOptions): Stage {
  const opts = { channels: 1 as const, hideScopeInCard: false, playLabel: 'Play', ...options };
  const root = document.createElement('div');
  root.style.cssText = ctx.preview
    ? 'display:flex;flex-direction:column;width:100%;height:200px;gap:4px;padding:6px;box-sizing:border-box'
    : 'display:flex;flex-direction:column;width:100%;gap:10px';
  const visual = document.createElement('div');
  // In the full view the visual gets room to be played: keys, pads and grids stretch to fill it.
  visual.style.cssText = `display:flex;flex-direction:column;justify-content:center;position:relative;${
    ctx.preview ? 'min-height:0' : 'min-height:160px'
  }`;
  const scopeBox = document.createElement('div');
  scopeBox.style.cssText = ctx.preview
    ? 'flex:1 1 0;min-height:0;position:relative'
    : 'height:150px;position:relative;background:var(--bg-surface);border:1px solid var(--border);border-radius:8px';
  root.append(visual, scopeBox);
  el.append(root);

  let show: Show = () => undefined;
  let read: () => Float32Array = () => new Float32Array(0);
  const parts: StageParts = {
    el,
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
    show: (time, fn) => show(time, fn),
    samples: () => read(),
    run: (spec) => (ctx.preview ? runCard(parts, spec) : runLive(parts, spec)),
  };
}
