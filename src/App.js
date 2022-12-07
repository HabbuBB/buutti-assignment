import './styles/main.css';
import './styles/manageBooks.css'
import './styles/browseBooks.css'
import { Row, Col } from 'react-bootstrap'
import Footer from './components/Footer'
import HeadingBox from './components/HeadingBox';
import BookForm from './components/BookForm';
import BooksList from './components/BooksList';
import { useState, useEffect, useRef } from 'react';

function App() {
  //Pass function setSelectedBook to parent component's children for updating the selected book, that will be used when editing values in BookForm.js
  //If there were more variables to keep track of, I would use React Context
  const [selectedBook, setSelectedBook] = useState(null)
  const bookFormRef = useRef(null);

  //Use useEffect for this because it includes a react side-effect.
  //If user is on mobile, scroll to the book form if an item is clicked
  useEffect(() => {
    if(window.innerWidth < 651){
      bookFormRef.current.scrollIntoView({
        behaviour: "smooth"
      })
    }
  }, [selectedBook])
  


  return (
    <div>
      <Row className="mainBody">
        {/* Left side */}
        <Col className="browseBlock">
          <HeadingBox><h1>BROWSE BOOKS</h1></HeadingBox>
          <BooksList updateSelectedBook={setSelectedBook} />
        </Col>
        {/* Right side */}
        <Col className="manageBlock" ref={bookFormRef}>
          <HeadingBox><h1>MANAGE BOOKS</h1></HeadingBox>
          <BookForm selectedBook={selectedBook} updateSelectedBook={setSelectedBook} />
        </Col>
      </Row>
      <Row>
        <Footer />
      </Row>
    </div>
  );
}

export default App;
