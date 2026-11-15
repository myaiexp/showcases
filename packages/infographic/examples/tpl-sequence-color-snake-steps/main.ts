// Cycles the sequence-color-snake-steps ids in turn, with a picker
import { Infographic, getTemplates } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// The data block: the data the sequence kind of template reads.
const DATA = [
  `data
  title Launch Plan
  sequences
    - label Plan
      desc Scope it
      time Mon
      icon clipboard-list
    - label Build
      desc Make it
      time Tue
      icon hammer
    - label Test
      desc Break it
      time Wed
      icon bug
    - label Ship
      desc Launch it
      time Thu
      icon rocket`,
  `data
  title Daily Routine
  sequences
    - label Wake
      desc Alarm
      time 7am
      icon sun
    - label Cook
      desc Eggs
      time 8am
      icon utensils
    - label Walk
      desc Park
      time 9am
      icon person-walking
    - label Read
      desc Novel
      time 10pm
      icon book-open`,
];

// getTemplates() returns every registered id; this example keeps the sequence-color-snake-steps family.
const wanted = (id: string): boolean => id.startsWith('sequence-color-snake-steps');

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
