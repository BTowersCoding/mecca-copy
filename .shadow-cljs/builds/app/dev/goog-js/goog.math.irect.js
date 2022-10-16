["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/math/irect.js"],"~:js","goog.provide(\"goog.math.IRect\");\n/** @record */ goog.math.IRect = function() {\n};\n/** @type {number} */ goog.math.IRect.prototype.left;\n/** @type {number} */ goog.math.IRect.prototype.top;\n/** @type {number} */ goog.math.IRect.prototype.width;\n/** @type {number} */ goog.math.IRect.prototype.height;\n","~:source","// Copyright 2016 The Closure Library Authors. All Rights Reserved.\n//\n// Licensed under the Apache License, Version 2.0 (the \"License\");\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n//      http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an \"AS-IS\" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n/**\n * @fileoverview A record declaration to allow ClientRect and other rectangle\n * like objects to be used with goog.math.Rect.\n */\n\ngoog.provide('goog.math.IRect');\n\n\n/**\n * Record for representing rectangular regions, allows compatibility between\n * things like ClientRect and goog.math.Rect.\n *\n * @record\n */\ngoog.math.IRect = function() {};\n\n\n/** @type {number} */\ngoog.math.IRect.prototype.left;\n\n\n/** @type {number} */\ngoog.math.IRect.prototype.top;\n\n\n/** @type {number} */\ngoog.math.IRect.prototype.width;\n\n\n/** @type {number} */\ngoog.math.IRect.prototype.height;\n","~:compiled-at",1665954032206,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.math.irect.js\",\n\"lineCount\":8,\n\"mappings\":\"AAmBAA,IAAAC,QAAA,CAAa,iBAAb,CAAA;AASA,eAAAD,IAAAE,KAAAC,MAAA,GAAkBC,QAAQ,EAAG;CAA7B;AAIA,sBAAAJ,IAAAE,KAAAC,MAAAE,UAAAC,KAAA;AAIA,sBAAAN,IAAAE,KAAAC,MAAAE,UAAAE,IAAA;AAIA,sBAAAP,IAAAE,KAAAC,MAAAE,UAAAG,MAAA;AAIA,sBAAAR,IAAAE,KAAAC,MAAAE,UAAAI,OAAA;;\",\n\"sources\":[\"goog/math/irect.js\"],\n\"sourcesContent\":[\"// Copyright 2016 The Closure Library Authors. All Rights Reserved.\\n//\\n// Licensed under the Apache License, Version 2.0 (the \\\"License\\\");\\n// you may not use this file except in compliance with the License.\\n// You may obtain a copy of the License at\\n//\\n//      http://www.apache.org/licenses/LICENSE-2.0\\n//\\n// Unless required by applicable law or agreed to in writing, software\\n// distributed under the License is distributed on an \\\"AS-IS\\\" BASIS,\\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\\n// See the License for the specific language governing permissions and\\n// limitations under the License.\\n\\n/**\\n * @fileoverview A record declaration to allow ClientRect and other rectangle\\n * like objects to be used with goog.math.Rect.\\n */\\n\\ngoog.provide('goog.math.IRect');\\n\\n\\n/**\\n * Record for representing rectangular regions, allows compatibility between\\n * things like ClientRect and goog.math.Rect.\\n *\\n * @record\\n */\\ngoog.math.IRect = function() {};\\n\\n\\n/** @type {number} */\\ngoog.math.IRect.prototype.left;\\n\\n\\n/** @type {number} */\\ngoog.math.IRect.prototype.top;\\n\\n\\n/** @type {number} */\\ngoog.math.IRect.prototype.width;\\n\\n\\n/** @type {number} */\\ngoog.math.IRect.prototype.height;\\n\"],\n\"names\":[\"goog\",\"provide\",\"math\",\"IRect\",\"goog.math.IRect\",\"prototype\",\"left\",\"top\",\"width\",\"height\"]\n}\n"]