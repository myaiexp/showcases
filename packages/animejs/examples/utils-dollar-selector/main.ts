// utils.$() selecting document-wide and inside a createScope root, with a live count readout
import { createScope, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const rows = [0, 1].map(() => {
    const row = document.createElement('div');
    row.className = 'row';
    for (let i = 0; i < 8; i++) {
      const sq = document.createElement('div');
      sq.className = 'dollar-sq';
      row.append(sq);
    }
    return row;
  });
  const stage = document.createElement('div');
  stage.className = 'stage';
  stage.append(...rows);
  el.append(stage);

  const readout = document.createElement('pre');
  readout.className = 'readout';
  if (!preview) el.append(readout);

  // One scope rooted on row 2: inside it, utils.$() queries that root instead of the document
  const scope = createScope({ root: rows[1] });
  let on = false;
  const pulse = (): void => {
    on = !on;
    // Document-wide: every .dollar-sq on the page
    const all = utils.$('.dollar-sq');
    all.forEach(($sq) => utils.set($sq, { scale: on ? 0.6 : 1 }));
    let scoped = 0;
    scope.add(() => {
      const inRoot = utils.$('.dollar-sq');
      scoped = inRoot.length;
      inRoot.forEach(($sq) => utils.set($sq, { rotate: on ? 45 : 0 }));
    });
    readout.textContent = `utils.$('.dollar-sq').length  -> ${all.length}  (scale ${on ? 0.6 : 1})\n`
      + `inside scope root row 2        -> ${scoped}  (rotate ${on ? 45 : 0})`;
  };

  pulse();
  const timer = window.setInterval(pulse, preview ? 900 : 1200);

  return () => {
    window.clearInterval(timer);
    scope.revert();
  };
};

export default mount;
