// Transport helpers: a beat lane with playhead, a follower, a tiny drum kit
import * as Tone from 'tone';
import type { Stage } from './stage.ts';
import { flash } from './widgets.ts';

type Transport = ReturnType<typeof Tone.getTransport>;

const LINE = 'var(--border)';
const STRONG = '#6b7aa0';
const COLORS = ['#7aa2ff', '#ff8fb1', '#ffb454', '#7fd6a0'];

export interface Lane {
  readonly el: HTMLElement;
  /** Draws `beats` quarter notes with a stronger line (and a bar number) every `accent` beats. */
  layout(beats: number, accent?: number): void;
  /** Moves the playhead to `beat`, wrapped to the lane's length. */
  head(beat: number): void;
  /** A lasting marker at `beat`, on one of the lane's rows; returns it. */
  mark(beat: number, text?: string, row?: number, color?: string): HTMLElement;
  clearMarks(): void;
  /** A marker that flashes and fades away by itself. */
  ping(beat: number, row?: number, color?: string): void;
  /** Shades the span `from` to `to` in beats (null clears it). */
  region(from: number, to: number | null): void;
}

/** A horizontal strip measured in beats, for markers and a playhead. */
export function lane(parent: HTMLElement, rows = 1, beatsAtStart = 8): Lane {
  const height = 16 * rows + 18;
  const el = document.createElement('div');
  el.style.cssText = `position:relative;flex:1 1 auto;min-height:${height}px;max-height:${height + 40}px;width:100%;border:1px solid ${LINE};border-radius:6px;overflow:hidden;background:var(--bg-surface)`;
  const shade = document.createElement('div');
  shade.style.cssText = 'position:absolute;top:0;bottom:0;background:rgba(122,162,255,0.18);display:none';
  const playhead = document.createElement('div');
  playhead.style.cssText = 'position:absolute;top:0;bottom:0;width:2px;margin-left:-1px;background:#ffb454;z-index:3;left:0';
  const labels = document.createElement('div');
  labels.style.cssText = 'position:absolute;inset:0;pointer-events:none';
  el.append(shade, labels, playhead);
  parent.append(el);
  let beats = beatsAtStart;
  let marks: HTMLElement[] = [];

  const pct = (b: number): string => `${(b / beats) * 100}%`;
  const pill = (beat: number, row: number, color: string, text: string): HTMLElement => {
    const m = document.createElement('div');
    const big = text !== '';
    m.style.cssText = `position:absolute;left:${pct(beat)};top:${16 + row * 16}px;margin-left:-4px;min-width:8px;height:12px;border-radius:6px;background:${color};color:#0b0e14;font:600 9px/12px ui-monospace,monospace;padding:0 ${big ? 4 : 0}px;white-space:nowrap;z-index:2`;
    m.textContent = text;
    el.append(m);
    return m;
  };
  return {
    el,
    layout(n, accent = 4) {
      beats = n;
      const step = 100 / n;
      const bar = (accent / n) * 100;
      el.style.backgroundImage = `repeating-linear-gradient(90deg, ${STRONG} 0 2px, transparent 2px ${bar}%), repeating-linear-gradient(90deg, ${LINE} 0 1px, transparent 1px ${step}%)`;
      labels.replaceChildren();
      for (let b = 0, i = 1; b < n; b += accent, i++) {
        const t = document.createElement('span');
        t.textContent = String(i);
        t.style.cssText = `position:absolute;top:1px;left:${pct(b)};margin-left:4px;font:600 10px/1 ui-monospace,monospace;color:var(--fg-3)`;
        labels.append(t);
      }
    },
    head(beat) {
      const b = ((beat % beats) + beats) % beats;
      playhead.style.left = pct(b);
    },
    mark(beat, text = '', row = 0, color = COLORS[0]!) {
      const m = pill(beat, row, color, text);
      marks.push(m);
      return m;
    },
    clearMarks() {
      for (const m of marks) m.remove();
      marks = [];
    },
    ping(beat, row = 0, color = COLORS[0]!) {
      const m = pill(beat, row, color, '');
      m.animate([{ opacity: 1 }, { opacity: 0.9, offset: 0.4 }, { opacity: 0 }], { duration: 700, easing: 'ease-out' }).finished.then(
        () => m.remove(),
        () => m.remove(),
      );
    },
    region(from, to) {
      shade.style.display = to === null ? 'none' : 'block';
      if (to !== null) Object.assign(shade.style, { left: pct(from), width: `${((to - from) / beats) * 100}%` });
    },
  };
}

/**
 * Calls `onBeat(beat)` (quarter notes into the Transport timeline) every `every`, as heard.
 * It reads the position at the callback's own `time`, so it works in cards and live.
 * Make it in play() (or build()) with the Transport that will run the pass.
 */
export function follow(
  stage: Stage,
  transport: Transport,
  onBeat: (beat: number, time: number) => void,
  every: Tone.Unit.Time = '16n',
): number {
  const ppq = transport.PPQ;
  return transport.scheduleRepeat((time) => {
    const beat = transport.getTicksAtTime(time) / ppq;
    stage.show(time, () => onBeat(beat, time));
  }, every, 0);
}

/** "bar:beat:sixteenth" for a beat count, counting from 0 like the Transport's position. */
export function posText(beat: number, perBar = 4): string {
  const b = Math.max(0, beat);
  return `${Math.floor(b / perBar)}:${Math.floor(b % perBar)}:${Math.floor((b % 1) * 4)}`;
}

export interface Drums {
  kick: Tone.MembraneSynth;
  hat: Tone.NoiseSynth;
  ping: Tone.Synth;
}

/** A kick, a closed hat and a pitched blip: enough to make a Transport audible. */
export function drums(): Drums {
  return {
    kick: new Tone.MembraneSynth({ volume: -4 }).toDestination(),
    hat: new Tone.NoiseSynth({
      volume: -20,
      envelope: { attack: 0.001, decay: 0.04, sustain: 0, release: 0.01 },
    }).toDestination(),
    ping: new Tone.Synth({
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.003, decay: 0.12, sustain: 0, release: 0.05 },
      volume: -8,
    }).toDestination(),
  };
}

export const kickAt = (d: Drums, time: number): unknown => d.kick.triggerAttackRelease('C1', '8n', time);
export const hatAt = (d: Drums, time: number): unknown => d.hat.triggerAttackRelease('32n', time);
export const pingAt = (d: Drums, note: string, time: number): unknown => d.ping.triggerAttackRelease(note, '16n', time);

export interface PhraseNote {
  note: string;
  /** Beat index 0..15. */
  i: number;
}

/** Four bars of quarter notes, each bar a different arpeggio so jumps in time are audible. */
export const PHRASE: [string, PhraseNote][] = [
  'C4', 'E4', 'G4', 'E4', 'D4', 'F4', 'A4', 'F4', 'E4', 'G4', 'B4', 'G4', 'G4', 'C5', 'E5', 'C5',
].map((note, i) => [`${Math.floor(i / 4)}:${i % 4}`, { note, i }]);

/** A Part of that phrase on `synth` that pings `view` at each note, as heard. */
export function phrasePart(stage: Stage, synth: Tone.Synth, view: Lane, color = COLORS[0]!): Tone.Part {
  return new Tone.Part((time, ev: PhraseNote) => {
    synth.triggerAttackRelease(ev.note, '8n', time);
    stage.show(time, () => view.ping(ev.i, 0, color));
  }, PHRASE);
}

/** Beats from a "bars:beats:sixteenths" position, assuming `perBar` beats to the bar. */
export function beatOf(position: string, perBar = 4): number {
  const [bars = 0, beats = 0, sixteenths = 0] = position.split(':').map(Number);
  return bars * perBar + beats + sixteenths / 4;
}
