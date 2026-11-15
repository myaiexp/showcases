// getOptions(): the options an instance holds, before and after update()
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAX = `
infographic list-row-simple-horizontal-arrow
theme dark
data
  title Release
  lists
    - label Plan
      desc Scope it
    - label Ship
      desc Release it`;

/** The options without the container element, which JSON cannot print. */
const printable = (options: object) => JSON.stringify(options, (k, v) => (k === 'container' ? '[element]' : v), 2);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  // The hand-drawn theme sets no background colour: give it paper to sit on.
  stage.box.style.background = '#f6f1e4';
  const side = stage.side('getOptions()');
  const infographic = stage.own(
    new Infographic(SYNTAX),
  );
  infographic.render({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 });

  const report = (say: string) => {
    const options = infographic.getOptions() as { template?: string; theme?: string; data?: { items?: unknown[]; lists?: unknown[] } };
    stage.say(`${say} -> template: ${options.template}, theme: ${options.theme ?? '(none)'}`);
    if (side) side.textContent = printable(options);
  };

  stage.cycle([
    { run: () => report('getOptions() after the syntax') },
    { run: () => { infographic.update({ theme: 'hand-drawn' }); report('after update({ theme })'); } },
    { run: () => { infographic.update({ template: 'list-column-simple-vertical-arrow' }); report('after update({ template })'); } },
    { run: () => { infographic.update({ theme: 'dark', template: 'list-row-simple-horizontal-arrow' }); report('after restoring both'); } },
  ]);
  return () => stage.dispose();
};

export default mount;
