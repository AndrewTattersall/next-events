import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import styles from "../styles/Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>DJ Events</a>
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
};
