import Link from 'next/link';
import Image from 'next/image';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header className=" bg-white shadow sticky top-0 z-50 position-relative">
      {/*  */}
      <Navbar />
    </header>
  );
}
