
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";


 const jwtToken = getCookie("CF_Authorization");
 console.log("CF_Authorization token:", jwtToken);




  function decodeToken(token) {
    try {
      // Decode the token
      const decodedToken = jwt.decode(token);

      // Extract email from decoded token
      const email = decodedToken.email;
      // console.log(decodedToken);
      return email;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

function ExtractEmail() {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (jwtToken) {
      const decodedEmail = decodeToken(jwtToken);
      setEmail(decodedEmail);
      // console.log(decodeToken);
    }
  }, []);

  return (
    <div>{email ? <p>Email:-- {email}</p> : <p>No email found in token.</p>}</div>
  );
}

export default ExtractEmail;
