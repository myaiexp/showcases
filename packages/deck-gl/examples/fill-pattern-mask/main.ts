// FillStyleExtension fillPatternMask: the atlas is a stencil (fill colour) or a picture
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
  const data = blobs(ctx.preview ? 10 : 16, 5);
  // A colour atlas: each sprite has its own ink and paper
  const atlas = patternAtlas(false);
  const names: PatternName[] = ['stripes', 'dots', 'checks', 'waves'];
  let fillPatternMask = false;

  const layers = () => [
    landLayer(),
    new PolygonLayer<Blob, FillStyleExtensionProps<Blob>>({
      id: 'areas',
      data,
      getPolygon: (d) => d.polygon,
      getFillColor: (d) => [...KIND_COLORS[d.kind]!, 255],
      fillPatternAtlas: atlas,
      fillPatternMapping: PATTERN_MAPPING,
      // true: alpha of the atlas is a mask painted with getFillColor.
      // false: the atlas pixel colours are drawn as they are.
      fillPatternMask,
      getFillPattern: (d) => names[KINDS.indexOf(d.kind as (typeof KINDS)[number])]!,
      getFillPatternScale: 1200,
      getFillPatternBackgroundColor: [20, 28, 40, 255],
      stroked: false,
      extensions: [new FillStyleExtension({ pattern: true })],
      updateTriggers: { getFillColor: fillPatternMask },
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
      fillPatternMask = Math.floor(t / 2.5) % 2 === 1;
      deck.setProps({ layers: layers() });
    });
  } else {
    check(controlBar(el), 'fillPatternMask', false, (v) => {
      fillPatternMask = v;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
