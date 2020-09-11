const app = require('./server.js')

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is up and listening at port: ${PORT}`)
})