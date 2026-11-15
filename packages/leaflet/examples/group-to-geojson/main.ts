// LayerGroup.toGeoJSON gives a FeatureCollection; toMultiPoint gives the markers' positions
import { LayerGroup, LeafletMap, Polygon, Polyline } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { baseTiles, cityMarkers, DENVER } from '../../shared/group-demo.ts';

type Precision = 'full' | '3' | '1';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Markers, a line and a polygon in one group. Precision rounds coordinates to that many decimals.', height: 460 });
  const pre = stage.side('JSON');
  if (pre) pre.style.cssText = 'max-height:420px;overflow:auto;font-size:11px;min-width:260px';
  const map = stage.own(new LeafletMap(stage.box, { center: DENVER, zoom: 10, zoomControl: !stage.preview }));
  baseTiles('light').addTo(map);

  const markers = cityMarkers();
  const route = new Polyline([[39.61, -105.02], [39.74, -104.99], [39.73, -104.8]], { color: '#e11d48' });
  const area = new Polygon([[39.8, -105.3], [39.8, -105.15], [39.7, -105.2]], { color: '#2563eb' });
  const group = new LayerGroup([...markers, route, area]).addTo(map);
  const pointsOnly = new LayerGroup(markers);

  const run = (kind: 'collection' | 'points', p: Precision): void => {
    const precision = p === 'full' ? false : Number(p);
    const json = kind === 'collection' ? group.toGeoJSON(precision) : pointsOnly.toMultiPoint(precision);
    if (pre) pre.textContent = JSON.stringify(json, null, 1).replace(/\n\s+([-\d.]+,?)(?=\n)/g, ' $1');
    if (json.type === 'FeatureCollection') stage.say(`toGeoJSON(${precision}): FeatureCollection of ${json.features.map((f) => f.geometry?.type).join(', ')}`);
    else stage.say(`toMultiPoint(${precision}): ${JSON.stringify(json.geometry?.type === 'MultiPoint' ? json.geometry.coordinates : null)}`);
  };
  let precision: Precision = 'full';
  let kind: 'collection' | 'points' = 'collection';
  stage.select<Precision>('precision', [{ value: 'full', label: 'false (full)' }, { value: '3', label: '3 decimals' }, { value: '1', label: '1 decimal' }], 'full', (v) => run(kind, (precision = v)));
  stage.button('group.toGeoJSON()', () => run((kind = 'collection'), precision));
  stage.button('markers.toMultiPoint()', () => run((kind = 'points'), precision));
  run('collection', 'full');

  if (stage.preview) {
    stage.cycle(
      [
        { run: () => run('collection', 'full') },
        { run: () => run('collection', '1') },
        { run: () => run('points', 'full') },
        { run: () => run('points', '1') },
      ],
      2400,
    );
  }
  return () => stage.dispose();
};

export default mount;
