import { FC, HTMLAttributeAnchorTarget } from "react";
import { Navbar } from "./Navbar/navbar";

type NavigationItems = {
  label: string;
  link: string;
};

type NavigationEntry = [string, NavigationItems];

const WithNavbar: FC = () => {
  const navigationItems: NavigationEntry[] = [
    [
      "blogs",
      {
        label: "Blogs",
        link: "/blogs",
      },
    ],
    ["Shop", { label: "Shop", link: "/shop" }],
    [
      "about",
      {
        label: "About Us",
        link: "/about",
      },
    ],
    ["contact", { label: "Contact Us", link: "/contact" }],
  ];

  return (
    <div>
      <Navbar
        navItems={navigationItems.map(([, { label, link }]) => ({
            link,
            text: label
        }))}
      />
    </div>
  );
};

export default WithNavbar;
