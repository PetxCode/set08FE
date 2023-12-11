import { FC, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import School from "../page/home/school/School";
import Teacher from "../page/home/teacher/Teacher";
import Student from "../page/home/student/Student";

const DirectaryRoute: FC = () => {
  const [state, setState]: any = useState({});

  const user = useSelector((state: any) => state.userState);
  useEffect(() => {
    if (user) {
      const dec = jwtDecode(user);
      setState(dec);
    }
  }, []);

  return (
    <div>
      {state.status === "admin" ? (
        <School />
      ) : state.status === "teacher" ? (
        <Teacher />
      ) : state.status === "student" ? (
        <Student />
      ) : null}
    </div>
  );
};

export default DirectaryRoute;
