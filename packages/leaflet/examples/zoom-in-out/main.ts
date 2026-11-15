// zoomIn, zoomOut and setZoom: two quick zoomIn() calls zoom two levels in Leaflet 2
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click zoomIn() twice quickly: the second call builds on where the first is heading, so you land two levels in.' });
  const log = stage.log('Zoom events');
  const map = stage.own(new LeafletMap(stage.box, { center: [37.97, 23.72], zoom: 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/terrain/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  map.on('zoomstart', () => log(`zoomstart (from ${map.getZoom()})`));
  map.on('zoomend', () => {
    log(`zoomend: zoom ${map.getZoom()}`);
    stage.say(`getZoom() is ${map.getZoom()}`);
  });

  const calls: [string, () => void][] = [
    ['zoomIn()', () => map.zoomIn()],
    ['zoomIn() x 2', () => map.zoomIn().zoomIn()],
    ['zoomOut()', () => map.zoomOut()],
    ['zoomIn(0.5)', () => map.zoomIn(0.5)],
    ['setZoom(3)', () => map.setZoom(3)],
    ['setZoom(8, {animate: false})', () => map.setZoom(8, { animate: false })],
  ];
  for (const [label, run] of calls) stage.button(label, run);

  if (stage.preview) {
    const steps = [
      { label: 'zoomIn() x 2', run: calls[1]![1] },
      { label: 'zoomOut()', run: calls[2]![1] },
      { label: 'zoomIn(0.5)', run: calls[3]![1] },
      { label: 'setZoom(3)', run: calls[4]![1] },
      { label: 'setZoom(5)', run: () => map.setZoom(5) },
    ];
    stage.cycle(
      steps.map((s) => ({
        run: () => {
          stage.say(`map.${s.label}`);
          s.run();
        },
      })),
      2200,
    );
  }
  return () => stage.dispose();
};

export default mount;
