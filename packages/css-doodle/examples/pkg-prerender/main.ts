// prerender() writes HTML that paints without the runtime, and lists what still needs it
import { prerender } from 'css-doodle/generator';
import type { Mount } from '@/types.ts';
import { codeBlock, framed, scriptlessFrame } from '../../shared/frame.ts';
import { createStage } from '../../shared/stage.ts';

const CASES: { label: string; code: string; attributes?: Record<string, string> }[] = [
  { label: 'plain CSS', code: '@grid: 8 / 100%;\nbackground: @p(#000, #fff);\n@random(.2) { border-radius: 50%; }' },
  { label: 'pointer', code: '@grid: 8 / 100%;\nbackground: #e6437d;\nscale: calc(1 - @udx / 300);' },
  { label: '@pattern', code: '@grid: 1 / 100%;\n@content: @pattern(grid: 16; match((x + y) % 2 = 0) { fill: #3a86ff; });' },
  { label: 'click:update', code: '@grid: 8 / 100%;\nbackground: @p(#06d6a0, #073b4c);', attributes: { 'click:update': '' } },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  // The HTML in a frame with scripts off: what a page without the runtime shows.
  const host = scriptlessFrame(ctx.preview ? 130 : 200);
  framed(stage.root, host.el, 'no script', 'free');
  const pre = codeBlock(stage.root, ctx.preview, 200);

  const show = async (i: number): Promise<void> => {
    const c = CASES[i]!;
    const { html, needs, seed } = await prerender(c.code, { attributes: c.attributes });
    if (stage.disposed) return;
    host.show(html);
    pre.textContent = `${c.label}\nseed: ${seed}\nneeds: ${JSON.stringify(needs)}\nhtml: ${html.length} characters`;
    stage.say(needs.length ? `needs the runtime for: ${needs.join(', ')}` : 'needs: [] — paints with no script at all', needs.length ? 'warn' : 'ok');
  };
  let i = 0;
  await show(0);
  stage.every(2600, () => void show((i = (i + 1) % CASES.length)));
  return () => stage.dispose();
};

export default mount;
