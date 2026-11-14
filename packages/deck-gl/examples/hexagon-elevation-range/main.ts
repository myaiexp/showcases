// HexagonLayer elevation: elevationRange, elevationDomain and elevationScale
import { Deck } from '@deck.gl/core';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 900 : 4000);
  const view = europeView(ctx.preview, { pitch: 55, bearing: 20 });

  const hexagons = (rangeMax: number, domainMax: number | null, scale: number): HexagonLayer<Spot> =>
    new HexagonLayer<Spot>({
      id: 'hexagons',
      data,
      getPosition: (d) => d.position,
      radius: ctx.preview ? 55000 : 25000,
      extruded: true,
      // Counts from elevationDomain map linearly onto metres from elevationRange.
      elevationDomain: domainMax === null ? null : [0, domainMax],
      elevationRange: [0, rangeMax],
      elevationScale: scale,
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), hexagons(1000, null, 40)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), hexagons(400 + (1 + Math.sin(t)) * 800, null, 40)], viewState: { ...view, bearing: 20 + t * 4 } }));
  } else {
    let [rangeMax, fixed, domainMax, scale] = [1000, false, 20, 40];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), hexagons(rangeMax, fixed ? domainMax : null, scale)] });
    const bar = controlBar(el);
    slider(bar, 'elevationRange max', 100, 3000, 100, rangeMax, (v) => ((rangeMax = v), refresh()));
    check(bar, 'fixed elevationDomain', fixed, (v) => ((fixed = v), refresh()));
    slider(bar, 'domain max', 5, 80, 5, domainMax, (v) => ((domainMax = v), refresh()));
    slider(bar, 'elevationScale', 1, 100, 1, scale, (v) => ((scale = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
