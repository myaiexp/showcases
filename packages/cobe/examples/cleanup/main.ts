// Cleanup recipe: a globe created and destroyed on a cycle, with counts
import createGlobe from 'cobe';
import type { Globe } from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { badge } from '../../shared/overlay.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Unmount calls destroy(); the stage then also frees the WebGL context.' });
  const info = badge(stage.layer, '', 'top-left');

  let globe: Globe | null = null;
  let created = 0;
  let live = 0;
  let phi = 0;
  const show = (): void => {
    info.textContent = `created: ${created}\nlive: ${live}`;
  };

  const create = (): void => {
    if (globe) return;
    // stage.canvas is a fresh canvas after every release(): a lost context never comes back.
    globe = stage.own(
      createGlobe(stage.canvas, {
        devicePixelRatio: stage.dpr,
        width: stage.width,
        height: stage.height,
        phi,
        theta: 0.25,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.3, 0.3, 0.3],
        markerColor: [1, 0.5, 0.2],
        glowColor: [0.2, 0.2, 0.25],
        markers: [{ location: [37.78, -122.44], size: 0.05 }],
      }),
    );
    created++;
    live++;
    show();
  };
  const destroy = (): void => {
    if (!globe) return;
    // Always clean up when unmounting
    globe.destroy();
    stage.release(globe); // destroy() again is harmless; this also loses the GL context
    globe = null;
    live--;
    show();
  };

  create();
  if (stage.bar) {
    button(stage.bar, 'Mount', create);
    button(stage.bar, 'Unmount', destroy);
  } else {
    // card: mounted for two ticks, empty for one
    let n = 1;
    stage.every(900, () => {
      n = (n + 1) % 3;
      if (n === 0) create();
      else if (n === 2) destroy();
    });
  }

  stage.loop(() => {
    if (!globe) return;
    phi += 0.01;
    globe.update({ phi });
  });

  return stage.dispose;
};

export default mount;
