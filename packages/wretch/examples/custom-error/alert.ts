// An alert box with the error's code and message
export interface AlertBox {
  show(code: number, message: string, status: number): void;
  hide(): void;
}

export function alertBox(parent: HTMLElement): AlertBox {
  const box = document.createElement('div');
  box.className = 'alert';
  const code = document.createElement('div');
  code.className = 'alert-code';
  const text = document.createElement('div');
  box.append(code, text);
  parent.append(box);
  const hide = (): void => {
    box.dataset['on'] = 'no';
    code.textContent = 'No error yet';
    text.textContent = '';
  };
  hide();
  return {
    hide,
    show(c, message, status) {
      box.dataset['on'] = 'yes';
      code.textContent = `error.code ${c}  ·  HTTP ${status}`;
      text.textContent = message;
      box.animate([{ transform: 'translateX(-4px)' }, { transform: 'none' }], { duration: 250 });
    },
  };
}
