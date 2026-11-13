// Pie chart whose slices follow sliders; the preview drifts the values on a timer
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { renderInto } from '../../shared/setup.ts';

const SLICES = ['Rent', 'Food', 'Transport', 'Savings', 'Fun'];

// What the generated definition looks like: `showData` prints each value after its label,
// and values must be positive numbers.
export const SAMPLE = `pie showData
    title Monthly budget
    "Rent" : 900
    "Food" : 350
    "Transport" : 120
    "Savings" : 400
    "Fun" : 180`;

const definition = (values: number[]): string =>
  `pie showData\n    title Monthly budget\n${SLICES.map((s, i) => `    "${s}" : ${values[i]}`).join('\n')}`;

const mount: Mount = (el, { preview, signal }) => {
  const values = [900, 350, 120, 400, 180];
  const box = diagramBox(el, preview);
  const report = preview ? () => undefined : statusLine(el);
  const sliders: HTMLInputElement[] = [];
  let ticket = 0;
  let timer = 0;
  let busy = false;
  let dirty = false;

  // Serialised: while a render is in flight, changes just mark the values dirty and one
  // more render runs afterwards with the latest numbers.
  const draw = async (): Promise<void> => {
    if (busy) {
      dirty = true;
      return;
    }
    busy = true;
    do {
      dirty = false;
      const mine = ++ticket;
      const staging = document.createElement('div');
      try {
        await renderInto(staging, definition(values), signal);
        if (mine === ticket && !signal.aborted) {
          box.replaceChildren(...staging.childNodes);
          report('Rendered as pie');
        }
      } catch (err) {
        if (!signal.aborted) report(err instanceof Error ? err.message : String(err), true);
      }
    } while (dirty && !signal.aborted);
    busy = false;
  };

  if (!preview) {
    const form = document.createElement('div');
    form.className = 'mm-row';
    SLICES.forEach((name, i) => {
      const label = document.createElement('label');
      label.textContent = `${name} `;
      const input = document.createElement('input');
      input.type = 'range';
      input.min = '1';
      input.max = '1000';
      input.value = String(values[i]);
      input.setAttribute('aria-label', name);
      input.addEventListener('input', () => {
        values[i] = Number(input.value);
        void draw();
      });
      sliders.push(input);
      label.append(input);
      form.append(label);
    });
    el.insertBefore(form, box);
  } else {
    // No input in a card: nudge each value by a random step every 1.2 s, kept positive.
    timer = window.setInterval(() => {
      for (let i = 0; i < values.length; i++) {
        values[i] = Math.max(40, Math.min(1000, values[i]! + Math.round((Math.random() - 0.5) * 300)));
      }
      void draw();
    }, 1200);
  }

  void draw();
  return () => {
    ticket++;
    clearInterval(timer);
  };
};

export default mount;
