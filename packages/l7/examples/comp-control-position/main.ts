// Control position: twelve slots, Zoom and Scale stacked in the same one
import { Scale, Scene, Zoom } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addControl, EUROPE_CENTER, europeZoom } from '../../shared/comp-demo.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

// The docs' Position type; the last member (an Element) has its own example.
const POSITIONS = [
  'topleft',
  'lefttop',
  'topright',
  'righttop',
  'bottomleft',
  'leftbottom',
  'bottomright',
  'rightbottom',
  'topcenter',
  'bottomcenter',
  'leftcenter',
  'rightcenter',
] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const zoom = addControl(stage, scene, new Zoom({ position: 'topleft' }));
  const scale = addControl(stage, scene, new Scale({ position: 'topleft' }));
  const out = stage.readout();
  const move = (p: (typeof POSITIONS)[number]): void => {
    zoom.setOptions({ position: p });
    scale.setOptions({ position: p });
    if (out) out.textContent = `position: '${p}'\n'top…' and 'left…'-first names stack vertically; the reversed names ('lefttop', 'righttop', …) lay out horizontally`;
  };
  if (stage.bar) select(stage.bar, 'position', POSITIONS, 'topleft', move);
  else stage.every(1100, (i) => move(POSITIONS[i % POSITIONS.length] ?? 'topleft'));

  return () => stage.dispose();
};

export default mount;
