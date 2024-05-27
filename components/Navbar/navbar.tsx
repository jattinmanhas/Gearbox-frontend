"use client";
import Link from "next/link";
import Hamburger from '@heroicons/react/24/solid/Bars3Icon';
import XMark from '@heroicons/react/24/solid/XMarkIcon';
import LimeButton from "../Button/limeButton";
import styles from "./navbar.module.css";
import { FC, useState } from "react";
import NavItem from "./NavItem/navItem";

const navInteractionIcons = {
  show: <Hamburger className={styles.navInteractionIcon} />,
  close: <XMark className={styles.navInteractionIcon} />,
};

type NavigationLink = {
  link: string;
  text: string;
};

type NavbarProps = {
  navItems: NavigationLink[];
};

export const Navbar: FC<NavbarProps> = ({
  navItems
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // console.log(navItems)

  return (
    <nav className={styles.container}>
      <div className={styles.iconAndMobileItemsToggler}>
        <Link className={styles.appIconWrapper} href="/" aria-label="home">
          GEARBOX
        </Link>

        <label onClick={() => setIsMenuOpen(prev => !prev)} 
        className={styles.topbarItemTogglerLabel}htmlFor="topbarItemToggler">{navInteractionIcons[isMenuOpen ? 'close': 'show']}</label>
      </div>

      <input className="peer hidden" id="topbarItemToggler" type="checkbox" />

      <div className={`${styles.main} peer-checked:flex`}>
        <div className={styles.navItems}>
          {navItems.map((nav) => (
            <NavItem key={nav.link} href={nav.link}>
              {nav.text}
            </NavItem>
          ))}
        </div>

        <div className={styles.actionsWrapper}>
          <Link href="/signup">
            <LimeButton type="button" name="Sign Up" />
          </Link>
        </div>

      </div>
    </nav>
  );
};
