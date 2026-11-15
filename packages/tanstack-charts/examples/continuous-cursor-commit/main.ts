// continuousCursor: store only commit and clear proposals; previews stay inside the host
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { continuousCursor, type ContinuousCursorChange, type ContinuousCursorPosition } from '@tanstack/charts/interaction/cursor';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { visit } from '../../shared/interact-drive.ts';
import { signal } from '../../shared/interact-data.ts';
import { reader } from '../../shared/interact-read.ts';
import { createStage } from '../../shared/stage.ts';

type Position = ContinuousCursorPosition<number, number>;
type Change = ContinuousCursorChange<number, number>;
const rows = signal(40, 5);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click to pin the cursor, click again or press Escape to clear it.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  const show = reader(stage);
  let position: Position | null = null;
  show('accepted position: null');

  const build = () =>
    defineChart({
      marks: [lineY(rows, { x: 't', y: 'value', key: 'id' })],
      scales: {
        x: { scale: scaleLinear().domain([0, 39]), axis: { label: 't' } },
        y: { scale: scaleLinear().domain([20, 80]), grid: true, axis: { label: 'value' } },
      },
      controls: [
        continuousCursor({
          position: controlledSignal<Position | null, Change>(position, (next, { reason }) => {
            if (reason.type !== 'commit' && reason.type !== 'clear') return;
            position = next;
            show(`${reason.type} (${reason.source}, ${reason.cause}) -> accepted ${next ? `${next.x.toFixed(1)}, ${next.y.toFixed(1)}` : 'null'}`);
            host.update(options());
          }),
          xLabel: { background: '#334155', color: '#f8fafc', format: (v) => v.toFixed(1) },
          yLabel: { background: '#334155', color: '#f8fafc', format: (v) => v.toFixed(1) },
        }),
      ],
    });
  const options = () => ({ definition: build(), height: stage.height, initialWidth: 640, ariaLabel: 'A signal with a pinnable continuous cursor' });
  const host = stage.own(mountChart(stage.box, options()));

  if (stage.preview) visit(stage, [[0.3, 0.4], [0.3, 0.4], [0.7, 0.55], [0.7, 0.55]], 1300, { target: () => stage.box.querySelector('[data-chart-cursor]'), click: () => true });
  return () => stage.dispose();
};

export default mount;
