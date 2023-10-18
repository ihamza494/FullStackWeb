const express = require("express");
const cors = require("cors");
const app = express()
const PORT= 8080;

app.use(express.json());
app.use(cors());
const db = require('./models');


const postRouter = require('./routes/Posts')
app.use("/posts", postRouter);

const commentsRouter = require('./routes/Comments')
app.use("/comments", commentsRouter);

const usersRouter = require('./routes/Users')
app.use("/auth", usersRouter);

db.sequelize.sync().then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server running on port 8080");
    });
});
