// A dashboard with open tips; buttons call hideAll() (cards hide their own)
import tippy, { hideAll, type Instance } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { button as barButton } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const TILES = [
  ['Visitors', '1,204', 'Up 12% this week', 'Up 12%'],
  ['Sales', '$3,480', 'Best day: Friday', 'Fri best'],
  ['Refunds', '14', 'Two need a reply', '2 open'],
  ['Uptime', '99.9%', 'No incidents', 'All up'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 240, hint: 'Several tips are open. Close them with the buttons below.' });

  const tiles = stage.preview ? TILES.slice(0, 3) : TILES;
  const tips: Instance[] = tiles.map(([label, value, note, short]) => {
    const tile = document.createElement('div');
    tile.className = 'tile';
    const big = document.createElement('b');
    big.textContent = value!;
    tile.append(label!, big);
    stage.root.append(tile);
    // Manual tips stay open until told otherwise, as if a few hovers had been left behind.
    return stage.own(
      tippy(tile, {
        content: stage.preview ? short : note,
        trigger: 'manual',
        hideOnClick: false,
        showOnCreate: true,
        placement: 'top',
        maxWidth: 110,
        appendTo: stage.root,
      }),
    );
  });

  const showAgain = (): void => {
    for (const tip of tips) tip.show();
  };

  if (stage.bar) {
    // hideAll() acts on every tip on the page, which is fine in a full view with one example.
    barButton(stage.bar, 'Hide all', () => hideAll());
    barButton(stage.bar, 'Hide all, instantly', () => hideAll({ duration: 0 }));
    barButton(stage.bar, 'Hide all but the first', () => hideAll({ exclude: tips[0]! }));
    barButton(stage.bar, 'Show them again', showAgain);
  }

  if (stage.preview) {
    stage.play(async (wait) => {
      await wait(1500);
      // The card hides only its own tips; hideAll() would close the tips of every card on the page.
      for (const tip of tips) {
        tip.hide();
        await wait(350);
      }
      await wait(900);
      showAgain();
      await wait(600);
    });
  }

  return stage.dispose;
};

export default mount;
