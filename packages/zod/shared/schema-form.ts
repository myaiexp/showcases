// Metadata kit: a small form drawn from field descriptions or a JSON Schema
import './schema-form.css';
import type { Stage } from './stage.ts';

export interface FormField {
  key: string;
  label: string;
  required?: boolean;
  kind?: 'text' | 'email' | 'url' | 'number' | 'date' | 'checkbox' | 'select' | 'password';
  options?: readonly string[];
  placeholder?: string;
  /** Help text under the field. */
  help?: string;
  /** A rule in few words, e.g. "3 to 20 characters". */
  hint?: string;
  value?: string;
  min?: number;
  max?: number;
}

export interface FormView {
  el: HTMLElement;
  rows: ReadonlyMap<string, HTMLElement>;
  inputs: ReadonlyMap<string, HTMLInputElement | HTMLSelectElement>;
  /** Puts text in a field (checkbox: "true"). */
  set(key: string, text: string): void;
  /** Marks one field (or none) as the one being looked at. */
  focus(key: string | null): void;
  /** Writes an error under a field, or clears it with null. */
  error(key: string, message: string | null): void;
}

export function formView(parent: HTMLElement, stage: Stage, fields: readonly FormField[]): FormView {
  const el = document.createElement('div');
  el.className = 'zd-form';
  const rows = new Map<string, HTMLElement>();
  const inputs = new Map<string, HTMLInputElement | HTMLSelectElement>();
  for (const f of fields) {
    const row = document.createElement('label');
    row.className = 'zd-form-row';
    const label = document.createElement('span');
    label.className = 'zd-form-label';
    label.textContent = f.label;
    if (f.required) {
      const star = document.createElement('b');
      star.textContent = ' *';
      label.append(star);
    }
    let input: HTMLInputElement | HTMLSelectElement;
    if (f.kind === 'select') {
      input = document.createElement('select');
      for (const o of f.options ?? []) input.add(new Option(o, o));
      if (f.value) input.value = f.value;
    } else {
      input = document.createElement('input');
      input.type = f.kind ?? 'text';
      input.placeholder = f.placeholder ?? '';
      input.value = f.value ?? '';
      if (f.kind === 'checkbox') input.checked = f.value === 'true';
      if (f.min !== undefined) input.min = String(f.min);
      if (f.max !== undefined) input.max = String(f.max);
      input.spellcheck = false;
    }
    input.className = 'zd-form-input';
    if (stage.preview) input.tabIndex = -1;
    const side = document.createElement('div');
    side.className = 'zd-form-side';
    for (const [cls, text] of [['zd-form-hint', f.hint], ['zd-form-help', f.help]] as const) {
      if (!text) continue;
      const s = document.createElement('span');
      s.className = cls;
      s.textContent = text;
      side.append(s);
    }
    const err = document.createElement('span');
    err.className = 'zd-form-err';
    side.append(err);
    row.append(label, input, side);
    el.append(row);
    rows.set(f.key, row);
    inputs.set(f.key, input);
  }
  parent.append(el);
  return {
    el,
    rows,
    inputs,
    set(key, text) {
      const i = inputs.get(key);
      if (!i) return;
      if (i instanceof HTMLInputElement && i.type === 'checkbox') i.checked = text === 'true';
      else i.value = text;
    },
    focus(key) {
      for (const [k, r] of rows) {
        if (k === key) r.dataset['on'] = 'true';
        else delete r.dataset['on'];
      }
    },
    error(key, message) {
      const row = rows.get(key);
      if (!row) return;
      row.querySelector<HTMLElement>('.zd-form-err')!.textContent = message ?? '';
      if (message) row.dataset['bad'] = 'true';
      else delete row.dataset['bad'];
    },
  };
}

type Json = Record<string, any>;

const FORMATS: Record<string, FormField['kind']> = { email: 'email', uri: 'url', date: 'date' };

function rule(p: Json): string | undefined {
  const bits: string[] = [];
  if (p['minLength'] !== undefined && p['maxLength'] !== undefined) bits.push(`${p['minLength']} to ${p['maxLength']} characters`);
  else if (p['minLength'] !== undefined) bits.push(`at least ${p['minLength']} characters`);
  else if (p['maxLength'] !== undefined) bits.push(`up to ${p['maxLength']} characters`);
  if (p['type'] === 'integer') bits.push('whole number');
  const lo = p['minimum'] ?? p['exclusiveMinimum'];
  const hi = p['maximum'] ?? p['exclusiveMaximum'];
  if (typeof lo === 'number' && lo > -1e9) bits.push(`from ${lo}`);
  if (typeof hi === 'number' && hi < 1e9) bits.push(`up to ${hi}`);
  return bits.length ? bits.join(', ') : undefined;
}

/** Reads a JSON Schema's top-level properties and describes one form field for each. */
export function fieldsFromJsonSchema(schema: Json): FormField[] {
  const required = new Set<string>(schema['required'] ?? []);
  return Object.entries<Json>(schema['properties'] ?? {}).map(([key, p]) => {
    const kind: FormField['kind'] = p['enum']
      ? 'select'
      : p['type'] === 'boolean'
        ? 'checkbox'
        : p['type'] === 'integer' || p['type'] === 'number'
          ? 'number'
          : (FORMATS[p['format']] ?? 'text');
    const words = key.replace(/([A-Z])/g, ' $1').toLowerCase();
    return {
      key,
      label: p['title'] ?? words.charAt(0).toUpperCase() + words.slice(1),
      required: required.has(key),
      kind,
      options: p['enum'],
      placeholder: p['examples']?.[0] === undefined ? undefined : String(p['examples'][0]),
      help: p['description'],
      hint: rule(p),
      value: p['default'] === undefined ? undefined : String(p['default']),
      min: typeof p['minimum'] === 'number' && p['minimum'] > -1e9 ? p['minimum'] : undefined,
      max: typeof p['maximum'] === 'number' && p['maximum'] < 1e9 ? p['maximum'] : undefined,
    };
  });
}
