import React from 'react'
import { Route, Link } from 'react-router-dom'
import Search from './Search'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      reading: [],
      want: [],
      read: []
    }
  }

  fetchAll() {
    BooksAPI.getAll().then((data) => {
      this.setState({
        reading: data.filter((d) => d.shelf === 'currentlyReading'),
        want: data.filter((d) => d.shelf === 'wantToRead'),
        read: data.filter((d) => d.shelf === 'read')
      })
    })
  }

  componentDidMount() {
    this.fetchAll()
  }

  changeShelf = (id, shelf) => {
    BooksAPI.update({id}, shelf).then((data) => {
      this.fetchAll()
    })
  }

  render() {
    return (
      <div className="app">
          <Route path="/" exact render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <BookShelf heading="Currently Reading" books={this.state.reading} onChangeShelf={this.changeShelf} />
                    <BookShelf heading="Want to Read" books={this.state.want} onChangeShelf={this.changeShelf} />
                    <BookShelf heading="Read" books={this.state.read} onChangeShelf={this.changeShelf} />                 
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            )} />
            <Route path="/search" component={Search} />
      </div>
    )
  }
}

export default BooksApp
