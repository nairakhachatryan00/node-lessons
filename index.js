import Express from 'express';
import BodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

const app = Express();
app.use(BodyParser.json());
const port = process.env.PORT || 3000;


let books = [
    {
        "title": "Jane Eyre",
        "description": "The narrative is in the first person, the action takes place somewhere in the northern part of England at the end of the reign of George III . Jane Eyre 's parents died when she was very young, and she was taken in by her mother's brother, Mr. Reed, who also died soon after.",
        "author": "Sharlot Bronte",
        "year": 1687,
        "category": "Romance",
        "id": "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b"
    },
    {
        "title": "A Game of Thrones",
        "description": "Upon the death of Lord Jon Arryn, the principal advisor to King Robert Baratheon, Robert recruits his childhood friend Eddard \"Ned\" Stark, now Warden of the North, to replace Arryn as Hand of the King, and to betroth his daughter Sansa to Robert's son Joffrey. Ned accepts the position when he learns that Arryn's widow Lysa believes he was poisoned by Robert's wife Queen Cersei Lannister and her family. Shortly thereafter, Ned's son Bran discovers Cersei having sex with her twin brother Jaime Lannister, who throws Bran from the tower to conceal their affair, leaving him comatose and paralyzing his legs.",
        "author": "George Raymond Richard Martin",
        "year": 1996,
        "category": "Fantasy",
        "id": "6a1a613b-2e64-4127-a6e7-1fd00bcacc74"
    }
];

app.get('/', (req, res) => {
    // let result = `<table style="border: 1px solid grey">
    //     <thead>
    //         <tr>
    //           <th style="border: 1px solid grey">Id</th>
    //           <th style="border: 1px solid grey">Title</th>
    //           <th style="border: 1px solid grey">Description</th>
    //           <th style="border: 1px solid grey">Author</th>
    //           <th style="border: 1px solid grey">Year</th>
    //         </tr>
    //     </thead>
    //     <tbody>`;
    // books.forEach(book => {
    //     result += `<tr>
    //                   <td style="border: 1px solid grey">${book.id}</td>
    //                   <td style="border: 1px solid grey">${book.title}</td>
    //                   <td style="border: 1px solid grey">${book.description.slice(0,50)}...</td>
    //                   <td style="border: 1px solid grey">${book.author}</td>
    //                   <td style="border: 1px solid grey">${book.year}</td>
    //                </tr>`;
    // })
    // result += `</tbody></table>`;
    res.status(200).send(books);
});

app.post('/', (req, res) => {
    let book = req.body;
    let errMsg = [];
    if(!book.title) {
        errMsg.push('Title is required.')
    }
    if(!book.author) {
        errMsg.push('Author is required.')
    }
    if(!book.year || (typeof book.year !== 'number') || book.year > 2021 ) {
        errMsg.push('Year is required and need to less then 2021.')
    }
    if(errMsg.length) {
        res.status(400).send(errMsg.join(' '));
    }
    book.id = uuidv4();
    books.push(book);
    res.status(201).send(book);
});

app.get('/books/:id', (req, res) => {
    let index = books.findIndex(book => book.id === req.params.id);
    if(index === -1) {
        res.status(404).send('The object not found');
    }
    res.status(201).send(books[index]);
});

app.put('/books/:id', (req, res) => {
    let index = books.findIndex(book => book.id === req.params.id);
    if(index === -1) {
        res.status(404).send('The object not found');
    }
    books[index] = req.body;
    res.status(201).send(books[index]);
});

app.patch('/books/:id', (req, res) => {
    let index = books.findIndex(book => book.id === req.params.id);
    if(index === -1) {
        res.status(404).send('The object not found');
    }
    books[index] = Object.assign( books[index], req.body);
    res.status(201).send(books[index]);
});

app.delete('/books/:id', (req, res) => {
    let index = books.findIndex(book => book.id === req.params.id);
    if(index === -1) {
        res.status(404).send('The object not found');
    }
    books = books.filter(book => book.id !== req.params.id)
    res.status(201).send(`The book successfully deleted`);
});




app.listen(port, () => console.log(`Server is listening on port ${port}`));
