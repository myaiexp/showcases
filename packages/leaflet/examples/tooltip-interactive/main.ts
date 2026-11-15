// Tooltip interactive: a tooltip that receives pointer events itself, here clicks
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click each tooltip. Only the interactive one counts clicks; the other lets the pointer through to the map.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.1, 24.9], zoom: 7, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const a = new Marker([60.2, 23.9]).addTo(map);
  const b = new Marker([60.2, 25.9]).addTo(map);
  const clicks = { a: 0, b: 0 };
  const label = (name: 'a' | 'b'): string => `${name === 'a' ? 'interactive: true' : 'interactive: false'}<br>clicks: ${clicks[name]}`;

  a.bindTooltip(label('a'), { permanent: true, direction: 'bottom', interactive: true });
  b.bindTooltip(label('b'), { permanent: true, direction: 'bottom' });

  // An interactive tooltip fires pointer events like a layer does.
  a.getTooltip()?.on('click', () => {
    clicks.a += 1;
    a.setTooltipContent(label('a'));
  });
  b.getTooltip()?.on('click', () => {
    clicks.b += 1;
    b.setTooltipContent(label('b'));
  });

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const tap = (m: Marker): void => g.click(m.getLatLng(), m.getTooltip()?.getElement());
    stage.cycle(
      [
        { say: 'Click the interactive tooltip', run: () => tap(a), hold: 900 },
        { run: () => tap(a), hold: 1000 },
        { say: 'Click the other one: nothing', run: () => tap(b), hold: 1600 },
      ],
      800,
    );
  }
  return () => stage.dispose();
};

export default mount;
