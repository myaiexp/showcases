// on('rendered') and on('loaded'): the two events after a render, with payloads
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAX = (theme: string) => `
infographic list-grid-compact-card
theme ${theme}
data
  lists
    - label Fast
      icon bolt
    - label Small
      icon compress
    - label Clear
      icon eye
    - label Open
      icon lock-open`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  // The hand-drawn theme sets no background colour: give it paper to sit on.
  stage.box.style.background = '#f6f1e4';
  const side = stage.side('events');
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const log: string[] = [];
  const note = (text: string) => {
    log.push(text);
    if (side) side.textContent = log.slice(-14).join('\n');
  };
  infographic.on('rendered', ({ node, options }: { node: SVGSVGElement; options: { theme?: string } }) => {
    stage.say(`rendered: <${node.tagName}> with ${node.querySelectorAll('*').length} elements, theme ${options.theme}`);
    note(`rendered  ${node.querySelectorAll('*').length} elements`);
  });
  infographic.on('loaded', ({ node }: { node: SVGSVGElement }) => {
    stage.say(`loaded: every <use> and <image> resolved (${node.querySelectorAll('use, image').length})`, 'ok');
    note('loaded    resources ready');
  });

  stage.cycle(['dark', 'light', 'hand-drawn'].map((theme) => ({ run: () => infographic.render(SYNTAX(theme)) })));
  return () => stage.dispose();
};

export default mount;
