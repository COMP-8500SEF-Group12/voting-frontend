import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus';

 
async function enableMocking() {
    if (process.env.NODE_ENV !== 'development') {
      return
    }
   
    const { worker } = await import('./mocks/browser')
    // `worker.start()` returns a Promise that resolves
    // once the Service Worker is up and ready to intercept requests.
    return worker.start()
}

enableMocking().then(() => {
    createApp(App).use(router).use(ElementPlus).mount('#app')
})