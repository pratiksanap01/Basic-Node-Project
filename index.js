import express from "express";
import users from "./MOCK_DATA.json" with { type: "json" };
const app = express();
const PORT = 3000;

app.get("/api/users", (req, res) => {
    return res.json(users)
})

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)
     return res.json(user)
});



app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)});