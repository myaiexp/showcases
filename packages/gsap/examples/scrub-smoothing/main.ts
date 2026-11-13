// ScrollTrigger scrub: a box inside a scroller drives a tween, with true vs a smoothing number
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const mount: Mount = (el, { preview }) => {
  const scroller = document.createElement('div');
  scroller.className = 'scroller';
  const content = document.createElement('div');
  content.className = 'content';
  const stage = document.createElement('div');
  stage.className = 'stage';
  const ball = document.createElement('div');
  ball.className = 'ball';
  stage.append(ball);
  content.append(stage);
  scroller.append(content);
  el.append(scroller);

  const readout = document.createElement('p');
  readout.className = 'readout';

  let tween: gsap.core.Tween | undefined;
  let scrubLabel = 'true';
  const show = (): void => {
    const sp = tween?.scrollTrigger?.progress ?? 0;
    const ap = tween?.progress() ?? 0;
    readout.textContent = `scrub: ${scrubLabel}   scroll ${(sp * 100).toFixed(0)}%   animation ${(ap * 100).toFixed(0)}%`;
  };

  const ctx = gsap.context((self) => {
    // The tween is linked to the scrollbar of `scroller`; `scrub` decides how tightly.
    self.add('build', (scrub: boolean | number) => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
      scrubLabel = String(scrub);
      tween = gsap.fromTo(
        ball,
        { x: 0, rotation: 0 },
        {
          x: () => stage.clientWidth - ball.offsetWidth,
          rotation: 360,
          ease: 'none',
          onUpdate: show,
          scrollTrigger: {
            scroller,
            trigger: content,
            start: 'top top',
            end: 'bottom bottom',
            scrub,
            markers: !preview,
            invalidateOnRefresh: true,
            onUpdate: show,
          },
        },
      );
    });
    self.build(preview ? 1 : true);

    if (preview) {
      gsap.to(scroller, {
        scrollTo: { y: 'max' },
        duration: 3,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.4,
      });
    }
  }, el);

  if (!preview) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    const label = document.createElement('label');
    label.textContent = 'scrub ';
    const select = document.createElement('select');
    for (const v of ['true', '0.5', '1', '2']) {
      const o = document.createElement('option');
      o.value = v;
      o.textContent = v;
      select.append(o);
    }
    select.addEventListener('change', () => {
      const v = select.value === 'true' ? true : Number(select.value);
      ctx.build(v);
    });
    label.append(select);
    bar.append(label);
    el.append(bar, readout);
    readout.textContent = 'Scroll the box. scrub: true is locked to the scrollbar; a number lets the tween catch up.';
  }

  return () => {
    ctx.revert();
  };
};

export default mount;
