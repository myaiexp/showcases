// Cycles the sequence-interaction ids in turn, with a picker
import { Infographic, getTemplates } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// The data block: the data the interaction kind of template reads.
const DATA = [
  `data
  title Login Check
  sequences
    - label User
      icon user
      children
        - label Sign in
          id user-login
          step 0
          icon right-to-bracket
        - label See result
          id user-result
          step 2
          icon inbox
    - label Server
      icon server
      children
        - label Verify
          id server-verify
          step 1
          icon shield-halved
        - label Reply
          id server-return
          step 2
          icon paper-plane
  relations
    user-login - password -> server-verify
    server-verify - ok -> server-return
    server-return - answer -> user-result`,
];

// getTemplates() returns every registered id; this example keeps the sequence-interaction (swim-lane) templates with the compact layout, in plain, dashed and animated arrows.
const wanted = (id: string): boolean => id.startsWith('sequence-interaction-compact-');

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
