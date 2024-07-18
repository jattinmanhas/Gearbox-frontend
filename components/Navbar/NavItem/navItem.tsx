import { FC, PropsWithChildren } from "react";
import styles from "./navItem.module.css";
import ActiveLink from "@/components/common/ActiveLink/activeLink";
import classNames from "classnames";

type NavItemType = "nav" | "footer";

type NavItemProps = {
  href: string;
  type?: NavItemType;
  className?: string;
};

const NavItem: FC<PropsWithChildren<NavItemProps>> = ({
  href,
  type = "nav",
  children,
}) => {
  return (
    <>
      <ActiveLink
        href={href}
        className={classNames(styles.navItem, styles[type])}
        activeClassName={styles.active}
        allowSubPath={href.startsWith("/")}
      >
        <span className={styles.label}>{children}</span>
      </ActiveLink>
    </>
  );
};

export default NavItem;
