import React from 'react';
import { cn } from '../../../lib/cn';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
export default Container;
