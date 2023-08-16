import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../layout/Main-Layout/Main-Layout.tsx";
import { WritePage } from "../page/Write-Page/Write-Page.tsx";
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
            element: <WritePage/>
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