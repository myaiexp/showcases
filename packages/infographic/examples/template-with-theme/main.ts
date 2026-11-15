// A template holding design, theme and themeConfig, then overridden by the syntax
import { getTheme, Infographic, registerTemplate } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

registerTemplate('showcase-sunset-cards', {
  design: {
    structure: 'list-grid',
    item: 'compact-card',
    title: 'default',
  },
  // 0.2.20 reads only a template's themeConfig (its `theme` field is ignored), so the dark
  // theme's settings travel inside themeConfig.
  themeConfig: {
    ...getTheme('dark'),
    palette: ['#ff9f1c', '#ff5a5f', '#c77dff'],
  },
});

const DATA = `data
  title Sunset cards
  lists
    - label Dawn
      icon sun
    - label Noon
      icon cloud-sun
    - label Dusk
      icon moon`;

const STEPS = [
  { say: 'The template alone: its own theme and palette', syntax: `infographic showcase-sunset-cards\n${DATA}` },
  {
    say: 'The syntax overrides the palette',
    syntax: `infographic showcase-sunset-cards\ntheme\n  palette #4ade80 #22d3ee #60a5fa\n${DATA}`,
  },
  {
    say: 'The syntax switches the theme to hand-drawn',
    syntax: `infographic showcase-sunset-cards\ntheme hand-drawn\n${DATA}`,
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('Syntax');

  stage.cycle(
    STEPS.map((step) => ({
      say: step.say,
      run: () => {
        infographic.render(step.syntax);
        if (code) code.textContent = step.syntax;
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;
