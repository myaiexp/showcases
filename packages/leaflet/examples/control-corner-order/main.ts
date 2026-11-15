// Controls in the same corner stack in the order they are added; bottom corners stack upward
import { Control, LeafletMap, type ControlPosition } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LocalTileLayer } from '../../shared/local-tiles.ts';

/** A small labelled box: the least a Control needs is onAdd returning an element. */
class Tag extends Control {
  label: string;
  constructor(label: string, options: { position: ControlPosition }) {
    super(options);
    this.label = label;
  }
  override onAdd(): HTMLElement {
    const div = document.createElement('div');
    div.className = 'leaflet-bar';
    div.textContent = this.label;
    div.style.cssText = 'padding:3px 9px;background:#1f2937;color:#e5e7eb;font:12px/1.4 system-ui';
    return div;
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add order is A, B, C in each corner. A new control goes after the others at the top and before them at the bottom, so a corner always reads in add order away from the map edge.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [30, 10], zoom: 2, zoomControl: false, attributionControl: false }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png').addTo(map);

  const corners: ControlPosition[] = ['topleft', 'topright', 'bottomleft', 'bottomright'];
  const tags: Tag[] = [];
  const add = (letter: string): void => {
    for (const position of corners) tags.push(new Tag(`${letter} ${position.replace('left', ' left').replace('right', ' right')}`, { position }).addTo(map) as Tag);
  };
  stage.onDispose(() => tags.forEach((t) => t.remove()));

  const letters = ['A', 'B', 'C'];
  let next = 0;
  if (stage.preview) {
    stage.say('addTo(map) three times per corner: A, B, C');
    stage.every(1100, () => {
      if (next < letters.length) add(letters[next++] as string);
      else {
        tags.splice(0).forEach((t) => t.remove());
        next = 0;
      }
    });
  } else {
    add('A');
    next = 1;
    stage.button('Add the next letter to every corner', () => {
      if (next < 6) add(String.fromCharCode(65 + next++));
    });
    stage.button('Remove all', () => {
      tags.splice(0).forEach((t) => t.remove());
      next = 0;
    });
  }
  return () => stage.dispose();
};

export default mount;
