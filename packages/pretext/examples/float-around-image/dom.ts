// Sample article and a labelled range-input helper for the float example
export const ARTICLE =
  'A printed page rarely sets its text in one long rectangle. A photograph sits in a corner and the paragraph bends around it, each line a little shorter for as long as the picture is beside it. Browsers do that with a float. Here the same effect is routed by hand: every row asks Pretext for one line at the width that row has left, and the cursor from the line just laid out becomes the start of the next. Because the text was measured once, moving or resizing the box costs only arithmetic, so the paragraph can reflow on every frame while you drag a slider. Nothing here reads the DOM to find out where a line ended.';

export type Field = { label: HTMLLabelElement; value: () => number };

export function field(name: string, min: number, max: number, init: number, step: number): Field {
  const input = document.createElement('input');
  input.type = 'range';
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(init);
  const label = document.createElement('label');
  label.append(`${name} `, input);
  return { label, value: () => Number(input.value) };
}
