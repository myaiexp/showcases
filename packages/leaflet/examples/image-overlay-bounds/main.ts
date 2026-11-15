// setBounds moves and resizes an image overlay without recreating it
import { ImageOverlay, LeafletMap, Rectangle, type LatLngBoundsExpression } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { images } from '../../shared/data.ts';

const mount: Mount = async (el, ctx) => {
  const imageUrl = await images.newark1922();
  const stage = createStage(el, ctx, { hint: 'Each button calls setBounds with new corners; getBounds() reads them back.' });
  const map = stage.own(new LeafletMap(stage.box, { zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 18, attribution: LAND_ATTRIBUTION }).addTo(map);

  const home: LatLngBoundsExpression = [
    [40.799311, -74.118464],
    [40.68202047785919, -74.33],
  ];
  const overlay = new ImageOverlay(imageUrl, home, { opacity: 0.85 }).addTo(map);
  const frame = new Rectangle(home, { color: '#f59e0b', weight: 1, fill: false, interactive: false }).addTo(map);
  map.fitBounds([
    [40.9, -74.5],
    [40.6, -73.9],
  ]);

  const poses: { label: string; bounds: LatLngBoundsExpression }[] = [
    { label: 'Original', bounds: home },
    { label: 'Shift east', bounds: [[40.799311, -74.0], [40.68202047785919, -74.2115]] },
    { label: 'Squash', bounds: [[40.78, -74.118464], [40.72, -74.33]] },
    { label: 'Double size', bounds: [[40.86, -74.0], [40.62, -74.44]] },
  ];
  const apply = (p: { label: string; bounds: LatLngBoundsExpression }): void => {
    overlay.setBounds(p.bounds);
    frame.setBounds(p.bounds);
    const b = overlay.getBounds();
    stage.say(`setBounds: ${b.getNorth().toFixed(3)}N ${b.getWest().toFixed(3)}W to ${b.getSouth().toFixed(3)}N ${b.getEast().toFixed(3)}W`);
  };
  for (const p of poses) stage.button(p.label, () => apply(p));

  if (stage.preview) {
    stage.cycle(poses.map((p) => ({ run: () => apply(p) })), 1800);
  }
  return () => stage.dispose();
};

export default mount;
