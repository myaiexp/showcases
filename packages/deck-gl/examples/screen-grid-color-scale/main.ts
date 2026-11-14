// ScreenGridLayer colorScaleType, colorRange and colorDomain
import { Deck } from '@deck.gl/core';
import { ScreenGridLayer } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, select, slider } from '../../shared/controls.ts';
import { RAMPS, europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type ScaleType = 'linear' | 'quantize';
const SCALES: readonly ScaleType[] = ['linear', 'quantize'];
const names = Object.keys(RAMPS);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 900 : 4000);

  const screenGrid = (colorScaleType: ScaleType, ramp: string, domain: [number, number] | null): ScreenGridLayer<Spot> =>
    new ScreenGridLayer<Spot>({
      id: 'screen-grid',
      data,
      getPosition: (d) => d.position,
      getWeight: (d) => d.weight,
      cellSizePixels: ctx.preview ? 18 : 30,
      colorScaleType,
      colorRange: RAMPS[ramp], // exactly 6 colours
      colorDomain: domain, // null: min and max of all cells
    });

  const deck = new Deck({ device: stage.device, initialViewState: europeView(ctx.preview), controller: !ctx.preview, layers: [landLayer(), screenGrid('linear', names[0]!, null)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      deck.setProps({ layers: [landLayer(), screenGrid(SCALES[i % 2]!, names[(i >> 1) % names.length]!, null)] });
    }, 1600);
    stop = () => clearInterval(timer);
  } else {
    let [scale, ramp, fixed, max] = ['linear', names[0]!, false, 100] as [ScaleType, string, boolean, number];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), screenGrid(scale, ramp, fixed ? [0, max] : null)] });
    const bar = controlBar(el);
    select(bar, 'colorScaleType', SCALES, (v) => ((scale = v), refresh()), scale);
    select(bar, 'colorRange', names, (v) => ((ramp = v), refresh()), ramp);
    check(bar, 'fixed colorDomain', fixed, (v) => ((fixed = v), refresh()));
    slider(bar, 'domain max', 10, 400, 10, max, (v) => ((max = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
