import { Server } from "socket.io"
import { Redis } from "ioredis";

const pub = new Redis({
   host: '',
   port:24186,
   username:'default',
   password:''
});
const sub = new Redis({
   host: '',
   port:24186,
   username:'default',
   password:''
});

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
    sub.subscribe("MESSAGES");
 }
 public initListeners(){
   const io = this._io;
   console.log('Init socket listenres...');
   io.on("connect",(socket) =>{
      console.log("New Socket Connected",socket.id);
      socket.on('event:message', async ({message}:{message:string})=>{
         console.log('New Message Rec.',message);
         await pub.publish("MESSAGES",JSON.stringify(message));
      });
   });
   sub.on('message',(channel,msg)=>{
      if(channel === 'MESSAGES')
         console.log("Message from redis server ",msg);
         io.emit('message',msg);
   })
 }
 get io(){
    return this._io;
 } 


}

export default SocketService;
