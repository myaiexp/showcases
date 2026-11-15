// An offline video source: a canvas drawn every frame, captured into a <video> element
/**
 * The docs feed `material="src: #my-video"` from a video file. Examples have no files, so
 * `canvasVideo` paints a canvas on every animation frame and plays `canvas.captureStream()`
 * through a muted <video> with the given id, which a selector such as `#my-video` then finds.
 * Call it from an example's `setup` (before the scene markup is attached) so the element exists
 * when the material resolves its `src`. The video lives in the iframe's document and dies with it.
 */

export type VideoPainter = (g: CanvasRenderingContext2D, width: number, height: number, seconds: number) => void;

export interface CanvasVideo {
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  /** Stops painting and releases the stream. */
  stop(): void;
}

export interface CanvasVideoOptions {
  /** The element's id, for `src: #id`. */
  id: string;
  width?: number;
  height?: number;
  /** Frames per second of the captured stream. */
  fps?: number;
  /** Draws one frame. Defaults to `bouncingBalls`. */
  draw?: VideoPainter;
  /** `loop` has no meaning for a live stream; `autoplay` is on, and the video is always muted. */
  autoplay?: boolean;
}

/** The default picture: coloured balls bouncing on a dark field, with a running clock. */
export const bouncingBalls: VideoPainter = (g, w, h, t) => {
  g.fillStyle = '#16202e';
  g.fillRect(0, 0, w, h);
  for (let i = 0; i < 5; i++) {
    const x = w * (0.5 + 0.4 * Math.sin(t * (0.8 + i * 0.3) + i));
    const y = h * (0.5 + 0.35 * Math.cos(t * (1.1 + i * 0.2) + i * 2));
    g.fillStyle = `hsl(${i * 70 + t * 30}, 80%, 60%)`;
    g.beginPath();
    g.arc(x, y, h * 0.09, 0, Math.PI * 2);
    g.fill();
  }
  g.fillStyle = '#ffffff';
  g.font = `${Math.round(h / 9)}px system-ui, sans-serif`;
  g.fillText(`t = ${t.toFixed(1)} s`, w * 0.04, h * 0.14);
};

export function canvasVideo(opts: CanvasVideoOptions): CanvasVideo {
  const { id, width = 320, height = 180, fps = 24, draw = bouncingBalls, autoplay = true } = opts;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const g = canvas.getContext('2d')!;
  const t0 = performance.now();
  let raf = 0;
  const frame = (now: number): void => {
    draw(g, width, height, (now - t0) / 1000);
    raf = requestAnimationFrame(frame);
  };
  draw(g, width, height, 0);
  raf = requestAnimationFrame(frame);

  const stream = canvas.captureStream(fps);
  const video = document.createElement('video');
  video.id = id;
  video.muted = true;
  video.playsInline = true;
  video.autoplay = autoplay;
  video.srcObject = stream;
  video.style.display = 'none';
  document.body.append(video);
  if (autoplay) void video.play().catch(() => {});

  return {
    video,
    canvas,
    stop() {
      cancelAnimationFrame(raf);
      video.pause();
      for (const track of stream.getTracks()) track.stop();
    },
  };
}
