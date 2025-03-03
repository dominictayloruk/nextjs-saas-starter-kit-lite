import { cn } from '../../lib/utils';
import { Button } from '../../shadcn/button';

export const CtaButton: React.FC<React.ComponentProps<typeof Button>> =
  function CtaButtonComponent({ className, children, ...props }) {
    return (
      <Button
        className={cn(
          'h-12 rounded-xl px-4 text-base font-semibold',
          className,
          {
            ['transition-all hover:shadow-2xl dark:shadow-primary/30']:
              props.variant === 'default' || !props.variant,
          },
        )}
        asChild
        {...props}
      >
        {children}
      </Button>
    );
  };
