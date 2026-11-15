// One compile, two renders: the SVG and the ASCII art of one diagram
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const source = `LangUnits: {
  RegexVal: {
    ds
  }
  SQLSelect: {
    ds
  }
  PythonTr: {
    ds
  }
  langunit: {
    "... ds"
  }
}

LangUnits <- ExperimentHost.Dataset: "load dataset"
Dataset UI -> LangUnits: "manage datasets"

Dataset UI

ExperimentHost: {
  Experiment
  Dataset
}
ExperimentHost.Experiment -> Experiment

Experiment.ModelConfigurations
Experiment.LangUnit

Experiment.ModelConfigurations -> ModelConfiguration

ModelConfiguration.Prompting
ModelConfiguration.Model
ModelConfiguration.LangUnit`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  try {
    const d2 = await stage.d2();
    // The ASCII renderer scales down an ELK layout, so the SVG uses ELK too for comparison.
    const result = await d2.compile(source, { layout: 'elk', themeID: 200, pad: 24 });
    const svg = await d2.render(result.diagram, result.renderOptions);
    const ascii = await d2.render(result.diagram, { ...result.renderOptions, ascii: true });

    if (stage.preview) {
      let showAscii = false;
      const flip = (): void => {
        if (showAscii) stage.showText(ascii);
        else stage.show(svg);
        stage.say(showAscii ? 'render(diagram, { ascii: true })' : 'render(diagram): SVG');
        showAscii = !showAscii;
      };
      flip();
      stage.every(3500, flip);
    } else {
      stage.show(svg);
      const panel = stage.side('The same diagram, render(diagram, { ascii: true })');
      const pre = document.createElement('pre');
      pre.className = 'dd-pre';
      pre.textContent = ascii;
      panel?.append(pre);
      stage.say('Left: SVG. Right: ASCII from the same compiled diagram.');
    }
  } catch (err) {
    stage.fail(err);
  }
  return () => stage.dispose();
};

export default mount;
