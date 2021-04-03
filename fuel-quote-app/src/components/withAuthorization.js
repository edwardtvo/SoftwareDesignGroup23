import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

/* https://faizanv.medium.com/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0#18d5 */

export default function withAuthorization(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }
    componentDidMount() {
      fetch('http://localhost:4000/checkToken')
        .then((res) => {
          if (res.status === 200) {
            this.setState({ loading: false });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          console.log('ERROR! in catch block in withAuthorization');
          this.setState({ loading: false, redirect: true });
        });
    }
    render() {
      const { loading, redirect } = this.state;
      // console.log('inside withAuthoziation render block');
      if (loading) {
        // console.log('/// in loading')
        return null;
      }
      else if (redirect) {
        // console.log('/// in redirect')
        return <Redirect to="/" />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  }
}