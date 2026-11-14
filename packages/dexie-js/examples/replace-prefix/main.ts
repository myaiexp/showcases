// Rename a folder: every file path starting with it gets the new prefix in one modify()
import Dexie, { replacePrefix, type EntityTable } from 'dexie';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tableView } from '../../shared/table-view.ts';
import { tour } from '../../shared/tour.ts';

interface FileEntry {
  id: number;
  filePath: string;
  name: string;
}

const START = [
  { filePath: 'drafts/', name: 'intro.md' },
  { filePath: 'drafts/', name: 'notes.txt' },
  { filePath: 'drafts/old/', name: 'v1.md' },
  { filePath: 'photos/', name: 'cat.jpg' },
  { filePath: 'drafts-2/', name: 'todo.md' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const db = stage.own(new Dexie(stage.dbName('files'))) as Dexie & { files: EntityTable<FileEntry, 'id'> };
  db.version(1).stores({ files: '++id, filePath' });

  const say = caption(stage.root);
  const view = tableView(stage, stage.root, {
    table: db.files,
    columns: [{ field: 'id', width: '2.6em' }, 'filePath', 'name'],
  });

  const move = (from: string, to: string, text: string) => ({
    label: `Rename ${from} → ${to}`,
    run: async () => {
      say.set(text, `where('filePath').startsWith('${from}').modify({ filePath: replacePrefix('${from}', '${to}') })`);
      view.mark((f) => (f.filePath as string).startsWith(from));
      await stage.wait(stage.preview ? 900 : 300);
      await db.files
        .where('filePath')
        .startsWith(from)
        .modify({
          filePath: replacePrefix(from, to),
        });
    },
    hold: 2200,
  });

  tour(
    stage,
    [
      move('drafts/', 'published/', "Rename drafts/: its subfolder moves too."),
      move('published/', 'drafts/', 'And rename it back.'),
    ],
    { setup: () => db.files.bulkAdd(START as FileEntry[]) },
  );
  say.set("'drafts-2/' does not start with 'drafts/'.", 'replacePrefix(oldPrefix, newPrefix)');

  return stage.dispose;
};

export default mount;
