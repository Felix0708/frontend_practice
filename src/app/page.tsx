"use client";

import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Pexels Media Gallery</h1>
      <ul>
        <li>
          <Link href="/photos">Photo List</Link>
        </li>
        <li>
          <Link href="/videos">Video List</Link>
        </li>
        <li>
          <Link href="/scraps">Scraps</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;