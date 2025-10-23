import { Slot, Slottable } from '@radix-ui/react-slot';

import { cn } from '../../lib/utils';

export const GradientSecondaryText: React.FC<
  React.HTMLAttributes<HTMLSpanElement> & {
    asChild?: boolean;
  }
> = function GradientSecondaryTextComponent({ className, ...props }) {
  const Comp = props.asChild ? Slot : 'span';

  return (
    <Comp
      className={cn(
        'from-foreground/50 to-foreground bg-gradient-to-r bg-clip-text text-transparent',
        className,
      )}
      {...props}
    >
      <Slottable>{props.children}</Slottable>
    </Comp>
  );
};
