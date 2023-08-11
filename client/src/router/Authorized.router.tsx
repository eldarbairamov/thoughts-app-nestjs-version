import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../layout/Main-Layout/Main-Layout.tsx";
import { MainPage } from "../page/Write-Page/Main-Page.tsx";
import { ThoughtsPage } from "../page/List-Of-Thoughts-Page/Thoughts-Page.tsx";
import { Error } from "../component/Error/Error.tsx";

export const AuthorizedRouter = createBrowserRouter( [
   {
      path: "/",
      element: <MainLayout/>,
      errorElement: <Error/>,
      children: [
         {
            index: true,
            element: <MainPage/>
         },
         {
            path: "/list-of-thoughts",
            element: <ThoughtsPage/>
         }
      ]
   },
   {
      path: "*",
      element: <Navigate to={ "/" }/>
   }
] );