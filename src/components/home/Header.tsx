import { ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-800 to-sky-400 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image
            src="/logo-dark.png"
            alt="logo"
            width={500}
            height={130}
            className="max-h-16 w-auto "
          />
        </div>
        <div className="flex items-center space-x-4">
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="hover:text-gray-200 transition-colors">
                  Inicio
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1">
            <ShoppingCart className="h-5 w-5 mr-2" />
            <span className="font-semibold">{0}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
