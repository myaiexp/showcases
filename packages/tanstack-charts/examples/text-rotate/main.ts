// text rotate and fontWeight: labels turned around their origin, and sized by a constant
import { defineChart, mountChart, text } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const words = [
  ['alpha', 12], ['bravo', 30], ['charlie', 22], ['delta', 41], ['echo', 17], ['foxtrot', 35], ['golf', 26],
].map(([word, n]) => ({ word: word as string, n: n as number }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  let angle = -45;

  const build = () =>
    defineChart({
      marks: [
        text(words, {
          x: 'word',
          y: 'n',
          text: (w) => `${w.word} ${w.n}`,
          key: 'word',
          rotate: angle,
          anchor: 'start',
          fontSize: 13,
          fontWeight: 600,
          fill: '#a78bfa',
        }),
      ],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.2) },
        y: { scale: scaleLinear().domain([0, 50]), grid: true },
      },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Rotated text labels' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`rotate ${angle} degrees around each label's origin`);
  };
  refresh();
  if (stage.bar) slider(stage.bar, 'rotate', -90, 90, 5, angle, (x) => { angle = x; refresh(); }, (x) => `${x} deg`);
  else stage.cycle([-45, 0, 45, -90], 1500, (a) => { angle = a; refresh(); });
  return () => stage.dispose();
};

export default mount;
