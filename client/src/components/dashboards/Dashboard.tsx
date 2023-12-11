import React, {useState} from 'react';
import {useActions} from '../../hooks/useAction';
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Opportunities from '../opportunities/Opportunities';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface MetricsProps{
    setLoadingState: Function;
    loadingState: boolean;
    siteMetrics: {
        id: string;
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
            }
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
                title: string,         
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
        };
        loadingExperience: { 
            metrics: any
         }
    };
}

const DashBoard: React.FC<MetricsProps> = ({siteMetrics, loadingState}) => {
    const { postMetrics } = useActions();  

    const auth = useTypedSelector((state: any) => state.auth)
    console.log(auth)

    const saveMetrics = async () => {
        if(siteMetrics){
            return await postMetrics(siteMetrics);
        }
    }

    const millisToMinutesAndSeconds = (millis: number) => {
        // var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return (parseInt(seconds) < 10 ? '0' : '') + seconds;
    }

    const labAudit = siteMetrics.lighthouseResult.audits;

    const thirdPartyCode = () => {
        if(!siteMetrics.lighthouseResult.entities.length){
            return(
                <div className="text-center" style={{marginTop: "20px", marginBottom: "20px"}}>
                <div className="spinner-border" style={{width:"3rem", height:"3rem"}} role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )
        } else {
            return siteMetrics.lighthouseResult.entities.map((entity: any) => {
                if(!entity.isFirstParty){
                    return(
                        <li className="list-group-item" key={entity.name}>
                            <h1><b>{entity.name}</b></h1>
                            <br/>
                            <p>{entity.origins[0]}</p>
                        </li>
                    )
                }
            })
        }
    }

    const loadStackPack = () => {
        if(!siteMetrics.lighthouseResult.stackPacks.length){
            return(
                <h1>Unable to Record Stack</h1>
            )
        } else {
            return siteMetrics.lighthouseResult.stackPacks.map((entity: any) => {
                if(!entity.isFirstParty){
                    return(
                        <li key={entity.id}>
                            <h1>{entity.title}</h1>
                        </li>
                    )
                }
            })
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


    const performanceShow = () => {
        if(siteMetrics.lighthouseResult.categories.performance.score){
            return(
                <div className="card">
                    <div  className="card-header">
                        Your Performance Score
                    </div>
                    <div style={{marginTop: '10px', marginBottom: '10px'}} className="progress mx-auto" data-value={100 * siteMetrics.lighthouseResult.categories.performance.score}>
                        {calcRotation(siteMetrics.lighthouseResult.categories.performance.score)}
                        <div  className="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center">
                            <div className="h2 font-weight-bold">{(100 * siteMetrics.lighthouseResult.categories.performance.score).toFixed(0)}</div>
                        </div>
                    </div>
                </div>
            )
        }

    }

    const percentageToDegrees = (val: number) => {
        return val / 100 * 360
    }

    const wastefulImages = () => {
        if(!siteMetrics.lighthouseResult.audits["uses-optimized-images"].details.items.length){
            return(
                <div className="text-center" style={{marginTop: "20px", marginBottom: "20px"}}>
                <div className="spinner-border" style={{width:"3rem", height:"3rem"}} role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )
        } else {
            return siteMetrics.lighthouseResult.audits["uses-optimized-images"].details.items.map((imageData: any) => {
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

    const labAudits = () => {
        const showLabData = siteMetrics ? 'block' : 'none';
        console.log(siteMetrics)
        if(!siteMetrics.id.length){
            return (
                <div className="card">
                <div  className="card-header">
                    Lab Data
                </div>
                </div>
            )
        } else {
            return(
                <div className="card">
                    <div  className="card-header">
                        Lab Data
                    </div>
                    <ol className="list-group list-group-flush">
                        <ul className="list-group-item" style={{display: showLabData}}>
                            {labAudit.interactive.title}
                            <div style={{float: 'right'}}>
                            {labAudit.interactive.displayValue}
                            </div>
                        </ul>
                        <ul className="list-group-item" style={{display: showLabData}}>
                            {labAudit['speed-index'].title}
                            <div style={{float: 'right'}}>
                            {labAudit['speed-index'].displayValue}
                            </div>
                        </ul>
                        <ul className="list-group-item" style={{display: showLabData}}>
                            {labAudit['total-blocking-time'].title}
                            <div style={{float: 'right'}}>
                            {labAudit['total-blocking-time'].displayValue}
                            </div>
                        </ul>
                    </ol>
                </div>
            )
        }
    }


    const  improveOpp = () => {
        console.log(labAudit['bootup-time'].details.items)
        if(!siteMetrics){
            return (
                <div className="text-center" style={{marginTop: "20px", marginBottom: "20px"}}>
                <div className="spinner-border" style={{width:"3rem", height:"3rem"}} role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )
        } else {
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

    const fullPageScreen = () => {
        try{
            return(
                <div className="container" >
                    <img className="screenshot-image" src={siteMetrics.lighthouseResult.fullPageScreenshot.screenshot.data}/>
                </div>
            )
        } catch(err){
            return(
                <div className="container" >
                Try With Another Site
            </div>
            )
        }
    }

    const totalLoadTime = () => {
        const time = siteMetrics.lighthouseResult.timing.total;
        const loadingTimeFormatted = millisToMinutesAndSeconds(time);
        console.log(loadingTimeFormatted)
        if(parseInt(loadingTimeFormatted) === 0){ 
            return(
                <div className="text-center" style={{marginTop: "20px", marginBottom: "20px"}}>
                <div className="spinner-border" style={{width:"3rem", height:"3rem"}} role="status">
                <span className="sr-only">Loading...</span>
                </div>
            </div>
            )
        } else {
            return(
                <ul className="list-group">
                <li className="list-group-item">
                    <h1><b>Total Load Time</b></h1>
                    {loadingTimeFormatted} Seconds
                </li>
            </ul>
            )
        }
    }


    const loadingExperience = () => {
        const loadingMetric = siteMetrics.loadingExperience.metrics;
        if(!loadingMetric.CUMULATIVE_LAYOUT_SHIFT_SCORE || loadingMetric.CUMULATIVE_LAYOUT_SHIFT_SCORE.category === ''){
            return(
                <div className="text-center" style={{marginTop: "20px", marginBottom: "20px"}}>
                    <div className="spinner-border" style={{width:"3rem", height:"3rem"}} role="status">
                    <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        } else {
             const metricLoadList = Object.keys(siteMetrics.loadingExperience.metrics).map((metricKey: string, index: any) => {
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

    const displaySaveButton = () => {
        if(auth){
            return(
              <button className="btn btn-primary save-btn" onClick={() => saveMetrics()}>Save Dashboard</button>       
            )
        } else {
            return(
                <div></div>
            )
        }
    }

    if(!siteMetrics){
        return(
            <div className="text-center" style={{marginTop: "20px", marginBottom: "20px"}}>
            <div className="spinner-border" style={{width:"3rem", height:"3rem"}} role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )
    } else {
        return(
            <div className="container"> 
            {displaySaveButton()}  
                <h1 className="titleSize">Let's take a look at your site metrics:</h1>
                    <div className="layout-shift p-3" >
                        <h1>Requested URL: {siteMetrics.id}</h1>
                        <br/>
                        {performanceShow()}
                        <br/>
                        {labAudits()}
                        <br/>
                        {improveOpp()}
                        <br/>
                       {/* {fullPageScreen()} */}
                    </div>
                    <div className="container layout-shift col-sm-8" >
                    <div className="row align-items-start">
                        <div className="col">
                        <div className="card">
                            <div className="card-header">
                                Your Loading Experience
                            </div>
                            {loadingExperience()}
                        </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <div className="card-header">        
                                   Lighthouse Score
                                </div>
                                {totalLoadTime()}
                            </div>
                        </div>
                    </div>
                    </div>
                    <br></br>
                    <div className="container layout-shift col-sm-8" >
                        <div className="row align-items-start">
                            <div>
                                <div className="card">
                                    <div className="card-header">        
                                        Third Parties
                                    </div>
                                    <ol className="list-group list-group-flush">
                                        {thirdPartyCode()}
                                    </ol>
                                </div>
                            </div>
                            <div>
                                <div className="card">
                                    <div className="card-header">
                                       Impactful Images
                                    </div>
                                    <ol className="list-group list-group-">
                                        {wastefulImages()}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>   
        )
    }
}

export default DashBoard;