// Correlation centerPoint / ripplePoint / nodePoint styling and the label position
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, relatedWords } from '../../shared/flow-data.ts';

const THEMES: Record<string, { node: string; ripple: string; center: string }> = {
  amber: { node: '#ffa940', ripple: '#ffa940', center: '#d46b08' },
  mint: { node: '#5cdbd3', ripple: '#36cfc9', center: '#08979c' },
  violet: { node: '#b37feb', ripple: '#9254de', center: '#531dab' },
};
const NAMES = Object.keys(THEMES);
const POSITIONS = ['bottom', 'top', 'right', 'center'] as const;

const mount: Mount = (el, ctx) =>
  mountLive<{ theme: string; position: string }>(el, ctx, {
    initial: { theme: 'amber', position: 'bottom' },
    build: ({ theme, position }, preview) => {
      const t = THEMES[theme] as { node: string; ripple: string; center: string };
      return asSpec({
        type: 'correlation',
        data: [{ id: 'data', values: relatedWords() }],
        categoryField: 'word',
        valueField: 'sim',
        sizeField: 'pv',
        sizeRange: preview ? [6, 16] : [12, 30],
        innerRadius: '25%',
        outerRadius: '90%',
        nodePoint: { style: { fill: t.node, fillOpacity: 0.8 }, state: { hover: { lineWidth: 8, strokeOpacity: 0.2, stroke: t.node } } },
        ripplePoint: { style: { fill: t.ripple, fillOpacity: 0.25 } },
        centerPoint: { style: { fill: t.center }, state: { hover: { lineWidth: 8, strokeOpacity: 0.2, stroke: t.center } } },
        centerLabel: { visible: true, position: 'center', style: { fill: '#fff', text: 'coffee', fontSize: preview ? 10 : 14 } },
        label: { visible: !preview, position, style: { fill: '#ddd', fontSize: 10 } },
      });
    },
    controls: (bar, live) => {
      select(bar, 'colours', NAMES, (v) => live.set({ theme: v }));
      select(bar, 'label.position', POSITIONS, (v) => live.set({ position: v }));
    },
    step: (_s, i) => ({ theme: NAMES[i % NAMES.length] as string }),
    previewMs: 1800,
  });

export default mount;
