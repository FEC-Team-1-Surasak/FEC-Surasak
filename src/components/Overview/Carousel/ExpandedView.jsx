import React from 'react';

class ExpandedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="overview-carousel-expanded">hi!</div>
        <button className="close-button" onClick={(e) => this.props.changeView('default')}>close[x]</button>
      </>
    );
  }
}

export default ExpandedView;
