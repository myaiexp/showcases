// The version export and the feature checks that replace the removed Browser namespace
import { LeafletMap, Marker, version } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'These values are read from this browser right now. The Leaflet 1.x column is what the removed Browser flags used to hold.' });
  const pre = stage.side('Checks');
  const map = stage.own(new LeafletMap(stage.box, { center: [55, 10], zoom: 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // The migration guide's recipe for a plugin that supports both versions.
  const is1x = version.startsWith('1.');
  const moveEvent = is1x ? 'mousemove' : 'pointermove';
  const defaults = Marker.defaultOptions as Record<string, unknown> | undefined;
  const rows: [string, string][] = [
    ['version', version],
    ["version.startsWith('1.')", String(is1x)],
    ['pointer event to use', moveEvent],
    ['Marker.defaultOptions found', String(defaults !== undefined)],
    ["Browser.mobile → matchMedia('(pointer: coarse)')", String(matchMedia('(pointer: coarse)').matches)],
    ['Browser.retina → devicePixelRatio > 1', `${devicePixelRatio > 1} (${devicePixelRatio})`],
    ['Browser.touch, Browser.pointer', 'always true: no check'],
  ];
  const text = rows.map(([k, v]) => `${k}\n  ${v}`).join('\n');
  if (pre) pre.textContent = text;

  const marker = new Marker([50, 10]).addTo(map);
  marker.bindPopup(`<b>Leaflet ${version}</b><br>pointer: ${matchMedia('(pointer: coarse)').matches ? 'coarse' : 'fine'}<br>pixel ratio: ${devicePixelRatio}`, { autoPan: false, closeButton: false, autoClose: false });
  marker.openPopup();
  stage.say(`Leaflet ${version}; ${moveEvent} is the pointer event to listen to`);

  if (stage.preview) {
    let i = 0;
    stage.cycle(
      [
        {
          run: () => {
            const [k, v] = rows[i++ % rows.length] as [string, string];
            stage.say(`${k}: ${v}`);
          },
        },
      ],
      1700,
    );
  }
  return () => stage.dispose();
};

export default mount;
