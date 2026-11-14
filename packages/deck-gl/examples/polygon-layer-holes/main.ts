// PolygonLayer holes: an array of rings, or a flat {positions, holeIndices} object
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { HOME, ngon, PALETTE, type Rgb } from '../../shared/core-layers-geometry.ts';
import type { LngLat } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';

type Format = 'array of rings' | 'flat positions + holeIndices';

interface Shape {
  color: Rgb;
  outer: LngLat[];
  hole: LngLat[];
}

/** Three outlines each with one hole: a hexagon, a star and a circle. */
function shapes(): Shape[] {
  const at = (i: number): LngLat => [HOME[0] + (i - 1) * 0.042, HOME[1]];
  return [
    { color: PALETTE[4]!, outer: ngon(at(0), 0.014, 6), hole: ngon(at(0), 0.007, 4, 0.3) },
    { color: PALETTE[1]!, outer: ngon(at(1), 0.016, 7, 0, 0.5), hole: ngon(at(1), 0.005, 12) },
    { color: PALETTE[3]!, outer: ngon(at(2), 0.014, 40), hole: ngon(at(2), 0.008, 3, 1) },
  ];
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: HOME[0], latitude: HOME[1], zoom: ctx.preview ? 11.5 : 12.1 };
  const data = shapes();
  let format: Format = 'array of rings';

  const build = (): PolygonLayer<Shape> =>
    format === 'array of rings'
      ? new PolygonLayer<Shape>({
          id: 'holes',
          data,
          // The first ring is the outer boundary, every following ring is a hole (GeoJSON style).
          getPolygon: (d) => [d.outer, d.hole],
          getFillColor: (d) => [...d.color, 190],
          getLineColor: [255, 255, 255],
          getLineWidth: 3,
          lineWidthUnits: 'pixels',
        })
      : new PolygonLayer<Shape>({
          id: 'holes',
          data,
          // One flat array of x, y pairs; holeIndices gives the array index where each hole starts.
          positionFormat: 'XY',
          getPolygon: (d) => ({ positions: [...d.outer, ...d.hole].flat(), holeIndices: [d.outer.length * 2] }),
          getFillColor: (d) => [...d.color, 190],
          getLineColor: [255, 255, 255],
          getLineWidth: 3,
          lineWidthUnits: 'pixels',
        });
  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: [build()],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      format = Math.floor(t / 2.5) % 2 === 0 ? 'array of rings' : 'flat positions + holeIndices';
      deck.setProps({ layers: [build()] });
    });
  } else {
    const bar = controlBar(el);
    const info = readout(el, 'Both formats draw the same polygons with the same holes.');
    select(bar, 'getPolygon returns', ['array of rings', 'flat positions + holeIndices'] as const, (v) => {
      format = v;
      deck.setProps({ layers: [build()] });
      info.textContent = v === 'array of rings' ? '[outerRing, holeRing]' : '{ positions: [x0, y0, x1, y1, ...], holeIndices: [index of the hole\'s first number] }';
    }, 'array of rings');
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
