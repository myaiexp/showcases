// A share dialog that wipes open and shut: exit() values become enter()'s starting point
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import { viewStage } from '../../shared/view.ts';

const CSS = `
.app{position:relative;height:min(250px,100vh - 16px)}
.photo{height:100%;border-radius:14px;background:linear-gradient(150deg,#0f2027,#2c5364 50%,#56d39c);display:flex;align-items:flex-end;justify-content:space-between;padding:12px;color:#fff;font-size:13px}
.scrim{position:absolute;inset:0;border-radius:14px;background:rgba(0,0,0,.45)}
.dialog{position:absolute;left:24px;right:24px;top:50%;margin-top:-62px;height:124px;border-radius:14px;background:var(--bg-raised);border:1px solid var(--border);padding:14px;display:flex;flex-direction:column;gap:8px}
.dialog b{font-size:14px}
.targets{display:flex;gap:8px}
.targets i{flex:1;height:34px;border-radius:8px;background:var(--bg-surface);border:1px solid var(--border)}
.dialog button{align-self:flex-end}
`;

const mount: Mount = async (el, { preview, signal }) => {
  const stage = await viewStage(el, { preview, signal, css: CSS });
  const { animateView } = stage.Motion;
  const photo = stage.doc.createElement('div');
  photo.className = 'photo';
  const label = stage.doc.createElement('span');
  label.textContent = 'Northern lights';
  const share = stage.doc.createElement('button');
  share.textContent = 'Share';
  photo.append(label, share);
  stage.app.append(photo);
  let origin = 'inset(50%)';

  const isOpen = (): boolean => stage.app.querySelector('.dialog') !== null;
  const toggle = (): void => {
    const open = !isOpen();
    const update = (): void => {
      if (open) {
        // Static markup, no user text: safe to write as HTML.
        stage.app.insertAdjacentHTML('beforeend', `<div class="scrim"></div><div class="dialog"><b>Share this photo</b>
          <div class="targets"><i></i><i></i><i></i></div><button class="close">Done</button></div>`);
        stage.app.querySelector('.close')?.addEventListener('click', toggle);
      } else {
        stage.app.querySelector('.scrim')?.remove();
        stage.app.querySelector('.dialog')?.remove();
      }
    };
    animateView(update, { duration: 0.45, ease: 'easeInOut' })
      .add('.scrim').exit({ opacity: 0 }).enter({ opacity: 1 })
      // exit() is the shape it leaves with; the same shape is where enter() starts from.
      .add('.dialog').exit({ clipPath: origin }).enter({ clipPath: 'inset(0%)' });
  };
  share.addEventListener('click', toggle);

  if (preview) {
    stage.every(toggle, 1.6, 0.8);
    return () => stage.dispose();
  }
  const p = panel(el);
  p.select('Wipe from', ['centre', 'top', 'left'] as const, 'centre', (v) => {
    origin = { centre: 'inset(50%)', top: 'inset(0% 0% 100% 0%)', left: 'inset(0% 100% 0% 0%)' }[v];
  });
  hint(el, 'Press Share, then Done. The dialog is added to and removed from the DOM; exit({ clipPath }) is mirrored as enter\'s starting value, so one value drives both directions.');
  return () => {
    stage.dispose();
    p.dispose();
  };
};

export default mount;
