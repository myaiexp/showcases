// keepAspectRatio letterboxes a video in its bounds; false stretches it to fill them
import { LeafletMap, Rectangle, VideoOverlay } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { canvasVideo } from '../../shared/canvas-media.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same wide stream in two square bounds (outlined). The option is read when the overlay builds its <video>.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [41, -99], zoom: stage.preview ? 3 : 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 18, attribution: LAND_ATTRIBUTION }).addTo(map);

  // A 4:1 picture with a circle, so any stretching shows.
  const source = canvasVideo(stage, 640, 160, (g, w, h, t) => {
    g.fillStyle = '#1b1035';
    g.fillRect(0, 0, w, h);
    g.strokeStyle = '#a78bfa';
    g.lineWidth = 6;
    g.strokeRect(3, 3, w - 6, h - 6);
    g.fillStyle = '#f59e0b';
    g.beginPath();
    g.arc(w / 2, h / 2, h * 0.36, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = '#fff';
    g.beginPath();
    g.arc(w / 2 + Math.cos(t * 3) * h * 0.2, h / 2 + Math.sin(t * 3) * h * 0.2, 10, 0, Math.PI * 2);
    g.fill();
  });

  const leftBounds: [[number, number], [number, number]] = [
    [48, -118],
    [34, -102],
  ];
  const rightBounds: [[number, number], [number, number]] = [
    [48, -96],
    [34, -80],
  ];
  const stream = source.srcObject;
  for (const [bounds, keepAspectRatio] of [
    [leftBounds, true],
    [rightBounds, false],
  ] as const) {
    new Rectangle(bounds, { color: '#7cb7ff', weight: 1, fill: false, interactive: false }).addTo(map);
    // No element passed: the overlay builds its own <video> and applies keepAspectRatio.
    // The stream is attached to it afterwards (srcObject beats the empty <source>).
    const overlay = new VideoOverlay('', bounds, { keepAspectRatio, muted: true }).addTo(map);
    const v = overlay.getElement();
    if (v) {
      v.srcObject = stream;
      void v.play().catch(() => undefined);
    }
  }
  stage.say('left: keepAspectRatio true (default). right: false.');
  return () => stage.dispose();
};

export default mount;
