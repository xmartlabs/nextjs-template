import { classnames } from "@/helpers/utils";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <div className={classnames(styles.container)}>
      <div>
        <p className={styles.header}>This is the homepage.</p>
        <p className={styles.subheader}>Feel free to spruce me up 😊</p>
      </div>
    </div>
  );
}
