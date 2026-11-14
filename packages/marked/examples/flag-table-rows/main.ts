// renderer.tablerow marks any row that mentions "late" in red
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';
import './style.css';

const PARCELS = `| Parcel | From | Status |
| --- | --- | --- |
| #1041 | Books shop | Delivered |
| #1042 | Plant nursery | Late, 2 days |
| #1043 | Tea merchant | On the way |
| #1044 | Bike repair | Late, waiting for part |
| #1045 | Bakery | Delivered |`;

const CARD = `| Parcel | Status |
| --- | --- |
| #1 | Delivered |
| #2 | Late, 2 days |
| #3 | On the way |
| #4 | Late |`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type the word "late" in any row' });

  const flagged = new Marked({
    renderer: {
      // A row arrives as already-rendered cells, so we search that HTML for the word.
      tablerow({ text }) {
        return /\blate\b/i.test(text) ? `<tr class="late">\n${text}</tr>\n` : false;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : PARCELS }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'tablerow override', render: (md) => render(flagged, md) },
    ],
    caption: 'The tablerow renderer receives a row as finished cell HTML. If it contains the word "late", the row gets a class that paints it red.',
  });

  return () => stage.dispose();
};

export default mount;
