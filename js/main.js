const socket = io();

const joinBtns = document.querySelectorAll('.join-button')
const discussionBtn = document.getElementById('startBtn')


socket.on('discussion', msg =>{
    showDiscussion(msg)
})



// joinBtns.forEach((joinBtn)=>{
//     joinBtn.addEventListener('click',()=>{
//         const room = joinBtn.getAttribute('data-room');
//         console.log(room)
//         socket.emit('join-room', room)
        
//     })
// })

discussionBtn.addEventListener('click', e=>{
    console.log('tapped')
    e.preventDefault()
    const msg = document.getElementById('discussion').value

    // const d = {
    //     'room': 'Robotics',
    //     'msg': msg
    // }
    // socket.emit('discussion-start', ({
    //     room : d.room,
    //     msg : d.msg
    // }))
    const roomName = 'Robotics'
    socket.emit('discussion-create',msg)
})


function showDiscussion(msg){
    const div = document.createElement('div')
    div.classList.add('discussion')
    div.innerHTML = `<p id="meta">${msg.username} ${msg.time}</p>
    <p>${msg.text}</p>`
    document.querySelector('.discussion-container').appendChild(div)
}


