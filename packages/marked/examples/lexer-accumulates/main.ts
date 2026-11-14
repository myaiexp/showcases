// One Lexer keeps its tokens between lex() calls; marked.lexer() starts fresh
import { Lexer, marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { note, row, sourcePane } from '../../shared/panes.ts';
import { button } from '../../shared/controls.ts';
import { tokenTree } from '../../shared/token-tree.ts';

const MESSAGES = ['Hi team!', '**Lunch** at noon', '- bring cash\n- bring a bag', 'See you there'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Send a few messages, then start a new Lexer' });

  let kept = new Lexer();
  let sent = 0;
  const src = sourcePane(stage, stage.preview ? '' : MESSAGES[1]!, 'Next message');
  const left = tokenTree(stage, 'The same Lexer, every time');
  const right = tokenTree(stage, 'marked.lexer(), each time');
  const leftLabel = left.el.querySelector('.mk-label')!;
  const rightLabel = right.el.querySelector('.mk-label')!;

  const send = (text: string): void => {
    sent++;
    // lex() adds this message's tokens after everything the Lexer already holds.
    const all = kept.lex(text);
    const fresh = marked.lexer(text);
    left.show([...all], { hideSpace: true });
    right.show(fresh, { hideSpace: true });
    leftLabel.textContent = `kept.lex(): ${all.length} tokens after ${sent} message${sent === 1 ? '' : 's'}`;
    rightLabel.textContent = `marked.lexer(): ${fresh.length} tokens`;
  };
  const reset = (): void => {
    kept = new Lexer();
    sent = 0;
    left.show([]);
    right.show([]);
    leftLabel.textContent = 'new Lexer(): 0 tokens';
    rightLabel.textContent = 'marked.lexer(): nothing yet';
  };
  reset();

  if (stage.preview) {
    row(stage.root, left.el, right.el);
    let i = 0;
    stage.every(1500, () => {
      if (i % MESSAGES.length === 0) reset();
      src.set(MESSAGES[i % MESSAGES.length]!);
      send(MESSAGES[i % MESSAGES.length]!);
      i++;
    });
  } else {
    stage.root.append(src.el);
    row(stage.root, left.el, right.el);
    button(stage.bar!, 'Send message', () => send(src.value()));
    button(stage.bar!, 'New Lexer', reset);
    let n = 0;
    button(stage.bar!, 'Next sample', () => src.set(MESSAGES[n++ % MESSAGES.length]!));
    note(stage.root, 'Each message is one lex() call. Reusing a Lexer piles the new tokens on top of the old ones, which is handy for lexing a stream in chunks. marked.lexer() builds a new Lexer every time, so it only ever shows the latest message.');
  }
  return () => stage.dispose();
};

export default mount;
