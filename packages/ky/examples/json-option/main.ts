// json: {...} stringifies your object and labels it for the server
import type { Mount } from '@/types.ts';
import { button, checkbox, textInput } from '../../shared/controls.ts';
import { attempt, demo } from '../../shared/req-kit.ts';
import { requestView, resultView } from '../../shared/panels.ts';

const SAMPLES = [
  { name: 'Aino', age: 34, newsletter: true },
  { name: 'Bashir', age: 27, newsletter: false, tags: ['gardening', 'chess'] },
  { name: 'Chen', age: 41, newsletter: true, address: { city: 'Taipei' } },
];

const mount: Mount = (el, ctx) => {
  const { stage, server, api } = demo(el, ctx, {
    hint: 'Edit the sign-up form and send it: the server shows exactly what arrived.',
    routes: { 'POST /signup': (req) => ({ status: 201, json: { welcome: JSON.parse(req.body).name } }) },
  });
  const row = stage.row();
  const seen = requestView(row, 'Server received', { headers: ['content-type'], mark: ['content-type'] });
  const result = resultView(row, 'Your code got');
  server.on((e) => e.kind === 'arrive' && seen.show(e.req));

  const send = async (form: object, headers?: Record<string, string>): Promise<void> => {
    stage.say('ky.post(url, { json: form })');
    // `json` stringifies the object, sends it as the body, and sets content-type: application/json.
    const out = await attempt(stage, result, () => api.post('https://club.example/signup', { json: form, headers }).json());
    if (out.ok) stage.say('One option: no JSON.stringify, no header to remember.', 'ok');
  };

  if (stage.preview) {
    let i = 0;
    stage.play(async (wait) => {
      await send(SAMPLES[i++ % SAMPLES.length]!);
      await wait(1600);
    });
    return stage.dispose;
  }
  const form = { name: 'Aino', age: 34, newsletter: true };
  let own = false;
  const go = (): void => stage.task(() => send(form, own ? { 'content-type': 'application/vnd.club+json' } : undefined));
  textInput(stage.bar!, 'name', form.name, (v) => (form.name = v));
  checkbox(stage.bar!, 'newsletter', form.newsletter, (v) => (form.newsletter = v));
  checkbox(stage.bar!, 'my own content-type', false, (v) => (own = v));
  button(stage.bar!, 'Send sign-up', go);
  go();
  return stage.dispose;
};

export default mount;
