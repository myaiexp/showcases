// OrthographicView zoomX and zoomY stretch the axes independently; zoom sizes common-unit shapes
import { COORDINATE_SYSTEM, Deck, OrthographicView } from '@deck.gl/core';
import type { OrthographicViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout, slider } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';

interface Dot {
  position: [number, number];
}
/** An 11 x 11 grid, 40 units apart, centred on the origin. */
const GRID: Dot[] = Array.from({ length: 121 }, (_, i) => ({ position: [((i % 11) - 5) * 40, (Math.floor(i / 11) - 5) * 40] }));

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0d1117' });
  const state = { zoomX: 0, zoomY: 0, sizeZoom: false };
  const label = ctx.preview ? null : readout(el);

  const viewState = (): OrthographicViewState => ({
    target: [0, 0, 0],
    zoomX: state.zoomX,
    zoomY: state.zoomY,
    // Positions use zoomX and zoomY. Sizes in common units use the smaller of the two,
    // unless `zoom` is also supplied: it is shadowed for positions but used for sizes.
    ...(state.sizeZoom ? { zoom: 0.5 } : {}),
  });
  const show = (): void => {
    deck.setProps({ viewState: viewState() });
    if (label) label.textContent = `zoomX: ${state.zoomX}   zoomY: ${state.zoomY}${state.sizeZoom ? '   zoom: 0.5 (sizes)' : ''}`;
  };

  const deck = new Deck({
    device: stage.device,
    views: new OrthographicView({ id: 'plane' }),
    viewState: viewState(),
    layers: [
      new ScatterplotLayer<Dot>({
        id: 'grid',
        data: GRID,
        coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
        getPosition: (d) => d.position,
        getRadius: 12,
        radiusUnits: 'common',
        getFillColor: (d) => (d.position[0] === 0 && d.position[1] === 0 ? [255, 120, 100] : [110, 170, 255]),
      }),
    ],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      state.zoomX = Math.sin(t * 0.7) * 0.8 - 0.4;
      state.zoomY = Math.cos(t * 0.5) * 0.8 - 0.4;
      show();
    });
  } else {
    const bar = controlBar(el);
    slider(bar, 'zoomX', -1.5, 1.5, 0.05, 0, (v) => { state.zoomX = v; show(); });
    slider(bar, 'zoomY', -1.5, 1.5, 0.05, 0, (v) => { state.zoomY = v; show(); });
    check(bar, 'also set zoom (sizes follow it)', false, (v) => { state.sizeZoom = v; show(); });
    show();
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
