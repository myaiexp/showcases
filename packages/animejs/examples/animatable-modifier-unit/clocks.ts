// DOM for the modifier/unit demo: two labelled clock faces inside a hover area
export const buildClocks = (el: HTMLElement, preview: boolean): { area: HTMLElement; clocks: HTMLElement[] } => {
  const area = document.createElement('div');
  area.className = 'area';
  const clocks: HTMLElement[] = [];
  for (const name of ['snapped', 'inverted']) {
    const col = document.createElement('div');
    col.className = 'col';
    const clock = document.createElement('div');
    clock.className = 'clock';
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = name === 'snapped' ? (preview ? 'snap(PI / 10)' : 'modifier: utils.snap(PI / 10)') : preview ? 'v => -v' : 'modifier: v => -v';
    col.append(clock, label);
    area.append(col);
    clocks.push(clock);
  }
  el.append(area);
  if (!preview) {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Move the pointer over the clocks to steer the angle; otherwise a sweep drives it.';
    el.append(hint);
  }
  return { area, clocks };
};
