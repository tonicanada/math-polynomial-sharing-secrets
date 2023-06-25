# math-polynomial-sharing-secrets

This web-app serves a practical example of the concepts discussed in the article [How To Share a Secret](https://web.mit.edu/6.857/OldStuff/Fall03/ref/Shamir-HowToShareASecret.pdf) written by [Adi Shamir](https://en.wikipedia.org/wiki/Adi_Shamir) (MIT) and published in Communications of the ACM, November 1979, Volume 22, Number 11.

The methodology described in the article is based on a fundamental property of polynomial interpolation. To facilitate a deeper comprehension of the technique, we have included a button below that leads to an "Interpolation Playground". This interactive tool enables users to explore and grasp the inner workings of the method more effectively.

The idea is simple: you want to generate a secret number that can only be discovered when certain people provide "their codes". The application generates this secret number and the associated codes to be shared. By clicking on "generate secret" the user will be able to download an excel file with the codes to be distributed. This file can only be downloaded once.

### Configuration
Before running the application, ensure you have set up the necessary environment variables. These variables are stored in a file named `.env`.

To configure the environment variables, follow these steps:
1. Create a new file named `.env` in the server directory of the project.
2. Open the `.env` file and define the following required variables:

    * `PORT`: The port on which the server will listen for incoming connections. Choose a port number that is not already in use.
    * `MONGO_URL`: The connection URL for your MongoDB database. This should include the protocol, hostname, port (if applicable), and the name of the database.
    * `GOOGLE_OAUTH_CLIENT_ID`: The client ID for Google OAuth authentication. Obtain this value by creating a project in the Google Developer Console and enabling the Google OAuth API.
    * `GOOGLE_OAUTH_CLIENT_SECRET`: The client secret for Google OAuth authentication. This is obtained along with the client ID mentioned above.
    * `COOKIE_KEY_1` and `COOKIE_KEY_2`: Two secret keys used for encrypting and decrypting cookies. These keys should be long and randomly generated for better security.

Ensure yo have obtained the necessary values for these variables and added them to the `.env` file. Without the correct values, the application may not function as expected.


### Commands

#### `npm run install`
This command will ensure that all the necessary dependencies are installed for the proper functioning of the web application, including both the client-side and server-side dependencies.

#### `npm run deploy`
The "npm run deploy" command executes the following steps:
1. It initiates a build process for the client-side application, which is developed using React.
2. During the build, the client application is compiled, optimized, and bundled into a production-ready version.
3. Once the build is complete, the resulting files are saved in the "public" folder of the server.
4. The server is then able to serve the client application to users in a production environment, typically on port 8000.

By running "npm run deploy" you ensure that the client application is built and made available for deployment on the server, allowing it to be accessed by users for production use.

### Docker usage
To run the application using Docker, follow the steps below:
1. Make sure you have Docker installed on your system. Refer to the Docker documentation for installation instructions specific to your operating system.
2. Clone this repository to your local machine.
3. Create the `.env` file as explained before.
4. Build the Docker image by running the following command:
```
docker build -t your_image_name .
```
5. Once the image is built, you can run a Docker container using the following command:
```
docker run -p 8000:8000 -d your_image_name
```
6. Access the application by navigating to `http://localhost:8000` in your web browser. You should be able to interact with the app running inside the Docker container.
7. To stop the containeer, finds its container ID by running `docker ps` and then execute the command:
```
docker stop container_id
```



