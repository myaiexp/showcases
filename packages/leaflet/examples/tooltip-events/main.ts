// tooltipopen and tooltipclose on the map and on the layer the tooltip is bound to
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the markers. Each tooltip open and close fires an event on the layer, then on the map.' });
  const log = stage.log('Events', 14);
  const map = stage.own(new LeafletMap(stage.box, { center: [60.1, 24.9], zoom: 7, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const names = new Map<unknown, string>();
  const make = (name: string, at: [number, number]): Marker => {
    const m = new Marker(at, { title: name }).addTo(map).bindTooltip(`I am ${name}`);
    names.set(m.getTooltip(), name);
    m.on('tooltipopen', () => log(`${name}.tooltipopen`));
    m.on('tooltipclose', () => log(`${name}.tooltipclose`));
    return m;
  };
  const a = make('A', [60.2, 24.1]);
  const b = make('B', [60.2, 25.7]);

  map.on('tooltipopen', (e) => log(`map tooltipopen (${names.get(e.tooltip)})`));
  map.on('tooltipclose', (e) => log(`map tooltipclose (${names.get(e.tooltip)})`));

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    stage.cycle(
      [
        { run: () => g.over(a.getLatLng(), a.getElement()) },
        { run: () => g.out(a.getElement()) },
        { run: () => g.over(b.getLatLng(), b.getElement()) },
        { run: () => g.out(b.getElement()) },
      ],
      1500,
    );
  }
  return () => stage.dispose();
};

export default mount;
