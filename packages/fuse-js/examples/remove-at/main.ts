// fuse.removeAt(index): drop one item by position and get it back; later items shift up
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { docShelf } from '../../shared/doc-shelf.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { callLine, pills } from '../../shared/widgets.ts';

const SONGS = ['Blue Monday', 'Blue in Green', 'Take Five', 'So What', 'Blue Train', 'Autumn Leaves', 'Moanin'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tiles show their position. Remove one: every tile after it moves up by one, and so does refIndex.' });
  const box = searchBox(stage.root, stage, { value: 'blue', placeholder: 'Search songs…' });
  const call = callLine(stage.root, 'fuse.removeAt(index)');
  const shelf = docShelf<string>(stage.root, { label: (s, i) => `${i} ${s}` });
  const info = pills(stage.root);

  // `songs` is what the shelf draws; Fuse gets its own copy, since it keeps its own list.
  const songs = [...SONGS];
  const fuse = new Fuse([...songs]);
  let target = 0;

  const run = (): void => {
    const q = box.value.trim();
    const results = q ? fuse.search(q) : [];
    shelf.sync(songs);
    shelf.mark(q ? new Map(results.map((r) => [songs[r.refIndex]!, undefined] as const)) : null);
    info.set('refIndex of hits', results.map((r) => r.refIndex).join(', ') || '-');
  };
  const removeIndex = (idx: number): void => {
    if (idx >= songs.length) return;
    // removeAt() returns the song it removed (since 7.3.0).
    const removed = fuse.removeAt(idx);
    songs.splice(idx, 1);
    call.set(`fuse.removeAt(${idx})  →  "${removed}"`);
    run();
    stage.say(`Removed "${removed}" from position ${idx}; ${songs.length} songs left`, 'ok');
  };
  box.onInput(run);
  run();

  if (stage.preview) {
    stage.play(async (wait) => {
      songs.splice(0, songs.length, ...SONGS);
      fuse.setCollection([...songs]);
      run();
      call.set('fuse.removeAt(index)');
      for (const idx of [1, 3]) {
        await wait(2000);
        removeIndex(idx);
      }
      await wait(2400);
    });
  } else if (stage.bar) {
    select(stage.bar, 'position', SONGS.map((_, i) => [i, String(i)] as const), (i) => (target = i), target);
    button(stage.bar, 'removeAt', () => removeIndex(target));
    button(stage.bar, 'Start over', () => {
      songs.splice(0, songs.length, ...SONGS);
      fuse.setCollection([...songs]);
      call.set('fuse.removeAt(index)');
      run();
      stage.say('Back to seven songs');
    });
  }
  return stage.dispose;
};

export default mount;
