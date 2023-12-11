// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';
import Chart from '../charts/ChartOptions';
import {useState} from 'react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface ChartProps {
    siteMetrics: any;
}

interface AuditType {
    y: number;
    label: Date;
}

const PerformanceChart: React.FC<ChartProps> = ({siteMetrics}) => {

    const millisToMinutesAndSeconds = (millis: number) => {
        // var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return (parseInt(seconds) < 10 ? '0' : '') + seconds;
    }

    // Create a mapping of audit keys to chart titles
  const auditToChartMapping: Record<string, string> = {
    'speed-index': 'Speed Index',
    'largest-contentful-paint': 'Largest Contentful Paint',
    'interactive': 'Time To Interactive',
    'total-blocking-time': 'Total Blocking Time',
    'max-potential-fid': 'Max Potential First Input Delay',
  };


 // Initialize an empty valueMap
 let valueMap: any = {};


 siteMetrics.forEach((item: any, index: any) => {
    console.log(item)
    Object.keys(item.lighthouseResult.audits).forEach((auditKeys: any) => {
      const auditList = item.lighthouseResult.audits[auditKeys];
      const auditValue: AuditType = { y: auditList.numericValue, label: item.originLoadingExperience.id};

      // Check if the audit key is in the mapping
      if (auditToChartMapping.hasOwnProperty(auditKeys)) {
        const chartTitle = auditKeys;

        // Initialize an empty array for the chart if it doesn't exist
        if (!valueMap[chartTitle]) {
          valueMap[chartTitle] = [];
        }

        // Push the auditValue to the corresponding chart's data
        if(auditKeys){

            return valueMap = {
                ...valueMap,
                [auditKeys]: [...valueMap[auditKeys], auditValue]
            }
        }
      }
    });
  });

  console.log(valueMap)

    return(
        <div>
            <Chart title="Largest Contentful Paint" dataMap={valueMap['largest-contentful-paint']}/>
            <Chart title="Speed Index" dataMap={valueMap['speed-index']}/>
            <Chart title="Total Blocking Time" dataMap={valueMap['total-blocking-time']}/>
            <Chart title="Max Potential First Input Delay" dataMap={valueMap['max-potential-fid']}/>
        </div>
    )
}

export default PerformanceChart;