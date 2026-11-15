// themeConfig item.label values as functions of (value, node)
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const COLOURS = ['#f97316', '#22d3ee', '#a3e635', '#f472b6'];
const indexOf = (node: SVGElement) => Number((node.getAttribute('data-indexes') ?? '0').split(',')[0]);

const DATA = {
  lists: [
    { label: 'Alpha', desc: 'first' },
    { label: 'Beta', desc: 'second' },
    { label: 'Gamma', desc: 'third' },
    { label: 'Delta', desc: 'fourth' },
  ],
};

const VARIANTS = [
  {
    say: 'item.label.fill: (value, node) => colour by index',
    themeConfig: { item: { label: { fill: (_: unknown, node: SVGElement) => COLOURS[indexOf(node) % COLOURS.length] } } },
  },
  {
    say: 'item.label.font-size: (value, node) => 14 + 5 * index',
    themeConfig: { item: { label: { 'font-size': (_: unknown, node: SVGElement) => 14 + 5 * indexOf(node) } } },
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );

  stage.cycle(
    VARIANTS.map(({ say, themeConfig }) => ({
      say,
      run: () => {
        infographic.render({ template: 'list-grid-simple', theme: 'dark', themeConfig, data: DATA } as never);
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;
