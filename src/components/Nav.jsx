"use client";
import styles from "@/styles/nav.module.css";
import { useState, useEffect } from "react";

import profile from "../assets/profile.png";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

function Nav() {
  const [show, handleShow] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const supabase = createClientComponentClient();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        if (window.scrollY > 100) {
          handleShow(true);
        } else {
          handleShow(false);
        }
      });
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 1500);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    // router.push("/login");
  };

  if (pathname === "/login" || pathname === "/signup") return null;

  return (
    <div className={`${styles.nav} ${show && styles["nav-scroll"]}`}>
      <Link href="/" className={styles.logo}>
        ShowStopper
      </Link>
      <div className={styles.user}>
        <Link href="/genre" className={styles["nav-item"]}>
          Categories
        </Link>
        |
        <Link href="/search" className={styles["nav-item"]}>
          Search
          <FaSearch className={styles["search-icon"]} />
        </Link>
        |
        <div
          className={styles["user-info"]}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image src={profile} alt="" height={32} width={32} />
        </div>
        {isOpen && (
          <div
            className={styles.test}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/account" className={styles["menu-item"]}>
              Account
            </Link>
            <Link href="/activity" className={styles["menu-item"]}>
              Activity
            </Link>
            <div className={styles["menu-item"]} onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
