import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { LemmyHttp, Login } from 'lemmy-js-client'

import './app.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

let baseUrl = '/'
const client = new LemmyHttp(baseUrl)

client.getSite({})
// const loginForm = {
//   username_or_email: process.env.USERNAME,
//   password: process.env.PASSWORD
// }
// let jwt = await client.login(loginForm).jwt
// console.log(jwt)
