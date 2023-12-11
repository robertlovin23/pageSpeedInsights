import React, {useState} from 'react';
import ListItem from './OpportunityItem';

interface OpportunityProps {
  labAudit: any;
}

const Opportunities: React.FC<OpportunityProps> = ({
  labAudit
}) => {
  const [tableOpen, setTableOpen] = useState(false);
  const [itemIndex, setItemIndex] = useState(-1);


  const onChange = (index: number) => {
    if(itemIndex === index){
        setItemIndex(-1);
    } else {
        setItemIndex(index)
    }
}

  if (!labAudit) {
    return <div>Section Loading</div>;
  } else {
    return (
      <div>
        {Object.keys(labAudit).map((auditKey, index) => {
          // Check if labAudit[auditKey] and its properties exist
          if (labAudit[auditKey] && labAudit[auditKey].details && labAudit[auditKey].details.items && labAudit[auditKey].details.headings && labAudit[auditKey].details.items.length) {
            return (
              <ListItem
                key={auditKey}
                id={index.toString()}
                onChange={() => onChange(index)}
                title={labAudit[auditKey].title}
                displayValue={labAudit[auditKey].displayValue}
                description={labAudit[auditKey].description}
                tableHeaders={
                labAudit[auditKey].details.headings}
                tableData={labAudit[auditKey].details.items}
                tableOpen={itemIndex === index}
              />
            );
          } else {
            // Handle the case where data is missing or not in the expected structure
            return null;
          }
        })}
      </div>
    );
  }
};

export default Opportunities;
