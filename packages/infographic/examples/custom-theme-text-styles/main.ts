// A registered theme styling title, desc and item labels
import { Infographic, registerTheme } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';


registerTheme('showcase-paper', {
  colorBg: '#F4ECD8',
  colorPrimary: '#B45309',
  base: { text: { fill: '#3B2F1E' } },
  title: { fill: '#7C2D12', 'font-size': 30, 'font-weight': 'bold' },
  desc: { fill: '#7A6A52' },
  item: { label: { fill: '#B45309', 'font-weight': 'bold' }, desc: { fill: '#5B4A33' } },
});
registerTheme('showcase-slate', {
  colorBg: '#0F172A',
  colorPrimary: '#38BDF8',
  base: { text: { fill: '#E2E8F0' } },
  title: { fill: '#38BDF8', 'font-size': 26 },
  item: { label: { fill: '#F1F5F9' }, desc: { fill: '#94A3B8' } },
});

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'theme showcase-paper',
    syntax: `infographic list-row-simple-horizontal-arrow
theme showcase-paper
data
  title Garden
  lists
    - label Seed
      desc Plant it
      icon seedling
    - label Water
      desc Keep it damp
      icon droplet
    - label Sun
      desc Give it light
      icon sun
    - label Harvest
      desc Pick it
      icon wheat-awn`,
  },
  {
    say: 'theme showcase-slate',
    syntax: `infographic list-row-simple-horizontal-arrow
theme showcase-slate
data
  title Garden
  lists
    - label Seed
      desc Plant it
      icon seedling
    - label Water
      desc Keep it damp
      icon droplet
    - label Sun
      desc Give it light
      icon sun
    - label Harvest
      desc Pick it
      icon wheat-awn`,
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 8 : 24,
    }),
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

  return () => {
    stage.dispose();
  };
};

export default mount;
