// Tree with leaves styling, data.collapsed nodes and a switchable node symbol
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select } from '../../shared/chart.ts';
import { project, type HNode } from '../../shared/hierarchy-data.ts';

// Copy of the project tree where the named nodes start folded (data.collapsed).
const fold = (node: HNode, folded: string[]): HNode & { collapsed?: boolean } => ({
  name: node.name,
  ...(node.value === undefined ? {} : { value: node.value }),
  ...(node.children ? { children: node.children.map((c) => fold(c, folded)), collapsed: folded.includes(node.name) } : {}),
});

const SYMBOLS = ['emptyCircle', 'circle', 'rect', 'diamond', 'roundRect'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });

  const render = (symbol: string, leafStyle: boolean, folded: string[]): void => {
    chart.setOption(
      {
        tooltip: { formatter: '{b}' },
        series: [
          {
            type: 'tree',
            data: [fold(project, folded)],
            orient: 'LR',
            initialTreeDepth: -1,
            // The default emptyCircle fills its centre when a subtree is folded. A solid
            // symbol cannot show that, and takes itemStyle.color and border as a normal fill.
            symbol,
            symbolSize: 12,
            itemStyle: { color: '#5470c6', borderColor: '#fff', borderWidth: 1 },
            label: { show: !ctx.preview, position: 'left', verticalAlign: 'middle', fontSize: 12 },
            // leaves: a separate label and style for nodes without children.
            leaves: leafStyle
              ? {
                  label: { show: !ctx.preview, position: 'right', verticalAlign: 'middle', color: '#91cc75', fontSize: 11 },
                  itemStyle: { color: '#91cc75', borderColor: '#91cc75' },
                }
              : { label: { show: !ctx.preview, position: 'right', verticalAlign: 'middle' } },
            expandAndCollapse: true,
            top: 10,
            bottom: 10,
            left: 70,
            right: 90,
            animationDurationUpdate: 500,
          },
        ],
      },
      true,
    );
  };

  let symbol = 'emptyCircle';
  let leafStyle = true;
  let folded = ['tests', 'docs'];
  render(symbol, leafStyle, folded);

  if (ctx.preview) {
    let i = 0;
    const stop = every(2000, () => {
      i++;
      symbol = SYMBOLS[i % SYMBOLS.length]!;
      folded = i % 2 ? ['src', 'tools'] : ['tests', 'docs'];
      render(symbol, leafStyle, folded);
    });
    return () => {
      stop();
      dispose();
    };
  }

  select(bar!, 'symbol', SYMBOLS, (v) => {
    symbol = v;
    render(symbol, leafStyle, folded);
  });
  const lb = button(bar!, 'leaves style: on', () => {
    leafStyle = !leafStyle;
    lb.textContent = `leaves style: ${leafStyle ? 'on' : 'off'}`;
    render(symbol, leafStyle, folded);
  });
  const fb = button(bar!, 'data.collapsed: tests, docs', () => {
    folded = folded.length ? [] : ['tests', 'docs'];
    fb.textContent = `data.collapsed: ${folded.join(', ') || 'none'}`;
    render(symbol, leafStyle, folded);
  });
  fb.textContent = `data.collapsed: ${folded.join(', ')}`;

  return dispose;
};

export default mount;
