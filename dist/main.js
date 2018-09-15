!function(t){var e={};function s(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=e,s.d=function(t,e,r){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(r,i,function(e){return t[e]}.bind(null,i));return r},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);const r=["","k","M","B","T","q","Q","s","S","O","N","D","Ud","Dd","Td","qd","Qd","sd","Sd","Od","Nd","V","Uv","Dv","Tv","qv","Qv","sv","Sv","Ov","Nv"];function i(t,e){const s=t.toExponential(e).split("e");let[i,o]=s;return o=parseInt(o),i=(t/Math.pow(10,((t,e)=>Math.floor(t/e)*e)(Math.max(0,o),3))).toFixed(e)+(t=>r[Math.floor(t/3)])(Math.max(0,o))}const o=" abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";class n{constructor(){this.events={}}on(t,e){return"object"!=typeof this.events[t]&&(this.events[t]=[]),this.events[t].push(e),()=>this.removeListener(t,e)}removeListener(t,e){if("object"==typeof this.events[t]){const s=this.events[t].indexOf(e);s>-1&&this.events[t].splice(s,1)}}emit(t,...e){"object"==typeof this.events[t]&&this.events[t].forEach(t=>t.apply(this,e))}once(t,e){const s=this.on(t,(...t)=>{s(),e.apply(this,t)})}}class c extends n{constructor(t,e){super(),this.state={type:t,value:e}}get value(){return this.state.value}get type(){return this.state.type}set value(t){this.state.value=t}serialise(){return this.state}deserialise(t){this.state=t}incrementBy(t){this.value+=t,this.emit("CURRENCY_UPDATED",{obj:this,type:this.state.type,value:this.state.value,delta:t})}}class u extends n{constructor(t,e){super(),this.state={type:t,key:e.key,count:e.count||0,maxCount:e.maxCount||Number.MAX_VALUE},this.requirements=e.requirements,this.requirements&&console.log(this.requirements),this.lastProcessed=0,this.engine=e.engine}get type(){return this.state.type}get key(){return this.state.key}get count(){return this.state.count}get maxCount(){return this.state.maxCount}serialise(){return this.state}deserialise(t){this.state=t}incrementBy(t){const e=this.state.count;let s=0;return this.state.count=Math.min(this.state.count+t,this.state.maxCount),this.state.count<0&&(this.state.count=0),0!==(s=this.state.count-e)&&this.emit(this.state.type.toUpperCase()+"_COUNT_UPDATED",{obj:this,key:this.state.key,count:this.state.count,delta:s}),s}requirementsMet(){if(this.requirements)for(const t in this.requirements)for(const e in this.requirements[t])if(this.engine[t]&&this.engine[t][e]&&this.engine[t][e].count<this.requirements[t][e])return!1;return!0}onTick(t){this.canProcess(t)&&(this.processTick(t),this.count>this.maxCount&&(this.count=this.maxCount),this.lastProcessed=t)}processTick(t){this.count+=calculateIncrement(t)}canProcess(t){return this.count>0}}class a extends u{constructor(t){if(super("producer",t),this.state.baseCost=t.baseCost,this.state.costCoefficient=t.costCoefficient||1,this.state.consumedInputs={},this.state.processingEnabled="boolean"!=typeof t.processingEnabled||t.processingEnabled,this.inputs=t.inputs||{},this.outputs=t.outputs||{resources:{},producers:{}},!0===this.state.processingEnabled)for(const t in this.outputs)for(const e in this.outputs[t])this.outputs[t][e].lastProcessed=Date.now();this.postProcessors=t.postProcessors}get baseCost(){return this.state.baseCost}get costCoefficient(){return this.state.costCoefficient}get consumedInputs(){return this.state.consumedInputs}get processingEnabled(){return this.state.processingEnabled}set processingEnabled(t){if("boolean"!=typeof t)throw`Invalid value ${t} passed as value to Producer.processingEnabled`;if(t!==this.state.processingEnabled){this.state.processingEnabled=t;for(const e in this.outputs.resources)this.outputs.resources[e].lastProcessed=t?Date.now():null}}calculateCost(t){let e=null;if(this.state.baseCost){e={currency:this.state.baseCost.currency,price:0};for(let s=0;s<t;s++)e.price+=Math.round(this.state.baseCost.amount*Math.pow(this.state.costCoefficient,this.state.count+s))}return e}addOutput(t,e,s,r){return t+="s",this.outputs[t],this.outputs[t],this.outputs[t][e]=this.outputs[t][e]||{},this.outputs[t][e].productionTime=s,this.outputs[t][e].productionAmount=r,this}getOutput(t,e){let s=null;return this.outputs[t]&&(s=this.outputs[t][e]),s}processTick(t){let e,s,r;const i=this.state.consumedInputs,o=()=>{Object.keys(this.inputs).map(o=>{Object.keys(this.inputs[o]).map(n=>{if(s=this.inputs[o][n],e=s.lastProcessed,r=this.engine[o][n],e){if(!r)throw`Input object not found:\n\tType: ${o}\n\tKey: ${n}`;if(s.consumptionTime>0&&t-e>=s.consumptionTime){let c=Math.min(r.count,this.state.count*s.consumptionAmount*Math.trunc((t-e)/s.consumptionTime));r.incrementBy(-c),c&&(i[o]=i[o]||{},i[o][n]=i[o][n]||{amount:0},i[o][n].amount+=c),s.lastProcessed=t}}else s.lastProcessed=t})})},n=()=>{const i=t=>{if(!t)return!0;for(const e of t){if(!this.state.consumedInputs[e.category]||!this.state.consumedInputs[e.category][e.key])return!1;if(this.state.consumedInputs[e.category][e.key].amount<e.amount)return!1}return!0},o=(t,e)=>{if(!e)return t;for(const s of e){let e=Math.min(t*s.amount,this.state.consumedInputs[s.category][s.key].amount);e>=s.amount&&(t=Math.min(t,e/s.amount))}return t},n=(t,e)=>{if(e)for(const s of e)this.state.consumedInputs[s.category][s.key].amount-=t*s.amount};this.state.count>0&&Object.keys(this.outputs).map(c=>{Object.keys(this.outputs[c]).map(u=>{if(s=this.outputs[c][u],e=s.lastProcessed,r=this.engine[c][u],e){if(!r)throw`Output object not found:\n\tType: ${c}\n\tKey: ${u}`;if(s.productionTime>0&&t-e>=s.productionTime&&i(s.inputRequirements)){let i=Math.trunc((t-e)/s.productionTime),c=o(this.state.count*i,s.inputRequirements);const u=c*s.productionAmount;n(c,s.inputRequirements),0!=r.incrementBy(u)&&this.emit("PRODUCER_OUTPUT",{producer:this,output:r,delta:u}),s.lastProcessed=t}}else s.lastProcessed=t})})},c=()=>{this.postProcessors&&Object.keys(this.postProcessors).forEach(t=>{const e=this.postProcessors[t].stack||null;this.postProcessors[t].func&&this.postProcessors[t].func(this,e)})};this.state.processingEnabled&&(o(),n(),c())}}class h extends u{constructor(t){super("resource",t),this.state.basePrice=t.basePrice,this.calculated=t.calculated}get basePrice(){return this.state.basePrice}calculatePrice(t){return this.state.basePrice?(t=t||this.state.count,{currency:this.state.basePrice.currency,amount:t*this.state.basePrice.amount}):null}processTick(t){if(this.calculated&&"object"==typeof this.calculated){let t;const e=this.calculated.source;switch(e.type){case"resource":t=this.engine.resources[e.key];break;case"producer":t=this.engine.producers[e.key]}t&&(this.state.count=this.calculated.calcFunc(t))}}}class p{constructor(t){this.state={key:t.key},this.apply=t.applyFunc,this.remove=t.removeFunc}}class d extends n{constructor(t){super(),this.state={key:t.key,entityType:t.entityType,entityKey:t.entityKey,basePrice:t.basePrice,count:t.count||0,maxCount:t.maxCount||Number.MAX_VALUE},this.engine=t.engine;const e=this.engine[t.entityType](t.entityKey);e&&t.eventHandlers&&t.eventHandlers.forEach(t=>{e.on(t.event,t.handler.bind(this))})}get key(){return this.state.key}get entityType(){return this.state.entityType}get entityKey(){return this.state.entityKey}get basePrice(){return this.state.basePrice}get count(){return this.state.count}get entity(){if(!this.state.entityType||!this.state.entityKey)throw`Invalid entity configuration in Reactor ${this.state.key}`;return this.engine[this.state.entityType+"s"][this.state.entityKey]}purchase(){if(!this.basePrice)return!1;const t=this.engine.currency(this.basePrice.currency);let e=!1;return t.value>=this.basePrice.amount&&(this.state.count+=1,t.incrementBy(-this.basePrice.amount),e=!0,this.emit("REACTOR_PURCHASED",this)),e}}const l={scientific:function(t,e){return t.toExponential(e)},dictionary:i,abstract:function(t,e){const s=t.toExponential(e).split("e");let[r,i]=s;return i=parseInt(i),r=(t/Math.pow(10,((t,e)=>Math.floor(t/e)*e)(Math.max(0,i),3))).toFixed(e)+(t=>o[Math.floor(t/3)])(Math.max(0,i))}};new class{constructor(){this.lastTick=0,this.lastSave=0,this.currencies={},this.producers={},this.resources={},this.modifiers={},this.reactors={},this.activeModifiers=[],this.numberFormatter=i,this.autosavePeriod=0,console.log("%c %c Continuum Engine ready","font-size: 12px;background: blue; color: white","font-size: 12px; background: white; color: black;")}createCurrency(t,e){if(!t)throw`Invalid currency type value provided ${t}`;return this.currencies[t]||(this.currencies[t]=new c(t,e)),this.currencies[t]}currency(t){return this.currencies[t]}createProducer(t){if(!t)throw"No producer options provided";if(!t.key)throw`Invalid producer .key value provided ${t.type}`;return this.producers[t.key]||(t.engine=this,this.producers[t.key]=new a(t)),this.producers[t.key]}destroyProducer(t){this.producers[t]&&delete this.producers[t]}producer(t){return this.producers[t]}createResource(t){if(!t)throw"No resource options provided";if(!t.key)throw`Invalid resource .key value provided ${t.key}`;return this.resources[t.key]||(t.engine=this,this.resources[t.key]=new h(t)),this.resources[t.key]}resource(t){return this.resources[t]}createModifier(t){if(!t)throw"No modifier options provided";if(!t.key)throw`Invalid modifier .key value provided ${t.key}`;return this.modifiers[t.key]||(t.engine=this,this.modifiers[t.key]=new p(t)),this.modifiers[t.key]}modifier(t){return this.modifiers[t]}createReactor(t){if(!t)throw"No reactor options provided";if(!t.key)throw`Invalid reactor .key value provided ${t.key}`;return this.reactors[t.key]||(t.engine=this,this.reactors[t.key]=new d(t)),this.reactors[t.key]}reactor(t){return this.reactors[t]}activateModifier(t,e){if(this.modifiers[t]){if(!this.modifiers[t].applyFunc)return;const s={key:t,expiresAt:e.timeLeft?Date.now()+e.timeLeft:null};for(const e in this.producers)this.modifiers[t].apply("producer",this.producers[e]);for(const e in this.resources)this.modifiers[t].apply("resource",this.resources[e]);this.activeModifiers.push(s)}else console.error(`Modifier ${t} not found and cannot be activated`)}onTick(t){this.lastTick?t-this.lastTick>50&&(this.processProducers(t),this.processResources(t),this.processModifiers(t),this.lastTick=t):this.lastTick=t,this.autoSave(t)}autoSave(t){this.autosavePeriod&&(this.lastSave?t-this.lastSave>this.autosavePeriod&&(this.saveState(),this.lastSave=t):this.lastSave=t)}saveState(){const t=t=>{const e={};for(const s in t)e[s]=t[s].serialise();return e},e={lastTick:0,lastSave:0,currencies:t(this.currencies),producers:t(this.producers),resources:t(this.resources),reactors:t(this.reactors),numberFormatter:this.numberFormatter,autosavePeriod:this.autosavePeriod};window.localStorage.setItem("state",JSON.stringify(e))}loadState(){let t=window.localStorage.getItem("state");if(t)try{t=JSON.parse(t);for(const e in t)switch(e){case"currencies":for(const s in t[e])this.currencies[s].deserialise(t[e][s]);break;case"resources":for(const s in t[e])this.resources[s].deserialise(t[e][s]);break;case"producers":for(const s in t[e])this.producers[s].deserialise(t[e][s]);break;default:this[e]=t[e]}}catch(t){throw t}}processProducers(t){let e;for(const s in this.producers)(e=this.producers[s]).onTick(t)}processResources(t){let e;for(const s in this.resources)(e=this.resources[s]).onTick(t)}processModifiers(t){let e;for(let t=this.activeModifiers.length-1;t>=0;t--)if((e=this.activeModifiers[t]).expiresAt<Date.now()){for(const t in this.producers)this.modifiers[e.key].remove("producer",this.producers[t]);for(const t in this.resources)this.modifiers[e.key].remove("resource",this.resources[t]);this.activeModifiers.splice(t,1)}}setNumberFormatter(t){if("string"==typeof t){if(!l[t])throw`Unknown number formatter (${t}) requested`;this.numberFormatter=l[t]}else{if("function"!=typeof t)throw"Unknown number type provided";this.numberFormatter=t}}formatNumber(t,e=2){return this.numberFormatter(t,e)}};console.log("Continuum Studio yeah!")}]);