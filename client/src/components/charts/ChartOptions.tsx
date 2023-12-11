// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';
import {useState} from 'react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface ChartData {
    title: string;
    dataMap: any;
}

const Chart: React.FC<ChartData> = ({title, dataMap}) => {
    const options = {
        animationEnabled: true,	
        title:{
            text: title
        },
        axisY : {
            title: title + ' (in ms)'
        },
        toolTip: {
            shared: true
        },
        scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }],
            xAxes: [{
              ticks: {
                fontSize: 8
              }
            }]
        },
        data: [
        {
            type: "spline",
            name: title,
            showInLegend: true,
            dataPoints: dataMap
        }]
    }


    return(
        <div style={{marginBottom:'20px'}}>
            <CanvasJSChart options = {options} ></CanvasJSChart>
        </div>
    )
}

export default Chart;