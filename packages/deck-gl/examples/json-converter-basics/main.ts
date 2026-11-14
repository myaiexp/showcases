// JSONConverter: @@type layers and @@= accessors converted and given to Deck
import { Deck } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { JSONConverter } from '@deck.gl/json';
import type { Mount } from '@/types.ts';
import { CITY_ROWS, applyConverted } from '../../shared/json-data.ts';
import { animate, createStage } from '../../shared/stage.ts';

// The spec is plain JSON: no classes, no functions. "@@type" names a class from the
// configuration, "@@=" strings become accessors that read the row's fields.
const SPEC = {
  initialViewState: { longitude: 10, latitude: 25, zoom: 1 },
  controller: true,
  layers: [
    {
      '@@type': 'ScatterplotLayer',
      id: 'json-cities',
      data: CITY_ROWS,
      getPosition: '@@=[lng, lat]',
      getRadius: '@@=population * 40000',
      getFillColor: [255, 140, 60, 220],
      radiusMinPixels: 2,
    },
  ],
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  // The configuration lists the classes the JSON may name: nothing else can be instantiated.
  const converter = new JSONConverter({ configuration: { classes: { ScatterplotLayer } } });
  const deck = new Deck({ device: stage.device, controller: !ctx.preview, layers: [] });
  // convert() takes an object or a string and returns the props with real instances in them.
  applyConverted(deck, converter.convert(SPEC), { first: true, controller: !ctx.preview });

  const stop = ctx.preview
    ? animate((t) => deck.setProps({ viewState: { ...SPEC.initialViewState, zoom: 0.4, longitude: ((10 + t * 8 + 180) % 360) - 180 } }))
    : () => {};
  return () => {
    stop();
    converter.finalize();
    stage.release(deck);
  };
};

export default mount;
