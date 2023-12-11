import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Router } from 'react-router-dom';
import InsightPage from './components/InsightPage';
import UserProfile from './components/userprofile/UserProfile';
import Header from './components/Header';
import { useActions } from './hooks/useAction';
import { useTypedSelector } from './hooks/useTypedSelector';
import UserDashboardItem from './components/dashboards/UserDashboardItem';
import CompareReports from './components/comparereports/CompareReports';
import DeleteDashboardItem from './components/dashboards/DeleteDashboardItem';

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


const App: React.FC = () => {

  const { fetchUser } = useActions();
  const auth = useTypedSelector((state: any) => state.auth)

  useEffect(() => {
    fetchUser();
  }, [])


  return (
    <div className="App">
      <BrowserRouter>
            <Header authData={auth}/>
            <Routes>
              <Route path="/" element={<InsightPage/>}/>
              <Route path="/profile/:id" element={<UserProfile authData={auth}/>}/>
              <Route path="/profile/:id/compareReports" element={<CompareReports/>}/>
              <Route path="/profile/:userId/saved_sites/:id" element={<UserDashboardItem/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
