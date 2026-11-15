// The map's renderer option: SVG makes a DOM element per path, Canvas draws them on one canvas
import { Canvas, CircleMarker, LeafletMap, SVG } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { scatter } from '../../shared/scatter.ts';

type Kind = 'svg' | 'canvas';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Same 250 circles each time. Only the renderer changes: count the elements Leaflet put in the map.' });
  const points = scatter(250, [43, -4, 60, 28]);
  let map: LeafletMap | null = null;
  stage.own({ remove: () => map?.remove() });

  const build = (kind: Kind): void => {
    map?.remove();
    // A renderer instance belongs to one map: make a new one each time.
    map = new LeafletMap(stage.box, {
      center: [51, 12],
      zoom: 4,
      zoomControl: !stage.preview,
      renderer: kind === 'svg' ? new SVG() : new Canvas(),
    });
    new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 18, attribution: LAND_ATTRIBUTION }).addTo(map);
    for (const p of points) new CircleMarker(p, { radius: 6, color: kind === 'svg' ? '#7cb7ff' : '#f59e0b', weight: 1, fillOpacity: 0.5 }).addTo(map);
    const root = map.getContainer();
    const paths = root.querySelectorAll('.leaflet-overlay-pane path').length;
    const canvases = root.querySelectorAll('.leaflet-overlay-pane canvas').length;
    stage.say(`new ${kind === 'svg' ? 'SVG' : 'Canvas'}(): ${paths} <path> elements, ${canvases} <canvas> element${canvases === 1 ? '' : 's'}`);
  };
  stage.select<Kind>(
    'renderer',
    [
      { value: 'svg', label: 'SVG' },
      { value: 'canvas', label: 'Canvas' },
    ],
    'svg',
    build,
  );
  build('svg');

  if (stage.preview) {
    let kind: Kind = 'svg';
    stage.every(2800, () => {
      kind = kind === 'svg' ? 'canvas' : 'svg';
      build(kind);
    });
  }
  return () => stage.dispose();
};

export default mount;
