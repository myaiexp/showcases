// In a treeified error an array's good elements are holes: undefined, so look up with ?.
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { drive } from '../../shared/drive.ts';
import { treeView } from '../../shared/error-format-view.ts';
import { createStage } from '../../shared/stage.ts';
import { valueView } from '../../shared/value-view.ts';
import { codeLine, pills, plural } from '../../shared/widgets.ts';

const Invites = z.object({ guests: z.array(z.email()) });

const SAMPLES = [
  { label: 'Only the 2nd is bad', value: { guests: ['ada@example.com', 'bob@', 'cy@example.com'] } },
  { label: 'The last one', value: { guests: ['ada@example.com', 'bob@example.com', 'cy@example.com', 'di@'] } },
  { label: 'First and 3rd', value: { guests: ['ada', 'bob@example.com', 'cy@'] } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a guest list: items[] is as long as the last bad guest, with holes between.' });
  codeLine(stage.root, 'tree.properties?.guests?.items?.[1]?.errors');
  const [length, bad] = pills(stage.root, ['slots', 'holes']);
  const out = document.createElement('div');
  stage.root.append(out);
  drive(stage, SAMPLES, (value) => {
    const result = Invites.safeParse(value);
    if (result.success) return;
    const tree = z.treeifyError(result.error);
    // Elements that passed leave undefined behind, so items can be shorter than the list.
    const items = tree.properties?.guests?.items ?? [];
    const holes = Array.from(items).filter((x) => x === undefined).length;
    length!(`${items.length} of ${(value as (typeof SAMPLES)[0]['value']).guests.length}`, 'info');
    bad!(String(holes), 'warn');
    out.replaceChildren(treeView(tree));
    if (!stage.preview) out.append(valueView(value, { issues: result.error.issues }));
    stage.say(`✗ items[] has ${plural(holes, 'undefined hole')}: use ?. before reading .errors`, 'bad');
  });
  return stage.dispose;
};

export default mount;
