// GreatCircleLayer: all routes out of one hub, width by flights, hover for details
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { GreatCircleLayer } from '@deck.gl/geo-layers';
import type { Mount } from '@/types.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { routes, type Route } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const HUBS = ['London', 'Dubai', 'New York'] as const;
type Hub = (typeof HUBS)[number];
const all = routes([...HUBS]);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 25, zoom: ctx.preview ? 0 : 0.9 };

  const routesFrom = (hub: Hub): GreatCircleLayer<Route> =>
    new GreatCircleLayer<Route>({
      id: 'routes',
      data: all.filter((r) => r.from.name === hub),
      getSourcePosition: (d) => d.from.coordinates,
      getTargetPosition: (d) => d.to.coordinates,
      getSourceColor: [255, 190, 70, 200],
      getTargetColor: [90, 210, 255, 200],
      // Flights per week: 5..65, drawn as 0.5..6.5 pixels.
      getWidth: (d) => d.flights / 10,
      getHeight: 0.4,
      pickable: !ctx.preview,
      autoHighlight: true,
    });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), routesFrom('London')],
    getTooltip: ({ object }: { object?: Route }) => (object ? `${object.from.name} to ${object.to.name}\n${object.flights} flights a week` : null),
  });

  let hub: Hub = 'London';
  const refresh = (): void => deck.setProps({ layers: [landLayer(), routesFrom(hub)] });
  let timer = 0;
  let stop: () => void = () => {};
  if (ctx.preview) {
    timer = window.setInterval(() => {
      hub = HUBS[(HUBS.indexOf(hub) + 1) % HUBS.length]!;
      refresh();
    }, 2200);
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: ((20 + t * 5 + 180) % 360) - 180 } }));
  } else {
    select(controlBar(el), 'Hub', HUBS, (v) => ((hub = v), refresh()), hub);
  }
  return () => {
    clearInterval(timer);
    stop();
    stage.release(deck);
  };
};

export default mount;
