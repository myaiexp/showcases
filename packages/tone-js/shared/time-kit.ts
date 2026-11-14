// Time helpers: a blip synth, a ruler of hits, and big text that follows them
import * as Tone from 'tone';
import { select } from './controls.ts';
import type { Stage, ToneSpec } from './stage.ts';
import { bigLabel, flash, type Keyboard } from './widgets.ts';

export interface Hit {
  /** Seconds after the pass starts. */
  at: number;
  /** Written large when this hit sounds. */
  text: string;
  note?: string;
  /** A stronger, higher hit with a taller marker. */
  accent?: boolean;
}

/** Anything that can play a note at a time: a Synth, or a PolySynth for simultaneous hits. */
export interface Blipper {
  triggerAttackRelease(note: string, duration: number, time: number): unknown;
}

export interface Ruler {
  /** Schedules every hit on `synth` from `time` and draws them on the ruler. */
  play(synth: Blipper, time: number, hits: readonly Hit[], caption?: string, keys?: Keyboard): void;
  /** Moves the playhead; call from the spec's frame(). */
  frame(t: number): void;
}

/** A short plucky synth for marking moments in time. */
export function blip(volume = -8): Tone.Synth {
  return new Tone.Synth({ oscillator: { type: 'triangle' }, envelope: { attack: 0.003, decay: 0.09, sustain: 0, release: 0.05 }, volume }).toDestination();
}

/**
 * A caption, the current hit's text in large type, and a ruler with one marker per hit.
 * Hits are computed in play() (Tone's Time needs the right context); the cues only draw.
 */
export function ruler(stage: Stage, seconds: number): Ruler {
  const caption = document.createElement('div');
  caption.style.cssText = `font:12px/1.3 ui-monospace,monospace;color:var(--fg-2);text-align:center;min-height:16px${stage.preview ? ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis' : ''}`;
  stage.visual.append(caption);
  const big = bigLabel(stage.visual, '');
  big.style.minHeight = stage.preview ? '34px' : '52px';
  if (stage.preview) big.style.fontSize = '13px';
  const bar = document.createElement('div');
  bar.style.cssText = `position:relative;flex:0 0 ${stage.preview ? 34 : 60}px;margin:4px 8px;border-bottom:2px solid var(--border)`;
  const head = document.createElement('div');
  head.style.cssText = 'position:absolute;top:0;bottom:0;width:2px;background:#ffb454;left:0;z-index:2';
  bar.append(head);
  stage.visual.append(bar);
  let marks: HTMLElement[] = [];

  return {
    play(synth, time, hits, cap = '', keys) {
      stage.show(time, () => {
        caption.textContent = cap;
        big.textContent = '';
        for (const m of marks) m.remove();
        marks = hits.map((h) => {
          const m = document.createElement('div');
          const tall = h.accent ? '100%' : '60%';
          m.style.cssText = `position:absolute;bottom:0;height:${tall};width:${hits.length > 60 ? 1 : 4}px;margin-left:-2px;border-radius:2px;background:#4a5678;left:${(Math.max(0, h.at) / seconds) * 100}%`;
          bar.append(m);
          return m;
        });
      });
      hits.forEach((h, i) => {
        const at = time + Math.max(0, h.at);
        const gap = hits[i + 1] ? hits[i + 1]!.at - h.at : 1;
        synth.triggerAttackRelease(h.note ?? (h.accent ? 'G5' : 'C5'), Math.max(0.005, Math.min(0.06, gap * 0.8)), at);
        stage.show(at, () => {
          big.textContent = h.text;
          const m = marks[i];
          if (m) flash(m, 0.3);
          if (keys && h.note) keys.press(h.note, 0.3);
        });
      });
    },
    frame(t) {
      head.style.left = `${Math.min(100, (t / seconds) * 100)}%`;
    },
  };
}

/** Rounds to a short fixed number of decimals, dropping trailing zeros. */
export function num(v: number, digits = 3): string {
  return String(Number(v.toFixed(digits)));
}

export interface HitCase {
  label: string;
  /** Runs first in each pass: set the tempo, time signature, and so on. */
  setup?(): void;
  /** Computes the hits (inside play(), so Tone's Time reads the right context). */
  hits(): { caption: string; hits: Hit[] };
}

/** A spec that plays one case's hits on a blip synth; each case is a card variant. */
export function hitSpec(stage: Stage, seconds: number, cases: readonly HitCase[], extra?: (bar: HTMLElement) => void, keys?: Keyboard): ToneSpec<Tone.Synth> {
  const view = ruler(stage, seconds);
  let cur = cases[0]!;
  return {
    build: () => blip(),
    play: (synth, time) => {
      cur.setup?.();
      const { caption, hits } = cur.hits();
      view.play(synth, time, hits, caption, keys);
    },
    variants: cases.map((c) => ({
      label: c.label,
      apply: () => {
        cur = c;
      },
    })),
    controls: (_, bar) => {
      select(bar, 'case', cases.map((c) => c.label), (l) => {
        cur = cases.find((c) => c.label === l) ?? cur;
      });
      extra?.(bar);
    },
    frame: (t) => view.frame(t),
  };
}

/** Hits spaced `gap` seconds apart until `seconds` is filled; `text(i)` labels each one. */
export function evenHits(gap: number, seconds: number, text: (i: number) => string, accentEvery = 0): Hit[] {
  const out: Hit[] = [];
  for (let i = 0; i * gap < seconds - 1e-6; i++) out.push({ at: i * gap, text: text(i), accent: accentEvery > 0 && i % accentEvery === 0 });
  return out;
}
