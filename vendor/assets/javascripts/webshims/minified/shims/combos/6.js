jQuery.webshims.register("form-number-date-api",function(a,b){var n,k,w;if(!b.getStep)b.getStep=function(m,b){var c=a.attr(m,"step");if("any"===c)return c;b=b||p(m);if(!e[b]||!e[b].step)return c;c=n.asNumber(c);return(!isNaN(c)&&0<c?c:e[b].step)*e[b].stepScaleFactor};if(!b.addMinMaxNumberToCache)b.addMinMaxNumberToCache=function(a,b,c){a+"AsNumber"in c||(c[a+"AsNumber"]=e[c.type].asNumber(b.attr(a)),isNaN(c[a+"AsNumber"])&&a+"Default"in e[c.type]&&(c[a+"AsNumber"]=e[c.type][a+"Default"]))};var i=
parseInt("NaN",10),e=b.inputTypes,r=function(a){return"number"==typeof a||a&&a==1*a},s=function(m){return a('<input type="'+m+'" />').prop("type")===m},p=function(a){return(a.getAttribute("type")||"").toLowerCase()},x=b.addMinMaxNumberToCache,t=function(a,b){for(var a=""+a,b=b-a.length,c=0;c<b;c++)a="0"+a;return a},h=b.bugs.valueAsNumberSet||b.bugs.bustedValidity;b.addValidityRule("stepMismatch",function(a,g,c,d){if(""===g)return!1;if(!("type"in c))c.type=p(a[0]);if("date"==c.type)return!1;d=(d||
{}).stepMismatch;if(e[c.type]&&e[c.type].step){if(!("step"in c))c.step=b.getStep(a[0],c.type);if("any"==c.step)return!1;if(!("valueAsNumber"in c))c.valueAsNumber=e[c.type].asNumber(g);if(isNaN(c.valueAsNumber))return!1;x("min",a,c);a=c.minAsNumber;isNaN(a)&&(a=e[c.type].stepBase||0);d=Math.abs((c.valueAsNumber-a)%c.step);d=!(1.0E-7>=d||1.0E-7>=Math.abs(d-c.step))}return d});[{name:"rangeOverflow",attr:"max",factor:1},{name:"rangeUnderflow",attr:"min",factor:-1}].forEach(function(a){b.addValidityRule(a.name,
function(b,c,d,f){f=(f||{})[a.name]||!1;if(""===c)return f;if(!("type"in d))d.type=p(b[0]);if(e[d.type]&&e[d.type].asNumber){if(!("valueAsNumber"in d))d.valueAsNumber=e[d.type].asNumber(c);if(isNaN(d.valueAsNumber))return!1;x(a.attr,b,d);if(isNaN(d[a.attr+"AsNumber"]))return f;f=d[a.attr+"AsNumber"]*a.factor<d.valueAsNumber*a.factor-1.0E-7}return f})});b.reflectProperties(["input"],["max","min","step"]);var u=b.defineNodeNameProperty("input","valueAsNumber",{prop:{get:function(){var b=p(this),b=e[b]&&
e[b].asNumber?e[b].asNumber(a.prop(this,"value")):u.prop._supget&&u.prop._supget.apply(this,arguments);null==b&&(b=i);return b},set:function(m){var g=p(this);e[g]&&e[g].numberToString?isNaN(m)?a.prop(this,"value",""):(g=e[g].numberToString(m),!1!==g?a.prop(this,"value",g):b.warn("INVALID_STATE_ERR: DOM Exception 11")):u.prop._supset&&u.prop._supset.apply(this,arguments)}}}),v=b.defineNodeNameProperty("input","valueAsDate",{prop:{get:function(){var b=p(this);return e[b]&&e[b].asDate&&!e[b].noAsDate?
e[b].asDate(a.prop(this,"value")):v.prop._supget&&v.prop._supget.call(this)||null},set:function(m){var g=p(this);if(e[g]&&e[g].dateToString&&!e[g].noAsDate){if(null===m)return a.prop(this,"value",""),"";g=e[g].dateToString(m);if(!1!==g)return a.prop(this,"value",g),g;b.warn("INVALID_STATE_ERR: DOM Exception 11")}else return v.prop._supset&&v.prop._supset.apply(this,arguments)||null}}});n={mismatch:function(a){return!r(a)},step:1,stepScaleFactor:1,asNumber:function(a){return r(a)?1*a:i},numberToString:function(a){return r(a)?
a:!1}};k={minDefault:0,maxDefault:100};w={mismatch:function(b){if(!b||!b.split||!/\d$/.test(b))return!0;var e=b.split(/\u002D/);if(3!==e.length)return!0;var c=!1;a.each(e,function(a,f){if(!(r(f)||f&&f=="0"+1*f))return c=!0,!1});if(c)return c;if(4!==e[0].length||2!=e[1].length||12<e[1]||2!=e[2].length||33<e[2])c=!0;return b!==this.dateToString(this.asDate(b,!0))},step:1,stepScaleFactor:864E5,asDate:function(a,b){return!b&&this.mismatch(a)?null:new Date(this.asNumber(a,!0))},asNumber:function(a,b){var c=
i;if(b||!this.mismatch(a))a=a.split(/\u002D/),c=Date.UTC(a[0],a[1]-1,a[2]);return c},numberToString:function(a){return r(a)?this.dateToString(new Date(1*a)):!1},dateToString:function(a){return a&&a.getFullYear?a.getUTCFullYear()+"-"+t(a.getUTCMonth()+1,2)+"-"+t(a.getUTCDate(),2):!1}};if(h||!s("range")||!s("time"))k=a.extend({},n,k);(h||!s("number"))&&b.addInputType("number",n);(h||!s("range"))&&b.addInputType("range",k);(h||!s("date"))&&b.addInputType("date",w)});
jQuery.webshims.register("form-number-date-ui",function(a,b,n,k,w,i){var e=b.triggerInlineForm,r=Modernizr.inputtypes,s=function(){var a={"padding-box":"innerWidth","border-box":"outerWidth","content-box":"width"},d=Modernizr.prefixed&&Modernizr.prefixed("boxSizing");return function(f,b){var e,j,i;j="width";d&&(j=a[f.css(d)]||j);e=f[j]();j="width"==j;if(e){var q=parseInt(b.css("marginLeft"),10)||0,y=b.outerWidth();(i=parseInt(f.css("marginRight"),10)||0)&&f.css("marginRight",0);q<=-1*y?(b.css("marginRight",
Math.floor(Math.abs(y+q)+i)),f.css("paddingRight",(parseInt(f.css("paddingRight"),10)||0)+Math.abs(q)),j&&f.css("width",Math.floor(e+q))):(b.css("marginRight",i),f.css("width",Math.floor(e-q-y)))}}}(),p={},x=a([]),t,h=function(c,d){a("input",c).add(d.filter("input")).each(function(){var c=a.prop(this,"type");if(h[c]&&!b.data(this,"shadowData"))h[c](a(this))})},u=function(c,d){if(i.lazyDate){var f=a.data(c[0],"setDateLazyTimer");f&&clearTimeout(f);a.data(c[0],"setDateLazyTimer",setTimeout(function(){c.datepicker("setDate",
d);a.removeData(c[0],"setDateLazyTimer");c=null},0))}else c.datepicker("setDate",d)};if(i.lazyDate===w)try{i.lazyDate=a.browser.msie&&9>b.browserVersion||500>a(n).width()&&500>a(n).height()}catch(v){}var m={tabindex:1,tabIndex:1,title:1,"aria-required":1,"aria-invalid":1};if(!i.copyAttrs)i.copyAttrs={};b.extendUNDEFProp(i.copyAttrs,m);h.common=function(c,d,f){Modernizr.formvalidation&&c.bind("firstinvalid",function(a){(b.fromSubmit||!t)&&c.unbind("invalid.replacedwidgetbubble").bind("invalid.replacedwidgetbubble",
function(d){!a.isInvalidUIPrevented()&&!d.isDefaultPrevented()&&(b.validityAlert.showFor(a.target),a.preventDefault(),d.preventDefault());c.unbind("invalid.replacedwidgetbubble")})});var e,o,j=a("input, span.ui-slider-handle",d),h=c[0].attributes;for(e in i.copyAttrs)if((o=h[e])&&o.specified)m[e]&&j[0]?j.attr(e,o.nodeValue):d[0].setAttribute(e,o.nodeValue);o=c.attr("id");e=i.calculateWidth?{css:{marginRight:c.css("marginRight"),marginLeft:c.css("marginLeft")},outerWidth:c.outerWidth()}:{};e.label=
o?a('label[for="'+o+'"]',c[0].form):x;o=b.getID(e.label);d.addClass(c[0].className);b.addShadowDom(c,d,{data:f||{},shadowFocusElement:a("input.input-datetime-local-date, span.ui-slider-handle",d)[0],shadowChilds:j});c.after(d).hide();c[0].form&&a(c[0].form).bind("reset",function(a){a.originalEvent&&!a.isDefaultPrevented()&&setTimeout(function(){c.prop("value",c.prop("value"))},0)});1==d.length&&!a("*",d)[0]&&(d.attr("aria-labelledby",o),e.label.bind("click",function(){d.focus();return!1}));return e};
Modernizr.formvalidation&&["input","form"].forEach(function(a){var d=b.defineNodeNameProperty(a,"checkValidity",{prop:{value:function(){t=!0;var a=d.prop._supvalue.apply(this,arguments);t=!1;return a}}})});if(!r.date||i.replaceUI){var g=function(c,d,f,e){var o,j,h=function(){q.dpDiv.unbind("mousedown.webshimsmousedownhandler");j=o=!1},q=d.bind("focusin",function(){h();q.dpDiv.unbind("mousedown.webshimsmousedownhandler").bind("mousedown.webshimsmousedownhandler",function(){o=!0})}).bind("focusout blur",
function(a){o&&(j=!0,a.stopImmediatePropagation())}).datepicker(a.extend({onClose:function(){j&&d.not(":focus")?(h(),d.trigger("focusout"),d.triggerHandler("blur")):h()}},p,i.datepicker,c.data("datepicker"))).bind("change",f).data("datepicker");q.dpDiv.addClass("input-date-datepicker-control");e&&b.triggerDomUpdate(e[0]);["disabled","min","max","value","step"].forEach(function(a){var d=c.prop(a);""!==d&&("disabled"!=a||!d)&&c.prop(a,d)});return q};h.date=function(c){if(a.fn.datepicker){var d=a('<input class="input-date" type="text" />'),
f=this.common(c,d,h.date.attrs),b=g(c,d,function(b){h.date.blockAttr=!0;var f;if(i.lazyDate){var z=a.data(d[0],"setDateLazyTimer");z&&(clearTimeout(z),a.removeData(d[0],"setDateLazyTimer"))}try{f=(f=a.datepicker.parseDate(d.datepicker("option","dateFormat"),d.prop("value")))?a.datepicker.formatDate("yy-mm-dd",f):d.prop("value")}catch(q){f=d.prop("value")}c.prop("value",f);h.date.blockAttr=!1;b.stopImmediatePropagation();e(c[0],"input");e(c[0],"change")});f.css&&(d.css(f.css),f.outerWidth&&d.outerWidth(f.outerWidth),
b.trigger[0]&&s(d,b.trigger))}};h.date.attrs={disabled:function(c,d,f){a.prop(d,"disabled",!!f)},min:function(c,d,f){try{f=a.datepicker.parseDate("yy-mm-dd",f)}catch(b){f=!1}f&&a(d).datepicker("option","minDate",f)},max:function(c,d,f){try{f=a.datepicker.parseDate("yy-mm-dd",f)}catch(b){f=!1}f&&a(d).datepicker("option","maxDate",f)},value:function(c,d,f){if(!h.date.blockAttr){try{var b=a.datepicker.parseDate("yy-mm-dd",f)}catch(e){b=!1}b?u(a(d),b):a.prop(d,"value",f)}}}}if(!r.range||i.replaceUI)h.range=
function(c){if(a.fn.slider){var d=a('<span class="input-range"><span class="ui-slider-handle" role="slider" tabindex="0" /></span>'),b=this.common(c,d,h.range.attrs);a("span",d).attr("aria-labelledby",b.label.attr("id"));b.label.bind("click",function(){a("span",d).focus();return!1});b.css&&(d.css(b.css),b.outerWidth&&d.outerWidth(b.outerWidth));d.slider(a.extend(!0,{},i.slider,c.data("slider"))).bind("slide",function(a,b){if(a.originalEvent)h.range.blockAttr=!0,c.prop("value",b.value),h.range.blockAttr=
!1,e(c[0],"input"),e(c[0],"change")});["disabled","min","max","step","value"].forEach(function(b){var d=c.attr(b),f;"value"==b&&!d&&(f=c.getShadowElement())&&(d=(a(f).slider("option","max")-a(f).slider("option","min"))/2);null!=d&&c.attr(b,d)})}},h.range.attrs={disabled:function(c,b,f){f=!!f;a(b).slider("option","disabled",f);a("span",b).attr({"aria-disabled":f+"",tabindex:f?"-1":"0"})},min:function(b,d,f){f=f?1*f||0:0;a(d).slider("option","min",f);a("span",d).attr({"aria-valuemin":f})},max:function(b,
d,f){f=f||0===f?1*f||100:100;a(d).slider("option","max",f);a("span",d).attr({"aria-valuemax":f})},value:function(b,d,f){f=a(b).prop("valueAsNumber");isNaN(f)||(h.range.blockAttr||a(d).slider("option","value",f),a("span",d).attr({"aria-valuenow":f,"aria-valuetext":f}))},step:function(b,d,f){f=f&&a.trim(f)?1*f||1:1;a(d).slider("option","step",f)}};if(!b.bugs.valueAsNumberSet&&(i.replaceUI||!Modernizr.inputtypes.date||!Modernizr.inputtypes.range))n=function(){b.data(this,"hasShadow")&&a.prop(this,"value",
a.prop(this,"value"))},b.onNodeNamesPropertyModify("input","valueAsNumber",n),b.onNodeNamesPropertyModify("input","valueAsDate",n);a.each(["disabled","min","max","value","step"],function(a,d){b.onNodeNamesPropertyModify("input",d,function(a){var c=b.data(this,"shadowData");if(c&&c.data&&c.data[d]&&c.nativeElement===this)c.data[d](this,c.shadowElement,a)})});if(!i.availabeLangs)i.availabeLangs="af ar ar-DZ az bg bs ca cs da de el en-AU en-GB en-NZ eo es et eu fa fi fo fr fr-CH gl he hr hu hy id is it ja ko kz lt lv ml ms nl no pl pt-BR rm ro ru sk sl sq sr sr-SR sv ta th tr uk vi zh-CN zh-HK zh-TW".split(" ");
n=function(){a.datepicker&&(b.activeLang({langObj:a.datepicker.regional,module:"form-number-date-ui",callback:function(b){b=a.extend({},p,b,i.datepicker);a.datepicker.setDefaults(b);b.dateFormat&&i.datepicker.dateFormat!=b.dateFormat&&a("input.hasDatepicker").filter(".input-date, .input-datetime-local-date").datepicker("option","dateFormat",b.dateFormat)}}),a(k).unbind("jquery-uiReady.langchange input-widgetsReady.langchange"))};a(k).bind("jquery-uiReady.langchange input-widgetsReady.langchange",
n);n();(function(){var c=function(){var b={};return function(c){return c in b?b[c]:b[c]=a('<input type="'+c+'" />')[0].type===c}}();if(!c("number")){var d=b.cfg["forms-ext"],f=b.inputTypes,h=function(c,d,e){e=e||{};if(!("type"in e))e.type=a.prop(c,"type");if(!("step"in e))e.step=b.getStep(c,e.type);if(!("valueAsNumber"in e))e.valueAsNumber=f[e.type].asNumber(a.prop(c,"value"));var h="any"==e.step?f[e.type].step*f[e.type].stepScaleFactor:e.step;b.addMinMaxNumberToCache("min",a(c),e);b.addMinMaxNumberToCache("max",
a(c),e);if(isNaN(e.valueAsNumber))e.valueAsNumber=f[e.type].stepBase||0;if("any"!==e.step&&(c=Math.round(1E7*((e.valueAsNumber-(e.minAsnumber||0))%e.step))/1E7)&&Math.abs(c)!=e.step)e.valueAsNumber-=c;c=e.valueAsNumber+h*d;return c=!isNaN(e.minAsNumber)&&c<e.minAsNumber?e.valueAsNumber*d<e.minAsNumber?e.minAsNumber:isNaN(e.maxAsNumber)?e.valueAsNumber:e.maxAsNumber:!isNaN(e.maxAsNumber)&&c>e.maxAsNumber?e.valueAsNumber*d>e.maxAsNumber?e.maxAsNumber:isNaN(e.minAsNumber)?e.valueAsNumber:e.minAsNumber:
Math.round(1E7*c)/1E7};b.modules["form-number-date-ui"].getNextStep=h;var i=function(b,c,d){if(!b.disabled&&!b.readOnly&&!a(d).hasClass("step-controls")&&(a.prop(b,"value",f[c].numberToString(h(b,a(d).hasClass("step-up")?1:-1,{type:c}))),a(b).unbind("blur.stepeventshim"),e(b,"input"),k.activeElement)){if(k.activeElement!==b)try{b.focus()}catch(i){}setTimeout(function(){if(k.activeElement!==b)try{b.focus()}catch(c){}a(b).one("blur.stepeventshim",function(){e(b,"change")})},0)}};if(d.stepArrows){var g=
{set:function(){var a=b.data(this,"step-controls");if(a)a[this.disabled||this.readonly?"addClass":"removeClass"]("disabled-step-control")}};b.onNodeNamesPropertyModify("input","disabled",g);b.onNodeNamesPropertyModify("input","readonly",a.extend({},g))}var m={38:1,40:-1};b.addReady(function(g,j){d.stepArrows&&a("input",g).add(j.filter("input")).each(function(){var g=a.prop(this,"type");if(f[g]&&f[g].asNumber&&d.stepArrows&&!(!0!==d.stepArrows&&!d.stepArrows[g]||c(g)||a(l).hasClass("has-step-controls"))){var l=
this,j=a('<span class="step-controls" unselectable="on"><span class="step-up" /><span class="step-down" /></span>').insertAfter(l).bind("selectstart dragstart",function(){return!1}).bind("mousedown mousepress",function(a){i(l,g,a.target);return!1}).bind("mousepressstart mousepressend",function(b){a(b.target)["mousepressstart"==b.type?"addClass":"removeClass"]("mousepress-ui")}),n=function(b,c){if(!l.disabled&&!l.readOnly)return a.prop(l,"value",f[g].numberToString(h(l,c,{type:g}))),e(l,"input"),!1},
k=a(l).addClass("has-step-controls").attr({readonly:l.readOnly,disabled:l.disabled,autocomplete:"off",role:"spinbutton"}).bind(a.browser.msie?"keydown":"keypress",function(b){if(!l.disabled&&!l.readOnly&&m[b.keyCode])return a.prop(l,"value",f[g].numberToString(h(l,m[b.keyCode],{type:g}))),e(l,"input"),!1});a.fn.mwheelIntent?k.add(j).bind("mwheelIntent",n):k.bind("focus",function(){k.add(j).unbind(".mwhellwebshims").bind("mousewheel.mwhellwebshims",n)}).bind("blur",function(){a(l).add(j).unbind(".mwhellwebshims")});
b.data(l,"step-controls",j);d.calculateWidth&&(s(k,j),j.css("marginTop",(k.outerHeight()-j.outerHeight())/2))}})})}})();b.addReady(function(c,d){a(k).bind("jquery-uiReady.initinputui input-widgetsReady.initinputui",function(){if(a.datepicker||a.fn.slider){if(a.datepicker&&!p.dateFormat)p.dateFormat=a.datepicker._defaults.dateFormat;h(c,d)}a.datepicker&&a.fn.slider?a(k).unbind(".initinputui"):b.modules["input-widgets"].src||b.warn('jQuery UI Widget factory is already included, but not datepicker or slider. configure src of $.webshims.modules["input-widgets"].src')})})});
