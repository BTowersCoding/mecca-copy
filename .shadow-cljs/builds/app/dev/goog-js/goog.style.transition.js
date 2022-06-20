["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/style/transition.js"],"~:js","goog.provide(\"goog.style.transition\");\ngoog.provide(\"goog.style.transition.Css3Property\");\ngoog.require(\"goog.array\");\ngoog.require(\"goog.asserts\");\ngoog.require(\"goog.dom\");\ngoog.require(\"goog.dom.TagName\");\ngoog.require(\"goog.dom.safe\");\ngoog.require(\"goog.dom.vendor\");\ngoog.require(\"goog.functions\");\ngoog.require(\"goog.html.SafeHtml\");\ngoog.require(\"goog.style\");\ngoog.require(\"goog.userAgent\");\n/** @typedef {({property:string,duration:number,timing:string,delay:number}|string)} */ goog.style.transition.Css3Property;\n/**\n * @param {Element} element\n * @param {(goog.style.transition.Css3Property|Array<goog.style.transition.Css3Property>)} properties\n * @suppress {strictMissingProperties}\n */\ngoog.style.transition.set = function(element, properties) {\n  if (!goog.isArray(properties)) {\n    properties = [properties];\n  }\n  goog.asserts.assert(properties.length > 0, \"At least one Css3Property should be specified.\");\n  var values = goog.array.map(properties, function(p) {\n    if (typeof p === \"string\") {\n      return p;\n    } else {\n      goog.asserts.assertObject(p, \"Expected css3 property to be an object.\");\n      var propString = p.property + \" \" + p.duration + \"s \" + p.timing + \" \" + p.delay + \"s\";\n      goog.asserts.assert(p.property && typeof p.duration === \"number\" && p.timing && typeof p.delay === \"number\", \"Unexpected css3 property value: %s\", propString);\n      return propString;\n    }\n  });\n  goog.style.transition.setPropertyValue_(element, values.join(\",\"));\n};\n/**\n * @param {Element} element\n */\ngoog.style.transition.removeAll = function(element) {\n  goog.style.transition.setPropertyValue_(element, \"\");\n};\n/**\n * @return {boolean}\n */\ngoog.style.transition.isSupported = goog.functions.cacheReturnValue(function() {\n  if (goog.userAgent.IE) {\n    return goog.userAgent.isVersionOrHigher(\"10.0\");\n  }\n  var el = goog.dom.createElement(goog.dom.TagName.DIV);\n  var transition = \"opacity 1s linear\";\n  var vendorPrefix = goog.dom.vendor.getVendorPrefix();\n  var style = {\"transition\":transition};\n  if (vendorPrefix) {\n    style[vendorPrefix + \"-transition\"] = transition;\n  }\n  goog.dom.safe.setInnerHtml(el, goog.html.SafeHtml.create(\"div\", {\"style\":style}));\n  var testElement = /** @type {Element} */ (el.firstChild);\n  goog.asserts.assert(testElement.nodeType == Node.ELEMENT_NODE);\n  return goog.style.getStyle(testElement, \"transition\") != \"\";\n});\n/**\n * @private\n * @param {Element} element\n * @param {string} transitionValue\n */\ngoog.style.transition.setPropertyValue_ = function(element, transitionValue) {\n  goog.style.setStyle(element, \"transition\", transitionValue);\n};\n","~:source","// Copyright 2011 The Closure Library Authors. All Rights Reserved.\n//\n// Licensed under the Apache License, Version 2.0 (the \"License\");\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n//      http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an \"AS-IS\" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n/**\n * @fileoverview Utility methods to deal with CSS3 transitions\n * programmatically.\n * @author chrishenry@google.com (Chris Henry)\n */\n\ngoog.provide('goog.style.transition');\ngoog.provide('goog.style.transition.Css3Property');\n\ngoog.require('goog.array');\ngoog.require('goog.asserts');\ngoog.require('goog.dom');\ngoog.require('goog.dom.TagName');\ngoog.require('goog.dom.safe');\ngoog.require('goog.dom.vendor');\ngoog.require('goog.functions');\ngoog.require('goog.html.SafeHtml');\ngoog.require('goog.style');\ngoog.require('goog.userAgent');\n\n\n/**\n * A typedef to represent a CSS3 transition property. Duration and delay\n * are both in seconds. Timing is CSS3 timing function string, such as\n * 'easein', 'linear'.\n *\n * Alternatively, specifying string in the form of '[property] [duration]\n * [timing] [delay]' as specified in CSS3 transition is fine too.\n *\n * @typedef { {\n *   property: string,\n *   duration: number,\n *   timing: string,\n *   delay: number\n * } | string }\n */\ngoog.style.transition.Css3Property;\n\n\n/**\n * Sets the element CSS3 transition to properties.\n * @param {Element} element The element to set transition on.\n * @param {goog.style.transition.Css3Property|\n *     Array<goog.style.transition.Css3Property>} properties A single CSS3\n *     transition property or array of properties.\n * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration\n */\ngoog.style.transition.set = function(element, properties) {\n  if (!goog.isArray(properties)) {\n    properties = [properties];\n  }\n  goog.asserts.assert(\n      properties.length > 0, 'At least one Css3Property should be specified.');\n\n  var values = goog.array.map(properties, function(p) {\n    if (typeof p === 'string') {\n      return p;\n    } else {\n      goog.asserts.assertObject(p, 'Expected css3 property to be an object.');\n      var propString =\n          p.property + ' ' + p.duration + 's ' + p.timing + ' ' + p.delay + 's';\n      goog.asserts.assert(\n          p.property && typeof p.duration === 'number' && p.timing &&\n              typeof p.delay === 'number',\n          'Unexpected css3 property value: %s', propString);\n      return propString;\n    }\n  });\n  goog.style.transition.setPropertyValue_(element, values.join(','));\n};\n\n\n/**\n * Removes any programmatically-added CSS3 transition in the given element.\n * @param {Element} element The element to remove transition from.\n */\ngoog.style.transition.removeAll = function(element) {\n  goog.style.transition.setPropertyValue_(element, '');\n};\n\n\n/**\n * @return {boolean} Whether CSS3 transition is supported.\n */\ngoog.style.transition.isSupported = goog.functions.cacheReturnValue(function() {\n  // Since IE would allow any attribute, we need to explicitly check the\n  // browser version here instead.\n  if (goog.userAgent.IE) {\n    return goog.userAgent.isVersionOrHigher('10.0');\n  }\n\n  // We create a test element with style=-vendor-transition\n  // We then detect whether those style properties are recognized and\n  // available from js.\n  var el = goog.dom.createElement(goog.dom.TagName.DIV);\n  var transition = 'opacity 1s linear';\n  var vendorPrefix = goog.dom.vendor.getVendorPrefix();\n  var style = {'transition': transition};\n  if (vendorPrefix) {\n    style[vendorPrefix + '-transition'] = transition;\n  }\n  goog.dom.safe.setInnerHtml(\n      el, goog.html.SafeHtml.create('div', {'style': style}));\n\n  var testElement = /** @type {Element} */ (el.firstChild);\n  goog.asserts.assert(testElement.nodeType == Node.ELEMENT_NODE);\n\n  return goog.style.getStyle(testElement, 'transition') != '';\n});\n\n\n/**\n * Sets CSS3 transition property value to the given value.\n * @param {Element} element The element to set transition on.\n * @param {string} transitionValue The CSS3 transition property value.\n * @private\n */\ngoog.style.transition.setPropertyValue_ = function(element, transitionValue) {\n  goog.style.setStyle(element, 'transition', transitionValue);\n};\n","~:compiled-at",1651803658046,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.style.transition.js\",\n\"lineCount\":69,\n\"mappings\":\"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\",\n\"sources\":[\"goog/style/transition.js\"],\n\"sourcesContent\":[\"// Copyright 2011 The Closure Library Authors. All Rights Reserved.\\n//\\n// Licensed under the Apache License, Version 2.0 (the \\\"License\\\");\\n// you may not use this file except in compliance with the License.\\n// You may obtain a copy of the License at\\n//\\n//      http://www.apache.org/licenses/LICENSE-2.0\\n//\\n// Unless required by applicable law or agreed to in writing, software\\n// distributed under the License is distributed on an \\\"AS-IS\\\" BASIS,\\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\\n// See the License for the specific language governing permissions and\\n// limitations under the License.\\n\\n/**\\n * @fileoverview Utility methods to deal with CSS3 transitions\\n * programmatically.\\n * @author chrishenry@google.com (Chris Henry)\\n */\\n\\ngoog.provide('goog.style.transition');\\ngoog.provide('goog.style.transition.Css3Property');\\n\\ngoog.require('goog.array');\\ngoog.require('goog.asserts');\\ngoog.require('goog.dom');\\ngoog.require('goog.dom.TagName');\\ngoog.require('goog.dom.safe');\\ngoog.require('goog.dom.vendor');\\ngoog.require('goog.functions');\\ngoog.require('goog.html.SafeHtml');\\ngoog.require('goog.style');\\ngoog.require('goog.userAgent');\\n\\n\\n/**\\n * A typedef to represent a CSS3 transition property. Duration and delay\\n * are both in seconds. Timing is CSS3 timing function string, such as\\n * 'easein', 'linear'.\\n *\\n * Alternatively, specifying string in the form of '[property] [duration]\\n * [timing] [delay]' as specified in CSS3 transition is fine too.\\n *\\n * @typedef { {\\n *   property: string,\\n *   duration: number,\\n *   timing: string,\\n *   delay: number\\n * } | string }\\n */\\ngoog.style.transition.Css3Property;\\n\\n\\n/**\\n * Sets the element CSS3 transition to properties.\\n * @param {Element} element The element to set transition on.\\n * @param {goog.style.transition.Css3Property|\\n *     Array<goog.style.transition.Css3Property>} properties A single CSS3\\n *     transition property or array of properties.\\n * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration\\n */\\ngoog.style.transition.set = function(element, properties) {\\n  if (!goog.isArray(properties)) {\\n    properties = [properties];\\n  }\\n  goog.asserts.assert(\\n      properties.length > 0, 'At least one Css3Property should be specified.');\\n\\n  var values = goog.array.map(properties, function(p) {\\n    if (typeof p === 'string') {\\n      return p;\\n    } else {\\n      goog.asserts.assertObject(p, 'Expected css3 property to be an object.');\\n      var propString =\\n          p.property + ' ' + p.duration + 's ' + p.timing + ' ' + p.delay + 's';\\n      goog.asserts.assert(\\n          p.property && typeof p.duration === 'number' && p.timing &&\\n              typeof p.delay === 'number',\\n          'Unexpected css3 property value: %s', propString);\\n      return propString;\\n    }\\n  });\\n  goog.style.transition.setPropertyValue_(element, values.join(','));\\n};\\n\\n\\n/**\\n * Removes any programmatically-added CSS3 transition in the given element.\\n * @param {Element} element The element to remove transition from.\\n */\\ngoog.style.transition.removeAll = function(element) {\\n  goog.style.transition.setPropertyValue_(element, '');\\n};\\n\\n\\n/**\\n * @return {boolean} Whether CSS3 transition is supported.\\n */\\ngoog.style.transition.isSupported = goog.functions.cacheReturnValue(function() {\\n  // Since IE would allow any attribute, we need to explicitly check the\\n  // browser version here instead.\\n  if (goog.userAgent.IE) {\\n    return goog.userAgent.isVersionOrHigher('10.0');\\n  }\\n\\n  // We create a test element with style=-vendor-transition\\n  // We then detect whether those style properties are recognized and\\n  // available from js.\\n  var el = goog.dom.createElement(goog.dom.TagName.DIV);\\n  var transition = 'opacity 1s linear';\\n  var vendorPrefix = goog.dom.vendor.getVendorPrefix();\\n  var style = {'transition': transition};\\n  if (vendorPrefix) {\\n    style[vendorPrefix + '-transition'] = transition;\\n  }\\n  goog.dom.safe.setInnerHtml(\\n      el, goog.html.SafeHtml.create('div', {'style': style}));\\n\\n  var testElement = /** @type {Element} */ (el.firstChild);\\n  goog.asserts.assert(testElement.nodeType == Node.ELEMENT_NODE);\\n\\n  return goog.style.getStyle(testElement, 'transition') != '';\\n});\\n\\n\\n/**\\n * Sets CSS3 transition property value to the given value.\\n * @param {Element} element The element to set transition on.\\n * @param {string} transitionValue The CSS3 transition property value.\\n * @private\\n */\\ngoog.style.transition.setPropertyValue_ = function(element, transitionValue) {\\n  goog.style.setStyle(element, 'transition', transitionValue);\\n};\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"style\",\"transition\",\"Css3Property\",\"set\",\"goog.style.transition.set\",\"element\",\"properties\",\"isArray\",\"asserts\",\"assert\",\"length\",\"values\",\"array\",\"map\",\"p\",\"assertObject\",\"propString\",\"property\",\"duration\",\"timing\",\"delay\",\"setPropertyValue_\",\"join\",\"removeAll\",\"goog.style.transition.removeAll\",\"isSupported\",\"functions\",\"cacheReturnValue\",\"userAgent\",\"IE\",\"isVersionOrHigher\",\"el\",\"dom\",\"createElement\",\"TagName\",\"DIV\",\"vendorPrefix\",\"vendor\",\"getVendorPrefix\",\"safe\",\"setInnerHtml\",\"html\",\"SafeHtml\",\"create\",\"testElement\",\"firstChild\",\"nodeType\",\"Node\",\"ELEMENT_NODE\",\"getStyle\",\"goog.style.transition.setPropertyValue_\",\"transitionValue\",\"setStyle\"]\n}\n"]