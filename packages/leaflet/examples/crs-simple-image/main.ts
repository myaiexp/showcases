// A SimpleCRS map with an ImageOverlay: measured bounds, the naive 1000 x 1000 bounds, and minZoom
import { ImageOverlay, LeafletMap, Marker, Rectangle, SimpleCRS, type LatLngBoundsLiteral } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { images } from '../../shared/data.ts';
import { STARS, UQM_BOUNDS } from '../../shared/uqm.ts';

type Which = 'measured' | 'naive';
const BOUNDS: Record<Which, LatLngBoundsLiteral> = { measured: UQM_BOUNDS, naive: [[0, 0], [1000, 1000]] };

const mount: Mount = async (el, ctx) => {
  const url = await images.uqmMap();
  const stage = createStage(el, ctx, { hint: 'The star map has a coordinate grid of 0 to 1000 in its corners (orange frame). The image\'s own edges sit a little outside it, so bounds of exactly 0 to 1000 put Sol, the marker, off its star.', height: 440 });
  const map = stage.own(new LeafletMap(stage.box, { crs: SimpleCRS, minZoom: -5, maxZoom: 2, zoomSnap: 0.25, zoomControl: !stage.preview }));
  const image = new ImageOverlay(url, BOUNDS.measured, { alt: 'Star Control II star map' }).addTo(map);
  new Rectangle([[0, 0], [1000, 1000]], { color: '#fb923c', weight: 1.5, fill: false, interactive: false }).addTo(map);
  const sol = STARS[0];
  new Marker([sol.y, sol.x]).addTo(map).bindTooltip('Sol at [145, 175.2]', { permanent: true, direction: 'right' });

  const use = (which: Which, minZoom: number): void => {
    image.setBounds(BOUNDS[which]);
    map.setMinZoom(minZoom);
    map.fitBounds(BOUNDS[which], { animate: false });
    stage.say(`bounds ${JSON.stringify(BOUNDS[which])}, minZoom ${minZoom}: fitBounds chose zoom ${map.getZoom()}`);
  };
  let which: Which = 'measured';
  let minZoom = -5;
  use(which, minZoom);
  stage.select('Image bounds', [{ value: 'measured', label: 'measured: [[-26.5,-25],[1021.5,1023]]' }, { value: 'naive', label: 'naive: [[0,0],[1000,1000]]' }], which, (v) => use((which = v), minZoom));
  stage.select('minZoom', [{ value: '-5', label: '-5' }, { value: '0', label: '0 (the default)' }], '-5', (v) => use(which, (minZoom = Number(v))));

  if (stage.preview) {
    const steps: [Which, number][] = [['measured', -5], ['naive', -5], ['measured', 0]];
    stage.cycle(steps.map(([w, z]) => ({ run: () => use(w, z) })), 2400);
  }
  return () => stage.dispose();
};

export default mount;
