// PostProcessEffect(shaderModule, props): a custom filter pass over the finished canvas
import { Deck, PostProcessEffect } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import { duotone, type DuotoneProps } from './duotone.ts';

const PALETTES: Record<string, Pick<DuotoneProps, 'shadowColor' | 'lightColor'>> = {
  'night to amber': { shadowColor: [0.05, 0, 0.25], lightColor: [1, 0.8, 0.3] },
  'ink to mint': { shadowColor: [0.02, 0.05, 0.1], lightColor: [0.6, 1, 0.85] },
  'plum to rose': { shadowColor: [0.15, 0, 0.2], lightColor: [1, 0.55, 0.7] },
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 15, latitude: 25, zoom: ctx.preview ? 0.6 : 1.4 };
  const props: DuotoneProps = { ...PALETTES['night to amber']!, amount: 1 };
  const effect = new PostProcessEffect(duotone, props);

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    effects: [effect],
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: (d) => Math.sqrt(d.population) * 60_000,
        radiusMinPixels: 3,
        getFillColor: [255, 255, 255],
      }),
    ],
  });
  const apply = (): void => {
    effect.setProps({ ...props });
    deck.redraw('effect props changed');
  };

  const stops: (() => void)[] = [];
  if (ctx.preview) {
    stops.push(animate((t) => {
      props.amount = 0.5 + 0.5 * Math.sin(t * 1.5);
      apply();
    }));
  } else {
    const bar = controlBar(el);
    slider(bar, 'amount', 0, 1, 0.05, props.amount, (v) => {
      props.amount = v;
      apply();
    });
    select(bar, 'colours', Object.keys(PALETTES), (v) => {
      Object.assign(props, PALETTES[v]);
      apply();
    });
  }
  return () => {
    for (const stop of stops) stop();
    stage.release(deck);
  };
};

export default mount;
