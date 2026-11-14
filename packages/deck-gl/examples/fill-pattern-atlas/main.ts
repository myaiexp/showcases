// FillStyleExtension pattern: polygons tiled with sprites from an atlas drawn on a canvas
import { Deck } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';
import { FillStyleExtension, type FillStyleExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { blobs, EU_VIEW, KIND_COLORS, KINDS, type Blob } from '../../shared/extensions-data.ts';
import { PATTERN_MAPPING, patternAtlas, type PatternName } from '../../shared/extensions-atlas.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = blobs(ctx.preview ? 10 : 16);
  const atlas = patternAtlas(true);
  const names: PatternName[] = ['stripes', 'dots', 'checks', 'waves'];
  let fillPatternEnabled = true;

  const layers = () => [
    landLayer(),
    new PolygonLayer<Blob, FillStyleExtensionProps<Blob>>({
      id: 'areas',
      data,
      getPolygon: (d) => d.polygon,
      getFillColor: (d) => [...KIND_COLORS[d.kind]!, 255],
      // The atlas image and where each named pattern sits on it: x, y, width, height
      fillPatternAtlas: atlas,
      fillPatternMapping: PATTERN_MAPPING,
      fillPatternEnabled,
      // The key into fillPatternMapping for each object
      getFillPattern: (d) => names[KINDS.indexOf(d.kind as (typeof KINDS)[number])]!,
      // 64 x 64 atlas tiles covering 64 m x scale: ~77 km here
      getFillPatternScale: 1200,
      getFillPatternOffset: [0, 0],
      getFillPatternBackgroundColor: [20, 28, 40, 255],
      stroked: false,
      extensions: [new FillStyleExtension({ pattern: true })],
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
    stop = animate((t) => deck.setProps({ viewState: { ...EU_VIEW, zoom: 3.3, longitude: 8 + 4 * Math.sin(t * 0.3) } }));
  } else {
    check(controlBar(el), 'fillPatternEnabled', true, (v) => {
      fillPatternEnabled = v;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
