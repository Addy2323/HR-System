import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { getCurrentUser } from "./utils/localStorage";

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        isAuthenticated: false,
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      const currentUser = getCurrentUser();
      const token = localStorage.getItem('token');
      
      if (currentUser && token) {
        this.setState({ 
          isAuthenticated: true,
          loading: false 
        });
        console.log(`Access: ${this.state.isAuthenticated}`);
        localStorage.setItem('user', JSON.stringify(currentUser));
      } else {
        console.log(`Access: ${this.state.isAuthenticated}`);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.setState({ loading: false, redirect: true });
      }
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  };
}
