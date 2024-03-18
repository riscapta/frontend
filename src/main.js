import { createAuth0 } from '@auth0/auth0-vue'
import authConfig from '../auth_config.json'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app
  .use(
    createAuth0({
      domain: authConfig.domain,
      clientId: authConfig.clientId,
      authorizationParams: {
        audience: authConfig.audience,
        redirect_uri: window.location.origin,
      },
    })
  )
  .mount('#app')
