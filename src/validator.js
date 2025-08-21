const ValidationError=require( "./customError");

function validateBook(book) {
  const errors = {};

  
  if (!book?.title || typeof book.title !== "string") {
    errors.title = "Title is required and must be a string.";
  }

  
  if (!book?.author || typeof book.author !== "string") {
    errors.author = "Author is required and must be a string.";
  }

  
  if (book?.stock === undefined || typeof book.stock !== "number") {
    errors.stock = "Stock is required and must be a number.";
  } else if (!Number.isInteger(book.stock) || book.stock <= 0) {
    errors.stock = "Stock must be a positive integer.";
  }

 
  if (book?.publishedYear !== undefined) {
    const currentYear = new Date().getFullYear();
    if (
      typeof book.publishedYear !== "number" ||
      book.publishedYear < 1000 ||
      book.publishedYear > currentYear
    ) {
      errors.publishedYear = "Published year must be a valid year.";
    }
  }
  

    if (Object.keys(errors).length > 0) {
    throw new ValidationError(errors);
  }
  return {title:book.title,author:book.author,publishedYear:book.publishedYear??'',genre:book.genre??'',stock:book.stock}
}
module.exports= validateBook