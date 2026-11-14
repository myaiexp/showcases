// parseJson turns an empty answer into a default instead of an error
import type { Mount } from '@/types.ts';
import { attempt, cycle } from '../../shared/req-kit.ts';
import { resultView } from '../../shared/panels.ts';
import { scene } from '../../shared/inst-kit.ts';

const ANSWERS = [
  { label: 'Two saved items', body: '{"items":["Milk","Eggs"]}' },
  { label: 'Nothing saved: empty answer', body: '' },
];

const mount: Mount = (el, ctx) => {
  let body = ANSWERS[0]!.body;
  const { stage, api } = scene(el, ctx, {
    hint: 'Some servers answer 200 OK with no text at all when there is nothing to list.',
    routes: { '/list': () => ({ text: body }) },
  });
  const row = stage.row();
  const plain = resultView(row, 'Plain .json()');
  const safe = resultView(row, 'With parseJson');

  cycle(stage, ANSWERS, async (item) => {
    body = item.body;
    stage.say(item.body ? 'The server sent a list.' : 'The server sent 200 OK and nothing else.');
    const url = 'https://notes.example/list';
    await attempt(stage, plain, () => api.get(url).json());
    // The Ky option: when the text is empty, give your code an empty list to work with.
    await attempt(stage, safe, () => api.get(url, { parseJson: (text) => (text ? JSON.parse(text) : { items: [] }) }).json());
    stage.say(item.body ? 'Both work when there is something to read.' : 'Plain .json() crashes on emptiness; parseJson gives an empty list.', item.body ? 'ok' : 'warn');
  });
  return stage.dispose;
};

export default mount;
