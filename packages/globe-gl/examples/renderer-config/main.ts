// rendererConfig: options passed to Three's WebGLRenderer, antialias off and on
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { cities, type City } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['{ antialias: false }', '{ antialias: true } (default)'],
    hint: 'Look at the edges of the columns and the rim of the globe.',
  });
  const dark = await texture('dark');

  const configs = [{ antialias: false }, { antialias: true, alpha: true }];
  const globes = configs.map((rendererConfig, i) => {
    const pane = stage.panes[i]!;
    const globe = stage.own(new Globe(pane.container, { rendererConfig }), pane)
      .globeImageUrl(dark)
      .pointsData(cities)
      .pointRadius((d) => 0.4 + Math.sqrt((d as City).pop) * 0.1)
      .pointAltitude((d) => (d as City).pop / 50)
      .pointColor(() => '#9be7ff');
    // Cards render one pixel per CSS pixel, where aliasing shows most.
    globe.pointOfView({ lat: 30, lng: 120, altitude: 1.4 });
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.4;
    return globe;
  });

  // Keep both cameras in step so the two panes compare like for like.
  stage.loop(() => {
    const [a, b] = globes;
    b!.camera().position.copy(a!.camera().position);
    b!.camera().quaternion.copy(a!.camera().quaternion);
  });
  globes[1]!.controls().enabled = false;

  return stage.dispose;
};

export default mount;
