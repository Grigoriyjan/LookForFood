import React from 'react'

function Counter({units, children}) {
  const counterStyles = {
    fontSize: "2rem",
    color: "#444",
  };

  if (units.length < 4) {
    counterStyles.color = "teal";
  }

  if (units.length < 3) {
    counterStyles.color = "red";
  }

  if (units.length < 2) {
    counterStyles.fontWeight = "bold";
  }
  return (
    <p style={counterStyles}>
      {children}: {units.length}
    </p>
  );
}

export default Counter
