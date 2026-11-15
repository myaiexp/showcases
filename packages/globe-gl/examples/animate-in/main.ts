// animateIn: the globe scales and spins into place, or simply appears
import Globe, { type GlobeInstance } from 'globe.gl';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { panes: ['animateIn: true', 'animateIn: false'] });
  const day = await texture('day');

  const globes = [true, false].map((animateIn, i) => {
    const pane = stage.panes[i]!;
    return { pane, animateIn, globe: null as GlobeInstance | null };
  });

  // animateIn is a constructor option, so showing it again means building a new globe.
  const build = (): void => {
    for (const g of globes) {
      if (g.globe) stage.release(g.globe);
      g.globe = stage.own(new Globe(g.pane.container, { animateIn: g.animateIn }), g.pane)
        .globeImageUrl(day)
        .pointsData(cities)
        .pointAltitude(0.05);
    }
  };
  build();

  if (stage.bar) button(stage.bar, 'Build both again', build);
  if (stage.preview) stage.every(3500, build);

  return stage.dispose;
};

export default mount;
