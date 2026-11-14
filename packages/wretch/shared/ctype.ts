// A server that wants exactly "application/json", and the Content-Type it read
import type { Server, ServerRequest } from './server.ts';
import { kv, type Kv } from './screen.ts';
import type { Stage } from './stage.ts';

/** POST /posts: accepts a JSON body only when Content-Type is exactly `application/json`, as strict servers do. */
export const strictJsonRoute = (req: ServerRequest) => {
  const type = req.headers.get('content-type');
  if (type !== 'application/json') return { status: 415, json: { error: `Cannot read a body of type "${type}"` } };
  return { status: 201, json: { id: 7 } };
};

/** A list of every Content-Type header as it was sent, then the one value the server read from them. */
export function contentTypeView(stage: Stage, server: Server): Kv {
  const view = kv(stage.root, 'Content-Type headers sent');
  view.set([], 'Nothing sent yet');
  const off = server.on((e) => {
    if (e.type !== 'request') return;
    const sent = e.req.headerList.filter(([k]) => k.toLowerCase() === 'content-type');
    view.set([...sent, ['server reads', e.req.headers.get('content-type') ?? '(none)']]);
  });
  stage.onDispose(off);
  return view;
}
