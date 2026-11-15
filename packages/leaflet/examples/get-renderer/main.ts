// map.getRenderer(layer) answers which renderer a path uses: its own, its pane's, or the map's
import { Canvas, LeafletMap, Polyline, SVG, type Renderer } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

type Kind = 'default' | 'canvas';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Three lines on one map. Switch the map\'s own renderer option and read what getRenderer returns for each.' });
  const pre = stage.side('map.getRenderer(layer)');
  let map: LeafletMap | null = null;
  stage.own({ remove: () => map?.remove() });
  let lines: string[] = [];

  const build = (kind: Kind): void => {
    map?.remove();
    // 'default' leaves the renderer option out: the map picks an SVG renderer itself.
    map = new LeafletMap(stage.box, {
      center: [60.2, 24.9],
      zoom: 7,
      zoomControl: !stage.preview,
      ...(kind === 'canvas' ? { renderer: new Canvas() } : {}),
    });
    new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 18, attribution: LAND_ATTRIBUTION }).addTo(map);
    map.createPane('routes');

    const plain = new Polyline([[59.8, 23.2], [60.5, 24.6]], { color: '#7cb7ff', weight: 5 }).addTo(map);
    const own = new Polyline([[60.0, 24.0], [60.7, 25.6]], { color: '#f59e0b', weight: 5, renderer: new SVG() }).addTo(map);
    const inPane = new Polyline([[59.7, 25.2], [60.3, 26.6]], { color: '#34d399', weight: 5, pane: 'routes' }).addTo(map);

    const m = map;
    const name = (r: Renderer): string => r.constructor.name;
    const rows: [string, Polyline][] = [
      ['plain line', plain],
      ['renderer: new SVG()', own],
      ['pane: "routes"', inPane],
    ];
    lines = rows.map(([label, layer]) => {
      const r = m.getRenderer(layer);
      return `${label.padEnd(20)} ${name(r)}${r === m.getRenderer(plain) ? '  (same as plain line)' : ''}`;
    });
    lines.unshift(`map renderer option: ${kind === 'canvas' ? 'new Canvas()' : '(unset)'}`);
    if (pre) pre.textContent = lines.join('\n');
    else {
      const [a, b, c] = rows.map(([, layer]) => name(m.getRenderer(layer)));
      stage.say(`map renderer ${kind === 'canvas' ? 'new Canvas()' : 'unset'}: plain ${a}, own ${b}, pane ${c}`);
    }
  };
  stage.select<Kind>(
    'map renderer',
    [
      { value: 'default', label: 'unset (SVG)' },
      { value: 'canvas', label: 'new Canvas()' },
    ],
    'default',
    build,
  );
  build('default');

  if (stage.preview) {
    let kind: Kind = 'default';
    stage.every(3000, () => build((kind = kind === 'default' ? 'canvas' : 'default')));
  }
  return () => stage.dispose();
};

export default mount;
