// errorOverlayUrl shows a stand-in picture when the overlay's image fails to load
import { ImageOverlay, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { images } from '../../shared/data.ts';
import { canvasImage } from '../../shared/canvas-media.ts';

const BOUNDS: [[number, number], [number, number]] = [
  [40.799311, -74.118464],
  [40.68202047785919, -74.33],
];
// Not an image: the browser fails to decode it, which is what a 404 would do.
const BROKEN = 'data:image/png;base64,AAAA';

const mount: Mount = async (el, ctx) => {
  const good = await images.newark1922();
  const stage = createStage(el, ctx, { hint: 'The image URL here is not a picture. With errorOverlayUrl the overlay swaps in the stand-in; without it, the broken image stays.' });
  const log = stage.log('Overlay events', 10);
  const map = stage.own(new LeafletMap(stage.box, { zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 18, attribution: LAND_ATTRIBUTION }).addTo(map);
  map.fitBounds(BOUNDS);

  const errorOverlayUrl = canvasImage(480, 300, (g, w, h) => {
    g.fillStyle = '#3b1219';
    g.fillRect(0, 0, w, h);
    g.strokeStyle = '#f87171';
    g.lineWidth = 6;
    g.strokeRect(8, 8, w - 16, h - 16);
    g.beginPath();
    g.moveTo(8, 8);
    g.lineTo(w - 8, h - 8);
    g.moveTo(w - 8, 8);
    g.lineTo(8, h - 8);
    g.stroke();
    g.fillStyle = '#fff';
    g.font = 'bold 40px sans-serif';
    g.textAlign = 'center';
    g.fillText('Image unavailable', w / 2, h / 2 + 14);
  });

  let overlay: ImageOverlay | null = null;
  stage.own({ remove: () => overlay?.remove() });
  const start = (url: string, fallback: boolean): void => {
    overlay?.remove();
    overlay = new ImageOverlay(url, BOUNDS, fallback ? { errorOverlayUrl, alt: 'Newark 1922' } : { alt: 'Newark 1922' });
    overlay.on('error', () => log('error: the image failed to load'));
    overlay.on('load', () => log('load: an image arrived'));
    overlay.addTo(map);
  };
  const cases = {
    fallback: () => {
      log('--- broken URL + errorOverlayUrl');
      start(BROKEN, true);
    },
    bare: () => {
      log('--- broken URL, no errorOverlayUrl');
      start(BROKEN, false);
    },
    good: () => {
      log('--- good URL');
      start(good, true);
    },
  };
  stage.button('Broken, with errorOverlayUrl', cases.fallback);
  stage.button('Broken, no fallback', cases.bare);
  stage.button('Working image', cases.good);

  cases.fallback();
  if (stage.preview) {
    stage.cycle(
      [
        { say: 'broken URL + errorOverlayUrl: stand-in shown', run: cases.fallback },
        { say: 'working URL: the 1922 map', run: cases.good },
      ],
      2400,
    );
  }
  return () => stage.dispose();
};

export default mount;
