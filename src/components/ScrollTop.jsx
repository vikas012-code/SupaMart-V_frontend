import React from 'react'
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

function ScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return <Outlet />;
}

export default ScrollTop