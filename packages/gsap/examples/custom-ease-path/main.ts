// Paste an SVG path or cubic-bezier into CustomEase.create(), see its curve via getSVGData() and a ball using it
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(CustomEase);

const NS = 'http://www.w3.org/2000/svg';
const PRESETS: Record<string, string> = {
  hop: 'M0,0 C0,0 0.056,0.442 0.175,0.442 0.294,0.442 0.332,0 0.332,0 0.332,0 0.414,1 0.671,1 0.991,1 1,0 1,0',
  'cubic-bezier': '.17,.67,.83,.67',
  'drawn curve': 'M0,0,C0.126,0.382,0.282,0.674,0.44,0.822,0.632,1.002,0.818,1.001,1,1',
};
const GW = 160; // graph size in px
const GH = 120;

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `-10 -10 ${GW + 20} ${GH + 20}`);
  const frame = document.createElementNS(NS, 'rect');
  frame.setAttribute('width', String(GW));
  frame.setAttribute('height', String(GH));
  frame.setAttribute('class', 'frame');
  const curve = document.createElementNS(NS, 'path');
  curve.setAttribute('class', 'curve');
  svg.append(frame, curve);
  const lane = document.createElement('div');
  lane.className = 'lane';
  const ball = document.createElement('div');
  ball.className = 'ball';
  lane.append(ball);
  stage.append(svg, lane);
  el.append(stage);

  const status = document.createElement('p');
  status.className = 'status';
  let tween: gsap.core.Tween | undefined;

  const ctx = gsap.context(() => {});
  const apply = (data: string): void => {
    try {
      CustomEase.create('mine', data);
      // getSVGData() turns the ease into path data at the size we ask for.
      curve.setAttribute('d', CustomEase.getSVGData('mine', { width: GW, height: GH }));
      status.textContent = 'CustomEase.create("mine", data)';
    } catch {
      status.textContent = 'Could not parse that data.';
      return;
    }
    tween?.kill();
    ctx.add(() => {
      tween = gsap.fromTo(ball, { y: 0 }, { y: -(lane.clientHeight - 24), duration: 1.6, ease: 'mine', repeat: -1, repeatDelay: 0.5 });
    });
  };
  apply(PRESETS['hop'] ?? '');

  if (!preview) {
    const select = document.createElement('select');
    for (const name of Object.keys(PRESETS)) select.append(new Option(name, name));
    const area = document.createElement('textarea');
    area.value = PRESETS['hop'] ?? '';
    area.rows = 3;
    area.spellcheck = false;
    select.addEventListener('change', () => {
      area.value = PRESETS[select.value] ?? '';
      apply(area.value);
    });
    area.addEventListener('change', () => apply(area.value));
    el.append(select, area, status);
  }

  return () => {
    tween?.kill();
    ctx.revert();
  };
};

export default mount;
