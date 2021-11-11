/* eslint-disable no-unused-expressions */
/* eslint-disable react/sort-comp */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';

// POST /interactions

class EventTracking extends React.Component {
  constructor() {
    super();
    this.state = {
      element: '',
      widget: '',
      time: '',
    };
    this.onclick = this.onclick.bind(this);
  }

  onclick(e) {
    let curr = e.target;
    let id = '';
    while (curr.parentNode !== null && curr.parentNode.id !== 'root') {
      curr = curr.parentNode;
      id = curr.id;
      if (id !== '') {
        break;
      }
    }
    this.setState({
      element: e.target.className,
      widget: id,
      time: new Date(),

    }, () => {
      axios.post('/interactions', {
        element: this.state.element,
        widget: this.state.widget,
        time: this.state.time,
      })
        .then(() => { console.log('POST IT'); })
        .catch((err) => { console.log(err); });
    });

  }

  render() {
    return (
      <>
        {React.Children.map(this.props.children,
          (child) => React.cloneElement(child, { onclick: this.onclick.bind(this) }))}
      </>
    );
  }
}

export default EventTracking;
