// Cycles the chart-wordcloud ids in turn, with a picker
import { Infographic, getTemplates } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// The data block: the data the wordcloud kind of template reads.
const DATA = [
  `data
  title Frontend Skills
  values
    - label React
      value 90
    - label Vue
      value 70
    - label CSS
      value 62
    - label SVG
      value 48
    - label Canvas
      value 40
    - label WebGL
      value 36
    - label Vite
      value 55
    - label TypeScript
      value 80
    - label Node
      value 30
    - label Git
      value 25`,
  `data
  title Kitchen Words
  values
    - label Salt
      value 90
    - label Pepper
      value 70
    - label Garlic
      value 62
    - label Butter
      value 48
    - label Basil
      value 40
    - label Lemon
      value 36
    - label Onion
      value 55
    - label Olive
      value 80
    - label Thyme
      value 30
    - label Honey
      value 25`,
];

// getTemplates() returns every registered id; this example keeps the word clouds, with and without rotated words.
const wanted = (id: string): boolean => id.startsWith('chart-wordcloud');

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, {
    height: 460,
    hint: 'The cycle walks through the ids; pick one in the list to stop on it. The syntax on the right is what is rendered.',
  });
  const ids = getTemplates().filter(wanted);
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('Syntax');

  const show = (id: string, data: string): void => {
    const syntax = `infographic ${id}\ntheme dark\n${data}`;
    infographic.render(syntax);
    if (code) code.textContent = syntax;
  };

  const picker = stage.select('Template', ids, ids[0] ?? '', (id) => {
    // Picking an id stops the cycle (its button reads "Pause") and renders that template.
    const pause = [...(stage.bar?.querySelectorAll('button') ?? [])].find((b) => b.textContent === 'Pause');
    pause?.click();
    stage.say(`infographic ${id}`);
    show(id, DATA[0] ?? '');
  });

  // Few ids: each one shows with every data variant, so the card still moves.
  const steps = ids.flatMap((id) => (ids.length < 3 ? DATA : DATA.slice(0, 1)).map((data) => ({ id, data })));
  stage.cycle(
    steps.map(({ id, data }) => ({
      say: `infographic ${id}`,
      run: () => {
        show(id, data);
        if (picker) picker.value = id;
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;
