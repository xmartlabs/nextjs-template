import { classnames } from "@/helpers/utils";
import globalStyles from "public/assets/stylesheets/global-styles.module.scss";
import styles from "./about.module.scss";

export default function About() {
  return (
    <div
      className={classnames(styles.container, globalStyles.genericContainer)}
    >
      <div>
        <p className={styles.header}>This is the about page.</p>
        <p className={styles.subheader}>Made with ❤️ by Xmartlabs</p>
      </div>
    </div>
  );
}
