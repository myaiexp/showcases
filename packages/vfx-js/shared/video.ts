// A <video> playing a canvas animation drawn in code, so nothing is fetched
import type { Stage } from './stage.ts';

const W = 480;
const H = 270;

function paint(g: CanvasRenderingContext2D, t: number): void {
  const sky = g.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, `hsl(${(220 + t * 12) % 360}, 60%, 22%)`);
  sky.addColorStop(1, `hsl(${(300 + t * 12) % 360}, 60%, 45%)`);
  g.fillStyle = sky;
  g.fillRect(0, 0, W, H);
  for (let i = 0; i < 7; i++) {
    const x = ((i * 90 + t * 60) % (W + 120)) - 60;
    const y = H * 0.5 + Math.sin(t * 2 + i) * 60;
    g.fillStyle = `hsl(${(i * 50 + t * 40) % 360}, 90%, 60%)`;
    g.beginPath();
    g.arc(x, y, 22 + 10 * Math.sin(t * 3 + i), 0, Math.PI * 2);
    g.fill();
  }
  g.fillStyle = '#0c0c18';
  g.beginPath();
  g.moveTo(0, H);
  for (let x = 0; x <= W; x += 10) g.lineTo(x, H * 0.82 + Math.sin(x * 0.03 + t * 1.5) * 10);
  g.lineTo(W, H);
  g.fill();
  g.fillStyle = '#fff';
  g.font = '700 22px system-ui, sans-serif';
  g.fillText(`${t.toFixed(1)} s`, 14, 32);
}

/**
 * A muted, looping <video> whose stream is a canvas animation. Resolves once it can play,
 * which is when `vfx.add` starts drawing it. Stops on dispose. `width` is its CSS width.
 */
export async function liveVideo(stage: Stage, width = 360): Promise<HTMLVideoElement> {
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const g = canvas.getContext('2d')!;
  paint(g, 0);
  const stream = canvas.captureStream(30);
  stage.frame((t) => paint(g, t));
  const video = document.createElement('video');
  video.className = 'vx-pic';
  video.muted = true;
  video.playsInline = true;
  video.autoplay = true;
  video.width = width;
  video.height = Math.round((width * H) / W);
  video.srcObject = stream;
  stage.onDispose(() => {
    video.pause();
    video.srcObject = null;
    for (const track of stream.getTracks()) track.stop();
  });
  await video.play().catch(() => undefined);
  return video;
}
