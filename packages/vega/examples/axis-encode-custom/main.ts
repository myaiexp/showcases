// encode blocks style each axis part; labels are interactive so they respond to hover
import type { Spec } from 'vega';
import { guideCentres, guideMount } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 360,
  height: 140,
  padding: { left: 10, right: 40, top: 10, bottom: 40 },
  scales: [
    { name: 'x', type: 'linear', domain: [-5000, 5000], range: 'width' },
    // The tick colour reads this scale by its position along the axis
    { name: 'hue', type: 'linear', domain: [0, 1], range: ['#4c9be8', '#f0a030'] },
  ],
  axes: [
    {
      orient: 'bottom',
      scale: 'x',
      title: 'x axis, every part styled',
      grid: true,
      tickCount: 8,
      encode: {
        // index runs 0 .. 1 over the ticks; datum.value and datum.label are also available
        ticks: { update: { stroke: { signal: "scale('hue', datum.index)" }, strokeWidth: { value: 3 } } },
        grid: { update: { stroke: { value: '#8899aa' }, strokeOpacity: { value: 0.35 }, strokeDash: { value: [3, 3] } } },
        labels: {
          interactive: true,
          update: {
            text: { signal: "format(datum.value, '+,')" },
            fill: { value: 'steelblue' },
            angle: { value: 50 },
            fontSize: { value: 13 },
            align: { value: 'left' },
            baseline: { value: 'middle' },
            dx: { value: 3 },
          },
          hover: { fill: { value: 'firebrick' }, fontSize: { value: 17 } },
        },
        title: { update: { fontSize: { value: 15 }, fill: { value: 'orange' } } },
        domain: { update: { stroke: { value: '#aab' }, strokeWidth: { value: 2 } } },
        axis: { update: { opacity: { value: 0.95 } } },
      },
    },
  ],
};
export default guideMount(spec, (stage, view) => {
  if (!stage.preview) return;
  const ghost = stage.ghost(view);
  stage.every(650, (i) => {
    const labels = guideCentres(view, 'axis-label');
    const at = labels[i % Math.max(labels.length, 1)];
    if (at) ghost.move(at[0], at[1]);
  });
});
