// padding and align on a point or band position scale
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const marks = ['tickX (point)', 'cell (band)'] as const;
type Kind = (typeof marks)[number];
interface State {
  kind: Kind;
  padding: number;
  align: number;
}

const mount: Mount = (el, ctx) =>
  mountPlot<State>(el, ctx, {
    initial: { kind: marks[0], padding: 0.1, align: 0.5 },
    render: ({ kind, padding, align }, { width, height }) =>
      Plot.plot({
        width,
        height,
        grid: true,
        marginTop: 0.5,
        x: { padding, align, round: false },
        marks: [
          Plot.frame({ strokeOpacity: 0.3 }),
          kind === marks[0]
            ? Plot.tickX('ABCDEFGHIJ', { x: Plot.identity, stroke: 'currentColor' })
            : Plot.cell('ABCDEFGHIJ', { x: Plot.identity, stroke: 'currentColor' }),
        ],
      }),
    step: (_s, i) => ({ kind: marks[Math.floor(i / 4) % 2], padding: [0.1, 0.5, 0.9, 0.3][i % 4], align: [0.5, 0, 1, 0.5][i % 4] }),
    previewMs: 1400,
    controls: (bar, live) => {
      select(bar, 'mark ', marks, live.state.kind, (kind) => live.set({ kind }));
      slider(bar, 'padding ', [0, 1, 0.01], live.state.padding, (padding) => live.set({ padding }));
      slider(bar, 'align ', [0, 1, 0.01], live.state.align, (align) => live.set({ align }));
    },
  });

export default mount;
