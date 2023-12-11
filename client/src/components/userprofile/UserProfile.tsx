import React, {useEffect} from 'react';
import  {useActions} from '../../hooks/useAction';
import UserDashboardList from './UserDashboardList';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface HeaderProps{
    authData: {
        googleId: string;
        displayName: string;
        userImage: string;
    }
}


const UserProfile: React.FC<HeaderProps> = ({authData}) => {
    const displayUserData = () => {
        if(!authData){
            return(
                <div className="d-flex justify-content-center" style={{width:"3rem", height:'3rem'}}>
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        } else {
            return(
                <div>
                    <br/>

                    <img style={{borderRadius:"10px"}} src={authData.userImage}/>
                    <p>{authData.displayName}</p>
                    <br/>
                </div>
            )
        }
    }

    const displayUserDashboard = () => {
        if(!authData){
            return <div>Loading...</div>
        } else {
            return <UserDashboardList googleId={authData.googleId}/>
        }
    }

    return(
        <div className="container">
            {displayUserData()}
            <h1 className="titleSize" style={{marginBottom:'20px'}}>My Dashboards</h1>
            {displayUserDashboard()}
        </div>
    )
}

export default UserProfile;