// marked.lexer() cuts Markdown into a tree of tokens before any HTML is made
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { row, sourcePane } from '../../shared/panes.ts';
import { tokenTree } from '../../shared/token-tree.ts';
import { typeLoop } from '../../shared/typing.ts';

const SAMPLES = [
  { label: 'Quote', text: '> I am using **marked**.' },
  { label: 'List', text: '# Shopping\n\n- milk\n- *fresh* bread' },
  { label: 'Link', text: 'See [the docs](#top "Top").' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the Markdown and watch the tree change' });
  const src = sourcePane(stage, stage.preview ? '' : SAMPLES[1]!.text);
  const tree = tokenTree(stage, 'marked.lexer() tokens');
  row(stage.root, src.el, tree.el);

  const show = (markdown: string): void => {
    // Each token has a type, the raw text it consumed and, for containers, child tokens.
    const tokens = marked.lexer(markdown);
    tree.show(tokens);
  };

  if (stage.preview) {
    typeLoop(stage, SAMPLES, (text) => {
      src.set(text);
      show(text);
    });
  } else {
    src.onInput(show);
    show(SAMPLES[1]!.text);
  }
  return () => stage.dispose();
};

export default mount;
