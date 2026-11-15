// Source transform 'filter': a callback keeps the rows it returns true for
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { EUROPE_CENTER, europeZoom, PLACES } from '../../shared/comp-demo.ts';
import { slider } from '../../shared/controls.ts';
import { later } from '../../shared/layer-demo.ts';
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

  const parser = { type: 'json', x: 'lng', y: 'lat' } as const;
  const filter = (min: number) => ({ type: 'filter', callback: (item: { pop: number }) => item.pop > min });
  const layer = new PointLayer()
    .source(PLACES, { parser, transforms: [filter(0)] })
    .shape('circle')
    .size('pop', [6, 20])
    .color('#ffd166')
    .style({ stroke: '#0b131c', strokeWidth: 1 });
  scene.addLayer(layer);

  const out = stage.readout();
  const apply = (min: number): void => {
    // setData re-parses with the new transforms; the callback returns true to keep a row.
    layer.setData(PLACES, { parser, transforms: [filter(min)] });
    later(stage, () => {
      const kept = layer.getSource().data.dataArray.length;
      if (out) out.textContent = `transforms: [{ type: 'filter', callback: (item) => item.pop > ${min} }]\nrows kept: ${kept} of ${PLACES.length}`;
    }, 250);
  };
  apply(0);
  if (stage.bar) slider(stage.bar, 'pop >', [0, 11, 0.5], 0, apply);
  else stage.every(900, (i) => apply([0, 2, 4, 7, 9][i % 5] ?? 0));

  return () => stage.dispose();
};

export default mount;
