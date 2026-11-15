// showPointerCursor: hand cursor over clickable things, always or per object
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { cities, type City } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const MODES = ['big cities only (function)', 'true', 'false'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the mouse over the columns: the cursor turns into a hand where a click would do something.' });
  const day = await texture('day');

  const bigOnly = (type: string, data: object): boolean => type === 'point' && ((data as City | null)?.pop ?? 0) > 15;
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(day)
    .pointsData(cities)
    .pointRadius(0.9)
    .pointColor((d) => ((d as City).pop > 15 ? '#ff9f1c' : '#9fb3c8'))
    .onPointClick((p) => globe.pointOfView({ lat: (p as City).lat, lng: (p as City).lng }, 800))
    .showPointerCursor(bigOnly);
  globe.controls().autoRotate = !stage.bar;

  if (stage.bar) {
    select(stage.bar, 'showPointerCursor', MODES, (m) =>
      globe.showPointerCursor(m === 'true' ? true : m === 'false' ? false : bigOnly),
    );
  }

  return stage.dispose;
};

export default mount;
