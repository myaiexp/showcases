// The .enum object of a z.enum() schema, and each of its values parsed back
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { sampleRows } from '../../shared/rows.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';
import { valueView } from '../../shared/value-view.ts';

const Role = z.enum(['admin', 'editor', 'viewer']);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  codeLine(stage.root, "Role = z.enum(['admin', 'editor', 'viewer'])");
  const pane = document.createElement('div');
  pane.className = 'zd-note-box';
  pane.append(valueView(Role.enum));
  const title = document.createElement('div');
  title.className = 'zd-pane-head';
  title.textContent = 'Role.enum';
  if (!stage.preview) stage.root.append(title);
  stage.root.append(pane);
  const rows = sampleRows(stage.root, stage, { inTitle: 'Role.enum.…', outTitle: 'Role.parse()' });
  const keys = Object.keys(Role.enum) as (keyof typeof Role.enum)[];
  rows.show(keys.map((k) => ({ input: Role.enum[k], result: Role.safeParse(Role.enum[k]) })));
  stage.say('Every value in .enum is accepted by the schema it came from', 'ok');
  return stage.dispose;
};

export default mount;
