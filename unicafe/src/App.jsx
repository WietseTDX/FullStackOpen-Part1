import { useState } from 'react'
import PropTypes from 'prop-types';

const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node
};


const DisplayValue = ({ stat, children }) => {
  return (
    <tr>
      <td>{children}</td>
      <td>{stat}</td>
    </tr>
  );
}

DisplayValue.propTypes = {
  stat: PropTypes.number.isRequired,
  children: PropTypes.node
};


const Average = (GradeLevels) => {
  const { sum, count } = GradeLevels.reduce((acc, value) => {
    let effectiveWeight = value.weight;
    if (effectiveWeight < 0) effectiveWeight = 0;
    acc.sum += value.pressed * effectiveWeight;
    acc.count += value.pressed * Math.abs(value.weight);
    return acc;
  }, { sum: 0, count: 0 });
  return sum / count || 0;
}

Average.propTypes = {
  GradeLevels: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      pressed: PropTypes.number.isRequired,
    })
  ).isRequired
};


const PositivePrecentage = (GradeLevels, PositiveLabels) => {
  const { sumPositive, countTotal } = GradeLevels.reduce((acc, value) => {
    if (PositiveLabels.includes(value.label)) {
      acc.sumPositive += value.pressed;
    }
    acc.countTotal += value.pressed;
    return acc
  }, { sumPositive: 0, countTotal: 0 });
  return (sumPositive / countTotal) * 100 || 0;
}

PositivePrecentage.propTypes = {
  GradeLevels: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      pressed: PropTypes.number.isRequired,
    })
  ).isRequired,
  PositiveLabels: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired
};


const Statistics = ({ GradeLevels, PositiveLabels }) => {
  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {GradeLevels.map((grade, index) => (
              <DisplayValue key={index} stat={grade.pressed}>
                {grade.label}
              </DisplayValue >
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Average:</td>
              <td>{Average(GradeLevels).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Positive:</td>
              <td>{PositivePrecentage(GradeLevels, PositiveLabels).toFixed(2)}%</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div >
  )
}

Statistics.propTypes = {
  GradeLevels: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      pressed: PropTypes.number.isRequired,
    })
  ).isRequired,
  PositiveLabels: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired
};


const hasData = (GradeLevels) => {
  return GradeLevels.reduce((hasData, value) => {
    return hasData || value.pressed > 0
  }, 0)
}

hasData.propTypes = {
  GradeLevels: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      pressed: PropTypes.number.isRequired,
    })
  ).isRequired
};


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  const addBad = () => setBad(bad + 1);

  const GradeLevels = [
    { label: 'Good', onClick: addGood, pressed: good, weight: 1 },
    { label: 'Neutral', onClick: addNeutral, pressed: neutral, weight: 0 },
    { label: 'Bad', onClick: addBad, pressed: bad, weight: -1 }
  ];

  const PositiveLabels = [
    'Good'
  ];

  return (
    <div>
      <div>
        <h1> Give Feedback </h1>
      </div>
      <div>
        {GradeLevels.map((button, index) => (
          <Button key={index} onClick={button.onClick}>
            {button.label}
          </Button>
        ))}
      </div>
      <div>
        <h1>Statistics</h1>
        {hasData(GradeLevels) ? (
          <Statistics GradeLevels={GradeLevels} PositiveLabels={PositiveLabels} />
        ) : (
          <p>No statistics</p>
        )}
      </div>
    </div>
  );
}

export default App;