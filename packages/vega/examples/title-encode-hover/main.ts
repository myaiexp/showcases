// Nested encode blocks reach the group, title and subtitle marks separately
import type { Spec } from 'vega';
import { guideCentres, guideMount } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 320,
  height: 100,
  padding: 8,
  title: {
    text: 'Styled through encode',
    subtitle: 'hover this line',
    anchor: 'start',
    encode: {
      group: { update: { fill: { value: '#262a33' }, stroke: { value: '#667' }, cornerRadius: { value: 6 } } },
      title: {
        interactive: true,
        enter: { fill: { value: 'orange' }, fontSize: { value: 22 } },
        hover: { fill: { value: '#fff' } },
      },
      subtitle: {
        interactive: true,
        update: { fontStyle: { value: 'italic' }, fill: { value: '#9ab' }, fontSize: { value: 14 } },
        hover: { fontStyle: { value: 'normal' }, fill: { value: 'steelblue' } },
      },
    },
  },
  scales: [
    { name: 'x', type: 'linear', domain: [0, 10], range: 'width' },
    { name: 'y', type: 'linear', domain: [-1, 1], range: 'height' },
  ],
  data: [{ name: 'rows', values: Array.from({ length: 41 }, (_, i) => ({ t: i / 4, v: Math.sin(i / 3) })) }],
  axes: [{ orient: 'bottom', scale: 'x' }],
  marks: [
    {
      type: 'line',
      from: { data: 'rows' },
      encode: { enter: { x: { scale: 'x', field: 't' }, y: { scale: 'y', field: 'v' }, stroke: { value: 'steelblue' }, strokeWidth: { value: 2 } } },
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  if (!stage.preview) return;
  const ghost = stage.ghost(view);
  stage.every(1000, (i) => {
    const spots = [...guideCentres(view, 'title-text'), ...guideCentres(view, 'title-subtitle')];
    const at = spots[i % (spots.length + 1)];
    if (at) ghost.move(at[0], at[1]);
    else ghost.out();
  });
});
