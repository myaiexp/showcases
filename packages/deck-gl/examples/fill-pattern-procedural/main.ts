// FillStyleExtension proceduralPattern: hatch, cross-hatch and dot patterns from the shader
import { Deck } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';
import { FillStyleExtension, type FillStyleExtensionProps, type ProceduralPatternMapping } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { blobs, EU_VIEW, KIND_COLORS, KINDS, type Blob } from '../../shared/extensions-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const PATTERNS: ProceduralPatternMapping = {
  hatch: { type: 'hatch', angle: 45, strokeWidth: 2, gap: 6 },
  doubleLines: { type: 'hatch', angle: 30, strokeWidth: 2, gap: [2, 8] },
  crossHatch: { type: 'cross-hatch', angles: [30, 120], strokeWidth: 2, gap: 6 },
  dots: { type: 'dots', radius: 3, gap: 5, angle: 20, skew: 30 },
};
const NAMES = Object.keys(PATTERNS);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = blobs(ctx.preview ? 10 : 16, 4);
  let scale = 1;

  const layers = () => [
    landLayer(),
    new PolygonLayer<Blob, FillStyleExtensionProps<Blob>>({
      id: 'areas',
      data,
      getPolygon: (d) => d.polygon,
      // Procedural patterns always use the fill colour; the background colour sits behind
      getFillColor: [255, 255, 255, 255],
      getFillPatternBackgroundColor: (d) => [...KIND_COLORS[d.kind]!.map((c) => c * 0.55), 255] as [number, number, number, number],
      fillPatternMapping: PATTERNS,
      getFillPattern: (d) => NAMES[KINDS.indexOf(d.kind as (typeof KINDS)[number])]!,
      // Stroke widths, gaps and radii are in pixels here, multiplied by the scale
      fillPatternSizeUnits: 'pixels',
      getFillPatternScale: scale,
      stroked: false,
      // proceduralPattern implies pattern; no fillPatternAtlas is read
      extensions: [new FillStyleExtension({ proceduralPattern: true })],
      updateTriggers: { getFillPatternScale: scale },
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
      scale = 1 + 0.6 * Math.sin(t * 0.8);
      deck.setProps({ layers: layers() });
    });
  } else {
    slider(controlBar(el), 'getFillPatternScale', 0.5, 4, 0.1, 1, (v) => {
      scale = v;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
