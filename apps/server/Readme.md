FOR WINDOWS

#open up a new terminal to spin up a new server 

$env:PORT = 8001
 #anything except 8000

echo $env:PORT
#check the port number 

cd to apps/server

yarn dev
#to run the server on PORT 8001