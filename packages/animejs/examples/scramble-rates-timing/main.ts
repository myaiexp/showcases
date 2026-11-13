// scrambleText timing: revealRate, settleRate, settleDuration and revealDelay sliders
import { animate, scrambleText } from 'animejs';
import type { Mount } from '@/types.ts';
import { button, controlRow, slider } from './ui.ts';
import './style.css';

const PRESETS = [
  { revealRate: 20, settleRate: 8, settleDuration: 900, revealDelay: 0 },
  { revealRate: 60, settleRate: 30, settleDuration: 300, revealDelay: 0 },
  { revealRate: 140, settleRate: 60, settleDuration: 150, revealDelay: 400 },
];

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const p = document.createElement('p');
  p.className = 'text';
  p.textContent = 'Slow reveals feel deliberate, fast ones feel mechanical.';
  stage.append(p);
  el.append(stage);

  const params = { ...PRESETS[1]! };
  const readout = document.createElement('div');
  readout.className = 'readout';
  let anim: ReturnType<typeof animate> | undefined;
  const play = (): void => {
    anim?.revert();
    anim = animate(p, { innerHTML: scrambleText({ ...params, cursor: '_' }) });
    readout.textContent = `computed duration: ${Math.round(anim.duration)} ms`;
  };

  let timer = 0;
  if (preview) {
    let n = 0;
    Object.assign(params, PRESETS[0]);
    play();
    timer = window.setInterval(() => {
      n += 1;
      Object.assign(params, PRESETS[n % PRESETS.length]);
      play();
    }, 4200);
  } else {
    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.style.flexDirection = 'column';
    el.append(controls);
    slider(controls, 'revealRate (chars/s)', { min: 5, max: 200, step: 5, value: params.revealRate }, (v) => { params.revealRate = v; });
    slider(controls, 'settleRate (flickers/s)', { min: 1, max: 80, step: 1, value: params.settleRate }, (v) => { params.settleRate = v; });
    slider(controls, 'settleDuration (ms)', { min: 50, max: 1500, step: 50, value: params.settleDuration }, (v) => { params.settleDuration = v; });
    slider(controls, 'revealDelay (ms)', { min: 0, max: 2000, step: 100, value: params.revealDelay }, (v) => { params.revealDelay = v; });
    const row = controlRow(el);
    button(row, 'Play', play);
    el.append(readout);
    play();
  }

  return () => {
    window.clearInterval(timer);
    anim?.revert();
    el.replaceChildren();
  };
};

export default mount;
