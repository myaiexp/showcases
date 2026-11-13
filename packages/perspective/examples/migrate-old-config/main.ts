// migrate() upgrades configs saved by older releases; validate() checks them
import type { Mount } from '@/types.ts';
import perspective_viewer from '@perspective-dev/viewer';
import { worker, uniqueName, createViewer, teardown, type ViewerConfigUpdate } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, button, output, every } from '../../shared/controls.ts';
import { OLD_TOKENS } from './old-tokens.ts';

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('superstore');
  const table = await client.table(orders(), { name });

  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 340, previewHeight: 120 });
  const out = output(el, ctx.preview ? 72 : 260);
  await viewer.load(client);
  await viewer.restore({ table: name });

  // migrate.md: the release that wrote a token is read from its `version` field. The
  // result carries the upgraded value, notices for anything dropped or approximated,
  // and the ids of the schema steps applied. The migrate binary was registered in
  // init() and downloads on this first call.
  const upgrade = async (label: string): Promise<void> => {
    const old = { ...OLD_TOKENS[label]!, table: name };
    try {
      // restore() accepts only the current schema, so the old token is rejected as-is.
      await perspective_viewer.validate('viewer', old);
      out.set('validate(): already valid');
    } catch (err) {
      out.set(`validate() → ${String(err)}`);
    }
    const { value, notices, steps } = await perspective_viewer.migrate<ViewerConfigUpdate>('viewer', old);
    await viewer.restore(value);
    out.log(`migrate("viewer") → steps ${JSON.stringify(steps)}\nnotices ${JSON.stringify(notices)}\nvalue ${JSON.stringify(value, null, ctx.preview ? 0 : 2)}`);
  };

  const labels = Object.keys(OLD_TOKENS);
  await upgrade(labels[0]!);
  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(3000, () => void upgrade(labels[++i % labels.length]!));
  } else {
    for (const label of labels) button(bar!, label, () => void upgrade(label));
    // Once migrated, the token is current: migrating it again changes nothing.
    button(bar!, 'validate(save(), { strict: true })', () => {
      void viewer
        .save()
        .then((token) => perspective_viewer.validate('viewer', token, { strict: true }))
        .then(() => out.log('validate(save(), { strict: true }) → ok'))
        .catch((err: unknown) => out.log(`strict validate → ${String(err)}`));
    });
  }

  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
