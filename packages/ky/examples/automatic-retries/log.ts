// Append-only coloured log helper for the retry demo
export interface Log {
  add(text: string, cls?: 'ok' | 'warn' | 'dim'): void;
  clear(): void;
}

export function createLog(box: HTMLElement): Log {
  return {
    add(text, cls = 'dim') {
      const line = document.createElement('span');
      line.className = `line ${cls}`;
      line.textContent = text;
      box.append(line);
    },
    clear() {
      box.replaceChildren();
    },
  };
}
