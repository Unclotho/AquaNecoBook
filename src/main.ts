import { routes } from './config/routes';
import { createApp } from 'vue'
import { App } from './App'
import { createRouter } from 'vue-router'
import { history } from './shared/history';
import '@svgstore';
import { mePromise, refreshMe, fetchMe } from './shared/me';

const router = createRouter({ history, routes })

fetchMe()

router.beforeEach(async (to, from)=> {
    if(to.path === '/' || to.path === '/welcome' || to.path.startsWith('/sign_in') || to.path === '/start'){
        return true
    }else{
        const path = mePromise!.then(
            () => true,
            () => '/sign_in?return_to=' + to.path
        )
        return path
    }
})


const app = createApp(App)
app.use(router)
app.mount('#app')
