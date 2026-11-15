// fitBounds zooms the map to frame a [[minLng, minLat], [maxLng, maxLat]] box
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

type Bounds = [[number, number], [number, number]];
const BOXES: Record<string, Bounds> = {
  Europe: [[-11, 35], [32, 61]],
  Africa: [[-18, -35], [52, 37]],
  'South America': [[-82, -56], [-34, 13]],
  Australia: [[112, -44], [154, -10]],
  Japan: [[129, 31], [146, 45]],
};
type Name = keyof typeof BOXES;

const outline = ([[x0, y0], [x1, y1]]: Bounds) => ({
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      properties: {},
      geometry: { type: 'LineString' as const, coordinates: [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]] },
    },
  ],
});

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [20, 20], zoom: 1 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  const box = new LineLayer().source(outline(BOXES['Europe']!)).shape('line').size(2).color('#ffd166').style({ lineType: 'dash', dashArray: [4, 3] });
  scene.addLayer(box);
  const show = valuePanel(stage.container, 'br');
  let animate = true;
  const fit = (name: Name): void => {
    const b = BOXES[name]!;
    box.setData(outline(b));
    // options override the Scene's fitBoundsOptions for this call.
    scene.fitBounds(b, { animate });
    show({ fitBounds: name, animate: String(animate) });
  };
  fit('Europe');

  if (stage.bar) {
    select(stage.bar, 'Frame', Object.keys(BOXES) as Name[], 'Europe', fit);
    toggle(stage.bar, 'animate', true, (v) => (animate = v));
  }
  if (stage.preview) {
    const names = Object.keys(BOXES) as Name[];
    stage.every(1800, (i) => fit(names[i % names.length]!));
  }

  return () => stage.dispose();
};

export default mount;
