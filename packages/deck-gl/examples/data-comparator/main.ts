// dataComparator: a rebuilt but equal data array skips the attribute recalculation
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, check, controlBar, readout } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const BASE = pointCloud(300, { seed: 12, spread: 2 });

/** Called with (newData, oldData); true means equal, so no attribute update. */
function sameRows(next: unknown, prev?: unknown): boolean {
  const a = next as SamplePoint[]; // typed unknown by the prop's generic signature
  const b = prev as SamplePoint[] | undefined;
  return !!b && a.length === b.length && a.every((p, i) => p.cluster === b[i]!.cluster && p.position[0] === b[i]!.position[0]);
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 3 : 4 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  let compare = true;
  let calls = 0;
  let ticks = 0;
  let tint = 0;

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<SamplePoint>({
      id: 'points',
      // A new array with equal content on every call, as a polling app would produce.
      data: BASE.map((p) => ({ ...p })).map((p, i) => (i === 0 ? { ...p, cluster: tint } : p)),
      ...(compare ? { dataComparator: sameRows } : {}),
      getPosition: (d) => d.position,
      getFillColor: (d) => {
        calls += 1;
        return [90 + d.cluster * 50, 180, 255 - d.cluster * 50, 220];
      },
      getRadius: 6,
      radiusUnits: 'pixels',
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: layers(),
    onAfterRender: () => {
      label.textContent = `${ticks} updates, getFillColor called ${calls} times, comparator ${compare ? 'on' : 'off'}`;
    },
  });
  const tick = (): void => {
    ticks += 1;
    deck.setProps({ layers: layers() });
  };

  const timer = window.setInterval(tick, ctx.preview ? 700 : 900);
  let flip = 0;
  if (ctx.preview) {
    // Flip the comparator now and then so the counter shows both behaviours.
    flip = window.setInterval(() => (compare = !compare), 3000);
  } else {
    const bar = controlBar(el);
    check(bar, 'dataComparator', true, (v) => (compare = v));
    button(bar, 'Change one point', () => {
      tint = (tint + 1) % 4;
      tick();
    });
  }
  return () => {
    clearInterval(timer);
    clearInterval(flip);
    stage.release(deck);
  };
};

export default mount;
