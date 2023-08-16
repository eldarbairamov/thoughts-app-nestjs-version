import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Button } from "../../component/UI/Button/Button.tsx";
import { useAppDispatch, useAppSelector } from "../../hook/redux.hook.ts";
import { asyncThoughtActions } from "../../store/slice/thought.slice.ts";

import styles from "./Write-Page.module.scss";

export const WritePage = () => {
   const [ value, setValue ] = useState<string>( "" );

   const dispatch = useAppDispatch();

   const { username } = useAppSelector( state => state.authReducer );

   const navigate = useNavigate();

   const handleInput = ( e: React.ChangeEvent<HTMLTextAreaElement> ) => {
      setValue( e.target.value );
   };

   const acceptThought = async () => {
      await dispatch( asyncThoughtActions.writeThought( { content: value } ) );
      navigate( "/list-of-thoughts" );
      setValue( "" );
   };

   return (
       <div className={ styles.WritePage }>

          <div className={ styles.window }>

             { value && <p className={ styles.question }> Hey { username }! What is on your mind today? </p> }

             <textarea placeholder={ `Hey, ${ username }! What is on your mind today?` }
                       data-border={Boolean(value)}
                       maxLength={ 200 }
                       value={ value }
                       onChange={ handleInput }/>

             { value &&
                 <Button text={ "accept" }
                         onClick={ acceptThought }
                         style={ { marginTop: 15 } }/>
             }

          </div>

       </div>
   );
};