import Vue from 'vue';

import helper from './helper';
import auth from './auth';
import form from './form';
import notify from './notify'

Vue.mixin(helper);
Vue.mixin(auth);
Vue.mixin(form);
Vue.mixin(notify);