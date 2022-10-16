["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/labs/useragent/engine.js"],"~:js","goog.provide(\"goog.labs.userAgent.engine\");\ngoog.require(\"goog.array\");\ngoog.require(\"goog.labs.userAgent.util\");\ngoog.require(\"goog.string\");\n/**\n * @return {boolean}\n */\ngoog.labs.userAgent.engine.isPresto = function() {\n  return goog.labs.userAgent.util.matchUserAgent(\"Presto\");\n};\n/**\n * @return {boolean}\n */\ngoog.labs.userAgent.engine.isTrident = function() {\n  return goog.labs.userAgent.util.matchUserAgent(\"Trident\") || goog.labs.userAgent.util.matchUserAgent(\"MSIE\");\n};\n/**\n * @return {boolean}\n */\ngoog.labs.userAgent.engine.isEdge = function() {\n  return goog.labs.userAgent.util.matchUserAgent(\"Edge\");\n};\n/**\n * @return {boolean}\n */\ngoog.labs.userAgent.engine.isWebKit = function() {\n  return goog.labs.userAgent.util.matchUserAgentIgnoreCase(\"WebKit\") && !goog.labs.userAgent.engine.isEdge();\n};\n/**\n * @return {boolean}\n */\ngoog.labs.userAgent.engine.isGecko = function() {\n  return goog.labs.userAgent.util.matchUserAgent(\"Gecko\") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge();\n};\n/**\n * @return {string}\n */\ngoog.labs.userAgent.engine.getVersion = function() {\n  var userAgentString = goog.labs.userAgent.util.getUserAgent();\n  if (userAgentString) {\n    var tuples = goog.labs.userAgent.util.extractVersionTuples(userAgentString);\n    var engineTuple = goog.labs.userAgent.engine.getEngineTuple_(tuples);\n    if (engineTuple) {\n      if (engineTuple[0] == \"Gecko\") {\n        return goog.labs.userAgent.engine.getVersionForKey_(tuples, \"Firefox\");\n      }\n      return engineTuple[1];\n    }\n    var browserTuple = tuples[0];\n    var info;\n    if (browserTuple && (info = browserTuple[2])) {\n      var match = /Trident\\/([^\\s;]+)/.exec(info);\n      if (match) {\n        return match[1];\n      }\n    }\n  }\n  return \"\";\n};\n/**\n * @private\n * @param {!Array<!Array<string>>} tuples\n * @return {(!Array<string>|undefined)}\n */\ngoog.labs.userAgent.engine.getEngineTuple_ = function(tuples) {\n  if (!goog.labs.userAgent.engine.isEdge()) {\n    return tuples[1];\n  }\n  for (var i = 0; i < tuples.length; i++) {\n    var tuple = tuples[i];\n    if (tuple[0] == \"Edge\") {\n      return tuple;\n    }\n  }\n};\n/**\n * @param {(string|number)} version\n * @return {boolean}\n */\ngoog.labs.userAgent.engine.isVersionOrHigher = function(version) {\n  return goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), version) >= 0;\n};\n/**\n * @private\n * @param {!Array<!Array<string>>} tuples\n * @param {string} key\n * @return {string}\n */\ngoog.labs.userAgent.engine.getVersionForKey_ = function(tuples, key) {\n  var pair = goog.array.find(tuples, function(pair) {\n    return key == pair[0];\n  });\n  return pair && pair[1] || \"\";\n};\n","~:source","// Copyright 2013 The Closure Library Authors. All Rights Reserved.\n//\n// Licensed under the Apache License, Version 2.0 (the \"License\");\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n//      http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an \"AS-IS\" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n/**\n * @fileoverview Closure user agent detection.\n * @see http://en.wikipedia.org/wiki/User_agent\n * For more information on browser brand, platform, or device see the other\n * sub-namespaces in goog.labs.userAgent (browser, platform, and device).\n *\n */\n\ngoog.provide('goog.labs.userAgent.engine');\n\ngoog.require('goog.array');\ngoog.require('goog.labs.userAgent.util');\ngoog.require('goog.string');\n\n\n/**\n * @return {boolean} Whether the rendering engine is Presto.\n */\ngoog.labs.userAgent.engine.isPresto = function() {\n  return goog.labs.userAgent.util.matchUserAgent('Presto');\n};\n\n\n/**\n * @return {boolean} Whether the rendering engine is Trident.\n */\ngoog.labs.userAgent.engine.isTrident = function() {\n  // IE only started including the Trident token in IE8.\n  return goog.labs.userAgent.util.matchUserAgent('Trident') ||\n      goog.labs.userAgent.util.matchUserAgent('MSIE');\n};\n\n\n/**\n * @return {boolean} Whether the rendering engine is EdgeHTML.\n */\ngoog.labs.userAgent.engine.isEdge = function() {\n  return goog.labs.userAgent.util.matchUserAgent('Edge');\n};\n\n\n/**\n * @return {boolean} Whether the rendering engine is WebKit. This will return\n * true for Chrome, Blink-based Opera (15+), Edge Chromium and Safari.\n */\ngoog.labs.userAgent.engine.isWebKit = function() {\n  return goog.labs.userAgent.util.matchUserAgentIgnoreCase('WebKit') &&\n      !goog.labs.userAgent.engine.isEdge();\n};\n\n\n/**\n * @return {boolean} Whether the rendering engine is Gecko.\n */\ngoog.labs.userAgent.engine.isGecko = function() {\n  return goog.labs.userAgent.util.matchUserAgent('Gecko') &&\n      !goog.labs.userAgent.engine.isWebKit() &&\n      !goog.labs.userAgent.engine.isTrident() &&\n      !goog.labs.userAgent.engine.isEdge();\n};\n\n\n/**\n * @return {string} The rendering engine's version or empty string if version\n *     can't be determined.\n */\ngoog.labs.userAgent.engine.getVersion = function() {\n  var userAgentString = goog.labs.userAgent.util.getUserAgent();\n  if (userAgentString) {\n    var tuples = goog.labs.userAgent.util.extractVersionTuples(userAgentString);\n\n    var engineTuple = goog.labs.userAgent.engine.getEngineTuple_(tuples);\n    if (engineTuple) {\n      // In Gecko, the version string is either in the browser info or the\n      // Firefox version.  See Gecko user agent string reference:\n      // http://goo.gl/mULqa\n      if (engineTuple[0] == 'Gecko') {\n        return goog.labs.userAgent.engine.getVersionForKey_(tuples, 'Firefox');\n      }\n\n      return engineTuple[1];\n    }\n\n    // MSIE has only one version identifier, and the Trident version is\n    // specified in the parenthetical. IE Edge is covered in the engine tuple\n    // detection.\n    var browserTuple = tuples[0];\n    var info;\n    if (browserTuple && (info = browserTuple[2])) {\n      var match = /Trident\\/([^\\s;]+)/.exec(info);\n      if (match) {\n        return match[1];\n      }\n    }\n  }\n  return '';\n};\n\n\n/**\n * @param {!Array<!Array<string>>} tuples Extracted version tuples.\n * @return {!Array<string>|undefined} The engine tuple or undefined if not\n *     found.\n * @private\n */\ngoog.labs.userAgent.engine.getEngineTuple_ = function(tuples) {\n  if (!goog.labs.userAgent.engine.isEdge()) {\n    return tuples[1];\n  }\n  for (var i = 0; i < tuples.length; i++) {\n    var tuple = tuples[i];\n    if (tuple[0] == 'Edge') {\n      return tuple;\n    }\n  }\n};\n\n\n/**\n * @param {string|number} version The version to check.\n * @return {boolean} Whether the rendering engine version is higher or the same\n *     as the given version.\n */\ngoog.labs.userAgent.engine.isVersionOrHigher = function(version) {\n  return goog.string.compareVersions(\n             goog.labs.userAgent.engine.getVersion(), version) >= 0;\n};\n\n\n/**\n * @param {!Array<!Array<string>>} tuples Version tuples.\n * @param {string} key The key to look for.\n * @return {string} The version string of the given key, if present.\n *     Otherwise, the empty string.\n * @private\n */\ngoog.labs.userAgent.engine.getVersionForKey_ = function(tuples, key) {\n  // TODO(nnaze): Move to util if useful elsewhere.\n\n  var pair = goog.array.find(tuples, function(pair) { return key == pair[0]; });\n\n  return pair && pair[1] || '';\n};\n","~:compiled-at",1665954032143,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.labs.useragent.engine.js\",\n\"lineCount\":95,\n\"mappings\":\"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\",\n\"sources\":[\"goog/labs/useragent/engine.js\"],\n\"sourcesContent\":[\"// Copyright 2013 The Closure Library Authors. All Rights Reserved.\\n//\\n// Licensed under the Apache License, Version 2.0 (the \\\"License\\\");\\n// you may not use this file except in compliance with the License.\\n// You may obtain a copy of the License at\\n//\\n//      http://www.apache.org/licenses/LICENSE-2.0\\n//\\n// Unless required by applicable law or agreed to in writing, software\\n// distributed under the License is distributed on an \\\"AS-IS\\\" BASIS,\\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\\n// See the License for the specific language governing permissions and\\n// limitations under the License.\\n\\n/**\\n * @fileoverview Closure user agent detection.\\n * @see http://en.wikipedia.org/wiki/User_agent\\n * For more information on browser brand, platform, or device see the other\\n * sub-namespaces in goog.labs.userAgent (browser, platform, and device).\\n *\\n */\\n\\ngoog.provide('goog.labs.userAgent.engine');\\n\\ngoog.require('goog.array');\\ngoog.require('goog.labs.userAgent.util');\\ngoog.require('goog.string');\\n\\n\\n/**\\n * @return {boolean} Whether the rendering engine is Presto.\\n */\\ngoog.labs.userAgent.engine.isPresto = function() {\\n  return goog.labs.userAgent.util.matchUserAgent('Presto');\\n};\\n\\n\\n/**\\n * @return {boolean} Whether the rendering engine is Trident.\\n */\\ngoog.labs.userAgent.engine.isTrident = function() {\\n  // IE only started including the Trident token in IE8.\\n  return goog.labs.userAgent.util.matchUserAgent('Trident') ||\\n      goog.labs.userAgent.util.matchUserAgent('MSIE');\\n};\\n\\n\\n/**\\n * @return {boolean} Whether the rendering engine is EdgeHTML.\\n */\\ngoog.labs.userAgent.engine.isEdge = function() {\\n  return goog.labs.userAgent.util.matchUserAgent('Edge');\\n};\\n\\n\\n/**\\n * @return {boolean} Whether the rendering engine is WebKit. This will return\\n * true for Chrome, Blink-based Opera (15+), Edge Chromium and Safari.\\n */\\ngoog.labs.userAgent.engine.isWebKit = function() {\\n  return goog.labs.userAgent.util.matchUserAgentIgnoreCase('WebKit') &&\\n      !goog.labs.userAgent.engine.isEdge();\\n};\\n\\n\\n/**\\n * @return {boolean} Whether the rendering engine is Gecko.\\n */\\ngoog.labs.userAgent.engine.isGecko = function() {\\n  return goog.labs.userAgent.util.matchUserAgent('Gecko') &&\\n      !goog.labs.userAgent.engine.isWebKit() &&\\n      !goog.labs.userAgent.engine.isTrident() &&\\n      !goog.labs.userAgent.engine.isEdge();\\n};\\n\\n\\n/**\\n * @return {string} The rendering engine's version or empty string if version\\n *     can't be determined.\\n */\\ngoog.labs.userAgent.engine.getVersion = function() {\\n  var userAgentString = goog.labs.userAgent.util.getUserAgent();\\n  if (userAgentString) {\\n    var tuples = goog.labs.userAgent.util.extractVersionTuples(userAgentString);\\n\\n    var engineTuple = goog.labs.userAgent.engine.getEngineTuple_(tuples);\\n    if (engineTuple) {\\n      // In Gecko, the version string is either in the browser info or the\\n      // Firefox version.  See Gecko user agent string reference:\\n      // http://goo.gl/mULqa\\n      if (engineTuple[0] == 'Gecko') {\\n        return goog.labs.userAgent.engine.getVersionForKey_(tuples, 'Firefox');\\n      }\\n\\n      return engineTuple[1];\\n    }\\n\\n    // MSIE has only one version identifier, and the Trident version is\\n    // specified in the parenthetical. IE Edge is covered in the engine tuple\\n    // detection.\\n    var browserTuple = tuples[0];\\n    var info;\\n    if (browserTuple && (info = browserTuple[2])) {\\n      var match = /Trident\\\\/([^\\\\s;]+)/.exec(info);\\n      if (match) {\\n        return match[1];\\n      }\\n    }\\n  }\\n  return '';\\n};\\n\\n\\n/**\\n * @param {!Array<!Array<string>>} tuples Extracted version tuples.\\n * @return {!Array<string>|undefined} The engine tuple or undefined if not\\n *     found.\\n * @private\\n */\\ngoog.labs.userAgent.engine.getEngineTuple_ = function(tuples) {\\n  if (!goog.labs.userAgent.engine.isEdge()) {\\n    return tuples[1];\\n  }\\n  for (var i = 0; i < tuples.length; i++) {\\n    var tuple = tuples[i];\\n    if (tuple[0] == 'Edge') {\\n      return tuple;\\n    }\\n  }\\n};\\n\\n\\n/**\\n * @param {string|number} version The version to check.\\n * @return {boolean} Whether the rendering engine version is higher or the same\\n *     as the given version.\\n */\\ngoog.labs.userAgent.engine.isVersionOrHigher = function(version) {\\n  return goog.string.compareVersions(\\n             goog.labs.userAgent.engine.getVersion(), version) >= 0;\\n};\\n\\n\\n/**\\n * @param {!Array<!Array<string>>} tuples Version tuples.\\n * @param {string} key The key to look for.\\n * @return {string} The version string of the given key, if present.\\n *     Otherwise, the empty string.\\n * @private\\n */\\ngoog.labs.userAgent.engine.getVersionForKey_ = function(tuples, key) {\\n  // TODO(nnaze): Move to util if useful elsewhere.\\n\\n  var pair = goog.array.find(tuples, function(pair) { return key == pair[0]; });\\n\\n  return pair && pair[1] || '';\\n};\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"labs\",\"userAgent\",\"engine\",\"isPresto\",\"goog.labs.userAgent.engine.isPresto\",\"util\",\"matchUserAgent\",\"isTrident\",\"goog.labs.userAgent.engine.isTrident\",\"isEdge\",\"goog.labs.userAgent.engine.isEdge\",\"isWebKit\",\"goog.labs.userAgent.engine.isWebKit\",\"matchUserAgentIgnoreCase\",\"isGecko\",\"goog.labs.userAgent.engine.isGecko\",\"getVersion\",\"goog.labs.userAgent.engine.getVersion\",\"userAgentString\",\"getUserAgent\",\"tuples\",\"extractVersionTuples\",\"engineTuple\",\"getEngineTuple_\",\"getVersionForKey_\",\"browserTuple\",\"info\",\"match\",\"exec\",\"goog.labs.userAgent.engine.getEngineTuple_\",\"i\",\"length\",\"tuple\",\"isVersionOrHigher\",\"goog.labs.userAgent.engine.isVersionOrHigher\",\"version\",\"string\",\"compareVersions\",\"goog.labs.userAgent.engine.getVersionForKey_\",\"key\",\"pair\",\"array\",\"find\"]\n}\n"]