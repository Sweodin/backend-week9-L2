import express from "express";

const app = express();

app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

let users = [
  {
    id: 1,
    name: "Peter Gustafsson",
    email: "peter@example.com",
  },
  {
    id: 2,
    name: "Savanah Gustafsson",
    email: "savanah@example.com",
  },
];

/*----- Get all users -----*/

app.get("/users", (req, res) => {
  res.json(users);
});

/*----- Get a specific user by ID -----*/

app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

/*----- Add a new user -----*/

app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser);
  res.json({ message: "User added successfully", user: newUser });
});

/*----- Update a user -----*/

app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  res.json({ message: "User updated successfully", user });
});

/*----- Delete a user -----*/

app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter((u) => u.id !== userId);
  res.json({ message: "User deleted successfully" });
});
