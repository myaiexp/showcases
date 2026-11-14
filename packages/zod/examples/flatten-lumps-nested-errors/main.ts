// flattenError files an error under its first key only, so nested errors share one list
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { drive } from '../../shared/drive.ts';
import { flatView, treeView } from '../../shared/error-format-view.ts';
import { columns } from '../../shared/side-by-side.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const Profile = z.object({
  user: z.object({ name: z.string().min(3), email: z.email() }),
  tags: z.array(z.string()),
});

const SAMPLES = [
  { label: 'name and email', value: { user: { name: 'Al', email: 'al@' }, tags: [] } },
  { label: 'one tag, one name', value: { user: { name: 'Al', email: 'al@example.com' }, tags: ['ok', 7] } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a profile: the same error, flattened and treeified.' });
  codeLine(stage.root, 'z.flattenError(error)  vs  z.treeifyError(error)');
  // A card is too narrow for two panes: it shows flatten, then treeify.
  const cols = columns(stage.root, stage.preview ? [''] : ['flattenError', 'treeifyError']);
  const flat = cols[0]!;
  const tree = cols[stage.preview ? 0 : 1]!;
  let flip = false;
  const draw = (value: unknown): void => {
    const result = Profile.safeParse(value);
    if (result.success) return;
    const f = z.flattenError(result.error);
    const flatDom = flatView(f);
    const treeDom = treeView(z.treeifyError(result.error));
    if (stage.preview) {
      flat.body.replaceChildren(flip ? treeDom : flatDom);
      stage.say(flip ? '✗ treeifyError keeps user.name and user.email apart' : '✗ flattenError: user holds both errors, tags the third', 'bad');
      return;
    }
    flat.body.replaceChildren(flatDom);
    tree.body.replaceChildren(treeDom);
    stage.say(`✗ flatten keeps one list per top-level key (${Object.keys(f.fieldErrors).join(', ')}): the deeper paths are lost`, 'bad');
  };
  if (stage.preview) stage.cycle([false, true], 2800, (f) => { flip = f; draw(SAMPLES[0]!.value); });
  else drive(stage, SAMPLES, draw);
  return stage.dispose;
};

export default mount;
