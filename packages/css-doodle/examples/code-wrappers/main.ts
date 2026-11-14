// The same doodle from a <template>, a <style> and the use attribute
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = `
  @grid: 7 / 100% / #333;
  border-radius: @pn(100% 0, 0 100%);
  background: #fff;
`;

/** A frame like stage.doodle()'s, for a doodle built by hand. */
function framed(root: HTMLElement, doodle: HTMLElement, label: string): void {
  const frame = document.createElement('figure');
  frame.className = 'cd-frame cd-square';
  const cap = document.createElement('figcaption');
  cap.textContent = label;
  frame.append(doodle, cap);
  root.append(frame);
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  // 1. Inside a <template>: tools that parse the doodle as HTML leave it intact.
  const a = document.createElement('css-doodle');
  const template = document.createElement('template');
  template.innerHTML = code;
  a.append(template);

  // 2. Inside a <style>: editors highlight it as CSS.
  const b = document.createElement('css-doodle');
  const style = document.createElement('style');
  style.textContent = code;
  b.append(style);

  // 3. In the use attribute, with no content at all.
  const c = document.createElement('css-doodle');
  c.setAttribute('use', code);

  framed(stage.root, a, '<template>');
  framed(stage.root, b, '<style>');
  framed(stage.root, c, 'use="…"');

  const notes = [
    '<template>: markup tags around the code are skipped',
    '<style>: the same code, highlighted as CSS by editors',
    'use: the code passed as an attribute value',
  ];
  let i = 0;
  stage.say(notes[0]!);
  if (ctx.preview) stage.every(2400, () => stage.say(notes[(i = (i + 1) % notes.length)]!));
  else stage.say('Three wrappers, one picture: each element reads the same three lines.');
  return () => stage.dispose();
};

export default mount;
