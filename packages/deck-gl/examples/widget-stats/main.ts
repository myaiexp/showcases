// StatsWidget: a collapsible FPS and counters panel, with the deck, luma or device stats
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { _StatsWidget as StatsWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { drift } from '../../shared/widgets-scene.ts';
import { landLayer } from '../../shared/world.ts';

type StatsType = 'deck' | 'luma' | 'device';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 25, zoom: ctx.preview ? 0.5 : 1.3 };

  const stats = (type: StatsType): StatsWidget =>
    new StatsWidget({
      // A new id per type: widgets are matched between setProps calls by id.
      id: `stats-${type}`,
      placement: 'top-left',
      type,
      title: `${type} stats`,
      initialExpanded: true,
      framesPerUpdate: 10,
    });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: (d) => Math.sqrt(d.population) * 30_000,
        getFillColor: [255, 140, 60],
        radiusMinPixels: 3,
      }),
    ],
    widgets: [stats('deck')],
  });

  if (!ctx.preview) {
    const bar = controlBar(el);
    select(bar, 'type', ['deck', 'luma', 'device'] as const, (v) => deck.setProps({ widgets: [stats(v)] }), 'deck');
  }

  // Redrawing every frame keeps the counters moving.
  const stop = animate((t) => deck.setProps({ viewState: drift(view, t, ctx.preview ? 6 : 2) }));
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
