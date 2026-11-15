/** @jsxImportSource @antv/infographic */
// Banner: a coloured title band drawn from data.title, items in a row below
import type { BaseStructureProps, ComponentType, JSXElement } from '@antv/infographic';
import { FlexLayout, getElementBounds, getThemeColors, Group, ItemsGroup, Rect, Text } from '@antv/infographic';

export interface BannerProps extends BaseStructureProps {
  gap?: number;
}

export const Banner: ComponentType<BannerProps> = (props) => {
  const { Item, data, options, gap = 14 } = props;
  const { title, desc, items = [] } = data;
  const colors = getThemeColors({}, options);
  const itemBounds = getElementBounds(<Item indexes={[0]} data={data} datum={items[0]} positionH="center" />);
  const rowWidth = Math.max(items.length * (itemBounds.width + gap) - gap, 240);

  const itemElements: JSXElement[] = [];
  items.forEach((datum, index) => {
    itemElements.push(
      <Item indexes={[index]} datum={datum} data={data} x={index * (itemBounds.width + gap)} y={96} positionH="center" />,
    );
  });

  return (
    <FlexLayout id="infographic-container" flexDirection="column" justifyContent="center" alignItems="center">
      <Group>
        {/* The title is drawn here, not through the Title prop. */}
        <Rect width={rowWidth} height={78} rx={12} fill={colors.colorPrimary} />
        <Text x={16} y={8} width={rowWidth - 32} height={36} fontSize={26} fontWeight="bold" fill={colors.colorPrimaryText} alignVertical="middle">
          {title}
        </Text>
        <Text x={16} y={44} width={rowWidth - 32} height={24} fontSize={15} fill={colors.colorPrimaryText} alignVertical="middle">
          {desc}
        </Text>
        <ItemsGroup>{itemElements}</ItemsGroup>
      </Group>
    </FlexLayout>
  );
};
