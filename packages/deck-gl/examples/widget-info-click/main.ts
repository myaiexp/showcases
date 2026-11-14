// InfoWidget in click mode with a DOM element as content and placement options
import { Deck } from '@deck.gl/core';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { InfoWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { controlBar, readout, select, slider } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const PLACEMENTS = ['top', 'right', 'bottom', 'left', 'top-start', 'top-end', 'right-start', 'bottom-end'] as const;
type Placement = (typeof PLACEMENTS)[number];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 35, zoom: ctx.preview ? 1.4 : 2.4 };
  const log = ctx.preview ? null : readout(el, 'Click a city. Clicking empty map closes the popup.');

  const info = new InfoWidget({
    id: 'city-info',
    mode: 'click',
    placement: 'right',
    offset: 10,
    arrow: 10,
    getTooltip: (picked: PickingInfo<City>) => {
      if (!picked.object) return null;
      // An element instead of text or html: build whatever DOM you like.
      const card = document.createElement('div');
      const title = document.createElement('strong');
      title.textContent = picked.object.name;
      const meta = document.createElement('div');
      meta.textContent = `${picked.object.population} million people`;
      card.append(title, meta);
      if (log) log.textContent = `clicked ${picked.object.name}`;
      return { position: picked.object.coordinates, element: card, className: 'city-popup' };
    },
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
        pickable: true,
        getPosition: (d) => d.coordinates,
        getRadius: (d) => Math.sqrt(d.population) * 40_000,
        getFillColor: [255, 140, 60],
        radiusMinPixels: 4,
      }),
    ],
    widgets: [info],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    // Feed the widget's onClick hook with real picks, one city after another.
    const names = ['Berlin', 'Lagos', 'Cairo', 'Madrid'];
    let last = -1;
    stop = animate((t) => {
      const i = Math.floor(t / 2) % names.length;
      if (i === last) return;
      const viewport = deck.getViewports()[0];
      const c = CITIES.find((x) => x.name === names[i]);
      if (!viewport || !c) return;
      const [x, y] = viewport.project(c.coordinates);
      const picked = deck.pickObject({ x: x!, y: y! });
      if (picked) {
        last = i;
        info.onClick(picked);
      }
    });
  } else {
    const bar = controlBar(el);
    select<Placement>(bar, 'placement', PLACEMENTS, (v) => info.setProps({ placement: v }), 'right');
    slider(bar, 'offset', 0, 40, 2, 10, (v) => info.setProps({ offset: v }));
    slider(bar, 'arrow (0 = off)', 0, 24, 2, 10, (v) => info.setProps({ arrow: v === 0 ? false : v }));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
