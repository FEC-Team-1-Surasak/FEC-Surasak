import React from 'react';

const CharacteristicsReview = ({ characteristics }) => {
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

  console.log(characteristics);

  const formItems = [];
  const itemCharicteristics = Object.keys(characteristics);
  itemCharicteristics.forEach((key) => {
    let values = defaultCharacteristics[key].values.slice();
    let { id } = characteristics[key];
    formItems.push({
      id,
      characteristic: key,
      values,
    });
  });

  console.log(formItems);

  return (
    <div></div>
  );
};

export default CharacteristicsReview;
