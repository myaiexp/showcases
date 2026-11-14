// The docs' description-list extensions (block + inline) and walkTokens
import { Lexer, Marked, type TokenizerAndRendererExtension, type Tokens } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { checkbox } from '../../shared/controls.ts';
import { render } from '../../shared/renderer-kit.ts';
import './style.css';

const SAMPLE = `Gear for the weekend:
: Tent : sleeps two, 2kg
: **Stove** : *needs gas*
: Torch : spare batteries`;

const CARD = `Gear:
: Tent : 2 beds
: **Stove** : *gas*`;

// Block level: a run of ":term : meaning" lines becomes one <dl>.
const descriptionList: TokenizerAndRendererExtension = {
  name: 'descriptionList',
  level: 'block',
  start: (src) => src.match(/:[^:\n]/)?.index,
  tokenizer(src) {
    const match = /^(?::[^:\n]+:[^:\n]*(?:\n|$))+/.exec(src);
    if (!match) return undefined;
    const token = { type: 'descriptionList', raw: match[0], text: match[0].trim(), tokens: [] as Tokens.Generic[] };
    this.lexer.inline(token.text, token.tokens); // queue the lines for inline tokenizing
    return token;
  },
  renderer(token) {
    return `<dl>${this.parser.parseInline(token.tokens ?? [])}\n</dl>`;
  },
};

// Inline level: one ":term : meaning" line becomes <dt> and <dd>.
const description: TokenizerAndRendererExtension = {
  name: 'description',
  level: 'inline',
  start: (src) => src.match(/:/)?.index,
  tokenizer(src) {
    const match = /^:([^:\n]+):([^:\n]*)(?:\n|$)/.exec(src);
    if (!match) return undefined;
    return {
      type: 'description',
      raw: match[0],
      dt: this.lexer.inlineTokens(match[1]!.trim()),
      dd: this.lexer.inlineTokens(match[2]!.trim()),
    };
  },
  renderer(token) {
    return `\n<dt>${this.parser.parseInline(token.dt)}</dt><dd>${this.parser.parseInline(token.dd)}</dd>`;
  },
  childTokens: ['dt', 'dd'],
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Write ":term : meaning" lines under a sentence' });

  const plain = new Marked({ extensions: [descriptionList, description] });
  // walkTokens visits every token, including the ones inside dt and dd (childTokens).
  const walked = new Marked({
    extensions: [descriptionList, description],
    walkTokens(token) {
      if (token.type === 'strong') {
        token.text += ' walked';
        token.tokens = Lexer.lexInline(token.text);
      }
    },
  });
  let withWalk = stage.preview;

  const live = liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : SAMPLE }],
    render: (md) => render(withWalk ? walked : plain, md),
    caption:
      'Lines that start with a colon become a term and its meaning in a <dl> list. Tick the box and walkTokens adds the word "walked" to every bold term, proving it visits the tokens inside the new syntax.',
  });
  if (stage.bar) {
    checkbox(stage.bar, 'walkTokens adds "walked" to bold', false, (v) => {
      withWalk = v;
      live.refresh();
    });
  }

  return () => stage.dispose();
};

export default mount;
