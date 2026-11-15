// lineHoverPrecision: how close the pointer must be to a 1px line to hover it
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { readout, slider } from '../../shared/controls.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The paths are 1px lines. Raise the precision and the pointer catches them from further away.' });
  const dark = await texture('dark');
  const log = readout(stage.preview ? stage.container : stage.box, 'not hovering');
  if (stage.preview) log.style.cssText += ';position:absolute;left:6px;top:4px;z-index:2';

  // Parallels of latitude every 10°, as thin paths with no stroke width.
  const lines = [-40, -30, -20, -10, 0, 10, 20, 30, 40].map((lat) => ({
    name: `${lat}°`,
    points: Array.from({ length: 73 }, (_, i) => [lat, -180 + i * 5]),
  }));
  let hovered: object | null = null;
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .pathsData(lines)
    .pathPoints('points')
    .pathColor((d: object) => (d === hovered ? '#ff5d73' : '#8ecae6'))
    .pathTransitionDuration(0)
    .lineHoverPrecision(0.2)
    .onPathHover((p) => {
      hovered = p;
      globe.pathColor(globe.pathColor());
      log.textContent = p ? `hovering latitude ${(p as { name: string }).name}` : 'not hovering';
    });
  globe.pointOfView({ lat: 0, lng: 0, altitude: 1.8 });

  if (stage.bar) slider(stage.bar, 'lineHoverPrecision', 0, 6, 0.1, 0.2, (v) => globe.lineHoverPrecision(v));
  else {
    // The fake pointer rests 3° off the equator; it reaches the line only at the high setting.
    const ghost = stage.ghost(globe);
    const near = city('Lagos');
    let high = false;
    stage.every(600, () => ghost.at(-3, near.lng));
    stage.every(2000, () => {
      high = !high;
      globe.lineHoverPrecision(high ? 5 : 0.2);
      log.textContent = `lineHoverPrecision(${high ? 5 : 0.2})`;
    });
  }

  return stage.dispose;
};

export default mount;
