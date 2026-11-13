// Layout modal dialog: a button grows into a dialog and back, using layout ids across the root boundary
import { createLayout } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const ITEMS = [
  { id: 'A', ms: 500 },
  { id: 'B', ms: 1000 },
  { id: 'C', ms: 2000 },
];

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = preview ? 'stage small' : 'stage';
  const grid = document.createElement('div');
  grid.className = 'grid';

  ITEMS.forEach(({ id, ms }) => {
    const b = document.createElement('button');
    b.className = 'item';
    b.dataset.layoutId = id;
    b.dataset.duration = String(ms);
    const h2 = document.createElement('h2');
    h2.dataset.layoutId = `${id}-title`;
    h2.textContent = `Item ${id}`;
    const h3 = document.createElement('h3');
    h3.dataset.layoutId = `${id}-duration`;
    h3.textContent = `(${ms}ms)`;
    const p = document.createElement('p');
    p.textContent = 'Hidden in the grid, visible inside the dialog. Its position and opacity are animated automatically.';
    b.append(h2, h3, p);
    grid.append(b);
  });

  // The dialog stays inside the example (shown with show(), not showModal()), so it never covers the gallery.
  const dialog = document.createElement('dialog');
  dialog.className = 'dialog';
  stage.append(grid, dialog);
  const status = document.createElement('div');
  status.className = 'label';
  status.textContent = 'Click an item. The duration comes from its data-duration.';
  el.append(stage);
  if (!preview) el.append(status);

  const buttons = Array.from(grid.querySelectorAll<HTMLElement>('.item'));

  // The dialog is the root; its contents are not there yet, so every animated child is named.
  const modalLayout = createLayout(dialog, {
    children: ['.item', 'h2', 'h3', 'p'],
    properties: ['--overlay-alpha'],
  });

  const closeModal = (): void => {
    if (!dialog.open) return;
    modalLayout.update(() => {
      dialog.close();
      const open = buttons.find((b) => b.classList.contains('is-open'));
      if (open) open.classList.remove('is-open');
    });
    status.textContent = 'Closed.';
  };

  const openModal = (item: HTMLElement): void => {
    if (dialog.open) return;
    const clone = item.cloneNode(true) as HTMLElement;
    dialog.replaceChildren(clone);
    const duration = Number(item.dataset.duration);
    modalLayout.update(() => {
      dialog.show();
      item.classList.add('is-open');
    }, { duration });
    status.textContent = `Opened ${item.dataset.layoutId} with duration ${duration}ms. Click the dialog to close.`;
  };

  const ac = new AbortController();
  buttons.forEach((b) => b.addEventListener('click', () => openModal(b), { signal: ac.signal }));
  dialog.addEventListener('click', closeModal, { signal: ac.signal });

  let timer = 0;
  if (preview) {
    let i = 0;
    let isOpen = false;
    timer = window.setInterval(() => {
      if (isOpen) closeModal();
      else openModal(buttons[i++ % buttons.length] as HTMLElement);
      isOpen = !isOpen;
    }, 1700);
    openModal(buttons[i++] as HTMLElement);
    isOpen = true;
  }

  return () => {
    window.clearInterval(timer);
    ac.abort();
    modalLayout.revert();
  };
};

export default mount;
