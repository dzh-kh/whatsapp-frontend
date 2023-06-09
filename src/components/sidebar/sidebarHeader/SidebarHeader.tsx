import React, { FC, useRef, useState } from "react";
import styles from "./sidebarHeader.module.scss";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useActions, useClickOutside } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { LOGIN_PAGE_ROUTE } from "../../../consts";
const SidebarHeader: FC = () => {
  const menuRef = useRef<any>(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  useClickOutside(menuRef, () => setMenuIsOpen(false), menuIsOpen);
  return (
    <header className={styles.header}>
      <Menu />
    </header>
  );
};

const Menu: FC = () => {
  const navigate = useNavigate();
  const menuRef = useRef<any>(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  useClickOutside(menuRef, () => setMenuIsOpen(false), menuIsOpen);
  const { resetApp } = useActions();

  const handleLogout = () => {
    localStorage.clear();
    resetApp();
    navigate(LOGIN_PAGE_ROUTE);
  };

  return (
    <div ref={menuRef} className={styles.menu_wrapper}>
      <button onClick={() => setMenuIsOpen(!menuIsOpen)}>
        <BiDotsVerticalRounded fontSize="large" />
      </button>
      {menuIsOpen && (
        <div className={styles.menu}>
          <ul>
            <li onClick={handleLogout} className={styles.menu_item}>
              <span>Выйти</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidebarHeader;
