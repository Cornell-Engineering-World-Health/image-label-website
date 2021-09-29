import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav class="banner wrapper sty align-center">
      <NavLink to="/">LOGIN |</NavLink>
      <NavLink to="/about"> ABOUT |</NavLink>
    </nav>

  );
}