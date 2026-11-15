// Fixed joint: two boxes welded into one body, until the joint is removed
import { Vector3 } from '@zephyr3d/base';
import { Joint } from '@zephyr3d/scene';
import type { Mesh } from '@zephyr3d/scene';
import { button } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { BLUE, discard, dynBox, floor, launch, orbit, ORANGE, startPhysics, YELLOW } from '../../shared/phys-kit.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  floor(kit, 14, 8);
  const readout = stage.readout();

  let welded: Mesh[] = [];
  let loose: Mesh[] = [];
  let age = 0;
  let broken = false;
  const build = (): void => {
    for (const m of [...welded, ...loose]) discard(kit, m);
    age = 0;
    broken = false;
    // Welded pair: the joint sits on the first box and connectedBody names the other
    const a = dynBox(kit, new Vector3(1.4, 0.4, 0.4), new Vector3(-2.5, 4, 0), ORANGE, 2);
    const b = dynBox(kit, new Vector3(0.4, 1.4, 0.4), new Vector3(-2.0, 4.9, 0), YELLOW, 2);
    const weld = new Joint();
    weld.type = 'fixed';
    weld.connectedBody = b;
    a.physics!.joint = weld;
    welded = [a, b];
    // The same two boxes with no joint (a joint records the pair's pose when made: that is the weld)
    loose = [
      dynBox(kit, new Vector3(1.4, 0.4, 0.4), new Vector3(2.0, 4, 0), BLUE, 2),
      dynBox(kit, new Vector3(0.4, 1.4, 0.4), new Vector3(3.0, 4.9, 0), BLUE, 2),
    ];
  };
  // Removing the joint is how a weld "breaks": Rapier gives no joint forces to compare
  const snap = (): void => {
    welded[0]!.physics!.joint = null;
    broken = true;
  };
  build();

  kit.myApp.on('tick', (dtMs: number) => {
    age += dtMs / 1000;
    if (stage.preview && !broken && age > 3.5) snap();
    if (stage.preview && age > 7) build();
    const text = broken ? 'joint removed: the pieces part' : 'fixed joint: left pair moves as one';
    stage.caption(text);
    if (readout) readout.textContent = text;
  });

  if (stage.bar) {
    button(stage.bar, 'Break the weld', snap);
    button(stage.bar, 'Reset', build);
  }

  orbit(kit, new Vector3(0, 3.5, 9), new Vector3(0, 1.4, 0));
  launch(kit);
});
