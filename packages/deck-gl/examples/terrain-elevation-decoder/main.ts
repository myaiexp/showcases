// TerrainLayer elevationDecoder: pixel colour to metres, for different encodings
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TerrainLayer } from '@deck.gl/geo-layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { GRAYSCALE_DECODER, heightImage, MAPBOX_DECODER, surfaceImage, TERRAIN_BOUNDS, TERRAIN_CENTER, type Decoder } from '../../shared/geo-layers-art.ts';
import { terrainLoadOptions } from '../../shared/geo-layers-terrain.ts';
import { animate, createStage } from '../../shared/stage.ts';

const DECODERS: Record<string, Decoder> = {
  'default (red channel, metres 0-255)': GRAYSCALE_DECODER,
  'red channel x 10 (0-2550 m)': { rScaler: 10, gScaler: 0, bScaler: 0, offset: 0 },
  'Mapbox (24 bit, 0.1 m steps)': MAPBOX_DECODER,
};
const KEYS = Object.keys(DECODERS);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: TERRAIN_CENTER[0] - 0.03, latitude: TERRAIN_CENTER[1] - 0.03, zoom: ctx.preview ? 8.4 : 9.4, pitch: 62, bearing: 20 };
  const texture = surfaceImage(256);
  const images = new Map<string, string>();

  const terrain = (key: string): TerrainLayer => {
    const decoder = DECODERS[key]!;
    // Each image is drawn once for its decoder, then reused.
    if (!images.has(key)) images.set(key, heightImage(256, decoder));
    return new TerrainLayer({
      id: `terrain-${key}`,
      elevationData: images.get(key)!,
      texture,
      // metres = R * rScaler + G * gScaler + B * bScaler + offset
      elevationDecoder: decoder,
      bounds: TERRAIN_BOUNDS,
      meshMaxError: 8,
      loadOptions: terrainLoadOptions,
    });
  };
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [terrain(KEYS[1]!)] });

  let timer = 0;
  const stop = ctx.preview ? animate((t) => deck.setProps({ viewState: { ...view, bearing: 20 + t * 8 } })) : () => {};
  if (ctx.preview) {
    let i = 1;
    timer = window.setInterval(() => deck.setProps({ layers: [terrain(KEYS[++i % KEYS.length]!)] }), 2500);
  } else {
    const info = readout(el, '');
    const show = (key: string): void => {
      const d = DECODERS[key]!;
      info.textContent = `{ rScaler: ${d.rScaler}, gScaler: ${d.gScaler}, bScaler: ${d.bScaler}, offset: ${d.offset} }`;
    };
    select(controlBar(el), 'elevationDecoder', KEYS, (v) => (deck.setProps({ layers: [terrain(v)] }), show(v)), KEYS[1]);
    show(KEYS[1]!);
  }
  return () => {
    clearInterval(timer);
    stop();
    stage.release(deck);
  };
};

export default mount;
