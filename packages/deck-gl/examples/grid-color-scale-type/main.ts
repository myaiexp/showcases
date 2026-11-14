// GridLayer colorScaleType and colorRange: four scales, four palettes
import { Deck } from '@deck.gl/core';
import { GridLayer } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { RAMPS, europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type ScaleType = 'linear' | 'quantize' | 'quantile' | 'ordinal';
const SCALES: readonly ScaleType[] = ['quantize', 'linear', 'quantile', 'ordinal'];
const names = Object.keys(RAMPS);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 900 : 4000);

  const grid = (colorScaleType: ScaleType, ramp: string): GridLayer<Spot> =>
    new GridLayer<Spot>({
      id: 'grid',
      data,
      getPosition: (d) => d.position,
      cellSize: ctx.preview ? 50000 : 20000,
      extruded: false,
      colorScaleType,
      colorRange: RAMPS[ramp],
    });

  const deck = new Deck({ device: stage.device, initialViewState: europeView(ctx.preview), controller: !ctx.preview, layers: [landLayer(), grid('quantize', names[0]!)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      deck.setProps({ layers: [landLayer(), grid(SCALES[i % SCALES.length]!, names[i % names.length]!)] });
    }, 1600);
    stop = () => clearInterval(timer);
  } else {
    let [scale, ramp] = ['quantize', names[0]!] as [ScaleType, string];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), grid(scale, ramp)] });
    const bar = controlBar(el);
    select(bar, 'colorScaleType', SCALES, (v) => ((scale = v), refresh()), scale);
    select(bar, 'colorRange', names, (v) => ((ramp = v), refresh()), ramp);
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
