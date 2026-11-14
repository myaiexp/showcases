// FillStyleExtension fillPatternSizeUnits: tiles that zoom with the map or not
import { Deck } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';
import { FillStyleExtension, type FillStyleExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { blobs, EU_VIEW, type Blob } from '../../shared/extensions-data.ts';
import { PATTERN_MAPPING, patternAtlas } from '../../shared/extensions-atlas.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const UNITS = ['meters', 'pixels', 'common'] as const;
type Units = (typeof UNITS)[number];
// getFillPatternScale per unit, so a tile starts at a similar size on screen
const SCALE: Record<Units, number> = { meters: 1500, pixels: 1, common: 0.045 };

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = blobs(ctx.preview ? 10 : 16, 7);
  const atlas = patternAtlas(true);
  let units: Units = 'meters';

  const layers = () => [
    landLayer(),
    new PolygonLayer<Blob, FillStyleExtensionProps<Blob>>({
      id: 'areas',
      data,
      getPolygon: (d) => d.polygon,
      getFillColor: [255, 170, 70, 255],
      fillPatternAtlas: atlas,
      fillPatternMapping: PATTERN_MAPPING,
      getFillPattern: () => 'checks',
      // meters: tiles are on the ground and zoom with it. pixels: constant screen size.
      // common: deck.gl's common space units.
      fillPatternSizeUnits: units,
      getFillPatternScale: SCALE[units],
      getFillPatternBackgroundColor: [20, 28, 40, 255],
      stroked: false,
      extensions: [new FillStyleExtension({ pattern: true })],
      updateTriggers: { getFillPatternScale: units },
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
      units = UNITS[Math.floor(t / 4) % 2]!;
      deck.setProps({ viewState: { ...EU_VIEW, zoom: 3.4 + 0.8 * Math.sin(t * 0.8) }, layers: layers() });
    });
  } else {
    const bar = controlBar(el);
    readout(el, 'Zoom the map: meters tiles scale with the ground, pixels tiles keep their screen size.');
    select(bar, 'fillPatternSizeUnits', UNITS, (v) => {
      units = v;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
