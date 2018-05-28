import React, { Component } from 'react'
import { Converter } from 'showdown'
import moment from 'moment'
import { createClient } from 'contentful'

const SPACE_ID = '1si34rb84bgx'
const ACCESS_TOKEN = '76ca32dfc9e1497a8421320b8328e83bd14eb656b6f642ba25e61fb6392514f2'

const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
});

function createMarkup(html) {
  return { __html: html };
}

class Work extends React.Component {
  constructor(props) {
    super(props);

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

        response.items.forEach((job) => {
          jobs.push({
            id: job.sys.id,
            company: job.fields.company,
            jobTitle: job.fields.jobTitle,
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

        response.items.forEach((cert) => {
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
        <div className="row work">
          <div className="three columns header-col">
            <h1>
              <span>Certifications</span>
            </h1>
          </div>

          <div className="nine columns main-col">
            {this.state.certifications.map(function (item) {
              return (
                <div className="row item" key={item.id}>
                  <div className="twelve columns">
                    <h3>{item.title}</h3>

                    <p className="info">
                      <em className="date">{item.year}</em>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="row work">
          <div className="three columns header-col">
            <h1>
              <span>Work</span>
            </h1>
          </div>

          <div className="nine columns main-col">
            {this.state.jobs.map((item) => {
              return (
                <div className="row item" key={item.id}>
                  <div className="twelve columns">
                    <h3>{item.company}</h3>

                    <p className="info">
                      {item.jobTitle}
                      <span>&bull;</span>
                      <em className="date">{item.fromDate} - {item.toDate}</em>
                    </p>

                    <p dangerouslySetInnerHTML={createMarkup(item.description)}></p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Work;
