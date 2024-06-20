const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`server start ${PORT}`);
});

// HTML
app.get("/users", (req, res) => {
  const HTML = `
       <ul>
          ${users.map((user) => `<li> ${user.first_name} </li>`).join("")}
       </ul>`;

  res.send(HTML);
});

// middleware convert body to form
app.use(express.urlencoded({ extended: false }));

// Routes
//REST API
//JSON

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error) => {
      return res.json({ status: "patch success", user: updatedUser });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    users.splice(userIndex, 1);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error) => {
      return res.json({ status: "success" });
    });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;

  const user = { id: users.length + 1, ...body };
  users.push(user);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error, data) => {
    return res.json({ status: "success", id: users.length });
  });
});
