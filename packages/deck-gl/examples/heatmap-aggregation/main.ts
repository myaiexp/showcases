// HeatmapLayer aggregation: SUM versus MEAN
import { Deck } from '@deck.gl/core';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type Op = 'SUM' | 'MEAN';
const OPS: readonly Op[] = ['SUM', 'MEAN'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 900 : 4000);

  const heat = (aggregation: Op, radiusPixels: number): HeatmapLayer<Spot> =>
    new HeatmapLayer<Spot>({
      id: 'heatmap',
      data,
      getPosition: (d) => d.position,
      getWeight: (d) => d.weight,
      aggregation,
      radiusPixels,
    });

  const deck = new Deck({ device: stage.device, initialViewState: europeView(ctx.preview), controller: !ctx.preview, layers: [landLayer(), heat('SUM', 30)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    let i = 0;
    const timer = setInterval(() => deck.setProps({ layers: [landLayer(), heat(OPS[++i % 2]!, 14)] }), 2000);
    stop = () => clearInterval(timer);
  } else {
    let [op, radius] = ['SUM', 30] as [Op, number];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), heat(op, radius)] });
    const bar = controlBar(el);
    select(bar, 'aggregation', OPS, (v) => ((op = v), refresh()), op);
    slider(bar, 'radiusPixels', 5, 100, 1, radius, (v) => ((radius = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
