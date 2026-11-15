// setMinZoom and setMaxZoom: limit the zoom range at run time and watch zoomlevelschange
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Narrow the range and try the zoom buttons. If the current zoom falls outside, the map zooms to the new limit.' });
  const log = stage.log('Events');
  const map = stage.own(new LeafletMap(stage.box, { center: [60.17, 24.94], zoom: 6 }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 18, attribution: LAND_ATTRIBUTION }).addTo(map);

  const show = (): void => stage.say(`zoom ${map.getZoom()}, allowed ${map.getMinZoom()} to ${map.getMaxZoom()}`);
  map.on('zoomlevelschange', () => {
    log(`zoomlevelschange: ${map.getMinZoom()} to ${map.getMaxZoom()}`);
    show();
  });
  map.on('zoomend', () => {
    log(`zoomend: ${map.getZoom()}`);
    show();
  });

  const minSlider = stage.slider('Min zoom', 0, 12, 1, 0, (v) => map.setMinZoom(v));
  const maxSlider = stage.slider('Max zoom', 4, 18, 1, 18, (v) => map.setMaxZoom(v));
  stage.button('Reset limits', () => {
    // Moving the sliders fires their input events, which call setMinZoom and setMaxZoom.
    for (const [slider, v] of [[minSlider, 0], [maxSlider, 18]] as const) {
      if (!slider) continue;
      slider.value = String(v);
      slider.dispatchEvent(new Event('input'));
    }
  });
  stage.button('zoomIn()', () => map.zoomIn());
  stage.button('zoomOut()', () => map.zoomOut());
  show();

  if (stage.preview) {
    stage.cycle([
      { say: 'setMaxZoom(4) while at zoom 6', run: () => map.setMaxZoom(4), hold: 2400 },
      { say: 'setMinZoom(3), then zoomOut() x 3: stops at 3', run: () => map.setMinZoom(3).zoomOut(3), hold: 2400 },
      { say: 'setMaxZoom(18), setMinZoom(0): back to the full range', run: () => map.setMaxZoom(18).setMinZoom(0).setZoom(6), hold: 2400 },
    ]);
  }
  return () => stage.dispose();
};

export default mount;
