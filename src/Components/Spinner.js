import React, { Component } from 'react'
import Book from './Book.gif'
export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className='my-3'src={Book} alt="Book" />
      </div>
    )
  }
}
export default Spinner