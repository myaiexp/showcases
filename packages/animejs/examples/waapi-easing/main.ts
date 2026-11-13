// WAAPI easing: the `ease` parameter takes anime.js easings, functions and native WAAPI easing names
import { waapi } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

type Ease = Parameters<typeof waapi.animate>[1]['ease'];
const LANES: { label: string; ease: Ease; inPreview: boolean }[] = [
  { label: '(no ease: default is out(2), not linear)', ease: undefined, inPreview: true },
  { label: "ease: 'linear'", ease: 'linear', inPreview: true },
  { label: "ease: 'ease-out'  (native WAAPI name)", ease: 'ease-out', inPreview: false },
  { label: "ease: 'inOut(6)'", ease: 'inOut(6)', inPreview: true },
  { label: "ease: 'outElastic(1.25, .1)'", ease: 'outElastic(1.25, .1)', inPreview: true },
  { label: 'ease: (t) => t * t * t  (a Function)', ease: (t: number) => t * t * t, inPreview: false },
];

const mount: Mount = (el, { preview }) => {
  const lanes = document.createElement('div');
  lanes.className = preview ? 'lanes is-preview' : 'lanes';
  const items = LANES.filter((l) => !preview || l.inPreview).map((lane) => {
    const row = document.createElement('div');
    row.className = 'lane';
    const label = document.createElement('span');
    label.className = 'lane-label';
    label.textContent = lane.label;
    const track = document.createElement('div');
    track.className = 'track';
    const square = document.createElement('div');
    square.className = 'square';
    track.append(square);
    row.append(label, track);
    lanes.append(row);
    return { square, ease: lane.ease };
  });
  el.append(lanes);

  const animations = items.map(({ square, ease }) =>
    waapi.animate(square, {
      translate: preview ? '8rem' : '20rem',
      // Leaving `ease` out keeps the default.
      ...(ease === undefined ? {} : { ease }),
      duration: 1600,
      loop: true,
      alternate: true,
    }),
  );

  return () => animations.forEach((a) => a.revert());
};

export default mount;
