import styles from "./Footer.module.scss";
import { Colors } from "../Colors/Colors.tsx";
import { useAppDispatch, useAppSelector } from "../../hook/redux.hook.ts";
import { appActions } from "../../store/slice/app.slice.ts";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

export const Footer = () => {
   const { theme } = useAppSelector( state => state.appReducer );

   const dispatch = useAppDispatch();

   return (
       <div className={ styles.Footer }>

          <div className={ styles.theme_switcher }>

             { theme === "light" ?
                 <BsFillMoonStarsFill size={ 25 }
                                      onClick={ () => dispatch( appActions.setTheme( "dark" ) ) }/> :
                 <BsFillSunFill size={ 30 }
                                color={ "white" }
                                onClick={ () => dispatch( appActions.setTheme( "light" ) ) }/> }

          </div>

          <Colors/>

       </div>
   );
};