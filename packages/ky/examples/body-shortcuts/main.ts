// One answer read six ways: json, text, blob, arrayBuffer, bytes, formData
import type { Mount } from '@/types.ts';
import { attempt, cycle, demo, notes } from '../../shared/req-kit.ts';
import { resultView } from '../../shared/panels.ts';

const WEATHER = '{"city":"Oulu","tempC":-3}';
const FORM = '--b\r\nContent-Disposition: form-data; name="city"\r\n\r\nOulu\r\n--b\r\nContent-Disposition: form-data; name="tempC"\r\n\r\n-3\r\n--b--\r\n';

// What each shortcut hands your code, and what that is good for.
const READS = [
  { label: '.json()', use: 'an object', form: false },
  { label: '.text()', use: 'plain text', form: false },
  { label: '.blob()', use: 'a file-like chunk', form: false },
  { label: '.arrayBuffer()', use: 'raw memory', form: false },
  { label: '.bytes()', use: 'a list of byte numbers', form: false },
  { label: '.formData()', use: 'named form fields', form: true },
].filter((r) => r.label !== '.bytes()' || 'bytes' in Response.prototype);

const mount: Mount = (el, ctx) => {
  let form = false;
  const { stage, api } = demo(el, ctx, {
    hint: 'The server sends one answer; the shortcut decides what your code gets.',
    // A form-shaped answer for .formData(), the same weather as JSON for the rest.
    routes: { '/weather': () => (form ? { text: FORM, headers: { 'content-type': 'multipart/form-data; boundary=b' } } : { text: WEATHER, headers: { 'content-type': 'application/json' } }) },
  });
  const row = stage.row();
  const sent = notes(row, 'Server sent');
  const result = resultView(row, 'Your code got');

  cycle(stage, READS, async (r) => {
    form = r.form;
    sent.set(form ? ['name=city  Oulu', 'name=tempC  -3', '(a filled-in form)'] : [WEATHER]);
    stage.say(`api.get(…)${r.label}`);
    const call = api.get('https://weather.example/weather');
    const read = {
      '.json()': () => call.json(),
      '.text()': () => call.text(),
      '.blob()': () => call.blob(),
      '.arrayBuffer()': () => call.arrayBuffer(),
      '.bytes()': () => call.bytes(),
      '.formData()': () => call.formData().then((f) => Object.fromEntries(f)),
    }[r.label]!;
    const out = await attempt(stage, result, read, (v) => v, r.use);
    if (out.ok) stage.say(`${r.label} gives ${r.use}; same answer, different shape.`, 'ok');
  }, { control: 'Read it with', again: 'Fetch again' });
  return stage.dispose;
};

export default mount;
