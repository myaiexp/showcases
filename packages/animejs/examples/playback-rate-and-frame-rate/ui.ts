// DOM helper: one lane with a circle, a value readout and an optional slider
export const buildLane = (title: string, hint: string, min: number, max: number, step: number, start: number) => {
  const root = document.createElement('div');
  root.className = 'lane';
  const head = document.createElement('div');
  head.className = 'head';
  const label = document.createElement('span');
  label.className = 'label';
  label.textContent = hint ? `${title} (${hint})` : title;
  const value = document.createElement('span');
  value.className = 'value';
  head.append(label, value);
  const track = document.createElement('div');
  track.className = 'track';
  const circle = document.createElement('div');
  circle.className = 'circle';
  track.append(circle);
  const input = document.createElement('input');
  input.type = 'range';
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(start);
  root.append(head, track);
  if (hint) root.append(input);
  return { root, circle, value, input };
};
