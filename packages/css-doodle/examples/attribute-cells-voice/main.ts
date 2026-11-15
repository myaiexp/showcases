// Letters with keyframes of their own: each shows a bar of sound first
import type { Mount } from '@/types.ts';
import { paper } from '../../shared/a-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const voice = paper(stage, 'cd-cells-voice', 'Four minutes of wind, a gull, and goodnight.', 'p');
  stage.doodle(
    `
    position: relative;
    font: 1.25rem sans-serif;
    animation: say 4s calc(@i * 50ms) infinite;
    ::before {
      content: '';
      position: absolute;
      left: 50%; top: 50%;
      width: 2px;
      translate: -50% -50%;
      background: #e6437d;
      animation: bar 4s calc(@i * 50ms) infinite;
    }
    @keyframes say {
      0%, 10% { color: transparent; }
      15% { color: #111; }
    }
    @keyframes bar {
      0%, 10% { height: 0; }
      2.5% { height: @r(.4em, 1.2em); }
      5% { height: @r(.2em, .8em); }
      7.5% { height: @r(.4em, 1.2em); }
    }
  `,
    { attrs: { cells: '#cd-cells-voice::letters' }, frame: 'free', parent: voice.parentElement! },
  );
  stage.say('Functions in @keyframes: every letter has bars of its own');
  return () => stage.dispose();
};

export default mount;
