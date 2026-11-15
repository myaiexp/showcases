// destroy(): what it stops, removes and leaves behind in cobe 2.0.1
import createGlobe from 'cobe';
import type { Globe } from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { badge } from '../../shared/overlay.ts';
import { button } from '../../shared/controls.ts';
import { PLACES } from '../../shared/places.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const status = badge(stage.layer, '', 'bottom-left');
  const places = [PLACES.london, PLACES.lagos, PLACES.capetown];
  let globe: Globe | null = null;
  let dead: Globe | null = null; // destroyed, its context not yet freed
  let phi = 0;

  const create = (): void => {
    globe = createGlobe(stage.canvas, {
      devicePixelRatio: stage.dpr,
      width: stage.width,
      height: stage.height,
      phi,
      theta: 0.2,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [1, 0.4, 0.4],
      glowColor: [0.3, 0.3, 0.35],
      markers: places.map((p) => ({ location: p.location, size: 0.05, id: stage.id(p.key) })),
    });
    stage.own(globe);
    for (const p of places) {
      const label = document.createElement('div');
      label.className = 'label';
      label.textContent = p.name;
      label.style.setProperty('position-anchor', `--cobe-${stage.id(p.key)}`);
      stage.layer.append(label);
    }
  };

  const destroy = (): void => {
    if (!globe) return;
    globe.destroy();
    const gl = stage.canvas.getContext('webgl2') ?? stage.canvas.getContext('webgl');
    const anchors = stage.layer.querySelectorAll('[style*="anchor-name"]').length;
    status.textContent = `destroyed · anchors left: ${anchors} · context lost: ${gl?.isContextLost()}`;
    dead = globe;
    globe = null;
  };

  const reset = (): void => {
    // Free the context destroy() kept, swapping in a fresh canvas for the next globe.
    if (dead) stage.release(dead);
    dead = null;
    for (const label of stage.layer.querySelectorAll('.label')) label.remove();
    create();
    status.textContent = 'running';
  };

  create();
  status.textContent = 'running';
  if (stage.bar) {
    button(stage.bar, 'destroy()', destroy);
    button(stage.bar, 'Create again', () => {
      if (!globe) reset();
    });
  } else {
    let tick = 0;
    stage.every(1500, () => {
      tick += 1;
      if (tick % 3 === 2) destroy();
      else if (tick % 3 === 0) reset();
    });
  }

  stage.loop(() => {
    phi += 0.005;
    globe?.update({ phi });
  });

  return stage.dispose;
};

export default mount;
