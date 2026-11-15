// Order of delivery: the keyedSelection signal fires, then the host's onSelect
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { keyedSelection, whenSelected } from '@tanstack/charts/selection';
import type { Mount } from '@/types.ts';
import { spotsOf, visit } from '../../shared/interact-drive.ts';
import { scatter, type Blob } from '../../shared/interact-data.ts';
import { reader } from '../../shared/interact-read.ts';
import { createStage } from '../../shared/stage.ts';

const rows = scatter(12, 27);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a dot or press Enter on a focused one and read the two lines in order.' });
  if (stage.preview) stage.height -= 36; // leaves room for the caption lines under the chart
  const show = reader(stage);
  let selected: string | null = null;
  let log: string[] = [];
  const add = (line: string): void => {
    log = [...log, line].slice(stage.preview ? -2 : -6);
    show(log.join('\n'));
  };
  show('click a dot');

  const build = () => {
    const selection = keyedSelection<Blob, string, number, number>({
      selected: controlledSignal(selected, (next, { reason }) => {
        add(`1 selection: ${reason.type} ${String(next)} (${reason.source})`);
        selected = next;
        host.update(options());
      }),
      key: (d) => d.id,
    });
    return defineChart({
      marks: [
        dot(rows, { x: 'x', y: 'y', key: 'id', r: 5, color: 'group' }),
        whenSelected(dot(rows, { id: 'selected', x: 'x', y: 'y', key: 'id', r: 10, fillOpacity: 0, stroke: '#fbbf24', strokeWidth: 3 }), selection),
      ],
      scales: { x: { scale: scaleLinear, nice: true }, y: { scale: scaleLinear, nice: true, grid: true } },
      selection,
      maxFocusDistance: 20,
    });
  };
  const options = () => ({
    definition: build(),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'Scatter with selection and onSelect',
    onSelect: (p: { datum: { id: string } } | null) => add(`2 onSelect: ${p ? p.datum.id : 'null'}`),
  });
  const host = stage.own(mountChart(stage.box, options()));
  if (stage.preview) stage.after(500, () => visit(stage, spotsOf(host.getScene(), [1, 6, 10]), 1500, { click: () => true, delay: 0 }));
  return () => stage.dispose();
};

export default mount;
