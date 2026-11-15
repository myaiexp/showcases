// registerPalette(name, fn): a palette computed from the item ratio
import { Infographic, registerPalette } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

registerPalette('showcase-smooth-gradient', (ratio) => {
  const hue = Math.floor(ratio * 120 + 180); // 180 to 300 degrees
  return `hsl(${hue}, 75%, 55%)`;
});

const NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const VALUES = [12, 17, 9, 15, 11, 14, 8];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('Syntax');

  stage.cycle(
    [3, 5, 7].map((n) => ({
      say: `${n} items`,
      run: () => {
        const values = NAMES.slice(0, n).map((name, i) => `    - label ${name}\n      value ${VALUES[i]}`).join('\n');
        const syntax = `infographic chart-column-simple
theme dark
  palette showcase-smooth-gradient
data
  values
${values}`;
        infographic.render(syntax);
        if (code) code.textContent = syntax;
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;
