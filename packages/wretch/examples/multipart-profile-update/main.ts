// A profile with nested details and a file: which formData option keeps both
import wretch from 'wretch';
import FormDataAddon from 'wretch/addons/formData';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { makeFile } from '../../shared/files.ts';
import { formPair } from '../../shared/formpair.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Saving a profile: a user id, nested details and a picture, in one request.' });
  const server = createServer(stage, {
    'POST /users/profile': (req) => {
      const entries = req.body.kind === 'form' ? req.body.entries : [];
      const text = (key: string): string | undefined => entries.map(([k, v]) => (k === key && typeof v === 'string' ? v : undefined)).find(Boolean);
      const avatar = entries.find(([k, v]) => k === 'avatar' && typeof v !== 'string');
      return { json: { role: text('metadata[role]'), avatar: avatar ? (avatar[1] as { file: string }).file : null } };
    },
  });
  const pair = formPair(stage, 'Your object', 'Fields the server got');
  const shown = screen(stage.root, 'What the server understood');

  const api = wretch(`${BASE}/users/profile`).fetchPolyfill(server.fetch).addon(FormDataAddon);
  const avatar = makeFile('avatar.png', 2048, 'image/png');
  const profile = { userId: '123', metadata: { role: 'admin', verified: true }, avatar };
  // Same object on the left, with the file described instead of printed as [object File].
  const shownObject = { ...profile, avatar: stage.preview ? avatar.name : `${avatar.name} (${avatar.size} bytes)` };

  const save = async (options: { recursive?: boolean | string[] } | undefined, say: string): Promise<void> => {
    pair.show(shownObject, null);
    shown.clear('Saving…');
    stage.say(say);
    const result = await api
      .formData(profile, options)
      .post()
      .json<{ role?: string; avatar: string | null }>()
      .catch(() => null);
    if (stage.disposed || !result) return;
    pair.show(shownObject, server.requests.at(-1)!);
    const good = !!result.role && !!result.avatar;
    shown.show(`role: ${result.role ?? 'missing'}${stage.preview ? ' · ' : '\n'}avatar: ${result.avatar ?? 'missing'}`, good ? 'ok' : 'bad');
    stage.say(
      good
        ? 'The details and the picture both arrived'
        : result.avatar
          ? 'The picture arrived, but the nested details turned into [object Object]'
          : 'The details were unpacked, but walking into the file lost the picture',
      good ? 'ok' : 'warn',
    );
  };

  runCases(stage, [
    { label: 'No option', run: () => save(undefined, '.formData(profile): nested objects are not unpacked') },
    { label: 'recursive: true', run: () => save({ recursive: true }, '.formData(profile, { recursive: true }): everything is unpacked') },
    { label: "recursive: ['avatar']", run: () => save({ recursive: ['avatar'] }, ".formData(profile, { recursive: ['avatar'] }): unpack all but the file") },
  ], 2400);
  return () => stage.dispose();
};

export default mount;
