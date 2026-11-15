// Scenarios: a hotfix scenario inherits the base and restyles parts
import type { Mount } from '@/types.ts';
import { icons } from '../../shared/icons.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

// The docs' icons.d2lang.com icons are swapped for icons made in code, so nothing is fetched.
const source = `direction: right

title: {
  label: Normal deployment
  near: bottom-center
  shape: text
  style.font-size: 40
  style.underline: true
}

local: {
  code: {
    icon: "${icons.code}"
  }
}
local.code -> github.dev: commit

github: {
  icon: "${icons.gear}"
  dev
  master: {
    workflows
  }

  dev -> master.workflows: merge trigger
}

github.master.workflows -> aws.builders: upload and run

aws: {
  builders -> s3: upload binaries
  ec2 <- s3: pull binaries

  builders: {
    icon: "${icons.gear}"
  }
  s3: {
    icon: "${icons.database}"
  }
  ec2: {
    icon: "${icons.server}"
  }
}

local.code -> aws.ec2: {
  style.opacity: 0.0
}

scenarios: {
  hotfix: {
    title.label: Hotfix deployment
    (local.code -> github.dev)[0].style: {
      stroke: "#ca052b"
      opacity: 0.1
    }

    github: {
      dev: {
        style.opacity: 0.1
      }
      master: {
        workflows: {
          style.opacity: 0.1
        }
        style.opacity: 0.1
      }

      (dev -> master.workflows)[0].style.opacity: 0.1
      style.opacity: 0.1
      style.fill: "#ca052b"
    }

    (github.master.workflows -> aws.builders)[0].style.opacity: 0.1

    (local.code -> aws.ec2)[0]: {
      style.opacity: 1
      style.stroke-dash: 5
      style.stroke: "#167c3c"
    }
  }
}`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Base and hotfix scenario, animated',
        code: source,
        options: { target: '*', animateInterval: 1600 },
      },
      { label: 'The base board', code: source },
      { label: "target: 'scenarios.hotfix'", code: source, options: { target: 'scenarios.hotfix' } },
    ],
  });
  return () => stage.dispose();
};

export default mount;
