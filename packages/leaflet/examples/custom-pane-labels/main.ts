// A custom pane puts a labels-only tile layer above the GeoJSON polygons, as the map-panes tutorial does
import { GeoJSON, LeafletMap, type Layer } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';
import { euCountries } from '../../shared/data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a country for its popup. The labels pane has pointer-events none, so clicks reach the polygons underneath.' });
  const data = await euCountries();
  if (stage.disposed) return () => stage.dispose();

  const map = stage.own(new LeafletMap(stage.box));
  // The pane is made per map, ranked above markers (600) and below popups (700), and ignores the pointer.
  map.createPane('labels');
  const labels = map.getPane('labels')!;
  labels.style.zIndex = '650';
  labels.style.pointerEvents = 'none';

  new LocalTileLayer('https://tiles.example/light/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png?layers=labels', { attribution: LAND_ATTRIBUTION, pane: 'labels' }).addTo(map);

  const geojson = new GeoJSON(data, { style: { color: '#e8590c', weight: 2, fillOpacity: 0.35 } }).addTo(map);
  geojson.eachLayer((layer: Layer) => {
    const name = (layer as Layer & { feature?: { properties?: { name?: string } } }).feature?.properties?.name;
    layer.bindPopup(name ?? 'country');
  });
  // The data includes Russia, so fit Europe by hand: getBounds() would zoom out to nearly the whole world.
  map.fitBounds([[34, -11], [66, 32]]);

  stage.toggle('Labels on top (zIndex 650)', true, (on) => {
    labels.style.zIndex = on ? '650' : '100';
    stage.say(on ? 'labels pane zIndex 650: labels above the polygons' : 'labels pane zIndex 100: labels below the polygons');
  });
  stage.toggle('pointer-events: none', true, (on) => {
    labels.style.pointerEvents = on ? 'none' : '';
  });

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const layers = geojson.getLayers() as (Layer & { getBounds?: () => { getCenter(): { lat: number; lng: number } } })[];
    const pick = layers.filter((l) => l.getBounds).slice(0, 12);
    let i = 0;
    stage.cycle(
      [
        { say: 'Labels pane above the polygons (zIndex 650)', run: () => (labels.style.zIndex = '650') },
        { run: () => {
            const l = pick[i++ % pick.length];
            if (l) g.click(l.getBounds!().getCenter(), (l as unknown as { getElement(): Element }).getElement());
          } },
        { say: 'Same pane at zIndex 100: labels under the polygons', run: () => (labels.style.zIndex = '100') },
      ],
      2600,
    );
  }
  return () => stage.dispose();
};

export default mount;
