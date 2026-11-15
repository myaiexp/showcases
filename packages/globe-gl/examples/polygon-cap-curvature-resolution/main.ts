// Polygons: polygonCapCurvatureResolution on wireframe caps, coarse and fine
import Globe from 'globe.gl';
import { MeshBasicMaterial } from 'three';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { countries } from '../../shared/world.ts';

// A band of countries across Africa and Europe keeps the faces countable.
const band = countries.filter((c) => c.properties.center[1] > -20 && c.properties.center[1] < 50 && c.properties.center[0] > -5 && c.properties.center[0] < 60);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['resolution 20°', 'resolution 2°'],
    hint: 'Wireframe caps show the triangles. A finer angular resolution cuts big countries into more, smaller faces.',
  });
  const dark = await texture('dark');
  const wire = new MeshBasicMaterial({ color: '#7bdff2', wireframe: true });
  stage.onDispose(() => wire.dispose());

  const globes = [20, 2].map((res, i) => {
    const globe = stage.own(new Globe(stage.panes[i]!.container), stage.panes[i])
      .globeImageUrl(dark)
      .polygonsData(band)
      .polygonAltitude(0.03)
      .polygonCapMaterial(wire)
      .polygonSideColor(() => '#1d4e75')
      .polygonCapCurvatureResolution(res);
    globe.pointOfView({ lat: 25, lng: 20, altitude: 1.9 });
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.6;
    return globe;
  });

  if (stage.bar) {
    slider(stage.bar, 'Right pane', 1, 20, 1, 2, (v) => {
      globes[1]!.polygonCapCurvatureResolution(v);
      stage.panes[1]!.caption!.textContent = `resolution ${v}°`;
    }, (v) => `${v}°`);
  }
  return stage.dispose;
};

export default mount;
