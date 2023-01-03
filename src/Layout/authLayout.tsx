import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthLayout = (props: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [displayPage, setDisplayPage] = useState<boolean>(false);
  const navigate=useNavigate();

  useEffect(() => {
    fetch("/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token") || "",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isLoggedIn) {
          setDisplayPage(true);
        }else{
          setDisplayPage(false);
          localStorage.removeItem("token")
          navigate("/sign");
        }
        setIsLoading(false);
      });

  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {displayPage ? (
            <>
              <div>{props.children}</div>
            </>
          ) : (
            <div>Zaloguj się</div>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLayout;
