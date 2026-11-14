// HexagonLayer: points binned into hexagons; radius, extruded, elevationScale
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
  const view = europeView(ctx.preview, { pitch: 50, bearing: -12 });

  const hexagons = (radius: number, elevationScale: number, extruded: boolean): HexagonLayer<Spot> =>
    new HexagonLayer<Spot>({
      id: 'hexagons',
      data,
      getPosition: (d) => d.position,
      // Every point weighs 1 (the default), so colour and height both show the point count.
      radius, // metres, pointy-topped
      extruded,
      elevationScale,
      pickable: !ctx.preview,
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), hexagons(ctx.preview ? 55000 : 25000, 40, true)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), hexagons(55000, 15 + (1 + Math.sin(t * 1.2)) * 25, true)], viewState: { ...view, bearing: -12 + t * 5 } }));
  } else {
    let [radius, scale, extruded] = [25000, 40, true];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), hexagons(radius, scale, extruded)] });
    const bar = controlBar(el);
    slider(bar, 'radius (m)', 5000, 60000, 1000, radius, (v) => ((radius = v), refresh()));
    slider(bar, 'elevationScale', 0, 150, 5, scale, (v) => ((scale = v), refresh()));
    check(bar, 'extruded', extruded, (v) => ((extruded = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
