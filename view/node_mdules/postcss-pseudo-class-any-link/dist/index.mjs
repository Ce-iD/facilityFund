import e from"postcss-selector-parser";function s(s){if(!s||!s.nodes)return;let n=[];const o=[...s.nodes];for(let s=0;s<o.length+1;s++){const l=o[s];if(l&&"combinator"!==l.type)n.push(l);else{if(n.length>1){const s=e.selector({value:""});n[0].replaceWith(s),n.slice(1).forEach((e=>{e.remove()})),n.forEach((e=>{s.append(e)})),t(s),s.replaceWith(...s.nodes)}n=[]}}}function t(e){e&&e.nodes&&e.nodes.sort(((e,s)=>"selector"===e.type&&"selector"===s.type&&e.nodes.length&&s.nodes.length?n(e.nodes[0].value,e.nodes[0].type)-n(s.nodes[0].value,s.nodes[0].type):"selector"===e.type&&e.nodes.length?n(e.nodes[0].value,e.nodes[0].type)-n(s.value,s.type):"selector"===s.type&&s.nodes.length?n(e.value,e.type)-n(s.nodes[0].value,s.nodes[0].type):n(e.value,e.type)-n(s.value,s.type)))}function n(e,s){return"pseudo"===s&&e&&0===e.indexOf("::")?o.pseudoElement:o[s]}const o={universal:0,tag:1,id:2,class:3,attribute:4,selector:5,pseudo:6,pseudoElement:7,string:8,root:9,comment:10},l=e().astSync(":link").nodes[0],r=e().astSync(":visited").nodes[0],c=e().astSync("area[href]").nodes[0];function a(t,n){let o=[];return e((e=>{let t=0;if(e.walkPseudos((e=>{":any-link"!==e.value||e.nodes&&e.nodes.length||t++})),!t)return;let a=[];for(let e=0;e<t;e++)n?a.push([l.clone(),r.clone(),c.clone()]):a.push([l.clone(),r.clone()]);(function(...e){const s=[],t=e.length-1;function n(o,l){for(let r=0,c=e[l].length;r<c;r++){const c=o.slice(0);c.push(e[l][r]),l==t?s.push(c):n(c,l+1)}}return n([],0),s})(...a).forEach((t=>{const n=e.clone();n.walkPseudos((e=>{":any-link"!==e.value||e.nodes&&e.nodes.length||e.replaceWith(...t.shift().nodes)})),n.walk((e=>{"nodes"in e&&(e.nodes.forEach((e=>{s(e)})),s(e))})),o.push(n.toString())}))})).processSync(t),o}const u=/:any-link/;function d(e){const s={preserve:!0,...e},t={areaHrefNeedsFixing:!1,...Object(s.subFeatures)};return{postcssPlugin:"postcss-pseudo-class-any-link",Rule(e,{result:n}){if(!u.test(e.selector))return;const o=e.raws.selector&&e.raws.selector.raw||e.selector;":"!==o[o.length-1]&&function(e,s,t,n){let o=[],l=[];try{for(let s=0;s<e.selectors.length;s++){const t=e.selectors[s],r=a(t,n);r.length?o.push(...r):l.push(t)}}catch(t){return void e.warn(s,`Failed to parse selector : ${e.selector}`)}o.length&&(e.cloneBefore({selectors:o}),t?l.length&&e.cloneBefore({selectors:l}):l.length?e.selectors=l:e.remove())}(e,n,s.preserve,t.areaHrefNeedsFixing)}}}d.postcss=!0;export{d as default};