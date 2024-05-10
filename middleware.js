// import { NextResponse } from "next/server";
// import { getCookie } from "cookies-next";
// import jwt from "jsonwebtoken";

// // Flag to prevent infinite redirection loop
// let redirected = false;

// export function middleware(request) {
//   const token = getCookie("CF_Authorization");

//   // const token =
//   //   "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg0MDMyZGMxOTM2ZWEwMzI4ZWZjZjk2ZWNiODkzMzBjYzgxZmQwZWQ2YzQyYjUwNjFjOWMyNjM3YWY2MmVhMTEifQ.eyJhdWQiOlsiMmNkNDA5MWI0MmY2MjM3YWMyOTI4ZWRmZTc5YmU5YWYxMWI0Y2Y0ZDU4ODM0NTUzYjk5NjMxZDZkYTU2OTQ3MyJdLCJlbWFpbCI6InRvdXNlZWYuZXhlcnRsb2dpY3NAZ21haWwuY29tIiwiZXhwIjoxNzE3ODg3OTQ4LCJpYXQiOjE3MTUyNTk5NDgsIm5iZiI6MTcxNTI1OTk0OCwiaXNzIjoiaHR0cHM6Ly9leGVydGxvZ2ljcy5jbG91ZGZsYXJlYWNjZXNzLmNvbSIsInR5cGUiOiJhcHAiLCJpZGVudGl0eV9ub25jZSI6InQ2Vlk1cWJUY2treUMwdjYiLCJzdWIiOiIwZjBkOWE4MC01MGI1LTVjOTktODIxMy1mYTg3NTZhZmI2OTYiLCJjb3VudHJ5IjoiUEsifQ.dE0aUUjaWSqfqC8Rxj7GTA-Gep1MIFIp-iQMORkwgsYxs6p6ORlNf6VUHwn1gY_jCjAtnZxH41UgBi3QagukhQt9eDhbAwUR5Aob1fCU2_sQkBjAk1ZaiecI-90uhrxPI9Ix_YAlj596I_-LnoQ1w-HfwZKX9hNs7LJ_90B5oSPAgl5iY94kkODDh7V4Oxh0VCYQ3NKijq79GBrd1wgrv6qD90c5JMwwjWeoZ7yujODaC7JC3NI3sohrbNlSB7yguNQr3_BaApKOOxIgO0-Zc8cKeDZKjHRoq8jNalzW-vuqoM-6qputtLMbeb11KnoceVrWxqiqLTdPuoVBB4mysQ";

//   console.log(token);
//   console.log("middleware");

//   // Check if the request is coming from localhost
//   const isLocalhost = request.headers.get("host").startsWith("localhost");

//   if (!token && !isLocalhost && !redirected) {
//     // Redirect only if the request is not from localhost, CF_Authorization token is missing,
//     // and redirection hasn't already been attempted
//     redirected = true; // Set the flag to true to prevent further redirection
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET, {
//         algorithms: ["HS256"],
//       });

//       console.log("Token verified and decoded:", decoded);

//       return NextResponse.next();
//     } catch (err) {
//       console.log("Token verification failed:", err);
//     }
//   }

//   // If the token is missing or invalid and the request is from localhost, proceed to the next response
//   return NextResponse.next();
// }

// // export function middleware(request) {}

import { NextResponse } from "next/server";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

export function middleware(request) {
    const token = getCookie("CF_Authorization");

  // Redirect if no token found
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    // Verify the token with your secret key and required algorithm
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

    // Optionally, add more checks on decoded data if necessary
    console.log("Token verified and decoded:", decoded);

    return NextResponse.next();
  } catch (err) {
    // If token is invalid or expired, redirect to login
    console.log("Token verification failed:", err);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
