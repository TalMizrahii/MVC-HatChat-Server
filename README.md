<h1 align="center">
  <br>

  <a href="https://github.com/TalMizrahii/MVC-HatChat-Server"><img src="https://github.com/TalMizrahii/MVC-HatChat-Server/assets/103560553/8afe059b-e511-4835-bf48-9b16b2e2ef2c" alt="HTML" width="800"></a>
  <br>
  Hatchat MVC Server
  <br>
</h1>

<h4 align="center">The Hatchat MVC server was created to support the Hatchat Mobile app (Android) and the Hatchat Web app. Developed as a project for the Advanced Programming 2 course at Bar-Ilan University.


<p align="center">
  <a href="#description">Description</a> •
  <a href="#implementation">Implementation</a> •
  <a href="#installing-and-executing">Installing And Executing</a> •
  <a href="#authors">Authors</a> 
</p>

## Description

The Hatchat MVC server serves as the robust foundation of our application, handling the backend logic and facilitating seamless communication with the database. It harnesses cutting-edge technologies and frameworks to ensure efficient and secure operation.


## Implementation

At the core of our server lies Node.js, a powerful JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js enables us to develop scalable and high-performance server-side applications. Leveraging the flexibility and versatility of Node.js, our server delivers fast and reliable responses to client requests.

To streamline the development process and enhance the functionality of our server, we employ Express.js as the web application framework. Express.js simplifies the handling of HTTP requests and enables us to set up intuitive API routes effortlessly. With its lightweight and minimalist design, Express.js allows us to build robust and modular applications.

<img width="382" alt="Socket" src="https://github.com/TalMizrahii/MVC-HatChat-Server/assets/103560553/e986bdbe-4564-4223-aa24-92b26c171f20">

Real-time communication is a fundamental aspect of our application, and we achieve this by integrating Socket.IO into our server. Socket.IO enables bidirectional communication between the server and clients, empowering us to deliver real-time updates and notifications to our users. This technology facilitates seamless chat experiences, ensuring instant message delivery and synchronization across devices.

<img width="382" alt="Socket" src="https://github.com/TalMizrahii/MVC-HatChat-Server/assets/103560553/afacda6b-d274-4a33-bdb4-adb116920c28">


Ensuring efficient data storage and retrieval, our server connects to a MongoDB database. MongoDB, a powerful NoSQL database, provides flexibility and scalability, making it an ideal choice for our application. To simplify our interaction with the database, we utilize Mongoose as an Object Data Modeling (ODM) library. Mongoose offers a user-friendly and intuitive interface, allowing us to define and manipulate data schemas effortlessly.

<img width="700" alt="ReactAPPMONGOGIT" src="https://github.com/TalMizrahii/MVC-HatChat-Server/assets/103560553/470d32dd-fc6a-48b1-9de8-d69746f08386">

Additionally, our server extends its capabilities by supporting Firebase services for communication with The Hatchat Android app. By leveraging Firebase, we can efficiently identify the type of device making a new message request. This information enables us to send messages using the appropriate service, utilizing Firebase for Android devices and Socket.IO for the web app. This seamless integration ensures a consistent and optimized user experience across different platforms.

<img width="779" alt="serverWeb" src="https://github.com/TalMizrahii/MVC-HatChat-Server/assets/103560553/9a8d4cee-90e5-4a52-aad1-7277b3be0dc5">


Architecturally, our server follows the Model-View-Controller (MVC) design pattern. This pattern enhances code organization and separation of concerns, enabling easier maintenance and extensibility. The express module helps us structure our server-side code, allowing us to create an instance of the Express app to handle incoming HTTP requests effectively.

To facilitate communication between different components of our application, the server establishes a Socket.IO connection, enabling real-time communication with the Hatchat web app. This integration ensures smooth and responsive interactions, enhancing the user experience.

<img width="778" alt="serverAndroid" src="https://github.com/TalMizrahii/MVC-HatChat-Server/assets/103560553/a6d9726f-f05f-40aa-a978-8af5bb6ea643">

Furthermore, we establish API routes for users, tokens, and chats using dedicated routers (users, authenticator, and chat). These routes streamline the flow of data and operations within our application, ensuring secure and efficient communication between the client and server.

To enable cross-origin resource sharing (CORS), our server incorporates CORS support, allowing requests from specified origins. This configuration ensures that our application can communicate with external resources securely and efficiently, while maintaining strict access control.

With meticulous implementation and integration of these technologies and frameworks, our MVC Hatchat server stands as a reliable and scalable solution, empowering our application to deliver an immersive and engaging chat experience to our users.

## Installing And Executing
  
To clone and run this application, you'll need [Git](https://git-scm.com) installed on your computer. From your command line:




## Authors
* [@Yuval Arbel](https://github.com/YuvalArbel1)
* [@Tal Mizrahi](https://github.com/TalMizrahii)
