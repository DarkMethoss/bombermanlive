import App, { appComponent } from './App.js'
import { render } from '../framework/index.js'

const root = document.getElementById('root')
render(App(appComponent), root)