// Control panel for the 3D text example: text input, depth and bevel sliders
import { h } from '@/ui/dom.ts';

export interface TextOptions {
  text: string;
  depth: number;
  bevelEnabled: boolean;
  bevelThickness: number;
  bevelSize: number;
  bevelSegments: number;
}

export function buildPanel(initial: TextOptions, onChange: (o: TextOptions) => void): HTMLElement {
  const state = { ...initial };
  const fire = (): void => onChange({ ...state });

  const text = h('input', { type: 'text', value: state.text, maxlength: '14' });
  text.addEventListener('input', () => {
    state.text = text.value;
    fire();
  });

  const bevel = h('input', { type: 'checkbox' });
  bevel.checked = state.bevelEnabled;
  bevel.addEventListener('change', () => {
    state.bevelEnabled = bevel.checked;
    fire();
  });

  const slider = (
    label: string,
    key: 'depth' | 'bevelThickness' | 'bevelSize' | 'bevelSegments',
    min: number,
    max: number,
    step: number,
  ): HTMLElement => {
    const out = h('output', {}, String(state[key]));
    const input = h('input', { type: 'range', min: String(min), max: String(max), step: String(step), value: String(state[key]) });
    input.addEventListener('input', () => {
      state[key] = Number(input.value);
      out.textContent = input.value;
      fire();
    });
    return h('label', {}, `${label} `, input, ' ', out);
  };

  return h(
    'div',
    { class: 'panel' },
    h('label', {}, 'Text (A-Z, 0-9, space ! .) ', text),
    slider('depth', 'depth', 0.05, 1, 0.05),
    h('label', {}, bevel, ' bevelEnabled'),
    slider('bevelThickness', 'bevelThickness', 0, 0.06, 0.005),
    slider('bevelSize', 'bevelSize', 0, 0.04, 0.005),
    slider('bevelSegments', 'bevelSegments', 1, 8, 1),
  );
}
