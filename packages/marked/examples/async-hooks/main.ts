// An async preprocess hook fetches a snippet and splices it into the Markdown
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docPane, note, row, sourcePane, textPane } from '../../shared/panes.ts';
import { button } from '../../shared/controls.ts';

const TEXT = `# Team update

Shipping on Tuesday.

@include signature`;

const CARD = `Shipping Tuesday.

@include signature`;

const SNIPPETS: Record<string, string> = {
  signature: '---\n\n**Priya Nair**  \n*Operations*, Harbour Cafe',
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The @include line is replaced by a snippet that arrives a moment later' });

  // Snippets "live elsewhere": each is a blob: address made here, fetched by the hook.
  const urls = new Map<string, string>();
  for (const [name, text] of Object.entries(SNIPPETS)) urls.set(name, URL.createObjectURL(new Blob([text], { type: 'text/markdown' })));
  stage.onDispose(() => urls.forEach((u) => URL.revokeObjectURL(u)));

  let after = '';
  const m = new Marked({
    async: true,
    hooks: {
      // With async: true a hook may return a Promise; Marked waits for it.
      async preprocess(markdown) {
        const lines = markdown.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const name = /^@include (\w+)$/.exec(lines[i]!)?.[1];
          if (!name) continue;
          await stage.wait(900);
          const url = urls.get(name);
          lines[i] = url ? await (await fetch(url)).text() : `*(no snippet called ${name})*`;
        }
        after = lines.join('\n');
        return after;
      },
    },
  });

  const src = sourcePane(stage, stage.preview ? CARD : TEXT);
  const mid = textPane(stage, 'Text after the hook');
  const doc = docPane(stage, 'Page');
  if (stage.preview) row(stage.root, src.el, doc.el);
  else {
    row(stage.root, src.el, mid.el);
    stage.root.append(doc.el);
    note(stage.root, 'Because the hook returns a Promise, parse() does too. The snippet is Markdown, so after it is spliced in Marked turns its rule and bold text into HTML like the rest.');
  }

  let run = 0;
  const go = async (): Promise<void> => {
    const mine = ++run;
    mid.show('waiting for the snippet...');
    doc.show('<p><em>loading the snippet...</em></p>');
    try {
      const html = await m.parse(src.value());
      if (mine !== run || stage.disposed) return;
      mid.show(after);
      doc.show(html);
    } catch (err) {
      if (!stage.disposed) throw err;
    }
  };

  if (stage.preview) {
    stage.play(async (wait) => {
      void go();
      await wait(4000);
    });
  } else {
    src.onInput(() => void go());
    button(stage.bar!, 'Run again', () => void go());
    void go();
  }
  return () => stage.dispose();
};

export default mount;
