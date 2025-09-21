import * as React from "react";
import { getApplications, getUsers } from '../../utils/localStorage';

export default class RecentApplications extends React.Component {
  
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      recentApplications: [],
    };
  }

  componentDidMount() {
    this._isMounted = true
    let deptId = JSON.parse(localStorage.getItem('user')).departmentId
    
    // Fetch Applications Recent from localStorage
    const allApplications = getApplications();
    const allUsers = getUsers();
    
    // Filter applications by department
    const deptApplications = allApplications.filter(app => {
        const user = allUsers.find(u => u.id == app.userId);
        return user && user.departmentId == deptId;
    });
    
    // Sort by creation date and take the 5 most recent
    const recentApplications = deptApplications
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map(app => {
        const user = allUsers.find(u => u.id == app.userId);
        return {
          ...app,
          user: user ? { fullName: user.fullName || `${user.firstName} ${user.lastName}` } : { fullName: 'Unknown User' }
        };
      });
    
    if(this._isMounted) {
      this.setState({ recentApplications: recentApplications });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="card">
        <div className="mt-1" style={{ textAlign: "center" }}></div>
        <div>
          <ul>
            {this.state.recentApplications.map((app) => (
                <li style={{ listStyle: "none", height: '50px'}} key={app.id} className="mt-1 mb-2">
                  <h5>
                    <div className="float-left mr-1">
                      <img src={process.env.PUBLIC_URL + '/user-40.png'} alt=""></img>
                    </div>
                    <span>{app.user.fullName} </span>
                    <small>({app.type})</small>
                    <div className="float-right mt-2 mr-3">
                      <small style={{
                        color: (app.status === 'Approved' ? 'green' :
                                app.status === 'Rejected' ? 'red' :
                                'orange'
                        )
                      }}>{app.status}</small>
                    </div>
                    <p></p>
                  </h5>
                <hr className="mt-2 mb-2"/>
                </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}