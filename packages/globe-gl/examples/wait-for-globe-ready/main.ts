// waitForGlobeReady: hold layers back until the globe image has loaded, or not
import Globe, { type GlobeInstance } from 'globe.gl';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['waitForGlobeReady: true', 'waitForGlobeReady: false'],
    hint: 'Left, nothing shows until the image has loaded; right, the columns show at once. The readout times each onGlobeReady.',
  });
  const day = await texture('day');
  const log = stage.bar && readout(stage.box);

  const panes = [true, false].map((wait, i) => ({ wait, pane: stage.panes[i]!, globe: null as GlobeInstance | null }));

  const build = (): void => {
    const start = performance.now();
    const lines: string[] = [];
    for (const p of panes) {
      if (p.globe) stage.release(p.globe);
      const globe = stage.own(new Globe(p.pane.container, { waitForGlobeReady: p.wait, animateIn: false }), p.pane)
        .globeImageUrl(day)
        .pointsData(cities)
        .pointColor(() => '#ff7b54')
        .onGlobeReady(() => {
          lines.push(`waitForGlobeReady: ${p.wait} → onGlobeReady after ${Math.round(performance.now() - start)} ms`);
          if (log) log.textContent = lines.join('\n');
        });
      p.globe = globe;
    }
  };
  build();

  if (stage.bar) button(stage.bar, 'Build both again', build);
  if (stage.preview) stage.every(3500, build);

  return stage.dispose;
};

export default mount;
