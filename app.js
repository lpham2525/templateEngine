const { prompt } = require('inquirer')
const { writeFile, appendFile } = require('fs')
const { promisify } = require('util')
const writeFileSync = promisify(writeFile)
const appendFileSync = promisify(appendFile)
let responses = ''
let done = false

const top = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Engineering Team</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</head>
<body>`

const employee = responses => {
  return `
  <div class="card bg-info mb-3" style="width:18rem;">
    <div class="card-body">
      <h5 class="card-title text-white bg-info mb-3">${responses.name}
      <br>Role: ${responses.role}</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${responses.id}</li>
            <li class="list-group-item">Title: ${responses.title}</li>
            <li class="list-group-item">Email: ${responses.email}</li>
          </ul>
   </div>
  </div>
  `}

writeFileSync('team.html', top)
  .then(() => {
    prompt([
      {
        type: "input",
        name: "name",
        message: "What is your name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is your id?"
      },
      {
        type: "input",
        name: "title",
        message: "What is your title in the company?"
      },
      {
        type: "input",
        name: "email",
        message: "What is your email?",
      },
      {
        type: "list",
        name: "role",
        message: "What is your role in the company?",
        choices: ["manager", "engineer", "intern"]
      }
    ])

      .then(responses => {
        console.log(responses)
        done = true
        appendFileSync('team.html', employee(responses))
        if (employee(responses) && done === true) {
          appendFileSync('team.html', `</body>
                </html >`)
        }
      })
      .catch(err => console.log(err))
  })
  .catch(err => console.log(err))