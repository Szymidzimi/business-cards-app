import React, { useEffect, useState } from "react";

const AuthLayout = (props: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [displayPage, setDisplayPage] = useState<boolean>(false);
  useEffect(() => {
    fetch("/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token") || "",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.isLoggedIn ? setDisplayPage(true) : setDisplayPage(false);
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
