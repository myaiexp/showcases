// animationAppear.point { type: 'rotateIn', options: { orient, angle } } on star-shaped points
import type { Mount } from '@/types.ts';
import { mountReplay } from '../../shared/anim-data.ts';
import { walk } from '../../shared/components-data.ts';
import { select, slider } from '../../shared/chart.ts';

interface State {
  orient: 'clockwise' | 'anticlockwise';
  turns: number;
}

const mount: Mount = (el, ctx) =>
  mountReplay<State>(el, ctx, {
    initial: { orient: 'clockwise', turns: 2 },
    period: 3400,
    build: ({ orient, turns }, preview) => ({
      type: 'line',
      data: [{ id: 'walk', values: walk(8, 17) }],
      xField: 'x',
      yField: 'y',
      title: { visible: true, text: `rotateIn ${orient}, ${turns} turns`, textStyle: { fontSize: preview ? 12 : 16 } },
      point: { style: { shape: 'star', size: preview ? 16 : 22 } },
      animationAppear: {
        point: { type: 'rotateIn', options: { orient, angle: turns * Math.PI * 2 }, duration: 1600, easing: 'cubicOut' },
        line: { duration: 1200 },
      },
    }),
    step: (_s, i) => ({ orient: i % 2 ? 'anticlockwise' : 'clockwise', turns: 1 + (i % 3) }),
    controls: (bar, set) => {
      select(bar, 'orient', ['clockwise', 'anticlockwise'], (v) => set({ orient: v as State['orient'] }));
      slider(bar, 'turns', [0, 4, 1], 2, (turns) => set({ turns }));
    },
  });

export default mount;
