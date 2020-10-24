import React from 'react';

export const Button = (props) => {
  const { buttonValue } = props;

  return (
    <div className="col-md-3 offset-md-5 mt-5">
      <button type="submit" className="btn btn-primary btn-block">{buttonValue}</button>
    </div>
  )
}