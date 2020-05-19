const { prompt } = require('inquirer')
const { writeFile, appendFile } = require('fs')
const { promisify } = require('util')
const writeFileSync = promisify(writeFile)
const appendFileSync = promisify(appendFile)
const Manager = require('./lib/manager')
const Engineer = require('./lib/engineer')
const Intern = require('./lib/intern')
let teammate = ''
let responses = ''
let role = ''
let team = []

const top = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Engineering Team</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  <style>
  body{
    text-align: center;
  }

  .bar{
    text-align: center;
    font-size: 80px;
    background-color: salmon;
    color: white;
    width: 100%;
    height: 100px;
    }

  .info {
      margin: 50px;
      display: inline-block;
    }
  </style>
</head>
<body>
<div class="bar">Team Roster</div>
`

function start() {
  console.log("Welcome to the Template Engine!")
  prompt([
    {
      type: "list",
      name: "role",
      message: "Which role do you want to input?",
      choices: ["manager", "engineer", "intern", "None. I'm done."]
    }
  ])
    .then(response => {
      let roleQuestion
      let questionList
      switch (response.role) {
        case "manager":
          roleQuestion = getOffice()
          questionList = questions(roleQuestion)
          askQuestions(questionList, createManager)
          break
        case "engineer":
          roleQuestion = getGithub()
          questionList = questions(roleQuestion)
          askQuestions(questionList, createEngineer)
          break
        case "intern":
          roleQuestion = getSchool()
          questionList = questions(roleQuestion)
          askQuestions(questionList, createIntern)
          break
        case "None. I'm done.":
          appendFileSync('./output/team.html',
            `</body>
                  </html >`)
        default:
          break
      }
    })
    .catch(err => console.log(err))
}

function createTeam() {
  writeFileSync('./output/team.html', top)
    .then(responses => {
      console.log(responses)
      appendFileSync('./output/team.html', responses)
    })
    .catch(err => console.log(err))
}

function createManager() {
  let teammate = new Manager(responses.name, responses.role, responses.id, responses.email, responses.office)
  responses = `
  <div class="info">
    <div class="card bg-info mb-3" style="width:18rem;">
      <div class="card-body">      
        <h5 class="card-title text-white bg-info mb-3">${responses.name}
        <br>Role: ${responses.role}</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${responses.id}</li>
            <li class="list-group-item">Email: ${responses.email}</li>
            <li class="list-group-item">Office Number: ${responses.office}</li>
          </ul>
      </div>
    </div>
  </div>`
  team.push(teammate)
  createTeam()
  start()
}

function createEngineer() {
  let teammate = new Engineer(responses.name, responses.role, responses.id, responses.title, responses.email, response.github)
  responses = `
  <div class="info">
    <div class="card bg-info mb-3" style="width:18rem;">
      <div class="card-body">      
        <h5 class="card-title text-white bg-info mb-3">${responses.name}
        <br>Role: ${responses.role}</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${responses.id}</li>
            <li class="list-group-item">Title: ${responses.title}</li>
            <li class="list-group-item">Email: ${responses.email}</li>
            <li class="list-group-item">Github: ${responses.github}</li>
          </ul>
      </div>
    </div>
  </div>`
  team.push(teammate)
  createTeam()
  start()
}


function createIntern(responses) {
  let teammate = new Intern(responses.name, responses.role, responses.id, responses.email, response.school)
  responses = `
  <div class="info">
    <div class="card bg-info mb-3" style="width:18rem;">
      <div class="card-body">      
        <h5 class="card-title text-white bg-info mb-3">${responses.name}
        <br>Role: ${responses.role}</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${responses.id}</li>
            <li class="list-group-item">Email: ${responses.email}</li>
            <li class="list-group-item">School: ${responses.role}</li>
          </ul>
      </div>
    </div>
  </div>`
  team.push(teammate)
  createTeam()
  start()
}

function askQuestions(questionList, roleCreate) {
  prompt(questionList)
}

function questions(roleQuestion) {
  const questions = [
    {
      type: "input",
      name: "name",
      message: "What is the teammate's name?",
      validate: answer => {
        if (!answer == '') {
          return true
        } else {
          return "Please type in something for name."
        }
      }
    },
    {
      type: "input",
      name: "id",
      message: "What is the teammate's id?",
      validate: answer => {
        if (!answer == '') {
          return true
        } else {
          return 'Please type in something for id.'
        }
      }
    },
    {
      type: "input",
      name: "email",
      message: "What is the teammate's email?",
      validate: answer => {
        if (!answer == '') {
          return true
        } else {
          return 'Please type in something for email.'
        }
      }
    }
  ]
  questions.push(roleQuestion)
  return questions
}

function getOffice() {
  return {
    type: "input",
    name: "office",
    message: "What is the manager's office number?"
  }
}

function getGithub() {
  return {
    type: "input",
    name: "github",
    message: "What is the engineer's Github username?"
  }
}

function getSchool() {
  return {
    type: "input",
    name: "school",
    message: "Which school does the intern attend?"
  }
}

start()