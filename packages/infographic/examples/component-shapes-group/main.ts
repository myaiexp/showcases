// ShapesGroup: base.shape styles the grouped shapes, not the plain-group ones
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ITEM } from './item.tsx';

const SHAPES = [
  { say: 'base.shape: none', shape: {} },
  { say: "base.shape: { fill: '#F6BD16' }", shape: { fill: '#F6BD16' } },
  { say: "base.shape: { fill: '#61DDAA', stroke: '#fff', 'stroke-width': 3 }", shape: { fill: '#61DDAA', stroke: '#ffffff', 'stroke-width': 3 } },
  { say: "base.shape: { fill: 'none', stroke: '#F08BB4', 'stroke-width': 2 }", shape: { fill: 'none', stroke: '#F08BB4', 'stroke-width': 2 } },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const side = stage.side('themeConfig.base.shape');
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 8 : 24,
      theme: 'dark',
      design: { structure: 'list-row', item: ITEM },
      data: { lists: [{ label: 'Left: ShapesGroup. Right: Group' }] },
    }),
  );
  infographic.render();

  stage.cycle(
    SHAPES.map(({ say, shape }) => ({
      say,
      run: () => {
        infographic.update({ themeConfig: { base: { shape } } });
        if (side) side.textContent = JSON.stringify(shape, null, 2);
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
