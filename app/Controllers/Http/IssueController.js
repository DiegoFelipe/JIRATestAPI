'use strict'

const Env = use('Env')
const axios = use('axios')

class IssueController {

    async getAllIssuesFromProject({ request, response }) {


        let baseUrl = `${Env.get('JIRA_API_BASE_URL')}search?jql=project=TEST`
        const userName = Env.get('JIRA_API_USER')
        let password = Env.get('JIRA_API_PASSWD')


        const info = await axios.get(baseUrl,{
            withCredentials: true,
            auth: {
              username: userName,
              password: password
          }}).then(function(resp) {
              let resposta = JSON.stringify(resp.data.issues)
              return resposta
          }).catch(function(error) {
            console.log('Error on Authentication')
          })

        
        response.status(200).json(info)

    }
}

module.exports = IssueController
