import React, { Component } from 'react'
import { createClient } from 'contentful'

const SPACE_ID = '1si34rb84bgx'
const ACCESS_TOKEN = '76ca32dfc9e1497a8421320b8328e83bd14eb656b6f642ba25e61fb6392514f2'

const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
});

class Skills extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      skills: []
    };
  }

  componentDidMount() {
    let self = this;

    // Load skills
    client.getEntries({
      content_type: 'skill',
      order: '-fields.strength'
    })
      .then((response) => {
        let skills = [];

        response.items.forEach(function (job) {
          skills.push({
            id: job.sys.id,
            skill: job.fields.skill,
            strength: job.fields.strength
          });
        });

        self.setState({
          skills: skills
        });
      })
      .catch(console.error);
  }

  render() {
    return (
      <div className="row skill">
        <div className="three columns header-col">
          <h1>
            <span>Skills</span>
          </h1>
        </div>

        <div className="nine columns main-col">
          <div className="bars">
            <ul className="skills">
              {this.state.skills.map((item) => {
                return (
                  <li key={item.id}>
                    {/* <span className="bar-expand" style={{ width: item.strength + '%' }} /> */}
                    <em>{item.skill}</em>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Skills;
