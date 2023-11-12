import express from 'express';
import { spawn } from 'child_process';

const router = express.Router();

let cached_url = "";
router.post('/get_link_data', (req, res) => {
    const { url } = req.body;
    cached_url = url;
    if (url != undefined) {
        console.log(url);
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
router.get('/downloads/:id', (req,res) => {
    const { id } = req.params;
    console.log(cached_url);
    if( cached_url != "" ) {
        const pythonProcess = spawn('python', ["./python_yt_dl_wrapper/python_ytdlp_wrapper.py", cached_url, 'id', id]);
        console.log(`Created a child process with id ${pythonProcess.pid}`)
        pythonProcess.stdout.on('data', (data) => {
            // Do something with the data returned from the Python script
            console.log(`stdout ${data}`); 
            
        });
        pythonProcess.stderr.on('data', (data) => {
            console.log(`${data}`)
        })
        pythonProcess.on('close', (code) => {
            console.log(`Child has exited with code ${code}`);
            res.download(`${id}.webm`)
        });
    } else {
        res.status(400).send("ERROR: Download is not ready.");
    }
    
});

export default router;