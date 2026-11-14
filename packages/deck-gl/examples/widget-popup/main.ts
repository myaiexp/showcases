// PopupWidget: popups anchored to world positions, with markers that open them on click
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { PopupWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, city, type City } from '../../shared/data.ts';
import { readout } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { clickEvery } from '../../shared/widgets-scene.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 15, latitude: 45, zoom: ctx.preview ? 2.4 : 3.4 };
  const log = ctx.preview ? null : readout(el, 'Click a marker to open its popup; the cross closes it.');

  const paris = city('Paris');
  const rome = { name: 'Rome', coordinates: [12.5, 41.9] as [number, number] };
  const berlin = city('Berlin');

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
    widgets: [
      // Open from the start, with HTML content and a close button.
      new PopupWidget({
        id: 'paris',
        position: paris.coordinates,
        content: { html: '<b>Paris</b><br>Open by default' },
        defaultIsOpen: true,
        placement: 'top',
        onOpenChange: (isOpen) => {
          if (log) log.textContent = `Paris popup ${isOpen ? 'opened' : 'closed'}`;
        },
      }),
      // Closed at first: the marker is what you see, and clicking it opens the popup.
      new PopupWidget({
        id: 'rome',
        className: 'rome',
        position: rome.coordinates,
        marker: { text: 'Rome' },
        content: { text: 'Rome: the marker opens this popup' },
        defaultIsOpen: false,
        placement: 'bottom',
        onOpenChange: (isOpen) => {
          if (log) log.textContent = `Rome popup ${isOpen ? 'opened' : 'closed'}`;
        },
      }),
      new PopupWidget({
        id: 'berlin',
        position: berlin.coordinates,
        marker: { html: '<b>Berlin</b>' },
        content: { text: 'Berlin: closes when you click elsewhere' },
        defaultIsOpen: false,
        closeOnClickOutside: true,
        closeButton: false,
        placement: 'right',
      }),
    ],
  });

  const stopDrift = ctx.preview ? animate((t) => deck.setProps({ viewState: { ...view, longitude: view.longitude + Math.sin(t * 0.4) * 6 } })) : () => {};
  const press = ctx.preview ? clickEvery(stage.box, '.rome .deck-widget-popup-marker', 3500) : () => {};
  return () => {
    stopDrift();
    press();
    stage.release(deck);
  };
};

export default mount;
