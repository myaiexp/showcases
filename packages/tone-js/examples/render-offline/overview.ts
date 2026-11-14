// Draws a rendered buffer as a waveform overview with a moving playhead
export interface Overview {
  /** Moves the playhead to `fraction` (0 to 1) of the buffer. */
  at(fraction: number): void;
}

export function overview(parent: HTMLElement, samples: Float32Array): Overview {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;min-height:40px;flex:1 1 auto;display:block';
  parent.append(canvas);
  const g = canvas.getContext('2d')!;
  let last = -1;
  const paint = (fraction: number): void => {
    const w = (canvas.width = Math.max(1, canvas.clientWidth));
    const h = (canvas.height = Math.max(1, canvas.clientHeight));
    let peak = 0.001;
    for (const v of samples) peak = Math.max(peak, Math.abs(v));
    g.clearRect(0, 0, w, h);
    const per = Math.max(1, Math.floor(samples.length / w));
    for (let x = 0; x < w; x++) {
      let m = 0;
      for (let i = x * per; i < (x + 1) * per && i < samples.length; i++) m = Math.max(m, Math.abs(samples[i]!));
      const bh = (m / peak) * (h / 2 - 2);
      g.fillStyle = x / w <= fraction ? '#7aa2ff' : 'rgba(122,162,255,0.35)';
      g.fillRect(x, h / 2 - bh, 1, bh * 2 || 1);
    }
  };
  return {
    at(fraction) {
      if (Math.abs(fraction - last) < 0.002) return;
      last = fraction;
      paint(fraction);
    },
  };
}
