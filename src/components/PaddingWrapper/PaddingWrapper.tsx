
import { cx } from '@/Utils/utils';
import React from 'react';

interface PaddingWrapperProps extends React.HTMLProps<HTMLDivElement> {
  // You can customize padding here if needed
  paddingClasses?: string;
}

const PaddingWrapper: React.FC<PaddingWrapperProps> = ({ paddingClasses = 'p-4 md:p-6 2xl:p-0', className = '', ...props }) => {
  const classes = cx(paddingClasses, className, "w-full max-w-[1250px]");
  return (
    <div className={classes} {...props}>
      {props.children}
    </div>
  );
};

export default PaddingWrapper;