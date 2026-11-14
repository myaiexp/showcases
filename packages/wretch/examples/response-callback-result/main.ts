// What you put in .json(callback) decides what the promise delivers
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { kv } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The server always sends the same post. Only the callback changes.' });
  const server = createServer(stage, { 'GET /posts/1': () => ({ json: { id: 1, title: 'Morning light over the lake' } }) });
  wire(stage, server, { rows: 0 });
  const result = kv(stage.root, 'What .then() received');
  const api = wretch(BASE).fetchPolyfill(server.fetch);

  const show = (code: string, value: unknown, say: string): void => {
    if (stage.disposed) return;
    result.set([
      ['the call', code],
      ['server sent', '{ id: 1, title: "Morning light…" }'],
      ['you got', value === undefined ? 'undefined' : JSON.stringify(value)],
    ]);
    stage.say(say, 'ok');
  };
  const post = () => api.get('/posts/1');

  runCases(stage, [
    {
      label: 'No callback',
      run: async () => show('.json()', await post().json().catch(() => null), 'With no callback you get the parsed data itself'),
    },
    {
      label: 'Return a string',
      run: async () => show('.json(json => "Hello world!")', await post().json(() => 'Hello world!').catch(() => null), 'The callback\'s return value is what the promise delivers'),
    },
    {
      label: 'Return a part',
      run: async () => show('.json(json => json.title.length)', await post().json((json: { title: string }) => json.title.length).catch(() => null), 'Pick out only what you need: here the title\'s length'),
    },
    {
      label: 'Return nothing',
      run: async () => show('.json(json => { })', await post().json(() => {}).catch(() => null), 'A callback that returns nothing delivers undefined'),
    },
  ], 2000);
  return () => stage.dispose();
};

export default mount;
