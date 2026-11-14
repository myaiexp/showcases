// SelectorWidget: a popover menu of icon options that picks how the dots are sized
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { SelectorWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { readout } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { clickEvery, drift, ICONS } from '../../shared/widgets-scene.ts';
import { landLayer } from '../../shared/world.ts';

type SizeBy = 'population' | 'equal' | 'inverse';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 25, zoom: ctx.preview ? 0.4 : 1.3 };
  const log = ctx.preview ? null : readout(el, 'Open the menu (top left) and pick a sizing.');
  let sizeBy: SizeBy = 'population';

  const radius = (d: City): number => {
    if (sizeBy === 'equal') return 500_000;
    if (sizeBy === 'inverse') return 2_200_000 / Math.sqrt(d.population + 1);
    return Math.sqrt(d.population) * 60_000;
  };
  const layers = () => [
    landLayer(),
    new ScatterplotLayer<City>({
      id: 'cities',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      getRadius: radius,
      updateTriggers: { getRadius: sizeBy },
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
      new SelectorWidget<SizeBy>({
        id: 'sizing',
        className: 'sizing',
        placement: 'top-left',
        initialValue: 'population',
        options: [
          { value: 'population', icon: ICONS.layers, label: 'By population' },
          { value: 'equal', icon: ICONS.circle, label: 'All equal' },
          { value: 'inverse', icon: ICONS.triangle, label: 'Small cities big' },
        ],
        onChange: (value) => {
          sizeBy = value;
          deck.setProps({ layers: layers() });
          if (log) log.textContent = `onChange: ${value}`;
        },
      }),
    ],
  });

  const stopDrift = ctx.preview ? animate((t) => deck.setProps({ viewState: drift(view, t) })) : () => {};
  // Open the menu, pick an item, repeat.
  const press = ctx.preview
    ? clickEvery(
        stage.box,
        ['.sizing button', '.deck-widget-dropdown-item:nth-child(2)', '.sizing button', '.deck-widget-dropdown-item:nth-child(3)', '.sizing button', '.deck-widget-dropdown-item:nth-child(1)'],
        1200,
      )
    : () => {};
  return () => {
    stopDrift();
    press();
    stage.release(deck);
  };
};

export default mount;
