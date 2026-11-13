// MotionPathHelper.editPath: drag anchors and handles of an SVG path while a marker keeps following it
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { MotionPathHelper } from 'gsap/MotionPathHelper';
import { btn, h } from '../../shared/ui.ts';
import type { Mount } from '@/types.ts';
import './style.css';

// MotionPathHelper requires MotionPathPlugin: both are registered.
gsap.registerPlugin(MotionPathPlugin, MotionPathHelper);

const NS = 'http://www.w3.org/2000/svg';
const START_D = 'M8,102 C15,83 58,25 131,24 206,24 233,63 259,91 292,125 328,155 377,155 464,155 497,97 504,74';

const mount: Mount = (el, { preview }) => {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '-20 0 557 190');
  svg.setAttribute('class', 'stage');
  const path = document.createElementNS(NS, 'path');
  path.setAttribute('d', START_D);
  path.setAttribute('class', 'track');
  const marker = document.createElementNS(NS, 'polygon');
  marker.setAttribute('points', '-12,-9 12,0 -12,9 -7,0');
  marker.setAttribute('class', 'marker');
  svg.append(path, marker);
  el.append(svg);

  let follow: gsap.core.Tween | undefined;
  // A new tween per release (made outside any context, killed by handle) so the marker
  // takes the edited curve: motionPath reads the path again when a tween is created.
  const run = (): void => {
    follow?.kill();
    follow = gsap.to(marker, {
      motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true },
      duration: 4,
      ease: 'power1.inOut',
      repeat: -1,
      repeatDelay: 0.4,
    });
  };
  run();

  let editor: ReturnType<typeof MotionPathHelper.editPath> | undefined;
  let readout: HTMLElement | undefined;
  if (!preview) {
    readout = h('code', 'readout', `d="${START_D}"`);
    const tips = h('p', 'tips');
    tips.textContent =
      'Drag anchors and handles, or drag the path itself. ALT-click the path to add a point, ALT-click an anchor to toggle smooth/corner, select an anchor and press DELETE to remove it, CTRL-Z undoes.';
    const bar = h('div', 'controls');
    btn('Reset path', () => {
      path.setAttribute('d', START_D);
      // update(true) re-reads the path data; it exists at runtime but not in gsap's typings, hence the narrow cast
      (editor as unknown as { update(readPath?: boolean): void } | undefined)?.update(true);
      readout!.textContent = `d="${START_D}"`;
      run();
    }, bar);
    el.append(readout, tips, bar);

    editor = MotionPathHelper.editPath(path as unknown as Element, {
      selected: true,
      draggable: true,
      handleSize: 7,
      onPress: () => follow?.pause(),
      onRelease: () => {
        readout!.textContent = `d="${path.getAttribute('d')}"`;
        run();
      },
      onDeleteAnchor: () => {
        readout!.textContent = `d="${path.getAttribute('d')}"`;
        run();
      },
    });
  }

  return () => {
    follow?.kill();
    // kill() removes the editing handles from the DOM
    editor?.kill();
  };
};

export default mount;
