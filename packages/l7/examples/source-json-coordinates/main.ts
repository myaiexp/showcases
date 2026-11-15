// JSON parser with coordinates: points and paths read from one field
import { LineLayer, PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { EUROPE_CENTER, europeZoom, PLACES } from '../../shared/comp-demo.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  // Point rows keep their position in one field, 'coord': [lng, lat].
  const points = PLACES.map((p) => ({ name: p.name, pop: p.pop, coord: [p.lng, p.lat] }));
  // Path rows keep a whole list of vertices in 'path', like a LineString's coordinates.
  const at = (n: string): number[] => {
    const p = PLACES.find((x) => x.name === n);
    return [p?.lng ?? 0, p?.lat ?? 0];
  };
  const paths = [
    { name: 'west to north', path: [at('Lisbon'), at('Madrid'), at('Paris'), at('London'), at('Hamburg'), at('Oslo')] },
    { name: 'south to east', path: [at('Athens'), at('Rome'), at('Vienna'), at('Warsaw'), at('Helsinki')] },
  ];

  const pathLayer = new LineLayer()
    .source(paths, { parser: { type: 'json', coordinates: 'path' } })
    .shape('line')
    .size(3)
    .color('name', ['#4ecdc4', '#ff6b6b']);
  const pointLayer = new PointLayer()
    .source(points, { parser: { type: 'json', coordinates: 'coord' } })
    .shape('circle')
    .size('pop', [5, 14])
    .color('#ffd166')
    .style({ stroke: '#0b131c', strokeWidth: 1 });
  scene.addLayer(pathLayer);
  scene.addLayer(pointLayer);

  const out = stage.readout();
  if (out) out.textContent = "points: parser { type: 'json', coordinates: 'coord' }\nlines:  parser { type: 'json', coordinates: 'path' }";
  if (stage.bar) toggle(stage.bar, 'paths', true, (v) => (v ? pathLayer.show() : pathLayer.hide()));
  if (stage.preview) stage.every(70, (i) => scene.setCenter([EUROPE_CENTER[0] + Math.sin(i / 40) * 5, EUROPE_CENTER[1]]));

  return () => stage.dispose();
};

export default mount;
