// Cycles the relation-network ids in turn, with a picker
import { Infographic, getTemplates } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// The data block: the data the network kind of template reads.
const DATA = [
  `data
  title Core Platform
  nodes
    - id Core
      label Core
      value 99
      icon cube
    - id Auth
      label Auth
      value 72
      icon lock
    - id Data
      label Data
      value 64
      icon database
    - id Search
      label Search
      value 48
      icon magnifying-glass
    - id Mail
      label Mail
      value 35
      icon envelope
    - id Pay
      label Pay
      value 27
      icon credit-card
  relations
    Core -> Auth
    Core -> Data
    Core -> Search
    Core -> Mail
    Core -> Pay`,
  `data
  title Town Map
  nodes
    - id Core
      label Square
      value 99
      icon landmark
    - id Auth
      label School
      value 72
      icon school
    - id Data
      label Library
      value 64
      icon book
    - id Search
      label Cafe
      value 48
      icon mug-hot
    - id Mail
      label Post
      value 35
      icon envelope
    - id Pay
      label Bank
      value 27
      icon building-columns
  relations
    Core -> Auth
    Core -> Data
    Core -> Search
    Core -> Mail
    Core -> Pay`,
];

// getTemplates() returns every registered id; this example keeps a hub with links.
const wanted = (id: string): boolean => id.startsWith('relation-network-');

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
