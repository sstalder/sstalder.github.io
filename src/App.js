import React, { Component } from 'react';
import { Converter } from 'showdown';
import moment from 'moment';
import { createClient } from 'contentful'
// import jQuery from 'jquery';
// import bootstrap from 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './App.css';

const SPACE_ID = '1si34rb84bgx';
const ACCESS_TOKEN = '76ca32dfc9e1497a8421320b8328e83bd14eb656b6f642ba25e61fb6392514f2';

const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
});

function createMarkup(html) {
  return { __html: html };
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      jobs: [],
      certifications: []
    };
  }

  componentDidMount() {
    let self = this;
    let converter = new Converter();

    // Load jobs
    client.getEntries({
      content_type: 'job',
      order: '-fields.fromYear,-fields.toYear'
    })
      .then((response) => {
        let jobs = [];

        response.items.forEach(function (job) {
          jobs.push({
            id: job.sys.id,
            company: job.fields.company,
            description: converter.makeHtml(job.fields.description),
            fromDate: moment(job.fields.fromYear).format("MM/YYYY"),
            toDate: moment(job.fields.toYear).format("MM/YYYY")
          });
        });

        self.setState({
          jobs: jobs
        });
      })
      .catch(console.error);

    // Load certifications
    client.getEntries({
      content_type: 'certifications',
      order: '-fields.year'
    })
      .then((response) => {
        let certifications = [];

        response.items.forEach(function (cert) {
          certifications.push({
            id: cert.sys.id,
            title: cert.fields.title,
            year: cert.fields.year
          });
        });

        self.setState({
          certifications: certifications
        });
      })
      .catch(console.error);
  }

  render() {
    return (
      <div>
        <h1>
          <span className="glyphicon glyphicon-certificate"></span>
          Certifications
        </h1>

        <div className="row">
          <div className="col-xs-12">
            {this.state.certifications.map(function (item) {
              return (
                <div key={item.id} className="certification">
                  <h2>
                    {item.title}
                    <span className="pull-right label label-success">{item.year}</span>
                  </h2>
                </div>
              );
            })}
          </div>
        </div>

        <h1>
          <span className="glyphicon glyphicon-tasks"></span>
          Work History
        </h1>

        <div className="row">
          <div className="col-xs-12">
            {this.state.jobs.map(function (item) {
              return (
                <div key={item.id} className="job">
                  <h2>
                    {item.company}
                    <span className="pull-right label label-success">{item.fromDate} - {item.toDate}</span>
                  </h2>

                  <span dangerouslySetInnerHTML={createMarkup(item.description)}></span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;