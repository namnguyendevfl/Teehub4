const { PORT = 7999 } = process.env;
const app = require("./app");

const listener = () => console.log("Listening on PORT: 7999!")

app.listen(PORT, listener())
