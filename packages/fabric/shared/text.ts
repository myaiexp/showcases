// Text examples: ink colours, a bar text field, a card value cycler, selection
//
// Text traps found against fabric 7.4.0 (add to this list):
// - A card can draw an IText caret or selection without entering editing: `isEditing = true`
//   plus selectionStart/End, then render (showSelection). No textarea, no focus.
// - setSelectionStart/End fire selection:changed without editing; insertChars/removeChars fire
//   nothing (text:changed needs a real edit).
// - A font that loads after the text was made repaints glyphs but keeps cached widths and the
//   bitmap: cache.clearFontCache(family), initDimensions(), dirty = true.
// - `superscript`/`subscript` defaults are one shared object: assign a new one, never mutate.
// - set('fontSize', '60') works, but set('left', '120') keeps the string ('120' + 40 = '12040').
// - Textbox.set('width', n) below the longest word is raised to dynamicMinWidth.
// - setSelectionStyles that change sizes need initDimensions(). `direction` and `pathAlign` are
//   marked experimental in the source; textDecorationColor/Thickness are only in the CHANGELOG.
import type { IText } from 'fabric';
import type { Stage } from './stage.ts';

export const INK = '#2b2a33';
export const RED = '#e94b3c';
export const BLUE = '#3b7dd8';
export const GREEN = '#2e9e5b';
export const GOLD = '#d99a1c';

/** A text input that reports each keystroke as a string. */
export function textField(
  bar: HTMLElement,
  label: string,
  value: string,
  onInput: (v: string) => void,
  width = 180,
): HTMLInputElement {
  const wrap = document.createElement('label');
  wrap.style.cssText = 'display:flex;gap:6px;align-items:center;font-size:13px';
  const input = document.createElement('input');
  input.type = 'text';
  input.value = value;
  input.style.cssText = `width:${width}px;font:inherit;padding:2px 6px`;
  input.addEventListener('input', () => onInput(input.value));
  wrap.append(label, input);
  bar.append(wrap);
  return input;
}

/** Steps through `values` on a timer (cards), calling `apply` with each; the first is applied at once. */
export function cycle<T>(stage: Stage, values: readonly T[], ms: number, apply: (v: T, i: number) => void): void {
  let i = 0;
  apply(values[0]!, 0);
  stage.every(ms, () => {
    i = (i + 1) % values.length;
    apply(values[i]!, i);
  });
}

/**
 * Cards only: draws an IText's caret (start === end) or selection without entering editing, so no
 * hidden textarea is created and nothing takes focus. Pair it with `hideSelection` on dispose.
 */
export function showSelection(text: IText, start: number, end: number): void {
  text.isEditing = true;
  text.selectionStart = start;
  text.selectionEnd = end;
  text.canvas?.requestRenderAll();
}

export function hideSelection(text: IText): void {
  text.isEditing = false;
}
