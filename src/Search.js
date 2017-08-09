import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import './App.css'

class Search extends Component {
	constructor(props) {
	  super(props)

	  this.state = {
	    books: []
	  }
	}

	searchTitleAuthor = (event) => {
		if(event.key === 'Enter'){
			BooksAPI.search(event.target.value).then((books) => {

		   		if ( !books.error ) {
		   			this.setState({books})
		   		}
		   		else {
		   			this.setState({books: []})
		   		}
		   	})
		}
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
			      <input type="text" placeholder="Search by title or author" onKeyPress={this.searchTitleAuthor}/>
			      
			    </div>
			  </div>
			  <div className="search-books-results">
			    <ol className="books-grid">
			    	{this.state.books && (
			    		this.state.books.map((book) => (
			    			<li key={book.id}>
			    				<Book data={book} onShelfChange={(id, shelf) => this.changeShelf(id, shelf)} />
			    			</li>
			    	    	))
			    	)}

			    	{!this.state.books && (
			    		<li>No results found</li>
			    	)}
			    	    	
			    </ol>
			  </div>
			</div>
		)
	}
}

export default Search