// PathLayer widths in meters, common units or pixels, with min/max pixel limits
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PathLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, check, controlBar, readout, select, slider } from '../../shared/controls.ts';
import { HOME, waveLines, type Line } from '../../shared/core-layers-geometry.ts';
import { animate, createStage } from '../../shared/stage.ts';

type Units = 'meters' | 'common' | 'pixels';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: HOME[0], latitude: HOME[1], zoom: 12.4 };
  const data = waveLines(5, 0.01);
  const state = { widthUnits: 'meters' as Units, widthScale: 1, widthMinPixels: 0, widthMaxPixels: 40 };

  const build = (width: number): PathLayer<Line> =>
    new PathLayer<Line>({
      id: 'lines',
      data,
      getPath: (d) => d.path,
      getColor: (d) => d.color,
      // The accessor is a plain number; widthUnits decides what it measures.
      getWidth: width,
      widthUnits: state.widthUnits,
      widthScale: state.widthScale,
      widthMinPixels: state.widthMinPixels,
      widthMaxPixels: state.widthMaxPixels,
    });
  // Metres and pixels need different magnitudes to look alike, so the width follows the unit.
  const widthFor = (u: Units): number => (u === 'pixels' ? 6 : u === 'meters' ? 50 : 0.5);
  const update = (): void => deck.setProps({ layers: [build(widthFor(state.widthUnits))] });

  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: [build(widthFor('meters'))],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    // Zoom in and out: meters and common widths scale with the map, pixels stay put.
    const units: Units[] = ['meters', 'pixels'];
    stop = animate((t) => {
      state.widthUnits = units[Math.floor(t / 3) % 2]!;
      deck.setProps({
        viewState: { ...INITIAL_VIEW_STATE, zoom: 12.4 + Math.sin(t * 1.2) * 1.2 },
        layers: [build(widthFor(state.widthUnits))],
      });
    });
  } else {
    const bar = controlBar(el);
    const note = readout(el, 'Zoom the map: meters and common widths scale with it, pixels do not.');
    select(bar, 'widthUnits', ['meters', 'common', 'pixels'] as const, (v) => { state.widthUnits = v; update(); }, 'meters');
    slider(bar, 'widthScale', 0.2, 4, 0.1, 1, (v) => { state.widthScale = v; update(); });
    slider(bar, 'widthMinPixels', 0, 20, 1, 0, (v) => { state.widthMinPixels = v; update(); });
    slider(bar, 'widthMaxPixels', 2, 60, 1, 40, (v) => { state.widthMaxPixels = v; update(); });
    check(bar, 'limits off', false, (v) => { state.widthMaxPixels = v ? Number.MAX_SAFE_INTEGER : 40; update(); note.textContent = `widthMaxPixels ${state.widthMaxPixels}`; });
    button(bar, 'Reset view', () => deck.setProps({ initialViewState: { ...INITIAL_VIEW_STATE } }));
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
