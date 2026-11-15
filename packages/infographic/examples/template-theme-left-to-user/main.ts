// One design-only template drawn under four different theme lines
import { Infographic, registerTemplate } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

registerTemplate('showcase-roadmap-row', {
  design: {
    structure: { type: 'list-row', gap: 0, zigzag: true },
    item: 'horizontal-icon-arrow',
    title: 'default',
  },
});

const DATA = `data
  title Roadmap
  lists
    - label Q1
      desc Foundations
      icon seedling
    - label Q2
      desc Launch
      icon rocket
    - label Q3
      desc Scale
      icon chart-line`;

const STEPS = [
  { say: 'No theme line: the default theme', syntax: `infographic showcase-roadmap-row\n${DATA}` },
  { say: 'theme dark', syntax: `infographic showcase-roadmap-row\ntheme dark\n${DATA}` },
  { say: 'theme hand-drawn', syntax: `infographic showcase-roadmap-row\ntheme hand-drawn\n${DATA}` },
  {
    say: 'theme dark with a custom palette',
    syntax: `infographic showcase-roadmap-row\ntheme dark\n  palette #ff7b72 #79c0ff #7ee787\n${DATA}`,
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
