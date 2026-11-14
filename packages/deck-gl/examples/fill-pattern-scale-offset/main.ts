// FillStyleExtension getFillPatternScale and getFillPatternOffset
import { Deck } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';
import { FillStyleExtension, type FillStyleExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { blobs, EU_VIEW, type Blob } from '../../shared/extensions-data.ts';
import { PATTERN_MAPPING, patternAtlas } from '../../shared/extensions-atlas.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = blobs(ctx.preview ? 10 : 16, 6);
  const atlas = patternAtlas(true);
  let scale = 1;
  let offset: [number, number] = [0, 0];

  const layers = () => [
    landLayer(),
    new PolygonLayer<Blob, FillStyleExtensionProps<Blob>>({
      id: 'areas',
      data,
      getPolygon: (d) => d.polygon,
      getFillColor: [255, 170, 70, 255],
      fillPatternAtlas: atlas,
      fillPatternMapping: PATTERN_MAPPING,
      getFillPattern: () => 'dots',
      // A function: each area gets its own scale (1x, 1.6x or 2.2x of the slider)
      getFillPatternScale: (d) => 800 * scale * (1 + (Number(d.name.slice(5)) % 3) * 0.6),
      // [0.5, 0.5] shifts the pattern by half a tile
      getFillPatternOffset: offset,
      getFillPatternBackgroundColor: [20, 28, 40, 255],
      stroked: false,
      extensions: [new FillStyleExtension({ pattern: true })],
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
      offset = [(t * 0.15) % 1, (t * 0.1) % 1];
      deck.setProps({ layers: layers() });
    });
  } else {
    const bar = controlBar(el);
    slider(bar, 'scale', 0.4, 3, 0.1, 1, (v) => {
      scale = v;
      deck.setProps({ layers: layers() });
    });
    slider(bar, 'offset x', 0, 1, 0.05, 0, (v) => {
      offset = [v, offset[1]];
      deck.setProps({ layers: layers() });
    });
    slider(bar, 'offset y', 0, 1, 0.05, 0, (v) => {
      offset = [offset[0], v];
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
