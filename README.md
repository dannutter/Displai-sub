# Dizplai Submission
Instructions:
1.Open both the API server and React apps visual studio file (optional).
2.Open command prompt in the respective directories.
3.To start the node app do node app.js
4.To start the React/Vite App do npm run dev.
5.Explore the website.

Questions:
● It needs to have a readme on how to run it, and explain anything you did not have
time to finish, or any assumptions that were made.
All requirements are met, I also did a very simple api endpoint and react page to display all of the polls because if I was using a database connection it would be easier to do it in a more efficient and scalable way.
● Show how you have tested both the frontend and backend to ensure it does not
break. What methods or tools did you use?
The image contained in the repo shows my postman api tests for the back end and for the front end I did manual testing but would ideally do unit testing given more time.
● We would not be able to deploy this from a security perspective. What are the
potential security problems? And, how could they be solved?
-Worries of Cross site scripting could be fixed with CORS headers.
-RBAC could restrict the user from voting multiple times.
-More input validation/sanitisation to prevent SQL injection and such.
-Logging on the API side could help detect and prevent security concerns
-Content Security Policy to prevent malicious code being run on user's devices
