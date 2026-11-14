// FuseWorker add() and setCollection(): new people become searchable right away
import { FuseWorker } from 'fuse.js/worker';
import workerUrl from 'fuse.js/worker-script?url';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { PEOPLE, type Person } from '../../shared/data.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { pills } from '../../shared/widgets.ts';

const NEWCOMERS: Person[] = [
  { name: 'Jonas Berg', email: 'jonas@example.no', company: 'Fabrikam' },
  { name: 'Joni Mitchell', email: 'joni@example.ca', company: 'Tailspin' },
  { name: 'Jon Snow', email: 'jon@example.com', company: 'Northwind' },
  { name: 'Johanna Sinisalo', email: 'johanna@example.fi', company: 'Contoso' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add people, or keep only one company, and search again.' });
  const box = searchBox(stage.root, stage, { value: 'jon', tries: ['jon', 'joanna', 'northwind'] });
  const info = pills(stage.root);
  const list = resultList(stage.root, { max: stage.preview ? 4 : 10 });

  let docs = PEOPLE.slice();
  const numWorkers = 2;
  const fuse = new FuseWorker(docs, { keys: ['name', 'company'], threshold: 0.35, includeScore: true, includeMatches: true }, { numWorkers, workerUrl });
  stage.onDispose(() => fuse.terminate());
  let sent = 0;
  let latest = 0;

  const run = async (note: string): Promise<void> => {
    const ticket = ++latest;
    const results = await fuse.search(box.value);
    if (ticket !== latest || stage.disposed) return;
    info.set('people', docs.length);
    list.show(results.map((r) => ({ id: r.refIndex, title: marked(r, 'name', r.item.name), sub: marked(r, 'company', r.item.company), score: r.score })));
    stage.say(note, 'ok');
  };

  const add = async (): Promise<void> => {
    const person = NEWCOMERS[sent % NEWCOMERS.length]!;
    // add() goes to the workers round-robin: worker 1, worker 2, worker 1, …
    await fuse.add(person);
    docs = [...docs, person];
    await run(`Added ${person.name} (to worker ${(sent++ % numWorkers) + 1})`);
  };
  const keepOnly = async (company: string): Promise<void> => {
    // No remove() in FuseWorker: filter the array yourself and hand over the result.
    docs = docs.filter((p) => p.company === company);
    sent = 0; // setCollection starts the round-robin over
    await fuse.setCollection(docs);
    await run(`setCollection: only ${company} is left (${docs.length} people)`);
  };
  const reset = async (): Promise<void> => {
    docs = PEOPLE.slice();
    sent = 0;
    await fuse.setCollection(docs);
    await run(`setCollection: back to the original ${docs.length} people`);
  };
  const fail = (err: unknown): void => {
    if (!stage.disposed) stage.say(String(err), 'bad');
  };

  if (stage.preview) {
    stage.play(async (wait) => {
      await reset();
      await wait(1600);
      for (let i = 0; i < 3; i++) {
        await add();
        await wait(1500);
      }
      await keepOnly('Northwind');
      await wait(2200);
    });
  } else if (stage.bar) {
    button(stage.bar, 'add() a person', () => void add().catch(fail));
    button(stage.bar, 'Keep only Northwind', () => void keepOnly('Northwind').catch(fail));
    button(stage.bar, 'setCollection(original)', () => void reset().catch(fail));
    box.onInput(() => void run(`${docs.length} people in the workers`).catch(fail));
    void run(`${docs.length} people in ${numWorkers} workers`).catch(fail);
  }
  return stage.dispose;
};

export default mount;
