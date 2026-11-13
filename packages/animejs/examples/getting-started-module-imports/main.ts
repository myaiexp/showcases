// Module imports: animate/splitText/stagger/random imported from subpaths, checked against the main module
import { animate } from 'animejs/animation';
import { splitText } from 'animejs/text';
import { stagger, random } from 'animejs/utils';
import * as main from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const p = document.createElement('p');
  p.className = 'text';
  p.textContent = 'Anime.js modules load from the main module or from subpaths.';
  el.append(p);

  const split = splitText(p);
  let anim: ReturnType<typeof animate> | null = null;
  const play = (): void => {
    anim?.revert();
    anim = animate(split.words, {
      opacity: () => random(0, 1, 2),
      delay: stagger(50),
    });
  };
  play();

  let timer = 0;
  let button: HTMLButtonElement | null = null;
  if (preview) {
    timer = window.setInterval(play, 1800);
  } else {
    button = document.createElement('button');
    button.className = 'btn';
    button.textContent = 'Replay random opacities';
    button.addEventListener('click', play);
    const code = document.createElement('pre');
    code.className = 'table';
    code.textContent = [
      "import { animate } from 'animejs/animation';",
      "import { splitText } from 'animejs/text';",
      "import { stagger, random } from 'animejs/utils';",
      '',
      `animate === main.animate:     ${animate === main.animate}`,
      `splitText === main.splitText: ${splitText === main.splitText}`,
      `stagger === main.stagger:     ${stagger === main.stagger}`,
      `random === main.utils.random: ${random === main.utils.random}`,
    ].join('\n');
    el.append(button, code);
  }

  return () => {
    window.clearInterval(timer);
    button?.removeEventListener('click', play);
    anim?.revert();
    split.revert();
  };
};

export default mount;
