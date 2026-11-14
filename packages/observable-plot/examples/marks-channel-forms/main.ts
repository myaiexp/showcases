// Channel values as field names, accessor functions or parallel arrays
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { after, linedata } from '../../shared/marks-data.ts';

const FORMS = ['field names', 'accessor functions', 'parallel arrays'] as const;
type Form = (typeof FORMS)[number];

const mount: Mount = (el, ctx) =>
  mountPlot<{ form: Form; labels: boolean }>(el, ctx, {
    initial: { form: 'field names', labels: false },
    render: ({ form, labels }, { width, height }) => {
      // Accessors and arrays lose the automatic axis labels; the scale label option restores them.
      const restore = form !== 'field names' && labels ? { x: { label: 'hour' }, y: { label: 'value' } } : {};
      const mark =
        form === 'field names'
          ? Plot.lineY(linedata, { x: 'hour', y: 'value', stroke: 'sensor' })
          : form === 'accessor functions'
            ? Plot.lineY(linedata, { x: (d) => d.hour, y: (d) => d.value, stroke: (d) => d.sensor })
            : Plot.lineY(
                { length: linedata.length },
                {
                  x: linedata.map((d) => d.hour),
                  y: linedata.map((d) => d.value),
                  stroke: linedata.map((d) => d.sensor),
                },
              );
      return mark.plot({ width, height, ...restore });
    },
    step: ({ form }) => ({ form: after(FORMS, form) }),
    controls: (bar, live) => {
      select(bar, 'channels as', FORMS, 'field names', (form) => live.set({ form }));
      toggle(bar, 'restore axis labels', false, (labels) => live.set({ labels }));
    },
  });

export default mount;
