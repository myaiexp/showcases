// Observer: wheel, touch and drag gestures on a box step through full-size sections
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import type { Mount } from "@/types.ts";
import "./style.css";

gsap.registerPlugin(Observer);

const TITLES = ["Wheel", "Swipe", "Drag", "Observer"];

const mount: Mount = (el, { preview }) => {
  const box = document.createElement("div");
  box.className = "box";
  const sections = TITLES.map((t, i) => {
    const s = document.createElement("div");
    s.className = "panel";
    s.style.setProperty("--hue", String(i * 70 + 200));
    s.textContent = t;
    box.append(s);
    return s;
  });
  el.append(box);

  const readout = document.createElement("p");
  readout.className = "readout";
  let current = 0;
  let animating = false;
  let observer: Observer | undefined;
  let move: gsap.core.Timeline | undefined;

  const ctx = gsap.context((self) => {
    gsap.set(sections, { yPercent: (i: number) => (i === 0 ? 0 : 100) });

    // direction 1 = next (content moves up), -1 = previous
    self.add("goTo", (index: number, direction: 1 | -1) => {
      const next = (index + sections.length) % sections.length;
      animating = true;
      // Each step is a new timeline, so keep it out of the context and kill it by hand.
      self.ignore(() => {
        move?.kill();
        move = gsap
          .timeline({
            defaults: { duration: 0.7, ease: "power2.inOut" },
            onComplete: () => (animating = false),
          })
          .to(sections[current] ?? "", { yPercent: -100 * direction }, 0)
          .fromTo(
            sections[next] ?? "",
            { yPercent: 100 * direction },
            { yPercent: 0 },
            0,
          );
      });
      current = next;
    });

    self.add("observe", (tolerance: number) => {
      observer?.kill();
      observer = Observer.create({
        target: box,
        type: "wheel,touch,pointer",
        wheelSpeed: -1, // wheel down gives onUp, matching a drag upward
        tolerance,
        preventDefault: true, // stop the page from scrolling while the pointer is over the box
        onUp: () => !animating && ctx.goTo(current + 1, 1),
        onDown: () => !animating && ctx.goTo(current - 1, -1),
        onChangeY: (o) => {
          readout.textContent = `tolerance ${tolerance}px   deltaY ${Math.round(o.deltaY)}   velocityY ${Math.round(o.velocityY)} px/s`;
        },
      });
    });
    // The preview card has no pointer input, so it only gets the self-playing loop.
    if (!preview) self.observe(30);

    if (preview) {
      // One repeating tween drives the loop; a fresh delayedCall per round would be recorded each time.
      const step = (): void => {
        if (!animating) ctx.goTo(current + 1, 1);
      };
      gsap.delayedCall(1, step);
      gsap.to({}, { duration: 1.6, delay: 1, repeat: -1, onRepeat: step });
    }
  }, el);

  if (!preview) {
    const bar = document.createElement("div");
    bar.className = "bar";
    const label = document.createElement("label");
    const range = document.createElement("input");
    range.type = "range";
    range.min = "0";
    range.max = "150";
    range.step = "5";
    range.value = "30";
    const val = document.createElement("span");
    val.textContent = " tolerance: 30px";
    range.addEventListener("input", () => {
      val.textContent = ` tolerance: ${range.value}px`;
      ctx.observe(Number(range.value));
    });
    label.append(range, val);
    bar.append(label);
    el.append(bar, readout);
    readout.textContent =
      "Use the mouse wheel, swipe, or drag up and down inside the box.";
  }

  return () => {
    observer?.kill();
    move?.kill();
    ctx.revert();
  };
};

export default mount;
