// A5Layer ids as bigint or hex string; click selects a cell and its gridDisk neighbours
import { Deck } from '@deck.gl/core';
import type { PickingInfo } from '@deck.gl/core';
import { A5Layer } from '@deck.gl/geo-layers';
import { cellToChildren, getRes0Cells, gridDisk, u64ToHex } from 'a5-js';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout } from '../../shared/controls.ts';
import { a5CellAt } from '../../shared/geo-layers-cells.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const RES = 3;
// Every resolution-3 cell of the globe: res-0 cells split into children.
const cells: bigint[] = [...getRes0Cells()].flatMap((c) => cellToChildren(c, RES));

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view = { longitude: 10, latitude: 30, zoom: ctx.preview ? 0.2 : 1 };
  let selected = a5CellAt([2.35, 48.86], RES);
  let ring = new Set(gridDisk(selected, 1));
  let asHex = false;

  const layer = (): A5Layer<bigint> =>
    new A5Layer<bigint>({
      id: 'a5',
      data: cells,
      // The same cell either way: bigint, or the base-16 string of its 64 bits.
      getPentagon: (d) => (asHex ? u64ToHex(d) : d),
      getFillColor: (d) => (d === selected ? [255, 190, 70, 240] : ring.has(d) ? [90, 210, 255, 200] : [60, 90, 140, 90]),
      getLineColor: [255, 255, 255, 90],
      lineWidthMinPixels: 1,
      stroked: true,
      pickable: !ctx.preview,
      updateTriggers: { getPentagon: [asHex], getFillColor: [selected] },
    });

  const info = ctx.preview ? null : readout(el, 'Click a cell.');
  const pick = (cell: bigint): void => {
    selected = cell;
    ring = new Set(gridDisk(cell, 1));
    deck.setProps({ layers: [landLayer(), layer()] });
    if (info) info.textContent = `id 0x${u64ToHex(cell)}  ${ring.size - 1} neighbours`;
  };
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), layer()],
    onClick: ({ object }: PickingInfo<bigint>) => object !== undefined && object !== null && pick(object),
  });

  let k = 0;
  const timer = ctx.preview
    ? setInterval(() => {
        pick(cells[(k += 37) % cells.length]!);
      }, 1500)
    : 0;
  const stop = ctx.preview ? animate((t) => deck.setProps({ viewState: { ...view, longitude: ((10 + t * 8 + 180) % 360) - 180 } })) : () => {};
  if (!ctx.preview) check(controlBar(el), 'ids as hex strings', asHex, (v) => ((asHex = v), deck.setProps({ layers: [landLayer(), layer()] })));
  return () => {
    clearInterval(timer);
    stop();
    stage.release(deck);
  };
};

export default mount;
