import { useLocation } from "react-router-dom";
import PerformanceChart from "../charts/PerformanceChart";

const CompareReports: React.FC = () => {
    let { state } = useLocation();
    console.log(state.siteArray)

    const labAudits = () => {
        if(!state.siteArray){
            return <div> Loading...</div>
        } else {
            
            return state.siteArray.map((site: any) => {
                const testTime = new Date(site.analysisUTCTimestamp);
                const labAudit = site.lighthouseResult.audits
                console.log(site)
                return(
                    <tr className="" key={site.id}>
                        <td className="">
                            <div>
                            {site.id}
                            </div>
                        </td>
                        <td className="">
                            <div>
                            {labAudit.interactive.displayValue}
                            </div>
                        </td>
                        <td className="">
                            <div>
                            {labAudit['speed-index'].displayValue}
                            </div>
                        </td>
                        <td className="">
                            <div>
                            {labAudit['total-blocking-time'].displayValue}
                            </div>
                        </td>
                        <td className="">
                            <div>
                            {labAudit['largest-contentful-paint'].displayValue}
                            </div>
                        </td>
                        <td className="">
                            <div>
                            {labAudit['cumulative-layout-shift'].displayValue}
                            </div>
                        </td>
                        <td className="">
                            <div>
                            {labAudit['max-potential-fid'].displayValue}
                            </div>
                        </td>
                        <td className="">
                            <div>
                            {testTime.toString()}
                            </div>
                        </td>
                    </tr>
                )
            });
        }
    }

    const labAuditHeadings = () => {
        if(!state.siteArray){
            return <div> Loading...</div>
        } else {
                const labAudit = state.siteArray[0].lighthouseResult.audits
                console.log(state.siteArray)
                return(
                    <tr className="">
                        <th>
                            <div>
                            URL
                            </div>
                        </th>   
                        <th>
                            <div>
                            {labAudit.interactive.title}
                            </div>
                        </th>
                        <th className="">
                            <div>
                            {labAudit['speed-index'].title}
                            </div>
                        </th>
                        <th className="">
                            <div>
                            {labAudit['total-blocking-time'].title}
                            </div>
                        </th>
                        <th className="">
                            <div>
                            {labAudit['largest-contentful-paint'].title}
                            </div>
                        </th>
                        <th className="">
                            <div>
                            {labAudit['cumulative-layout-shift'].title}
                            </div>
                        </th>
                        <th className="">
                            <div>
                            {labAudit['max-potential-fid'].title}
                            </div>
                        </th>
                        <th className="">
                            <div>
                            Time
                            </div>
                        </th>
                    </tr>
                )
        }
    }

    return(
        <div >
            <h1 className="text-center titleSize" style={{marginTop:"15px"}}>Report Comparison</h1>
            <div className="container">
                <table className="table table-hover table-responsive-md table-responsive-lg table-responsive-sm table-striped">
                    <thead className="thead-dark">        
                        {labAuditHeadings()}
                    </thead>
                    <tbody>
                        {labAudits()}
                    </tbody>
                </table>
            </div>
            <div className="container" style={{marginTop: '50px'}}>
                <PerformanceChart siteMetrics={state.siteArray}/>
            </div>
        </div>
    )
}

export default CompareReports;