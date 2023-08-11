import { RouterProvider } from "react-router-dom";
import { AuthorizedRouter } from "./router/Authorized.router.tsx";
import { UnauthorizedRouter } from "./router/Unauthorized.router.tsx";
import { useAppSelector } from "./hook/redux.hook.ts";

export const App = () => {
   const { isLogin } = useAppSelector( state => state.authReducer );

   return (
       <RouterProvider router={ isLogin ? AuthorizedRouter : UnauthorizedRouter }/>
   );
};