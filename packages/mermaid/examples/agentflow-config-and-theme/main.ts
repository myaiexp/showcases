// Agentflow: v12 defaults vs the previous look, the agentflow config block, container stroke and ELK layout
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// One body reused by the appearance and config variants so only the settings differ.
const BODY = `agentflow-beta TB
  brief["Release brief"]@{ shape: input }
  flow writer["Drafting Agent"]
    draft["Draft the notes"]@{ shape: task }
    lookup["changelog_search"]@{ shape: tool }
    guide["Tone of voice"]@{ shape: refdoc }
    draft --> lookup
    draft -.- guide
  end
  flow reviewer["Review Agent"]
    check["Check the claims"]@{ shape: task }
    ok["Accurate?"]@{ shape: decision }
    check --> ok
  end
  publish["Publish"]@{ shape: action }
  brief --> writer
  writer --> reviewer
  ok --> publish`;

// This gallery sets theme: dark site-wide, which outranks a diagram type's own default, so the
// v12 defaults are named in frontmatter: redux-color theme, neo look, ELK layout.
const DEFAULTS = `---
config:
  theme: redux-color
  look: neo
  layout: elk
---
${BODY}`;

// The previous appearance: default theme, classic look, dagre layout.
const PREVIOUS = `---
config:
  theme: default
  look: classic
  layout: dagre
---
${BODY}`;

// The agentflow namespace tunes spacing and padding without moving flowcharts on the same page.
const SPACING = `---
config:
  theme: redux-color
  agentflow:
    nodeSpacing: 90
    rankSpacing: 80
    diagramPadding: 24
---
${BODY}`;

// flowContainerStroke colours container borders; everything else follows the node and edge variables.
const STROKE = `---
config:
  theme: base
  themeVariables:
    flowContainerStroke: "#f472b6"
    primaryColor: "#1e293b"
    primaryTextColor: "#f8fafc"
    lineColor: "#94a3b8"
---
${BODY}`;

// A container can name its own ELK algorithm; rectpacking tiles its children into a compact block.
const ALGORITHM = `---
config:
  layout: elk
---
agentflow-beta TB
  flow tools["Tools"]
    a["search"]@{ shape: tool }
    b["fetch"]@{ shape: tool }
    c["summarise"]@{ shape: tool }
    d["translate"]@{ shape: tool }
    e["cite"]@{ shape: tool }
    f["publish"]@{ shape: tool }
  end
  tools@{ algorithm: "elk.rectpacking" }`;

// Metadata can span lines (YAML). label overrides the node text; keys Mermaid does not act on,
// like retry, are carried through untouched.
const METADATA = `agentflow-beta LR
  fetch["fetch"]@{
    shape: tool
    label: "fetch_report"
    params: "city :: String"
    returns: "Report"
    retry: 2
  }
  summarise["summarise"]@{
    shape: task
    model: "claude-sonnet-4-20250514"
  }
  out["Report"]@{ shape: action }

  fetch --> summarise --> out`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'v12 defaults', code: DEFAULTS },
      { label: 'Previous appearance', code: PREVIOUS },
      { label: 'Spacing config', code: SPACING },
      { label: 'Container stroke', code: STROKE },
      { label: 'Container ELK algorithm', code: ALGORITHM },
      { label: 'Multi-line metadata', code: METADATA },
    ],
  });

export default mount;
