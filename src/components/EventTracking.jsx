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
  }

  onclick(e) {
    console.log(e.target.innerHTML);
    //
    console.log(this.props.children);
    this.setState({
      element: e.target.className,
      time: new Date().toString(),
    });
    axios.post('/interactions', {
      element: this.state.element,
      widget: this.props.children.name,
      time: this.state.time,
    })
      .then(() => { console.log('POST IT'); })
      .catch((err) => { console.log(err); });
  }

  render() {
    return (
      <div>
        {React.Children.map(this.props.children,
          (child) => React.cloneElement(child, {onclick: this.onclick.bind(this)}))}
      </div>
    );
  }
}

export default EventTracking;
