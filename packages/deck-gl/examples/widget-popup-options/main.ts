// PopupWidget placement, offset and arrow options, changed live with setProps
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { PopupWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, city, type City } from '../../shared/data.ts';
import { check, controlBar, select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const PLACEMENTS = [
  'top', 'top-start', 'top-end', 'right', 'right-start', 'right-end',
  'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end',
] as const;
type Placement = (typeof PLACEMENTS)[number];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 48, zoom: ctx.preview ? 3 : 4.4 };
  const berlin = city('Berlin');

  const popup = new PopupWidget({
    id: 'berlin',
    position: berlin.coordinates,
    content: { html: '<b>Berlin</b><br>Anchored at 13.4, 52.5' },
    placement: 'right',
    offset: 10,
    arrow: [12, 8],
    defaultIsOpen: true,
    closeButton: true,
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
        getRadius: 15_000,
        getFillColor: [255, 140, 60],
        radiusMinPixels: 3,
      }),
    ],
    widgets: [popup],
  });

  let timer = 0;
  if (ctx.preview) {
    // Walk through the placements on a timer.
    let i = 0;
    timer = window.setInterval(() => popup.setProps({ placement: PLACEMENTS[++i % PLACEMENTS.length]! }), 1100);
  } else {
    const bar = controlBar(el);
    select<Placement>(bar, 'placement', PLACEMENTS, (v) => popup.setProps({ placement: v }), 'right');
    slider(bar, 'offset', 0, 60, 2, 10, (v) => popup.setProps({ offset: v }));
    slider(bar, 'arrow (0 = off)', 0, 30, 2, 12, (v) => popup.setProps({ arrow: v === 0 ? false : v }));
    check(bar, 'closeButton', true, (v) => popup.setProps({ closeButton: v }));
  }
  return () => {
    window.clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
