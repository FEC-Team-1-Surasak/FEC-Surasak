/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';

class CharacteristicsReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characteristics: {},
    };
    this.getFormItems = this.getFormitems.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  getFormitems() {
    const defaultCharacteristics = {
      Size: {
        values: ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'],
      },
      Width: {
        values: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
      },
      Comfort: {
        values: ['Uncomfortable', 'Slightly uncomfortable', 'OK', 'Comfortable', 'Perfect'],
      },
      Quality: {
        values: ['Poor', 'Below Average', 'What I expect', 'Pretty great', 'Perfect'],
      },
      Length: {
        values: ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
      },
      Fit: {
        values: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly loose', 'Runs loose'],
      },
    };
    const { characteristics } = this.props;
    const formItems = [];
    const itemCharicteristics = Object.keys(characteristics);

    itemCharicteristics.forEach((key) => {
      const values = defaultCharacteristics[key].values.slice();
      const { id } = characteristics[key];
      formItems.push({
        id,
        characteristic: key,
        values,
      });
    });

    return formItems;
  }

  clickHandler(e) {
    const { func } = this.props;
    const { characteristics } = this.state;
    func({
      ...characteristics,
      [e.target.name]: JSON.parse(e.target.value),
    });
    this.setState({
      characteristics: {
        ...characteristics,
        [e.target.name]: JSON.parse(e.target.value),
      },
    });
  }

  render() {
    const formItems = this.getFormitems();
    return (
      <div>
        {
          formItems.map((item) => (
            <>
              <CharRater func={this.clickHandler} item={item} id={item.id} />
              <br />
            </>
          ))
        }
      </div>
    );
  }
}

const CharRater = ({ item, id, func }) => (
  <div className="radio-group">
    {`${item.characteristic}: `}
    <br />
    {
      item.values.map((value, i) => (
        <>
          <label htmlFor={`${id}`}>
            <input
              type="radio"
              name={id}
              id={`${id}`}
              value={i + 1}
              onClick={func}
            />
            {value}
          </label>
        </>
      ))
    }
  </div>
);

export default CharacteristicsReview;
