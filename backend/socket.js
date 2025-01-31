const socketIo = require('socket.io');
const userModel = require('./database/models/usermodel');
const captainModel = require('./database/models/captainmodel')

let io;


function initializeSocket(server){
      io = socketIo(server,{
        cors:{
            origin:'*',
            methods:[
                'GET','POST'
            ]
        }
      })

      io.on('connection',(socket) => {
                // console.log(`client connected ${socket.id}`);

                socket.on('disconnect',() => {
                    // console.log(`client disconnected ${socket.id}`);
                })
                

                socket.on('join',async(data) => {
                        const {userId,userType} = data;

                        if(userType === 'user'){
                            await userModel.findByIdAndUpdate(userId,{socketId:socket.id})
                        }else if(userType === 'captain'){
                            await captainModel.findByIdAndUpdate(userId,{socketId:socket.id})
                        }
                })


                socket.on('update-location-captain',async(data) => {
                    const {userId,location} = data;

                    if(!location || !location.ltd || !location.lng){
                        return socket.emit('error',{message: 'Invalid Location'})
                    }

                    await captainModel.findByIdAndUpdate(userId,{
                        location:{
                            ltd:location.ltd,
                            lng:location.lng
                        }
                    })
                })

      })

    
}


function sendMessageToSocketId(socketId,messageObject) {
            if(io){
                io.to(socketId).emit(messageObject.event,messageObject.data)
            }else{
                console.log('socket io not initialized');
                
            }


}



module.exports = {initializeSocket,sendMessageToSocketId}