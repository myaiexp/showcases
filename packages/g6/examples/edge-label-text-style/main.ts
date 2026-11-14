// Edge label text styling: weight, italic, decoration and letter spacing
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { rows } from '../../shared/edge-data.ts';

const LOOKS = ['plain', 'bold', 'italic underline', 'spaced'] as const;
type Look = (typeof LOOKS)[number];
const edgeOf = (look: Look, spacing: number): EdgeOptions => {
  const looks: Record<Look, Record<string, unknown>> = {
    plain: {},
    bold: { labelFontWeight: 'bold', labelFill: '#FF7875', labelFontSize: 16 },
    'italic underline': { labelFontStyle: 'italic', labelTextDecorationLine: 'underline', labelTextDecorationColor: '#FFC53D', labelTextDecorationStyle: 'wavy', labelFill: '#FFC53D' },
    spaced: { labelFill: '#95DE64' },
  };
  return { style: { stroke: '#5CACEE', labelText: 'IMPORTANT', labelLetterSpacing: spacing, ...looks[look] } };
};

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let look: Look = 'bold';
    let spacing = 0;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: rows(1, { gap: 0, top: 60 }),
        edge: edgeOf(look, spacing),
      }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setEdge(edgeOf(look, spacing));
      await graph.draw();
    };
    if (stage.bar) {
      select(stage.bar, 'look', LOOKS, look, (v) => ((look = v), void apply()));
      slider(stage.bar, 'labelLetterSpacing', [0, 12, 1], spacing, (v) => ((spacing = v), void apply()));
    } else {
      stage.every(1300, (i) => ((look = LOOKS[i % LOOKS.length]!), (spacing = look === 'spaced' ? 6 : 0), apply()));
    }
  });

export default mount;
