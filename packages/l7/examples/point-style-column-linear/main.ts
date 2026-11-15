// style({ sourceColor, targetColor }): a gradient from column foot to top
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { lattice, orbit, cycle } from '../../shared/point-data.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.4, pitch: 55 }),
  });
  await stage.ready(scene);

  const layer = new PointLayer()
    .source(lattice(ctx.preview ? 4 : 6, 3), { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('hexagonColumn')
    .size('mag', (mag) => [16, 16, mag * 9])
    .color('mag', ['#2894E0', '#CFF6FF', '#FFF5B8', '#F27049'])
    .style({ sourceColor: '#ff3d00', targetColor: '#ffee58' });
  scene.addLayer(layer);

  const palettes = [['#ff3d00', '#ffee58'], ['#1e88e5', '#e0f7ff'], ['#2e7d32', '#c6ff00']] as const;
  const set = ([sourceColor, targetColor]: readonly [string, string]): void => {
    layer.style({ sourceColor, targetColor });
    scene.render();
  };
  if (stage.bar) {
    select(stage.bar, 'sourceColor to targetColor', palettes.map((p) => p.join(' to ')), palettes[0].join(' to '), (v) => {
      const hit = palettes.find((p) => p.join(' to ') === v);
      if (hit) set(hit);
    });
  } else cycle(stage, scene, palettes, 1300, set);
  if (stage.preview) orbit(stage, scene, { pitch: 55, turn: 40 });

  return () => stage.dispose();
};

export default mount;
