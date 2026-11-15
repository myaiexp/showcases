// bringToFront, bringToBack and setZIndex order overlapping image overlays
import { ImageOverlay, LatLngBounds, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { images } from '../../shared/data.ts';
import { canvasImage } from '../../shared/canvas-media.ts';

const mount: Mount = async (el, ctx) => {
  const old = await images.newark1922();
  const stage = createStage(el, ctx, { hint: 'Two overlays cover the same area, partly overlapping. Buttons reorder them.' });
  const map = stage.own(new LeafletMap(stage.box, { zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 18, attribution: LAND_ATTRIBUTION }).addTo(map);

  const swatch = canvasImage(400, 300, (g, w, h) => {
    g.fillStyle = '#0e7490';
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#fff';
    g.font = 'bold 56px sans-serif';
    g.textAlign = 'center';
    g.fillText('Blue panel', w / 2, h / 2 + 18);
  });
  const mapBounds = new LatLngBounds([
    [40.799311, -74.118464],
    [40.68202047785919, -74.33],
  ]);
  const panelBounds = new LatLngBounds([
    [40.78, -74.07],
    [40.68, -74.22],
  ]);
  const newark = new ImageOverlay(old, mapBounds).addTo(map);
  const panel = new ImageOverlay(swatch, panelBounds).addTo(map);
  map.fitBounds(new LatLngBounds([40.8, -74.0], [40.67, -74.34]));

  const status = (): void => {
    const z = (o: ImageOverlay): string => String(o.options.zIndex);
    stage.say(`zIndex: map ${z(newark)}, panel ${z(panel)}`);
  };
  const actions = {
    'Panel to front': () => panel.bringToFront(),
    'Panel to back': () => panel.bringToBack(),
    'Map to front': () => newark.bringToFront(),
    'Map zIndex 10': () => newark.setZIndex(10),
    'Panel zIndex 20': () => panel.setZIndex(20),
  };
  for (const [label, run] of Object.entries(actions)) stage.button(label, () => (run(), status()));
  status();

  if (stage.preview) {
    stage.cycle(
      [
        { say: 'newark.bringToFront(): the panel hides behind it', run: () => newark.bringToFront() },
        { say: 'panel.bringToFront(): the panel is on top', run: () => panel.bringToFront() },
      ],
      2200,
    );
  }
  return () => stage.dispose();
};

export default mount;
