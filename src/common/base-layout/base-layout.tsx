import { Navbar } from '../navbar';
import { Footer } from '../footer';
import styles from './base-layout.module.scss';

interface BaseLayoutProps {
  withNavbar?: boolean;
  withFooter?: boolean;
  children: React.ReactNode;
}

export const BaseLayout : React.FC<BaseLayoutProps> = ({withNavbar = false, withFooter = false, children}) => {
  return (
    <div className={styles.container}>
      <div className={styles.internalContainer}>
        {withNavbar && <Navbar />}
        {children}
      </div>
      {withFooter && <Footer />}
    </div>
  )
}
