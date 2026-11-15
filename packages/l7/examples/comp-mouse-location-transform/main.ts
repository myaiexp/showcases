// MouseLocation option transform: reformat the position the control shows
import { MouseLocation, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addControl, EUROPE_CENTER, europeZoom } from '../../shared/comp-demo.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

type Fmt = 'default (6 decimals)' | 'whole degrees' | 'swapped: lat, lng';
const FORMATS: Record<Fmt, (p: number[]) => number[]> = {
  'default (6 decimals)': ([lng = 0, lat = 0]) => [+lng.toFixed(6), +lat.toFixed(6)],
  'whole degrees': ([lng = 0, lat = 0]) => [Math.round(lng), Math.round(lat)],
  'swapped: lat, lng': ([lng = 0, lat = 0]) => [+lat.toFixed(2), +lng.toFixed(2)],
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const names = Object.keys(FORMATS) as Fmt[];
  const loc = addControl(stage, scene, new MouseLocation({ position: 'bottomleft', transform: FORMATS[names[1] ?? 'whole degrees'] }));
  const out = stage.readout();
  const apply = (name: Fmt): void => {
    loc.setOptions({ transform: FORMATS[name] });
    if (out) out.textContent = `transform: ${name}\nMove the pointer: the control prints what transform returns.`;
  };
  apply('whole degrees');
  if (stage.bar) select(stage.bar, 'transform', names, 'whole degrees', apply);
  else {
    const ghost = stage.ghost(scene);
    stage.every(250, (i) => {
      ghost.move(40 + ((i * 17) % 190), 40 + Math.abs(Math.sin(i / 7)) * 110);
      if (i % 8 === 0) apply(names[(i / 8) % names.length] ?? names[0] ?? 'whole degrees');
    });
  }

  return () => stage.dispose();
};

export default mount;
