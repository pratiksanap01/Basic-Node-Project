import express from "express";
import fs from "fs";
import users from "./MOCK_DATA.json" with { type: "json" };

const app = express();
const PORT = 3000;

// Middleware to read JSON body
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if(!user) return res.status(404).json({ error: "User not found"})
    return res.json(user);
  })
  .put((req, res) => {
    // Edit the user
    const id = Number(req.params.id);
    const body = req.body;

    const index = users.findIndex((user) => user.id === id);

    // If user is not found
    if (index === -1) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update user
    users[index] = { ...users[index], ...body };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ status: "error writing file" });
      }

      return res.status(201).json({
        status: "success",
        user: users[index],
      });
    });
  })
  .delete((req, res) => {
    // Delete the user
    const id = Number(req.params.id);
    const newUsers = users.filter((user) => user.id !== id);
    if (newUsers.length === users.length) {
      return res.status(404).json({ message: "User not found" });
    }
    users.length = 0;
    users.push(...newUsers);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ status: "error writing file" });
      }

      return res.json({
        status: "success",
        message: "User deleted",
      });
    });
  });

app.post("/api/users", (req, res) => {
  // Create new user
  const body = req.body;

  if (!body.first_name || !body.last_name || !body.email || !body.gender) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  users.push({ body, id: users.length + 1 });

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      return res.json({ status: "error writing file" });
    }
    return res.status(201).json({ status: "success", id: users.length });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
