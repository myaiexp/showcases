// DOM helpers for the loop example: a lane with a circle, and the settings controls
export interface Settings {
  loop: number | boolean;
  alternate: boolean;
  reversed: boolean;
  loopDelay: number;
}

export const buildLane = (text: string) => {
  const root = document.createElement('div');
  root.className = 'lane';
  const label = document.createElement('span');
  label.className = 'label';
  label.textContent = text;
  const track = document.createElement('div');
  track.className = 'track';
  const circle = document.createElement('div');
  circle.className = 'circle';
  track.append(circle);
  root.append(label, track);
  return { root, label, circle };
};

const loopChoices: { text: string; value: number | boolean }[] = [
  { text: '0', value: 0 },
  { text: '1', value: 1 },
  { text: '3', value: 3 },
  { text: 'true', value: true },
];

export const buildControls = (onChange: (s: Settings) => void) => {
  const root = document.createElement('div');
  root.className = 'controls';

  const field = (text: string, input: HTMLElement): void => {
    const wrap = document.createElement('label');
    wrap.className = 'field';
    const span = document.createElement('span');
    span.textContent = text;
    wrap.append(span, input);
    root.append(wrap);
  };

  const loop = document.createElement('select');
  loopChoices.forEach((c, i) => {
    const o = document.createElement('option');
    o.value = String(i);
    o.textContent = c.text;
    loop.append(o);
  });
  loop.value = '2';
  const alternate = document.createElement('input');
  alternate.type = 'checkbox';
  const reversed = document.createElement('input');
  reversed.type = 'checkbox';
  const delay = document.createElement('input');
  delay.type = 'range';
  delay.min = '0';
  delay.max = '1500';
  delay.step = '100';
  delay.value = '400';
  const delayText = document.createElement('output');

  field('loop', loop);
  field('alternate', alternate);
  field('reversed', reversed);
  field('loopDelay', delay);
  root.append(delayText);

  const read = (): Settings => {
    delayText.textContent = `${delay.value} ms`;
    return {
      loop: loopChoices[+loop.value]?.value ?? 0,
      alternate: alternate.checked,
      reversed: reversed.checked,
      loopDelay: +delay.value,
    };
  };
  const handler = (): void => onChange(read());
  const inputs = [loop, alternate, reversed, delay];
  inputs.forEach((i) => i.addEventListener('input', handler));
  return { root, read, dispose: () => inputs.forEach((i) => i.removeEventListener('input', handler)) };
};
