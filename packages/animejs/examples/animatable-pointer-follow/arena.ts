// DOM for the pointer-follow demo: the arena, the circle and the x / y readouts
export const buildArena = (
  el: HTMLElement,
  preview: boolean,
): { area: HTMLElement; circle: HTMLElement; xOut: HTMLElement; yOut: HTMLElement } => {
  const area = document.createElement('div');
  area.className = 'area';
  const circle = document.createElement('div');
  circle.className = 'circle';
  area.append(circle);

  const readout = document.createElement('div');
  readout.className = 'readout';
  const pair = (name: string): HTMLElement => {
    const wrap = document.createElement('span');
    wrap.textContent = `${name} `;
    const v = document.createElement('b');
    v.textContent = '0.00';
    wrap.append(v);
    readout.append(wrap);
    return v;
  };
  const xOut = pair('x()');
  const yOut = pair('y()');

  const hint = document.createElement('p');
  hint.className = 'hint';
  hint.textContent = 'Move the pointer over the box. It also wanders on its own until you do.';

  el.append(area, readout);
  if (!preview) el.append(hint);
  return { area, circle, xOut, yOut };
};
