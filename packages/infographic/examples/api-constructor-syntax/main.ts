// new Infographic(syntax): the string form, with the container given to render()
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAXES = [
  `infographic list-row-simple-horizontal-arrow
theme dark
data
  lists
    - label Plan
      desc Scope it
    - label Build
      desc Make it
    - label Ship
      desc Release it`,
  `infographic list-column-simple-vertical-arrow
theme dark
data
  lists
    - label Read
      desc The docs
    - label Try
      desc A render
    - label Edit
      desc The syntax`,
  `infographic sequence-timeline-simple
theme dark
data
  sequences
    - label Q1
      desc Design
    - label Q2
      desc Build
    - label Q3
      desc Launch`,
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const side = stage.side('Constructor argument');
  let current: Infographic | null = null;

  stage.cycle(
    SYNTAXES.map((syntax, i) => ({
      say: `new Infographic(syntax ${i + 1}), then render({ container })`,
      run: () => {
        current?.destroy();
        // The string form: no container in it, so the container is given to render().
        current = stage.own(new Infographic(syntax));
        current.render({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 });
        if (side) side.textContent = syntax;
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
