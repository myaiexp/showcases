// IconWidget: custom icon buttons wired to a layer prop through onClick
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { IconWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { clickEvery, drift, ICONS } from '../../shared/widgets-scene.ts';
import { landLayer } from '../../shared/world.ts';

const PALETTE: [number, number, number][] = [[255, 140, 60], [90, 200, 255], [150, 255, 130], [255, 100, 200]];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 25, zoom: ctx.preview ? 0.4 : 1.3 };
  let colour = 0;
  let scale = 1;

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<City>({
      id: 'cities',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      getRadius: (d) => Math.sqrt(d.population) * 40_000,
      radiusScale: scale,
      getFillColor: PALETTE[colour]!,
      radiusMinPixels: 3,
      updateTriggers: { getFillColor: colour },
    }),
  ];

  const deck: Deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: layers(),
    widgets: [
      // `icon` is a data URL used as a mask: only its shape counts, `color` paints it.
      new IconWidget({
        id: 'recolour',
        className: 'recolour',
        placement: 'top-left',
        icon: ICONS.star,
        label: 'Next colour',
        color: '#ffd24a',
        onClick: () => {
          colour = (colour + 1) % PALETTE.length;
          deck.setProps({ layers: layers() });
        },
      }),
      new IconWidget({
        id: 'grow',
        className: 'grow',
        placement: 'top-left',
        icon: ICONS.circle,
        label: 'Bigger dots',
        tooltip: 'Dots grow until 3x, then start over',
        color: '#7fd1ff',
        onClick: () => {
          scale = scale >= 3 ? 1 : scale + 0.5;
          deck.setProps({ layers: layers() });
        },
      }),
    ],
  });

  const stopDrift = ctx.preview ? animate((t) => deck.setProps({ viewState: drift(view, t) })) : () => {};
  const press = ctx.preview ? clickEvery(stage.box, ['.recolour button', '.grow button'], 1500) : () => {};
  return () => {
    stopDrift();
    press();
    stage.release(deck);
  };
};

export default mount;
