// The Title component: alignment, width and description lines, set per render
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { STRUCTURE } from './structure.tsx';

const DATA = {
  title: 'Market overview',
  desc: 'The description wraps to the number of lines it was given, and the title above it follows the alignment',
  lists: [{ label: 'North', icon: 'compass' }, { label: 'South', icon: 'sun' }],
};
const STEPS = [
  { alignHorizontal: 'center', titleWidth: 360, descLineNumber: 2 },
  { alignHorizontal: 'left', titleWidth: 360, descLineNumber: 2 },
  { alignHorizontal: 'right', titleWidth: 360, descLineNumber: 3 },
  { alignHorizontal: 'left', titleWidth: 220, descLineNumber: 4 },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const side = stage.side('structure props');
  const infographic = stage.own(new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24, theme: 'dark' }));

  stage.cycle(
    STEPS.map((props) => ({
      say: `<Title alignHorizontal="${props.alignHorizontal}" width={${props.titleWidth}} descLineNumber={${props.descLineNumber}} />`,
      run: () => {
        infographic.render({ design: { structure: { type: STRUCTURE, ...props }, item: 'simple' }, data: DATA });
        if (side) side.textContent = JSON.stringify(props, null, 2);
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
