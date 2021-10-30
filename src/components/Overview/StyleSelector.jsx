/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
import React from 'react';
import Thumbnail from './Thumbnail.jsx';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    if (this.props.styles === undefined) {
      return <></>;
    }
    return (
      <>
        <div>{<b>STYLE ></b>} SELECTED STYLE</div>
        <div>
          {this.props.styles.map(style => {
            return <Thumbnail style={style} updateStyle={this.props.updateStyle}/>;
          })}
        </div>
      </>
    );
  }
}

export default StyleSelector;
