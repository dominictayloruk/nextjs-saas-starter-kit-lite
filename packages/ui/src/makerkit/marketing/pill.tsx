import { Slot, Slottable } from '@radix-ui/react-slot';

import { cn } from '../../lib/utils';

export const Pill: React.FC<
  React.HTMLAttributes<HTMLHeadingElement> & {
    label?: string;
    asChild?: boolean;
  }
> = function PillComponent({ className, asChild, ...props }) {
  const Comp = asChild ? Slot : 'h3';

  return (
    <Comp
      className={cn(
        'dark:border-primary/10 space-x-2.5 rounded-full border border-gray-100 px-2 py-2.5 text-center text-sm font-medium text-transparent',
        className,
      )}
      {...props}
    >
      {props.label && (
        <span
          className={
            'bg-primary text-primary-foreground rounded-2xl px-2.5 py-1.5 text-sm font-semibold'
          }
        >
          {props.label}
        </span>
      )}
      <Slottable>
        <span className={'text-secondary-foreground'}>{props.children}</span>
      </Slottable>
    </Comp>
  );
};
