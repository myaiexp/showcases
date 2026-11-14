// HexagonLayer colorRange and colorDomain: palettes and a pinned range
import { Deck } from '@deck.gl/core';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout, select, slider } from '../../shared/controls.ts';
import { RAMPS, europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 900 : 4000);
  const view = europeView(ctx.preview);
  const names = Object.keys(RAMPS);
  const info = ctx.preview ? null : readout(el);

  const hexagons = (ramp: string, domain: [number, number] | null): HexagonLayer<Spot> =>
    new HexagonLayer<Spot>({
      id: 'hexagons',
      data,
      getPosition: (d) => d.position,
      radius: ctx.preview ? 55000 : 25000,
      extruded: false,
      colorRange: RAMPS[ramp],
      colorDomain: domain, // null: the layer uses the min and max of all hexagons
      onSetColorDomain: ([min, max]) => {
        if (info) info.textContent = `auto domain of the data: [${min}, ${max}]`;
      },
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), hexagons(names[0]!, null)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    let i = 0;
    const timer = setInterval(() => deck.setProps({ layers: [landLayer(), hexagons(names[++i % names.length]!, null)] }), 1600);
    stop = () => clearInterval(timer);
  } else {
    let [ramp, fixed, max] = [names[0]!, false, 40];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), hexagons(ramp, fixed ? [0, max] : null)] });
    const bar = controlBar(el);
    select(bar, 'colorRange', names, (v) => ((ramp = v), refresh()));
    check(bar, 'fixed colorDomain', fixed, (v) => ((fixed = v), refresh()));
    slider(bar, 'domain max', 5, 80, 5, max, (v) => ((max = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
