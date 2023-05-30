//  const fs = require('fs');
 
 // create a file / write to  a file : if a file exists, the new content overwrites the existing.

 //  fs.writeFile('./test.txt','just added to test', (error) => {
//     if (error) throw error;
//     console.log('everything went fine');
//  });


 //append to the file
//  fs.appendFile('./test.txt', ' , i am just trying to test appending to a file', (err, data) => {
//     if (err) throw err.message;

//     // read a file
//     fs.readFile('./test.txt','utf-8', (err, data) => {
//         if (err) throw err.message;
//         console.log(data);
//     });
//  });


 // create  a folder
//  fs.mkdir('./newfolder', (err, data) => {
//     if (err) throw err.message;
//  });

//  read the file
//  fs.readFile('./newfolder/newfiletxt', 'utf-8', (err, data) =>{
//     if (err) throw err.message;
//     fs.writeFile("./newfolder/newfile.txt", 'new file created successfully', (err, data) => {
//         if (err) throw err.message;
//         console.log(data);
//      });
//  })
 
  // learn callbacks , async and await, promises 

  // REPL - Read, Evaluate Print Loop. {its just an snvironment for writing node.js}
  // MVN -  Node Version Manager (nvm use 16)

  // IIFE - Immediately  Invoked Function Execution.  
  // Module wrapper function in Nodejs.

 // (function( exports, module, require, __dirname, __filename){})()
 // node.js wrappps all your code in module wrapper function

 //hashnode (create an account) write an articles that contains 

 // import and export using .mjs file extension
 // working with json
 // json  is a globally accepted interchangeable data format

 // built-in modules : paths 
//  const path = require('node:path');
// const { parse } = require('path');
  // console.log(__filename)

  // basename method of the path:
  // const basename = path.basename(__filename);
  // const dirname = path.dirname(__filename);
  // const extname = path.extname(__filename);
  // const parse = path.parse(__filename); // breaks it into parts object
  // console.log(basename)
  // console.log(dirname)
  // console.log(extname);


  // const resolve =  path.resolve('host', 'name', '.com');

  // console.log(resolve);

  // const join = path.join(__dirname,'myfile')
  // console.log(join);

  // const fmt = path.format(parse);
  // console.log(fmt);

  // const pathIsAbs = path.isAbsolute('./myfile');
  // console.log(pathIsAbs);

  // const reative = path.relative(fmt, './myfile');
  // console.log(reative);


  // // Event in Node.js
  // // import the event module.
  // const EventEmitter = require('events');

  // //steps:
  // //1. create an event emitter class
  // const emitter = new EventEmitter();

  // //2. register the event
  // emitter.addListener('add', (a, b) =>{
  //   console.log(`${a} + ${b} = ${a+b}`);
  // })

  // // addlistener is like an alias for "on":

  // //3. emit event/trigger the event
  // emitter.emit('add', 2,4);
  

  //extending events

  // streams : are used to transfer data from one stream to another; readable streams and writable streams(toe read the data, and deliver the data respectively)
  // const fs  = require('fs');
//   const streamData = fs.createReadStream('./newfile.txt', {
//     encoding: 'utf8',
//     highWaterMark:5
//   });

//   streamData.on('data', (chunk) =>{
//     console.log(chunk);
//  })


//  streamData.on('data', (chunk) =>{
//     return chunk;
//  })


  // fs.createWriteStream('./filenew.txt', 'utf8');
 
  // fs.readFile('./file.txt', 'utf-8', (err, data) =>{
  //   try{
  //    stram
  //   }catch(e){
   
  //   }
  //  })
  

  //http module
  // const http = require('http');
  // // const json = require('./data.json');
  // const fs = require('fs');
  // const path = require('path');

  // const data = [
  //   {name:'user1', id:1},
  //   {name:'user2', id:2},
  //   {name:'user3', id:3},
  //   {name:'user4', id:4},
  // ]
 
  // const users = fs.readFileSync(__dirname  + path.join("/data.json"), "utf8");
  

  // // steps:
  // // - create server interface
  // const server = http.createServer((req, res) =>{
  //   // set the header
  //   res.writeHead(200, {
  //     'Content-Type': 'application/json',
  //   })
  //   // close the channel
  //   res.end(users);
  // })

  // // - plug this to a port
  // server.listen(5000, () =>{
  //   console.log("server started");
  // });


  // API with node.js
  // CRUD - GET, POST, PUT, PATCH,  DELETE

  //bookstore api
  const http = require('http');
  const handler = require('./handlers');
  const { getAllBooks, getBooksByCat, updateBook,createBook, deleteBookByCatAndId } = require('./controller');
  
  // Versions
  const apiV1 = '/api/v1';
  
  const server = http.createServer((req, res) => {
    if (req.url === `${apiV1}/books/all` && req.method === 'GET') {
      handler(res, 200, getAllBooks());
    } else if (req.url === `${apiV1}/books/science/all` && req.method === 'GET') {
      handler(res, 200, getBooksByCat('science'));
    } 
    else if (req.url === `${apiV1}/add/books` && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const book = JSON.parse(body);
        const createdBook = createBook(book);
        handler(res, 201, createdBook);
      });
    } 
    else if (req.url === `${apiV1}/books/update` && req.method === 'PUT') {
      let requestBody = '';
      req.on('data', (chunk) => {
        requestBody += chunk.toString();
      });
      req.on('end', () => {
        const updatedBook = JSON.parse(requestBody);
        const result = updateBook(updatedBook.category, updatedBook);
        if (result === 'Book updated successfully.') {
          handler(res, 200, result);
        } else {
          handler(res, 404, result);
        }
      });
    }
    else if (req.url.startsWith(`${apiV1}/books/`)) {
      const [_, category, bookId] = req.url.split('/');
    
      if (req.method === 'DELETE') {
        const isDeleted = deleteBookByCatAndId(category, parseInt(bookId));
    
        if (isDeleted) {
          handler(res, 200, 'Book deleted successfully');
        } else {
          handler(res, 404, 'Book not found');
        }
      } else {
        handler(res, 405, 'Method Not Allowed');
      }
    }
    
    else {
      // res.statusCode = 404;
      // res.setHeader('Content-Type', 'text/plain');
      res.end('Invalid request');
    }
  });
  
  server.listen(5000, () => {
    console.log('Listening on port 5000');
  });
  



  