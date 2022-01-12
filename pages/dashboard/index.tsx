import { redirect } from "next/dist/server/api-utils";
import { destroyCookie } from "nookies";
import { useContext, useEffect } from "react";
import { AuthTokenError } from "../../errors/AuthTokenError";
import { setUpAPIClient } from "../../services/api";
import { api } from "../../services/apiClient";

import { AuthContext } from "../../src/context/AuthContext";
import { withSSRAuth } from "../../utils/withSSRAuth";

export default function DashBoar() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }, []);

  return <h1> Dashboard: {user?.email} </h1>;
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setUpAPIClient(ctx);

  const response = await apiClient.get("/me");
  // try {
  // } catch (err) {
  //   destroyCookie(ctx, "nextauth.token");
  //   destroyCookie(ctx, "nextauth.refreshtoken");
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {},
  };
});
