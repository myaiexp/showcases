// themeConfig.stylize as linear-gradient and radial-gradient objects
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const DATA = {
  values: [
    { label: 'Mon', value: 12 },
    { label: 'Tue', value: 18 },
    { label: 'Wed', value: 9 },
    { label: 'Thu', value: 15 },
  ],
};

const STYLES = [
  { say: 'linear-gradient, angle 90', stylize: { type: 'linear-gradient', colors: ['#f97316', '#ec4899'], angle: 90 } },
  { say: 'linear-gradient, angle 0', stylize: { type: 'linear-gradient', colors: ['#22d3ee', '#6366f1'], angle: 0 } },
  { say: 'radial-gradient', stylize: { type: 'radial-gradient', colors: ['#fde047', '#16a34a'] } },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('stylize');

  stage.cycle(
    STYLES.map(({ say, stylize }) => ({
      say,
      run: () => {
        infographic.render({
          template: 'chart-column-simple',
          theme: 'dark',
          themeConfig: { stylize },
          data: DATA,
        } as never);
        if (code) code.textContent = JSON.stringify(stylize, null, 2);
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;
