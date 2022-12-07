import { useEffect, useState } from 'react'
import SingleBook from './SingleBook'
import { BOOKS_REF } from '../firebase/config'
import { onSnapshot } from 'firebase/firestore'
import { Spinner } from 'react-bootstrap'


//BooksList is it's own component just to maintain a consistent project structure!
export default function BooksList({updateSelectedBook}) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true)

    

    useEffect(() => {
        setLoading(true)

        const unsub = onSnapshot(BOOKS_REF, (querySnapshot) => {
            //Fetch all items using the books reference, loop through the results (docs) and set them to books state
            const items = querySnapshot.docs.map((doc) => {
                return {id: doc.id, ...doc.data()}
            })
            setBooks(items)
            setLoading(false)
        })

        return () => {
            //unsub from firestore updates when the component unmounts
            unsub()
        }

    }, [])
    
    if(loading){
        return(
            <div className="bookListLoading">
                <Spinner variant="primary" animation="border" />
                <h3>Loading books...</h3>
            </div>
        )
    }else{
        return (
            <div className="booksList">
                {books.map((book) => {
                    return(
                        <div key={book.id}>
                            {/* Send the top-level function for selecting a book to the single item component */}
                            <SingleBook item={book} updateSelectedBook={updateSelectedBook} />
                            <hr className="divider" />
                        </div>
                    )
                })}
            </div>
        )
    }
    }
