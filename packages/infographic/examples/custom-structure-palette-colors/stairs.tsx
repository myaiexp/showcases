/** @jsxImportSource @antv/infographic */
// Stairs: items rise left to right, each coloured from the theme palette
import type { BaseStructureProps, ComponentType, JSXElement } from '@antv/infographic';
import { FlexLayout, getElementBounds, getPaletteColor, getThemeColors, Group, ItemsGroup } from '@antv/infographic';

export interface StairsProps extends BaseStructureProps {
  gap?: number;
  rise?: number;
}

export const Stairs: ComponentType<StairsProps> = (props) => {
  const { Title, Item, data, options, gap = 16, rise = 36 } = props;
  const { title, desc, items = [] } = data;
  const itemBounds = getElementBounds(<Item indexes={[0]} data={data} datum={items[0]} />);

  const itemElements: JSXElement[] = [];
  items.forEach((datum, index) => {
    // getPaletteColor takes the palette itself, the indexes and how many colours are needed.
    const color = getPaletteColor(options.themeConfig.palette, [index], items.length);
    itemElements.push(
      <Item
        indexes={[index]}
        datum={datum}
        data={data}
        x={index * (itemBounds.width + gap)}
        y={(items.length - 1 - index) * rise}
        themeColors={getThemeColors({ colorPrimary: color }, options)}
      />,
    );
  });

  return (
    <FlexLayout id="infographic-container" flexDirection="column" justifyContent="center" alignItems="center">
      {Title ? <Title title={title} desc={desc} /> : null}
      <Group>
        <ItemsGroup>{itemElements}</ItemsGroup>
      </Group>
    </FlexLayout>
  );
};
