// HexagonLayer onSetColorDomain and onSetElevationDomain readouts
import { Deck } from '@deck.gl/core';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { europeView, spots, type Spot } from '../../shared/aggregation-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = spots(ctx.preview ? 900 : 4000);
  const view = europeView(ctx.preview, { pitch: 50 });
  const log = ctx.preview ? null : readout(el);
  const domains = { color: '', elevation: '' };
  const show = (): void => {
    if (log) log.textContent = `color domain ${domains.color}\nelevation domain ${domains.elevation}`;
  };

  const hexagons = (radius: number): HexagonLayer<Spot> =>
    new HexagonLayer<Spot>({
      id: 'hexagons',
      data,
      getPosition: (d) => d.position,
      getColorWeight: (d) => d.weight,
      getElevationWeight: 1,
      radius,
      extruded: true,
      elevationScale: 30,
      // Called each time the aggregation finishes; bigger hexagons raise the maximum.
      onSetColorDomain: ([min, max]) => {
        domains.color = `[${min}, ${max}] (sum of weights)`;
        show();
      },
      onSetElevationDomain: ([min, max]) => {
        domains.elevation = `[${min}, ${max}] (points per hexagon)`;
        show();
      },
    });

  const start = ctx.preview ? 55000 : 25000;
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), hexagons(start)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), hexagons(Math.round((40000 + (1 + Math.sin(t * 0.8)) * 20000) / 2000) * 2000)], viewState: { ...view, bearing: t * 5 } }));
  } else {
    slider(controlBar(el), 'radius (m)', 5000, 70000, 1000, start, (v) => deck.setProps({ layers: [landLayer(), hexagons(v)] }));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
