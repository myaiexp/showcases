// encode blocks reach each mark a legend is made of
import type { Spec } from 'vega';
import { guideMount } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 220,
  height: 120,
  padding: 8,
  signals: [{ name: 'hue', value: 200 }],
  scales: [
    { name: 'c', type: 'ordinal', domain: ['Alpha', 'Beta', 'Gamma'], range: ['steelblue', 'orange', '#7ac47a'] },
    { name: 'heat', type: 'linear', domain: [0, 10], range: ['#223355', '#ffcc66'] },
  ],
  legends: [
    {
      fill: 'c',
      orient: 'right',
      title: 'custom symbols',
      padding: 8,
      encode: {
        legend: { update: { stroke: { signal: "hsl(hue, 0.6, 0.6)" }, strokeWidth: { value: 2 }, cornerRadius: { value: 8 }, fill: { value: '#262a33' } } },
        title: { update: { fontSize: { value: 14 }, fill: { signal: "hsl(hue, 0.7, 0.7)" } } },
        labels: { update: { fontSize: { value: 13 }, fontStyle: { value: 'italic' }, fill: { value: '#ddd' } } },
        symbols: { update: { shape: { value: 'diamond' }, size: { value: 160 }, strokeWidth: { value: 2 }, stroke: { value: '#222' } } },
        // entries are the group around each symbol + label pair
        entries: { update: { opacity: { signal: 'datum.index === 1 ? 0.55 : 1' } } },
      },
    },
    {
      fill: 'heat',
      orient: 'right',
      type: 'gradient',
      title: 'custom gradient',
      gradientLength: 100,
      encode: {
        gradient: { update: { stroke: { signal: "hsl(hue, 0.6, 0.6)" }, strokeWidth: { value: 3 }, cornerRadius: { value: 6 } } },
        labels: { update: { fill: { signal: "hsl(hue, 0.7, 0.7)" } } },
      },
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  if (!stage.preview) return;
  stage.every(120, (i) => view.signal('hue', (i * 9) % 360).runAsync().then(() => undefined));
});
