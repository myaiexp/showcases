// renderer.table wraps the table in a scrolling box with a row count
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';
import './style.css';

const TABLE = `| Day | Place | Cost per night in euro |
| --- | --- | ---: |
| Mon | Lisbon hostel | 28 |
| Tue | Lisbon hostel | 28 |
| Wed | Sintra guesthouse | 45 |
| Thu | Porto flat | 62 |
| Fri | Porto flat | 62 |`;

const CARD = `| Day | Place |
| --- | --- |
| Mon | Lisbon |
| Tue | Sintra |
| Wed | Porto |`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add or remove a row' });

  const wrapped = new Marked({
    renderer: {
      table(token) {
        // Build the table the way the built-in renderer does: cells, then rows.
        const row = (cells: typeof token.header): string => this.tablerow({ text: cells.map((c) => this.tablecell(c)).join('') });
        const head = `<thead>\n${row(token.header)}</thead>\n`;
        const body = token.rows.length ? `<tbody>${token.rows.map(row).join('')}</tbody>` : '';
        const n = token.rows.length;
        const caption = `${n} ${n === 1 ? 'row' : 'rows'} · ${token.header.length} columns`;
        return `<div class="table-box"><div class="table-scroll"><table>\n${head}${body}</table></div><div class="table-count">${caption}</div></div>\n`;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : TABLE }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'table override', render: (md) => render(wrapped, md) },
    ],
    caption:
      'The table override wraps the table in a box that scrolls sideways when it is too wide, and adds a footer counting the rows. Add a row and the count changes.',
  });

  return () => stage.dispose();
};

export default mount;
