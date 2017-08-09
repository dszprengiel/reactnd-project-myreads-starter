import React, { Component } from 'react'
import StarRatingComponent from 'react-star-rating-component'

class Book extends Component {
	onStarClick(nextValue, prevValue, name) {
		console.log(nextValue)
	}

	render() {
		const { shelf, title,  authors, imageLinks, id, averageRating, ratingsCount } = this.props.data
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
			      <select value={shelf ? shelf : 'none'} onChange={(event) => this.props.onShelfChange(id, event.target.value)}>
			        <option value="none" disabled>Move to...</option>
			        <option value="currentlyReading">Currently Reading</option>
			        <option value="wantToRead">Want to Read</option>
			        <option value="read">Read</option>
			        <option value="none">None</option>
			      </select>
			    </div>
			  </div>
			  <div className="book-title">{title}</div>
			  <div className="book-authors">{authors ? authors.join(', ') : ''}</div>
			  <StarRatingComponent
			              name="bookRating"
			              editing={false}
			              starColor="#60ac5d"
			              emptyStarColor="#60ac5d"
			              value={averageRating}
			              onStarClick={this.onStarClick}
			              renderStarIcon={(index, value) => {
			                return <span className={index <= value ? 'fa fa-star' : 'fa fa-star-o'} />;
			              }}
			              renderStarIconHalf={() => <span className="fa fa-star-half-full"/>}
			            />
			            <span className="ratingsCount">({ratingsCount ? ratingsCount : 0})</span>
			</div>
		)
	}
}

export default Book