import { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { bookSchema } from '../schemas';
import { addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { BOOKS_REF, db } from '../firebase/config'

export default function BookForm({selectedBook, updateSelectedBook}) {
    
    //Boolean that is true if an already existing book is being edited
    const [editingBook, setEditingBook] = useState(false)

    const [successMessage, setSuccessMessage] = useState('')

    //A function that resets the succes message so that it isn't visible after a few seconds
    const removeSuccessMessage = () => {
        setTimeout(() => setSuccessMessage(""), 2000)
    }

    //Function for Clear -button
    const clearForm = () => {
        resetForm()
        updateSelectedBook(null)
        setEditingBook(false)
    }

    //Add book
    const onSubmit = async(values, actions) => {
        try{
            await addDoc(BOOKS_REF, {
                title: values.title,
                author: values.author,
                description: values.description
            })
            .then(function(){
                updateSelectedBook(null)
                //Just "resetForm()" works too, but let's use actions prop when possible
                actions.resetForm()
                setSuccessMessage("Book successfully added!")
                removeSuccessMessage()
            })
            
        }catch(err){
            alert("An error occurred when adding an item: " + err.message)
        }
        
    }

    //Delete book
    const deleteItem = async() => {
        try{
            if(selectedBook.id){
                let bookRef = doc(db, 'books', selectedBook.id)
                await deleteDoc(bookRef)
                .then(function() {
                    resetForm()
                    setEditingBook(false)
                    setSuccessMessage("Book successfully removed!")
                    removeSuccessMessage()
                })
            }else{
                throw new Error("No item selected!")
            }
        }catch(err){
            alert("An error occurred when deleting an item " + err.message)
        }
    }

    //Edit book 
    const editItem = async() => {
        try{
            if(selectedBook.id){
                let bookRef = doc(db, 'books', selectedBook.id)
                await updateDoc(bookRef, {
                    title: values.title,
                    author: values.author,
                    description: values.description
                })
                .then(function() {
                    resetForm()
                    setEditingBook(false)
                    setSuccessMessage("Book successfully edited!")
                    removeSuccessMessage()
                })
            }else{
                throw new Error("No item selected!")
            }
        }catch(err){
            alert("An error occurred when editing an item " + err.message)
        }
    }

    //Using Formik and Yup for creating and validating the book form. These are recommended by Meta. 
    //Destructuring useFormik to make calling values easier
    const { 
        values,
        errors,
        touched,
        resetForm,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
        setValues,
        } = useFormik({
        initialValues: {
            title:"",
            author:"",
            description:"",
        },
        validationSchema: bookSchema,
        onSubmit,
        clearForm
    });

    //TextAreaRef for updating the height of the textarea field
    const textAreaRef = useRef();

    useEffect(() => {
        //Update the height of text area box when the input changes and do it until the height reaches 400 pixels
        if (textAreaRef && textAreaRef.current && textAreaRef.current.scrollHeight < 500) {
            //Initial height of text area box
            textAreaRef.current.style.height = "200px";
            const textareaHeight = textAreaRef.current.scrollHeight;
            textAreaRef.current.style.height = textareaHeight + "px";
        }
    }, [values.description])


    //Update input fields with the selected item
    useEffect(() => {
            if(selectedBook != null){
                //If an item is selected, enable buttons "Save" and "Delete"
                setEditingBook(true)

                //Set values in input fields to match the selected item
                setValues({'title':selectedBook.title, 
                "author":selectedBook.author, 
                "description":selectedBook.description})
            }

    },[selectedBook, setValues])
    

    

    
  return (
    <Form autoComplete='off' onSubmit={handleSubmit} className="bookForm" >
        <Form.Group className="mb-3">
            <Form.Label htmlFor='title'>Title</Form.Label>
            <Form.Control 
            value={values.title || ''}
            onChange={handleChange} 
            data-testid="title" 
            id="title"
            type="text" 
            placeholder='Enter book title'
            // Validate the input field when user clicks away from it
            onBlur={handleBlur} 
            //If error exists and the input has been touched, add input-error class
            className={errors.title && touched.title ? "input-error" : ""}
            />

            {/* Show error message if it errors exist and input has been touched */}
            {errors.title && touched.title && <p className="error">{errors.title}</p>}
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label htmlFor='author'>Author</Form.Label>
            <Form.Control
            value={values.author || ''}
            onChange={handleChange} 
            data-testid="author" 
            id="author"
            type="text" 
            placeholder='Enter book author'
            onBlur={handleBlur}
            className={errors.author && touched.author ? "input-error" : ""}
            />

            {errors.author && touched.author && <p className="error">{errors.author}</p>}
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label htmlFor='description'>Description</Form.Label>
            <textarea
            ref={textAreaRef}
            className={errors.description && touched.description ? "form-control input-error" : "form-control"}
            value={values.description || ''}
            onChange={handleChange} 
            data-testid="description" 
            id="description"
            placeholder='Enter book description'
            onBlur={handleBlur}
            />

            {errors.description && touched.description && <p className="error">{errors.description}</p>}
        </Form.Group>

        <div className="primaryButtons">
            <Button variant="warning" data-testid="clearBtn" onClick={clearForm}>
                    Clear
            </Button>
        </div>
        <div className="primaryButtons">
            <Button variant="primary" data-testid="saveNewBtn" type="submit" disabled={isSubmitting}>
                Save New
            </Button>
            
            <Button variant="primary" data-testid="saveBtn" onClick={editItem} disabled={!editingBook} >
                Save
            </Button>
    
            <Button variant="primary" data-testid="deleteBtn" onClick={deleteItem} disabled={!editingBook}>
                Delete
            </Button>
        </div>
        <p className="successMessage">&nbsp; {successMessage}</p>
      
    </Form>
  )
}
