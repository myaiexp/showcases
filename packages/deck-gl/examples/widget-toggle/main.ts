// ToggleWidget: on and off buttons with their own icon, label and colour per state
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { ToggleWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { readout } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { clickEvery, drift, ICONS } from '../../shared/widgets-scene.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 25, zoom: ctx.preview ? 0.4 : 1.3 };
  const log = ctx.preview ? null : readout(el, 'Both toggles start checked (layers visible).');
  const visible = { land: true, cities: true };

  const layers = () => [
    landLayer().clone({ visible: visible.land }),
    new ScatterplotLayer<City>({
      id: 'cities',
      data: CITIES,
      visible: visible.cities,
      getPosition: (d) => d.coordinates,
      getRadius: (d) => Math.sqrt(d.population) * 40_000,
      getFillColor: [255, 140, 60],
      radiusMinPixels: 3,
    }),
  ];

  const deck: Deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: layers(),
    widgets: [
      new ToggleWidget({
        id: 'land',
        className: 'land',
        placement: 'top-left',
        initialChecked: true,
        icon: ICONS.eyeOff, // shown unchecked
        onIcon: ICONS.eye, // shown checked
        label: 'Show land',
        onLabel: 'Hide land',
        color: '#999',
        onColor: '#9be28b',
        onChange: (checked) => {
          visible.land = checked;
          deck.setProps({ layers: layers() });
          if (log) log.textContent = `land: ${checked ? 'visible' : 'hidden'}, cities: ${visible.cities ? 'visible' : 'hidden'}`;
        },
      }),
      new ToggleWidget({
        id: 'cities',
        className: 'cities',
        placement: 'top-left',
        initialChecked: true,
        icon: ICONS.circle,
        label: 'Show cities',
        onLabel: 'Hide cities',
        color: '#999',
        onColor: '#ffa04a',
        onChange: (checked) => {
          visible.cities = checked;
          deck.setProps({ layers: layers() });
          if (log) log.textContent = `land: ${visible.land ? 'visible' : 'hidden'}, cities: ${checked ? 'visible' : 'hidden'}`;
        },
      }),
    ],
  });

  const stopDrift = ctx.preview ? animate((t) => deck.setProps({ viewState: drift(view, t) })) : () => {};
  const press = ctx.preview ? clickEvery(stage.box, ['.land button', '.cities button', '.land button', '.cities button'], 1400) : () => {};
  return () => {
    stopDrift();
    press();
    stage.release(deck);
  };
};

export default mount;
