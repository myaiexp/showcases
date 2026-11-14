// PathStyleExtension on outlines: dashed polygon edges and dashed ScatterplotLayer rings
import { Deck } from '@deck.gl/core';
import { PolygonLayer, ScatterplotLayer } from '@deck.gl/layers';
import { PathStyleExtension, type PathStyleExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { blobs, dots, EU_VIEW, type Blob, type Dot } from '../../shared/extensions-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const areas = blobs(ctx.preview ? 8 : 12, 12);
  const rings = dots(ctx.preview ? 14 : 24, 13, 3);
  let dash = 3;

  const layers = () => [
    landLayer(),
    new PolygonLayer<Blob, PathStyleExtensionProps<Blob>>({
      id: 'areas',
      data: areas,
      getPolygon: (d) => d.polygon,
      getFillColor: [255, 170, 70, 40],
      getLineColor: [255, 170, 70],
      getLineWidth: 3,
      lineWidthUnits: 'pixels',
      getDashArray: [dash, 2],
      extensions: [new PathStyleExtension({ dash: true })],
      updateTriggers: { getDashArray: dash },
    }),
    new ScatterplotLayer<Dot, PathStyleExtensionProps<Dot>>({
      id: 'rings',
      data: rings,
      getPosition: (d) => d.position,
      getRadius: 60_000,
      filled: false,
      stroked: true,
      getLineColor: [90, 200, 255],
      getLineWidth: 3,
      lineWidthUnits: 'pixels',
      // ScatterplotLayer outlines take getDashArray (always in widths) and dashGapPickable only
      getDashArray: [dash, 2],
      extensions: [new PathStyleExtension({ dash: true })],
      updateTriggers: { getDashArray: dash },
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    initialViewState: ctx.preview ? { ...EU_VIEW, zoom: 3.3 } : EU_VIEW,
    controller: !ctx.preview,
    layers: layers(),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      dash = 1.5 + 3 * (0.5 + 0.5 * Math.sin(t * 0.9));
      deck.setProps({ layers: layers() });
    });
  } else {
    slider(controlBar(el), 'dash length (widths)', 1, 8, 0.5, dash, (v) => {
      dash = v;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
