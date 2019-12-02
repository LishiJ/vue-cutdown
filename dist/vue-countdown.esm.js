//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var now = new Date().getTime();
var script = {
  name: 'Vuecountdown',
  props: {
    /**
     * before countdown show time
     */
    showTimeBefore: {
      type: Boolean,
      "default": true
    },

    /**
     * after countdown show time
     */
    showTimeAfter: {
      type: Boolean,
      "default": true
    },

    /**
     * Current time
     */
    currentTime: {
      type: Number,
      "default": now
    },

    /**
     * Start time
     */
    startTime: {
      type: Number,
      "default": now
    },

    /**
     * End time
     */
    endTime: {
      type: Number,
      "default": now
    },

    /**
     * tip message display
     */
    showTip: {
      type: Boolean,
      "default": true
    },

    /**
     * Distance Start Text
     */
    startText: {
      type: String,
      "default": 'Distance Start'
    },

    /**
     * Distance End Text
     */
    runningText: {
      type: String,
      "default": 'Distance End'
    },

    /**
     * Over Text
     */
    endText: {
      type: String,
      "default": "It's over"
    },

    /**
     * Distance Start Text
     */
    tipSepartor: {
      type: String,
      "default": ':'
    },

    /**
     * day_text
     */
    dayTxt: {
      type: String,
      "default": 'day(s)'
    },

    /**
     * hour_text
     */
    hourTxt: {
      type: String,
      "default": ':'
    },

    /**
     * minutes_text
     */
    minutesTxt: {
      type: String,
      "default": ':'
    },

    /**
     * seconds_text
     */
    secondsTxt: {
      type: String,
      "default": ':'
    }
  },
  data: function data() {
    return {
      countdown: {
        day: 0,
        hour: '00',
        minutes: '00',
        seconds: '00'
      },
      countdown_type: 'start',
      timer: null,
      current: null
    };
  },
  computed: {
    tipText: function tipText() {
      return this.countdown_type === 'start' ? this.startText : this.countdown_type === 'run' ? this.runningText : this.endText;
    },
    hiddenTime: function hiddenTime() {
      var countdown_type = this.countdown_type;
      return !this.showTimeBefore && countdown_type === 'start' || !this.showTimeAfter && countdown_type === 'end';
    },
    current_time: function current_time() {
      return this.current || this.calcTimestamp(this.currentTime);
    },
    start_time: function start_time() {
      return this.calcTimestamp(this.startTime);
    },
    end_time: function end_time() {
      return this.calcTimestamp(this.endTime);
    }
  },
  mounted: function mounted() {
    this.startcountdown();
  },
  beforeDestroy: function beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    /**
     * calc timestamp
     * @public
     */
    calcTimestamp: function calcTimestamp(stamp) {
      var _stamp = stamp.toString().length === 10 ? stamp * 1000 : stamp;

      return _stamp;
    },

    /**
     * start countdown event
     * @public
     */
    startcountdown: function startcountdown() {
      if (this.end_time <= this.current_time) {
        // It's over
        // When end_time < current_time
        this.onEnd();
      } else if (this.current_time < this.start_time) {
        // It's not started
        // When end_time < current_time
        this.runcountdown(this.start_time, this.current_time, false);
      } else if (this.end_time > this.current_time && this.start_time <= this.current_time) {
        // It's started
        // When end_time > current_time && start_time <= current_time
        this.onStart();
        this.runcountdown(this.end_time, this.start_time, true);
      }
    },

    /**
     * run countdown event
     * @params end_point {Number}  time end point
     * @params start_point {Number} time start point
     * @params flg {Boolean}
     */
    runcountdown: function runcountdown(end_point, start_point, flg) {
      var _this = this;

      clearInterval(this.timer);
      this.countdown_type = flg ? 'run' : 'start';
      this.calccountdown(end_point, start_point);
      this.timer = setInterval(function () {
        _this.calccountdown(end_point, start_point += 1000, flg);
      }, 1000);
    },

    /**
     * calc day,hour,minutes,seconds
     * @params end_point {Number}  time end point
     * @params start_point {Number} time start point
     * @params flg {Boolean}
     */
    calccountdown: function calccountdown(end_point, start_point, flg) {
      var countdown = this.countdown;
      var time_distance = end_point - start_point; // get day,hour,minutes,seconds

      if (time_distance > 0) {
        // this.countdown.show = true;
        countdown.day = Math.floor(time_distance / 86400000);
        time_distance -= countdown.day * 86400000;
        countdown.hour = Math.floor(time_distance / 3600000);
        time_distance -= countdown.hour * 3600000;
        countdown.minutes = Math.floor(time_distance / 60000);
        time_distance -= countdown.minutes * 60000;
        countdown.seconds = Math.floor(time_distance / 1000).toFixed(0);
        time_distance -= countdown.seconds * 1000; //

        if (countdown.hour < 10) {
          countdown.hour = '0' + countdown.hour;
        }

        if (countdown.minutes < 10) {
          countdown.minutes = '0' + countdown.minutes;
        }

        if (countdown.seconds < 10) {
          countdown.seconds = '0' + countdown.seconds;
        }
      } else if (flg) {
        clearInterval(this.timer);
        this.onEnd();
      } else {
        this.current = this.start_time;
        this.startcountdown();
      }
    },

    /**
     * start callback
     * @public
     */
    onStart: function onStart() {
      console.log('start...');
      this.countdown_type = 'run';
      this.$emit('onStart');
    },

    /**
     * stop callback
     * @public
     */
    onEnd: function onEnd() {
      console.log('end...');
      this.countdown_type = 'end';
      this.$emit('onEnd');
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("p", {
    staticClass: "vue-countdown"
  }, [_vm.showTip ? _c("span", [_c("span", [_vm._v(_vm._s(_vm.tipText) + _vm._s(_vm.tipSepartor))])]) : _vm._e(), _vm._v(" "), _c("span", {
    attrs: {
      hidden: _vm.hiddenTime
    }
  }, [_vm.countdown.day > 0 ? _c("span", [_c("span", [_vm._v(_vm._s(_vm.countdown.day))]), _vm._v(" "), _c("i", [_vm._v(_vm._s(_vm.dayTxt))])]) : _vm._e(), _vm._v(" "), _c("span", [_vm._v(_vm._s(_vm.countdown.hour))]), _vm._v(" "), _c("i", [_vm._v(_vm._s(_vm.hourTxt))]), _vm._v(" "), _c("span", [_vm._v(_vm._s(_vm.countdown.minutes))]), _vm._v(" "), _c("i", [_vm._v(_vm._s(_vm.minutesTxt))]), _vm._v(" "), _c("span", [_vm._v(_vm._s(_vm.countdown.seconds))])])]);
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-685bc599_0", {
    source: ".countdown i {\n  font-style: normal;\n}\n",
    map: {
      "version": 3,
      "sources": ["vue-countdown.vue"],
      "names": [],
      "mappings": "AAAA;EACE,kBAAkB;AACpB",
      "file": "vue-countdown.vue",
      "sourcesContent": [".countdown i {\n  font-style: normal;\n}\n"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject SSR */

var Component = normalizeComponent_1({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, browser, undefined);

// Import vue component

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueCountdown', Component);
} // Create module definition for Vue.use()

var plugin = {
  install: install // To auto-install when vue is found

};
var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
} // To allow use as module (npm/webpack/etc.) export component
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default Component;
export { install };
