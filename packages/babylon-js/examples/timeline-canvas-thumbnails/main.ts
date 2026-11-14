// Timeline control with canvas thumbnails resized by a shared Resizer
import { Resizer, Timeline } from '@babylonjs/controls';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';

const DURATION = 60;
const THUMB = { width: 128, height: 100 };

/** Draws "the video frame at `time`": a hue that drifts with time and a dot that travels. */
function frameAt(time: number): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 200;
  const g = c.getContext('2d')!;
  g.fillStyle = `hsl(${(time * 6) % 360} 55% 35%)`;
  g.fillRect(0, 0, 256, 200);
  g.fillStyle = '#fff';
  g.beginPath();
  g.arc(20 + ((time * 9) % 216), 100 + Math.sin(time * 0.7) * 60, 16, 0, Math.PI * 2);
  g.fill();
  g.font = 'bold 54px sans-serif';
  g.fillText(`${Math.round(time)}s`, 14, 62);
  return c;
}

function loadingImage(): string {
  const c = document.createElement('canvas');
  c.width = 32;
  c.height = 25;
  const g = c.getContext('2d')!;
  g.fillStyle = '#2a2f3d';
  g.fillRect(0, 0, 32, 25);
  g.fillStyle = '#4a5166';
  g.fillRect(12, 10, 8, 5);
  return c.toDataURL('image/png');
}

const mount: Mount = (el, ctx) => {
  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: ctx.preview ? '200px' : '160px', background: '#000' });
  el.append(canvas);

  // Sharing one control with the other shares its WebGL context: the resized thumbnail
  // is already a texture on the GPU, with no extra copy.
  const resizer = new Resizer(canvas);
  const timers = new Set<number>();
  const timeline = new Timeline(resizer, {
    totalDuration: DURATION,
    thumbnailWidth: THUMB.width,
    thumbnailHeight: THUMB.height,
    loadingTextureURI: loadingImage(),
    getThumbnailCallback: (time, done) => {
      // Pretend frames take a moment to decode, so the loading texture shows first.
      const id = window.setTimeout(
        () => {
          timers.delete(id);
          done(resizer.getResizedTexture(frameAt(time), THUMB));
        },
        150 + Math.random() * 450,
      );
      timers.add(id);
    },
  });

  let zoom = ctx.preview ? 40 : 30;
  let current = 0;
  let auto = true;
  timeline.setVisibleDurationZoom(zoom);
  const resizeObserver = new ResizeObserver(() => {
    resizer.engine.resize();
    timeline.resize();
  });
  resizeObserver.observe(canvas);

  let clock = 0;
  let last = performance.now();
  let readout: HTMLElement | undefined;
  timeline.runRenderLoop(() => {
    const now = performance.now();
    clock += (now - last) / 1000;
    last = now;
    if (auto) {
      current = ((Math.sin(clock * 0.25) + 1) / 2) * timeline.maxSettableTime;
      timeline.setCurrentTime(current);
    }
    if (readout) readout.textContent = `currentTime ${timeline.currentTime.toFixed(1)}s, ${timeline.visibleThumbnails} of ${timeline.totalThumbnails} thumbnails visible`;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    readout = panel.readout();
    panel.row();
    const timeSlider = panel.slider('setCurrentTime', 0, DURATION, 0.5, 0, (v) => {
      auto = false;
      autoBox.checked = false;
      timeline.setCurrentTime(v);
    });
    const autoBox = panel.check('scroll by itself', true, (on) => (auto = on));
    panel.slider('setVisibleDurationZoom %', 0, 100, 1, zoom, (v) => timeline.setVisibleDurationZoom((zoom = v)));
    void timeSlider;
  }

  return () => {
    for (const id of timers) window.clearTimeout(id);
    resizeObserver.disconnect();
    timeline.stopRenderLoop();
    timeline.dispose();
    resizer.dispose();
    canvas.remove();
  };
};

export default mount;
