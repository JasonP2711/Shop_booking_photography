import React, { useState } from "react";
import { userAuth } from "../../managerState/userAuth";
import Login from "../../components/login/index";

type Props = {};

function Index({}: Props) {
  const { auth } = userAuth((state: any) => state);
  const [user, setUser] = useState<any>(auth);
  console.log("looo: ", user);

  return <>{!user && <Login />}</>;
}

export default Index;
