import express from 'express';
import { spawn } from 'child_process';

const router = express.Router();

router.post('/get_link_data', (req, res) => {
    const { url } = req.body;
    if (url != undefined) {
        // const pythonProcess = spawn('python', ["/path/to/script.py", arg1, ..]);

        // pythonProcess.stdout.on('data', (data) => {
            // Do something with the data returned from the Python script
            // res.json(data)
        // });
    }
});

export default router;