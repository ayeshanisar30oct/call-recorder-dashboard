
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

const jwtToken =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg0MDMyZGMxOTM2ZWEwMzI4ZWZjZjk2ZWNiODkzMzBjYzgxZmQwZWQ2YzQyYjUwNjFjOWMyNjM3YWY2MmVhMTEifQ.eyJhdWQiOlsiOTQyYTg1NWE4ZTk1MTZiN2MyZWZlYmY0OTlmODAyYzJlZGM0ZDE4MDFmZmI3MTcwZjI3ODM1ZDczYTZhM2M0NiJdLCJlbWFpbCI6InRvdXNlZWYuZXhlcnRsb2dpY3NAZ21haWwuY29tIiwiZXhwIjoxNzE4NDA2NjI3LCJpYXQiOjE3MTU3Nzg2MjcsIm5iZiI6MTcxNTc3ODYyNywiaXNzIjoiaHR0cHM6Ly9leGVydGxvZ2ljcy5jbG91ZGZsYXJlYWNjZXNzLmNvbSIsInR5cGUiOiJhcHAiLCJpZGVudGl0eV9ub25jZSI6IlFUcUNENGNBdGhkVnRjeDciLCJzdWIiOiIwZjBkOWE4MC01MGI1LTVjOTktODIxMy1mYTg3NTZhZmI2OTYiLCJjb3VudHJ5IjoiUEsifQ.VuN0wcx8MfZf7KwZq2SNDFlOaNsX1pXYU5kBKmZJKcosTqVRvaIIDWHKsDroTyhkGPoVzFR-FrvPXj95iFBGwf3ntkIJbTeYRgFy0pwUyW8M-RXZnWxgFl0sS0p0rZuss5WQldX6kgdZvR5dA2G1j761aoKMKWuX1GhUF0ur_XMRuzwn1UlOJuUkj_qLQpF2LrWLwT_rsn1vJ4BpxZozEsyzj9VIAv763a35UdiBHoipNZsEt1VlCHG7Dufv9wtK64bZtcvgDgJ2URBzCd2H1GyjpsDt-VcYoBUPhNIRcGegbd47-IX7HW_QStbfrKzTF3vvCe4QXVaLIYWanyntmQ";

  function decodeToken(token) {
    try {
      // Decode the token
      const decodedToken = jwt.decode(token);

      // Extract email from decoded token
      const email = decodedToken.email;
      console.log(decodedToken);
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
    <div>{email ? <p>Email: {email}</p> : <p>No email found in token.</p>}</div>
  );
}

export default ExtractEmail;
