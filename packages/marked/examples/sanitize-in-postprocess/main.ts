// A postprocess hook runs DOMPurify on the finished HTML string
import DOMPurify from 'dompurify';
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docPane, htmlPane, note, row, sourcePane } from '../../shared/panes.ts';
import { typeLoop } from '../../shared/typing.ts';
import { select } from '../../shared/controls.ts';
import { render } from '../../shared/renderer-kit.ts';

const SAMPLES = [
  { label: 'Broken image', text: 'Nice trip!\n\n<img src=x onerror=alert(1)>\n\n**See you soon**' },
  { label: 'Script tag', text: 'Hello\n\n<script>sendCookies()</script>\n\nBye' },
  { label: 'Bad link', text: '[Click me](javascript:alert(1))\n\nSafe: [home](https://example.com)' },
];

const CARD = [
  { text: 'Hi!\n<img src=x\n onerror=alert(1)>' },
  { text: 'Hi\n<script>\nsteal()\n</script>' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the Markdown: the hook cleans whatever Marked produces' });

  const plain = new Marked();
  const safe = new Marked({
    hooks: {
      // The docs' example: the last step before the HTML leaves Marked.
      postprocess(html) {
        return DOMPurify.sanitize(html);
      },
    },
  });

  const src = sourcePane(stage, stage.preview ? '' : SAMPLES[0]!.text);
  src.el.classList.add('mk-pane-src-top');
  stage.root.append(src.el);
  const before = htmlPane(stage, 'Without the hook');
  const after = htmlPane(stage, 'With postprocess');
  row(stage.root, before.el, after.el);
  const page = stage.preview ? null : docPane(stage, 'The page, from the hooked HTML');
  if (page) stage.root.append(page.el);
  if (!stage.preview) note(stage.root, 'The left HTML still carries onerror, a script tag or a javascript: link. The right one has them stripped by the hook, so even code that forgets to sanitize later is safe.');

  const draw = (md: string): void => {
    const unsafe = render(plain, md);
    const clean = render(safe, md);
    before.show(unsafe);
    after.show(clean);
    page?.show(clean);
  };

  if (stage.preview) {
    typeLoop(stage, CARD, (text) => {
      src.set(text);
      draw(text);
    });
  } else {
    src.onInput(draw);
    select(stage.bar!, 'Sample', SAMPLES.map((s) => s.label), (label) => {
      const s = SAMPLES.find((x) => x.label === label)!;
      src.set(s.text);
      draw(s.text);
    });
    draw(SAMPLES[0]!.text);
  }
  return () => stage.dispose();
};

export default mount;
