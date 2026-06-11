import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-in-production";

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function googleAuthStub(req, res) {
  const { email = "", fullName = "User" } = req.body || {};

  if (!email) {
    return res.status(400).json({ message: "email is required" });
  }

  const token = signToken({ email, fullName, provider: "google" });

  return res.json({
    token,
    user: {
      email,
      fullName,
      provider: "google",
    },
  });
}

export function verifyToken(req, res) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Missing bearer token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({ valid: true, user: decoded });
  } catch {
    return res.status(401).json({ valid: false, message: "Invalid token" });
  }
}
