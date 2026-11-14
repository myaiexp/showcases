// .json(UserSchema.parse): the answer's shape is checked before use
import wretch from 'wretch';
import { z } from 'zod';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { pane } from '../../shared/pane.ts';
import { columns, screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
  createdAt: z.iso.datetime(),
});

const ANSWERS: Record<string, object> = {
  good: { id: 1, name: 'Aino Virtanen', email: 'aino@mail.example', createdAt: '2026-03-02T09:30:00Z' },
  wrongTypes: { id: '1', name: 'Aino Virtanen', email: 'aino-at-mail', createdAt: '2026-03-02T09:30:00Z' },
  missing: { id: 1, name: 'Aino Virtanen', email: 'aino@mail.example' },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The server answers with a well-formed user, or with a broken one.' });
  const server = createServer(stage, { 'GET /users/:kind': (req) => ({ json: ANSWERS[req.params['kind']!] }) });
  wire(stage, server, { rows: 0 });
  const [a, b] = columns(stage.root, 2) as [HTMLElement, HTMLElement];
  const sent = pane(a, 'The server sent');
  const zod = pane(b, 'Zod says');
  const shown = screen(stage.root, 'What the app shows');

  const api = wretch(BASE).fetchPolyfill(server.fetch);

  const load = async (kind: string): Promise<void> => {
    sent.clear();
    zod.clear();
    shown.clear('Loading…');
    stage.say(`api.get("/users/${kind}").json(UserSchema.parse)`);
    await api
      .get(`/users/${kind}`)
      // The callback runs on the parsed JSON. If it throws, the call fails with Zod's error.
      .json((data) => {
        for (const [k, v] of Object.entries(data as object)) sent.add(`${k}: ${JSON.stringify(v)}`);
        return UserSchema.parse(data);
      })
      .then((user) => {
        if (stage.disposed) return;
        zod.add('every field matches', 'ok');
        shown.show(`Welcome, ${user.name}`, 'ok');
        stage.say('The shape was right, so the app got a user it can trust', 'ok');
      })
      .catch((error: unknown) => {
        if (stage.disposed) return;
        const issues = error instanceof z.ZodError ? error.issues : [];
        for (const issue of issues) zod.add(`${issue.path.join('.')}: ${issue.message}`, 'bad');
        shown.show('The server sent something unexpected. Nothing was shown.', 'bad');
        stage.say(`${issues.length} problem${issues.length === 1 ? '' : 's'}: the broken answer was rejected before the app used it`, 'bad');
      });
  };

  runCases(stage, [
    { label: 'Good user', run: () => load('good') },
    { label: 'Wrong types', run: () => load('wrongTypes') },
    { label: 'Field missing', run: () => load('missing') },
  ]);
  return () => stage.dispose();
};

export default mount;
