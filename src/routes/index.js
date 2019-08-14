import React, {lazy, Suspense } from 'react';
import { Redirect } from 'react-router-dom';

const HomeComponent = lazy(() => import("../application/Home"));
const Home = (props) => {
  return (
    <Suspense fallback={null}>
      <HomeComponent {...props}></HomeComponent>
    </Suspense>
  )
}

export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        render: ()=> (
          <Redirect to={"/recommend"} />
        )
      },
      // {
      //   path: "recommend/",
      //   extra: true,
      //   key: 'home',
      //   component: Recommend,
      //   routes: [{
      //     path: '/recommend/:id',
      //   }]
      // }
    ]
  }
]