// An inline extension turns {{Ctrl}}+{{C}} into <kbd> key caps
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { select } from '../../shared/controls.ts';
import { esc, render } from '../../shared/renderer-kit.ts';
import './style.css';

const MAC: Record<string, string> = { ctrl: '⌘', alt: '⌥', shift: '⇧', enter: '↩' };

const SAMPLE = `Copy: {{Ctrl}}+{{C}}
Paste: {{Ctrl}}+{{V}}
Command palette: {{Ctrl}}+{{Shift}}+{{P}}
Press {{Enter}} to confirm.`;

const CARD = `Copy {{Ctrl}}+{{C}}
Paste {{Ctrl}}+{{V}}
Press {{Enter}}`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Wrap each key in double braces' });
  let mac = false;

  const keys = new Marked({
    extensions: [
      {
        name: 'key',
        level: 'inline',
        start: (src) => src.indexOf('{{'),
        tokenizer(src) {
          const match = /^\{\{([^{}\n]+)\}\}/.exec(src);
          return match ? { type: 'key', raw: match[0], key: match[1]!.trim() } : undefined;
        },
        renderer(token) {
          const key = String(token.key);
          // The renderer reads `mac` each time, so the switch needs no new Marked instance.
          return `<kbd>${esc(mac ? (MAC[key.toLowerCase()] ?? key) : key)}</kbd>`;
        },
      },
    ],
  });

  const live = liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : SAMPLE }],
    render: (md) => render(keys, md),
    caption: 'Each {{key}} is drawn as a raised key cap. Switch to Mac and the same Markdown shows the Mac symbols.',
  });
  if (stage.bar) {
    select(stage.bar, 'Keyboard', ['Windows', 'Mac'], (v) => {
      mac = v === 'Mac';
      live.refresh();
    });
  }

  return () => stage.dispose();
};

export default mount;
