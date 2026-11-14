// collection.offset() + limit(): read a result one page at a time
import type { Mount } from '@/types.ts';
import { numberField } from '../../shared/controls.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';
import type { Step } from '../../shared/tour.ts';
import { pick } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { t, say } = d;
  const sizeField = numberField(d.stage, 'page size', 2, 1, 5);
  const size = () => Math.max(1, Number(sizeField.value) || 2);
  const page = (p: number): Step => ({
    label: `Page ${p}`,
    run: async () => {
      const skip = (p - 1) * size();
      d.view.unmark();
      say.set(`Page ${p}: skip ${skip}, take ${size()}.`, `.offset(${skip}).limit(${size()})`);
      pick(d, await t.where('age').above(10).offset(skip).limit(size()).toArray());
    },
  });
  say.set('Friends over 10, in pages.', "where('age').above(10)");
  d.run([page(1), page(2), page(3)]);
  return d.stage.dispose;
};

export default mount;
