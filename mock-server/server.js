const path = require("path");
const jsonServer = require(path.join(__dirname, "../node_modules/json-server"));
console.log("✅ json-server manually loaded from:", path.join(__dirname, "../node_modules/json-server"));

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const bodyParser = require("body-parser");

server.use(middlewares);
server.use(bodyParser.json());

/** 🔐 Mock login route (by email + password) */
server.post("/login", (req, res) => {
  const { email, password } = req.body;
  const db = router.db;
  const user = db.get("users").find({ email, password }).value();

  if (user) {
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: `fake-jwt-token-${user.role}`
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

/** 📝 Registration route */
server.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const db = router.db;
  const existingUser = db.get("users").find({ email }).value();

  if (existingUser) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const newUser = {
    id: Date.now(),
    username,
    email,
    password,
    role: "user"
  };

  db.get("users").push(newUser).write();
  res.status(201).json({ message: "User registered", user: newUser });
});

/** 👑 Promote user to admin (Admins only) */
server.post("/promote/:id", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer fake-jwt-token-")) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const role = authHeader.replace("Bearer fake-jwt-token-", "");
  if (role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Only admins can promote users" });
  }

  const db = router.db;
  const userId = parseInt(req.params.id);

  const user = db.get("users").find({ id: userId }).value();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  db.get("users")
    .find({ id: userId })
    .assign({ role: "admin" })
    .write();

  res.status(200).json({
    message: "User promoted to admin",
    user: { ...user, role: "admin" }
  });
});


/** 🛡 Role-based protection for /products */
server.use("/products", (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer fake-jwt-token-")) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const role = authHeader.replace("Bearer fake-jwt-token-", "");
  if (role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }

  next();
});
// get users

server.use("/users", (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer fake-jwt-token-")) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const role = authHeader.replace("Bearer fake-jwt-token-", "");
  if (role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }

  next();
});


server.use(router);
server.listen(3000, () => {
  console.log("🚀 JSON Server is running at http://localhost:3000");
});
