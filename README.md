DELSECTO!

Find a way to make the connection of languages and questions to create a questions page for each language
Ex: (localhost: 4000/questions/html)
            --Can create individually or have them generated when someone asks a question

Have the login page submit to a profile that contains the id of the user

Have questions post to the specific language from the dropdown list (may have to make them a link)

Functionality for submit button

Possibly remove the full functionality of ask a question form the home page,
make it so that its a link to the ask a question page because it seems to deplete the purpose
of the ask page.

Create link for the questions from the home page so that it starts off our question page and allows a template
to send questions to. Maybe add more questions to add a question for each language and allow the creation
of each languages question page.


<% if (questions.length) { %>
            <% questions.forEach((question) => { %>
              <a href="/questions/<%= question._id %>">
                <h4><%= question.questions %></h4>
              </a>
            <% }) %>
          <% } else { %>
            <h4>No Questions found</h4>
          <% } %>