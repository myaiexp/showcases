// themeConfig built up part by part: colours, palette, title, label, stylize
import { Infographic } from '@antv/infographic';
import type { ThemeConfig } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAX = `
infographic list-row-simple-horizontal-arrow
data
  title Launch plan
  desc Four parts of a ThemeConfig
  lists
    - label Plan
      desc Scope it
    - label Build
      desc Make it
    - label Ship
      desc Release it`;

const STEPS: { name: string; themeConfig: ThemeConfig }[] = [
  { name: 'no themeConfig', themeConfig: {} },
  { name: 'colorBg', themeConfig: { colorBg: '#14213d' } },
  { name: '+ colorPrimary', themeConfig: { colorBg: '#14213d', colorPrimary: '#fca311' } },
  { name: '+ palette', themeConfig: { colorBg: '#14213d', colorPrimary: '#fca311', palette: ['#fca311', '#e5e5e5', '#7ae582'] } },
  {
    name: '+ title and desc',
    themeConfig: {
      colorBg: '#14213d',
      palette: ['#fca311', '#e5e5e5', '#7ae582'],
      title: { fill: '#fca311', 'font-size': 34 },
      desc: { fill: '#e5e5e5', 'font-style': 'italic' },
    },
  },
  {
    name: '+ item.label',
    themeConfig: {
      colorBg: '#14213d',
      palette: ['#fca311', '#e5e5e5', '#7ae582'],
      title: { fill: '#fca311' },
      item: { label: { fill: '#7ae582', 'font-size': 26 } },
    },
  },
  { name: '+ stylize', themeConfig: { colorBg: '#14213d', palette: ['#fca311', '#e5e5e5', '#7ae582'], stylize: { type: 'rough', roughness: 0.8 } } },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const side = stage.side('themeConfig');
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24, theme: 'dark' }),
  );
  infographic.render(SYNTAX);

  stage.cycle(
    STEPS.map(({ name, themeConfig }) => ({
      say: `themeConfig: ${name}`,
      run: () => {
        infographic.update({ themeConfig });
        if (side) side.textContent = JSON.stringify(themeConfig, null, 2);
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
