// bumpImageUrl: a height image turned into a bump map, lit from the side
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['globeImageUrl only', '+ bumpImageUrl'],
    hint: 'The bump image is grey-scale: black ocean, rough grey land. It changes the shading, not the shape.',
  });
  const [atlas, bump] = await Promise.all([texture('atlas'), texture('bump')]);

  const globes = stage.panes.map((pane, i) => {
    const globe = stage.own(new Globe(pane.container), pane).globeImageUrl(atlas);
    if (i === 1) globe.bumpImageUrl(bump);
    // A close, low view: bumps show best near the terminator of the light.
    globe.pointOfView({ lat: 30, lng: 80, altitude: 0.9 });
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.5;
    return globe;
  });

  // Move the right camera with the left one, so the panes compare the same spot.
  stage.loop(() => {
    const [a, b] = globes;
    b!.camera().position.copy(a!.camera().position);
    b!.camera().quaternion.copy(a!.camera().quaternion);
  });
  globes[1]!.controls().enabled = false;

  return stage.dispose;
};

export default mount;
