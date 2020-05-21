'use strict'

const axios = use('axios')
const Env = use('Env')

class CommentController {

    async getComment({request, response}) {

        let baseUrl = `${Env.get('JIRA_API_BASE_URL')}issue/TEST-1`
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

    async getAllComment({request, response}) {

        let baseUrl = `${Env.get('JIRA_API_BASE_URL')}issue/TEST-1/comment`
        const userName = Env.get('JIRA_API_USER')
        let password = Env.get('JIRA_API_PASSWD')

        const comments = await axios.get(baseUrl,{
            withCredentials: true,
            auth: {
              username: userName,
              password: password
          }}).then(function(resp) {
              let resposta = JSON.stringify(resp.data.comments)
              return resposta
          }).catch(function(error) {
            console.log('Error on Authentication')
          })

        
        response.status(201).json(comments)

    }

    async addComment({request, response}) {
     
        let baseUrl = `${Env.get('JIRA_API_BASE_URL')}issue/TEST-1/comment`
        const userName = Env.get('JIRA_API_USER')
        let password = Env.get('JIRA_API_PASSWD')

        
        const comment = request.only(['comment']).comment
        const bodyData = {
            "visibility": {
                "type": "role",
                "value": "Administrators"
              },
              "body": comment
        }

        const info = await axios.post(baseUrl,{
            visibility: {
                type: "role",
                value: "Administrators"
              },
              body: comment
        },{
            withCredentials: true,
            auth: {
              username: userName,
              password: password
            }
        }).then(function(resp) {
              console.log(resp)
            //   let resposta = JSON.stringify(resp)
            //   return resposta
          }).catch(function(error) {
            console.log('Error on Authentication')
          })

          console.log(info)

        
        response.status(201).json(info)

    }

    
}

module.exports = CommentController
