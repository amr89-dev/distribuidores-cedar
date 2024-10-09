import Image from "next/image";
import CartIndicator from "./CartIndicator";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-800 to-sky-400 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo-dark.png"
            alt="logo"
            width={500}
            height={130}
            className="max-h-16 w-auto "
          />
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/carrito" className="flex items-center space-x-3">
            <CartIndicator />
          </Link>
        </div>
      </div>
    </header>
  );
}
