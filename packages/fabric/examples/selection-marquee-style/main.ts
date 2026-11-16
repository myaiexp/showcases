// Selection: selectionColor, border, line width and dashes style the marquee
import { Canvas } from 'fabric';
import type { Mount } from '@/types.ts';
import { color, select, slider } from '../../shared/controls.ts';
import { trio } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const STYLES = [
  { color: 'rgba(100, 100, 255, 0.3)', border: 'rgba(255, 255, 255, 0.3)', width: 1, dash: [] as number[] },
  { color: 'rgba(233, 75, 60, 0.18)', border: '#e94b3c', width: 2, dash: [8, 4] },
  { color: 'rgba(46, 158, 91, 0.2)', border: '#1d6b3c', width: 3, dash: [2, 5] },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [360, 240], hint: 'Drag on empty space to draw the selection marquee, then change how it looks.' });
  const canvas = stage.own(new Canvas(stage.el));
  canvas.add(...trio().all);
  const say = status(stage);

  // the marquee is drawn from these four properties
  const apply = (s: (typeof STYLES)[number]): void => {
    canvas.selectionColor = s.color;
    canvas.selectionBorderColor = s.border;
    canvas.selectionLineWidth = s.width;
    canvas.selectionDashArray = s.dash;
  };
  const report = (): void =>
    say(`color ${canvas.selectionColor}\nborder ${canvas.selectionBorderColor} · ${canvas.selectionLineWidth}px · dash [${canvas.selectionDashArray.join(', ')}]`);
  apply(STYLES[1]!);
  report();

  if (stage.bar) {
    const hex = (c: string): string => (c.startsWith('#') ? c : '#6464ff');
    color(stage.bar, 'selectionColor', '#6464ff', (v) => {
      // an rgba string keeps the fill see-through
      const n = parseInt(v.slice(1), 16);
      canvas.selectionColor = `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, 0.25)`;
      report();
    });
    color(stage.bar, 'selectionBorderColor', hex(STYLES[1]!.border), (v) => ((canvas.selectionBorderColor = v), report()));
    slider(stage.bar, 'selectionLineWidth', 1, 8, 1, 2, (v) => ((canvas.selectionLineWidth = v), report()), (v) => `${v}px`);
    select(stage.bar, 'selectionDashArray', ['solid', '8 4', '2 5', '12 3 2 3'], (v) => ((canvas.selectionDashArray = v === 'solid' ? [] : v.split(' ').map(Number)), report()), '8 4');
  } else {
    const ghost = stage.ghost(canvas);
    let i = 1;
    stage.repeat(async () => {
      apply(STYLES[i++ % STYLES.length]!);
      report();
      await ghost.move({ x: 25, y: 35 }, 300);
      await ghost.dragTo({ x: 330, y: 170 }, 1800);
      await stage.wait(300);
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }, 200);
  }

  return stage.dispose;
};

export default mount;
