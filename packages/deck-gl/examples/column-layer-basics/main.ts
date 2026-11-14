// ColumnLayer: columns with radius, diskResolution and elevationScale
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ColumnLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { columnPoints } from '../../shared/core-layers-1-data.ts';
import type { SamplePoint } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = columnPoints(ctx.preview ? 60 : 160, [2.35, 48.86]);
  const view: MapViewState = { longitude: 2.35, latitude: 48.86, zoom: ctx.preview ? 7.4 : 8.4, pitch: 55, bearing: 15 };

  const columns = (radius: number, diskResolution: number, elevationScale: number): ColumnLayer<SamplePoint> =>
    new ColumnLayer<SamplePoint>({
      id: 'columns',
      data,
      getPosition: (d) => d.position,
      getFillColor: (d) => [255 - d.value * 200, 120 + d.value * 100, 80 + d.value * 170],
      getElevation: (d) => (1 - d.value) * 6000, // metres
      radius,
      diskResolution,
      elevationScale,
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), columns(1000, 20, 1)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), columns(1000, 20, 0.6 + (1 + Math.sin(t)) * 0.5)], viewState: { ...view, bearing: 15 + t * 6 } }));
  } else {
    let [r, n, e] = [1000, 20, 1];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), columns(r, n, e)] });
    const bar = controlBar(el);
    slider(bar, 'radius (m)', 200, 3000, 100, r, (v) => ((r = v), refresh()));
    slider(bar, 'diskResolution', 3, 30, 1, n, (v) => ((n = v), refresh()));
    slider(bar, 'elevationScale', 0, 3, 0.1, e, (v) => ((e = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
