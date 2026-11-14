// The docs' globalStore plugin and updateAll(), kept inside each mount
import tippy, { type Instance, type Placement, type Plugin, type Props } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/themes/translucent.css';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

// The docs keep the list at module level; here each mount gets its own, so two
// copies of this example on one page never restyle each other's tips.
function createStore(): { globalStore: Plugin; updateAll(props: Partial<Props>): void } {
  let tippyInstances: Instance[] = [];
  const globalStore: Plugin = {
    fn(instance) {
      return {
        onCreate() {
          tippyInstances.push(instance);
        },
        onDestroy() {
          tippyInstances = tippyInstances.filter((i) => i !== instance);
        },
      };
    },
  };
  return {
    globalStore,
    updateAll(props) {
      tippyInstances.forEach((instance) => instance.setProps(props));
    },
  };
}

const TILES = [
  { label: 'Visitors', value: '12.4k', tip: 'Up 8% on last week' },
  { label: 'Orders', value: '341', tip: 'Up 2% on last week' },
  { label: 'Refunds', value: '9', tip: 'Down 30% on last week' },
  { label: 'Rating', value: '4.8', tip: 'From 212 reviews' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Hover the tiles, then change the look or the side.' });
  const { globalStore, updateAll } = createStore();

  const grid = document.createElement('div');
  grid.className = 'grid';
  const tiles = (stage.preview ? TILES.slice(0, 3) : TILES).map((t) => {
    const tile = document.createElement('div');
    tile.className = 'tile';
    const value = document.createElement('strong');
    value.textContent = t.value;
    const label = document.createElement('span');
    label.textContent = t.label;
    tile.append(value, label);
    grid.append(tile);
    return tile;
  });
  stage.root.append(grid);

  const tips = tiles.map((tile, i) =>
    stage.own(
      tippy(tile, {
        content: stage.preview ? ['+8%', '+2%', '-30%'][i]! : TILES[i]!.tip,
        placement: 'top',
        appendTo: stage.root,
        plugins: [globalStore],
      }),
    ),
  );

  // One call, every tip: that is all the plugin is for.
  if (stage.bar) {
    select(stage.bar, 'Look', ['default', 'light', 'translucent'] as const, (v) =>
      updateAll({ theme: v === 'default' ? '' : v }),
    );
    select(stage.bar, 'Side', ['top', 'bottom', 'left', 'right'] as const satisfies readonly Placement[], (v) =>
      updateAll({ placement: v }),
    );
  }

  if (stage.preview) {
    stage.play(async (wait) => {
      updateAll({ theme: '', placement: 'top' });
      for (const t of tips) t.show();
      await wait(1500);
      updateAll({ theme: 'light' });
      await wait(1300);
      updateAll({ placement: 'bottom' });
      await wait(1500);
      updateAll({ theme: 'translucent' });
      await wait(1300);
      for (const t of tips) t.hide();
      await wait(500);
    });
  }

  return stage.dispose;
};

export default mount;
