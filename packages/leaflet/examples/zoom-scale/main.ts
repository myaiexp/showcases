// getZoomScale and getScaleZoom: zoom levels and the scale factor between them
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Choose a scale factor: getScaleZoom says which zoom level scales the map by that much, and the map goes there.' });
  const pre = stage.side('Conversion');

  const map = stage.own(new LeafletMap(stage.box, { zoomSnap: 0, minZoom: 0, maxZoom: 10 }).setView([30, 10], 2));
  new LocalTileLayer('https://tiles.example/grid/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const from = 2;

  const go = (scale: number): void => {
    const z = map.getScaleZoom(scale, from);
    const back = map.getZoomScale(z, from);
    const text = `getScaleZoom(${scale}, ${from}) = ${z.toFixed(3)}\ngetZoomScale(${z.toFixed(3)}, ${from}) = ${back.toFixed(3)}`;
    if (pre) pre.textContent = text;
    else stage.say(text.replace('\n', '   '));
    map.setZoom(z);
  };
  stage.select(
    `Scale from zoom ${from}`,
    [0.25, 0.5, 1, 1.5, 2, 3, 4, 8].map((s) => ({ value: String(s), label: `x${s}` })),
    '1',
    (v) => go(Number(v)),
  );
  go(1);

  if (stage.preview) {
    const scales = [2, 4, 0.5, 1.5, 8, 1];
    let i = 0;
    stage.every(2200, () => go(scales[i++ % scales.length]!));
  }
  return () => stage.dispose();
};

export default mount;
