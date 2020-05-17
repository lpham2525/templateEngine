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
  `} //#where the dynamic HTML page ends

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
                </html >`)//#where the dynamic HTML page begins again and inserts  the ending HTML tags
        }
      })
      .catch(err => console.log(err))
  })
  .catch(err => console.log(err))