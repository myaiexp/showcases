// A small 2D pad on a canvas: drag to set a point, children are shown as dots
export interface Pad {
  el: HTMLCanvasElement;
  /** Moves the cursor and redraws; x and y run from -1 to 1. */
  set(x: number, y: number): void;
  dispose(): void;
}

export function createPad(parent: HTMLElement, dots: { label: string; x: number; y: number }[], onChange: (x: number, y: number) => void): Pad {
  const size = 170;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  Object.assign(canvas.style, { width: `${size}px`, height: `${size}px`, touchAction: 'none', cursor: 'crosshair', alignSelf: 'center' });
  parent.append(canvas);
  const g = canvas.getContext('2d')!;
  const ac = new AbortController();
  let cx = 0;
  let cy = 0;

  const toPx = (v: number): number => (v * 0.42 + 0.5) * size;
  const draw = (): void => {
    g.clearRect(0, 0, size, size);
    g.fillStyle = '#1a1c24';
    g.fillRect(0, 0, size, size);
    g.strokeStyle = '#3a4152';
    g.beginPath();
    g.moveTo(size / 2, 0);
    g.lineTo(size / 2, size);
    g.moveTo(0, size / 2);
    g.lineTo(size, size / 2);
    g.stroke();
    g.font = '10px sans-serif';
    g.textAlign = 'center';
    for (const d of dots) {
      g.fillStyle = '#7bc67b';
      g.beginPath();
      g.arc(toPx(d.x), toPx(-d.y), 4, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = '#aab0c0';
      g.fillText(d.label, toPx(d.x), toPx(-d.y) + (d.y > 0 ? 16 : -8));
    }
    g.fillStyle = '#f2c14e';
    g.beginPath();
    g.arc(toPx(cx), toPx(-cy), 6, 0, Math.PI * 2);
    g.fill();
  };
  const fromEvent = (e: PointerEvent): void => {
    const r = canvas.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) / 0.42;
    const y = -((e.clientY - r.top) / r.height - 0.5) / 0.42;
    cx = Math.max(-1.2, Math.min(1.2, x));
    cy = Math.max(-1.2, Math.min(1.2, y));
    onChange(cx, cy);
    draw();
  };
  let down = false;
  canvas.addEventListener('pointerdown', (e) => {
    down = true;
    canvas.setPointerCapture(e.pointerId);
    fromEvent(e);
  }, { signal: ac.signal });
  canvas.addEventListener('pointermove', (e) => down && fromEvent(e), { signal: ac.signal });
  canvas.addEventListener('pointerup', () => (down = false), { signal: ac.signal });
  draw();

  return {
    el: canvas,
    set(x, y) {
      cx = x;
      cy = y;
      draw();
    },
    dispose: () => ac.abort(),
  };
}
