// DOM helper: a labelled range slider with a live value readout
import { h } from '@/ui/dom.ts';

export interface SliderSpec {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onInput: (value: number) => void;
}

export function slider(spec: SliderSpec): HTMLElement {
  const input = h('input', {
    type: 'range',
    min: String(spec.min),
    max: String(spec.max),
    step: String(spec.step),
    value: String(spec.value),
  });
  const readout = h('output', {}, spec.value.toFixed(2));
  input.addEventListener('input', () => {
    const v = Number(input.value);
    readout.textContent = v.toFixed(2);
    spec.onInput(v);
  });
  return h('label', { class: 'row' }, h('span', {}, spec.label), input, readout);
}
