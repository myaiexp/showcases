// Pick a status and watch Wretch route it to the matching handler
import type { Mount } from '@/types.ts';
import { createLog } from './log.ts';
import { STATUSES, send } from './send.ts';
import './style.css';

const mount: Mount = (el, { preview, signal }) => {
  const root = document.createElement('div');
  root.className = preview ? 'root preview' : 'root';
  el.append(root);
  const box = document.createElement('div');
  box.className = 'log';
  const log = createLog(box);

  if (preview) {
    // Canned transcript for a 404; nothing executes.
    log.add('requesting... server will respond 404', 'dim');
    log.add('404: .notFound() handler fired', 'warn');
    root.append(box);
    return () => undefined;
  }

  const row = document.createElement('div');
  row.className = 'row';
  const select = document.createElement('select');
  select.className = 'select';
  select.setAttribute('aria-label', 'server responds with');
  for (const [code, label] of STATUSES) {
    const opt = document.createElement('option');
    opt.value = String(code);
    opt.textContent = label;
    select.append(opt);
  }
  const button = document.createElement('button');
  button.className = 'btn';
  button.textContent = 'Send request';
  row.append(select, button);
  log.add('Idle.');
  root.append(row, box);

  button.addEventListener('click', () => void send(Number(select.value), log, signal));
  return () => undefined;
};

export default mount;
