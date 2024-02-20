import { Server } from "socket.io"

class SocketService{
 private _io:Server;  
 constructor(){
   console.log("Connection was created");
    this._io = new Server({
      cors:{
         allowedHeaders : ['*'],
         origin:'*'
      }
    });
 }
 public initListeners(){
   const io = this._io;
   console.log('Init socket listenres...');
   io.on("connect",(socket) =>{
      console.log("New Socket Connected",socket.id);
      socket.on('event:message', ({message}:{message:string})=>{
         console.log('New Message Rec.',message);
      });
   });
 }
 get io(){
    return this._io;
 } 


}

export default SocketService;
