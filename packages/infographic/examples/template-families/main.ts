// getTemplates(): the first template of each family, drawn with the data that family reads
import { Infographic, getTemplates } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const FAMILIES = [
  { prefix: 'list-grid-compact', data: `  lists
    - label Fast
      icon bolt
    - label Safe
      icon shield` },
  { prefix: 'sequence-timeline-simple', data: `  sequences
    - label Plan
    - label Build
    - label Ship` },
  { prefix: 'hierarchy-tree-curved', data: `  root
    label Company
    children
      - label Product
      - label Sales` },
  { prefix: 'compare-quadrant-quarter-simple', data: `  compares
    - label Now
    - label Next
    - label Later
    - label Never` },
  { prefix: 'chart-column-simple', data: `  values
    - label Mon
      value 12
    - label Tue
      value 18
    - label Wed
      value 9` },
  { prefix: 'relation-dagre-flow-tb-simple', data: `  relations
    A -> B
    B -> C` },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('getTemplates()');
  const ids = getTemplates();

  stage.cycle(
    FAMILIES.map(({ prefix, data }) => {
      const id = ids.find((name) => name.startsWith(prefix)) ?? prefix;
      return {
        say: `infographic ${id}`,
        run: () => {
          const syntax = `infographic ${id}\ntheme dark\ndata\n${data}`;
          infographic.render(syntax);
          if (code) code.textContent = `${ids.length} templates registered\n\n${syntax}`;
        },
      };
    }),
  );

  return () => stage.dispose();
};

export default mount;
