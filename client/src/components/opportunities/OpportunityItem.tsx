import React from 'react';
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

interface ListItemProps {
  id: string;
  onChange: (e: React.MouseEvent) => void;
  title: string;
  displayValue: string;
  description: string;
  tableHeaders: any[];
  tableData: any[];
  tableOpen: boolean;
}

const OpportunityItem: React.FC<ListItemProps> = ({
  id,
  onChange,
  title,
  displayValue,
  description,
  tableHeaders,
  tableData,
  tableOpen
}) => {
  const displayStyle = tableOpen ? 'block' : 'none';
  const toggle = tableOpen ? <BsChevronDown/> : <BsChevronUp/>;
  

  return (
    <ul className="list-group-item" id={id} onClick={onChange}>
      <div className="head">
        <b>{title}</b>
        <div  style={{ float: 'right' }}>
          <span className="preview-text" >{displayValue}</span>
          <div 
            onClick={onChange}
            style={{ float: 'right', marginLeft: '5px', marginTop: '5px' }}
          >
            {toggle}
          </div>
        </div>
      </div>
      <div className="body" style={{ display: displayStyle }}>
        <div>{description}</div>
        <br />
        <h4>
          <b>Wasted Loading Time</b>
        </h4>
        <table className="table table-dark table-striped table-responsive" style={{ display: displayStyle, width: "100%" }}>
          <thead style={{ width: "100%" }} className="table-light">
            <tr>
              {tableHeaders.map((header, index) => {
                if(!header.label){
                    return(
                      <th key={index} scope="col">
                   </th>
                    )
                } else {
                  return(
                    <th key={index} scope="col">
                    {String(header.label)}
                 </th>
                  )
                }

                })}
            </tr>
          </thead>
          <tbody style={{ width: "100%" }}>
            {tableData.map((item: any) => {
              return(
                <tr key={item.url}>
                {tableHeaders.map((header, index) => {
                  const key = item[header.key];
                  
                  const isNumberOrString = typeof key === "number" || typeof key === "string";
                  
                  const shouldFormat = isNumberOrString && (header.valueType.includes('ms') || header.valueType.includes('bytes')) && typeof key === "number";

                  const isSelector = typeof key === "object" && key.selector;

                  const isUrl = typeof key === "object" && key.url;

                  const isValue = typeof key === "object" && key.value;
                  
                  const result = shouldFormat ? key.toFixed(0) + " " + header.valueType : isNumberOrString ? key : isSelector ? key.selector : isUrl ? key.url : isValue ? key.value : '';
                  
                  if(!header.label && !header.valueType){
                    return <div>None</div>
                  } else {
                    if(typeof item[header.key] === "object"){
                      console.log(title,header.label, key.value)
                    }
                    return (
                      <td data-colspan="3" key={index}>
                      {item[header.key] !== undefined ? result : ''}
                      </td>
                    )
                  }
                 })}
              </tr>
              )    
            })}
          </tbody>
        </table>
      </div>
    </ul>
  );
};

export default OpportunityItem;
