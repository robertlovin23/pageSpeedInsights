import React, {useState, useEffect} from 'react';
import {useActions} from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Opportunities from '../opportunities/Opportunities';
import { Auth } from 'mongodb';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import DashBoard from './Dashboard';

// interface MetricsProps{
//     siteMetrics: {
//         id: string;
//         lighthouseResult: { 
//             stackPacks: String[];
//             entities: String[];
//             fullPageScreenshot:{
//                 screenshot: {
//                     data: string;
//                     height: number;
//                     width: number;
//                 }
//             }
//            timing: {
//             total: number;
//            }
//            audits: {
//             bootuptime: {
//                 numericValue: number;
//             }
//             "uses-optimized-images":{
//                 details:{
//                     items: any;
//                 }
//             }
//            }
//         };
//         loadingExperience: { 
//             metrics: {
//                 CUMULATIVE_LAYOUT_SHIFT_SCORE: {
//                     category: string;
//                 }
//                 EXPERIMENTAL_TIME_TO_FIRST_BYTE: {
//                     category: string;
//                 }
//                 FIRST_CONTENTFUL_PAINT_MS: {
//                     category: string;
//                 }
//                 INTERACTION_TO_NEXT_PAINT: {
//                     category: string;
//                 }
//                 FIRST_INPUT_DELAY_MS: {
//                     category: string;
//                 }
//             }
//          }
//     };
// }


const UserDashboardItem: React.FC = () => {


    const { getMetric} = useActions();  
    const metrics  = useTypedSelector((state: any) => state.metrics)
    const location = useLocation();
    console.log(location.state.metricId, location.state.googleId);

    useEffect(() => {
        getMetric(location.state.metricId, location.state.googleId)
    }, [location.state.googleId])


    const thirdPartyCode = () => {
        if(!metrics.singleSite.siteMetrics[0].lighthouseResult.entities.length){
            return(
                <h1>Unable to Record Third Parties</h1>
            )
        } else {
            return metrics.singleSite.siteMetrics[0].lighthouseResult.entities.map((entity: any) => {
                if(!entity.isFirstParty){
                    return(
                        <li className="list-group-item" key={entity.name}>
                            <h1>{entity.name}</h1>
                            <br/>
                            <p>{entity.origins[0]}</p>
                        </li>
                    )
                }
            })
        }
    }


    const labAudits = () => {
        if(!metrics){
            return <div> Loading...</div>
        } else {
            const labAudit = metrics.singleSite.siteMetrics[0].lighthouseResult.audits;
            return(
                <div className="card">
                    <div  className="card-header">
                        Lab Data
                    </div>
                    <ol className="list-group list-group-flush">
                        <ul className="list-group-item">
                            {labAudit.interactive.title}
                            <div style={{float: 'right'}}>
                            {labAudit.interactive.displayValue}
                            </div>
                        </ul>
                        <ul className="list-group-item">
                            {labAudit['speed-index'].title}
                            <div style={{float: 'right'}}>
                            {labAudit['speed-index'].displayValue}
                            </div>
                        </ul>
                        <ul className="list-group-item">
                            {labAudit['total-blocking-time'].title}
                            <div style={{float: 'right'}}>
                            {labAudit['total-blocking-time'].displayValue}
                            </div>
                        </ul>
                        <ul className="list-group-item">
                            {labAudit['largest-contentful-paint'].title}
                            <div style={{float: 'right'}}>
                            {labAudit['largest-contentful-paint'].displayValue}
                            </div>
                        </ul>
                        <ul className="list-group-item">
                            {labAudit['cumulative-layout-shift'].title}
                            <div style={{float: 'right'}}>
                            {labAudit['cumulative-layout-shift'].displayValue}
                            </div>
                        </ul>
                        <ul className="list-group-item">
                            {labAudit['max-potential-fid'].title}
                            <div style={{float: 'right'}}>
                            {labAudit['max-potential-fid'].displayValue}
                            </div>
                        </ul>
                    </ol>
                </div>
            )
        }
    }

    const  improveOpp = () => {
        if(!metrics.singleSite.siteMetrics[0]){
            return <div> Loading...</div>
        } else {
            const labAudit = metrics.singleSite.siteMetrics[0].lighthouseResult.audits;
            return(
                <div className="card">
                    <div  className="card-header">
                        Opportunities To Improve
                    </div>
                    <ol className="list-group list-group-flush">
                        <Opportunities labAudit={labAudit}/>
                    </ol>
                </div>
            )
        }
    }



    const loadingExperience = () => {
        if(!metrics.singleSite.siteMetrics[0]){
            return(
                <div>Unable to Load Categories</div>
            )
        } else {
             const metricLoadList = Object.keys(metrics.singleSite.siteMetrics[0].loadingExperience.metrics).map((metricKey: string, index: any) => {
                const loadingMetric = metrics.singleSite.siteMetrics[0].loadingExperience.metrics;
                console.log(loadingMetric[metricKey])
                return(
                    <li className="list-group-item" key={metricKey}>
                        <h1><b>{metricKey.replace(/_/g, ' ')}</b></h1>
                        {loadingMetric[metricKey].category}
                    </li>
                )
             })
             return(
                <ul className="list-group list-group-flush">{metricLoadList}</ul>
             )
        }

    }



    const wastefulImages = () => {
        if(!metrics.singleSite.siteMetrics[0].lighthouseResult.audits["uses-optimized-images"].details.items.length){
            return(
                <h1>Unable to Capture Wasteful Images</h1>
            )
        } else {
            return metrics.singleSite.siteMetrics[0].lighthouseResult.audits["uses-optimized-images"].details.items.map((imageData: any) => {
                if(Math.round(imageData.totalBytes / 1000) > 250){
                    return (
                        <div className="image-list list-group-item" key={imageData.url}>
                            <img loading="lazy" className="wasteful-images" src={imageData.url}></img>
                            <br></br>
                            Image Size: {Math.round(imageData.totalBytes / 1000)} KB
                        </div>
                    )
                }
            })
        }
    }


    const performanceShow = () => {
        if(metrics.singleSite.siteMetrics[0].lighthouseResult.categories.performance.score){
            return(
                <div className="card">
                    <div  className="card-header">
                        Your Performance Score
                    </div>
                    <div style={{marginTop: '10px', marginBottom: '10px'}} className="progress mx-auto" data-value={100 * metrics.singleSite.siteMetrics[0].lighthouseResult.categories.performance.score}>
                        {calcRotation(metrics.singleSite.siteMetrics[0].lighthouseResult.categories.performance.score)}
                        <div  className="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center">
                            <div className="h2 font-weight-bold">{(100 * metrics.singleSite.siteMetrics[0].lighthouseResult.categories.performance.score).toFixed(0)}</div>
                        </div>
                    </div>
                </div>
            )
        }

    }
    const calcRotation = (valueString: number) => {
        const value = parseInt((100 * valueString).toFixed(2));
        console.log(valueString,value, percentageToDegrees(value))
        if (value > 0) {
            if (value <= 50) {
                return(
                    <React.Fragment>
                        <span className="progress-left">
                            <span className="progress-bar border-primary"></span>
                        </span>
                        <span className="progress-right">
                            <span style={{transform: `rotate(${percentageToDegrees(value).toFixed(2)}deg)`}} className="progress-bar border-primary"></span>
                        </span>
                    </React.Fragment>
                )
            } else {
                return(
                    <React.Fragment>
                        <span className="progress-left">
                            <span style={{transform: `rotate(${percentageToDegrees(value - 50).toFixed(2)}deg)`}} className="progress-bar border-primary"></span>
                        </span>
                        <span className="progress-right">
                            <span style={{transform: `rotate(180deg)`}} className="progress-bar border-primary"></span>
                        </span>
                    </React.Fragment>

                )
            }
          }
    }

    const percentageToDegrees = (val: number) => {
        return val / 100 * 360
    }

    const fullPageScreen = () => {
        try{
            return(
                <div className="container" >
                    <img className="screenshot-image" src={metrics.lighthouseResult.fullPageScreenshot.screenshot.data}/>
                </div>
            )
        } catch(err){
                console.log(err)
        }
    }


    const millisToMinutesAndSeconds = (millis: number) => {
        // var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return (parseInt(seconds) < 10 ? '0' : '') + seconds;
    }

    if(metrics.singleSite){
        return(
            <div className="container" style={{marginTop:"20px"}}>
                <div className="card text-center">
                    <div className="card-body">
                        <h1 className="titleSize card-title">Your Dashboard for: </h1>
                        <p className="card-text">{metrics.singleSite.siteMetrics[0].lighthouseResult.finalDisplayedUrl}</p>
                    </div>
                </div>  
                <br/>
                {performanceShow()}
                <br/>  
                {labAudits()}    
                <br/>
                {improveOpp()}
                <div className="container layout-shift p-3" >
                        <div className="row align-items-start">
                            <div className="col">
                                <div className="card">
                                    <div className="card-header">
                                        <h1 className="titleSize">Your Loading Experience</h1>
                                    </div>
                                    {loadingExperience()}
                                </div>
                        </div>
                            <div className="col">
                                <div className="card">
                                    <div className="card-header">        
                                        <h1 className="titleSize">Lighthouse Score</h1>
                                    </div>
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <h1><b>Total Load Time</b></h1>
                                    {millisToMinutesAndSeconds(metrics.singleSite.siteMetrics[0].lighthouseResult.timing.total)} Seconds
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                <div>
                <div className="container" >
                        <div className="row align-items-start">
                            <div className="col">
                                <div className="card">
                                    <div className="card-header">
                                        <h1 className="titleSize">
                                            Your Third Parties
                                        </h1>
                                    </div>
                                    <ul className="list-group list-group-flush">{thirdPartyCode()}</ul>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <div className="card-header">
                                        <h1 className="titleSize">Impactful Images</h1>
                                    </div>
                                    <ol>
                                        {wastefulImages()}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="layout-shift p-3" >
                       {fullPageScreen()}
                    </div>
                    
                </div>
            </div>
        )
    } else {
        return(
            <div className="text-center" style={{marginTop: "20px", marginBottom: "20px"}}>
            <div className="spinner-border" style={{width:"3rem", height:"3rem"}} role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )
    }
}

export default UserDashboardItem;