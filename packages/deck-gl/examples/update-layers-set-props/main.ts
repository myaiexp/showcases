// A feed of positions: every tick builds new layers with same ids and setProps
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { seeded } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Flight {
  callSign: string;
  lon: number;
  lat: number;
  alt: number;
}

const CALL_SIGNS = ['SKW 3342', 'FIN 9', 'DLH 401', 'BAW 117', 'AFR 22', 'KLM 65', 'SAS 805', 'IBE 31', 'LOT 3', 'AUA 12'];

/** The stand-in for the guide's `queryServer`: positions drifting east for each tick. */
function queryFeed(tick: number): Flight[] {
  const rand = seeded(5);
  return CALL_SIGNS.map((callSign, i) => ({
    callSign,
    lon: 2 + rand() * 24 + tick * (0.15 + rand() * 0.2),
    lat: 46 + rand() * 12 + Math.sin(tick * 0.4 + i) * 0.4,
    alt: 1800 + rand() * 9000,
  }));
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 14, latitude: 52, zoom: ctx.preview ? 2.8 : 3.8 };
  const info = ctx.preview ? null : readout(el, 'tick 0');
  let tick = 0;

  const layers = (flights: Flight[]) => [
    landLayer(),
    new ScatterplotLayer<Flight>({
      id: 'circles',
      data: flights,
      getPosition: (d) => [d.lon, d.lat, d.alt],
      getFillColor: [255, 90, 90],
      getRadius: 4,
      radiusUnits: 'pixels',
    }),
    new TextLayer<Flight>({
      id: 'labels',
      data: flights,
      getText: (d) => d.callSign,
      getPosition: (d) => [d.lon, d.lat, d.alt],
      getSize: 11,
      getPixelOffset: [0, -12],
      getColor: [235, 240, 250],
      characterSet: 'auto',
      parameters: { depthCompare: 'always' },
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: layers(queryFeed(0)),
  });

  // Same ids each time: deck.gl matches the new layers to the old ones and updates them.
  const timer = setInterval(() => {
    tick += 1;
    deck.setProps({ layers: layers(queryFeed(tick)) });
    if (info) info.textContent = `tick ${tick}: layers rebuilt, same ids`;
  }, 700);

  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
