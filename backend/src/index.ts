import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3880;

app.get('/', (req: Request, res: Response) => {
    res.send('Olá 20!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});