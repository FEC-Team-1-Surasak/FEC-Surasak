/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
import React from 'react';
import Thumbnail from './Thumbnail.jsx';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStyle: null,
    };
  }

  render() {
    if (this.props.styles === undefined) {
      return <></>;
    }
    return (
      <div>
        {this.props.styles.map(style => {
          return <Thumbnail style={style} />;
        })}
      </div>
    );
  }
}

export default StyleSelector;
