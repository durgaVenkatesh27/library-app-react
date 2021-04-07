let UserInfoLocale = {
    "label": "Enter User",
    "userName": "Enter User Name: ",
    "addButtonTxt": "Add User",
    "successMessage": "User Added Successfully",
    "errorMessage": "User Should not be Empty",
    "userTableColumns": ["UsedId", "User Name ", "Book Ids"]
}

let BookInfoLocale = {
    "label": "Enter Book",
    "bookName": "Enter Book Title: ",
    "addButtonTxt": "Add Book",
    "successMessage": "Book Added Successfully",
    "errorMessage": "Book Should not be Empty",
    "bookTableColumns": ["BookId", "Book Title"]
}

let MaintainLibraryLocale = {
    "selectUser": "Select User :",
    "bookName": "Enter Book Title: ",
    "returnBookHeader": "Borrowed List",
    "borrowBookHeader": "Library",
    "noBooksAvaliable": "Sorry, Currently no books are available in Library",
    "notValidToBorrowMsg": "User can only borrow 2 Books",
    "notValidToReturn": "No Books are Avilable in BorrowList",
    "bookBorrowColumns": ["BookId", "Book Title", "Action"],
    "borrowButtonTxt": "Borrow",
    "returnButtonTxt": "Return",
    "borrowSuccessMessage": " Book added to Borrowed list Sucessfully",
    "returnSuccessMessage": "Book returned Successfully",
    "userNotAvailable": " User Not Selected. Please select user "
}

export { UserInfoLocale, BookInfoLocale, MaintainLibraryLocale };