// Hexed Polygons: hexPolygonCurvatureResolution, flat coarse vs curved fine
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { countries, type Country } from '../../shared/world.ts';

const region = countries.filter((c) => c.properties.center[1] > -20 && c.properties.center[1] < 60 && c.properties.center[0] > -5 && c.properties.center[0] < 60);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['curvature 40°', 'curvature 3°'],
    hint: 'Big level-1 hexagons raised high: with a coarse curvature resolution their lids are flat plates.',
  });
  const dark = await texture('dark');

  const globes = [40, 3].map((res, i) => {
    const globe = stage.own(new Globe(stage.panes[i]!.container), stage.panes[i])
      .globeImageUrl(dark)
      .hexPolygonsData(region)
      .hexPolygonResolution(1)
      .hexPolygonMargin(0.1)
      .hexPolygonAltitude(0.06)
      .hexPolygonColor((d) => `hsl(${((d as Country).properties.index * 53) % 360}, 70%, 58%)`)
      .hexPolygonCurvatureResolution(res);
    globe.pointOfView({ lat: 20, lng: 20, altitude: 1.9 });
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.5;
    return globe;
  });

  if (stage.bar) {
    slider(stage.bar, 'Left pane', 1, 90, 1, 40, (v) => {
      globes[0]!.hexPolygonCurvatureResolution(v);
      stage.panes[0]!.caption!.textContent = `curvature ${v}°`;
    }, (v) => `${v}°`);
  }
  return stage.dispose;
};

export default mount;
