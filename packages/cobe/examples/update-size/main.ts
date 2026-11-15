// Resizing with update(): a ResizeObserver passes the new width and height
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { badge } from '../../shared/overlay.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    aspect: 1.6,
    hint: 'Drag the corner of the box to resize it.',
  });
  const box = stage.layer;
  const size = badge(box, '', 'top-left');

  const globe = createGlobe(stage.canvas, {
    devicePixelRatio: stage.dpr,
    width: stage.width,
    height: stage.height,
    phi: 0,
    theta: 0.2,
    dark: 1,
    diffuse: 1.4,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.35, 0.3, 0.45],
    markerColor: [1, 0.7, 0.3],
    glowColor: [0.4, 0.3, 0.6],
  });
  stage.own(globe);

  // update() resizes the canvas only when it gets both width and height.
  const observer = new ResizeObserver(([entry]) => {
    if (!entry) return;
    const width = Math.round(entry.contentRect.width);
    const height = Math.round(entry.contentRect.height);
    globe.update({ width, height });
    size.textContent = `${width}×${height} css → ${stage.canvas.width}×${stage.canvas.height} canvas`;
  });
  observer.observe(box);
  stage.onDispose(() => observer.disconnect());

  if (stage.bar) {
    // The user resizes the box with its corner handle.
    box.style.resize = 'both';
    box.style.overflow = 'hidden';
    box.style.border = '1px dashed var(--fg-3)';
    box.style.minWidth = '120px';
    box.style.minHeight = '120px';
    box.style.maxWidth = '100%';
  }

  let phi = 0;
  stage.loop((_dt, t) => {
    phi += 0.004;
    if (stage.preview) {
      // Card: the box breathes, so the observer keeps firing.
      box.style.width = `${Math.round(stage.width * (0.7 + 0.3 * Math.sin(t * 0.9)))}px`;
      box.style.height = `${Math.round(stage.height * (0.75 + 0.25 * Math.cos(t * 0.7)))}px`;
    }
    globe.update({ phi });
  });

  return stage.dispose;
};

export default mount;
