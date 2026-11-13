// containerAnimation: ScrollTriggers inside a horizontal strip that vertical scrolling slides sideways
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { Mount } from '@/types.ts';
import { check, h } from '../../shared/ui.ts';
import './style.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const NAMES = ['one', 'two', 'three', 'four'];

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const scroller = h('div', 'scroller', '', wrap);
  const stage = h('div', 'stage', '', scroller);
  const track = h('div', 'track', '', stage);
  const panels = NAMES.map((name) => {
    const panel = h('div', 'panel', '', track);
    h('div', 'chip', name, panel);
    return panel;
  });
  const readout = h('p', 'readout', '', wrap);

  let slide: gsap.core.Tween | undefined;
  const chipTweens: gsap.core.Tween[] = [];

  const show = (): void => {
    const on = panels.filter((p) => p.classList.contains('active')).length;
    const pct = Math.round((slide?.scrollTrigger?.progress ?? 0) * 100);
    readout.textContent = `strip ${pct}%   panels inside their start..end window: ${on}`;
  };

  const ctx = gsap.context(() => {
    const build = (ease: string): void => {
      for (const tw of chipTweens) tw.scrollTrigger?.kill();
      slide?.scrollTrigger?.kill();
      chipTweens.length = 0;

      // The horizontal move is driven by vertical scroll. Its ease must be linear.
      slide = gsap.to(track, {
        xPercent: -75,
        ease,
        scrollTrigger: {
          scroller,
          trigger: stage,
          pin: true,
          scrub: true,
          start: 'top top',
          end: '+=1200',
          onUpdate: show,
        },
      });
      // Each panel's trigger watches the slide, not the scrollbar, so "left 85%" means
      // "when the panel's left edge reaches 85% across the scroller".
      for (const panel of panels) {
        const chip = panel.firstElementChild;
        if (!chip) continue;
        chipTweens.push(
          gsap.fromTo(
            chip,
            { scale: 0.4, rotation: -20 },
            {
              scale: 1,
              rotation: 0,
              ease: 'none',
              scrollTrigger: {
                scroller,
                trigger: panel,
                containerAnimation: slide,
                start: 'left 85%',
                end: 'left 35%',
                scrub: true,
                toggleClass: 'active',
                // The slide's onUpdate runs before these triggers toggle, so recount here too.
                onToggle: show,
              },
            },
          ),
        );
      }
      show();
    };
    build('none');

    if (!preview) {
      const bar = h('div', 'bar', '', wrap);
      check('power2.inOut ease on the slide (the docs say it must be linear)', (on) => ctx.add(() => build(on ? 'power2.inOut' : 'none')), bar);
    } else {
      gsap.to(scroller, { scrollTo: { y: 'max' }, duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true, repeatDelay: 0.3 });
    }
  }, el);

  return () => ctx.revert();
};

export default mount;
