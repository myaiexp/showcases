// panTo and panBy: chained calls build on where a running animation is heading (Leaflet 2)
import { CircleMarker, LeafletMap, Polyline, type LatLngExpression } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const PARIS: LatLngExpression = [48.857, 2.352];
const ROME: LatLngExpression = [41.9, 12.5];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'In Leaflet 2 each call starts from the view the last one is heading to, so panTo(c).panBy(o) ends at c + o, and three quick panBy calls add up.',
  });
  const map = stage.own(new LeafletMap(stage.box, { center: PARIS, zoom: 5 }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // The trail joins every place the view finished at.
  const trail = new Polyline([PARIS], { color: '#f5b83d', weight: 2 }).addTo(map);
  const dots: CircleMarker[] = [new CircleMarker(PARIS, { radius: 4, color: '#f5b83d' }).addTo(map)];
  map.on('moveend', () => {
    const c = map.getCenter();
    trail.addLatLng(c);
    dots.push(new CircleMarker(c, { radius: 4, color: '#f5b83d' }).addTo(map));
  });
  const clear = (): void => {
    trail.setLatLngs([map.getCenter()]);
    for (const d of dots.splice(0)) d.remove();
  };

  const calls = {
    chain: () => {
      stage.say('map.panTo(Rome).panBy([120, 0]): ends 120 px east of Rome');
      map.panTo(ROME).panBy([120, 0]);
    },
    quick: () => {
      stage.say('panBy([100, 0]) three times in a row: 300 px in total');
      map.panBy([100, 0]).panBy([100, 0]).panBy([100, 0]);
    },
    down: () => {
      stage.say('map.panBy([0, 90])');
      map.panBy([0, 90]);
    },
    back: () => {
      stage.say('map.panTo(Paris, {duration: 1.5, easeLinearity: 1})');
      map.panTo(PARIS, { duration: 1.5, easeLinearity: 1 });
    },
  };
  stage.button('panTo(Rome).panBy([120, 0])', calls.chain);
  stage.button('3 x panBy([100, 0])', calls.quick);
  stage.button('panBy([0, 90])', calls.down);
  stage.button('panTo(Paris), slow and linear', calls.back);
  stage.button('Clear trail', clear);

  if (stage.preview) {
    stage.cycle(
      [
        { run: calls.chain, hold: 2200 },
        { run: calls.quick, hold: 2200 },
        { run: calls.down, hold: 1800 },
        { run: calls.back, hold: 2800 },
        { run: clear, hold: 100 },
      ],
      1600,
    );
  }
  return () => stage.dispose();
};

export default mount;
