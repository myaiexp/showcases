// Tooltip opacity: the option, and setOpacity() on an open tooltip
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Three permanent tooltips with different opacity. The slider calls setOpacity() on the first one. The default is 0.9.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.2, 24.9], zoom: 8, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/light/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const make = (opacity: number, lat: number): Marker =>
    new Marker([lat, 24.7]).addTo(map).bindTooltip(`opacity ${opacity}`, { permanent: true, direction: 'right', opacity });
  const first = make(1, 60.35);
  make(0.5, 60.2);
  make(0.15, 60.05);

  stage.slider('setOpacity (first)', 0, 1, 0.05, 1, (v) => {
    first.getTooltip()?.setOpacity(v);
    first.setTooltipContent(`opacity ${v.toFixed(2)}`);
  });

  if (stage.preview) {
    let up = false;
    stage.every(1800, () => {
      const v = up ? 1 : 0.2;
      up = !up;
      first.getTooltip()?.setOpacity(v);
      first.setTooltipContent(`opacity ${v}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
