import React, { FC, useRef, useState } from "react";
import styles from "./sidebarHeader.module.scss";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useClickOutside } from "../../../hooks";

const SidebarHeader: FC = () => {
  const menuRef = useRef<any>(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  useClickOutside(menuRef, () => setMenuIsOpen(false), menuIsOpen);
  return (
    <header className={styles.header}>
      <div className={styles.user_block}>
        <img src="#" />
        <Menu />
      </div>
    </header>
  );
};

const Menu: FC = () => {
  const menuRef = useRef<any>(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  useClickOutside(menuRef, () => setMenuIsOpen(false), menuIsOpen);
  return (
    <div ref={menuRef} className={styles.menu_wrapper}>
      <button onClick={() => setMenuIsOpen(!menuIsOpen)}>
        <BiDotsVerticalRounded fontSize="large" />
      </button>
      {menuIsOpen && (
        <div className={styles.menu}>
          <ul>
            <li className={styles.menu_item} onClick={() => 1}>
              <span>Выйти</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidebarHeader;
