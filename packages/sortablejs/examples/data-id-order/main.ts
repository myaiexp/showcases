// A lesson outline: dataIdAttr picks the attribute toArray() reads for the saved order
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const LESSONS = [
  { id: 'les_4f2a', title: 'Welcome' },
  { id: 'les_91c0', title: 'Install the tools' },
  { id: 'les_77be', title: 'Your first page' },
  { id: 'les_c3d8', title: 'Styling basics' },
  { id: 'les_0a65', title: 'Publish it' },
];

const mount: Mount = (el, { preview, signal }) => {
  const wrap = document.createElement('div');
  wrap.className = 'outline';
  wrap.innerHTML = '<ul class="lessons"></ul><div class="payload"><small>Sent to the server</small><pre></pre></div>';
  const list = wrap.querySelector<HTMLUListElement>('ul')!;
  const pre = wrap.querySelector('pre')!;
  for (const l of LESSONS) {
    const li = document.createElement('li');
    li.className = 'lesson';
    li.dataset['lessonId'] = l.id; // the id lives here, not in data-id
    li.innerHTML = '<span class="title"></span><code></code>';
    li.querySelector('.title')!.textContent = l.title;
    li.querySelector('code')!.textContent = l.id;
    list.append(li);
  }
  el.append(wrap);
  el.classList.toggle('compact', preview);

  const sortable = Sortable.create(list, {
    animation: 150,
    ghostClass: 'ghost',
    dataIdAttr: 'data-lesson-id', // toArray() will read this attribute from each item
    onSort: show, // fires on every change to the order
  });
  function show(): void {
    pre.textContent = `PUT /course/order\n${JSON.stringify(sortable.toArray())}`;
  }
  show();

  if (preview) {
    loopDrive(el, signal, async (hand) => {
      await hand.drag(list.lastElementChild!, { el: list.children[1]!, fy: 0.3 }, 1);
    }, 0.9);
  } else {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Drag lessons around: the request body on the right is what your app would save.';
    el.append(hint);
  }

  return () => release(sortable);
};

export default mount;
