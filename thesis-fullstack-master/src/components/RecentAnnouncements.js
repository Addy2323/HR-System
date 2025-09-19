import * as React from "react";
import CalendarIcon from 'react-calendar-icon'
import { ThemeProvider } from "styled-components";
import { getAnnouncements } from '../utils/localStorage';

export default class RecentAnnouncements extends React.Component {
  
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      recentAnnouncements: [],
    };
  }

  componentDidMount() {
    this._isMounted = true
    //Fetch Recent Announcements from localStorage
    const announcements = getAnnouncements();
    // Get the 5 most recent announcements
    const recentAnnouncements = announcements
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map(announcement => ({
        id: announcement.id,
        announcementTitle: announcement.title,
        announcementDescription: announcement.description,
        createdAt: announcement.createdAt || new Date().toISOString(),
        department: { departmentName: announcement.department || 'General' }
      }));
    
    if(this._isMounted) {
      this.setState({ recentAnnouncements: recentAnnouncements });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const theme = {
        calendarIcon: {
          textColor: "white", // text color of the header and footer
          primaryColor: "#0da472", // background of the header and footer
          backgroundColor: "#fafafa"
        }
      };

      const days = ["Monday", "Tuesday", "Wendesday", "Thursday", "Friday", "Saturday", "Sunday"]
      const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

    return (
        <div className="card">
        <div className="mt-1" style={{ textAlign: "center" }}></div>
          <ul>
            {this.state.recentAnnouncements.map((announcement) => (
                <li style={{ listStyle: "none"}} key={announcement.id} className="mb-2 mt-1">
                    <div className="float-left mr-2">
                        <time datetime="2014-09-20" className="icon p-0">
                            <em>{days[new Date(announcement.createdAt).getDay()]}</em>
                            <strong>{monthNames[new Date(announcement.createdAt).getMonth()]}</strong>
                            <span>{new Date(announcement.createdAt).getDate()}</span>
                        </time>
                    </div>
                    <span><strong>{announcement.announcementTitle}</strong> ({announcement.department?.departmentName || 'General'})</span>
                    <br className="p-1"/>
                    <small>{announcement.announcementDescription}</small>
                    <hr  className=" pt-2 pb-1 mb-0"/>
                </li>
            ))}
          </ul>
      </div>
    );
  }
}
