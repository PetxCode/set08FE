import React, { FC, PropsWithChildren, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const PrivateRouter: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState({});

  const user = useSelector((state: any) => state.userState);
  useEffect(() => {
    if (user) {
      const dec = jwtDecode(user);
      setState(dec);
    }
  }, []);

  console.log("reading state", state);
  return (
    <div>
      <div>
        {user ? <div>{children}</div> : <Navigate to="/account/login" />}
      </div>
    </div>
  );
};

export default PrivateRouter;
