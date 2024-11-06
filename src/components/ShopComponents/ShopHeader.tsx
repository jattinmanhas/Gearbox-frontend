import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import SearchProducts from "./SearchProducts";
import ShopCartCount from "./ShopCartCount";

export default function ShopHeader() {
  return (
    <div id="scroll-element" className={` my-4`}>
      <div className="m-2 flex justify-between align-middle place-items-center">
        <Link href="/shop">
          <h1 className="font-bold sm:text-md lg:text-2xl font-mono cursor-pointer">
            GearBox Shop
          </h1>
        </Link>
        <SearchProducts />

        <ShopCartCount />
      </div>
    </div>
  );
}
