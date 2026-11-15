// render(): a syntax string, an options object, or nothing, each replaces the last
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAX = `
infographic list-row-simple-horizontal-arrow
theme dark
data
  lists
    - label Syntax
      desc render(string)
    - label Options
      desc render(object)
    - label Again
      desc render()`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  // The constructor's options stay underneath every render() call.
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24, theme: 'dark' }),
  );

  stage.cycle([
    { say: 'render(syntax)', run: () => infographic.render(SYNTAX) },
    {
      say: 'render({ template, data }): replaces the syntax',
      run: () =>
        infographic.render({
          template: 'list-grid-compact-card',
          data: { title: 'An options object', lists: [{ label: 'One', icon: 'star' }, { label: 'Two', icon: 'heart' }, { label: 'Three', icon: 'bell' }] },
        }),
    },
    { say: 'render(): draws the options already held', run: () => infographic.render() },
  ]);
  return () => stage.dispose();
};

export default mount;
