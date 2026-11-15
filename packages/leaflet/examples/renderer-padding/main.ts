// The renderer's padding option: how far beyond the view a canvas is drawn before a pan
import { Canvas, CircleMarker, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { scatter } from '../../shared/scatter.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pan quickly or press "Pan 400 px": with a small padding, shapes beyond the canvas pop in when the pan ends.' });
  const points = scatter(700, [30, -30, 70, 60], 11);
  let map: LeafletMap | null = null;
  stage.own({ remove: () => map?.remove() });

  const build = (padding: number): void => {
    map?.remove();
    map = new LeafletMap(stage.box, {
      center: [50, 15],
      zoom: 5,
      zoomControl: !stage.preview,
      renderer: new Canvas({ padding }),
    });
    new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 18, attribution: LAND_ATTRIBUTION }).addTo(map);
    for (const p of points) new CircleMarker(p, { radius: 7, color: '#f59e0b', weight: 1, fillOpacity: 0.6 }).addTo(map);
    const c = map.getContainer().querySelector('canvas');
    const view = map.getSize();
    stage.say(`new Canvas({padding: ${padding}}): the canvas is ${c?.style.width} × ${c?.style.height}; the view is ${view.x} × ${view.y}`);
  };
  const choices = ['0', '0.1', '0.5', '1'] as const;
  let current = 0.1;
  stage.select('padding', choices.map((v) => ({ value: v, label: v })), '0.1', (v) => {
    current = Number(v);
    build(current);
  });
  stage.button('Pan 400 px', () => map?.panBy([400, 0]));
  build(current);

  if (stage.preview) {
    let i = 0;
    stage.cycle(
      [
        { run: () => build(i % 2 ? 1 : 0), hold: 1500 },
        { run: () => map?.panBy([420, 0], { animate: true, duration: 1.2 }), hold: 1800 },
        { run: () => (i++, undefined), hold: 100 },
      ],
      300,
    );
  }
  return () => stage.dispose();
};

export default mount;
