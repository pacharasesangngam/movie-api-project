import type { CSSProperties, ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const Layout = ({ children, className = '', style }: LayoutProps) => {
  return (
    <div
      className={`w-full min-h-screen pb-12 ${className}`}
      style={{ paddingInline: '40px', ...style }}
    >
      {children}
    </div>
  );
};

export default Layout;
