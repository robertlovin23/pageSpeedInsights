import React, {useState, useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';
import {useActions} from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { BsXLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getByPlaceholderText } from '@testing-library/react';
import DeleteDashboardItem from '../dashboards/DeleteDashboardItem';

import { filter } from 'lodash';

interface MetricsProps{
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
            }
           timing: {
            total: number;
           }
           audits: {
            bootuptime: {
                numericValue: number;
            }
            "uses-optimized-images":{
                details:{
                    items: any;
                }
            }
           }
        };
        loadingExperience: { 
            metrics: {
                CUMULATIVE_LAYOUT_SHIFT_SCORE: {
                    category: string;
                }
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
         }
    };
}

interface AuthProps{
        googleId: string
}


const UserDashboardList: React.FC<AuthProps> = ({googleId}) => {
    const [openModal,setOpenModel] = useState(false);
    const [compareReports,setCompareReports] = useState([]);
    const [selectItems,setSelectItems] = useState(false);
    const [checkboxIndex,setCheckboxIndex] = useState(-1);
    const checkbox = useRef<any>();

    const { listMetrics, deleteMetrics} = useActions();  
    const metrics = useTypedSelector((state: any) => state.metrics)

    useEffect(() => {
        metricsList();
    }, [googleId])

    const metricsList = async () => {
        if(!googleId){
            console.log("No auth data")
        } else {
            await listMetrics(googleId);
        }
    }

    const setSelectedItems = () => {
        console.log(metrics.siteList)
        if(!selectItems){
            setSelectItems(true)
        } else {
            setSelectItems(false)
        }
    }

    const reportButton = () => {
        if(!selectItems){
            return <div className="btn btn-primary" onClick={() => setSelectedItems()}>Select Reports to Compare</div>
        } else {
            if(compareReports.length > 0){
                return <Link className="btn btn-primary" state={{ siteArray: compareReports }} to={`/profile/${googleId}/compareReports`}>Compare Reports</Link>
            } else {
                return <div className="btn btn-primary" onClick={() => setSelectedItems()}>Compare Reports</div>
            }

        }
    }

    const selectReportToCompare = (event: any, index: any) => {
        console.log(event.target.checked)
        let comparisonArray: any = [...compareReports];
        metrics.siteList.forEach((met: any) => {
            if (met._id === event.target.value && event.target.checked) {
                    return comparisonArray = [ 
                        ...compareReports,
                        met.siteMetrics[0]
                    ]
            } else if(met._id === event.target.value && !event.target.checked){
                    comparisonArray = comparisonArray.filter((el: any) => {
                        return el !== met.siteMetrics[0]
                    })

                }
            });
        setCompareReports(comparisonArray);
      };


    const displaySiteList = () => {
        if(metrics && metrics.siteList){
            return metrics.siteList.map((met:any, index: any) => {
                if(selectItems){
                    return(
                        <li className="list-group-item form-check" key={met.siteMetrics[0].id} >
                            <input className="form-check-input" type="checkbox" ref={checkbox} onChange={(e) => selectReportToCompare(e, index)} value={met._id} style={{marginRight:"10px", marginLeft: "-5px"}} />
                            <Link state={{metricId: met._id, metrics: met.siteMetrics[0], googleId}} to={``}>
                            {met.siteMetrics[0].id}
                            </Link>
                        </li>
                    )
                } else {
                    return (
                        <li className="list-group-item" key={met.siteMetrics[0].id}>
                            <Link state={{metricId: met._id, metrics: met.siteMetrics[0], googleId}} to={`/profile/${googleId}/saved_sites/${met._id}`}>
                            {met.siteMetrics[0].id}
                            </Link>
                            <div style={{float:"right"}} onClick={() => {setOpenModel(true)}}>
                                <BsXLg/>
                                <DeleteDashboardItem metricId={met._id} openCloseModal={setOpenModel} openModal={openModal}/>
                            </div>
                        </li>
                    )
                }
 
            })
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

    
    return(
        <div className="card">
            <div className="card-header">
                Your Site Reports
            </div>
            <ul className="list-group list-group-flush">
            {displaySiteList()}
            </ul>
            {reportButton()}
        </div>
    )
}

export default UserDashboardList;