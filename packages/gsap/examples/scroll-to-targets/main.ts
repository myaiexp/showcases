// ScrollToPlugin: animate a box's scroll position to an element, a pixel value or "max"
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import type { Mount } from "@/types.ts";
import "./style.css";

gsap.registerPlugin(ScrollToPlugin);

const NAMES = ["Alpha", "Beta", "Gamma", "Delta"];

const mount: Mount = (el, { preview }) => {
  const scroller = document.createElement("div");
  scroller.className = "scroller";
  const sections: HTMLElement[] = NAMES.map((name, i) => {
    const s = document.createElement("section");
    s.className = "section";
    s.style.setProperty("--hue", String(i * 80 + 150));
    s.textContent = name;
    scroller.append(s);
    return s;
  });
  el.append(scroller);

  const readout = document.createElement("p");
  readout.className = "readout";
  let offsetY = 0;
  let autoKill = true;
  let scrollTween: gsap.core.Tween | undefined;

  const ctx = gsap.context((self) => {
    const go = (y: number | string | Element, label: string): void => {
      readout.textContent = `scrollTo: ${label}`;
      // Each call is a new tween; keep it out of the context and replace the last one by hand.
      self.ignore(() => {
        scrollTween?.kill();
        scrollTween = gsap.to(scroller, {
          duration: 1.2,
          ease: "power2.inOut",
          scrollTo: {
            y,
            offsetY,
            autoKill,
            onAutoKill: () =>
              (readout.textContent =
                "autoKill: you scrolled, so the tween stopped"),
          },
        });
      });
    };
    self.add("toSection", (i: number) =>
      go(sections[i] ?? 0, `{ y: section ${i + 1}, offsetY: ${offsetY} }`),
    );
    self.add("toPixel", () => go(250, "{ y: 250 }"));
    self.add("toMax", () => go("max", '{ y: "max" }'));
    self.add("toTop", () => go(0, "{ y: 0 }"));

    if (preview) {
      let i = 0;
      const next = (): void => {
        const j = i++ % 6;
        if (j < 4) ctx.toSection((j + 1) % 4);
        else if (j === 4) ctx.toMax();
        else ctx.toTop();
      };
      // One repeating tween drives the loop; a fresh delayedCall per round would be recorded each time.
      gsap.delayedCall(0.6, next);
      gsap.to({}, { duration: 1.6, delay: 0.6, repeat: -1, onRepeat: next });
    }
  }, el);

  if (!preview) {
    const bar = document.createElement("div");
    bar.className = "bar";
    const btn = (text: string, fn: () => void): void => {
      const b = document.createElement("button");
      b.className = "btn";
      b.textContent = text;
      b.addEventListener("click", fn);
      bar.append(b);
    };
    NAMES.forEach((n, i) => btn(n, () => ctx.toSection(i)));
    btn("250px", () => ctx.toPixel());
    btn('"max"', () => ctx.toMax());
    btn("top", () => ctx.toTop());

    const opts = document.createElement("div");
    opts.className = "bar";
    const lab1 = document.createElement("label");
    const off = document.createElement("input");
    off.type = "range";
    off.min = "0";
    off.max = "60";
    off.value = "0";
    const offVal = document.createElement("span");
    offVal.textContent = " offsetY: 0";
    off.addEventListener("input", () => {
      offsetY = Number(off.value);
      offVal.textContent = ` offsetY: ${offsetY}`;
    });
    lab1.append(off, offVal);
    const lab2 = document.createElement("label");
    const ak = document.createElement("input");
    ak.type = "checkbox";
    ak.checked = true;
    ak.addEventListener("change", () => (autoKill = ak.checked));
    lab2.append(ak, " autoKill");
    opts.append(lab1, lab2);
    el.append(bar, opts, readout);
    readout.textContent =
      "Click a button, then try scrolling the box mid-tween.";
  }

  return () => {
    scrollTween?.kill();
    ctx.revert();
  };
};

export default mount;
