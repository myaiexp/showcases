// setCenter with padding: the centre point is offset from the container's edges
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const PARIS: [number, number] = [2.35, 48.86];
const PADDINGS = {
  none: undefined,
  'top: 100': { top: 100 },
  'left: 150': { left: 150 },
  '[60, 0, 0, 180]': [60, 0, 0, 180] as [number, number, number, number],
  '80 (all sides)': 80,
};
type Key = keyof typeof PADDINGS;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: PARIS, zoom: 4 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  scene.addLayer(
    new PointLayer()
      .source([{ lng: PARIS[0], lat: PARIS[1] }], { parser: { type: 'json', x: 'lng', y: 'lat' } })
      .shape('circle')
      .size(10)
      .color('#ffd166')
      .style({ stroke: '#fff', strokeWidth: 2 }),
  );
  const show = valuePanel(stage.container, 'br');
  const apply = (key: Key): void => {
    const padding = PADDINGS[key];
    // The same centre each time: only the padding moves where it lands in the container.
    if (padding === undefined) scene.setCenter(PARIS);
    else scene.setCenter(PARIS, { padding });
    show({ padding: key });
  };
  apply('none');

  if (stage.bar) select(stage.bar, 'padding', Object.keys(PADDINGS) as Key[], 'none', apply);
  if (stage.preview) {
    const keys = Object.keys(PADDINGS) as Key[];
    stage.every(1400, (i) => apply(keys[i % keys.length]!));
  }

  return () => stage.dispose();
};

export default mount;
