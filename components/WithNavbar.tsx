import { FC, HTMLAttributeAnchorTarget } from "react";
import { Navbar } from "./Navbar/navbar";
import { navigationItems } from "@/data/navLinks";

const WithNavbar: FC = () => {
  return (
    <div>
        <Navbar
          navItems={navigationItems.map(([, { label, link }]) => ({
            link,
            text: label,
          }))}
        />
    </div>
  );
};

export default WithNavbar;
