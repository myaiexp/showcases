// Sankey emphasis: self, adjacency and related highlight effects on click or hover
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, type IVChart } from '../../shared/chart.ts';
import { asSpec, BUDGET_NODES, budgetFlat } from '../../shared/flow-data.ts';

interface Graphic { data?: { nodeName?: string }[]; context?: { data?: { nodeName?: string }[] } }
interface SankeySeries {
  getMarkInName(name: string): { getGraphics(): Graphic[] } | undefined;
  _handleNodeAdjacencyClick(g: Graphic): void;
  _handleNodeRelatedClick(g: Graphic): void;
}

const spec = (preview: boolean, effect: string, trigger: string): Record<string, unknown> => ({
  type: 'sankey',
  data: [{ id: 'data', values: budgetFlat() }],
  categoryField: 'nodeName',
  valueField: 'value',
  sourceField: 'source',
  targetField: 'target',
  nodeKey: 'nodeName',
  nodeAlign: 'justify',
  nodeGap: preview ? 6 : 10,
  nodeWidth: 12,
  minNodeHeight: 4,
  // Links take the source node's colour; blur states fade whatever is not highlighted.
  node: { state: { hover: { stroke: '#fff', lineWidth: 1 }, blur: { fillOpacity: 0.15 } } },
  link: {
    style: { fill: (d: { color?: string; datum?: { color?: string } }) => d.color ?? d.datum?.color, fillOpacity: 0.55 },
    state: { hover: { fillOpacity: 0.9 }, blur: { fillOpacity: 0.06 } },
  },
  label: { visible: true, style: { fontSize: preview ? 8 : 11 }, state: { blur: { fillOpacity: 0.2 } } },
  emphasis: { enable: true, trigger, effect },
});

/**
 * Highlights one node from code, for the preview card, which gets no clicks. Sankey emphasis
 * has no public API, so this calls the protected handler the click interaction uses; a page
 * of your own would leave emphasis to the reader's clicks.
 */
function highlightNode(vchart: IVChart, name: string, effect: string): void {
  const series = vchart.getChart()?.getAllSeries()[0] as unknown as SankeySeries | undefined;
  const g = series?.getMarkInName('node')?.getGraphics().find((n) => (n.context?.data ?? n.data)?.[0]?.nodeName === name);
  if (!series || !g) return;
  if (effect === 'adjacency') series._handleNodeAdjacencyClick(g);
  else if (effect === 'related') series._handleNodeRelatedClick(g);
}

const mount: Mount = (el, ctx) => {
  let effect = ctx.preview ? 'related' : 'adjacency';
  let trigger = 'click';
  let chart = createChart(el, ctx, asSpec(spec(ctx.preview, effect, trigger)));
  if (!ctx.preview) {
    const bar = controlBar(el);
    const rebuild = (): void => {
      chart.release();
      chart = createChart(el, ctx, asSpec(spec(false, effect, trigger)));
    };
    select(bar, 'effect', ['self', 'adjacency', 'related'], (v) => { effect = v; rebuild(); }).value = 'adjacency';
    select(bar, 'trigger', ['click', 'hover'], (v) => { trigger = v; rebuild(); });
    const hint = document.createElement('span');
    hint.textContent = `${trigger} a node`;
    bar.append(hint);
  }

  // Card: no pointer, so step through nodes and apply the effect by code, alternating effects.
  let i = 0;
  const stop = ctx.preview
    ? every(1600, () => {
        const name = BUDGET_NODES[[8, 3, 4, 0][i % 4] as number] as string;
        effect = i++ % 2 === 0 ? 'related' : 'adjacency';
        highlightNode(chart.vchart, name, effect);
      })
    : () => {};

  return () => {
    stop();
    chart.release();
  };
};

export default mount;
