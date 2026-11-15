// A popup without a layer: openOn closes the previous popup, addTo leaves it open
import { LeafletMap, Popup, type LeafletPointerEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

type Mode = 'openOn' | 'addTo';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the map. With openOn the old popup closes; with addTo they pile up.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.2, 24.9], zoom: stage.preview ? 7 : 8, zoomControl: !stage.preview, closePopupOnClick: false }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  let mode: Mode = 'openOn';
  let n = 0;
  const place = (at: LeafletPointerEvent['latlng']): void => {
    n += 1;
    // new Popup(latlng, {content}) is the one-call form of setLatLng().setContent().
    const popup = new Popup(at, { content: `Popup ${n} (${mode})`, autoPan: false });
    if (mode === 'openOn') popup.openOn(map);
    else popup.addTo(map);
  };
  map.on('click', (e: LeafletPointerEvent) => place(e.latlng));

  stage.select<Mode>(
    'Add with',
    [
      { value: 'openOn', label: 'openOn(map)' },
      { value: 'addTo', label: 'addTo(map)' },
    ],
    mode,
    (v) => (mode = v),
  );
  stage.button('Clear', () => {
    map.eachLayer((layer) => {
      if (layer instanceof Popup) layer.close();
    });
  });

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const spots: [number, number][] = [
      [60.4, 24.2],
      [60.05, 25.6],
      [60.4, 25.5],
      [60.0, 24.3],
    ];
    let i = 0;
    stage.cycle(
      [
        {
          say: 'openOn: each new popup replaces the last',
          run: () => {
            mode = 'openOn';
            g.click(spots[i++ % 4] ?? [60, 25]);
          },
          hold: 1500,
        },
        { run: () => g.click(spots[i++ % 4] ?? [60, 25]), hold: 1500 },
        {
          say: 'addTo: they stay open together',
          run: () => {
            mode = 'addTo';
            g.click(spots[i++ % 4] ?? [60, 25]);
          },
          hold: 1100,
        },
        { run: () => g.click(spots[i++ % 4] ?? [60, 25]), hold: 1500 },
        {
          run: () => {
            map.eachLayer((layer) => {
              if (layer instanceof Popup) layer.close();
            });
          },
          hold: 500,
        },
      ],
      1000,
    );
  }
  return () => stage.dispose();
};

export default mount;
