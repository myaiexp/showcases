// violinY span and stroke options
import { defineChart, mountChart, violinY } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { groupedObservations } from '../../shared/marks1-data.ts';
import { boundaries, profilesY } from '../../shared/marks1-profiles.ts';
import { createStage } from '../../shared/stage.ts';

const groups = ['A', 'B', 'C', 'D'];
const rows = groupedObservations({ A: [40, 8, 150], B: [55, 12, 150], C: [48, 6, 150], D: [62, 10, 150] }, 24);
const data = profilesY(rows, boundaries(10, 100, 4));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  let span = 0.8;
  let outline = true;

  const chart = () =>
    defineChart({
      svgAnimation: true,
      marks: [violinY(data, { x: 'group', y: 'position', width: 'height', span, color: 'group', fillOpacity: 0.5, stroke: outline ? undefined : null })],
      scales: {
        x: { scale: scalePoint<string>().domain(groups).padding(0.5) },
        y: { scale: scaleLinear().domain([10, 100]), grid: true },
      },
    });

  const options = { definition: chart(), height: stage.height, initialWidth: 640, ariaLabel: 'Violins with adjustable span' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (s: number, o: boolean): void => {
    span = s;
    outline = o;
    host.update({ ...options, definition: chart() });
    stage.say(`span: ${s}, outline: ${o}`);
  };

  if (stage.bar) {
    slider(stage.bar, 'span', 0.2, 1.6, 0.05, 0.8, (v) => show(v, outline));
    checkbox(stage.bar, 'outline', true, (v) => show(span, v));
    stage.say('span: 0.8, outline: true');
  } else stage.cycle([[0.4, true], [0.8, true], [1.4, true], [0.8, false]] as const, 1700, ([s, o]) => show(s, o));
  return () => stage.dispose();
};

export default mount;
