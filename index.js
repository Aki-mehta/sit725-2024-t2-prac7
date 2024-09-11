const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Attach socket.io to the server
const port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' folder
app.use(express.static("public"));

// Generate and emit random numbers every 2 seconds
setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 11); // Generate random number between 0 and 10
      console.log("Generated random number:", randomNumber);
      io.emit("randomNumber", randomNumber); // Emit the number to all connected clients
}, 2000);

// Routes for calculator actions
app.get("/add", (req, res) => {
      const num1 = parseFloat(req.query.num1);
      const num2 = parseFloat(req.query.num2);
      if (!isNaN(num1) && !isNaN(num2)) {
            const sum = num1 + num2;
            res.send(`The sum of ${num1} and ${num2} is ${sum}`);
      } else {
            res.send("Invalid numbers");
      }
});

app.get("/subtract", (req, res) => {
      const num1 = parseFloat(req.query.num1);
      const num2 = parseFloat(req.query.num2);
      if (!isNaN(num1) && !isNaN(num2)) {
            const result = num1 - num2;
            res.send(`The result of ${num1} - ${num2} is ${result}`);
      } else {
            res.send("Invalid numbers");
      }
});

app.get("/multiply", (req, res) => {
      const num1 = parseFloat(req.query.num1);
      const num2 = parseFloat(req.query.num2);
      if (!isNaN(num1) && !isNaN(num2)) {
            const result = num1 * num2;
            res.send(`The result of ${num1} * ${num2} is ${result}`);
      } else {
            res.send("Invalid numbers");
      }
});

app.get("/divide", (req, res) => {
      const num1 = parseFloat(req.query.num1);
      const num2 = parseFloat(req.query.num2);
      if (!isNaN(num1) && !isNaN(num2) && num2 !== 0) {
            const result = num1 / num2;
            res.send(`The result of ${num1} / ${num2} is ${result}`);
      } else {
            res.send("Invalid numbers or division by zero");
      }
});

// Start the server
server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
});
