// CustomBounce makes a bounce ease and a matching squash ease; sliders rebuild them and redraw both curves
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { CustomBounce } from 'gsap/CustomBounce';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(CustomEase, CustomBounce);

const NS = 'http://www.w3.org/2000/svg';
const GW = 120;
const GH = 90;

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const floor = document.createElement('div');
  floor.className = 'floor';
  const ball = document.createElement('div');
  ball.className = 'ball';
  floor.append(ball);
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `-4 -4 ${GW + 8} ${GH + 8}`);
  const bounceCurve = document.createElementNS(NS, 'path');
  bounceCurve.setAttribute('class', 'curve');
  const squashCurve = document.createElementNS(NS, 'path');
  squashCurve.setAttribute('class', 'curve squash');
  svg.append(bounceCurve, squashCurve);
  stage.append(floor);
  if (!preview) stage.append(svg);
  el.append(stage);

  const cfg = { strength: 0.6, squash: 3, endAtStart: false };
  let tl: gsap.core.Timeline | undefined;
  const ctx = gsap.context(() => {});

  const rebuild = (): void => {
    // One call creates two eases: "cbsquash-drop" for position and "cbsquash-drop-squash" for scale.
    CustomBounce.create('cbsquash-drop', { strength: cfg.strength, squash: cfg.squash, squashID: 'cbsquash-drop-squash', endAtStart: cfg.endAtStart });
    bounceCurve.setAttribute('d', CustomEase.getSVGData('cbsquash-drop', { width: GW, height: GH }));
    squashCurve.setAttribute('d', CustomEase.getSVGData('cbsquash-drop-squash', { width: GW, height: GH }));
    tl?.kill();
    ctx.add(() => {
      gsap.set(ball, { clearProps: 'all' });
      const height = Math.min(150, floor.clientHeight - 30);
      tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
      // Default ease ends at the target, so fall from above. With endAtStart the ease also ends
      // where it began, so leap up from the ground with to() and land back at rest.
      if (cfg.endAtStart) tl.to(ball, { y: -height, duration: 2.2, ease: 'cbsquash-drop' }, 0);
      else tl.from(ball, { y: -height, duration: 2.2, ease: 'cbsquash-drop' }, 0);
      tl.to(ball, { scaleX: 1.4, scaleY: 0.6, duration: 2.2, ease: 'cbsquash-drop-squash', transformOrigin: 'center bottom' }, 0);
    });
  };
  rebuild();

  if (!preview) {
    const slider = (name: string, min: number, max: number, step: number, key: 'strength' | 'squash'): HTMLElement => {
      const label = document.createElement('label');
      const out = document.createElement('span');
      const input = document.createElement('input');
      input.type = 'range';
      input.min = String(min);
      input.max = String(max);
      input.step = String(step);
      input.value = String(cfg[key]);
      out.textContent = ` ${cfg[key]}`;
      input.addEventListener('input', () => {
        cfg[key] = Number(input.value);
        out.textContent = ` ${cfg[key]}`;
        rebuild();
      });
      label.append(`${name} `, input, out);
      return label;
    };
    const endBox = document.createElement('input');
    endBox.type = 'checkbox';
    endBox.addEventListener('change', () => {
      cfg.endAtStart = endBox.checked;
      rebuild();
    });
    const endLabel = document.createElement('label');
    endLabel.append(endBox, 'endAtStart');
    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.append(slider('strength', 0.1, 0.95, 0.05, 'strength'), slider('squash', 0, 6, 0.5, 'squash'), endLabel);
    el.append(controls);
  }

  return () => {
    tl?.kill();
    ctx.revert();
  };
};

export default mount;
