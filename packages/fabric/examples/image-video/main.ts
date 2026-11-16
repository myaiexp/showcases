// Images: a <video> is a valid FabricImage source; here it plays a canvas through captureStream()
import { Canvas, FabricImage } from 'fabric';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 220], hint: 'No video file: a small canvas is animated in code, captureStream() turns it into a video, and fabric draws that video. The loop asks fabric to repaint on every frame.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, 'starting the video…');

  // The video's picture: balls bouncing on a canvas we redraw every frame.
  const feed = document.createElement('canvas');
  feed.width = 200;
  feed.height = 140;
  const g = feed.getContext('2d')!;
  const draw = (t: number): void => {
    g.fillStyle = '#1d2950';
    g.fillRect(0, 0, 200, 140);
    ['#ff7b8a', '#ffd76a', '#7fd3ff'].forEach((c, i) => {
      g.fillStyle = c;
      g.beginPath();
      g.arc(100 + 80 * Math.sin(t * (1 + i * 0.6) + i * 2), 30 + i * 40 + 12 * Math.sin(t * 3 + i), 14, 0, 7);
      g.fill();
    });
  };
  draw(0);

  const video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;
  video.width = feed.width; // fabric reads video.width/height: a video has no naturalWidth
  video.height = feed.height;
  const stream = feed.captureStream(30);
  video.srcObject = stream;
  stage.onDispose(() => {
    video.pause();
    video.srcObject = null;
    stream.getTracks().forEach((track) => track.stop());
  });

  stage.loop((_dt, t) => {
    draw(t);
    canvas.requestRenderAll(); // the video changes by itself; fabric must be told to paint it again
  });

  void start();
  async function start(): Promise<void> {
    await video.play().catch(() => undefined);
    if (stage.disposed) return;
    const image = new FabricImage(video, { left: 160, top: 110, width: feed.width, height: feed.height, scaleX: 1.3, scaleY: 1.3, objectCaching: false, stroke: '#3b2a8c', strokeWidth: 3 });
    canvas.add(image);
    say(`video ${video.videoWidth || '?'} × ${video.videoHeight || '?'} · readyState ${video.readyState}`);
    stage.every(500, () => say(`video ${video.videoWidth} × ${video.videoHeight} · t ${video.currentTime.toFixed(1)} s`));
  }

  return stage.dispose;
};

export default mount;
