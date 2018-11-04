import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { browserHistory } from 'react-router';
import HomePage from './pages/homePage.js';
import NavBar from './headerComponent/navBar.js';
import Footer from './footerComponent/footer.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            responseData: [],
        };
    }


     formatTime(time) {
            time = time.split("");
            let hours = time[0] + time[1];
            let min = time[2] + time[3];
            if (hours < 12) {
                return hours + ':' + min + ' AM';
            } else {
                hours=hours - 12;
                if(hours === 0) { hours=12 }
                hours=(hours < 10) ? '0'+hours:hours;
                return hours+ ':' + min + ' PM';
            }
     }

     formatDate(date) {
         var monthNames = ["January", "February", "March", "April", "May", "June",
             "July", "August", "September", "October", "November", "December"
         ];

         var year = date.substring(0, 4);
         var month = date.substring(4, 6);
         var day = date.substring(6, 8);

         month = parseInt(month)-1;

         return day+"-"+monthNames[month]+"-"+year;

     }


    componentDidMount() {
        fetch('https://x1u1bfq6q1.execute-api.ap-southeast-2.amazonaws.com/dev/v1/best-profit', {headers: {Accept: 'application/json',
                Authorization: 'Bearer 4674cc54-bd05-11e7-abc4-cec278b6b50a' }})
            .then((results) => results.json())
            .then(json => {
                let responseData = json.payload.message.map((response)=>{
                return (<table width="50%" class="table table-bordered" key={response.currency}>
                    <thead><tr><td colspan="2" class="text-center">{this.formatDate(response.date)}</td></tr></thead>
                    <tbody>
                    <tr bgcolor="#C0C0C0"><td colspan="2" class="text-center"><b></b>{response.currency} </td>  </tr>
                    <tr><td class="text-center"><b>Buy</b></td><td class="text-center"><b>Sell</b></td> </tr>
                    <tr><td class="text-center">${response.buy.price} </td><td class="text-center">${response.sell.price} </td> </tr>
                    <tr><td class="text-center">{this.formatTime(response.buy.time)} </td><td class="text-center">{this.formatTime(response.sell.time)} </td> </tr>
                    <tr><td colspan="2" class="text-center">Profit: ${response.profit}</td></tr></tbody></table>)
            })
        this.setState({responseData: responseData});
                console.log("state", this.state.responseData);
        })
    }

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route name="home" exact path="/" component={HomePage} />
            <div class="container"><div class="col-md-3">{this.state.responseData}</div></div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;