// Views of one C4 model: suspend all, then unsuspend a view with globs
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';
import { model } from './model.ts';

// Show only the connections to and from the API application.
const apiView = `**: suspend
(** -> **)[*]: suspend

(** -> **)[*]: unsuspend {
  &src: internet_banking_system.api_app
}
(** -> **)[*]: unsuspend {
  &dst: internet_banking_system.api_app
}
internet_banking_system.label.near: bottom-center`;

// Show only root-level shapes, plus three summary connections.
const overview = `**: suspend
(** -> **)[*]: suspend

# Only show root level shapes
**: unsuspend {
  &level: 0
}
# Only show connections between root level things
(** -> **)[*]: unsuspend {
  &src.level: 0
  &dst.level: 0
}

customer -> internet_banking_system: Send requests
internet_banking_system -> mainframe: API calls
internet_banking_system -> email_system: Send emails`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      { label: 'View for the API team: &src / &dst filters', code: `${model}\n\n${apiView}` },
      { label: 'High-level overview: &level: 0 filters', code: `${model}\n\n${overview}` },
    ],
  });
  return () => stage.dispose();
};

export default mount;
