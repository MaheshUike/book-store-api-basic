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

<!-- this middleware is use for to pass the json data through out the routes on each route click  -->


app.use(express.json());

//home route
<!-- this is the home route  -->

app.get("/", (req, res) => {
  res.status(200).send("This is the home paege.");
});


//get all books route
<!-- this is the  get all book route which will return all the data inside the  array of books -->

app.get("/get-all", (req, res) => {
  res.status(200).json(books);
});

//find single book route

app.get("/get-book/:id", (req, res) => {
  const bookID = parseInt(req.params.id);
  <!-- here we are getting the  id  from the  url which is  named as :id -->

  const singleBook = books.find((item) => item.id === bookID);
  <!-- from array of books we need to find the id  which is same as the id of url 
  books.id === url id -->

<!-- if book is available then return that book -->
  if (singleBook) {
    res.status(200).json(singleBook);
  } else { 
    <!-- else throw the error -->
    res.status(404).json({
      message: "Error while fetching book ! please try some other ID",
    });
  }
});

//add new book route
<!-- 
    this is the route for adding  new book into the array
 -->
app.post("/add-book", (req, res) => {

 <!-- creating the new object which will be having id and title as the key 
    id : array_of_length +1
    title : bookname / array_of_length+1
  -->
  const newBook = {
    id: books.length + 1,
    title: `Book ${books.length + 1}`,
  };

  books.push(newBook);
  <!-- push that newly created object into the array of object books  -->

  res.status(200).json({
    message: "new book is added",
    data: newBook,
  });
  <!-- once added into the that array send the response that book is added -->
});

//update  book route
<!-- this is for updating the perticular book with  id which we are getting from url and  finding that id into the array of objet which ever first is going to match update it  -->

app.put("/update-book/:id", (req, res) => {
  const bookID = parseInt(req.params.id);
  <!-- getting id from url  -->

  const updateBook = books.find((item) => item.id === bookID);
  <!-- checking wheather the book of that particular id is present -->
  if (updateBook) {
    updateBook.title = req.body.title || updateBook.title;
    <!-- now changes the title to the desired one using body , body has an access to entire array  so we are doing req.body.title --> <!-- for that perticular id changes this title will change that particular object -->
    res.status(200).json({
      message: "Title updated successfully ",
      data: updateBook,
    });
    <!-- send the response as success -->
  } else {
    res.status(404).json({
      message: "Book not found  please try again ! with different  ID ",
    });
    <!-- throw error book not found  -->
  }
});

// delete book

app.delete("/delete-book/:id", (req, res) => {
  let deleteBookID = parseInt(req.params.id);
<!-- getting id from url -->
  const deleteBook = books.findIndex((item) => item.id === deleteBookID);
<!-- finding the index of that id  in an array of object -->
  if (deleteBook !== -1) {
    <!-- just making sure the id must not be -1  -->
    const deletedBook = books.splice(deleteBook, 1);
    <!-- if found delete /splice the first element with the same id from the  arra[y] -->
    res.status(200).json({
      message: "book delete successfully",
      data: deletedBook,
      <!-- send success reply -->
    });
  } else {
    res.status(404).json({
      message: "Book not found  please try again ! with different  ID ",
    });
    <!-- throw error -->
  }
});

app.listen(PORT, () => {
  console.log(" BookStoreAPI - running on  port no : ", PORT);
});
#   b o o k - s t o r e - a p i - b a s i c  
 