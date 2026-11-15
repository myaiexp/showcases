// atmosphereAltitude: how far the halo reaches, in globe radii
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const day = await texture('day');

  const globe = stage.own(new Globe(stage.container)).globeImageUrl(day).atmosphereAltitude(0.25);
  globe.pointOfView({ altitude: 3 });

  if (stage.bar) slider(stage.bar, 'atmosphereAltitude', 0.02, 0.8, 0.01, 0.25, (v) => globe.atmosphereAltitude(v));
  else {
    // Each change rebuilds the halo mesh, so the card steps rather than streams.
    const steps = [0.05, 0.15, 0.3, 0.5, 0.3, 0.15];
    let i = 0;
    stage.every(900, () => globe.atmosphereAltitude(steps[++i % steps.length]!));
  }

  return stage.dispose;
};

export default mount;
