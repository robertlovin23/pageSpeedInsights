import React, {useState} from 'react';

interface SiteMetricsForm{
    setSiteMetrics: Function;
    setLoadingState: Function;
    loadingState: boolean;
}

const Form: React.FC<SiteMetricsForm> = ({setSiteMetrics, setLoadingState, loadingState}) => {
    const [inputUrl, setUrl] = useState<string>("");

    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUrl(e.target.value)
      }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingState(true);
        console.log(loadingState)
  
        const apiKey = 'AIzaSyBGoP8fAcq71lsBBamzOhJdqBnhXiD-gyg';
        const url = buildQueryURL(inputUrl, apiKey);
  
        const response = await fetch(url);
        const metrics = await response.json();
        console.log(e, response);
        setSiteMetrics(metrics)``
    }

    function buildQueryURL(url: string, key: string) {
        const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
        let query = `${api}?url=${encodeURIComponent(url)}`;
        if(key != ""){
          query += `&key=${key}`
        }
        return query;
      }

      return(      
        <form onSubmit={onSubmit}>
            <div className="mb-3">
            <label className="form-label">Enter URL to Test Page Speed:</label>
            <input className="form-control" onChange={onChange} value={inputUrl} id="url" name="url" type="text"/>
            <button className="btn btn-primary layout-shift">Submit</button>
            </div>
        </form>
       )


}

export default Form;