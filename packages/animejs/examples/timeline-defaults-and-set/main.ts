// timeline defaults shared by all children, plus set() snapping values at chosen times
import { createTimeline } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const tracks = document.createElement('div');
  tracks.className = 'tracks';
  const dots: HTMLElement[] = [];
  for (let i = 0; i < 3; i++) {
    const track = document.createElement('div');
    track.className = 'track';
    const dot = document.createElement('div');
    dot.className = 'dot';
    track.append(dot);
    tracks.append(track);
    dots.push(dot);
  }
  const [d0, d1, d2] = dots as [HTMLElement, HTMLElement, HTMLElement];
  const caption = document.createElement('p');
  caption.className = 'caption';
  caption.textContent = "defaults: { ease: 'inOutExpo', duration: 700 }";
  el.append(tracks, caption);

  const tl = createTimeline({
    defaults: { ease: 'inOutExpo', duration: 700 },
    loop: true,
    loopDelay: 400,
  })
    // The tweens inherit duration and ease from defaults.
    .add(d0, { x: '10rem' })
    .add(d1, { x: '10rem' })
    // set() instantly applies values at a given time, no tween involved.
    .set(d2, { x: '5rem', backgroundColor: '#e8a33d' }, 500)
    .set(d2, { x: '10rem', backgroundColor: '#4da3ff' }, 1400)
    .add(d0, { x: '0rem' }, 1400);

  let btn: HTMLButtonElement | undefined;
  const onClick = (): void => void tl.restart();
  if (!preview) {
    btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Restart';
    btn.addEventListener('click', onClick);
    el.append(btn);
  }

  return () => {
    btn?.removeEventListener('click', onClick);
    tl.revert();
  };
};

export default mount;
