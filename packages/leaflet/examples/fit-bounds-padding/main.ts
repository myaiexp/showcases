// fitBounds options: padding, paddingTopLeft for a side panel, and maxZoom
import { LeafletMap, Rectangle, type FitBoundsOptions } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import './style.css';

const BOUNDS: [[number, number], [number, number]] = [[36.6, 6.6], [47.1, 18.5]];
const PANEL = 110;

const OPTIONS = {
  none: {},
  padding: { padding: [30, 30] },
  panel: { paddingTopLeft: [PANEL + 10, 10] },
  maxZoom: { maxZoom: 4 },
} satisfies Record<string, FitBoundsOptions>;
type Which = keyof typeof OPTIONS;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The dashed box is the bounds. The panel covers the left of the map, so paddingTopLeft keeps Italy clear of it.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [42, 12], zoom: 3 }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  new Rectangle(BOUNDS, { color: '#f5b83d', weight: 2, fill: false, dashArray: '5' }).addTo(map);

  // A panel laid over the map's left edge, like a sidebar.
  const panel = document.createElement('div');
  panel.className = 'panel';
  panel.style.width = `${PANEL}px`;
  panel.textContent = 'Side panel';
  map.getContainer().append(panel);

  const fit = (which: Which): void => {
    const options: FitBoundsOptions = OPTIONS[which];
    stage.say(`map.fitBounds(bounds, ${JSON.stringify(options)})`);
    map.fitBounds(BOUNDS, options);
  };
  for (const which of Object.keys(OPTIONS) as Which[]) stage.button(which === 'none' ? 'No options' : which, () => fit(which));
  stage.button('Zoom out', () => map.setView([42, 12], 3));

  if (stage.preview) {
    const order: Which[] = ['none', 'padding', 'panel', 'maxZoom'];
    stage.cycle(
      order.flatMap((which) => [
        { run: () => map.setView([42, 12], 3, { animate: false }), hold: 700 },
        { run: () => fit(which), hold: 2400 },
      ]),
    );
  }
  return () => stage.dispose();
};

export default mount;
