// SplitterWidget: two MapViews side by side with a draggable border between them
import { Deck, MapView } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { _SplitterWidget as SplitterWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { button, controlBar, readout, select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const log = ctx.preview ? null : readout(el, 'Drag the border between the two maps.');
  const states: Record<string, MapViewState> = {
    world: { longitude: 10, latitude: 25, zoom: ctx.preview ? 0 : 0.8 },
    europe: { longitude: 10, latitude: 48, zoom: ctx.preview ? 2.2 : 3.4 },
  };

  const layout = (orientation: 'horizontal' | 'vertical', initialSplit: number) => ({
    orientation,
    initialSplit,
    editable: !ctx.preview,
    minSplit: 0.2,
    maxSplit: 0.8,
    views: [
      new MapView({ id: 'world', controller: !ctx.preview }),
      new MapView({ id: 'europe', controller: !ctx.preview }),
    ] as [MapView, MapView],
  });

  const splitter = (orientation: 'horizontal' | 'vertical', initialSplit: number) =>
    new SplitterWidget<MapView[]>({
      id: `splitter-${orientation}`,
      viewLayout: layout(orientation, initialSplit),
      onDragStart: () => { if (log) log.textContent = 'onDragStart'; },
      onChange: (views) => { if (log) log.textContent = `onChange: ${views.length} views while dragging`; },
      onDragEnd: () => { if (log) log.textContent = 'onDragEnd'; },
    });

  const deck = new Deck<MapView[]>({
    device: stage.device,
    initialViewState: states,
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
    widgets: [splitter('horizontal', 0.5)],
  });

  let timer = 0;
  if (ctx.preview) {
    // Nobody can drag in a card: swap the layout between two splits instead.
    let wide = false;
    timer = window.setInterval(() => {
      wide = !wide;
      deck.setProps({ widgets: [splitter('horizontal', wide ? 0.7 : 0.3)] });
    }, 2500);
  } else {
    const bar = controlBar(el);
    select(bar, 'orientation', ['horizontal', 'vertical'] as const, (v) => deck.setProps({ widgets: [splitter(v, 0.5)] }), 'horizontal');
    button(bar, 'Split 30 / 70', () => deck.setProps({ widgets: [splitter('horizontal', 0.3)] }));
  }
  return () => {
    window.clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
