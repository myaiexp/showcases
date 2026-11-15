// new Source(data, options): one parsed source shared by two layers
import { type ILayer, PointLayer, Scene, Source } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { EUROPE_CENTER, europeZoom, PLACES } from '../../shared/comp-demo.ts';
import { select } from '../../shared/controls.ts';
import { placeFeatures } from '../../shared/source-demo.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const FORMATS = ['json rows', 'csv text', 'geojson'] as const;
type Format = (typeof FORMATS)[number];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  // Stands in for a fetched .csv file.
  const csv = ['name,lng,lat,pop', ...PLACES.map((p) => `${p.name},${p.lng},${p.lat},${p.pop}`)].join('\n');
  let layers: ILayer[] = [];
  const build = (format: Format): void => {
    for (const l of layers) scene.removeLayer(l);
    // The Source is made first, with the same (data, option) a layer's source() takes.
    const source =
      format === 'json rows'
        ? new Source(PLACES, { parser: { type: 'json', x: 'lng', y: 'lat' } })
        : format === 'csv text'
          ? new Source(csv, { parser: { type: 'csv', x: 'lng', y: 'lat' }, transforms: [{ type: 'map', callback: (d: Record<string, unknown>) => ({ ...d, pop: Number(d.pop) }) }] })
          : new Source(placeFeatures());
    // Two layers read the one source: layer.source(source) takes a Source object as is.
    const halo = new PointLayer().source(source).shape('circle').size('pop', [12, 34]).color('#4ecdc4').style({ opacity: 0.3 });
    const dot = new PointLayer().source(source).shape('circle').size('pop', [5, 14]).color('#ffd166').style({ stroke: '#0b131c', strokeWidth: 1 });
    layers = [halo, dot];
    for (const l of layers) scene.addLayer(l);
    const out = stage.readout();
    // Parsing is async: read the source once it has finished.
    const show = (): void => {
      if (out) out.textContent = `getParserType(): '${source.getParserType()}'\nsource.inited: ${source.inited}\nrows after parsing: ${source.data.dataArray.length}\ngetSourceCfg(): ${JSON.stringify(source.getSourceCfg(), (_k, v: unknown) => (typeof v === 'function' ? 'fn' : v))}`;
    };
    source.on('update', show);
    show();
  };
  build('json rows');
  if (stage.bar) select(stage.bar, 'data', FORMATS, FORMATS[0], build);
  else stage.every(1500, (i) => build(FORMATS[i % FORMATS.length] ?? FORMATS[0]));

  return () => stage.dispose();
};

export default mount;
