// controller.setState with the three anchor kinds on a free-mode chart
import { crosshair, defineChart, dot, mountChart } from '@tanstack/charts';
import { createChartCursor, cursorHost, type ChartCursorState } from '@tanstack/charts/cursor';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { scatter } from '../../shared/interact-data.ts';
import { reader } from '../../shared/interact-read.ts';
import { createStage } from '../../shared/stage.ts';

const rows = scatter(30, 2);
type State = ChartCursorState<number, number>;
const states: readonly (readonly [string, State])[] = [
  ['value', { anchor: 'value', value: { x: 70, y: 40 }, source: 'programmatic', pinned: true }],
  ['normalized', { anchor: 'normalized', normalized: { x: 0.25, y: 0.3 }, source: 'programmatic', pinned: true }],
  ['scene', { anchor: 'scene', scene: { x: 140, y: 60 }, source: 'programmatic', pinned: true }],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press each button: the crosshair lands in the same kind of space the state names.' });
  if (stage.preview) stage.height -= 52; // leaves room for the caption lines under the chart
  const show = reader(stage);
  const controller = createChartCursor<number, number>();

  const definition = defineChart({
    marks: [dot(rows, { x: 'x', y: 'y', r: 3, fillOpacity: 0.5 }), crosshair({ x: { label: true }, y: { label: true }, marker: true })],
    scales: { x: { scale: scaleLinear().domain([0, 100]) }, y: { scale: scaleLinear().domain([0, 100]), grid: true } },
    cursor: { use: cursorHost, controller, mode: 'free' },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Scatter with a programmatic cursor' }));

  const apply = ([name, state]: readonly [string, State]): void => {
    controller.setState(state);
    const { anchor, pinned, source } = state;
    const coords = anchor === 'value' ? state.value : anchor === 'normalized' ? state.normalized : state.scene;
    show(`anchor: '${anchor}'  (${name})\ncoordinates: ${JSON.stringify(coords)}\npinned: ${pinned}, source: ${source}`);
  };
  if (stage.bar) for (const s of states) button(stage.bar, `anchor: ${s[0]}`, () => apply(s));
  stage.cycle(states, 1800, apply, stage.preview);
  return () => stage.dispose();
};

export default mount;
