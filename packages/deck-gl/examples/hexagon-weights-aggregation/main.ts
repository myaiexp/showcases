// HexagonLayer weights: color and elevation aggregation operations
import { Deck } from '@deck.gl/core';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
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

  const hexagons = (colorAggregation: Op, elevationAggregation: Op): HexagonLayer<Spot> =>
    new HexagonLayer<Spot>({
      id: 'hexagons',
      data,
      getPosition: (d) => d.position,
      getColorWeight: (d) => d.weight,
      colorAggregation,
      getElevationWeight: (d) => d.weight,
      elevationAggregation,
      radius: ctx.preview ? 55000 : 25000,
      extruded: true,
      elevationScale: 20,
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), hexagons('SUM', 'COUNT')] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    // Colour by each operation in turn while the height stays on the point count.
    let i = 0;
    const timer = setInterval(() => deck.setProps({ layers: [landLayer(), hexagons(OPS[++i % OPS.length]!, 'COUNT')] }), 1600);
    stop = () => clearInterval(timer);
  } else {
    let [color, elevation] = ['SUM', 'COUNT'] as [Op, Op];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), hexagons(color, elevation)] });
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
