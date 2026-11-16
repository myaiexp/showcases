// A row of shapes and a select of queries: the matches of the chosen query get a red outline
import { Leafer, type IUI } from 'leafer-ui';
import '@leafer-in/find'; // find(), findOne(), findId()
import type { MountContext } from '@/types.ts';
import { lineUp, RED } from './layout-kit.ts';
import { caption, pick } from './shapes.ts';
import { createStage, type Stage } from './stage.ts';

export interface FindDemo {
  hint: string;
  /** The shapes, sized by `S` (the full-view or card shape size). */
  items(S: number): IUI[];
  /** Small labels under the shapes. */
  labels?: readonly string[];
  /** The queries: caption text to a function returning the matches. */
  queries(leafer: Leafer, items: IUI[]): Record<string, () => IUI[] | IUI | undefined>;
  /** Extra caption text for the current matches. */
  note?(hits: IUI[]): string;
}

export function findDemo(el: HTMLElement, ctx: MountContext, o: FindDemo): Stage {
  const stage = createStage(el, ctx, { hint: o.hint });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = stage.preview ? 50 : 80;
  const items = o.items(S);
  lineUp(stage, leafer, items, o.labels);
  const note = caption(stage, leafer);
  const queries = o.queries(leafer, items);
  pick(stage, 'query', Object.keys(queries), (q) => {
    for (const it of items) it.set({ stroke: '' });
    const found = queries[q]!();
    const hits = (Array.isArray(found) ? found : found ? [found] : []) as IUI[];
    for (const hit of hits) hit.set({ stroke: RED, strokeWidth: 4 });
    note.text = `${q}  ->  ${hits.length ? `${hits.length} found` : 'nothing'}${o.note ? '  ' + o.note(hits) : ''}`;
  }, 1500);
  return stage;
}
