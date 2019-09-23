import React, { Component } from 'react'
export default class SuccesssComponent extends Component {
  render () {
    return (
      <div>
        <div class='success-checkmark'>
          <div class='check-icon'>
            <span class='icon-line line-tip' />
              <span class='icon-line line-long' />
            <div class='icon-circle' />
            <div class='icon-fix' />
          </div>
        </div>
      </div>
    )
  }
}
