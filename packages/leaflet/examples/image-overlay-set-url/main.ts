// setUrl swaps the picture of an image overlay and keeps its bounds
import { ImageOverlay, LatLngBounds, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { images } from '../../shared/data.ts';
import { canvasImage } from '../../shared/canvas-media.ts';

const mount: Mount = async (el, ctx) => {
  const old = await images.newark1922();
  const stage = createStage(el, ctx, { hint: 'Both pictures belong to the same overlay: setUrl changes the <img> source, the bounds stay.' });
  const map = stage.own(new LeafletMap(stage.box, { zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 18, attribution: LAND_ATTRIBUTION }).addTo(map);

  const bounds = new LatLngBounds([
    [40.799311, -74.118464],
    [40.68202047785919, -74.33],
  ]);
  // A second picture for the same bounds, painted on a canvas: a survey grid with a label.
  const grid = canvasImage(640, 400, (g, w, h) => {
    g.fillStyle = '#10243a';
    g.fillRect(0, 0, w, h);
    g.strokeStyle = '#7cb7ff';
    g.lineWidth = 2;
    for (let x = 0; x <= w; x += 64) {
      g.beginPath();
      g.moveTo(x, 0);
      g.lineTo(x, h);
      g.stroke();
    }
    for (let y = 0; y <= h; y += 64) {
      g.beginPath();
      g.moveTo(0, y);
      g.lineTo(w, y);
      g.stroke();
    }
    g.fillStyle = '#f59e0b';
    g.font = 'bold 44px sans-serif';
    g.textAlign = 'center';
    g.fillText('Survey grid', w / 2, h / 2 + 14);
  });

  const overlay = new ImageOverlay(old, bounds, { opacity: 0.85 }).addTo(map);
  map.fitBounds(bounds);
  overlay.on('load', () => stage.say('load: the new image is in'));

  const show = (which: 'old' | 'grid'): void => {
    overlay.setUrl(which === 'old' ? old : grid);
    stage.say(which === 'old' ? 'setUrl(newark 1922 map)' : 'setUrl(survey grid)');
  };
  stage.button('1922 map', () => show('old'));
  stage.button('Survey grid', () => show('grid'));

  if (stage.preview) stage.cycle([{ run: () => show('grid') }, { run: () => show('old') }], 2200);
  return () => stage.dispose();
};

export default mount;
