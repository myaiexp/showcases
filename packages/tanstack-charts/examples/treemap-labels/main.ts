// treemap labels: a label shows only when its text fits the cell, so labelPadding decides how many appear
import { defineChart, mountChart } from '@tanstack/charts';
import { treemap } from '@tanstack/charts/hierarchy/treemap';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { deepFiles } from '../../shared/marks2-tree.ts';
import { createStage } from '../../shared/stage.ts';

const files = deepFiles();

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const v = { padding: 4, size: 11 };

  const build = () =>
    defineChart({
      marks: [
        treemap(files, {
          path: 'name',
          delimiter: '.',
          value: 'size',
          color: (node) => node.ancestorIds[1] ?? node.id,
          label: (node) => `${node.name} ${node.value}`,
          labelFontSize: v.size,
          labelFontWeight: 600,
          labelFill: '#0b0b0f',
          labelPadding: v.padding,
          inset: 0.75,
        }),
      ],
      scales: { x: null, y: null },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Treemap labels that fit their cells' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`labelPadding ${v.padding}px, labelFontSize ${v.size}px: labels that do not fit are left out.`);
  };
  refresh();
  if (stage.bar) {
    slider(stage.bar, 'labelPadding', 0, 20, 1, v.padding, (x) => { v.padding = x; refresh(); });
    slider(stage.bar, 'labelFontSize', 8, 18, 1, v.size, (x) => { v.size = x; refresh(); });
  } else {
    stage.cycle([[2, 9], [6, 11], [12, 13], [0, 8]] as const, 1600, ([p, s]) => { v.padding = p; v.size = s; refresh(); });
  }
  return () => stage.dispose();
};

export default mount;
