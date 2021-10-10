import React, { ReactNode } from 'react';
import Link from 'next/link';
type Props = {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="container">
        <header className="header">
          <Link href="/" >COOKLY</Link>
        </header>
        <main>
          {children}
        </main>
      </div>
    </>
  )
};

export default Layout;
