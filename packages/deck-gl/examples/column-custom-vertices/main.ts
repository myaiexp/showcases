// ColumnLayer: vertices swaps the regular polygon for a custom outline
import { Deck } from '@deck.gl/core';
import type { MapViewState, Position } from '@deck.gl/core';
import { ColumnLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { columnPoints } from '../../shared/core-layers-1-data.ts';
import type { SamplePoint } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

/** Offsets from the position, relative to the radius, going around once. */
function star(points: number): Position[] {
  const out: Position[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 ? 0.45 : 1;
    const a = (i / (points * 2)) * Math.PI * 2;
    out.push([Math.cos(a) * r, Math.sin(a) * r]);
  }
  return out;
}

const SHAPES: Record<string, Position[]> = {
  'star (5 points)': star(5),
  'star (8 points)': star(8),
  'arrow-head': [[1, 0], [-0.7, 0.8], [-0.3, 0], [-0.7, -0.8]],
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = columnPoints(ctx.preview ? 24 : 40, [2.35, 48.86], 0.1, 12);
  const view: MapViewState = { longitude: 2.35, latitude: 48.86, zoom: ctx.preview ? 8 : 9, pitch: 50 };

  const columns = (shape: string): ColumnLayer<SamplePoint> => {
    const vertices = SHAPES[shape]!;
    return new ColumnLayer<SamplePoint>({
      id: `columns-${shape}`,
      data,
      vertices,
      diskResolution: vertices.length, // must be at least the number of vertices
      radius: 2500,
      radiusUnits: 'meters',
      getPosition: (d) => d.position,
      getFillColor: (d) => [255, 120 + d.value * 120, 90 + d.value * 150],
      getElevation: (d) => (1 - d.value) * 6000,
    });
  };

  const names = Object.keys(SHAPES);
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), columns(names[0]!)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), columns(names[Math.floor(t / 2.5) % 3]!)], viewState: { ...view, bearing: t * 8 } }));
  } else {
    select(controlBar(el), 'vertices', names, (v) => deck.setProps({ layers: [landLayer(), columns(v)] }));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
