// getPanes lists every pane with its z-index and what lives in it
import { Circle, LeafletMap, Marker, Polygon } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Panes are plain divs. Open the popup or tooltip and watch the child counts change.' });
  const pre = stage.side('map.getPanes()');

  const map = stage.own(new LeafletMap(stage.box).setView([51.505, -0.09], 13));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { maxZoom: 19, attribution: LAND_ATTRIBUTION }).addTo(map);
  const marker = new Marker([51.5, -0.09]).addTo(map);
  new Circle([51.508, -0.11], { radius: 500, color: 'red' }).addTo(map);
  new Polygon([[51.509, -0.08], [51.503, -0.06], [51.51, -0.047]]).addTo(map);
  marker.bindPopup('A popup lives in popupPane.');
  marker.bindTooltip('A tooltip lives in tooltipPane.', { permanent: false });

  const rows = (): { name: string; z: string; n: number }[] =>
    Object.entries(map.getPanes()).map(([name, pane]) => ({
      name,
      z: getComputedStyle(pane).zIndex,
      n: pane.childElementCount,
    }));
  const render = (): void => {
    const all = rows();
    if (pre) pre.textContent = all.map((r) => `${r.name.padEnd(12)} z ${r.z.padEnd(5)} ${r.n} child${r.n === 1 ? '' : 'ren'}`).join('\n');
  };
  map.on('popupopen', render);
  map.on('popupclose', render);
  map.on('tooltipopen', render);
  map.on('tooltipclose', render);
  map.on('layeradd', render);
  render();

  stage.button('Open the popup', () => marker.openPopup());
  stage.button('Close it', () => marker.closePopup());

  if (stage.preview) {
    // Walk through the panes from the bottom of the stack to the top.
    const steps = [
      ...['tilePane', 'overlayPane', 'shadowPane', 'markerPane', 'tooltipPane', 'popupPane'].map((name) => ({
        run: () => {
          if (name === 'popupPane') marker.openPopup();
          const r = rows().find((x) => x.name === name);
          stage.say(`${name}: z-index ${r?.z}, ${r?.n} child element${r?.n === 1 ? '' : 's'}`);
        },
      })),
      { run: () => marker.closePopup() },
    ];
    stage.cycle(steps, 1700);
  }
  return () => stage.dispose();
};

export default mount;
