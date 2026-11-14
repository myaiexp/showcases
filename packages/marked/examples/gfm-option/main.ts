// gfm: true adds GitHub's extras (tables, task lists, ~~, bare links)
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';

const TRIP = `| Item | Qty |
|---|---|
| Socks | 3 |
| Water | 2L |`;

const TODO = `- [x] Book train
- [ ] Pack bag
~~Friday~~ Saturday
Map: https://example.com/map`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the notes: tables, [x] boxes, ~~strike~~ and bare links' });

  // Two instances so the setting never leaks into the global marked.
  const github = new Marked({ gfm: true });
  const plain = new Marked({ gfm: false });

  compareDemo(stage, {
    samples: [
      { label: 'Packing table', text: TRIP },
      { label: 'Trip to-do', text: TODO },
    ],
    sides: [
      { label: 'gfm: true', render: (md) => github.parse(md, { async: false }) },
      { label: 'gfm: false', render: (md) => plain.parse(md, { async: false }) },
    ],
    caption:
      'With gfm: true the pipes become a table, the [x] a checkbox, the ~~ pairs a strike-through and the web address a link. With gfm: false they all stay as typed.',
  });

  return () => stage.dispose();
};

export default mount;
