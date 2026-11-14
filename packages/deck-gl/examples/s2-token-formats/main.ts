// S2Layer: the same cells named by hex token or by Hilbert quad key
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { S2Layer } from '@deck.gl/geo-layers';
import type { Mount } from '@/types.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { heat, s2Key, s2Token } from '../../shared/geo-layers-cells.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Cell {
  face: number;
  digits: string;
  /** 0..1 position along the Hilbert curve within the face. */
  order: number;
}

/** Every cell of `level` on the given faces; digits count in base 4, which is the curve order. */
function cellsAt(faces: number[], level: number): Cell[] {
  const n = 4 ** level;
  const out: Cell[] = [];
  for (const face of faces) {
    for (let i = 0; i < n; i++) out.push({ face, digits: i.toString(4).padStart(level, '0'), order: i / n });
  }
  return out;
}

type Format = 'hex token' | 'quad key';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 40, latitude: 20, zoom: ctx.preview ? 0.4 : 1.2 };

  const cells = (level: number, format: Format): S2Layer<Cell> =>
    new S2Layer<Cell>({
      id: 's2',
      data: cellsAt([0, 1], level),
      // Either string names the same cell: "0/0123" or its hex token.
      getS2Token: (d) => (format === 'hex token' ? s2Token(d.face, d.digits) : s2Key(d.face, d.digits)),
      getFillColor: (d) => [...heat(d.order), 150],
      getLineColor: [255, 255, 255, 120],
      stroked: true,
      lineWidthMinPixels: 1,
      pickable: !ctx.preview,
      updateTriggers: { getS2Token: [format] },
    });
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), cells(3, 'hex token')],
    getTooltip: ({ object }: { object?: Cell }) => (object ? `${s2Key(object.face, object.digits)}\ntoken ${s2Token(object.face, object.digits)}` : null),
  });

  let level = 3;
  let format: Format = 'hex token';
  const refresh = (): void => deck.setProps({ layers: [landLayer(), cells(level, format)] });
  let timer = 0;
  let stop: () => void = () => {};
  if (ctx.preview) {
    timer = window.setInterval(() => {
      level = level === 4 ? 2 : level + 1;
      refresh();
    }, 2000);
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: 40 + Math.sin(t * 0.3) * 40 } }));
  } else {
    const bar = controlBar(el);
    slider(bar, 'level', 1, 5, 1, level, (v) => ((level = v), refresh()));
    select(bar, 'getS2Token returns a', ['hex token', 'quad key'] as const, (v) => ((format = v), refresh()), format);
  }
  return () => {
    clearInterval(timer);
    stop();
    stage.release(deck);
  };
};

export default mount;
