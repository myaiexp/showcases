// A uniform-prop transition: elevationScale animates from 0 once data is present
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import type { Mount } from '@/types.ts';
import { button, controlBar } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const DATA = pointCloud(3000, { seed: 4, spread: 1.4 });

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#101a26' });
  const view: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 4 : 4.6, pitch: 50, bearing: 10 };
  const data = ctx.preview ? DATA.slice(0, 1200) : DATA;

  const layers = (rows: SamplePoint[] | null) => [
    new HexagonLayer<SamplePoint>({
      id: '3d-heatmap',
      data: rows ?? [],
      gpuAggregation: false,
      getPosition: (d) => d.position,
      radius: ctx.preview ? 40_000 : 25_000,
      extruded: true,
      // Zero until data is there; the transition below animates the change.
      elevationScale: rows && rows.length ? 50 : 0,
      transitions: { elevationScale: 3000 },
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers(null) });
  let timers: number[] = [];
  const load = (): void => {
    deck.setProps({ layers: layers(null) });
    timers.push(window.setTimeout(() => deck.setProps({ layers: layers(data) }), 500));
  };
  load();

  if (ctx.preview) {
    timers.push(window.setInterval(load, 6000));
  } else {
    button(controlBar(el), 'Clear, then load the data again', load);
  }
  return () => {
    for (const t of timers) {
      clearTimeout(t);
      clearInterval(t);
    }
    timers = [];
    stage.release(deck);
  };
};

export default mount;
