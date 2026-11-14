// GridLayer weights: color and elevation aggregation operations
import { Deck } from '@deck.gl/core';
import { GridLayer } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type Op = 'SUM' | 'MEAN' | 'MIN' | 'MAX' | 'COUNT';
const OPS: readonly Op[] = ['SUM', 'MEAN', 'MIN', 'MAX', 'COUNT'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 900 : 4000);
  const view = europeView(ctx.preview, { pitch: 50, bearing: 10 });

  const grid = (colorAggregation: Op, elevationAggregation: Op): GridLayer<Spot> =>
    new GridLayer<Spot>({
      id: 'grid',
      data,
      getPosition: (d) => d.position,
      getColorWeight: (d) => d.weight,
      colorAggregation,
      getElevationWeight: (d) => d.weight,
      elevationAggregation,
      cellSize: ctx.preview ? 50000 : 20000,
      extruded: true,
      elevationScale: 20,
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), grid('MEAN', 'MAX')] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    // Height stays on the maximum weight while the colour walks through the operations.
    let i = 0;
    const timer = setInterval(() => deck.setProps({ layers: [landLayer(), grid(OPS[++i % OPS.length]!, 'MAX')] }), 1600);
    stop = () => clearInterval(timer);
  } else {
    let [color, elevation] = ['MEAN', 'MAX'] as [Op, Op];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), grid(color, elevation)] });
    const bar = controlBar(el);
    select(bar, 'colorAggregation', OPS, (v) => ((color = v), refresh()), color);
    select(bar, 'elevationAggregation', OPS, (v) => ((elevation = v), refresh()), elevation);
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
