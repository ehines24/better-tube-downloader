import express from 'express';
import { spawn } from 'child_process';

const router = express.Router();

router.post('/get_link_data', (req, res) => {
    const { url } = req.body;
    if (url != undefined) {
        const pythonProcess = spawn('python', ["../python_yt_dl_wrapper/python_ytlp_wrapper.py", url]);

         pythonProcess.stdout.on('data', (data) => {
            // Do something with the data returned from the Python script
            console.log(data); 
            res.json(data)
         });
    } else {
        res.status(400).send("ERROR: Bad json body.");
    }
});

export default router;