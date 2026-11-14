// Frequency bars drawn from an AnalyserNode's byte data, on a log pitch axis
const LOW = 60;
const HIGH = 6000;
const COUNT = 44;

export interface Bars {
  /** Draws one reading: `data` from getByteFrequencyData, at the context's sample rate. */
  draw(data: Uint8Array, sampleRate: number): void;
  clear(): void;
}

export function bars(parent: HTMLElement, height: number): Bars {
  const box = document.createElement('div');
  box.style.cssText = `position:relative;width:100%;height:${height}px;flex:0 0 auto;background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;overflow:hidden`;
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
  box.append(canvas);
  parent.append(box);
  const clear = (): void => {
    const g = canvas.getContext('2d')!;
    g.clearRect(0, 0, canvas.width, canvas.height);
  };
  return {
    clear,
    draw(data, sampleRate) {
      const w = Math.max(1, box.clientWidth);
      const h = Math.max(1, box.clientHeight);
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
      const g = canvas.getContext('2d')!;
      g.clearRect(0, 0, w, h);
      const perBin = sampleRate / 2 / data.length;
      const slot = w / COUNT;
      for (let i = 0; i < COUNT; i++) {
        const from = LOW * (HIGH / LOW) ** (i / COUNT);
        const to = LOW * (HIGH / LOW) ** ((i + 1) / COUNT);
        let peak = 0;
        const last = Math.max(Math.floor(from / perBin), Math.ceil(to / perBin) - 1);
        for (let b = Math.floor(from / perBin); b <= last; b++) peak = Math.max(peak, data[b] ?? 0);
        const level = peak / 255;
        g.fillStyle = `hsl(${220 - level * 150} 80% ${40 + level * 25}%)`;
        g.fillRect(i * slot + 1, h - level * (h - 4), Math.max(1, slot - 2), level * (h - 4));
      }
    },
  };
}
