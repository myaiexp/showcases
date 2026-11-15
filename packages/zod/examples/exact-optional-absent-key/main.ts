// optional() vs exactOptional(): an absent key against a key holding undefined
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { schemaMatrix } from '../../shared/schema-matrix.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const Loose = z.object({ nick: z.string().optional() });
const Exact = z.object({ nick: z.string().exactOptional() });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  codeLine(stage.root, 'z.object({ nick: z.string().…Optional() })');
  schemaMatrix(
    stage.root,
    stage,
    [
      { head: 'optional()', short: 'optional', schema: Loose },
      { head: 'exactOptional()', short: 'exact', schema: Exact },
    ],
    [
      { label: '{ }', value: {} },
      { label: "{ nick: 'ada' }", value: { nick: 'ada' } },
      { label: '{ nick: undefined }', value: { nick: undefined } },
      { label: '{ nick: null }', value: { nick: null } },
    ],
  );
  stage.say('Only the key that is present but undefined splits the two schemas');
  return stage.dispose;
};

export default mount;
