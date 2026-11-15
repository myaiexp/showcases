// theme: 'default' | 'dark' | 'hand-drawn' picked by name from getThemes()
import { Infographic, getThemes } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const DATA = {
  title: 'Sales funnel',
  sequences: [
    { label: 'Visit', value: 100 },
    { label: 'Sign up', value: 60 },
    { label: 'Buy', value: 25 },
  ],
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('getThemes()');
  const names = getThemes();

  stage.cycle(
    ['default', 'dark', 'hand-drawn'].map((theme) => ({
      say: `theme: '${theme}'`,
      run: () => {
        infographic.render({ template: 'sequence-funnel-simple', theme, data: DATA });
        if (code) code.textContent = JSON.stringify(names, null, 2);
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;
