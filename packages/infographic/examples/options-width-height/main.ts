// width and height: pixels or percentages, changed live with update()
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAX = `
infographic list-row-simple-horizontal-arrow
theme dark
data
  lists
    - label Plan
      desc Scope it
    - label Build
      desc Make it
    - label Ship
      desc Release it`;

const SIZES: { width: number | string; height: number | string }[] = [
  { width: '100%', height: '100%' },
  { width: 180, height: 90 },
  { width: '60%', height: '60%' },
  { width: '100%', height: 70 },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  stage.box.style.outline = '1px dashed #61DDAA';
  stage.box.style.outlineOffset = '-1px';
  const infographic = stage.own(new Infographic({ container: stage.box, padding: ctx.preview ? 4 : 16 }));
  infographic.render(SYNTAX);

  stage.cycle(
    SIZES.map((size) => ({
      say: `width: ${JSON.stringify(size.width)}, height: ${JSON.stringify(size.height)}`,
      run: () => infographic.update(size),
    })),
  );
  return () => stage.dispose();
};

export default mount;
