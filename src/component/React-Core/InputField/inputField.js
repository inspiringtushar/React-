import React,{useMemo} from 'react';


export const InputFields = (props) => {
  const { type,name,onSelectedChange,value,labelValue } = props;

  return (
    <div className="form-group row mt-5 col-md-6 offset-md-3">
      <label className="col-sm-2 col-form-label">
        {labelValue}
      </label>
      <div className="col-sm-10">
        <input type={type} className="form-control"
          name={name}
          onChange={onSelectedChange}
          value={value} />
      </div>
    </div>
  )
}