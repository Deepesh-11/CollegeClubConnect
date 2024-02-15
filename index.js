//importing libraries
const express = require('express');
const http = require('http')
const socket = require('socket.io')
const app = express();

const server = http.createServer(app)
const io = socket(server)
const formatDiscussions = require('./utils/discussions')
const {userJoin, getCurrentUser} = require('./utils/users')


const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const con = require('./connection')


const loginRoute = require('./router/login')
const registerRoute = require('./router/register')
const dashboardRoute = require('./router/dashboard')
const logoutRoute = require('./router/logout')
const fetchRoute = require('./router/fetch')
const joinRoute = require('./router/join')




// const router = require('./router')
const port = 3000;


app.use(session({
    secret: 'usersession',
    resave: false,
    saveUninitialized:true,
}))



app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/dashboard', dashboardRoute);
app.use('/logout', logoutRoute);
app.use('/fetch', fetchRoute);
// app.use('/join', joinRoute);



app.get('/', (req, res)=>{
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    res.sendFile(path.join(__dirname)+'/landing.html')
})

app.post('/',(req, res)=>{
    res.redirect('/login')

})

let rooms = {}
// io.sockets.on('connection', socket=>{
//     console.log('User connected')
//     socket.on('joinroom', (room)=>{
//         socket.join(room);
//         socket.room = room;

//         if (!rooms[room]) {
//             rooms[room] = [];
//           }
//         rooms[room].push(socket);
//         console.log(`You have joined the ${room} room.`)
//     })
// })


// New socket connection
io.on('connection', socket=>{
    console.log("New socket connection")
      
    socket.on('join-room', room=>{
        socket.join(room)
        console.log(`user joined ${room} room`)
        socket.emit('discussion', formatDiscussions('Admin', 'Welcome to the discussion group'))
        io.sockets.in(room).emit('discussion', formatDiscussions('Admin', 'A user has joined the chat'))
    })
    
    // socket.on('discussion-start', ({room,msg})=>{
    //     console.log(room)
    //     io.to(room).emit('discussion', formatDiscussions('User', msg))
    // })

    socket.on('discussion-create', msg=>{
        io.sockets.emit('discussion',formatDiscussions('User', msg))
    })
})

// app.get('/get-profile',(req, res)=>{
//     const query = 'Select uname from users'

//     con.query(query, (err, result)=>{
//         if(err) throw err;

//         if (result.length > 0) {
//             res.json({ data: result[0].uname });
//         } else {
//             res.json({ data: null });
//         }
//     })
// })


// app.post('/user-join', (req, res)=>{
//     res.send("User joined the group")
// })
//server start
server.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})