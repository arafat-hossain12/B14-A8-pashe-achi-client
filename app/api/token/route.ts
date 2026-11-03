import jwt from "jsonwebtoken";
import { auth } from "@/lib/auth";

// Issues a short-lived JWT for the logged-in user.
// The Express server verifies it with the same JWT_SECRET.
export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return Response.json({ message: "Not logged in" }, { status: 401 });
  }
  const { id, email, name, image } = session.user;
  const token = jwt.sign(
    { email, name, picture: image ?? "" },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h", subject: id },
  );
  return Response.json({ token }, { headers: { "Cache-Control": "no-store" } });
}
