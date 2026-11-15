// new PointLayer({ pickingBuffer }): make small points easier to hit
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { lattice, holder } from '../../shared/point-data.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 4.2 : 5 }),
  });
  await stage.ready(scene);

  const make = (pickingBuffer: number) =>
    new PointLayer({ pickingBuffer })
      .source(lattice(4, 2, 4, [10, 46]), { parser: { type: 'json', x: 'lng', y: 'lat' } })
      .shape('circle')
      .size(3)
      .color('#ffd166')
      .active({ color: '#ff6b6b' });
  const show = holder(scene);
  show(make(12));

  const out = stage.readout();
  const wire = (layer: ReturnType<typeof make>): void => {
    layer.on('mousemove', () => out && (out.textContent = 'hit a dot'));
    layer.on('mouseout', () => out && (out.textContent = ''));
  };
  if (stage.bar) {
    select(stage.bar, 'pickingBuffer', ['0', '12'], '12', (v) => wire(show(make(Number(v)))));
    const first = make(12);
    wire(show(first));
  } else {
    const ghost = stage.ghost(scene);
    const spots: [number, number][] = [[7.2, 47], [13, 45], [9.5, 45.4]];
    // The pointer rests 8px beside a dot: only the buffer lets it hit.
    stage.every(900, (i) => {
      const p = spots[i % spots.length];
      if (!p) return;
      const s = scene.lngLatToContainer(p);
      ghost.move(s.x + 8, s.y + 4);
    });
  }

  return () => stage.dispose();
};

export default mount;
