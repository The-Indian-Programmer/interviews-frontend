import React, { Suspense, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { publicRoute, authRoutes, nonAuthRoutes } from "../routes";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { isUserLoggedIn } from "../../auth/utils";
import { useHistory } from "react-router-dom";
export default function PublicLayout(props) {
  const history = useHistory();
  const pathName = history.location.pathname;

  useEffect(() => {
    const publicPaths = publicRoute.map((route) => route.path);
    const nonAuthPaths = nonAuthRoutes.map((route) => route.path);
    const authPaths = authRoutes.map((route) => route.path);

    if (isUserLoggedIn()) {
      if (nonAuthPaths.includes(pathName) || publicPaths.includes(pathName)) {
        history.push("/");
      }
    } else {
        if (authPaths.includes(pathName)) {
            history.push("/login");
        }
    }
  }, [history.location.pathname]);

  return (
    <React.Fragment>
      <div className="page-inner">
        <Header />
        <main className="main-content-css mt-16">
          {
            <Suspense fallback={"props.pageLoader()"}>
              <Switch>
                {publicRoute.map((route, idx) => {
                  return typeof route.component !== "undefined" ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => <route.component {...props} />}
                    />
                  ) : null;
                })}
                {authRoutes.map((route, idx) => {
                  return typeof route.component !== "undefined" ? (
                    isUserLoggedIn() ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => <route.component {...props} />}
                      />
                    ) : null
                  ) : null;
                })}
              </Switch>
            </Suspense>
          }
        </main>
        <Footer />

        {/* <Footer /> */}
      </div>
    </React.Fragment>
  );
}
