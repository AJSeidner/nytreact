# nytreact
A recreation of our NYT Article scrubbing app using Node/Express/MongoDB/ReactJS.


# tech
We utilize React as the frame work for this applicaiton, allowing us to modify the DOM.  

We utilize mongoose to communicate with MongoDB to store the user's saved articles.

We use Axios to make a call to the New York Times API.

We use Node and Express for our back-end framework.


# functionality
A user can enter a search topic, a beginning year, and an end year to scrub for articles within the New York Times API that have their search topic in the title that was published between/during the listed years.

After the application returns these articles, the user has the options of viewing and/or saving the articles.

When saved, the article will be saved to MongoDB and the user can view their saved articles on the "Saved" page.

On the "Saved" page, the user has the ability to delete articles from the database.


