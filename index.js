//imports
const express = require("express")
// const projectRouter = require("./projects/project-router")
// const actionRouter = require("./actions/action-router")
const welcomeRouter = require("./welcome/welcome-router")

//express server
const server = express()
const port = 8888
server.use(express.json())

//routes
server.use('/', welcomeRouter)
// server.use('/projects', projectRouter)
// server.use('/projects/:id/actions', actionRouter)

//server listening
server.listen(port, () => {
    console.log(`server is listening at port: ${port}`)
  })