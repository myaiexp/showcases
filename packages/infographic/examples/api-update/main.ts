// update(): change one field of a live infographic and keep the rest
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAX = `
infographic list-row-simple-horizontal-arrow
theme dark
data
  lists
    - label Plan
      desc Scope it
    - label Build
      desc Make it
    - label Ship
      desc Release it`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  // The hand-drawn theme sets no background colour: give it paper to sit on.
  stage.box.style.background = '#f6f1e4';
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  infographic.render(SYNTAX);

  stage.cycle([
    { say: "update({ theme: 'light' })", run: () => infographic.update({ theme: 'light' }) },
    { say: "update({ theme: 'hand-drawn' })", run: () => infographic.update({ theme: 'hand-drawn' }) },
    { say: "update({ template: 'list-column-simple-vertical-arrow' })", run: () => infographic.update({ template: 'list-column-simple-vertical-arrow' }) },
    { say: 'update(syntax): a string merges too', run: () => infographic.update('theme dark\ntemplate list-row-simple-horizontal-arrow') },
  ]);
  return () => stage.dispose();
};

export default mount;
