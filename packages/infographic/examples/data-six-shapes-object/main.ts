// The six data types as options.data objects, each drawn by a template that reads it
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SHAPES = [
  {
    template: 'list-grid-compact-card',
    data: { lists: [{ label: 'Fast', icon: 'bolt' }, { label: 'Safe', icon: 'shield' }, { label: 'Clear', icon: 'lightbulb' }] },
  },
  {
    template: 'sequence-timeline-simple',
    data: { sequences: [{ label: 'Plan' }, { label: 'Build' }, { label: 'Ship' }], order: 'asc' },
  },
  {
    template: 'hierarchy-tree-curved-line-rounded-rect-node',
    data: { root: { label: 'Root', children: [{ label: 'Left' }, { label: 'Right' }] } },
  },
  {
    template: 'compare-quadrant-quarter-simple-card',
    data: { compares: [{ label: 'Do' }, { label: 'Plan' }, { label: 'Hand off' }, { label: 'Drop' }] },
  },
  {
    template: 'relation-dagre-flow-tb-simple-circle-node',
    data: {
      nodes: [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }, { id: 'c', label: 'C' }],
      relations: [{ from: 'a', to: 'b' }, { from: 'b', to: 'c', direction: 'both' }],
    },
  },
  {
    template: 'chart-column-simple',
    data: { values: [{ label: 'Mon', value: 12 }, { label: 'Tue', value: 18 }, { label: 'Wed', value: 9 }] },
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('options');

  stage.cycle(
    SHAPES.map(({ template, data }) => ({
      say: `${Object.keys(data)[0]} → ${template}`,
      run: () => {
        infographic.render({ template, theme: 'dark', data });
        if (code) code.textContent = JSON.stringify({ template, data }, null, 2);
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;
