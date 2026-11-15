// Pictures and a live video drawn on a canvas, for overlays that need media without a request
import type { Stage } from './stage.ts';

/** A canvas of `w`×`h` that `draw` paints once; returns it as a data URL (a PNG). */
export function canvasImage(w: number, h: number, draw: (g: CanvasRenderingContext2D, w: number, h: number) => void): string {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d');
  if (!g) throw new Error('2d canvas unavailable');
  draw(g, w, h);
  return c.toDataURL('image/png');
}

/**
 * A muted `<video>` whose `srcObject` is a `captureStream()` of a canvas that `draw(g, w, h, t)`
 * repaints every 40 ms (`t` in seconds). The stage stops the stream's tracks on cleanup.
 * Passing the element to `VideoOverlay` is what the overlays tutorial does with a URL.
 */
export function canvasVideo(
  stage: Stage,
  w: number,
  h: number,
  draw: (g: CanvasRenderingContext2D, w: number, h: number, t: number) => void,
): HTMLVideoElement {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d');
  if (!g) throw new Error('2d canvas unavailable');
  const t0 = performance.now();
  const paint = (): void => draw(g, w, h, (performance.now() - t0) / 1000);
  paint();
  const stream = c.captureStream(25);
  const video = document.createElement('video');
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.srcObject = stream;
  stage.every(40, paint);
  stage.onDispose(() => {
    video.pause();
    for (const track of stream.getTracks()) track.stop();
    video.srcObject = null;
  });
  return video;
}

/** A moving scene for the video examples: a grid of a "weather map" with a drifting storm and a sweeping radar arm. */
export function stormFrame(g: CanvasRenderingContext2D, w: number, h: number, t: number): void {
  g.fillStyle = '#0d2438';
  g.fillRect(0, 0, w, h);
  g.strokeStyle = 'rgb(255 255 255 / 0.16)';
  g.lineWidth = 1;
  for (let x = 0; x <= w; x += w / 8) {
    g.beginPath();
    g.moveTo(x, 0);
    g.lineTo(x, h);
    g.stroke();
  }
  for (let y = 0; y <= h; y += h / 6) {
    g.beginPath();
    g.moveTo(0, y);
    g.lineTo(w, y);
    g.stroke();
  }
  const cx = w * (0.5 + 0.25 * Math.cos(t * 0.8));
  const cy = h * (0.5 + 0.22 * Math.sin(t * 1.3));
  const blob = g.createRadialGradient(cx, cy, 4, cx, cy, h * 0.4);
  blob.addColorStop(0, 'rgb(255 80 60 / 0.95)');
  blob.addColorStop(0.5, 'rgb(250 190 60 / 0.6)');
  blob.addColorStop(1, 'rgb(60 200 120 / 0)');
  g.fillStyle = blob;
  g.fillRect(0, 0, w, h);
  g.strokeStyle = '#7cf0ff';
  g.lineWidth = 3;
  g.beginPath();
  g.moveTo(w / 2, h / 2);
  g.lineTo(w / 2 + Math.cos(t * 2.4) * w, h / 2 + Math.sin(t * 2.4) * w);
  g.stroke();
  g.strokeRect(1.5, 1.5, w - 3, h - 3);
}
