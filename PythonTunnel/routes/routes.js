import express from 'express';
import { spawn } from 'child_process';

const router = express.Router();

router.post('/get_link_data', (req, res) => {
    const { url } = req.body;
    if (url != undefined) {
        console.log(url)
        const pythonProcess = spawn('python', ["./python_yt_dl_wrapper/python_ytdlp_wrapper.py", url]);
        console.log(`Created a child process with id ${pythonProcess.pid}`)
         pythonProcess.stdout.on('data', (data) => {
            // Do something with the data returned from the Python script
            console.log(`stdout ${data}`); 
            res.json(JSON.parse(data.toString()));
         });
    } else {
        res.status(400).send("ERROR: Bad json body.");
    }
});

export default router;