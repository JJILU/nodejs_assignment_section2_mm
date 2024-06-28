// import `http` core module
const http = require('http');

// create server
const server = http.createServer((req,res) => {
   const url = req.url;
   const method = req.method;

  //  ROUTES
  if (url === '/' && method === 'GET') {
    // set http headers Content Type and status code 
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // send text response
    return res.end("Hello user wellcome");
  }

  if (url === '/users' && method === 'GET') {
    // set http headers Content Type and status code 
    res.writeHead(200, {'Content-Type': 'text/html'});

    
    res.write('<html>');
    res.write('<body><ul><li>james</li>kate<li></li>charlie<li>jane</li></ul></body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/add-user') {
    // set http headers Content Type and status code 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body><form action="/create-user" method="POST"><input type="text" name="user"><button type="submit">Add User</button></form></body>');
    res.write('</html>');
    return res.end();
  }


  if (url === '/create-user' && method === 'POST') {
    const users = [];
    //  listener for data
    req.on('data', (chunk) => {
       users.push(chunk);
       console.log(chunk);
    });

    // listener for end
    req.on('end', () => {
      const parsedUsers = Buffer.concat(users).toString();
      console.log(parsedUsers);
      const userName = parsedUsers.split('=')[1];
      console.log(userName);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'Text/plain');
      res.end("user was created successfully");
    });



    
  }


  


});


// listen to incoming requests on port 3000
server.listen(3000);
