const app = require("./src/app");
const port = require("./src/config");

app.listen(port, () => {
  console.log(`🏃‍♀️ Running on ${port}`);
});
