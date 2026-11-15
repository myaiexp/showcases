// Cycles the relation-circle ids in turn, with a picker
import { Infographic, getTemplates } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// The data block: the data the circle kind of template reads.
const DATA = [
  `data
  title Product Loop
  nodes
    - label Discover
      value 72
      icon magnifying-glass
    - label Design
      value 55
      icon pen-ruler
    - label Build
      value 88
      icon code
    - label Launch
      value 34
      icon rocket
    - label Learn
      value 61
      icon chart-line
    - label Grow
      value 47
      icon seedling`,
  `data
  title Water Cycle
  nodes
    - label Rain
      value 72
      icon cloud-rain
    - label River
      value 55
      icon water
    - label Sea
      value 88
      icon ship
    - label Vapour
      value 34
      icon smog
    - label Cloud
      value 61
      icon cloud
    - label Snow
      value 47
      icon snowflake`,
];

// getTemplates() returns every registered id; this example keeps nodes on a ring.
const wanted = (id: string): boolean => id.startsWith('relation-circle-');

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
