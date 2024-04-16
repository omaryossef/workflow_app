import { createContext, useEffect, useState } from "react";
import url from "../../config/config.js";
import cookie from "js-cookie"; // cookie parser
const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [hasToken, setHasToken] = useState(false);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState();
  const [users, setUsers] = useState([]);
  console.log("user in context", user);
  useEffect(() => {
    const fetchData = async () => {
      const handleIfUserHasToken = () => {
        console.log("handleIfUserHasToken aufgerufen");

        let JWTinfocookie = cookie.get("JWTinfo");

        // console.log("JWTinfo cookie", JWTinfocookie);
        if (!JWTinfocookie) return;

        JWTinfocookie = JWTinfocookie.replace("j:", "");
        const cookieValueObj = JSON.parse(JWTinfocookie);
        console.log("cookieValueObj", cookieValueObj);
        setUserId(cookieValueObj.user._id);

        const expirationInMs = new Date(cookieValueObj.expires) - new Date();
        console.log("JWT läuft ab in", expirationInMs / 1000, "Sekunden");

        if (expirationInMs <= 0) return;

        setHasToken(true);
        setUser(cookieValueObj.user);
        setMsg(`Eingeloggter User: ${cookieValueObj.email}.`);
      };
      handleIfUserHasToken();
    };
    fetchData();
  }, [hasToken]);
  const backendApiUrl = url;
  return (
    <UserContext.Provider
      value={{
        user: user || {},
        setUser,
        error,
        setError,
        userId,
        setUserId,
        backendApiUrl,
        msg,
        setMsg,
        hasToken,
        setHasToken,
        users,
        setUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
