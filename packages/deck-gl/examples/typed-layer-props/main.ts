// Typed props: a data type threaded through ScatterplotLayer, TextLayer, picking
import { Deck } from '@deck.gl/core';
import type { LayersList, MapViewState, PickingInfo } from '@deck.gl/core';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { CITIES } from '../../shared/data.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

/** The row type: the generic parameter of every layer below. */
type Metro = {
  name: string;
  coordinates: [longitude: number, latitude: number];
  people: number;
};

const METROS: Metro[] = CITIES.filter((c) => c.population >= 12).map((c) => ({
  name: c.name,
  coordinates: c.coordinates,
  people: c.population,
}));

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 25, zoom: ctx.preview ? 0.4 : 1.1 };
  const info = ctx.preview ? null : readout(el, 'Hover a city');

  // LayersList is the type of Deck's `layers` prop.
  const layers: LayersList = [
    landLayer(),
    new ScatterplotLayer<Metro>({
      id: 'metros',
      data: METROS,
      // With the generic given, `d` is a Metro in every accessor.
      getPosition: (d: Metro) => d.coordinates,
      getRadius: (d: Metro) => Math.sqrt(d.people) * 50_000,
      getFillColor: [255, 150, 70, 210],
      radiusMinPixels: 3,
      pickable: true,
    }),
    new TextLayer<Metro>({
      id: 'metro-names',
      data: METROS,
      getText: (d: Metro) => d.name,
      getPosition: (d: Metro) => d.coordinates,
      getSize: 12,
      getColor: [235, 240, 250],
      getPixelOffset: [0, -14],
      characterSet: 'auto',
      parameters: { depthCompare: 'always' },
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers,
    // PickingInfo<Metro> types `object` as Metro | undefined.
    onHover: (picked: PickingInfo<Metro>) => {
      if (info) info.textContent = picked.object ? `${picked.object.name}: ${picked.object.people} million` : 'Hover a city';
    },
  });

  const stop = ctx.preview
    ? animate((t) => deck.setProps({ viewState: { ...view, longitude: wrapLng(20 + t * 7) } }))
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
