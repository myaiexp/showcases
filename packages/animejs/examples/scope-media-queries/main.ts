// Scope mediaQueries: the constructor re-runs and reads `matches` whenever a viewport query flips
import { animate, createScope, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const QUERIES = {
  isSmall: '(max-width: 600px)',
  isLarge: '(min-width: 601px)',
  reduceMotion: '(prefers-reduced-motion)',
};

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const square = document.createElement('div');
  square.className = 'square';
  stage.append(square);
  const chips = document.createElement('div');
  chips.className = 'chips';
  const chipFor: Record<string, HTMLElement> = {};
  for (const [name, query] of Object.entries(QUERIES)) {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.textContent = `${name}: ${query}`;
    chipFor[name] = chip;
    chips.append(chip);
  }
  el.append(stage, chips);
  if (!preview) {
    const note = document.createElement('p');
    note.className = 'note';
    note.textContent = 'Resize the browser window across 600px: the scope refreshes and the square switches axis.';
    el.append(note);
  }

  // The scope: `self.matches` holds the current state of each named query.
  const scope = createScope({ root: stage, mediaQueries: QUERIES }).add(self => {
    const matches = self?.matches ?? {};
    const { isSmall, reduceMotion } = matches;
    for (const [name, chip] of Object.entries(chipFor)) {
      chip.classList.toggle('on', Boolean(matches[name]));
    }
    utils.set('.square', { scale: isSmall ? 0.6 : 1 });
    if (reduceMotion) return;
    animate('.square', {
      x: isSmall ? 0 : ['-80px', '80px'],
      y: isSmall ? ['-35px', '35px'] : 0,
      rotate: 360,
      loop: true,
      alternate: true,
      duration: isSmall ? 750 : 1250,
    });
  });

  return () => {
    scope.revert();
  };
};

export default mount;
