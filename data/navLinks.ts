type NavigationItems = {
    label: string;
    link: string;
  };
  
type NavigationEntry = [string, NavigationItems];

export const navigationItems: NavigationEntry[] = [
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
