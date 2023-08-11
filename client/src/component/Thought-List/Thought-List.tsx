import styles from "./Thought-List.module.scss";
import { useAppSelector } from "../../hook/redux.hook.ts";
import { ThoughtItem } from "../Thought-Item/Thought-Item.tsx";
import { v4 } from "uuid";

export const ThoughtList = () => {
   const { thoughts } = useAppSelector( state => state.thoughtReducer );

   return (
       <div className={ styles.ThoughtList }>
          { Boolean( thoughts.length ) && thoughts.map( t => <ThoughtItem thought={ t } key={ v4() }/> ) }
       </div>
   );
};