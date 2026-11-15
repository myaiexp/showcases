// Edit a GeoJSON layer on the map, then export the whole layer with toGeoJSON(precision)
import { GeoJSON, LeafletMap, type LatLngTuple, type Polyline } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { denverSample } from '../../shared/data.ts';

type Precision = 'full' | '4' | '2';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Properties and ids travel with each layer. Edit the first bus line, pick a precision, export; "Import" draws the export as a second layer.', height: 460 });
  const { freeBus, coorsField } = await denverSample();
  const pre = stage.side('toGeoJSON()');
  if (pre) pre.style.cssText = 'max-height:420px;overflow:auto;font-size:11px;min-width:280px;white-space:pre-wrap';
  const map = stage.own(new LeafletMap(stage.box, { center: [39.7475, -104.995], zoom: 15, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const layer = new GeoJSON([freeBus, coorsField], { style: { color: '#4ade80', weight: 6 } }).addTo(map);
  const lines = layer.getLayers().filter((l): l is Polyline => 'getLatLngs' in l);
  const copy = new GeoJSON(undefined, { style: { color: '#f5b83d', weight: 3, dashArray: '4 6' } }).addTo(map);
  let precision: Precision = 'full';

  const exportJson = (): ReturnType<GeoJSON['toGeoJSON']> => {
    const json = layer.toGeoJSON(precision === 'full' ? false : Number(precision));
    // One feature per line, coordinates on one line each, so the panel stays short
    if (pre) pre.textContent = JSON.stringify(json, null, 1).replace(/\n\s*(-?[\d.]+),\n\s*(-?[\d.]+)\n\s*(\]|,)/g, ' $1, $2 $3').slice(0, 4000);
    const features = json.type === 'FeatureCollection' ? json.features.length : 1;
    stage.say(`toGeoJSON(${precision === 'full' ? 'false' : precision}): a FeatureCollection of ${features} features, properties kept`);
    return json;
  };
  const nudge = (): void => {
    const line = lines[0]!;
    const pts = line.getLatLngs() as { lat: number; lng: number }[];
    const moved: LatLngTuple[] = pts.map((p) => [p.lat + 0.00031234567, p.lng + 0.00047654321]);
    moved.push([moved[moved.length - 1]![0] - 0.0011, moved[moved.length - 1]![1] + 0.0013]);
    line.setLatLngs(moved);
    exportJson();
  };
  const importExport = (): void => {
    copy.clearLayers();
    copy.addData(exportJson());
    stage.say('addData(exported FeatureCollection): the dashed copy is built from the export alone');
  };
  stage.select<Precision>('precision', [{ value: 'full', label: 'false (full)' }, { value: '4', label: '4 decimals' }, { value: '2', label: '2 decimals' }], 'full', (v) => {
    precision = v;
    exportJson();
  });
  stage.button('Edit first line (setLatLngs)', nudge);
  stage.button('Export', () => void exportJson());
  stage.button('Import export', importExport);
  exportJson();

  if (stage.preview) {
    stage.cycle(
      [
        { run: () => ((precision = 'full'), exportJson()), hold: 1800 },
        { run: nudge, hold: 1600 },
        { run: () => ((precision = '2'), importExport()), hold: 2400 },
      ],
      300,
    );
  }
  return () => stage.dispose();
};

export default mount;
