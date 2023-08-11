import { Outlet } from "react-router-dom";

import styles from './Main-Outlet.module.scss'

export const MainOutlet = () => {
   return (
       <div className={styles.MainOutlet}>
          <Outlet/>
       </div>
   );
};