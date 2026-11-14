// Mark data and options: column names, channel functions or columnar arrays
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { after, sales } from '../../shared/marks-data.ts';

const FORMS = ['column names', 'functions (units × 1000)', 'columnar arrays'] as const;
type Form = (typeof FORMS)[number];

const index = [0, 1, 2, 3];
const units = [10, 20, 40, 30];
const fruits = ['peach', 'pear', 'plum', 'plum'];

const mount: Mount = (el, ctx) =>
  mountPlot<{ form: Form }>(el, ctx, {
    initial: { form: FORMS[0] },
    render: ({ form }, { width, height }) => {
      const mark =
        form === FORMS[0]
          ? Plot.dot(sales, { x: 'units', y: 'fruit' })
          : form === FORMS[1]
            ? Plot.dot(sales, { x: (d) => d.units * 1000, y: (d) => d.fruit })
            : // Data is just an index array; each channel is its own parallel array.
              Plot.dot(index, { x: units, y: fruits });
      return mark.plot({ width, height, grid: true, marginLeft: 50 });
    },
    step: ({ form }) => ({ form: after(FORMS, form) }),
    controls: (bar, live) => {
      select(bar, 'options as', FORMS, FORMS[0], (form) => live.set({ form }));
    },
  });

export default mount;
