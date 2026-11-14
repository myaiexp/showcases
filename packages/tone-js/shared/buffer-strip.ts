// A waveform strip for a recording, with highlighted regions and a playhead
export interface StripState {
  /** Shaded stretches, in seconds. */
  regions?: readonly (readonly [number, number])[];
  /** Index into `regions` drawn brighter. */
  active?: number;
  /** Playhead position in seconds. */
  cursor?: number;
}

export interface Strip {
  readonly canvas: HTMLCanvasElement;
  /** Replaces the waveform (peaks are computed once here). */
  setData(data: Float32Array, duration: number): void;
  /** Computes the peaks now and returns a function that shows them later (for stage.show). */
  prepare(data: Float32Array, duration: number): () => void;
  draw(state?: StripState): void;
}

const BARS = 240;

/** A canvas showing `data` as peak bars over `duration` seconds. */
export function strip(parent: HTMLElement, height = 70): Strip {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `display:block;width:100%;height:${height}px;flex:0 0 auto;border-radius:6px;background:var(--bg-surface);border:1px solid var(--border)`;
  parent.append(canvas);
  const g = canvas.getContext('2d')!;
  let peaks: number[] = [];
  let length = 1;
  let last: StripState = {};

  const api: Strip = {
    canvas,
    setData(data, duration) {
      api.prepare(data, duration)();
    },
    prepare(data, duration) {
      const per = Math.max(1, Math.floor(data.length / BARS));
      let found: number[] = [];
      for (let b = 0; b < BARS; b++) {
        let m = 0;
        for (let i = b * per; i < Math.min(data.length, (b + 1) * per); i++) m = Math.max(m, Math.abs(data[i]!));
        found.push(m);
      }
      const top = Math.max(0.01, ...found);
      found = found.map((p) => p / top);
      return () => {
        length = duration || 1;
        peaks = found;
        api.draw(last);
      };
    },
    draw(state = last) {
      last = state;
      const w = Math.max(1, Math.round(canvas.clientWidth * Math.min(devicePixelRatio || 1, 2)));
      const h = Math.max(1, Math.round(canvas.clientHeight * Math.min(devicePixelRatio || 1, 2)));
      if (canvas.width !== w || canvas.height !== h) Object.assign(canvas, { width: w, height: h });
      g.clearRect(0, 0, w, h);
      state.regions?.forEach(([a, b], i) => {
        g.fillStyle = i === state.active ? 'rgba(122,162,255,0.55)' : 'rgba(122,162,255,0.16)';
        g.fillRect((a / length) * w, 0, Math.max(2, ((b - a) / length) * w), h);
      });
      g.fillStyle = '#e8ecf2';
      const bw = w / BARS;
      peaks.forEach((p, i) => {
        const bh = Math.max(1, p * (h - 6));
        g.fillRect(i * bw, (h - bh) / 2, Math.max(1, bw - 1), bh);
      });
      if (state.cursor !== undefined) {
        g.fillStyle = '#ff8fb1';
        g.fillRect((state.cursor / length) * w - 1, 0, 2, h);
      }
    },
  };
  return api;
}
