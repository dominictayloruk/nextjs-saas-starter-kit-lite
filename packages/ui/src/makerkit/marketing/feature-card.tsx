import React from 'react';

import { cn } from '../../lib/utils';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../shadcn/card';

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  description: string;
  image?: React.ReactNode;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  className,
  label,
  description,
  image,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'dark:ring-primary/10 rounded-3xl p-2 ring-2 ring-gray-100',
        className,
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{label}</CardTitle>
        <CardDescription className="text-muted-foreground max-w-xs text-sm font-semibold tracking-tight">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {image}
        {children}
      </CardContent>
    </div>
  );
};
