/** @jsxImportSource @antv/infographic */
// IconChip: a round icon beside a label, mirrored when positionH is flipped
import type { BaseItemProps, ComponentType } from '@antv/infographic';
import { FlexLayout, getItemProps, Group, ItemIconCircle, ItemLabel, Rect } from '@antv/infographic';

export interface IconChipProps extends BaseItemProps {
  width?: number;
}

export const IconChip: ComponentType<IconChipProps> = (props) => {
  const [{ indexes, datum, themeColors, width = 180, positionH = 'normal' }, restProps] = getItemProps(props, ['width']);
  const size = 44;
  const flipped = positionH === 'flipped';

  const icon = (
    <ItemIconCircle indexes={indexes} size={size} fill={themeColors.colorPrimary} colorBg={themeColors.colorBg} />
  );
  const label = (
    <ItemLabel
      indexes={indexes}
      width={width - size - 12}
      height={size}
      alignHorizontal={flipped ? 'right' : 'left'}
      alignVertical="middle"
      fill={themeColors.colorText}
    >
      {datum.label}
    </ItemLabel>
  );

  return (
    <Group {...restProps}>
      <Rect width={width} height={size} rx={size / 2} fill={themeColors.colorPrimaryBg} opacity={0.35} />
      {/* row-reverse puts the icon last: the mirrored design. */}
      <FlexLayout flexDirection={flipped ? 'row-reverse' : 'row'} gap={12} alignItems="center" width={width} height={size}>
        {icon}
        {label}
      </FlexLayout>
    </Group>
  );
};
