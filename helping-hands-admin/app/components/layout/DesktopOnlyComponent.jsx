"use client";
import React, { useEffect, useState } from "react";
const DesktopOnlyComponent = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1200);
    };

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isDesktop) {
    return (
      <div className="h-screen  flex flex-col items-center justify-center">
        <h2 className="text-center text-2xl font-bold">View with Desktop</h2>
      </div>
    );
  }

  return children;
};

export default DesktopOnlyComponent;
