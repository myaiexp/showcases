// Controller parameters: addParameter, removeParameter, getParameter().defaultValue and the live value
import type { Mount } from '@/types.ts';
import { controllerFor } from '../../shared/anim-kit.ts';
import { button, slider } from '../../shared/controls.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, clipOf, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, engine, root, gltf, animator, say } = r;
  const { controller, states, machine } = controllerFor(engine, animator, [clipOf(gltf, 'Walk')]);
  machine.addEntryStateTransition(states.Walk!);
  controller.addParameter('speed', 0);
  controller.addParameter('armed', true);
  animator.getParameter('speed').defaultValue = 1;
  let step = 0;
  tick(root, (_dt, t) => {
    if (stage.preview && Math.floor(t / 1.5) !== step) {
      step = Math.floor(t / 1.5);
      if (step % 2) controller.removeParameter('armed');
      else controller.addParameter('armed', true);
    }
    const lines = controller.parameters.map((p) => `${p.name}: default ${String(p.defaultValue)}, value ${String(animator.getParameterValue(p.name))}`);
    say(`parameters (${controller.parameters.length})\n${lines.join('\n')}`);
  });
  if (!stage.preview) {
    slider(stage.bar, 'speed', 0, 10, 0.1, 1, (v) => animator.setParameterValue('speed', v));
    button(stage.bar, 'removeParameter("armed")', () => controller.getParameter('armed') && controller.removeParameter('armed'));
    button(stage.bar, 'addParameter("armed", true)', () => !controller.getParameter('armed') && controller.addParameter('armed', true));
  }
  return stage.dispose;
};

export default mount;
