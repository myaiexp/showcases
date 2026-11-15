// container: an element or a selector string, resolved when the instance is made
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAX = `
infographic list-column-simple-vertical-arrow
theme dark
data
  lists
    - label Element
      desc container: el
    - label Selector
      desc container: '#id'`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  // A selector is looked up in the document, so the target needs a unique id.
  const id = `ig-target-${Math.random().toString(36).slice(2, 8)}`;
  const target = document.createElement('div');
  target.id = id;
  target.style.cssText = 'position:absolute;inset:0';
  stage.box.append(target);

  let current: Infographic | null = null;
  const forms: [string, () => Infographic][] = [
    ['container: element', () => new Infographic({ container: target, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 })],
    [`container: '#${id}'`, () => new Infographic({ container: `#${id}`, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 })],
  ];

  stage.cycle(
    forms.map(([say, make]) => ({
      say,
      run: () => {
        current?.destroy();
        current = stage.own(make());
        current.render(SYNTAX);
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
