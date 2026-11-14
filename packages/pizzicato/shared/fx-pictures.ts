// Effect visuals: echo timeline, speakers, gauges, level meter
const MONO = 'ui-monospace,monospace';
const BLUE = '#7aa2ff';

/** One thing drawn on a timeline: a bar (a hit or an echo) or a shaped area (a reverb tail). */
export type Item =
  | { kind: 'bar'; t: number; level: number; color?: string; tag?: string }
  | { kind: 'area'; t: number; length: number; shape: (x: number) => number; color?: string };

export interface Timeline {
  /** Replaces what is drawn. */
  set(items: readonly Item[]): void;
  /** Moves the playhead to `seconds`; null hides it. Things already heard are drawn bright. */
  head(seconds: number | null): void;
}

/** A strip of time `seconds` long, with a playhead sweeping across it. */
export function timeline(parent: HTMLElement, seconds: number, height = 40): Timeline {
  const box = document.createElement('div');
  box.style.cssText = `position:relative;width:100%;height:${height}px;flex:0 0 auto;background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;overflow:hidden`;
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
  box.append(canvas);
  parent.append(box);
  let items: readonly Item[] = [];
  let now: number | null = null;

  const draw = (): void => {
    const w = Math.max(1, box.clientWidth);
    const h = Math.max(1, box.clientHeight);
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;
    const g = canvas.getContext('2d')!;
    g.clearRect(0, 0, w, h);
    const x = (t: number): number => (t / seconds) * w;
    g.font = `600 9px ${MONO}`;
    g.textAlign = 'center';
    for (const item of items) {
      const heard = now !== null && item.t <= now;
      g.globalAlpha = heard ? 1 : 0.3;
      g.fillStyle = item.color ?? BLUE;
      if (item.kind === 'bar') {
        const bh = Math.max(2, item.level * (h - 14));
        g.fillRect(x(item.t) - 2, h - bh, 5, bh);
        if (item.tag) g.fillText(item.tag, x(item.t) + 0.5, h - bh - 2);
      } else {
        g.beginPath();
        g.moveTo(x(item.t), h);
        const steps = 48;
        for (let i = 0; i <= steps; i++) g.lineTo(x(item.t + (item.length * i) / steps), h - item.shape(i / steps) * (h - 6));
        g.lineTo(x(item.t + item.length), h);
        g.fill();
      }
    }
    g.globalAlpha = 1;
    if (now !== null) {
      g.fillStyle = '#ff8fb1';
      g.fillRect(x(now), 0, 2, h);
    }
  };
  draw();
  return {
    set(next) {
      items = next;
      draw();
    },
    head(s) {
      now = s;
      draw();
    },
  };
}

export interface Stereo {
  /** How loud the left and right speakers are, 0 to 1; the dot sits between them. */
  set(left: number, right: number): void;
}

/** Two speakers with a dot between them: where the sound is coming from. */
export function stereo(parent: HTMLElement): Stereo {
  const row = document.createElement('div');
  row.style.cssText = `display:flex;align-items:center;gap:8px;width:100%;flex:0 0 auto;padding:0 4px;box-sizing:border-box;font:700 12px/1 ${MONO};color:var(--fg-2)`;
  const speaker = (name: string): HTMLElement => {
    const s = document.createElement('div');
    s.textContent = name;
    s.style.cssText =
      'width:26px;height:26px;border-radius:50%;border:2px solid #7aa2ff;display:flex;align-items:center;justify-content:center;flex:0 0 auto;transition:background .08s';
    return s;
  };
  const left = speaker('L');
  const right = speaker('R');
  const track = document.createElement('div');
  track.style.cssText = 'position:relative;flex:1 1 0;height:26px;border-bottom:1px dashed var(--border)';
  const dot = document.createElement('div');
  dot.style.cssText = 'position:absolute;top:6px;width:14px;height:14px;margin-left:-7px;border-radius:50%;background:#ff8fb1';
  track.append(dot);
  row.append(left, track, right);
  parent.append(row);
  const lit = (el: HTMLElement, level: number): void => {
    el.style.background = `rgba(122,162,255,${0.08 + 0.92 * level})`;
    el.style.color = level > 0.5 ? '#0b0d12' : 'var(--fg-2)';
  };
  return {
    set(l, r) {
      lit(left, l);
      lit(right, r);
      dot.style.left = `${(0.5 + (r - l) / 2) * 100}%`;
    },
  };
}

export interface Gauge {
  /** Fills the bar to `fraction` (0 to 1) and writes the value text. */
  set(fraction: number, text?: string): void;
}

/** A labelled horizontal bar. */
export function gauge(parent: HTMLElement, label: string, color = BLUE): Gauge {
  const row = document.createElement('div');
  row.style.cssText = `display:flex;align-items:center;gap:6px;width:100%;flex:0 0 auto;font:11px/1 ${MONO};color:var(--fg-2);padding:0 4px;box-sizing:border-box`;
  const name = document.createElement('span');
  name.textContent = label;
  name.style.cssText = 'flex:0 0 66px';
  const track = document.createElement('div');
  track.style.cssText = 'flex:1 1 0;height:8px;border-radius:4px;background:var(--bg-surface);border:1px solid var(--border);overflow:hidden';
  const fill = document.createElement('div');
  fill.style.cssText = `height:100%;width:0;background:${color}`;
  track.append(fill);
  const value = document.createElement('span');
  value.style.cssText = 'flex:0 0 58px;text-align:right';
  row.append(name, track, value);
  parent.append(row);
  return {
    set(fraction, text = '') {
      fill.style.width = `${Math.max(0, Math.min(1, fraction)) * 100}%`;
      value.textContent = text;
    },
  };
}

/** A loudness bar that follows the sound: call the returned function every frame. */
export function meter(parent: HTMLElement, read: () => Float32Array, label = 'loudness'): () => void {
  const g = gauge(parent, label, '#7be0a6');
  let level = 0;
  return () => {
    let peak = 0;
    for (const s of read()) peak = Math.max(peak, Math.abs(s));
    level = Math.max(peak, level * 0.9);
    g.set(Math.min(1, level * 1.8));
  };
}

/** The dry and wet levels the library gives a `mix` value (src/Util.js). */
export function dryWet(mix: number): { dry: number; wet: number } {
  return { dry: mix <= 0.5 ? 1 : 1 - (mix - 0.5) * 2, wet: mix >= 0.5 ? 1 : 1 - (0.5 - mix) * 2 };
}

export interface EchoPlan {
  kind: 'delay' | 'pingpong' | 'dub';
  /** Seconds into the pass the sound starts. */
  start: number;
  time: number;
  feedback: number;
  mix: number;
  /** Dub delay only: how dark each repeat gets. */
  cutoff?: number;
  color?: string;
}

/**
 * What a delay will do to one hit, as bars: the hit itself, then each echo, quieter by
 * `feedback` every time. The ping pong's echoes alternate L and R, the dub's get darker.
 * (The levels follow the wiring in src/Effects/Delay.js, PingPongDelay.js and DubDelay.js.)
 */
export function echoBars(plan: EchoPlan, seconds: number): Item[] {
  const { dry, wet } = dryWet(plan.mix);
  const color = plan.color ?? BLUE;
  const bars: Item[] = [];
  if (dry > 0.02) bars.push({ kind: 'bar', t: plan.start, level: dry, color });
  // The plain delay sends the input straight into the delay; the other two scale it by feedback first.
  const first = plan.kind === 'delay' ? 0 : 1;
  for (let k = 1; k < 60; k++) {
    const t = plan.start + k * plan.time;
    const level = wet * plan.feedback ** (k - 1 + first);
    if (t >= seconds || level < 0.04 || plan.time <= 0) break;
    if (plan.kind === 'pingpong') bars.push({ kind: 'bar', t, level, color: k % 2 ? '#7aa2ff' : '#ffb86b', tag: k % 2 ? 'L' : 'R' });
    else if (plan.kind === 'dub') bars.push({ kind: 'bar', t, level, color: `hsl(220 70% ${Math.max(26, 72 - k * 16 * (1 - (plan.cutoff ?? 700) / 4000))}%)` });
    else bars.push({ kind: 'bar', t, level, color });
  }
  return bars;
}
