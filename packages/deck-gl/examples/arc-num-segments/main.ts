// ArcLayer: numSegments is the polyline each arc is drawn as
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ArcLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { routes, type Route } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const data = routes(['Singapore'], 11).filter((r) => r.flights > 40);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 60, latitude: 10, zoom: ctx.preview ? 0.4 : 1.1, pitch: 35 };

  const arcs = (numSegments: number): ArcLayer<Route> =>
    new ArcLayer<Route>({
      id: 'arcs',
      data,
      getSourcePosition: (d) => d.from.coordinates,
      getTargetPosition: (d) => d.to.coordinates,
      getSourceColor: [255, 120, 90],
      getTargetColor: [120, 220, 255],
      getWidth: 2,
      numSegments,
    });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), arcs(ctx.preview ? 3 : 4)],
  });

  let stop: () => void = () => {};
  if (ctx.preview) {
    // Card: the segment count sweeps 2..30 and back.
    stop = animate((t) => {
      const n = Math.round(2 + (1 - Math.cos(t * 0.8)) * 14);
      deck.setProps({ layers: [landLayer(), arcs(n)], viewState: { ...view, longitude: 60 + Math.sin(t / 3) * 15 } });
    });
  } else {
    const bar = controlBar(el);
    const info = readout(el, 'numSegments 4');
    slider(bar, 'numSegments', 1, 50, 1, 4, (v) => {
      info.textContent = `numSegments ${v}`;
      deck.setProps({ layers: [landLayer(), arcs(v)] });
    });
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
