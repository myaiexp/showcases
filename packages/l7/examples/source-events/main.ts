// Source events: update carries type inited or update; destroy() ends them
import { PointLayer, Scene, Source } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { EUROPE_CENTER, europeZoom, hoverTour, PLACES, spots } from '../../shared/comp-demo.ts';
import { button } from '../../shared/controls.ts';
import { eventBoard } from '../../shared/scene-board.ts';
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

  const flash = eventBoard(stage.container, ['update: inited', 'update: update']);
  // The listener goes on before the source has parsed: parsing is async, so 'inited' arrives later.
  const source = new Source(spots(30), { parser: { type: 'json', x: 'lng', y: 'lat' } });
  source.on('update', (e: { type: string }) => flash(`update: ${e.type}`));
  stage.own(() => source.removeAllListeners());
  const layer = new PointLayer().source(source).shape('circle').size(11).color('value', ['#0b3d5c', '#3aa6a8', '#ffd166', '#ff6b6b']).active(true).style({ stroke: '#0b131c', strokeWidth: 1 });
  scene.addLayer(layer);
  layer.on('click', (e: { featureId: number }) => source.updateFeaturePropertiesById(e.featureId, { value: Math.round(Math.random() * 100) }));

  const out = stage.readout();
  if (out) out.textContent = "source.on('update', ({ type }) => …): 'inited' once parsing is done, 'update' after setData or updateFeaturePropertiesById.\nThe docs list 'inited' as its own event; in 2.29.1 it is a type of 'update'.";
  let seed = 1;
  if (stage.bar) {
    button(stage.bar, 'setData(new rows)', () => source.setData(spots(30, ++seed)));
    button(stage.bar, 'updateFeaturePropertiesById(0, …)', () => source.updateFeaturePropertiesById(0, { value: Math.round(Math.random() * 100) }));
    // destroy() on a spare source: its listeners are removed and its data released.
    button(stage.bar, 'destroy() a spare source', () => {
      const spare = new Source(PLACES, { parser: { type: 'json', x: 'lng', y: 'lat' } });
      spare.on('update', () => undefined);
      spare.destroy();
      if (out) out.textContent += `\nspare.destroy(): listenerCount('update') = ${spare.listenerCount('update')}, data = ${String(spare.data)}`;
    });
  } else {
    hoverTour(stage, scene, PLACES.slice(2, 8).map((p): [number, number] => [p.lng, p.lat]), { ms: 450, click: true });
    stage.every(2200, () => source.setData(spots(30, ++seed)));
  }

  return () => stage.dispose();
};

export default mount;
