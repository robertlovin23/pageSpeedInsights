import {useState, useEffect} from 'react';
import DashBoard from './dashboards/Dashboard';
import  {useActions} from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import Form from './forms/Form';
import '../index.css';

interface GoogleMetrics{
    id: string, 
    lighthouseResult: { 
      stackPacks: String[];
      entities: String[];
      fullPageScreenshot:{
        screenshot: {
          data: string;
          height: number;
          width: number;
      }
    },
    categories: {
      performance: {
          score: number;
      }
  }
      timing: {
        total: number;
      }
      audits: {
        bootuptime: {
            numericValue: number;
        },
        interactive: {
          displayValue: string;
          title: string;
        },
        "uses-optimized-images":{
          details:{
              items: any;
          }
        },
        "speed-index":{
          title: string;          
          displayValue: string;
        },
        "total-blocking-time":{
          title: string;          
          displayValue: string;
        },
        "bootup-time":{
          id: string;
          title: string;    
          displayValue: string;
          description: string;
          details: {
            items: any;
          }
        },
        "modern-image-formats":{
          id: string;
          title: string;    
          displayValue: string;
          description: string;
          details: {
            items: any;
          }
        }
      }
    },
    loadingExperience: { 
      metrics: {
          CUMULATIVE_LAYOUT_SHIFT_SCORE: {
              category: string;
          },
          EXPERIMENTAL_TIME_TO_FIRST_BYTE: {
            category: string;
          }
          FIRST_CONTENTFUL_PAINT_MS: {
              category: string;
          }
          INTERACTION_TO_NEXT_PAINT: {
              category: string;
          }
          FIRST_INPUT_DELAY_MS: {
              category: string;
          }
      }
  },
}

const InsightPage: React.FC = () => {
  const [loadingState, setLoadingState] = useState(false);
  const [siteMetrics, setSiteMetrics] = useState<GoogleMetrics>({id: '', 
    lighthouseResult:{ 
      timing: {
        total: 0,
      },
      stackPacks: [],
      entities: [],
      fullPageScreenshot:{
        screenshot: {
          data: '',
          height: 0,
          width: 0,
        }
    },
    categories: {
      performance: {
          score: 0,
      }
  },
      audits: {
        bootuptime: {
            numericValue: 0
        },
        interactive: {
          displayValue: '',
          title: ''
        },
        "uses-optimized-images":{
          details:{
              items: []
          }
        },
        "speed-index":{
          title: '',
          displayValue: '',
        },
        "total-blocking-time":{
          title: '',         
          displayValue: ''
        },
        "bootup-time":{
          id: '',
          title: '',         
          displayValue: '',
          description: '',
          details: {
            items: []
          }
        },
        "modern-image-formats":{
          id: '',
          title: '',
          displayValue: '',
          description: ',',
          details: {
            items: []
          }
        },
      }
    },   
    loadingExperience: { 
      metrics: {
        CUMULATIVE_LAYOUT_SHIFT_SCORE: {
          category: ''
        },
        EXPERIMENTAL_TIME_TO_FIRST_BYTE: {
          category: ''
        },
        FIRST_CONTENTFUL_PAINT_MS: {
            category: ''
        },
        INTERACTION_TO_NEXT_PAINT: {
            category: ''
        },
        FIRST_INPUT_DELAY_MS: {
            category: ''
        },
      }
    }}
  );

  return (
        <div className="App">
          <div className="container" id="main">
                  <h1 className="titleSize titlePadding">Performance Audit</h1>
                  <Form setSiteMetrics={setSiteMetrics} setLoadingState={setLoadingState} loadingState={loadingState}/>
                  <p id="loading"></p>
                  <div className="container" id="results">
                    <DashBoard siteMetrics={siteMetrics} setLoadingState={setLoadingState} loadingState={loadingState}/>
                  </div>
              </div>
    </div>
  );
}

export default InsightPage;
