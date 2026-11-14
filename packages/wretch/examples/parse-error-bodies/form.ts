// A sign-up form: the typed values, a banner, and a message under each field
export interface SignupForm {
  fill(email: string, password: string): void;
  /** Shows a failed sign-up: the banner text and a note under the fields that have one. */
  fail(banner: string, fields?: Record<string, string>): void;
  reset(): void;
}

const div = (cls: string, text = ''): HTMLDivElement => {
  const d = document.createElement('div');
  d.className = cls;
  d.textContent = text;
  return d;
};

export function signupForm(parent: HTMLElement): SignupForm {
  const el = div('form');
  const banner = div('banner');
  const rows = (['email', 'password'] as const).map((name) => {
    const row = div('field');
    const val = div('val');
    const err = div('err');
    row.append(div('lab', name), val, err);
    return { name, row, val, err };
  });
  el.append(banner, ...rows.map((r) => r.row));
  parent.append(el);
  const reset = (): void => {
    banner.textContent = 'Create your account';
    banner.dataset['bad'] = 'no';
    for (const r of rows) {
      r.err.textContent = '';
      r.row.dataset['bad'] = 'no';
    }
  };
  reset();
  return {
    reset,
    fill(email, password) {
      reset();
      rows[0]!.val.textContent = email;
      rows[1]!.val.textContent = '•'.repeat(password.length);
    },
    fail(text, fields = {}) {
      banner.textContent = text;
      banner.dataset['bad'] = 'yes';
      banner.animate([{ transform: 'translateX(-4px)' }, { transform: 'none' }], { duration: 250 });
      for (const r of rows) {
        const note = fields[r.name];
        r.err.textContent = note ?? '';
        r.row.dataset['bad'] = note ? 'yes' : 'no';
      }
    },
  };
}
