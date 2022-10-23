import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import UI from '@/components/library'

// 1. 引入你需要的组件
import {
  Button,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Notify,
  Icon,
  Form,
  Field,
  Popup,
  Area,
  Search,
  Sidebar,
  SidebarItem,
  NavBar,
  Empty,
  Tab,
  Tabs,
  Stepper,
  ActionBar,
  ActionBarIcon,
  ActionBarButton,
  Checkbox,
  Tag,
  SwipeCell,
} from 'vant'
// 2. 引入组件样式
import 'vant/lib/index.css'

const app = createApp(App)
// 3. 注册你需要的组件
app
  .use(Swipe)
  .use(SwipeItem)
  .use(Button)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Notify)
  .use(Icon)
  .use(Form)
  .use(Field)
  .use(Popup)
  .use(Area)
  .use(Search)
  .use(Sidebar)
  .use(NavBar)
  .use(Empty)
  .use(SidebarItem)
  .use(SwipeCell)
  .use(Tabs)
  .use(Tab)
  .use(ActionBar)
  .use(Stepper)
  .use(ActionBarIcon)
  .use(ActionBarButton)
  .use(Checkbox)
  .use(Tag)
  .use(store)
  .use(UI)
  .use(router)
  .mount('#app')
