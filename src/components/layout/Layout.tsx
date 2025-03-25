import React from "react";
import Header from "./Header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="mx-2">{children}</div>
    </div>
  );
}

export default Layout;
