'use strict'

const axios = use('axios')
const Env = use('Env')

class TestController {

    async test({request, response}) {
        let baseUrl = 'https://diegofnib.atlassian.net/rest/api/3/issue/TEST-1'
        const userName = Env.get('JIRA_API_USER')
        let password = Env.get('JIRA_API_PASSWD')


        const info = await axios.get(baseUrl,{
            
            withCredentials: true,
            auth: {
              username: userName,
              password: password
          }}).then(function(resp) {
              let resposta = JSON.stringify(resp.data.fields)
              return resposta
            
          }).catch(function(error) {
            console.log('Error on Authentication')
          })

        
    response.status(201).json(info)


    }
}

module.exports = TestController
