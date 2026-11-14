// Command palette: fuzzy-match a command name, run the top match with Enter
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { COMMANDS } from '../../shared/data.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { editor } from './editor.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type part of a command, press Enter to run the top one.' });
  const palette = document.createElement('div');
  palette.className = 'palette';
  stage.root.append(palette);
  const box = searchBox(palette, stage, { placeholder: '> type a command', tries: ['tgl side', 'theme', 'wrap', 'splt', 'go to'] });
  const list = resultList(palette, { max: stage.preview ? 2 : 5, ranks: false, scores: false });
  const win = editor(stage.root);

  // Commands searched by name, a little stricter than the default 0.6 so the
  // list stays short while typing.
  const fuse = new Fuse(COMMANDS, { keys: ['name'], threshold: 0.4, includeMatches: true });
  let top: string | null = null;

  const run = (query: string): void => {
    const results = query.trim() ? fuse.search(query, { limit: 5 }) : [];
    top = results[0]?.item.name ?? null;
    list.show(
      results.map((r) => ({ id: r.refIndex, title: marked(r, 'name', r.item.name), badge: r.item.shortcut })),
      query.trim() ? 'No command matches' : `${COMMANDS.length} commands`,
    );
  };
  const enter = (): void => {
    if (!top) return;
    const shown = win.run(top);
    stage.say(`Ran "${top}"${shown ? '' : ' (nothing to see in this little window)'}`, 'ok');
  };
  box.onInput(run);
  run('');

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const q of ['tgl side', 'theme', 'splt', 'tgl side', 'theme', 'splt']) {
        await box.type(q, 90);
        await wait(700);
        enter();
        await wait(1300);
        await box.erase();
      }
    });
  } else {
    box.el.addEventListener('keydown', (e) => e.key === 'Enter' && enter());
  }
  return stage.dispose;
};

export default mount;
