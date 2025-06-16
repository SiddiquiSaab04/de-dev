const express = require("express");
const userRouter = require("./routes/user.routes");
const postRouter = require('./routes/post.routes')
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

mongoose
	.connect("mongodb://localhost:27017/interview")
	.then(() => console.log("mongodb Connected Successfully"))
	.catch(() => {
		console.error("mongodb is not connected");
	});

app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`);
});
