const express = require ("express");
const PORT = 1200;

const postRouter = require ('./router/postRoute');
const app = express();
app.use(express.json());
app.use(express.static('./uploads'))

app.get('/',(req,res) => {
    res.send('Welcome to kora blog')
} )

app.listen(PORT, () => {
    console.log('listening on port.....'+ PORT)
})

app.use('/api',postRouter)
app.use('/uploaded-image',express.static(process.cwd() + '/uploads'));