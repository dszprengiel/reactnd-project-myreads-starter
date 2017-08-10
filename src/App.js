import React from 'react'
import { Route } from 'react-router-dom'
import BookShelves from './BookShelves'
import Search from './Search'
import './App.css'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route path="/" exact component={BookShelves} />
        <Route path="/search" component={Search} />
      </div>
    )
  }
}

export default BooksApp
