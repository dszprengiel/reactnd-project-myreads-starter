import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import './App.css'

class Search extends Component {
	constructor(props) {
	  super(props)

	  this.state = {
	    books: [],
	    booksOnShelves: [],
	    noResultsMsg: ''
	  }
	}

	fetchAll(books) {
	  BooksAPI.getAll().then((data) => {
	    this.setState({
	      booksOnShelves: data,
	      books
	    })
	    const booksOnShelves = this.state.booksOnShelves
	    const ids = booksOnShelves.map((x) => x.id)
	    books.forEach((x, indx) => {
	    	if ( ids.indexOf(x.id) !== -1 ) {
	    		books[indx] = booksOnShelves[ids.indexOf(x.id)]
	    	}
	    })
	    this.setState({books})
	  })
	}

	searchTitleAuthor = (event) => {

		if ( event.target.value === '' ) {
			this.setState({books: [], noResultsMsg: ''})
			return
		}

		BooksAPI.search(event.target.value).then((books) => {
	   		if ( !books.error ) {
	   			this.fetchAll(books)
	   		}
	   		else {
	   			this.setState({books: []})
	   			this.setState({noResultsMsg: 'No results found'})
	   		}
	   	})

	}

	changeShelf = (id, shelf) => {
	 	BooksAPI.update({id}, shelf).then((data) => {
	  		BooksAPI.get(id).then((data) => {
	  			const books = this.state.books
	  			for (var i in books) {
	  		     		if (books[i].id === data.id) {
	  		        		books[i] = data
	  		        		break
	  		     		}
	  			}
	  			this.setState({books}) 
	  		})
	  	})
	}

	render() {
		return (
			<div className="search-books">
			  <div className="search-books-bar">
			    <Link
			      to="/"
			      className="close-search"
			    >Close</Link>
			    <div className="search-books-input-wrapper">
			      {/* 
			        NOTES: The search from BooksAPI is limited to a particular set of search terms.
			        You can find these search terms here:
			        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
			        
			        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
			        you don't find a specific author or title. Every search is limited by search terms.
			      */}
			      <input type="text" placeholder="Search by title or author" onChange={this.searchTitleAuthor}/>
			      
			    </div>
			  </div>
			  <div className="search-books-results">
			    <ol className="books-grid">
			    	{this.state.books && (
			    		this.state.books.map((book, indx) => (
			    			<li key={book.id + '_' + indx}>
			    				<Book data={book} onShelfChange={(id, shelf) => this.changeShelf(id, shelf)} />
			    			</li>
			    	    	))
			    	)}

			    	{this.state.books.length === 0 && (
			    		<li>{this.state.noResultsMsg}</li>
			    	)}
			    	    	
			    </ol>
			  </div>
			</div>
		)
	}
}

export default Search