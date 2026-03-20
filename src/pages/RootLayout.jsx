import React from 'react';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="game-background w-screen h-screen">
      <Outlet />
    </div>
  );
};

export default RootLayout;
