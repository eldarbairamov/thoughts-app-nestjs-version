import { useEffect } from "react";

import styles from "./Thoughts-Page.module.scss";
import { useAppDispatch } from "../../hook/redux.hook.ts";
import { asyncThoughtActions } from "../../store/slice/thought.slice.ts";
import { ThoughtList } from "../../component/Thought-List/Thought-List.tsx";

export const ThoughtsPage = () => {
   const dispatch = useAppDispatch();

   useEffect( () => {
      dispatch( asyncThoughtActions.getAllThoughts() );
   }, [] );

   return (
       <div className={ styles.ThoughtsPage }>

          <ThoughtList/>

       </div>
   );
};