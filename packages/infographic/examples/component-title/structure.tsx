/** @jsxImportSource @antv/infographic */
// A structure that draws the Title component itself, props from the design
import { FlexLayout, Group, ItemsGroup, Title, getElementBounds, getThemeColors, registerStructure } from '@antv/infographic';
import type { BaseStructureProps } from '@antv/infographic';

export const STRUCTURE = 'showcase-component-title';

interface TitleStructureProps extends BaseStructureProps {
  alignHorizontal?: 'left' | 'center' | 'right';
  titleWidth?: number;
  descLineNumber?: number;
}

const TitleRow = (props: TitleStructureProps) => {
  const { Item, data, options, alignHorizontal = 'center', titleWidth = 360, descLineNumber = 2 } = props;
  const { title, desc, items = [] } = data;
  // Title colours its text from themeColors: colorPrimaryText and colorTextSecondary.
  const themeColors = getThemeColors({ colorPrimary: options.themeConfig.colorPrimary ?? '#61DDAA', colorBg: options.themeConfig.colorBg ?? '#1f1f1f' }, options);
  const first = items[0];
  if (!first) return <Group />;
  const itemWidth = getElementBounds(<Item indexes={[0]} data={data} datum={first} />).width;
  return (
    <FlexLayout flexDirection="column" alignItems="center" gap={20}>
      <Title title={title} desc={desc} width={titleWidth} alignHorizontal={alignHorizontal} descLineNumber={descLineNumber} themeColors={themeColors} />
      <ItemsGroup>
        {items.map((datum, index) => (
          <Item indexes={[index]} datum={datum} data={data} x={index * (itemWidth + 20)} />
        ))}
      </ItemsGroup>
    </FlexLayout>
  );
};

registerStructure(STRUCTURE, { component: TitleRow as never, composites: ['title', 'item'] });
