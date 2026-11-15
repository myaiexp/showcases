// radialText: labels placed by angle and radius, with anchor 'outside', radiusOffset and rotation
import { defineChart, mountChart } from '@tanstack/charts';
import { polar, radialDot, radialText } from '@tanstack/charts/polar';
import { scaleLinear } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const hours = Array.from({ length: 12 }, (_, i) => ({ hour: i, label: i === 0 ? '12' : String(i) }));
type Anchor = 'outside' | 'middle' | 'start';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const v = { anchor: 'outside' as Anchor, offset: 14, rotate: false };

  const build = () =>
    defineChart({
      marks: [
        polar({
          radiusRatio: 0.8,
          marks: [
            radialDot(hours, { angle: 'hour', radius: 1, r: 3, fill: '#94a3b8' }),
            radialText(hours, {
              angle: 'hour',
              radius: 1,
              text: 'label',
              anchor: v.anchor,
              // A signed pixel offset applied after the radius is mapped; it never changes the domain.
              radiusOffset: v.offset,
              ...(v.rotate ? { rotate: (d: { hour: number }) => d.hour * 30 } : {}),
              fontSize: 14,
              baseline: 'middle',
            }),
          ],
          scales: {
            angle: { scale: scaleLinear().domain([0, 12]) },
            radius: { scale: scaleLinear().domain([0, 1]) },
          },
        }),
      ],
      scales: { x: null, y: null },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Clock face numerals' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`anchor '${v.anchor}', radiusOffset ${v.offset}px${v.rotate ? ', rotated with the angle' : ''}`);
  };
  refresh();
  if (stage.bar) {
    select(stage.bar, 'anchor', [['outside', 'outside (auto)'], ['middle', 'middle'], ['start', 'start']] as const, (a) => { v.anchor = a; refresh(); });
    slider(stage.bar, 'radiusOffset', -30, 40, 2, v.offset, (x) => { v.offset = x; refresh(); }, (x) => `${x}px`);
  } else {
    stage.cycle([['outside', 14, false], ['middle', 0, false], ['outside', 30, true], ['start', 8, false]] as const, 1700, ([a, o, r]) => { v.anchor = a; v.offset = o; v.rotate = r; refresh(); });
  }
  return () => stage.dispose();
};

export default mount;
