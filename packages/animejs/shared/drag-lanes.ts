// Builds one horizontal lane per spec: a labelled square wrapped in its own draggable
import { createDraggable } from 'animejs';
import type { DraggableParams } from 'animejs';

export interface LaneSpec {
  label: string;
  settings: DraggableParams;
}
export interface Lane {
  item: HTMLElement;
  d: ReturnType<typeof createDraggable>;
}

export const buildLanes = (stage: HTMLElement, specs: LaneSpec[], preview: boolean): Lane[] => {
  const gap = Math.floor(150 / specs.length);
  return specs.map(({ label, settings }, i) => {
    const item = document.createElement('div');
    item.className = 'item';
    item.style.top = `${6 + i * (gap + 2)}px`;
    item.style.width = item.style.height = `${gap - 6}px`;
    item.style.setProperty('--hue', String(i * 60 + 190));
    stage.append(item);
    if (!preview) {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.style.top = `${12 + i * (gap + 2)}px`;
      tag.textContent = label;
      stage.append(tag);
    }
    return { item, d: createDraggable(item, { container: stage, ...settings }) };
  });
};
