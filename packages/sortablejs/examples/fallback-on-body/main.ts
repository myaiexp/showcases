// A clipped queue panel: with fallbackOnBody the dragged copy can leave the panel and cross the page
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import { bar, checkbox } from '../../shared/controls.ts';
import './style.css';

const TRACKS = ['Intro', 'Sunrise', 'Low tide', 'Echoes', 'Finale'];

const mount: Mount = (el, { preview, signal }) => {
  const row = document.createElement('div');
  row.className = 'row';
  const panel = document.createElement('div');
  panel.className = 'panel'; // overflow: hidden plus a transform: it clips and re-anchors a floating copy
  const list = document.createElement('div');
  list.className = 'queue';
  for (const name of TRACKS.slice(0, preview ? 4 : 5)) {
    const track = document.createElement('div');
    track.className = 'track';
    track.textContent = name;
    list.append(track);
  }
  const stage = document.createElement('div');
  stage.className = 'stage';
  stage.textContent = 'page';
  panel.append(list);
  row.append(panel, stage);
  el.append(row);

  const sortable = Sortable.create(list, {
    animation: 150,
    forceFallback: true, // the floating copy only exists in fallback mode
    // true: append the copy to <body> instead of the list, so no ancestor can clip it.
    fallbackOnBody: preview,
    ghostClass: 'hole',
    onStart() {
      // On <body> the copy sits outside this example's scoped CSS, so dress it inline by copying the
      // look of the row it was made from. Sortable.ghost is that floating copy.
      const copy = Sortable.ghost;
      const from = Sortable.dragged;
      if (!copy || !from) return;
      const look = getComputedStyle(from);
      for (const p of ['background-color', 'color', 'font', 'padding', 'border', 'border-radius']) {
        copy.style.setProperty(p, look.getPropertyValue(p));
      }
      copy.style.boxShadow = '0 10px 20px rgb(0 0 0 / 0.4)';
      copy.style.opacity = '1';
    },
  });

  if (preview) {
    // Pull a track out of the panel across the page, then back in at the bottom.
    loopDrive(el, signal, async (hand) => {
      hand.down(list.firstElementChild!);
      await hand.glide({ el: stage, fx: 0.5, fy: 0.4 }, 0.9);
      await hand.wait(0.3);
      await hand.glide({ el: list.lastElementChild!, fy: 0.8 }, 0.9);
      await hand.wait(0.15);
      hand.up();
    }, 0.5);
  } else {
    const controls = bar(el);
    el.prepend(controls);
    checkbox(controls, 'fallbackOnBody', false, (v) => sortable.option('fallbackOnBody', v));
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Drag a track toward the page on the right. Without the option the copy is cut off by the panel edge; with it, it floats free.';
    el.append(hint);
  }

  return () => release(sortable);
};

export default mount;
