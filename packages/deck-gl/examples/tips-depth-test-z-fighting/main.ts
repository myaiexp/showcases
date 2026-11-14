// Billboarded labels share depth with the ground; parameters.depthCompare = 'always' turns that off
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 38, zoom: ctx.preview ? 2.6 : 3.4, pitch: 72, bearing: 0 };
  let depthOff = false;

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<City>({ id: 'dots', data: CITIES, getPosition: (d) => d.coordinates, getRadius: 4, radiusUnits: 'pixels', getFillColor: [255, 170, 70] }),
    new TextLayer<City>({
      id: 'labels',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      getText: (d) => d.name,
      getSize: 15,
      getColor: [240, 244, 250],
      getPixelOffset: [0, -14],
      fontSettings: { sdf: true },
      outlineWidth: 2,
      outlineColor: [10, 20, 30],
      // At a steep pitch the flat text quads sit in the same depth range as the ground and get cut off.
      // With depth testing off, the label layer is drawn over what is below it.
      parameters: depthOff ? { depthCompare: 'always' } : {},
    }),
  ];
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });

  const stops: (() => void)[] = [];
  if (ctx.preview) {
    stops.push(animate((t) => {
      const off = Math.floor(t / 2.5) % 2 === 1;
      if (off !== depthOff) {
        depthOff = off;
        deck.setProps({ layers: layers() });
      }
      deck.setProps({ viewState: { ...view, bearing: Math.sin(t * 0.4) * 25 } });
    }));
  } else {
    check(controlBar(el), "labels: parameters { depthCompare: 'always' }", false, (v) => {
      depthOff = v;
      deck.setProps({ layers: layers() });
    });
  }
  return () => {
    for (const stop of stops) stop();
    stage.release(deck);
  };
};

export default mount;
