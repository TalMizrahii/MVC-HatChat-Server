<h1 align="center">
  <br>

  <a href="https://github.com/TalMizrahii/MVC-HatChat-Server"><img src="https://github.com/TalMizrahii/MVC-HatChat-Server/blob/main/res/Node.js_logo_2015.svg.png" alt="NODE" width="700"></a>
  <br>
  Hatchat MVC Server
  <br>
</h1>

<h4 align="center">The Hatchat MVC server was created to support the Hatchat applications. Developed as a project for the Advanced Programming 2 course at Bar-Ilan University.


<p align="center">
  <a href="#description">Description</a> •
  <a href="#implementation">Implementation</a> •
  <a href="#installing-and-executing">Installing And Executing</a> •
  <a href="#authors">Authors</a> 
</p>

## Description

The Hatchat [MVC](https://www.geeksforgeeks.org/mvc-framework-introduction/) server serves as the robust foundation of our application, contains the [Hatchat Mobile](https://github.com/TalMizrahii/HatchatMobileApp) app (Android) and the [Hatchat Web](https://github.com/TalMizrahii/AP2-Ex3) app , handling the backend logic and facilitating seamless communication with the database. It harnesses cutting-edge technologies and frameworks to ensure efficient and secure operation.


## Implementation

At the core of our server lies [Node.js](https://en.wikipedia.org/wiki/Node.js), a powerful JavaScript runtime built on [Chrome's V8](https://v8.dev/) JavaScript engine. Node.js enables us to develop scalable and high-performance server-side applications. Leveraging the flexibility and versatility of Node.js, our server delivers fast and reliable responses to client requests.

To streamline the development process and enhance the functionality of our server, we employ [Express.js](https://expressjs.com/) as the web application framework. Express.js simplifies the handling of [HTTP](https://en.wikipedia.org/wiki/HTTP) requests and enables us to set up intuitive API routes effortlessly. With its lightweight and minimalist design, Express.js allows us to build robust and modular applications.

<img width="382" alt="Socket" src="https://github.com/TalMizrahii/MVC-HatChat-Server/blob/main/res/1.jpg">

Real-time communication is a fundamental aspect of our application, and we achieve this by integrating [Socket.IO](https://socket.io/) into our server. Socket.IO enables bidirectional communication between the server and clients, empowering us to deliver real-time updates and notifications to our users. This technology facilitates seamless chat experiences, ensuring instant message delivery and synchronization across devices.

<img width="382" alt="Socket" src="https://github.com/TalMizrahii/MVC-HatChat-Server/blob/main/res/broadcasting.png">


Ensuring efficient data storage and retrieval, our server connects to a [MongoDB](https://www.mongodb.com/) database. MongoDB, a powerful [NoSQL](https://en.wikipedia.org/wiki/NoSQL) database, provides flexibility and scalability, making it an ideal choice for our application. To simplify our interaction with the database, we utilize Mongoose as an Object Data Modeling (ODM) library. Mongoose offers a user-friendly and intuitive interface, allowing us to define and manipulate data schemas effortlessly.

<img width="550" alt="ReactAPPMONGOGIT" src="https://github.com/TalMizrahii/MVC-HatChat-Server/blob/main/res/MERN.png">

Additionally, our server extends its capabilities by supporting [Firebase](https://firebase.google.com/) services for communication with The Hatchat Android app. By leveraging Firebase, we can efficiently identify the type of device making a new message request. This information enables us to send messages using the appropriate service, utilizing Firebase for Android devices and Socket.IO for the web app. This seamless integration ensures a consistent and optimized user experience across different platforms.

<img width="779" alt="serverWeb" src="https://github.com/TalMizrahii/MVC-HatChat-Server/assets/103560553/9a8d4cee-90e5-4a52-aad1-7277b3be0dc5">


Architecturally, our server follows the Model-View-Controller (MVC) design pattern. This pattern enhances code organization and separation of concerns, enabling easier maintenance and extensibility. The express module helps us structure our server-side code, allowing us to create an instance of the Express app to handle incoming HTTP requests effectively.

To facilitate communication between different components of our application, the server establishes a Socket.IO connection, enabling real-time communication with the Hatchat web app. This integration ensures smooth and responsive interactions, enhancing the user experience.

<img width="778" alt="serverAndroid" src="https://github.com/TalMizrahii/MVC-HatChat-Server/assets/103560553/a6d9726f-f05f-40aa-a978-8af5bb6ea643">

Furthermore, we establish API routes for users, tokens, and chats using dedicated routers (users, authenticator, and chat). These routes streamline the flow of data and operations within our application, ensuring secure and efficient communication between the client and server.

To enable cross-origin resource sharing (CORS), our server incorporates [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) support, allowing requests from specified origins. This configuration ensures that our application can communicate with external resources securely and efficiently, while maintaining strict access control.

With meticulous implementation and integration of these technologies and frameworks, our MVC Hatchat server stands as a reliable and scalable solution, empowering our application to deliver an immersive and engaging chat experience to our users.

## Installing And Executing
  
To clone and run the server, you'll need [Git](https://git-scm.com) installed on your computer. From your command line:

```bash
# Clone this repository.
$ git clone https://github.com/TalMizrahii/MVC-HatChat-Server

# Go into the repository.
$ cd MVC-HatChat-Server
  
# Go into the project folder.
$ cd hatchat_server
  
# Install the needed libraries.
$ npm install
  
# Start the program.
$ npm start
```


## Authors
* [@Yuval Arbel](https://github.com/YuvalArbel1)
* [@Tal Mizrahi](https://github.com/TalMizrahii)
