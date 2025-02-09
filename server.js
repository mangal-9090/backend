import express from "express";
import http from "http";
import {Server} from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

const server = http.createServer(app);  
const io = new Server(server, {
  cors: {
    origin: "https://event-platform-lyart-nu.vercel.app", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true,
  }
});

app.use(cors({
  origin: ["https://event-platform-lyart-nu.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected"))
  .catch(err => console.log(" MongoDB Connection Error:", err));

// Use Routes
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

let attendeesCount = 0;

// Handle WebSocket Connections
io.on("connection", (socket) => {
  console.log(" New Client Connected:", socket.id);

  // Send current attendee count to the new client
  socket.emit("attendeeCount", attendeesCount);

  // When a new attendee joins
  socket.on("joinEvent", () => {
    attendeesCount++;
    console.log(` Attendee Joined | Total: ${attendeesCount}`);
    
    //  Broadcast the updated count to all clients
    io.emit("attendeeCount", attendeesCount);
  });

  //  When an attendee leaves
  socket.on("leaveEvent", () => {
    if (attendeesCount > 0) attendeesCount--;
    console.log(` Attendee Left | Total: ${attendeesCount}`);

    //  Broadcast the updated count
    io.emit("attendeeCount", attendeesCount);
  });

  //  Handle Client Disconnect
  socket.on("disconnect", () => {
    console.log(" Client Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
