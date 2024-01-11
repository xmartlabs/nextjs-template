import globalStyles from "assets/stylesheets/global-styles.module.scss";
import styles from "./navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import nextLogo from "public/next.svg";
import { Container } from "../container";

export const Navbar = () => (
  <div className={styles.container}>
    <Container>
      <div className={styles.internalContainer}>
        <div>
          <Link href="/">
            <Image src={nextLogo} alt="Next.js Logo" width={100} height={25} />
          </Link>
        </div>
        <div className={styles.rightContainer}>
          <nav>
            <Link className={globalStyles.link} href="/about">
              About
            </Link>
          </nav>
        </div>
      </div>
    </Container>
  </div>
);
