import * as React from "react";
import { getApplications } from '../utils/localStorage';

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
    //Fetch Applications Recent from localStorage
    const applications = getApplications();
    const recentApplications = applications
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map(app => ({
        id: app.id,
        type: app.type || 'Leave',
        status: app.status || 'Pending',
        user: {
          fullName: app.employeeName || 'Unknown User'
        }
      }));
    
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
                      <img src="/user-40.png" alt="User avatar"></img>
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
