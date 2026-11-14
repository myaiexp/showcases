// Two requests side by side with a verdict on whether they came out identical
import { envelope, type Envelope } from './envelope.ts';
import { columns, sameRequest } from './screen.ts';
import type { ServerRequest } from './server.ts';
import type { Stage } from './stage.ts';

export interface Twin {
  a: Envelope;
  b: Envelope;
  /** Shows both requests and says whether they match. Returns the verdict. */
  show(reqA: ServerRequest | null, reqB: ServerRequest | null): boolean;
}

/** Two envelopes titled `titleA` and `titleB`, and a line under them. */
export function twin(stage: Stage, titleA: string, titleB: string, headers?: string[]): Twin {
  const [left, right] = columns(stage.root, 2) as [HTMLElement, HTMLElement];
  const a = envelope(stage, { parent: left, title: titleA, headers });
  const b = envelope(stage, { parent: right, title: titleB, headers });
  return {
    a,
    b,
    show(reqA, reqB) {
      a.show(reqA);
      b.show(reqB);
      const same = !!reqA && !!reqB && sameRequest(reqA, reqB);
      if (reqA && reqB) {
        stage.say(same ? 'Both ways sent exactly the same request' : 'The two requests differ', same ? 'ok' : 'bad');
      }
      return same;
    },
  };
}
