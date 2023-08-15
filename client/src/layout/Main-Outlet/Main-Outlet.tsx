import { Outlet } from "react-router-dom";

import styles from './Main-Outlet.module.scss'
import { Colors } from "../../component/Colors/Colors.tsx";

export const MainOutlet = () => {
   return (
       <div className={styles.MainOutlet}>
          <Outlet/>
          <Colors/>
       </div>
   );
};