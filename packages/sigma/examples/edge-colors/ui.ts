// Button row that lets the reader pick one of several options
export interface Picker {
  select(index: number): void;
  readonly root: HTMLElement;
}

export function makePicker(options: string[], onPick: (index: number) => void): Picker {
  const root = document.createElement('div');
  root.className = 'controls';
  const buttons = options.map((text, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = text;
    button.addEventListener('click', () => onPick(index));
    root.append(button);
    return button;
  });
  return {
    root,
    select(index) {
      buttons.forEach((b, i) => b.classList.toggle('active', i === index));
    },
  };
}
