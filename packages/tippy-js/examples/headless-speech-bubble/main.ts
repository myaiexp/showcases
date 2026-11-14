// Headless Tippy: render() builds a comic speech bubble, Tippy positions and triggers it
import tippy from 'tippy.js/headless';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const SPEECH = [
  { who: 'Pip', line: 'Is that a pie on the windowsill?' },
  { who: 'Moss', line: 'Do not even think about it.' },
  { who: 'Dot', line: 'Too late!' },
];

const mount: Mount = (el, ctx) => {
  // No tippy.css here: everything about the bubble is in style.css, nothing is inherited.
  const stage = createStage(el, ctx, { height: 260, hint: 'Hover a character.' });

  const strip = document.createElement('div');
  strip.className = 'strip';
  const cast = (stage.preview ? SPEECH.slice(0, 2) : SPEECH).map((c, i) => {
    const face = document.createElement('div');
    face.className = `face face-${i}`;
    face.setAttribute('aria-label', c.who);
    face.append(document.createElement('i'), document.createElement('i'), document.createElement('b'));
    strip.append(face);
    return { face, line: c.line };
  });
  stage.root.append(strip);

  for (const { face, line } of cast) {
    stage.own(
      tippy(face, {
        content: line,
        placement: 'top',
        appendTo: stage.root,
        // The bubble's tail is drawn at the bottom, so the tip must never flip below.
        popperOptions: { modifiers: [{ name: 'flip', enabled: false }] },
        // render() replaces the whole default box. The popper is the outer wrapper and
        // the box sits inside it; Tippy sets the position on the popper.
        render(instance) {
          const popper = document.createElement('div');
          const bubble = document.createElement('div');
          const text = document.createElement('span');
          const tail = document.createElement('div');
          bubble.className = 'bubble';
          tail.className = 'tail';
          text.textContent = String(instance.props.content);
          bubble.append(text, tail);
          popper.append(bubble);
          return { popper };
        },
      }),
    );
  }

  if (stage.preview) {
    stage.play(async (wait) => {
      await stage.ghost.hover(cast[0]!.face, 700);
      await wait(1700);
      stage.ghost.leave();
      await wait(300);
      await stage.ghost.hover(cast[1]!.face, 700);
      await wait(1700);
      stage.ghost.leave();
      await wait(400);
    });
  }

  return stage.dispose;
};

export default mount;
