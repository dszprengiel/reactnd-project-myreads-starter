import React, { Component } from 'react'

class Book extends Component {
	render() {
		const { shelf, title,  authors, imageLinks, id } = this.props.data
		const bookCover = {
			width: 128,
			height: 193,
			backgroundImage: 'url(' + imageLinks.thumbnail + ')'
		}
		return (
			<div className="book">
			  <div className="book-top">
			    <div className="book-cover" style={bookCover}></div>
			    <div className="book-shelf-changer">
			      <select value={shelf} onChange={(event) => this.props.onShelfChange(id, event.target.value)}>
			        <option value="none" disabled>Move to...</option>
			        <option value="currentlyReading">Currently Reading</option>
			        <option value="wantToRead">Want to Read</option>
			        <option value="read">Read</option>
			        <option value="none">None</option>
			      </select>
			    </div>
			  </div>
			  <div className="book-title">{title}</div>
			  <div className="book-authors">{authors.join(', ')}</div>
			</div>
		)
	}
}

export default Book