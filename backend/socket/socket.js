import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();
// creating server 
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: 'https://chatly13.vercel.app', // specify the frontend origin
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // allowed methods
       
        
    },
});
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {}; // {userId->socketId}


io.on('connection', (socket)=>{
    console.log("user is io",socket.id);
    const userId = socket.handshake.query.userId
    if(userId !== undefined){
        userSocketMap[userId] = socket.id;
    } 

    io.emit('getOnlineUsers',Object.keys(userSocketMap));

    socket.on('disconnect', ()=>{
        delete userSocketMap[userId];
        io.emit('getOnlineUsers',Object.keys(userSocketMap));
    })

})

export {app, io, server};