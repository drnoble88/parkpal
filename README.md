##### What is Parkpal? and how does Parkpal work?

Parkpal is a comprehensive trip planner for park activities in any national park within the 50 states of the USA and its territories. Users can explore detailed information, including park descriptions, available activities, and captivating pictures of specific national parks they wish to inquire about.

When planning a trip to a national park, users have two convenient options. The first option is to utilize the "Create Trip" feature located in our navigation bar. By selecting the desired state and park, users can easily access a curated list of activities available in that specific location.

Alternatively, users can click on the "Create a Trip" button next to the name of the national park on our details page. This seamless action will instantly redirect them to the trip creation page, with the national park's name and activities already displayed for their convenience.

Users can also view their created trips by clicking on the "My Trips" link in the navigation bar. On this page, they will find their trips displayed in a visually appealing card format. Each card will showcase a picture of the national park, along with the start and end dates of their visit and the activities they have planned.

Furthermore, users have the flexibility to edit or delete their trips directly from the cards. By clicking on the "Edit" button, users will be seamlessly redirected to another page where they can modify the start date, end date, and activities for their trip. This convenient feature ensures that users can easily make adjustments to their planned itinerary.

With Parkpal, planning an unforgettable trip to a national park has never been easier.

##### How it's built?

Parkpal utilizes four Docker containers to power the entire website. These containers are:

"ghi": This container represents the React component responsible for handling the frontend of the website.
"db-1": This container hosts our PostgreSQL database, serving as the backend storage for our application.
"fastapi": This container encompasses our backend framework, FastAPI, which enables us to define and manage API routes.
"pg=admin": This container serves as a graphical user interface (GUI) for our PostgreSQL database, enhancing the usability and administration capabilities.

By leveraging these four Docker containers, Parkpal ensures efficient and scalable deployment of its website components, facilitating seamless communication between the frontend, backend, and database layers.

#### What is the future of Parkpal?
Parkpal was designed as a valuable resource and organizational tool for individuals who have a desire to explore national parks within the US. We are committed to consistently providing refreshing updates to our website, introducing enhanced features to further enhance the user experience.

Upcoming updates will include the integration of Google Maps, allowing users to easily locate and navigate to specific parks. Additionally, we are working on incorporating additional information such as pricing details, enabling users to make informed decisions about their park visits. Furthermore, we are developing a favorites list functionality, allowing users to create a personalized collection of national parks they wish to visit.

Please note that these features are currently in progress and are subject to change as we strive to continually improve Parkpal based on user feedback and evolving needs.
