// ArcLayer: separate getSourceColor and getTargetColor accessors
import { Deck } from '@deck.gl/core';
import type { Color, MapViewState } from '@deck.gl/core';
import { ArcLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { routes, type Route } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const data = routes(['Tokyo', 'Johannesburg'], 9);
const WARM: Color = [255, 120, 60];
const COOL: Color = [70, 170, 255];
const GREEN: Color = [90, 230, 140];

type Scheme = 'warm to cool' | 'by flights' | 'by hemisphere';

/** Colour accessors per scheme; the layer blends from source colour to target colour. */
function colours(scheme: Scheme): { source: (d: Route) => Color; target: (d: Route) => Color } {
  if (scheme === 'by flights') {
    return {
      source: () => [255, 255, 255],
      target: (d) => [60 + d.flights * 3, 255 - d.flights * 3, 120],
    };
  }
  if (scheme === 'by hemisphere') {
    return {
      source: (d) => (d.from.coordinates[1] > 0 ? WARM : GREEN),
      target: (d) => (d.to.coordinates[1] > 0 ? WARM : GREEN),
    };
  }
  return { source: () => WARM, target: () => COOL };
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 50, latitude: 10, zoom: ctx.preview ? 0 : 1.1, pitch: 30 };

  const arcs = (scheme: Scheme): ArcLayer<Route> => {
    const c = colours(scheme);
    return new ArcLayer<Route>({
      id: 'arcs',
      data,
      getSourcePosition: (d) => d.from.coordinates,
      getTargetPosition: (d) => d.to.coordinates,
      getSourceColor: c.source,
      getTargetColor: c.target,
      getWidth: 2,
      pickable: !ctx.preview,
      updateTriggers: { getSourceColor: scheme, getTargetColor: scheme },
    });
  };

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    getTooltip: ({ object }) => (object ? `${(object as Route).from.name} to ${(object as Route).to.name}: ${(object as Route).flights} flights` : null),
    layers: [landLayer(), arcs('warm to cool')],
  });

  let stop: () => void = () => {};
  let timer = 0;
  if (ctx.preview) {
    const schemes: Scheme[] = ['warm to cool', 'by flights', 'by hemisphere'];
    let i = 0;
    timer = window.setInterval(() => deck.setProps({ layers: [landLayer(), arcs(schemes[++i % 3]!)] }), 2000);
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: ((50 + t * 7 + 180) % 360) - 180 } }));
  } else {
    select(controlBar(el), 'colours', ['warm to cool', 'by flights', 'by hemisphere'] as const, (v) => deck.setProps({ layers: [landLayer(), arcs(v)] }));
  }
  return () => {
    clearInterval(timer);
    stop();
    stage.release(deck);
  };
};

export default mount;
