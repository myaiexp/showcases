// DefaultIcon color: the default pin repainted in any CSS color
import { DefaultIcon, LeafletMap, Marker, type LeafletPointerEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const COLORS = ['crimson', '#f58a3d', 'gold', 'seagreen', 'teal', 'rebeccapurple', 'hotpink'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a color and click the map to drop a marker in it.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [51.5, 4], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // One DefaultIcon per color: `color` replaces the blue pin and works with any CSS color string.
  const place = (latlng: [number, number], color: string): Marker =>
    new Marker(latlng, { icon: new DefaultIcon({ color }), title: color }).addTo(map);

  let color: string = COLORS[0];
  const dropped: Marker[] = [];
  stage.select('color', COLORS.map((c) => ({ value: c, label: c })), color, (v) => (color = v));
  map.on('click', (e: LeafletPointerEvent) => {
    dropped.push(place([e.latlng.lat, e.latlng.lng], color));
    if (dropped.length > 40) dropped.shift()?.remove();
  });

  // A row to start with: the default pin, then a few colors.
  new Marker([48.5, -5], { title: 'default' }).addTo(map);
  COLORS.forEach((c, i) => place([48.5, -2 + i * 2.5], c));

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    let n = 0;
    stage.every(1100, () => {
      color = COLORS[n % COLORS.length]!;
      stage.say(`new DefaultIcon({ color: '${color}' })`);
      g.click([51.5 + (n % 2) * 2.5, -4 + (n % 7) * 2.5]);
      if (dropped.length > 7) dropped.shift()?.remove();
      n++;
    });
  }
  return () => stage.dispose();
};

export default mount;
