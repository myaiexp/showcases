/** @jsxImportSource @antv/infographic */
// AdaptiveCard: stacks icon, label, desc and value, skipping any that are absent
import type { BaseItemProps, ComponentType } from '@antv/infographic';
import { FlexLayout, getElementBounds, getItemProps, Group, ItemDesc, ItemIcon, ItemLabel, ItemValue, Rect } from '@antv/infographic';

export interface AdaptiveCardProps extends BaseItemProps {
  width?: number;
}

export const AdaptiveCard: ComponentType<AdaptiveCardProps> = (props) => {
  const [{ indexes, datum, themeColors, width = 150 }, restProps] = getItemProps(props, ['width']);
  const pad = 12;
  const inner = width - pad * 2;
  const { icon, label, desc, value } = datum;

  const content = (
    <FlexLayout x={pad} y={pad} flexDirection="column" gap={6}>
      {icon ? <ItemIcon indexes={indexes} size={32} fill={themeColors.colorPrimary} /> : null}
      {label ? (
        <ItemLabel indexes={indexes} width={inner} fill={themeColors.colorText}>
          {label}
        </ItemLabel>
      ) : null}
      {desc ? (
        <ItemDesc indexes={indexes} width={inner} fill={themeColors.colorTextSecondary}>
          {desc}
        </ItemDesc>
      ) : null}
      {typeof value === 'number' ? (
        <ItemValue indexes={indexes} value={value} fontSize={26} fill={themeColors.colorPrimary} />
      ) : null}
    </FlexLayout>
  );
  const bounds = getElementBounds(content);

  return (
    <Group {...restProps}>
      <Rect width={width} height={bounds.height + pad * 2} rx={10} fill={themeColors.colorBgElevated} stroke={themeColors.colorPrimary} strokeOpacity={0.5} />
      {content}
    </Group>
  );
};
