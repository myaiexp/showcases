// ClipExtension clipBounds: a GeoJsonLayer cut to a longitude/latitude rectangle
import { Deck } from '@deck.gl/core';
import { GeoJsonLayer } from '@deck.gl/layers';
import { ClipExtension, type ClipExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { countries, type CountryProps } from '../../shared/world.ts';

type Bounds = [number, number, number, number];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  let clipBounds: Bounds = [-30, 30, 60, 70];

  const layers = () => [
    // The whole map, faint, so the clipped region reads as a window.
    new GeoJsonLayer<CountryProps>({
      id: 'full',
      data: countries,
      getFillColor: [40, 52, 70],
      getLineColor: [70, 86, 110],
      lineWidthMinPixels: 1,
    }),
    new GeoJsonLayer<CountryProps, ClipExtensionProps>({
      id: 'clipped',
      data: countries,
      getFillColor: [255, 150, 70, 235],
      getLineColor: [255, 255, 255],
      lineWidthMinPixels: 1,
      // [left, bottom, right, top] in longitude and latitude
      clipBounds,
      extensions: [new ClipExtension()],
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    initialViewState: { longitude: 15, latitude: 40, zoom: ctx.preview ? 0.7 : 1.6 },
    controller: !ctx.preview,
    layers: layers(),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      const w = 40 + 25 * Math.sin(t * 0.8);
      const cx = 20 + 40 * Math.sin(t * 0.5);
      clipBounds = [cx - w, 20 - w / 2, cx + w, 50 + w / 2];
      deck.setProps({ layers: layers() });
    });
  } else {
    const bar = controlBar(el);
    const set = (i: number) => (v: number) => {
      clipBounds = clipBounds.map((b, k) => (k === i ? v : b)) as Bounds;
      deck.setProps({ layers: layers() });
    };
    slider(bar, 'left', -180, 180, 1, clipBounds[0], set(0));
    slider(bar, 'bottom', -85, 85, 1, clipBounds[1], set(1));
    slider(bar, 'right', -180, 180, 1, clipBounds[2], set(2));
    slider(bar, 'top', -85, 85, 1, clipBounds[3], set(3));
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
