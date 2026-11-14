// positionFormat: flat coordinate arrays read as XY pairs or XYZ triples
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PathLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { seeded } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Ribbon {
  /** A flat array of x, y pairs: longitude then latitude, no altitude. */
  path: number[];
}

/** Twelve ribbons that wiggle across Europe, as flat longitude/latitude pairs. */
function ribbons(): Ribbon[] {
  const rand = seeded(2);
  return Array.from({ length: 12 }, (_, i) => {
    const path: number[] = [];
    for (let s = 0; s <= 24; s++) path.push(-8 + s * 1.2, 36 + i * 1.7 + Math.sin(s * 0.4 + i) * 1.1 + rand() * 0.2);
    return { path };
  });
}
const DATA = ribbons();

type Format = 'XY' | 'XYZ';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 46, zoom: ctx.preview ? 2.6 : 3.4 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  let format: Format = 'XY';

  const layers = () => [
    landLayer(),
    new PathLayer<Ribbon>({
      id: 'ribbons',
      data: DATA,
      getPath: (d) => d.path,
      // The data holds two numbers per vertex. 'XY' reads them that way; 'XYZ' (the default)
      // reads three, so the vertices are regrouped and the lines scramble.
      positionFormat: format,
      getColor: [255, 190, 90],
      getWidth: 3,
      widthUnits: 'pixels',
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });
  const apply = (): void => {
    deck.setProps({ layers: layers() });
    label.textContent = `positionFormat: '${format}', 2 numbers per vertex in the data`;
  };
  label.textContent = `positionFormat: '${format}', 2 numbers per vertex in the data`;

  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(() => {
      format = format === 'XY' ? 'XYZ' : 'XY';
      apply();
    }, 1800);
  } else {
    select(controlBar(el), 'positionFormat', ['XY', 'XYZ'] as const, (v) => {
      format = v;
      apply();
    }, format);
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
