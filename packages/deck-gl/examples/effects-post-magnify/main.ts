// The magnify pass from @luma.gl/effects: a lens over the map, positioned in screen coordinates
import { Deck, PostProcessEffect } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import { magnify } from '@luma.gl/effects';
import type { MagnifyProps } from '@luma.gl/effects';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 12, latitude: 46, zoom: ctx.preview ? 3.4 : 4.6 };
  const props: Required<MagnifyProps> = {
    screenXY: [0.5, 0.5], // 0..1 from the top-left corner
    radiusPixels: ctx.preview ? 50 : 90,
    zoom: 2.5,
    borderWidthPixels: 3,
    borderColor: [255, 255, 255, 255],
  };
  const effect = new PostProcessEffect(magnify, props);

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
        getRadius: (d) => Math.sqrt(d.population) * 15_000,
        getFillColor: [255, 150, 70],
        radiusMinPixels: 3,
      }),
      new TextLayer<City>({
        id: 'names',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getText: (d) => d.name,
        getSize: 11,
        getColor: [235, 240, 250],
        getTextAnchor: 'start',
        getPixelOffset: [7, 0],
      }),
    ],
  });
  const apply = (): void => {
    effect.setProps({ ...props });
    deck.redraw('lens moved');
  };

  const onMove = (e: PointerEvent): void => {
    const r = stage.box.getBoundingClientRect();
    props.screenXY = [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height];
    apply();
  };
  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      props.screenXY = [0.5 + 0.3 * Math.cos(t * 0.7), 0.5 + 0.25 * Math.sin(t * 1.1)];
      apply();
    });
  } else {
    stage.box.addEventListener('pointermove', onMove);
    const bar = controlBar(el);
    slider(bar, 'radiusPixels', 30, 200, 5, props.radiusPixels, (v) => {
      props.radiusPixels = v;
      apply();
    });
    slider(bar, 'zoom', 1, 6, 0.25, props.zoom, (v) => {
      props.zoom = v;
      apply();
    });
    slider(bar, 'borderWidthPixels', 0, 10, 1, props.borderWidthPixels, (v) => {
      props.borderWidthPixels = v;
      apply();
    });
    readout(el, 'Move the pointer over the map: screenXY follows it.');
  }
  return () => {
    stop();
    stage.box.removeEventListener('pointermove', onMove);
    stage.release(deck);
  };
};

export default mount;
