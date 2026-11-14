// markArea in polar coordinates: angle/angle1 sector, radius/radius1 ring, or both
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const VALUES = [30, 28, 40, 55, 70, 85, 92, 88, 66, 50, 38, 32];
const FORMS = ['sector', 'ring', 'ring segment'];

const mount: Mount = (el, ctx) =>
  mountLive<{ form: string }>(el, ctx, {
    initial: { form: 'sector' },
    previewMs: 1700,
    step: (s) => ({ form: FORMS[(FORMS.indexOf(s.form) + 1) % FORMS.length] as string }),
    build: (s) => {
      const sector = { angle: 'May', angle1: 'Aug' };
      const ring = { radius: 40, radius1: 70 };
      const bounds = s.form === 'sector' ? sector : s.form === 'ring' ? ring : { ...sector, ...ring };
      return {
        type: 'rose',
        data: [{ id: 'd', values: MONTHS.map((month, i) => ({ month, value: VALUES[i] })) }],
        categoryField: 'month',
        valueField: 'value',
        outerRadius: 0.85,
        axes: [{ orient: 'radius', min: 0, max: 100, grid: { visible: true } }, { orient: 'angle' }],
        markArea: [{ ...bounds, area: { style: { fill: '#fbbf24', fillOpacity: 0.25, stroke: '#fbbf24' } } }],
      } as never;
    },
    controls: (bar, live) => {
      select(bar, 'bounds', FORMS, (v) => live.set({ form: v }));
    },
  });

export default mount;
