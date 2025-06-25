import express from "express";

const app = express();
const PORT = 8000;

const books = [
  {
    id: 1,
    title: "Book 1",
  },
  {
    id: 2,
    title: "Book 2",
  },
  {
    id: 3,
    title: "Book 3",
  },
];

// middleware


app.use(express.json());

//home route

app.get("/", (req, res) => {
  res.status(200).send("This is the home paege.");
});

//get all books route

app.get("/get-all", (req, res) => {
  res.status(200).json(books);
});

//find single book route
app.get("/get-book/:id", (req, res) => {
  const bookID = parseInt(req.params.id);

  const singleBook = books.find((item) => item.id === bookID);

  if (singleBook) {
    res.status(200).json(singleBook);
  } else {
    res.status(404).json({
      message: "Error while fetching book ! please try some other ID",
    });
  }
});

//add new book route

app.post("/add-book", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: `Book ${books.length + 1}`,
  };

  books.push(newBook);

  res.status(200).json({
    message: "new book is added",
    data: newBook,
  });
});

//update  book route

app.put("/update-book/:id", (req, res) => {
  const bookID = parseInt(req.params.id);

  const updateBook = books.find((item) => item.id === bookID);
  if (updateBook) {
    updateBook.title = req.body.title || updateBook.title;
    res.status(200).json({
      message: "Title updated successfully ",
      data: updateBook,
    });
  } else {
    res.status(404).json({
      message: "Book not found  please try again ! with different  ID ",
    });
  }
});

// delete book

app.delete("/delete-book/:id", (req, res) => {
  let deleteBookID = parseInt(req.params.id);

  const deleteBook = books.findIndex((item) => item.id === deleteBookID);

  if (deleteBook !== -1) {
    const deletedBook = books.splice(deleteBook, 1);
    res.status(200).json({
      message: "book delete successfully",
      data: deletedBook,
    });
  } else {
    res.status(404).json({
      message: "Book not found  please try again ! with different  ID ",
    });
  }
});

app.listen(PORT, () => {
  console.log(" BookStoreAPI - running on  port no : ", PORT);
});
