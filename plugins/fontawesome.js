import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faEdit, faCheckSquare, faSquare
} from '@fortawesome/free-regular-svg-icons'
import {
  faThLarge, faFolder, faFileAlt, faShoppingCart, faUserAlt, faPowerOff,
  faBars, faBell, faEnvelope,
  faFileInvoice, faFileInvoiceDollar, faReceipt,
  faPlusCircle, faSearch, faChevronLeft, faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(
  faEdit, faCheckSquare, faSquare,
  faThLarge, faFolder, faFileAlt, faShoppingCart, faUserAlt, faPowerOff,
  faBars, faBell, faEnvelope,
  faFileInvoice, faFileInvoiceDollar, faReceipt,
  faPlusCircle, faSearch, faChevronLeft, faChevronRight,
)

// Register the component globally
Vue.component('FaIcon', FontAwesomeIcon)