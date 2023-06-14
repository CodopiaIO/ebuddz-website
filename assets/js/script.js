
(function (global, factory) {

	if (typeof module === "object" && typeof module.exports === "object") {

		module.exports = global.document ?
			factory(global, true) :
			function (w) {
				if (!w.document) {
					throw new Error("jQuery requires a window with a document");
				}
				return factory(w);
			};
	} else {
		factory(global);
	}

	// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//"use strict";
	var arr = [];

	var document = window.document;

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};



	var
		version = "2.2.2",

		// Define a local copy of jQuery
		jQuery = function (selector, context) {

			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init(selector, context);
		},

		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function (all, letter) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function () {
			return slice.call(this);
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function (num) {
			return num != null ?

				// Return just the one element from the set
				(num < 0 ? this[num + this.length] : this[num]) :

				// Return all the elements in a clean array
				slice.call(this);
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function (elems) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge(this.constructor(), elems);

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function (callback) {
			return jQuery.each(this, callback);
		},

		map: function (callback) {
			return this.pushStack(jQuery.map(this, function (elem, i) {
				return callback.call(elem, i, elem);
			}));
		},

		slice: function () {
			return this.pushStack(slice.apply(this, arguments));
		},

		first: function () {
			return this.eq(0);
		},

		last: function () {
			return this.eq(-1);
		},

		eq: function (i) {
			var len = this.length,
				j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
		},

		end: function () {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function () {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;

			// Skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if (typeof target !== "object" && !jQuery.isFunction(target)) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {

			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {

				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (jQuery.isPlainObject(copy) ||
						(copyIsArray = jQuery.isArray(copy)))) {

						if (copyIsArray) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = jQuery.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend({

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function (msg) {
			throw new Error(msg);
		},

		noop: function () { },

		isFunction: function (obj) {
			return jQuery.type(obj) === "function";
		},

		isArray: Array.isArray,

		isWindow: function (obj) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function (obj) {

			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			var realStringObj = obj && obj.toString();
			return !jQuery.isArray(obj) && (realStringObj - parseFloat(realStringObj) + 1) >= 0;
		},

		isPlainObject: function (obj) {
			var key;

			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
				return false;
			}

			// Not own constructor property must be Object
			if (obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype || {}, "isPrototypeOf")) {
				return false;
			}

			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own
			for (key in obj) { }

			return key === undefined || hasOwn.call(obj, key);
		},

		isEmptyObject: function (obj) {
			var name;
			for (name in obj) {
				return false;
			}
			return true;
		},

		type: function (obj) {
			if (obj == null) {
				return obj + "";
			}

			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[toString.call(obj)] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function (code) {
			var script,
				indirect = eval;

			code = jQuery.trim(code);

			if (code) {

				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if (code.indexOf("use strict") === 1) {
					script = document.createElement("script");
					script.text = code;
					document.head.appendChild(script).parentNode.removeChild(script);
				} else {

					// Otherwise, avoid the DOM node creation, insertion
					// and removal by using an indirect global eval

					indirect(code);
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function (string) {
			return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
		},

		nodeName: function (elem, name) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		each: function (obj, callback) {
			var length, i = 0;

			if (isArrayLike(obj)) {
				length = obj.length;
				for (; i < length; i++) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function (text) {
			return text == null ?
				"" :
				(text + "").replace(rtrim, "");
		},

		// results is for internal usage only
		makeArray: function (arr, results) {
			var ret = results || [];

			if (arr != null) {
				if (isArrayLike(Object(arr))) {
					jQuery.merge(ret,
						typeof arr === "string" ? [arr] : arr
					);
				} else {
					push.call(ret, arr);
				}
			}

			return ret;
		},

		inArray: function (elem, arr, i) {
			return arr == null ? -1 : indexOf.call(arr, elem, i);
		},

		merge: function (first, second) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for (; j < len; j++) {
				first[i++] = second[j];
			}

			first.length = i;

			return first;
		},

		grep: function (elems, callback, invert) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for (; i < length; i++) {
				callbackInverse = !callback(elems[i], i);
				if (callbackInverse !== callbackExpect) {
					matches.push(elems[i]);
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function (elems, callback, arg) {
			var length, value,
				i = 0,
				ret = [];

			// Go through the array, translating each of the items to their new values
			if (isArrayLike(elems)) {
				length = elems.length;
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						ret.push(value);
					}
				}

				// Go through every key on the object,
			} else {
				for (i in elems) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						ret.push(value);
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply([], ret);
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function (fn, context) {
			var tmp, args, proxy;

			if (typeof context === "string") {
				tmp = fn[context];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if (!jQuery.isFunction(fn)) {
				return undefined;
			}

			// Simulated bind
			args = slice.call(arguments, 2);
			proxy = function () {
				return fn.apply(context || this, args.concat(slice.call(arguments)));
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

	// JSHint would error on this code due to the Symbol not being defined in ES5.
	// Defining this global in .jshintrc would create a danger of using the global
	// unguarded in another place, it seems safer to just disable JSHint for these
	// three lines.
	/* jshint ignore: start */
	if (typeof Symbol === "function") {
		jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
	}
	/* jshint ignore: end */

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
		function (i, name) {
			class2type["[object " + name + "]"] = name.toLowerCase();
		});

	function isArrayLike(obj) {

		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type(obj);

		if (type === "function" || jQuery.isWindow(obj)) {
			return false;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && (length - 1) in obj;
	}
	var Sizzle =
		/*!
		 * Sizzle CSS Selector Engine v2.2.1
		 * http://sizzlejs.com/
		 *
		 * Copyright jQuery Foundation and other contributors
		 * Released under the MIT license
		 * http://jquery.org/license
		 *
		 * Date: 2015-10-17
		 */
		(function (window) {

			var i,
				support,
				Expr,
				getText,
				isXML,
				tokenize,
				compile,
				select,
				outermostContext,
				sortInput,
				hasDuplicate,

				// Local document vars
				setDocument,
				document,
				docElem,
				documentIsHTML,
				rbuggyQSA,
				rbuggyMatches,
				matches,
				contains,

				// Instance-specific data
				expando = "sizzle" + 1 * new Date(),
				preferredDoc = window.document,
				dirruns = 0,
				done = 0,
				classCache = createCache(),
				tokenCache = createCache(),
				compilerCache = createCache(),
				sortOrder = function (a, b) {
					if (a === b) {
						hasDuplicate = true;
					}
					return 0;
				},

				// General-purpose constants
				MAX_NEGATIVE = 1 << 31,

				// Instance methods
				hasOwn = ({}).hasOwnProperty,
				arr = [],
				pop = arr.pop,
				push_native = arr.push,
				push = arr.push,
				slice = arr.slice,
				// Use a stripped-down indexOf as it's faster than native
				// http://jsperf.com/thor-indexof-vs-for/5
				indexOf = function (list, elem) {
					var i = 0,
						len = list.length;
					for (; i < len; i++) {
						if (list[i] === elem) {
							return i;
						}
					}
					return -1;
				},

				booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

				// Regular expressions

				// http://www.w3.org/TR/css3-selectors/#whitespace
				whitespace = "[\\x20\\t\\r\\n\\f]",

				// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
				identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

				// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
				attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
					// Operator (capture 2)
					"*([*^$|!~]?=)" + whitespace +
					// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
					"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
					"*\\]",

				pseudos = ":(" + identifier + ")(?:\\((" +
					// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
					// 1. quoted (capture 3; capture 4 or capture 5)
					"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
					// 2. simple (capture 6)
					"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
					// 3. anything else (capture 2)
					".*" +
					")\\)|)",

				// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
				rwhitespace = new RegExp(whitespace + "+", "g"),
				rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),

				rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
				rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),

				rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),

				rpseudo = new RegExp(pseudos),
				ridentifier = new RegExp("^" + identifier + "$"),

				matchExpr = {
					"ID": new RegExp("^#(" + identifier + ")"),
					"CLASS": new RegExp("^\\.(" + identifier + ")"),
					"TAG": new RegExp("^(" + identifier + "|[*])"),
					"ATTR": new RegExp("^" + attributes),
					"PSEUDO": new RegExp("^" + pseudos),
					"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
						"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
						"*(\\d+)|))" + whitespace + "*\\)|)", "i"),
					"bool": new RegExp("^(?:" + booleans + ")$", "i"),
					// For use in libraries implementing .is()
					// We use this for POS matching in `select`
					"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
						whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
				},

				rinputs = /^(?:input|select|textarea|button)$/i,
				rheader = /^h\d$/i,

				rnative = /^[^{]+\{\s*\[native \w/,

				// Easily-parseable/retrievable ID or TAG or CLASS selectors
				rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

				rsibling = /[+~]/,
				rescape = /'|\\/g,

				// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
				runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
				funescape = function (_, escaped, escapedWhitespace) {
					var high = "0x" + escaped - 0x10000;
					// NaN means non-codepoint
					// Support: Firefox<24
					// Workaround erroneous numeric interpretation of +"0x"
					return high !== high || escapedWhitespace ?
						escaped :
						high < 0 ?
							// BMP codepoint
							String.fromCharCode(high + 0x10000) :
							// Supplemental Plane codepoint (surrogate pair)
							String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
				},

				// Used for iframes
				// See setDocument()
				// Removing the function wrapper causes a "Permission Denied"
				// error in IE
				unloadHandler = function () {
					setDocument();
				};

			// Optimize for push.apply( _, NodeList )
			try {
				push.apply(
					(arr = slice.call(preferredDoc.childNodes)),
					preferredDoc.childNodes
				);
				// Support: Android<4.0
				// Detect silently failing push.apply
				arr[preferredDoc.childNodes.length].nodeType;
			} catch (e) {
				push = {
					apply: arr.length ?

						// Leverage slice if possible
						function (target, els) {
							push_native.apply(target, slice.call(els));
						} :

						// Support: IE<9
						// Otherwise append directly
						function (target, els) {
							var j = target.length,
								i = 0;
							// Can't trust NodeList.length
							while ((target[j++] = els[i++])) { }
							target.length = j - 1;
						}
				};
			}

			function Sizzle(selector, context, results, seed) {
				var m, i, elem, nid, nidselect, match, groups, newSelector,
					newContext = context && context.ownerDocument,

					// nodeType defaults to 9, since context defaults to document
					nodeType = context ? context.nodeType : 9;

				results = results || [];

				// Return early from calls with invalid selector or context
				if (typeof selector !== "string" || !selector ||
					nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

					return results;
				}

				// Try to shortcut find operations (as opposed to filters) in HTML documents
				if (!seed) {

					if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
						setDocument(context);
					}
					context = context || document;

					if (documentIsHTML) {

						// If the selector is sufficiently simple, try using a "get*By*" DOM method
						// (excepting DocumentFragment context, where the methods don't exist)
						if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

							// ID selector
							if ((m = match[1])) {

								// Document context
								if (nodeType === 9) {
									if ((elem = context.getElementById(m))) {

										// Support: IE, Opera, Webkit
										// TODO: identify versions
										// getElementById can match elements by name instead of ID
										if (elem.id === m) {
											results.push(elem);
											return results;
										}
									} else {
										return results;
									}

									// Element context
								} else {

									// Support: IE, Opera, Webkit
									// TODO: identify versions
									// getElementById can match elements by name instead of ID
									if (newContext && (elem = newContext.getElementById(m)) &&
										contains(context, elem) &&
										elem.id === m) {

										results.push(elem);
										return results;
									}
								}

								// Type selector
							} else if (match[2]) {
								push.apply(results, context.getElementsByTagName(selector));
								return results;

								// Class selector
							} else if ((m = match[3]) && support.getElementsByClassName &&
								context.getElementsByClassName) {

								push.apply(results, context.getElementsByClassName(m));
								return results;
							}
						}

						// Take advantage of querySelectorAll
						if (support.qsa &&
							!compilerCache[selector + " "] &&
							(!rbuggyQSA || !rbuggyQSA.test(selector))) {

							if (nodeType !== 1) {
								newContext = context;
								newSelector = selector;

								// qSA looks outside Element context, which is not what we want
								// Thanks to Andrew Dupont for this workaround technique
								// Support: IE <=8
								// Exclude object elements
							} else if (context.nodeName.toLowerCase() !== "object") {

								// Capture the context ID, setting it first if necessary
								if ((nid = context.getAttribute("id"))) {
									nid = nid.replace(rescape, "\\$&");
								} else {
									context.setAttribute("id", (nid = expando));
								}

								// Prefix every selector in the list
								groups = tokenize(selector);
								i = groups.length;
								nidselect = ridentifier.test(nid) ? "#" + nid : "[id='" + nid + "']";
								while (i--) {
									groups[i] = nidselect + " " + toSelector(groups[i]);
								}
								newSelector = groups.join(",");

								// Expand context for sibling selectors
								newContext = rsibling.test(selector) && testContext(context.parentNode) ||
									context;
							}

							if (newSelector) {
								try {
									push.apply(results,
										newContext.querySelectorAll(newSelector)
									);
									return results;
								} catch (qsaError) { } finally {
									if (nid === expando) {
										context.removeAttribute("id");
									}
								}
							}
						}
					}
				}

				// All others
				return select(selector.replace(rtrim, "$1"), context, results, seed);
			}

			/**
			 * Create key-value caches of limited size
			 * @returns {function(string, object)} Returns the Object data after storing it on itself with
			 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
			 *	deleting the oldest entry
			 */
			function createCache() {
				var keys = [];

				function cache(key, value) {
					// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
					if (keys.push(key + " ") > Expr.cacheLength) {
						// Only keep the most recent entries
						delete cache[keys.shift()];
					}
					return (cache[key + " "] = value);
				}
				return cache;
			}

			/**
			 * Mark a function for special use by Sizzle
			 * @param {Function} fn The function to mark
			 */
			function markFunction(fn) {
				fn[expando] = true;
				return fn;
			}

			/**
			 * Support testing using an element
			 * @param {Function} fn Passed the created div and expects a boolean result
			 */
			function assert(fn) {
				var div = document.createElement("div");

				try {
					return !!fn(div);
				} catch (e) {
					return false;
				} finally {
					// Remove from its parent by default
					if (div.parentNode) {
						div.parentNode.removeChild(div);
					}
					// release memory in IE
					div = null;
				}
			}

			/**
			 * Adds the same handler for all of the specified attrs
			 * @param {String} attrs Pipe-separated list of attributes
			 * @param {Function} handler The method that will be applied
			 */
			function addHandle(attrs, handler) {
				var arr = attrs.split("|"),
					i = arr.length;

				while (i--) {
					Expr.attrHandle[arr[i]] = handler;
				}
			}

			/**
			 * Checks document order of two siblings
			 * @param {Element} a
			 * @param {Element} b
			 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
			 */
			function siblingCheck(a, b) {
				var cur = b && a,
					diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
						(~b.sourceIndex || MAX_NEGATIVE) -
						(~a.sourceIndex || MAX_NEGATIVE);

				// Use IE sourceIndex if available on both nodes
				if (diff) {
					return diff;
				}

				// Check if b follows a
				if (cur) {
					while ((cur = cur.nextSibling)) {
						if (cur === b) {
							return -1;
						}
					}
				}

				return a ? 1 : -1;
			}

			/**
			 * Returns a function to use in pseudos for input types
			 * @param {String} type
			 */
			function createInputPseudo(type) {
				return function (elem) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === type;
				};
			}

			/**
			 * Returns a function to use in pseudos for buttons
			 * @param {String} type
			 */
			function createButtonPseudo(type) {
				return function (elem) {
					var name = elem.nodeName.toLowerCase();
					return (name === "input" || name === "button") && elem.type === type;
				};
			}

			/**
			 * Returns a function to use in pseudos for positionals
			 * @param {Function} fn
			 */
			function createPositionalPseudo(fn) {
				return markFunction(function (argument) {
					argument = +argument;
					return markFunction(function (seed, matches) {
						var j,
							matchIndexes = fn([], seed.length, argument),
							i = matchIndexes.length;

						// Match elements found at the specified indexes
						while (i--) {
							if (seed[(j = matchIndexes[i])]) {
								seed[j] = !(matches[j] = seed[j]);
							}
						}
					});
				});
			}

			/**
			 * Checks a node for validity as a Sizzle context
			 * @param {Element|Object=} context
			 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
			 */
			function testContext(context) {
				return context && typeof context.getElementsByTagName !== "undefined" && context;
			}

			// Expose support vars for convenience
			support = Sizzle.support = {};

			/**
			 * Detects XML nodes
			 * @param {Element|Object} elem An element or a document
			 * @returns {Boolean} True iff elem is a non-HTML XML node
			 */
			isXML = Sizzle.isXML = function (elem) {
				// documentElement is verified for cases where it doesn't yet exist
				// (such as loading iframes in IE - #4833)
				var documentElement = elem && (elem.ownerDocument || elem).documentElement;
				return documentElement ? documentElement.nodeName !== "HTML" : false;
			};

			/**
			 * Sets document-related variables once based on the current document
			 * @param {Element|Object} [doc] An element or document object to use to set the document
			 * @returns {Object} Returns the current document
			 */
			setDocument = Sizzle.setDocument = function (node) {
				var hasCompare, parent,
					doc = node ? node.ownerDocument || node : preferredDoc;

				// Return early if doc is invalid or already selected
				if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
					return document;
				}

				// Update global variables
				document = doc;
				docElem = document.documentElement;
				documentIsHTML = !isXML(document);

				// Support: IE 9-11, Edge
				// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
				if ((parent = document.defaultView) && parent.top !== parent) {
					// Support: IE 11
					if (parent.addEventListener) {
						parent.addEventListener("unload", unloadHandler, false);

						// Support: IE 9 - 10 only
					} else if (parent.attachEvent) {
						parent.attachEvent("onunload", unloadHandler);
					}
				}

				/* Attributes
				---------------------------------------------------------------------- */

				// Support: IE<8
				// Verify that getAttribute really returns attributes and not properties
				// (excepting IE8 booleans)
				support.attributes = assert(function (div) {
					div.className = "i";
					return !div.getAttribute("className");
				});

				/* getElement(s)By*
				---------------------------------------------------------------------- */

				// Check if getElementsByTagName("*") returns only elements
				support.getElementsByTagName = assert(function (div) {
					div.appendChild(document.createComment(""));
					return !div.getElementsByTagName("*").length;
				});

				// Support: IE<9
				support.getElementsByClassName = rnative.test(document.getElementsByClassName);

				// Support: IE<10
				// Check if getElementById returns elements by name
				// The broken getElementById methods don't pick up programatically-set names,
				// so use a roundabout getElementsByName test
				support.getById = assert(function (div) {
					docElem.appendChild(div).id = expando;
					return !document.getElementsByName || !document.getElementsByName(expando).length;
				});

				// ID find and filter
				if (support.getById) {
					Expr.find["ID"] = function (id, context) {
						if (typeof context.getElementById !== "undefined" && documentIsHTML) {
							var m = context.getElementById(id);
							return m ? [m] : [];
						}
					};
					Expr.filter["ID"] = function (id) {
						var attrId = id.replace(runescape, funescape);
						return function (elem) {
							return elem.getAttribute("id") === attrId;
						};
					};
				} else {
					// Support: IE6/7
					// getElementById is not reliable as a find shortcut
					delete Expr.find["ID"];

					Expr.filter["ID"] = function (id) {
						var attrId = id.replace(runescape, funescape);
						return function (elem) {
							var node = typeof elem.getAttributeNode !== "undefined" &&
								elem.getAttributeNode("id");
							return node && node.value === attrId;
						};
					};
				}

				// Tag
				Expr.find["TAG"] = support.getElementsByTagName ?
					function (tag, context) {
						if (typeof context.getElementsByTagName !== "undefined") {
							return context.getElementsByTagName(tag);

							// DocumentFragment nodes don't have gEBTN
						} else if (support.qsa) {
							return context.querySelectorAll(tag);
						}
					} :

					function (tag, context) {
						var elem,
							tmp = [],
							i = 0,
							// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
							results = context.getElementsByTagName(tag);

						// Filter out possible comments
						if (tag === "*") {
							while ((elem = results[i++])) {
								if (elem.nodeType === 1) {
									tmp.push(elem);
								}
							}

							return tmp;
						}
						return results;
					};

				// Class
				Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
					if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
						return context.getElementsByClassName(className);
					}
				};

				/* QSA/matchesSelector
				---------------------------------------------------------------------- */

				// QSA and matchesSelector support

				// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
				rbuggyMatches = [];

				// qSa(:focus) reports false when true (Chrome 21)
				// We allow this because of a bug in IE8/9 that throws an error
				// whenever `document.activeElement` is accessed on an iframe
				// So, we allow :focus to pass through QSA all the time to avoid the IE error
				// See http://bugs.jquery.com/ticket/13378
				rbuggyQSA = [];

				if ((support.qsa = rnative.test(document.querySelectorAll))) {
					// Build QSA regex
					// Regex strategy adopted from Diego Perini
					assert(function (div) {
						// Select is set to empty string on purpose
						// This is to test IE's treatment of not explicitly
						// setting a boolean content attribute,
						// since its presence should be enough
						// http://bugs.jquery.com/ticket/12359
						docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" +
							"<select id='" + expando + "-\r\\' msallowcapture=''>" +
							"<option selected=''></option></select>";

						// Support: IE8, Opera 11-12.16
						// Nothing should be selected when empty strings follow ^= or $= or *=
						// The test attribute must be unknown in Opera but "safe" for WinRT
						// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
						if (div.querySelectorAll("[msallowcapture^='']").length) {
							rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
						}

						// Support: IE8
						// Boolean attributes and "value" are not treated correctly
						if (!div.querySelectorAll("[selected]").length) {
							rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
						}

						// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
						if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
							rbuggyQSA.push("~=");
						}

						// Webkit/Opera - :checked should return selected option elements
						// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
						// IE8 throws error here and will not see later tests
						if (!div.querySelectorAll(":checked").length) {
							rbuggyQSA.push(":checked");
						}

						// Support: Safari 8+, iOS 8+
						// https://bugs.webkit.org/show_bug.cgi?id=136851
						// In-page `selector#id sibing-combinator selector` fails
						if (!div.querySelectorAll("a#" + expando + "+*").length) {
							rbuggyQSA.push(".#.+[+~]");
						}
					});

					assert(function (div) {
						// Support: Windows 8 Native Apps
						// The type and name attributes are restricted during .innerHTML assignment
						var input = document.createElement("input");
						input.setAttribute("type", "hidden");
						div.appendChild(input).setAttribute("name", "D");

						// Support: IE8
						// Enforce case-sensitivity of name attribute
						if (div.querySelectorAll("[name=d]").length) {
							rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
						}

						// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
						// IE8 throws error here and will not see later tests
						if (!div.querySelectorAll(":enabled").length) {
							rbuggyQSA.push(":enabled", ":disabled");
						}

						// Opera 10-11 does not throw on post-comma invalid pseudos
						div.querySelectorAll("*,:x");
						rbuggyQSA.push(",.*:");
					});
				}

				if ((support.matchesSelector = rnative.test((matches = docElem.matches ||
					docElem.webkitMatchesSelector ||
					docElem.mozMatchesSelector ||
					docElem.oMatchesSelector ||
					docElem.msMatchesSelector)))) {

					assert(function (div) {
						// Check to see if it's possible to do matchesSelector
						// on a disconnected node (IE 9)
						support.disconnectedMatch = matches.call(div, "div");

						// This should fail with an exception
						// Gecko does not error, returns false instead
						matches.call(div, "[s!='']:x");
						rbuggyMatches.push("!=", pseudos);
					});
				}

				rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
				rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

				/* Contains
				---------------------------------------------------------------------- */
				hasCompare = rnative.test(docElem.compareDocumentPosition);

				// Element contains another
				// Purposefully self-exclusive
				// As in, an element does not contain itself
				contains = hasCompare || rnative.test(docElem.contains) ?
					function (a, b) {
						var adown = a.nodeType === 9 ? a.documentElement : a,
							bup = b && b.parentNode;
						return a === bup || !!(bup && bup.nodeType === 1 && (
							adown.contains ?
								adown.contains(bup) :
								a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
						));
					} :
					function (a, b) {
						if (b) {
							while ((b = b.parentNode)) {
								if (b === a) {
									return true;
								}
							}
						}
						return false;
					};

				/* Sorting
				---------------------------------------------------------------------- */

				// Document order sorting
				sortOrder = hasCompare ?
					function (a, b) {

						// Flag for duplicate removal
						if (a === b) {
							hasDuplicate = true;
							return 0;
						}

						// Sort on method existence if only one input has compareDocumentPosition
						var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
						if (compare) {
							return compare;
						}

						// Calculate position if both inputs belong to the same document
						compare = (a.ownerDocument || a) === (b.ownerDocument || b) ?
							a.compareDocumentPosition(b) :

							// Otherwise we know they are disconnected
							1;

						// Disconnected nodes
						if (compare & 1 ||
							(!support.sortDetached && b.compareDocumentPosition(a) === compare)) {

							// Choose the first element that is related to our preferred document
							if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
								return -1;
							}
							if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
								return 1;
							}

							// Maintain original order
							return sortInput ?
								(indexOf(sortInput, a) - indexOf(sortInput, b)) :
								0;
						}

						return compare & 4 ? -1 : 1;
					} :
					function (a, b) {
						// Exit early if the nodes are identical
						if (a === b) {
							hasDuplicate = true;
							return 0;
						}

						var cur,
							i = 0,
							aup = a.parentNode,
							bup = b.parentNode,
							ap = [a],
							bp = [b];

						// Parentless nodes are either documents or disconnected
						if (!aup || !bup) {
							return a === document ? -1 :
								b === document ? 1 :
									aup ? -1 :
										bup ? 1 :
											sortInput ?
												(indexOf(sortInput, a) - indexOf(sortInput, b)) :
												0;

							// If the nodes are siblings, we can do a quick check
						} else if (aup === bup) {
							return siblingCheck(a, b);
						}

						// Otherwise we need full lists of their ancestors for comparison
						cur = a;
						while ((cur = cur.parentNode)) {
							ap.unshift(cur);
						}
						cur = b;
						while ((cur = cur.parentNode)) {
							bp.unshift(cur);
						}

						// Walk down the tree looking for a discrepancy
						while (ap[i] === bp[i]) {
							i++;
						}

						return i ?
							// Do a sibling check if the nodes have a common ancestor
							siblingCheck(ap[i], bp[i]) :

							// Otherwise nodes in our document sort first
							ap[i] === preferredDoc ? -1 :
								bp[i] === preferredDoc ? 1 :
									0;
					};

				return document;
			};

			Sizzle.matches = function (expr, elements) {
				return Sizzle(expr, null, null, elements);
			};

			Sizzle.matchesSelector = function (elem, expr) {
				// Set document vars if needed
				if ((elem.ownerDocument || elem) !== document) {
					setDocument(elem);
				}

				// Make sure that attribute selectors are quoted
				expr = expr.replace(rattributeQuotes, "='$1']");

				if (support.matchesSelector && documentIsHTML &&
					!compilerCache[expr + " "] &&
					(!rbuggyMatches || !rbuggyMatches.test(expr)) &&
					(!rbuggyQSA || !rbuggyQSA.test(expr))) {

					try {
						var ret = matches.call(elem, expr);

						// IE 9's matchesSelector returns false on disconnected nodes
						if (ret || support.disconnectedMatch ||
							// As well, disconnected nodes are said to be in a document
							// fragment in IE 9
							elem.document && elem.document.nodeType !== 11) {
							return ret;
						}
					} catch (e) { }
				}

				return Sizzle(expr, document, null, [elem]).length > 0;
			};

			Sizzle.contains = function (context, elem) {
				// Set document vars if needed
				if ((context.ownerDocument || context) !== document) {
					setDocument(context);
				}
				return contains(context, elem);
			};

			Sizzle.attr = function (elem, name) {
				// Set document vars if needed
				if ((elem.ownerDocument || elem) !== document) {
					setDocument(elem);
				}

				var fn = Expr.attrHandle[name.toLowerCase()],
					// Don't get fooled by Object.prototype properties (jQuery #13807)
					val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
						fn(elem, name, !documentIsHTML) :
						undefined;

				return val !== undefined ?
					val :
					support.attributes || !documentIsHTML ?
						elem.getAttribute(name) :
						(val = elem.getAttributeNode(name)) && val.specified ?
							val.value :
							null;
			};

			Sizzle.error = function (msg) {
				throw new Error("Syntax error, unrecognized expression: " + msg);
			};

			/**
			 * Document sorting and removing duplicates
			 * @param {ArrayLike} results
			 */
			Sizzle.uniqueSort = function (results) {
				var elem,
					duplicates = [],
					j = 0,
					i = 0;

				// Unless we *know* we can detect duplicates, assume their presence
				hasDuplicate = !support.detectDuplicates;
				sortInput = !support.sortStable && results.slice(0);
				results.sort(sortOrder);

				if (hasDuplicate) {
					while ((elem = results[i++])) {
						if (elem === results[i]) {
							j = duplicates.push(i);
						}
					}
					while (j--) {
						results.splice(duplicates[j], 1);
					}
				}

				// Clear input after sorting to release objects
				// See https://github.com/jquery/sizzle/pull/225
				sortInput = null;

				return results;
			};

			/**
			 * Utility function for retrieving the text value of an array of DOM nodes
			 * @param {Array|Element} elem
			 */
			getText = Sizzle.getText = function (elem) {
				var node,
					ret = "",
					i = 0,
					nodeType = elem.nodeType;

				if (!nodeType) {
					// If no nodeType, this is expected to be an array
					while ((node = elem[i++])) {
						// Do not traverse comment nodes
						ret += getText(node);
					}
				} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
					// Use textContent for elements
					// innerText usage removed for consistency of new lines (jQuery #11153)
					if (typeof elem.textContent === "string") {
						return elem.textContent;
					} else {
						// Traverse its children
						for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
							ret += getText(elem);
						}
					}
				} else if (nodeType === 3 || nodeType === 4) {
					return elem.nodeValue;
				}
				// Do not include comment or processing instruction nodes

				return ret;
			};

			Expr = Sizzle.selectors = {

				// Can be adjusted by the user
				cacheLength: 50,

				createPseudo: markFunction,

				match: matchExpr,

				attrHandle: {},

				find: {},

				relative: {
					">": {
						dir: "parentNode",
						first: true
					},
					" ": {
						dir: "parentNode"
					},
					"+": {
						dir: "previousSibling",
						first: true
					},
					"~": {
						dir: "previousSibling"
					}
				},

				preFilter: {
					"ATTR": function (match) {
						match[1] = match[1].replace(runescape, funescape);

						// Move the given value to match[3] whether quoted or unquoted
						match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

						if (match[2] === "~=") {
							match[3] = " " + match[3] + " ";
						}

						return match.slice(0, 4);
					},

					"CHILD": function (match) {
						/* matches from matchExpr["CHILD"]
							1 type (only|nth|...)
							2 what (child|of-type)
							3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
							4 xn-component of xn+y argument ([+-]?\d*n|)
							5 sign of xn-component
							6 x of xn-component
							7 sign of y-component
							8 y of y-component
						*/
						match[1] = match[1].toLowerCase();

						if (match[1].slice(0, 3) === "nth") {
							// nth-* requires argument
							if (!match[3]) {
								Sizzle.error(match[0]);
							}

							// numeric x and y parameters for Expr.filter.CHILD
							// remember that false/true cast respectively to 0/1
							match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
							match[5] = +((match[7] + match[8]) || match[3] === "odd");

							// other types prohibit arguments
						} else if (match[3]) {
							Sizzle.error(match[0]);
						}

						return match;
					},

					"PSEUDO": function (match) {
						var excess,
							unquoted = !match[6] && match[2];

						if (matchExpr["CHILD"].test(match[0])) {
							return null;
						}

						// Accept quoted arguments as-is
						if (match[3]) {
							match[2] = match[4] || match[5] || "";

							// Strip excess characters from unquoted arguments
						} else if (unquoted && rpseudo.test(unquoted) &&
							// Get excess from tokenize (recursively)
							(excess = tokenize(unquoted, true)) &&
							// advance to the next closing parenthesis
							(excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

							// excess is a negative index
							match[0] = match[0].slice(0, excess);
							match[2] = unquoted.slice(0, excess);
						}

						// Return only captures needed by the pseudo filter method (type and argument)
						return match.slice(0, 3);
					}
				},

				filter: {

					"TAG": function (nodeNameSelector) {
						var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
						return nodeNameSelector === "*" ?
							function () {
								return true;
							} :
							function (elem) {
								return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
							};
					},

					"CLASS": function (className) {
						var pattern = classCache[className + " "];

						return pattern ||
							(pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) &&
							classCache(className, function (elem) {
								return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
							});
					},

					"ATTR": function (name, operator, check) {
						return function (elem) {
							var result = Sizzle.attr(elem, name);

							if (result == null) {
								return operator === "!=";
							}
							if (!operator) {
								return true;
							}

							result += "";

							return operator === "=" ? result === check :
								operator === "!=" ? result !== check :
									operator === "^=" ? check && result.indexOf(check) === 0 :
										operator === "*=" ? check && result.indexOf(check) > -1 :
											operator === "$=" ? check && result.slice(-check.length) === check :
												operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 :
													operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
														false;
						};
					},

					"CHILD": function (type, what, argument, first, last) {
						var simple = type.slice(0, 3) !== "nth",
							forward = type.slice(-4) !== "last",
							ofType = what === "of-type";

						return first === 1 && last === 0 ?

							// Shortcut for :nth-*(n)
							function (elem) {
								return !!elem.parentNode;
							} :

							function (elem, context, xml) {
								var cache, uniqueCache, outerCache, node, nodeIndex, start,
									dir = simple !== forward ? "nextSibling" : "previousSibling",
									parent = elem.parentNode,
									name = ofType && elem.nodeName.toLowerCase(),
									useCache = !xml && !ofType,
									diff = false;

								if (parent) {

									// :(first|last|only)-(child|of-type)
									if (simple) {
										while (dir) {
											node = elem;
											while ((node = node[dir])) {
												if (ofType ?
													node.nodeName.toLowerCase() === name :
													node.nodeType === 1) {

													return false;
												}
											}
											// Reverse direction for :only-* (if we haven't yet done so)
											start = dir = type === "only" && !start && "nextSibling";
										}
										return true;
									}

									start = [forward ? parent.firstChild : parent.lastChild];

									// non-xml :nth-child(...) stores cache data on `parent`
									if (forward && useCache) {

										// Seek `elem` from a previously-cached index

										// ...in a gzip-friendly way
										node = parent;
										outerCache = node[expando] || (node[expando] = {});

										// Support: IE <9 only
										// Defend against cloned attroperties (jQuery gh-1709)
										uniqueCache = outerCache[node.uniqueID] ||
											(outerCache[node.uniqueID] = {});

										cache = uniqueCache[type] || [];
										nodeIndex = cache[0] === dirruns && cache[1];
										diff = nodeIndex && cache[2];
										node = nodeIndex && parent.childNodes[nodeIndex];

										while ((node = ++nodeIndex && node && node[dir] ||

											// Fallback to seeking `elem` from the start
											(diff = nodeIndex = 0) || start.pop())) {

											// When found, cache indexes on `parent` and break
											if (node.nodeType === 1 && ++diff && node === elem) {
												uniqueCache[type] = [dirruns, nodeIndex, diff];
												break;
											}
										}

									} else {
										// Use previously-cached element index if available
										if (useCache) {
											// ...in a gzip-friendly way
											node = elem;
											outerCache = node[expando] || (node[expando] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[node.uniqueID] ||
												(outerCache[node.uniqueID] = {});

											cache = uniqueCache[type] || [];
											nodeIndex = cache[0] === dirruns && cache[1];
											diff = nodeIndex;
										}

										// xml :nth-child(...)
										// or :nth-last-child(...) or :nth(-last)?-of-type(...)
										if (diff === false) {
											// Use the same loop as above to seek `elem` from the start
											while ((node = ++nodeIndex && node && node[dir] ||
												(diff = nodeIndex = 0) || start.pop())) {

												if ((ofType ?
													node.nodeName.toLowerCase() === name :
													node.nodeType === 1) &&
													++diff) {

													// Cache the index of each encountered element
													if (useCache) {
														outerCache = node[expando] || (node[expando] = {});

														// Support: IE <9 only
														// Defend against cloned attroperties (jQuery gh-1709)
														uniqueCache = outerCache[node.uniqueID] ||
															(outerCache[node.uniqueID] = {});

														uniqueCache[type] = [dirruns, diff];
													}

													if (node === elem) {
														break;
													}
												}
											}
										}
									}

									// Incorporate the offset, then check against cycle size
									diff -= last;
									return diff === first || (diff % first === 0 && diff / first >= 0);
								}
							};
					},

					"PSEUDO": function (pseudo, argument) {
						// pseudo-class names are case-insensitive
						// http://www.w3.org/TR/selectors/#pseudo-classes
						// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
						// Remember that setFilters inherits from pseudos
						var args,
							fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
								Sizzle.error("unsupported pseudo: " + pseudo);

						// The user may use createPseudo to indicate that
						// arguments are needed to create the filter function
						// just as Sizzle does
						if (fn[expando]) {
							return fn(argument);
						}

						// But maintain support for old signatures
						if (fn.length > 1) {
							args = [pseudo, pseudo, "", argument];
							return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
								markFunction(function (seed, matches) {
									var idx,
										matched = fn(seed, argument),
										i = matched.length;
									while (i--) {
										idx = indexOf(seed, matched[i]);
										seed[idx] = !(matches[idx] = matched[i]);
									}
								}) :
								function (elem) {
									return fn(elem, 0, args);
								};
						}

						return fn;
					}
				},

				pseudos: {
					// Potentially complex pseudos
					"not": markFunction(function (selector) {
						// Trim the selector passed to compile
						// to avoid treating leading and trailing
						// spaces as combinators
						var input = [],
							results = [],
							matcher = compile(selector.replace(rtrim, "$1"));

						return matcher[expando] ?
							markFunction(function (seed, matches, context, xml) {
								var elem,
									unmatched = matcher(seed, null, xml, []),
									i = seed.length;

								// Match elements unmatched by `matcher`
								while (i--) {
									if ((elem = unmatched[i])) {
										seed[i] = !(matches[i] = elem);
									}
								}
							}) :
							function (elem, context, xml) {
								input[0] = elem;
								matcher(input, null, xml, results);
								// Don't keep the element (issue #299)
								input[0] = null;
								return !results.pop();
							};
					}),

					"has": markFunction(function (selector) {
						return function (elem) {
							return Sizzle(selector, elem).length > 0;
						};
					}),

					"contains": markFunction(function (text) {
						text = text.replace(runescape, funescape);
						return function (elem) {
							return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
						};
					}),

					// "Whether an element is represented by a :lang() selector
					// is based solely on the element's language value
					// being equal to the identifier C,
					// or beginning with the identifier C immediately followed by "-".
					// The matching of C against the element's language value is performed case-insensitively.
					// The identifier C does not have to be a valid language name."
					// http://www.w3.org/TR/selectors/#lang-pseudo
					"lang": markFunction(function (lang) {
						// lang value must be a valid identifier
						if (!ridentifier.test(lang || "")) {
							Sizzle.error("unsupported lang: " + lang);
						}
						lang = lang.replace(runescape, funescape).toLowerCase();
						return function (elem) {
							var elemLang;
							do {
								if ((elemLang = documentIsHTML ?
									elem.lang :
									elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {

									elemLang = elemLang.toLowerCase();
									return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
								}
							} while ((elem = elem.parentNode) && elem.nodeType === 1);
							return false;
						};
					}),

					// Miscellaneous
					"target": function (elem) {
						var hash = window.location && window.location.hash;
						return hash && hash.slice(1) === elem.id;
					},

					"root": function (elem) {
						return elem === docElem;
					},

					"focus": function (elem) {
						return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
					},

					// Boolean properties
					"enabled": function (elem) {
						return elem.disabled === false;
					},

					"disabled": function (elem) {
						return elem.disabled === true;
					},

					"checked": function (elem) {
						// In CSS3, :checked should return both checked and selected elements
						// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
						var nodeName = elem.nodeName.toLowerCase();
						return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
					},

					"selected": function (elem) {
						// Accessing this property makes selected-by-default
						// options in Safari work properly
						if (elem.parentNode) {
							elem.parentNode.selectedIndex;
						}

						return elem.selected === true;
					},

					// Contents
					"empty": function (elem) {
						// http://www.w3.org/TR/selectors/#empty-pseudo
						// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
						//   but not by others (comment: 8; processing instruction: 7; etc.)
						// nodeType < 6 works because attributes (2) do not appear as children
						for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
							if (elem.nodeType < 6) {
								return false;
							}
						}
						return true;
					},

					"parent": function (elem) {
						return !Expr.pseudos["empty"](elem);
					},

					// Element/input types
					"header": function (elem) {
						return rheader.test(elem.nodeName);
					},

					"input": function (elem) {
						return rinputs.test(elem.nodeName);
					},

					"button": function (elem) {
						var name = elem.nodeName.toLowerCase();
						return name === "input" && elem.type === "button" || name === "button";
					},

					"text": function (elem) {
						var attr;
						return elem.nodeName.toLowerCase() === "input" &&
							elem.type === "text" &&

							// Support: IE<8
							// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
							((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
					},

					// Position-in-collection
					"first": createPositionalPseudo(function () {
						return [0];
					}),

					"last": createPositionalPseudo(function (matchIndexes, length) {
						return [length - 1];
					}),

					"eq": createPositionalPseudo(function (matchIndexes, length, argument) {
						return [argument < 0 ? argument + length : argument];
					}),

					"even": createPositionalPseudo(function (matchIndexes, length) {
						var i = 0;
						for (; i < length; i += 2) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					}),

					"odd": createPositionalPseudo(function (matchIndexes, length) {
						var i = 1;
						for (; i < length; i += 2) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					}),

					"lt": createPositionalPseudo(function (matchIndexes, length, argument) {
						var i = argument < 0 ? argument + length : argument;
						for (; --i >= 0;) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					}),

					"gt": createPositionalPseudo(function (matchIndexes, length, argument) {
						var i = argument < 0 ? argument + length : argument;
						for (; ++i < length;) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					})
				}
			};

			Expr.pseudos["nth"] = Expr.pseudos["eq"];

			// Add button/input type pseudos
			for (i in {
				radio: true,
				checkbox: true,
				file: true,
				password: true,
				image: true
			}) {
				Expr.pseudos[i] = createInputPseudo(i);
			}
			for (i in {
				submit: true,
				reset: true
			}) {
				Expr.pseudos[i] = createButtonPseudo(i);
			}

			// Easy API for creating new setFilters
			function setFilters() { }
			setFilters.prototype = Expr.filters = Expr.pseudos;
			Expr.setFilters = new setFilters();

			tokenize = Sizzle.tokenize = function (selector, parseOnly) {
				var matched, match, tokens, type,
					soFar, groups, preFilters,
					cached = tokenCache[selector + " "];

				if (cached) {
					return parseOnly ? 0 : cached.slice(0);
				}

				soFar = selector;
				groups = [];
				preFilters = Expr.preFilter;

				while (soFar) {

					// Comma and first run
					if (!matched || (match = rcomma.exec(soFar))) {
						if (match) {
							// Don't consume trailing commas as valid
							soFar = soFar.slice(match[0].length) || soFar;
						}
						groups.push((tokens = []));
					}

					matched = false;

					// Combinators
					if ((match = rcombinators.exec(soFar))) {
						matched = match.shift();
						tokens.push({
							value: matched,
							// Cast descendant combinators to space
							type: match[0].replace(rtrim, " ")
						});
						soFar = soFar.slice(matched.length);
					}

					// Filters
					for (type in Expr.filter) {
						if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
							(match = preFilters[type](match)))) {
							matched = match.shift();
							tokens.push({
								value: matched,
								type: type,
								matches: match
							});
							soFar = soFar.slice(matched.length);
						}
					}

					if (!matched) {
						break;
					}
				}

				// Return the length of the invalid excess
				// if we're just parsing
				// Otherwise, throw an error or return tokens
				return parseOnly ?
					soFar.length :
					soFar ?
						Sizzle.error(selector) :
						// Cache the tokens
						tokenCache(selector, groups).slice(0);
			};

			function toSelector(tokens) {
				var i = 0,
					len = tokens.length,
					selector = "";
				for (; i < len; i++) {
					selector += tokens[i].value;
				}
				return selector;
			}

			function addCombinator(matcher, combinator, base) {
				var dir = combinator.dir,
					checkNonElements = base && dir === "parentNode",
					doneName = done++;

				return combinator.first ?
					// Check against closest ancestor/preceding element
					function (elem, context, xml) {
						while ((elem = elem[dir])) {
							if (elem.nodeType === 1 || checkNonElements) {
								return matcher(elem, context, xml);
							}
						}
					} :

					// Check against all ancestor/preceding elements
					function (elem, context, xml) {
						var oldCache, uniqueCache, outerCache,
							newCache = [dirruns, doneName];

						// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
						if (xml) {
							while ((elem = elem[dir])) {
								if (elem.nodeType === 1 || checkNonElements) {
									if (matcher(elem, context, xml)) {
										return true;
									}
								}
							}
						} else {
							while ((elem = elem[dir])) {
								if (elem.nodeType === 1 || checkNonElements) {
									outerCache = elem[expando] || (elem[expando] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

									if ((oldCache = uniqueCache[dir]) &&
										oldCache[0] === dirruns && oldCache[1] === doneName) {

										// Assign to newCache so results back-propagate to previous elements
										return (newCache[2] = oldCache[2]);
									} else {
										// Reuse newcache so results back-propagate to previous elements
										uniqueCache[dir] = newCache;

										// A match means we're done; a fail means we have to keep checking
										if ((newCache[2] = matcher(elem, context, xml))) {
											return true;
										}
									}
								}
							}
						}
					};
			}

			function elementMatcher(matchers) {
				return matchers.length > 1 ?
					function (elem, context, xml) {
						var i = matchers.length;
						while (i--) {
							if (!matchers[i](elem, context, xml)) {
								return false;
							}
						}
						return true;
					} :
					matchers[0];
			}

			function multipleContexts(selector, contexts, results) {
				var i = 0,
					len = contexts.length;
				for (; i < len; i++) {
					Sizzle(selector, contexts[i], results);
				}
				return results;
			}

			function condense(unmatched, map, filter, context, xml) {
				var elem,
					newUnmatched = [],
					i = 0,
					len = unmatched.length,
					mapped = map != null;

				for (; i < len; i++) {
					if ((elem = unmatched[i])) {
						if (!filter || filter(elem, context, xml)) {
							newUnmatched.push(elem);
							if (mapped) {
								map.push(i);
							}
						}
					}
				}

				return newUnmatched;
			}

			function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
				if (postFilter && !postFilter[expando]) {
					postFilter = setMatcher(postFilter);
				}
				if (postFinder && !postFinder[expando]) {
					postFinder = setMatcher(postFinder, postSelector);
				}
				return markFunction(function (seed, results, context, xml) {
					var temp, i, elem,
						preMap = [],
						postMap = [],
						preexisting = results.length,

						// Get initial elements from seed or context
						elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),

						// Prefilter to get matcher input, preserving a map for seed-results synchronization
						matcherIn = preFilter && (seed || !selector) ?
							condense(elems, preMap, preFilter, context, xml) :
							elems,

						matcherOut = matcher ?
							// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
							postFinder || (seed ? preFilter : preexisting || postFilter) ?

								// ...intermediate processing is necessary
								[] :

								// ...otherwise use results directly
								results :
							matcherIn;

					// Find primary matches
					if (matcher) {
						matcher(matcherIn, matcherOut, context, xml);
					}

					// Apply postFilter
					if (postFilter) {
						temp = condense(matcherOut, postMap);
						postFilter(temp, [], context, xml);

						// Un-match failing elements by moving them back to matcherIn
						i = temp.length;
						while (i--) {
							if ((elem = temp[i])) {
								matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
							}
						}
					}

					if (seed) {
						if (postFinder || preFilter) {
							if (postFinder) {
								// Get the final matcherOut by condensing this intermediate into postFinder contexts
								temp = [];
								i = matcherOut.length;
								while (i--) {
									if ((elem = matcherOut[i])) {
										// Restore matcherIn since elem is not yet a final match
										temp.push((matcherIn[i] = elem));
									}
								}
								postFinder(null, (matcherOut = []), temp, xml);
							}

							// Move matched elements from seed to results to keep them synchronized
							i = matcherOut.length;
							while (i--) {
								if ((elem = matcherOut[i]) &&
									(temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

									seed[temp] = !(results[temp] = elem);
								}
							}
						}

						// Add elements to results, through postFinder if defined
					} else {
						matcherOut = condense(
							matcherOut === results ?
								matcherOut.splice(preexisting, matcherOut.length) :
								matcherOut
						);
						if (postFinder) {
							postFinder(null, results, matcherOut, xml);
						} else {
							push.apply(results, matcherOut);
						}
					}
				});
			}

			function matcherFromTokens(tokens) {
				var checkContext, matcher, j,
					len = tokens.length,
					leadingRelative = Expr.relative[tokens[0].type],
					implicitRelative = leadingRelative || Expr.relative[" "],
					i = leadingRelative ? 1 : 0,

					// The foundational matcher ensures that elements are reachable from top-level context(s)
					matchContext = addCombinator(function (elem) {
						return elem === checkContext;
					}, implicitRelative, true),
					matchAnyContext = addCombinator(function (elem) {
						return indexOf(checkContext, elem) > -1;
					}, implicitRelative, true),
					matchers = [function (elem, context, xml) {
						var ret = (!leadingRelative && (xml || context !== outermostContext)) || (
							(checkContext = context).nodeType ?
								matchContext(elem, context, xml) :
								matchAnyContext(elem, context, xml));
						// Avoid hanging onto element (issue #299)
						checkContext = null;
						return ret;
					}];

				for (; i < len; i++) {
					if ((matcher = Expr.relative[tokens[i].type])) {
						matchers = [addCombinator(elementMatcher(matchers), matcher)];
					} else {
						matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

						// Return special upon seeing a positional matcher
						if (matcher[expando]) {
							// Find the next relative operator (if any) for proper handling
							j = ++i;
							for (; j < len; j++) {
								if (Expr.relative[tokens[j].type]) {
									break;
								}
							}
							return setMatcher(
								i > 1 && elementMatcher(matchers),
								i > 1 && toSelector(
									// If the preceding token was a descendant combinator, insert an implicit any-element `*`
									tokens.slice(0, i - 1).concat({
										value: tokens[i - 2].type === " " ? "*" : ""
									})
								).replace(rtrim, "$1"),
								matcher,
								i < j && matcherFromTokens(tokens.slice(i, j)),
								j < len && matcherFromTokens((tokens = tokens.slice(j))),
								j < len && toSelector(tokens)
							);
						}
						matchers.push(matcher);
					}
				}

				return elementMatcher(matchers);
			}

			function matcherFromGroupMatchers(elementMatchers, setMatchers) {
				var bySet = setMatchers.length > 0,
					byElement = elementMatchers.length > 0,
					superMatcher = function (seed, context, xml, results, outermost) {
						var elem, j, matcher,
							matchedCount = 0,
							i = "0",
							unmatched = seed && [],
							setMatched = [],
							contextBackup = outermostContext,
							// We must always have either seed elements or outermost context
							elems = seed || byElement && Expr.find["TAG"]("*", outermost),
							// Use integer dirruns iff this is the outermost matcher
							dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
							len = elems.length;

						if (outermost) {
							outermostContext = context === document || context || outermost;
						}

						// Add elements passing elementMatchers directly to results
						// Support: IE<9, Safari
						// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
						for (; i !== len && (elem = elems[i]) != null; i++) {
							if (byElement && elem) {
								j = 0;
								if (!context && elem.ownerDocument !== document) {
									setDocument(elem);
									xml = !documentIsHTML;
								}
								while ((matcher = elementMatchers[j++])) {
									if (matcher(elem, context || document, xml)) {
										results.push(elem);
										break;
									}
								}
								if (outermost) {
									dirruns = dirrunsUnique;
								}
							}

							// Track unmatched elements for set filters
							if (bySet) {
								// They will have gone through all possible matchers
								if ((elem = !matcher && elem)) {
									matchedCount--;
								}

								// Lengthen the array for every element, matched or not
								if (seed) {
									unmatched.push(elem);
								}
							}
						}

						// `i` is now the count of elements visited above, and adding it to `matchedCount`
						// makes the latter nonnegative.
						matchedCount += i;

						// Apply set filters to unmatched elements
						// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
						// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
						// no element matchers and no seed.
						// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
						// case, which will result in a "00" `matchedCount` that differs from `i` but is also
						// numerically zero.
						if (bySet && i !== matchedCount) {
							j = 0;
							while ((matcher = setMatchers[j++])) {
								matcher(unmatched, setMatched, context, xml);
							}

							if (seed) {
								// Reintegrate element matches to eliminate the need for sorting
								if (matchedCount > 0) {
									while (i--) {
										if (!(unmatched[i] || setMatched[i])) {
											setMatched[i] = pop.call(results);
										}
									}
								}

								// Discard index placeholder values to get only actual matches
								setMatched = condense(setMatched);
							}

							// Add matches to results
							push.apply(results, setMatched);

							// Seedless set matches succeeding multiple successful matchers stipulate sorting
							if (outermost && !seed && setMatched.length > 0 &&
								(matchedCount + setMatchers.length) > 1) {

								Sizzle.uniqueSort(results);
							}
						}

						// Override manipulation of globals by nested matchers
						if (outermost) {
							dirruns = dirrunsUnique;
							outermostContext = contextBackup;
						}

						return unmatched;
					};

				return bySet ?
					markFunction(superMatcher) :
					superMatcher;
			}

			compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
				var i,
					setMatchers = [],
					elementMatchers = [],
					cached = compilerCache[selector + " "];

				if (!cached) {
					// Generate a function of recursive functions that can be used to check each element
					if (!match) {
						match = tokenize(selector);
					}
					i = match.length;
					while (i--) {
						cached = matcherFromTokens(match[i]);
						if (cached[expando]) {
							setMatchers.push(cached);
						} else {
							elementMatchers.push(cached);
						}
					}

					// Cache the compiled function
					cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

					// Save selector and tokenization
					cached.selector = selector;
				}
				return cached;
			};

			/**
			 * A low-level selection function that works with Sizzle's compiled
			 *  selector functions
			 * @param {String|Function} selector A selector or a pre-compiled
			 *  selector function built with Sizzle.compile
			 * @param {Element} context
			 * @param {Array} [results]
			 * @param {Array} [seed] A set of elements to match against
			 */
			select = Sizzle.select = function (selector, context, results, seed) {
				var i, tokens, token, type, find,
					compiled = typeof selector === "function" && selector,
					match = !seed && tokenize((selector = compiled.selector || selector));

				results = results || [];

				// Try to minimize operations if there is only one selector in the list and no seed
				// (the latter of which guarantees us context)
				if (match.length === 1) {

					// Reduce context if the leading compound selector is an ID
					tokens = match[0] = match[0].slice(0);
					if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
						support.getById && context.nodeType === 9 && documentIsHTML &&
						Expr.relative[tokens[1].type]) {

						context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
						if (!context) {
							return results;

							// Precompiled matchers will still verify ancestry, so step up a level
						} else if (compiled) {
							context = context.parentNode;
						}

						selector = selector.slice(tokens.shift().value.length);
					}

					// Fetch a seed set for right-to-left matching
					i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
					while (i--) {
						token = tokens[i];

						// Abort if we hit a combinator
						if (Expr.relative[(type = token.type)]) {
							break;
						}
						if ((find = Expr.find[type])) {
							// Search, expanding context for leading sibling combinators
							if ((seed = find(
								token.matches[0].replace(runescape, funescape),
								rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
							))) {

								// If seed is empty or no tokens remain, we can return early
								tokens.splice(i, 1);
								selector = seed.length && toSelector(tokens);
								if (!selector) {
									push.apply(results, seed);
									return results;
								}

								break;
							}
						}
					}
				}

				// Compile and execute a filtering function if one is not provided
				// Provide `match` to avoid retokenization if we modified the selector above
				(compiled || compile(selector, match))(
					seed,
					context, !documentIsHTML,
					results, !context || rsibling.test(selector) && testContext(context.parentNode) || context
				);
				return results;
			};

			// One-time assignments

			// Sort stability
			support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

			// Support: Chrome 14-35+
			// Always assume duplicates if they aren't passed to the comparison function
			support.detectDuplicates = !!hasDuplicate;

			// Initialize against the default document
			setDocument();

			// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
			// Detached nodes confoundingly follow *each other*
			support.sortDetached = assert(function (div1) {
				// Should return 1, but returns 4 (following)
				return div1.compareDocumentPosition(document.createElement("div")) & 1;
			});

			// Support: IE<8
			// Prevent attribute/property "interpolation"
			// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
			if (!assert(function (div) {
				div.innerHTML = "<a href='#'></a>";
				return div.firstChild.getAttribute("href") === "#";
			})) {
				addHandle("type|href|height|width", function (elem, name, isXML) {
					if (!isXML) {
						return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
					}
				});
			}

			// Support: IE<9
			// Use defaultValue in place of getAttribute("value")
			if (!support.attributes || !assert(function (div) {
				div.innerHTML = "<input/>";
				div.firstChild.setAttribute("value", "");
				return div.firstChild.getAttribute("value") === "";
			})) {
				addHandle("value", function (elem, name, isXML) {
					if (!isXML && elem.nodeName.toLowerCase() === "input") {
						return elem.defaultValue;
					}
				});
			}

			// Support: IE<9
			// Use getAttributeNode to fetch booleans when getAttribute lies
			if (!assert(function (div) {
				return div.getAttribute("disabled") == null;
			})) {
				addHandle(booleans, function (elem, name, isXML) {
					var val;
					if (!isXML) {
						return elem[name] === true ? name.toLowerCase() :
							(val = elem.getAttributeNode(name)) && val.specified ?
								val.value :
								null;
					}
				});
			}

			return Sizzle;

		})(window);



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;



	var dir = function (elem, dir, until) {
		var matched = [],
			truncate = until !== undefined;

		while ((elem = elem[dir]) && elem.nodeType !== 9) {
			if (elem.nodeType === 1) {
				if (truncate && jQuery(elem).is(until)) {
					break;
				}
				matched.push(elem);
			}
		}
		return matched;
	};


	var siblings = function (n, elem) {
		var matched = [];

		for (; n; n = n.nextSibling) {
			if (n.nodeType === 1 && n !== elem) {
				matched.push(n);
			}
		}

		return matched;
	};


	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = (/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/);



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow(elements, qualifier, not) {
		if (jQuery.isFunction(qualifier)) {
			return jQuery.grep(elements, function (elem, i) {
				/* jshint -W018 */
				return !!qualifier.call(elem, i, elem) !== not;
			});

		}

		if (qualifier.nodeType) {
			return jQuery.grep(elements, function (elem) {
				return (elem === qualifier) !== not;
			});

		}

		if (typeof qualifier === "string") {
			if (risSimple.test(qualifier)) {
				return jQuery.filter(qualifier, elements, not);
			}

			qualifier = jQuery.filter(qualifier, elements);
		}

		return jQuery.grep(elements, function (elem) {
			return (indexOf.call(qualifier, elem) > -1) !== not;
		});
	}

	jQuery.filter = function (expr, elems, not) {
		var elem = elems[0];

		if (not) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector(elem, expr) ? [elem] : [] :
			jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
				return elem.nodeType === 1;
			}));
	};

	jQuery.fn.extend({
		find: function (selector) {
			var i,
				len = this.length,
				ret = [],
				self = this;

			if (typeof selector !== "string") {
				return this.pushStack(jQuery(selector).filter(function () {
					for (i = 0; i < len; i++) {
						if (jQuery.contains(self[i], this)) {
							return true;
						}
					}
				}));
			}

			for (i = 0; i < len; i++) {
				jQuery.find(selector, self[i], ret);
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function (selector) {
			return this.pushStack(winnow(this, selector || [], false));
		},
		not: function (selector) {
			return this.pushStack(winnow(this, selector || [], true));
		},
		is: function (selector) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test(selector) ?
					jQuery(selector) :
					selector || [],
				false
			).length;
		}
	});


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

		init = jQuery.fn.init = function (selector, context, root) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if (!selector) {
				return this;
			}

			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;

			// Handle HTML strings
			if (typeof selector === "string") {
				if (selector[0] === "<" &&
					selector[selector.length - 1] === ">" &&
					selector.length >= 3) {

					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [null, selector, null];

				} else {
					match = rquickExpr.exec(selector);
				}

				// Match html or make sure no context is specified for #id
				if (match && (match[1] || !context)) {

					// HANDLE: $(html) -> $(array)
					if (match[1]) {
						context = context instanceof jQuery ? context[0] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge(this, jQuery.parseHTML(
							match[1],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						));

						// HANDLE: $(html, props)
						if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
							for (match in context) {

								// Properties of context are called as methods if possible
								if (jQuery.isFunction(this[match])) {
									this[match](context[match]);

									// ...and otherwise set as attributes
								} else {
									this.attr(match, context[match]);
								}
							}
						}

						return this;

						// HANDLE: $(#id)
					} else {
						elem = document.getElementById(match[2]);

						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if (elem && elem.parentNode) {

							// Inject the element directly into the jQuery object
							this.length = 1;
							this[0] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

					// HANDLE: $(expr, $(...))
				} else if (!context || context.jquery) {
					return (context || root).find(selector);

					// HANDLE: $(expr, context)
					// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor(context).find(selector);
				}

				// HANDLE: $(DOMElement)
			} else if (selector.nodeType) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;

				// HANDLE: $(function)
				// Shortcut for document ready
			} else if (jQuery.isFunction(selector)) {
				return root.ready !== undefined ?
					root.ready(selector) :

					// Execute immediately if ready is not present
					selector(jQuery);
			}

			if (selector.selector !== undefined) {
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray(selector, this);
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery(document);


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,

		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.fn.extend({
		has: function (target) {
			var targets = jQuery(target, this),
				l = targets.length;

			return this.filter(function () {
				var i = 0;
				for (; i < l; i++) {
					if (jQuery.contains(this, targets[i])) {
						return true;
					}
				}
			});
		},

		closest: function (selectors, context) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test(selectors) || typeof selectors !== "string" ?
					jQuery(selectors, context || this.context) :
					0;

			for (; i < l; i++) {
				for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

					// Always skip document fragments
					if (cur.nodeType < 11 && (pos ?
						pos.index(cur) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors))) {

						matched.push(cur);
						break;
					}
				}
			}

			return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
		},

		// Determine the position of an element within the set
		index: function (elem) {

			// No argument, return index in parent
			if (!elem) {
				return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if (typeof elem === "string") {
				return indexOf.call(jQuery(elem), this[0]);
			}

			// Locate the position of the desired element
			return indexOf.call(this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[0] : elem
			);
		},

		add: function (selector, context) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge(this.get(), jQuery(selector, context))
				)
			);
		},

		addBack: function (selector) {
			return this.add(selector == null ?
				this.prevObject : this.prevObject.filter(selector)
			);
		}
	});

	function sibling(cur, dir) {
		while ((cur = cur[dir]) && cur.nodeType !== 1) { }
		return cur;
	}

	jQuery.each({
		parent: function (elem) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function (elem) {
			return dir(elem, "parentNode");
		},
		parentsUntil: function (elem, i, until) {
			return dir(elem, "parentNode", until);
		},
		next: function (elem) {
			return sibling(elem, "nextSibling");
		},
		prev: function (elem) {
			return sibling(elem, "previousSibling");
		},
		nextAll: function (elem) {
			return dir(elem, "nextSibling");
		},
		prevAll: function (elem) {
			return dir(elem, "previousSibling");
		},
		nextUntil: function (elem, i, until) {
			return dir(elem, "nextSibling", until);
		},
		prevUntil: function (elem, i, until) {
			return dir(elem, "previousSibling", until);
		},
		siblings: function (elem) {
			return siblings((elem.parentNode || {}).firstChild, elem);
		},
		children: function (elem) {
			return siblings(elem.firstChild);
		},
		contents: function (elem) {
			return elem.contentDocument || jQuery.merge([], elem.childNodes);
		}
	}, function (name, fn) {
		jQuery.fn[name] = function (until, selector) {
			var matched = jQuery.map(this, fn, until);

			if (name.slice(-5) !== "Until") {
				selector = until;
			}

			if (selector && typeof selector === "string") {
				matched = jQuery.filter(selector, matched);
			}

			if (this.length > 1) {

				// Remove duplicates
				if (!guaranteedUnique[name]) {
					jQuery.uniqueSort(matched);
				}

				// Reverse order for parents* and prev-derivatives
				if (rparentsprev.test(name)) {
					matched.reverse();
				}
			}

			return this.pushStack(matched);
		};
	});
	var rnotwhite = (/\S+/g);



	// Convert String-formatted options into Object-formatted ones
	function createOptions(options) {
		var object = {};
		jQuery.each(options.match(rnotwhite) || [], function (_, flag) {
			object[flag] = true;
		});
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function (options) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions(options) :
			jQuery.extend({}, options);

		var // Flag to know if list is currently firing
			firing,

			// Last fire value for non-forgettable lists
			memory,

			// Flag to know if list was already fired
			fired,

			// Flag to prevent firing
			locked,

			// Actual callback list
			list = [],

			// Queue of execution data for repeatable lists
			queue = [],

			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,

			// Fire callbacks
			fire = function () {

				// Enforce single-firing
				locked = options.once;

				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for (; queue.length; firingIndex = -1) {
					memory = queue.shift();
					while (++firingIndex < list.length) {

						// Run callback and check for early termination
						if (list[firingIndex].apply(memory[0], memory[1]) === false &&
							options.stopOnFalse) {

							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}

				// Forget the data if we're done with it
				if (!options.memory) {
					memory = false;
				}

				firing = false;

				// Clean up if we're done firing for good
				if (locked) {

					// Keep an empty list if we have data for future add calls
					if (memory) {
						list = [];

						// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},

			// Actual Callbacks object
			self = {

				// Add a callback or a collection of callbacks to the list
				add: function () {
					if (list) {

						// If we have memory from a past run, we should fire after adding
						if (memory && !firing) {
							firingIndex = list.length - 1;
							queue.push(memory);
						}

						(function add(args) {
							jQuery.each(args, function (_, arg) {
								if (jQuery.isFunction(arg)) {
									if (!options.unique || !self.has(arg)) {
										list.push(arg);
									}
								} else if (arg && arg.length && jQuery.type(arg) !== "string") {

									// Inspect recursively
									add(arg);
								}
							});
						})(arguments);

						if (memory && !firing) {
							fire();
						}
					}
					return this;
				},

				// Remove a callback from the list
				remove: function () {
					jQuery.each(arguments, function (_, arg) {
						var index;
						while ((index = jQuery.inArray(arg, list, index)) > -1) {
							list.splice(index, 1);

							// Handle firing indexes
							if (index <= firingIndex) {
								firingIndex--;
							}
						}
					});
					return this;
				},

				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function (fn) {
					return fn ?
						jQuery.inArray(fn, list) > -1 :
						list.length > 0;
				},

				// Remove all callbacks from the list
				empty: function () {
					if (list) {
						list = [];
					}
					return this;
				},

				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function () {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function () {
					return !list;
				},

				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function () {
					locked = queue = [];
					if (!memory) {
						list = memory = "";
					}
					return this;
				},
				locked: function () {
					return !!locked;
				},

				// Call all callbacks with the given context and arguments
				fireWith: function (context, args) {
					if (!locked) {
						args = args || [];
						args = [context, args.slice ? args.slice() : args];
						queue.push(args);
						if (!firing) {
							fire();
						}
					}
					return this;
				},

				// Call all the callbacks with the given arguments
				fire: function () {
					self.fireWith(this, arguments);
					return this;
				},

				// To know if the callbacks have already been called at least once
				fired: function () {
					return !!fired;
				}
			};

		return self;
	};


	jQuery.extend({

		Deferred: function (func) {
			var tuples = [

				// action, add listener, listener list, final state
				["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
				["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
				["notify", "progress", jQuery.Callbacks("memory")]
			],
				state = "pending",
				promise = {
					state: function () {
						return state;
					},
					always: function () {
						deferred.done(arguments).fail(arguments);
						return this;
					},
					then: function ( /* fnDone, fnFail, fnProgress */) {
						var fns = arguments;
						return jQuery.Deferred(function (newDefer) {
							jQuery.each(tuples, function (i, tuple) {
								var fn = jQuery.isFunction(fns[i]) && fns[i];

								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[tuple[1]](function () {
									var returned = fn && fn.apply(this, arguments);
									if (returned && jQuery.isFunction(returned.promise)) {
										returned.promise()
											.progress(newDefer.notify)
											.done(newDefer.resolve)
											.fail(newDefer.reject);
									} else {
										newDefer[tuple[0] + "With"](
											this === promise ? newDefer.promise() : this,
											fn ? [returned] : arguments
										);
									}
								});
							});
							fns = null;
						}).promise();
					},

					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function (obj) {
						return obj != null ? jQuery.extend(obj, promise) : promise;
					}
				},
				deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			jQuery.each(tuples, function (i, tuple) {
				var list = tuple[2],
					stateString = tuple[3];

				// promise[ done | fail | progress ] = list.add
				promise[tuple[1]] = list.add;

				// Handle state
				if (stateString) {
					list.add(function () {

						// state = [ resolved | rejected ]
						state = stateString;

						// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[i ^ 1][2].disable, tuples[2][2].lock);
				}

				// deferred[ resolve | reject | notify ]
				deferred[tuple[0]] = function () {
					deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
					return this;
				};
				deferred[tuple[0] + "With"] = list.fireWith;
			});

			// Make the deferred a promise
			promise.promise(deferred);

			// Call given func if any
			if (func) {
				func.call(deferred, deferred);
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function (subordinate /* , ..., subordinateN */) {
			var i = 0,
				resolveValues = slice.call(arguments),
				length = resolveValues.length,

				// the count of uncompleted subordinates
				remaining = length !== 1 ||
					(subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,

				// the master Deferred.
				// If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

				// Update function for both resolve and progress values
				updateFunc = function (i, contexts, values) {
					return function (value) {
						contexts[i] = this;
						values[i] = arguments.length > 1 ? slice.call(arguments) : value;
						if (values === progressValues) {
							deferred.notifyWith(contexts, values);
						} else if (!(--remaining)) {
							deferred.resolveWith(contexts, values);
						}
					};
				},

				progressValues, progressContexts, resolveContexts;

			// Add listeners to Deferred subordinates; treat others as resolved
			if (length > 1) {
				progressValues = new Array(length);
				progressContexts = new Array(length);
				resolveContexts = new Array(length);
				for (; i < length; i++) {
					if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
						resolveValues[i].promise()
							.progress(updateFunc(i, progressContexts, progressValues))
							.done(updateFunc(i, resolveContexts, resolveValues))
							.fail(deferred.reject);
					} else {
						--remaining;
					}
				}
			}

			// If we're not waiting on anything, resolve the master
			if (!remaining) {
				deferred.resolveWith(resolveContexts, resolveValues);
			}

			return deferred.promise();
		}
	});


	// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function (fn) {

		// Add the callback
		jQuery.ready.promise().done(fn);

		return this;
	};

	jQuery.extend({

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function (hold) {
			if (hold) {
				jQuery.readyWait++;
			} else {
				jQuery.ready(true);
			}
		},

		// Handle when the DOM is ready
		ready: function (wait) {

			// Abort if there are pending holds or we're already ready
			if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if (wait !== true && --jQuery.readyWait > 0) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith(document, [jQuery]);

			// Trigger any bound ready events
			if (jQuery.fn.triggerHandler) {
				jQuery(document).triggerHandler("ready");
				jQuery(document).off("ready");
			}
		}
	});

	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener("DOMContentLoaded", completed);
		window.removeEventListener("load", completed);
		jQuery.ready();
	}

	jQuery.ready.promise = function (obj) {
		if (!readyList) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called
			// after the browser event has already occurred.
			// Support: IE9-10 only
			// Older IE sometimes signals "interactive" too soon
			if (document.readyState === "complete" ||
				(document.readyState !== "loading" && !document.documentElement.doScroll)) {

				// Handle it asynchronously to allow scripts the opportunity to delay ready
				window.setTimeout(jQuery.ready);

			} else {

				// Use the handy event callback
				document.addEventListener("DOMContentLoaded", completed);

				// A fallback to window.onload, that will always work
				window.addEventListener("load", completed);
			}
		}
		return readyList.promise(obj);
	};

	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if (jQuery.type(key) === "object") {
			chainable = true;
			for (i in key) {
				access(elems, fn, i, key[i], true, emptyGet, raw);
			}

			// Sets one value
		} else if (value !== undefined) {
			chainable = true;

			if (!jQuery.isFunction(value)) {
				raw = true;
			}

			if (bulk) {

				// Bulk operations run against the entire set
				if (raw) {
					fn.call(elems, value);
					fn = null;

					// ...except when executing function values
				} else {
					bulk = fn;
					fn = function (elem, key, value) {
						return bulk.call(jQuery(elem), value);
					};
				}
			}

			if (fn) {
				for (; i < len; i++) {
					fn(
						elems[i], key, raw ?
						value :
						value.call(elems[i], i, fn(elems[i], key))
					);
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call(elems) :
				len ? fn(elems[0], key) : emptyGet;
	};
	var acceptData = function (owner) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
	};




	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		register: function (owner, initial) {
			var value = initial || {};

			// If it is a node unlikely to be stringify-ed or looped over
			// use plain assignment
			if (owner.nodeType) {
				owner[this.expando] = value;

				// Otherwise secure it in a non-enumerable, non-writable property
				// configurability must be true to allow the property to be
				// deleted with the delete operator
			} else {
				Object.defineProperty(owner, this.expando, {
					value: value,
					writable: true,
					configurable: true
				});
			}
			return owner[this.expando];
		},
		cache: function (owner) {

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if (!acceptData(owner)) {
				return {};
			}

			// Check if the owner object already has a cache
			var value = owner[this.expando];

			// If not, create one
			if (!value) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if (acceptData(owner)) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if (owner.nodeType) {
						owner[this.expando] = value;

						// Otherwise secure it in a non-enumerable property
						// configurable must be true to allow the property to be
						// deleted when data is removed
					} else {
						Object.defineProperty(owner, this.expando, {
							value: value,
							configurable: true
						});
					}
				}
			}

			return value;
		},
		set: function (owner, data, value) {
			var prop,
				cache = this.cache(owner);

			// Handle: [ owner, key, value ] args
			if (typeof data === "string") {
				cache[data] = value;

				// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for (prop in data) {
					cache[prop] = data[prop];
				}
			}
			return cache;
		},
		get: function (owner, key) {
			return key === undefined ?
				this.cache(owner) :
				owner[this.expando] && owner[this.expando][key];
		},
		access: function (owner, key, value) {
			var stored;

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if (key === undefined ||
				((key && typeof key === "string") && value === undefined)) {

				stored = this.get(owner, key);

				return stored !== undefined ?
					stored : this.get(owner, jQuery.camelCase(key));
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set(owner, key, value);

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function (owner, key) {
			var i, name, camel,
				cache = owner[this.expando];

			if (cache === undefined) {
				return;
			}

			if (key === undefined) {
				this.register(owner);

			} else {

				// Support array or space separated string of keys
				if (jQuery.isArray(key)) {

					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat(key.map(jQuery.camelCase));
				} else {
					camel = jQuery.camelCase(key);

					// Try the string as a key before any manipulation
					if (key in cache) {
						name = [key, camel];
					} else {

						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ? [name] : (name.match(rnotwhite) || []);
					}
				}

				i = name.length;

				while (i--) {
					delete cache[name[i]];
				}
			}

			// Remove the expando if there's no more data
			if (key === undefined || jQuery.isEmptyObject(cache)) {

				// Support: Chrome <= 35-45+
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://code.google.com/p/chromium/issues/detail?id=378607
				if (owner.nodeType) {
					owner[this.expando] = undefined;
				} else {
					delete owner[this.expando];
				}
			}
		},
		hasData: function (owner) {
			var cache = owner[this.expando];
			return cache !== undefined && !jQuery.isEmptyObject(cache);
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();



	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;

	function dataAttr(elem, key, data) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if (data === undefined && elem.nodeType === 1) {
			name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
			data = elem.getAttribute(name);

			if (typeof data === "string") {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
							data === "null" ? null :

								// Only convert to a number if it doesn't change the string
								+data + "" === data ? +data :
									rbrace.test(data) ? jQuery.parseJSON(data) :
										data;
				} catch (e) { }

				// Make sure we set the data so it isn't changed later
				dataUser.set(elem, key, data);
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend({
		hasData: function (elem) {
			return dataUser.hasData(elem) || dataPriv.hasData(elem);
		},

		data: function (elem, name, data) {
			return dataUser.access(elem, name, data);
		},

		removeData: function (elem, name) {
			dataUser.remove(elem, name);
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function (elem, name, data) {
			return dataPriv.access(elem, name, data);
		},

		_removeData: function (elem, name) {
			dataPriv.remove(elem, name);
		}
	});

	jQuery.fn.extend({
		data: function (key, value) {
			var i, name, data,
				elem = this[0],
				attrs = elem && elem.attributes;

			// Gets all values
			if (key === undefined) {
				if (this.length) {
					data = dataUser.get(elem);

					if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
						i = attrs.length;
						while (i--) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if (attrs[i]) {
								name = attrs[i].name;
								if (name.indexOf("data-") === 0) {
									name = jQuery.camelCase(name.slice(5));
									dataAttr(elem, name, data[name]);
								}
							}
						}
						dataPriv.set(elem, "hasDataAttrs", true);
					}
				}

				return data;
			}

			// Sets multiple values
			if (typeof key === "object") {
				return this.each(function () {
					dataUser.set(this, key);
				});
			}

			return access(this, function (value) {
				var data, camelKey;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if (elem && value === undefined) {

					// Attempt to get data from the cache
					// with the key as-is
					data = dataUser.get(elem, key) ||

						// Try to find dashed key if it exists (gh-2779)
						// This is for 2.2.x only
						dataUser.get(elem, key.replace(rmultiDash, "-$&").toLowerCase());

					if (data !== undefined) {
						return data;
					}

					camelKey = jQuery.camelCase(key);

					// Attempt to get data from the cache
					// with the key camelized
					data = dataUser.get(elem, camelKey);
					if (data !== undefined) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr(elem, camelKey, undefined);
					if (data !== undefined) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				camelKey = jQuery.camelCase(key);
				this.each(function () {

					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = dataUser.get(this, camelKey);

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					dataUser.set(this, camelKey, value);

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if (key.indexOf("-") > -1 && data !== undefined) {
						dataUser.set(this, key, value);
					}
				});
			}, null, value, arguments.length > 1, null, true);
		},

		removeData: function (key) {
			return this.each(function () {
				dataUser.remove(this, key);
			});
		}
	});


	jQuery.extend({
		queue: function (elem, type, data) {
			var queue;

			if (elem) {
				type = (type || "fx") + "queue";
				queue = dataPriv.get(elem, type);

				// Speed up dequeue by getting out quickly if this is just a lookup
				if (data) {
					if (!queue || jQuery.isArray(data)) {
						queue = dataPriv.access(elem, type, jQuery.makeArray(data));
					} else {
						queue.push(data);
					}
				}
				return queue || [];
			}
		},

		dequeue: function (elem, type) {
			type = type || "fx";

			var queue = jQuery.queue(elem, type),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks(elem, type),
				next = function () {
					jQuery.dequeue(elem, type);
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if (fn === "inprogress") {
				fn = queue.shift();
				startLength--;
			}

			if (fn) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if (type === "fx") {
					queue.unshift("inprogress");
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call(elem, next, hooks);
			}

			if (!startLength && hooks) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function (elem, type) {
			var key = type + "queueHooks";
			return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
				empty: jQuery.Callbacks("once memory").add(function () {
					dataPriv.remove(elem, [type + "queue", key]);
				})
			});
		}
	});

	jQuery.fn.extend({
		queue: function (type, data) {
			var setter = 2;

			if (typeof type !== "string") {
				data = type;
				type = "fx";
				setter--;
			}

			if (arguments.length < setter) {
				return jQuery.queue(this[0], type);
			}

			return data === undefined ?
				this :
				this.each(function () {
					var queue = jQuery.queue(this, type, data);

					// Ensure a hooks for this queue
					jQuery._queueHooks(this, type);

					if (type === "fx" && queue[0] !== "inprogress") {
						jQuery.dequeue(this, type);
					}
				});
		},
		dequeue: function (type) {
			return this.each(function () {
				jQuery.dequeue(this, type);
			});
		},
		clearQueue: function (type) {
			return this.queue(type || "fx", []);
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function (type, obj) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function () {
					if (!(--count)) {
						defer.resolveWith(elements, [elements]);
					}
				};

			if (typeof type !== "string") {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while (i--) {
				tmp = dataPriv.get(elements[i], type + "queueHooks");
				if (tmp && tmp.empty) {
					count++;
					tmp.empty.add(resolve);
				}
			}
			resolve();
			return defer.promise(obj);
		}
	});
	var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

	var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");


	var cssExpand = ["Top", "Right", "Bottom", "Left"];

	var isHidden = function (elem, el) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css(elem, "display") === "none" ||
			!jQuery.contains(elem.ownerDocument, elem);
	};



	function adjustCSS(elem, prop, valueParts, tween) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function () {
					return tween.cur();
				} :
				function () {
					return jQuery.css(elem, prop, "");
				},
			initial = currentValue(),
			unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),

			// Starting value computation is required for potential unit mismatches
			initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) &&
				rcssNum.exec(jQuery.css(elem, prop));

		if (initialInUnit && initialInUnit[3] !== unit) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[3];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style(elem, prop, initialInUnit + unit);

				// Update scale, tolerating zero or NaN from tween.cur()
				// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations
			);
		}

		if (valueParts) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[1] ?
				initialInUnit + (valueParts[1] + 1) * valueParts[2] :
				+valueParts[2];
			if (tween) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	var rcheckableType = (/^(?:checkbox|radio)$/i);

	var rtagName = (/<([\w:-]+)/);

	var rscriptType = (/^$|\/(?:java|ecma)script/i);



	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE9
		option: [1, "<select multiple='multiple'>", "</select>"],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [1, "<table>", "</table>"],
		col: [2, "<table><colgroup>", "</colgroup></table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

		_default: [0, "", ""]
	};

	// Support: IE9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;


	function getAll(context, tag) {

		// Support: IE9-11+
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName(tag || "*") :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll(tag || "*") : [];

		return tag === undefined || tag && jQuery.nodeName(context, tag) ?
			jQuery.merge([context], ret) :
			ret;
	}


	// Mark scripts as having already been evaluated
	function setGlobalEval(elems, refElements) {
		var i = 0,
			l = elems.length;

		for (; i < l; i++) {
			dataPriv.set(
				elems[i],
				"globalEval", !refElements || dataPriv.get(refElements[i], "globalEval")
			);
		}
	}


	var rhtml = /<|&#?\w+;/;

	function buildFragment(elems, context, scripts, selection, ignored) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for (; i < l; i++) {
			elem = elems[i];

			if (elem || elem === 0) {

				// Add nodes directly
				if (jQuery.type(elem) === "object") {

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

					// Convert non-html into a text node
				} else if (!rhtml.test(elem)) {
					nodes.push(context.createTextNode(elem));

					// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild(context.createElement("div"));

					// Deserialize a standard representation
					tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
					wrap = wrapMap[tag] || wrapMap._default;
					tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while (j--) {
						tmp = tmp.lastChild;
					}

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, tmp.childNodes);

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ((elem = nodes[i++])) {

			// Skip elements already in the context collection (trac-4087)
			if (selection && jQuery.inArray(elem, selection) > -1) {
				if (ignored) {
					ignored.push(elem);
				}
				continue;
			}

			contains = jQuery.contains(elem.ownerDocument, elem);

			// Append to fragment
			tmp = getAll(fragment.appendChild(elem), "script");

			// Preserve script evaluation history
			if (contains) {
				setGlobalEval(tmp);
			}

			// Capture executables
			if (scripts) {
				j = 0;
				while ((elem = tmp[j++])) {
					if (rscriptType.test(elem.type || "")) {
						scripts.push(elem);
					}
				}
			}
		}

		return fragment;
	}


	(function () {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild(document.createElement("div")),
			input = document.createElement("input");

		// Support: Android 4.0-4.3, Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute("type", "radio");
		input.setAttribute("checked", "checked");
		input.setAttribute("name", "t");

		div.appendChild(input);

		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
	})();


	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE9
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch (err) { }
	}

	function on(elem, types, selector, data, fn, one) {
		var origFn, type;

		// Types can be a map of types/handlers
		if (typeof types === "object") {

			// ( types-Object, selector, data )
			if (typeof selector !== "string") {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for (type in types) {
				on(elem, type, selector, data, types[type], one);
			}
			return elem;
		}

		if (data == null && fn == null) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if (fn == null) {
			if (typeof selector === "string") {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if (fn === false) {
			fn = returnFalse;
		} else if (!fn) {
			return elem;
		}

		if (one === 1) {
			origFn = fn;
			fn = function (event) {

				// Can use an empty set, since event contains the info
				jQuery().off(event);
				return origFn.apply(this, arguments);
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
		}
		return elem.each(function () {
			jQuery.event.add(this, types, fn, data, selector);
		});
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function (elem, types, handler, data, selector) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get(elem);

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if (!elemData) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if (handler.handler) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if (!handler.guid) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if (!(events = elemData.events)) {
				events = elemData.events = {};
			}
			if (!(eventHandle = elemData.handle)) {
				eventHandle = elemData.handle = function (e) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply(elem, arguments) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = (types || "").match(rnotwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// There *must* be a type, no attaching namespace-only handlers
				if (!type) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[type] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = (selector ? special.delegateType : special.bindType) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[type] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test(selector),
					namespace: namespaces.join(".")
				}, handleObjIn);

				// Init the event handler queue if we're the first
				if (!(handlers = events[type])) {
					handlers = events[type] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if (!special.setup ||
						special.setup.call(elem, data, namespaces, eventHandle) === false) {

						if (elem.addEventListener) {
							elem.addEventListener(type, eventHandle);
						}
					}
				}

				if (special.add) {
					special.add.call(elem, handleObj);

					if (!handleObj.handler.guid) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if (selector) {
					handlers.splice(handlers.delegateCount++, 0, handleObj);
				} else {
					handlers.push(handleObj);
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[type] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function (elem, types, handler, selector, mappedTypes) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

			if (!elemData || !(events = elemData.events)) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = (types || "").match(rnotwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// Unbind all events (on this namespace, if provided) for the element
				if (!type) {
					for (type in events) {
						jQuery.event.remove(elem, type + types[t], handler, selector, true);
					}
					continue;
				}

				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				handlers = events[type] || [];
				tmp = tmp[2] &&
					new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

				// Remove matching events
				origCount = j = handlers.length;
				while (j--) {
					handleObj = handlers[j];

					if ((mappedTypes || origType === handleObj.origType) &&
						(!handler || handler.guid === handleObj.guid) &&
						(!tmp || tmp.test(handleObj.namespace)) &&
						(!selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector)) {
						handlers.splice(j, 1);

						if (handleObj.selector) {
							handlers.delegateCount--;
						}
						if (special.remove) {
							special.remove.call(elem, handleObj);
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if (origCount && !handlers.length) {
					if (!special.teardown ||
						special.teardown.call(elem, namespaces, elemData.handle) === false) {

						jQuery.removeEvent(elem, type, elemData.handle);
					}

					delete events[type];
				}
			}

			// Remove data and the expando if it's no longer used
			if (jQuery.isEmptyObject(events)) {
				dataPriv.remove(elem, "handle events");
			}
		},

		dispatch: function (event) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix(event);

			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call(arguments),
				handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
				special = jQuery.event.special[event.type] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if (special.preDispatch && special.preDispatch.call(this, event) === false) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call(this, event, handlers);

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
				event.currentTarget = matched.elem;

				j = 0;
				while ((handleObj = matched.handlers[j++]) &&
					!event.isImmediatePropagationStopped()) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ((jQuery.event.special[handleObj.origType] || {}).handle ||
							handleObj.handler).apply(matched.elem, args);

						if (ret !== undefined) {
							if ((event.result = ret) === false) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if (special.postDispatch) {
				special.postDispatch.call(this, event);
			}

			return event.result;
		},

		handlers: function (event, handlers) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Support (at least): Chrome, IE9
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			//
			// Support: Firefox<=42+
			// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
			if (delegateCount && cur.nodeType &&
				(event.type !== "click" || isNaN(event.button) || event.button < 1)) {

				for (; cur !== this; cur = cur.parentNode || this) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
						matches = [];
						for (i = 0; i < delegateCount; i++) {
							handleObj = handlers[i];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if (matches[sel] === undefined) {
								matches[sel] = handleObj.needsContext ?
									jQuery(sel, this).index(cur) > -1 :
									jQuery.find(sel, this, null, [cur]).length;
							}
							if (matches[sel]) {
								matches.push(handleObj);
							}
						}
						if (matches.length) {
							handlerQueue.push({
								elem: cur,
								handlers: matches
							});
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if (delegateCount < handlers.length) {
				handlerQueue.push({
					elem: this,
					handlers: handlers.slice(delegateCount)
				});
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: ("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
			"metaKey relatedTarget shiftKey target timeStamp view which").split(" "),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function (event, original) {

				// Add which for key events
				if (event.which == null) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: ("button buttons clientX clientY offsetX offsetY pageX pageY " +
				"screenX screenY toElement").split(" "),
			filter: function (event, original) {
				var eventDoc, doc, body,
					button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if (event.pageX == null && original.clientX != null) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX +
						(doc && doc.scrollLeft || body && body.scrollLeft || 0) -
						(doc && doc.clientLeft || body && body.clientLeft || 0);
					event.pageY = original.clientY +
						(doc && doc.scrollTop || body && body.scrollTop || 0) -
						(doc && doc.clientTop || body && body.clientTop || 0);
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if (!event.which && button !== undefined) {
					event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
				}

				return event;
			}
		},

		fix: function (event) {
			if (event[jQuery.expando]) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[type];

			if (!fixHook) {
				this.fixHooks[type] = fixHook =
					rmouseEvent.test(type) ? this.mouseHooks :
						rkeyEvent.test(type) ? this.keyHooks : {};
			}
			copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;

			event = new jQuery.Event(originalEvent);

			i = copy.length;
			while (i--) {
				prop = copy[i];
				event[prop] = originalEvent[prop];
			}

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if (!event.target) {
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if (event.target.nodeType === 3) {
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function () {
					if (this !== safeActiveElement() && this.focus) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function () {
					if (this === safeActiveElement() && this.blur) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function () {
					if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function (event) {
					return jQuery.nodeName(event.target, "a");
				}
			},

			beforeunload: {
				postDispatch: function (event) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if (event.result !== undefined && event.originalEvent) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function (elem, type, handle) {

		// This "if" is needed for plain objects
		if (elem.removeEventListener) {
			elem.removeEventListener(type, handle);
		}
	};

	jQuery.Event = function (src, props) {

		// Allow instantiation without the 'new' keyword
		if (!(this instanceof jQuery.Event)) {
			return new jQuery.Event(src, props);
		}

		// Event object
		if (src && src.type) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android<4.0
				src.returnValue === false ?
				returnTrue :
				returnFalse;

			// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if (props) {
			jQuery.extend(this, props);
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[jQuery.expando] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,

		preventDefault: function () {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if (e) {
				e.preventDefault();
			}
		},
		stopPropagation: function () {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if (e) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function () {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if (e) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://code.google.com/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function (orig, fix) {
		jQuery.event.special[orig] = {
			delegateType: fix,
			bindType: fix,

			handle: function (event) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if (!related || (related !== target && !jQuery.contains(target, related))) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply(this, arguments);
					event.type = fix;
				}
				return ret;
			}
		};
	});

	jQuery.fn.extend({
		on: function (types, selector, data, fn) {
			return on(this, types, selector, data, fn);
		},
		one: function (types, selector, data, fn) {
			return on(this, types, selector, data, fn, 1);
		},
		off: function (types, selector, fn) {
			var handleObj, type;
			if (types && types.preventDefault && types.handleObj) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery(types.delegateTarget).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if (typeof types === "object") {

				// ( types-object [, selector] )
				for (type in types) {
					this.off(type, selector, types[type]);
				}
				return this;
			}
			if (selector === false || typeof selector === "function") {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if (fn === false) {
				fn = returnFalse;
			}
			return this.each(function () {
				jQuery.event.remove(this, types, fn, selector);
			});
		}
	});


	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

		// Support: IE 10-11, Edge 10240+
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,

		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	// Manipulating tables requires a tbody
	function manipulationTarget(elem, content) {
		return jQuery.nodeName(elem, "table") &&
			jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ?

			elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild(elem.ownerDocument.createElement("tbody")) :
			elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript(elem) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}

	function restoreScript(elem) {
		var match = rscriptTypeMasked.exec(elem.type);

		if (match) {
			elem.type = match[1];
		} else {
			elem.removeAttribute("type");
		}

		return elem;
	}

	function cloneCopyEvent(src, dest) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if (dest.nodeType !== 1) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if (dataPriv.hasData(src)) {
			pdataOld = dataPriv.access(src);
			pdataCur = dataPriv.set(dest, pdataOld);
			events = pdataOld.events;

			if (events) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for (type in events) {
					for (i = 0, l = events[type].length; i < l; i++) {
						jQuery.event.add(dest, type, events[type][i]);
					}
				}
			}
		}

		// 2. Copy user data
		if (dataUser.hasData(src)) {
			udataOld = dataUser.access(src);
			udataCur = jQuery.extend({}, udataOld);

			dataUser.set(dest, udataCur);
		}
	}

	// Fix IE bugs, see support tests
	function fixInput(src, dest) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if (nodeName === "input" && rcheckableType.test(src.type)) {
			dest.checked = src.checked;

			// Fails to return the selected option to the default selected state when cloning options
		} else if (nodeName === "input" || nodeName === "textarea") {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip(collection, args, callback, ignored) {

		// Flatten any nested arrays
		args = concat.apply([], args);

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction(value);

		// We can't cloneNode fragments that contain checked, in WebKit
		if (isFunction ||
			(l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test(value))) {
			return collection.each(function (index) {
				var self = collection.eq(index);
				if (isFunction) {
					args[0] = value.call(this, index, self.html());
				}
				domManip(self, args, callback, ignored);
			});
		}

		if (l) {
			fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
			first = fragment.firstChild;

			if (fragment.childNodes.length === 1) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if (first || ignored) {
				scripts = jQuery.map(getAll(fragment, "script"), disableScript);
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for (; i < l; i++) {
					node = fragment;

					if (i !== iNoClone) {
						node = jQuery.clone(node, true, true);

						// Keep references to cloned scripts for later restoration
						if (hasScripts) {

							// Support: Android<4.1, PhantomJS<2
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge(scripts, getAll(node, "script"));
						}
					}

					callback.call(collection[i], node, i);
				}

				if (hasScripts) {
					doc = scripts[scripts.length - 1].ownerDocument;

					// Reenable scripts
					jQuery.map(scripts, restoreScript);

					// Evaluate executable scripts on first document insertion
					for (i = 0; i < hasScripts; i++) {
						node = scripts[i];
						if (rscriptType.test(node.type || "") &&
							!dataPriv.access(node, "globalEval") &&
							jQuery.contains(doc, node)) {

							if (node.src) {

								// Optional AJAX dependency, but won't run scripts if not present
								if (jQuery._evalUrl) {
									jQuery._evalUrl(node.src);
								}
							} else {
								jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function remove(elem, selector, keepData) {
		var node,
			nodes = selector ? jQuery.filter(selector, elem) : elem,
			i = 0;

		for (;
			(node = nodes[i]) != null; i++) {
			if (!keepData && node.nodeType === 1) {
				jQuery.cleanData(getAll(node));
			}

			if (node.parentNode) {
				if (keepData && jQuery.contains(node.ownerDocument, node)) {
					setGlobalEval(getAll(node, "script"));
				}
				node.parentNode.removeChild(node);
			}
		}

		return elem;
	}

	jQuery.extend({
		htmlPrefilter: function (html) {
			return html.replace(rxhtmlTag, "<$1></$2>");
		},

		clone: function (elem, dataAndEvents, deepDataAndEvents) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode(true),
				inPage = jQuery.contains(elem.ownerDocument, elem);

			// Fix IE cloning issues
			if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) &&
				!jQuery.isXMLDoc(elem)) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll(clone);
				srcElements = getAll(elem);

				for (i = 0, l = srcElements.length; i < l; i++) {
					fixInput(srcElements[i], destElements[i]);
				}
			}

			// Copy the events from the original to the clone
			if (dataAndEvents) {
				if (deepDataAndEvents) {
					srcElements = srcElements || getAll(elem);
					destElements = destElements || getAll(clone);

					for (i = 0, l = srcElements.length; i < l; i++) {
						cloneCopyEvent(srcElements[i], destElements[i]);
					}
				} else {
					cloneCopyEvent(elem, clone);
				}
			}

			// Preserve script evaluation history
			destElements = getAll(clone, "script");
			if (destElements.length > 0) {
				setGlobalEval(destElements, !inPage && getAll(elem, "script"));
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function (elems) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;

			for (;
				(elem = elems[i]) !== undefined; i++) {
				if (acceptData(elem)) {
					if ((data = elem[dataPriv.expando])) {
						if (data.events) {
							for (type in data.events) {
								if (special[type]) {
									jQuery.event.remove(elem, type);

									// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent(elem, type, data.handle);
								}
							}
						}

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataPriv.expando] = undefined;
					}
					if (elem[dataUser.expando]) {

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataUser.expando] = undefined;
					}
				}
			}
		}
	});

	jQuery.fn.extend({

		// Keep domManip exposed until 3.0 (gh-2225)
		domManip: domManip,

		detach: function (selector) {
			return remove(this, selector, true);
		},

		remove: function (selector) {
			return remove(this, selector);
		},

		text: function (value) {
			return access(this, function (value) {
				return value === undefined ?
					jQuery.text(this) :
					this.empty().each(function () {
						if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
							this.textContent = value;
						}
					});
			}, null, value, arguments.length);
		},

		append: function () {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.appendChild(elem);
				}
			});
		},

		prepend: function () {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.insertBefore(elem, target.firstChild);
				}
			});
		},

		before: function () {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this);
				}
			});
		},

		after: function () {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this.nextSibling);
				}
			});
		},

		empty: function () {
			var elem,
				i = 0;

			for (;
				(elem = this[i]) != null; i++) {
				if (elem.nodeType === 1) {

					// Prevent memory leaks
					jQuery.cleanData(getAll(elem, false));

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function (dataAndEvents, deepDataAndEvents) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map(function () {
				return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
			});
		},

		html: function (value) {
			return access(this, function (value) {
				var elem = this[0] || {},
					i = 0,
					l = this.length;

				if (value === undefined && elem.nodeType === 1) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if (typeof value === "string" && !rnoInnerhtml.test(value) &&
					!wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

					value = jQuery.htmlPrefilter(value);

					try {
						for (; i < l; i++) {
							elem = this[i] || {};

							// Remove element nodes and prevent memory leaks
							if (elem.nodeType === 1) {
								jQuery.cleanData(getAll(elem, false));
								elem.innerHTML = value;
							}
						}

						elem = 0;

						// If using innerHTML throws an exception, use the fallback method
					} catch (e) { }
				}

				if (elem) {
					this.empty().append(value);
				}
			}, null, value, arguments.length);
		},

		replaceWith: function () {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip(this, arguments, function (elem) {
				var parent = this.parentNode;

				if (jQuery.inArray(this, ignored) < 0) {
					jQuery.cleanData(getAll(this));
					if (parent) {
						parent.replaceChild(elem, this);
					}
				}

				// Force callback invocation
			}, ignored);
		}
	});

	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function (name, original) {
		jQuery.fn[name] = function (selector) {
			var elems,
				ret = [],
				insert = jQuery(selector),
				last = insert.length - 1,
				i = 0;

			for (; i <= last; i++) {
				elems = i === last ? this : this.clone(true);
				jQuery(insert[i])[original](elems);

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply(ret, elems.get());
			}

			return this.pushStack(ret);
		};
	});


	var iframe,
		elemdisplay = {

			// Support: Firefox
			// We have to pre-define these values for FF (#10227)
			HTML: "block",
			BODY: "block"
		};

	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */

	// Called only from within defaultDisplay
	function actualDisplay(name, doc) {
		var elem = jQuery(doc.createElement(name)).appendTo(doc.body),

			display = jQuery.css(elem[0], "display");

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay(nodeName) {
		var doc = document,
			display = elemdisplay[nodeName];

		if (!display) {
			display = actualDisplay(nodeName, doc);

			// If the simple way fails, read from inside an iframe
			if (display === "none" || !display) {

				// Use the already-created iframe if possible
				iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>"))
					.appendTo(doc.documentElement);

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[0].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay(nodeName, doc);
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[nodeName] = display;
		}

		return display;
	}
	var rmargin = (/^margin/);

	var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

	var getStyles = function (elem) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if (!view || !view.opener) {
			view = window;
		}

		return view.getComputedStyle(elem);
	};

	var swap = function (elem, options, callback, args) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for (name in options) {
			old[name] = elem.style[name];
			elem.style[name] = options[name];
		}

		ret = callback.apply(elem, args || []);

		// Revert the old values
		for (name in options) {
			elem.style[name] = old[name];
		}

		return ret;
	};


	var documentElement = document.documentElement;



	(function () {
		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement("div"),
			div = document.createElement("div");

		// Finish early in limited (non-browser) environments
		if (!div.style) {
			return;
		}

		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode(true).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild(div);

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild(container);

			var divStyle = window.getComputedStyle(div);
			pixelPositionVal = divStyle.top !== "1%";
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild(container);
		}

		jQuery.extend(support, {
			pixelPosition: function () {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function () {
				if (boxSizingReliableVal == null) {
					computeStyleTests();
				}
				return boxSizingReliableVal;
			},
			pixelMarginRight: function () {

				// Support: Android 4.0-4.3
				// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
				// since that compresses better and they're computed together anyway.
				if (boxSizingReliableVal == null) {
					computeStyleTests();
				}
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function () {

				// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
				if (boxSizingReliableVal == null) {
					computeStyleTests();
				}
				return reliableMarginLeftVal;
			},
			reliableMarginRight: function () {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild(document.createElement("div"));

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =

					// Support: Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;box-sizing:content-box;" +
					"display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				documentElement.appendChild(container);

				ret = !parseFloat(window.getComputedStyle(marginDiv).marginRight);

				documentElement.removeChild(container);
				div.removeChild(marginDiv);

				return ret;
			}
		});
	})();


	function curCSS(elem, name, computed) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles(elem);
		ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ((ret === "" || ret === undefined) && !jQuery.contains(elem.ownerDocument, elem)) {
			ret = jQuery.style(elem, name);
		}

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if (computed) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

			// Support: IE9-11+
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf(conditionFn, hookFn) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function () {
				if (conditionFn()) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return (this.get = hookFn).apply(this, arguments);
			}
		};
	}


	var

		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,

		cssShow = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = ["Webkit", "O", "Moz", "ms"],
		emptyStyle = document.createElement("div").style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName(name) {

		// Shortcut for names that are not vendor prefixed
		if (name in emptyStyle) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
			i = cssPrefixes.length;

		while (i--) {
			name = cssPrefixes[i] + capName;
			if (name in emptyStyle) {
				return name;
			}
		}
	}

	function setPositiveNumber(elem, value, subtract) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec(value);
		return matches ?

			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") :
			value;
	}

	function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
		var i = extra === (isBorderBox ? "border" : "content") ?

			// If we already have the right measurement, avoid augmentation
			4 :

			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,

			val = 0;

		for (; i < 4; i += 2) {

			// Both box models exclude margin, so add it if we want it
			if (extra === "margin") {
				val += jQuery.css(elem, extra + cssExpand[i], true, styles);
			}

			if (isBorderBox) {

				// border-box includes padding, so remove it if we want content
				if (extra === "content") {
					val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
				}

				// At this point, extra isn't border nor margin, so remove border
				if (extra !== "margin") {
					val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

				// At this point, extra isn't content nor padding, so add border
				if (extra !== "padding") {
					val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			}
		}

		return val;
	}

	function getWidthOrHeight(elem, name, extra) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles(elem),
			isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

		// Support: IE11 only
		// In IE 11 fullscreen elements inside of an iframe have
		// 100x too small dimensions (gh-1764).
		if (document.msFullscreenElement && window.top !== window) {

			// Support: IE11 only
			// Running getBoundingClientRect on a disconnected node
			// in IE throws an error.
			if (elem.getClientRects().length) {
				val = Math.round(elem.getBoundingClientRect()[name] * 100);
			}
		}

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if (val <= 0 || val == null) {

			// Fall back to computed then uncomputed css if necessary
			val = curCSS(elem, name, styles);
			if (val < 0 || val == null) {
				val = elem.style[name];
			}

			// Computed unit is not pixels. Stop here and return.
			if (rnumnonpx.test(val)) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				(support.boxSizingReliable() || val === elem.style[name]);

			// Normalize "", auto, and prepare for extra
			val = parseFloat(val) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return (val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || (isBorderBox ? "border" : "content"),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	function showHide(elements, show) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;

		for (; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue;
			}

			values[index] = dataPriv.get(elem, "olddisplay");
			display = elem.style.display;
			if (show) {

				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if (!values[index] && display === "none") {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if (elem.style.display === "" && isHidden(elem)) {
					values[index] = dataPriv.access(
						elem,
						"olddisplay",
						defaultDisplay(elem.nodeName)
					);
				}
			} else {
				hidden = isHidden(elem);

				if (display !== "none" || !hidden) {
					dataPriv.set(
						elem,
						"olddisplay",
						hidden ? display : jQuery.css(elem, "display")
					);
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for (index = 0; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue;
			}
			if (!show || elem.style.display === "none" || elem.style.display === "") {
				elem.style.display = show ? values[index] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.extend({

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function (elem, computed) {
					if (computed) {

						// We should always get a number back from opacity
						var ret = curCSS(elem, "opacity");
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function (elem, name, value, extra) {

			// Don't set styles on text and comment nodes
			if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase(name),
				style = elem.style;

			name = jQuery.cssProps[origName] ||
				(jQuery.cssProps[origName] = vendorPropName(origName) || origName);

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// Check if we're setting a value
			if (value !== undefined) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
					value = adjustCSS(elem, name, ret);

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if (value == null || value !== value) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if (type === "number") {
					value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
				}

				// Support: IE9-11+
				// background-* props affect original clone's values
				if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
					style[name] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if (!hooks || !("set" in hooks) ||
					(value = hooks.set(elem, value, extra)) !== undefined) {

					style[name] = value;
				}

			} else {

				// If a hook was provided get the non-computed value from there
				if (hooks && "get" in hooks &&
					(ret = hooks.get(elem, false, extra)) !== undefined) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[name];
			}
		},

		css: function (elem, name, extra, styles) {
			var val, num, hooks,
				origName = jQuery.camelCase(name);

			// Make sure that we're working with the right name
			name = jQuery.cssProps[origName] ||
				(jQuery.cssProps[origName] = vendorPropName(origName) || origName);

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// If a hook was provided get the computed value from there
			if (hooks && "get" in hooks) {
				val = hooks.get(elem, true, extra);
			}

			// Otherwise, if a way to get the computed value exists, use that
			if (val === undefined) {
				val = curCSS(elem, name, styles);
			}

			// Convert "normal" to computed value
			if (val === "normal" && name in cssNormalTransform) {
				val = cssNormalTransform[name];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if (extra === "" || extra) {
				num = parseFloat(val);
				return extra === true || isFinite(num) ? num || 0 : val;
			}
			return val;
		}
	});

	jQuery.each(["height", "width"], function (i, name) {
		jQuery.cssHooks[name] = {
			get: function (elem, computed, extra) {
				if (computed) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test(jQuery.css(elem, "display")) &&
						elem.offsetWidth === 0 ?
						swap(elem, cssShow, function () {
							return getWidthOrHeight(elem, name, extra);
						}) :
						getWidthOrHeight(elem, name, extra);
				}
			},

			set: function (elem, value, extra) {
				var matches,
					styles = extra && getStyles(elem),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css(elem, "boxSizing", false, styles) === "border-box",
						styles
					);

				// Convert to pixels if value adjustment is needed
				if (subtract && (matches = rcssNum.exec(value)) &&
					(matches[3] || "px") !== "px") {

					elem.style[name] = value;
					value = jQuery.css(elem, name);
				}

				return setPositiveNumber(elem, value, subtract);
			}
		};
	});

	jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft,
		function (elem, computed) {
			if (computed) {
				return (parseFloat(curCSS(elem, "marginLeft")) ||
					elem.getBoundingClientRect().left -
					swap(elem, {
						marginLeft: 0
					}, function () {
						return elem.getBoundingClientRect().left;
					})
				) + "px";
			}
		}
	);

	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight,
		function (elem, computed) {
			if (computed) {
				return swap(elem, {
					"display": "inline-block"
				},
					curCSS, [elem, "marginRight"]);
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function (prefix, suffix) {
		jQuery.cssHooks[prefix + suffix] = {
			expand: function (value) {
				var i = 0,
					expanded = {},

					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split(" ") : [value];

				for (; i < 4; i++) {
					expanded[prefix + cssExpand[i] + suffix] =
						parts[i] || parts[i - 2] || parts[0];
				}

				return expanded;
			}
		};

		if (!rmargin.test(prefix)) {
			jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
		}
	});

	jQuery.fn.extend({
		css: function (name, value) {
			return access(this, function (elem, name, value) {
				var styles, len,
					map = {},
					i = 0;

				if (jQuery.isArray(name)) {
					styles = getStyles(elem);
					len = name.length;

					for (; i < len; i++) {
						map[name[i]] = jQuery.css(elem, name[i], false, styles);
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style(elem, name, value) :
					jQuery.css(elem, name);
			}, name, value, arguments.length > 1);
		},
		show: function () {
			return showHide(this, true);
		},
		hide: function () {
			return showHide(this);
		},
		toggle: function (state) {
			if (typeof state === "boolean") {
				return state ? this.show() : this.hide();
			}

			return this.each(function () {
				if (isHidden(this)) {
					jQuery(this).show();
				} else {
					jQuery(this).hide();
				}
			});
		}
	});


	function Tween(elem, options, prop, end, easing) {
		return new Tween.prototype.init(elem, options, prop, end, easing);
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function (elem, options, prop, end, easing, unit) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
		},
		cur: function () {
			var hooks = Tween.propHooks[this.prop];

			return hooks && hooks.get ?
				hooks.get(this) :
				Tween.propHooks._default.get(this);
		},
		run: function (percent) {
			var eased,
				hooks = Tween.propHooks[this.prop];

			if (this.options.duration) {
				this.pos = eased = jQuery.easing[this.easing](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = (this.end - this.start) * eased + this.start;

			if (this.options.step) {
				this.options.step.call(this.elem, this.now, this);
			}

			if (hooks && hooks.set) {
				hooks.set(this);
			} else {
				Tween.propHooks._default.set(this);
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function (tween) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if (tween.elem.nodeType !== 1 ||
					tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
					return tween.elem[tween.prop];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css(tween.elem, tween.prop, "");

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function (tween) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if (jQuery.fx.step[tween.prop]) {
					jQuery.fx.step[tween.prop](tween);
				} else if (tween.elem.nodeType === 1 &&
					(tween.elem.style[jQuery.cssProps[tween.prop]] != null ||
						jQuery.cssHooks[tween.prop])) {
					jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
				} else {
					tween.elem[tween.prop] = tween.now;
				}
			}
		}
	};

	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function (tween) {
			if (tween.elem.nodeType && tween.elem.parentNode) {
				tween.elem[tween.prop] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function (p) {
			return p;
		},
		swing: function (p) {
			return 0.5 - Math.cos(p * Math.PI) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout(function () {
			fxNow = undefined;
		});
		return (fxNow = jQuery.now());
	}

	// Generate parameters to create a standard animation
	function genFx(type, includeWidth) {
		var which,
			i = 0,
			attrs = {
				height: type
			};

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for (; i < 4; i += 2 - includeWidth) {
			which = cssExpand[i];
			attrs["margin" + which] = attrs["padding" + which] = type;
		}

		if (includeWidth) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween(value, prop, animation) {
		var tween,
			collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
			index = 0,
			length = collection.length;
		for (; index < length; index++) {
			if ((tween = collection[index].call(animation, prop, value))) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter(elem, props, opts) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden(elem),
			dataShow = dataPriv.get(elem, "fxshow");

		// Handle queue: false promises
		if (!opts.queue) {
			hooks = jQuery._queueHooks(elem, "fx");
			if (hooks.unqueued == null) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function () {
					if (!hooks.unqueued) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always(function () {

				// Ensure the complete handler is called before this completes
				anim.always(function () {
					hooks.unqueued--;
					if (!jQuery.queue(elem, "fx").length) {
						hooks.empty.fire();
					}
				});
			});
		}

		// Height/width overflow pass
		if (elem.nodeType === 1 && ("height" in props || "width" in props)) {

			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [style.overflow, style.overflowX, style.overflowY];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css(elem, "display");

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				dataPriv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;

			if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
				style.display = "inline-block";
			}
		}

		if (opts.overflow) {
			style.overflow = "hidden";
			anim.always(function () {
				style.overflow = opts.overflow[0];
				style.overflowX = opts.overflow[1];
				style.overflowY = opts.overflow[2];
			});
		}

		// show/hide pass
		for (prop in props) {
			value = props[prop];
			if (rfxtypes.exec(value)) {
				delete props[prop];
				toggle = toggle || value === "toggle";
				if (value === (hidden ? "hide" : "show")) {

					// If there is dataShow left over from a stopped hide or show
					// and we are going to proceed with show, we should pretend to be hidden
					if (value === "show" && dataShow && dataShow[prop] !== undefined) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);

				// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}

		if (!jQuery.isEmptyObject(orig)) {
			if (dataShow) {
				if ("hidden" in dataShow) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access(elem, "fxshow", {});
			}

			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if (toggle) {
				dataShow.hidden = !hidden;
			}
			if (hidden) {
				jQuery(elem).show();
			} else {
				anim.done(function () {
					jQuery(elem).hide();
				});
			}
			anim.done(function () {
				var prop;

				dataPriv.remove(elem, "fxshow");
				for (prop in orig) {
					jQuery.style(elem, prop, orig[prop]);
				}
			});
			for (prop in orig) {
				tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);

				if (!(prop in dataShow)) {
					dataShow[prop] = tween.start;
					if (hidden) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

			// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
			style.display = display;
		}
	}

	function propFilter(props, specialEasing) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for (index in props) {
			name = jQuery.camelCase(index);
			easing = specialEasing[name];
			value = props[index];
			if (jQuery.isArray(value)) {
				easing = value[1];
				value = props[index] = value[0];
			}

			if (index !== name) {
				props[name] = value;
				delete props[index];
			}

			hooks = jQuery.cssHooks[name];
			if (hooks && "expand" in hooks) {
				value = hooks.expand(value);
				delete props[name];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for (index in value) {
					if (!(index in props)) {
						props[index] = value[index];
						specialEasing[index] = easing;
					}
				}
			} else {
				specialEasing[name] = easing;
			}
		}
	}

	function Animation(elem, properties, options) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always(function () {

				// Don't match elem in the :animated selector
				delete tick.elem;
			}),
			tick = function () {
				if (stopped) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max(0, animation.startTime + animation.duration - currentTime),

					// Support: Android 2.3
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for (; index < length; index++) {
					animation.tweens[index].run(percent);
				}

				deferred.notifyWith(elem, [animation, percent, remaining]);

				if (percent < 1 && length) {
					return remaining;
				} else {
					deferred.resolveWith(elem, [animation]);
					return false;
				}
			},
			animation = deferred.promise({
				elem: elem,
				props: jQuery.extend({}, properties),
				opts: jQuery.extend(true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function (prop, end) {
					var tween = jQuery.Tween(elem, animation.opts, prop, end,
						animation.opts.specialEasing[prop] || animation.opts.easing);
					animation.tweens.push(tween);
					return tween;
				},
				stop: function (gotoEnd) {
					var index = 0,

						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if (stopped) {
						return this;
					}
					stopped = true;
					for (; index < length; index++) {
						animation.tweens[index].run(1);
					}

					// Resolve when we played the last frame; otherwise, reject
					if (gotoEnd) {
						deferred.notifyWith(elem, [animation, 1, 0]);
						deferred.resolveWith(elem, [animation, gotoEnd]);
					} else {
						deferred.rejectWith(elem, [animation, gotoEnd]);
					}
					return this;
				}
			}),
			props = animation.props;

		propFilter(props, animation.opts.specialEasing);

		for (; index < length; index++) {
			result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
			if (result) {
				if (jQuery.isFunction(result.stop)) {
					jQuery._queueHooks(animation.elem, animation.opts.queue).stop =
						jQuery.proxy(result.stop, result);
				}
				return result;
			}
		}

		jQuery.map(props, createTween, animation);

		if (jQuery.isFunction(animation.opts.start)) {
			animation.opts.start.call(elem, animation);
		}

		jQuery.fx.timer(
			jQuery.extend(tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			})
		);

		// attach callbacks from options
		return animation.progress(animation.opts.progress)
			.done(animation.opts.done, animation.opts.complete)
			.fail(animation.opts.fail)
			.always(animation.opts.always);
	}

	jQuery.Animation = jQuery.extend(Animation, {
		tweeners: {
			"*": [function (prop, value) {
				var tween = this.createTween(prop, value);
				adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
				return tween;
			}]
		},

		tweener: function (props, callback) {
			if (jQuery.isFunction(props)) {
				callback = props;
				props = ["*"];
			} else {
				props = props.match(rnotwhite);
			}

			var prop,
				index = 0,
				length = props.length;

			for (; index < length; index++) {
				prop = props[index];
				Animation.tweeners[prop] = Animation.tweeners[prop] || [];
				Animation.tweeners[prop].unshift(callback);
			}
		},

		prefilters: [defaultPrefilter],

		prefilter: function (callback, prepend) {
			if (prepend) {
				Animation.prefilters.unshift(callback);
			} else {
				Animation.prefilters.push(callback);
			}
		}
	});

	jQuery.speed = function (speed, easing, fn) {
		var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction(speed) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
			opt.duration : opt.duration in jQuery.fx.speeds ?
				jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;

		// Normalize opt.queue - true/undefined/null -> "fx"
		if (opt.queue == null || opt.queue === true) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function () {
			if (jQuery.isFunction(opt.old)) {
				opt.old.call(this);
			}

			if (opt.queue) {
				jQuery.dequeue(this, opt.queue);
			}
		};

		return opt;
	};

	jQuery.fn.extend({
		fadeTo: function (speed, to, easing, callback) {

			// Show any hidden elements after setting opacity to 0
			return this.filter(isHidden).css("opacity", 0).show()

				// Animate to the value specified
				.end().animate({
					opacity: to
				}, speed, easing, callback);
		},
		animate: function (prop, speed, easing, callback) {
			var empty = jQuery.isEmptyObject(prop),
				optall = jQuery.speed(speed, easing, callback),
				doAnimation = function () {

					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation(this, jQuery.extend({}, prop), optall);

					// Empty animations, or finishing resolves immediately
					if (empty || dataPriv.get(this, "finish")) {
						anim.stop(true);
					}
				};
			doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each(doAnimation) :
				this.queue(optall.queue, doAnimation);
		},
		stop: function (type, clearQueue, gotoEnd) {
			var stopQueue = function (hooks) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop(gotoEnd);
			};

			if (typeof type !== "string") {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if (clearQueue && type !== false) {
				this.queue(type || "fx", []);
			}

			return this.each(function () {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get(this);

				if (index) {
					if (data[index] && data[index].stop) {
						stopQueue(data[index]);
					}
				} else {
					for (index in data) {
						if (data[index] && data[index].stop && rrun.test(index)) {
							stopQueue(data[index]);
						}
					}
				}

				for (index = timers.length; index--;) {
					if (timers[index].elem === this &&
						(type == null || timers[index].queue === type)) {

						timers[index].anim.stop(gotoEnd);
						dequeue = false;
						timers.splice(index, 1);
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if (dequeue || !gotoEnd) {
					jQuery.dequeue(this, type);
				}
			});
		},
		finish: function (type) {
			if (type !== false) {
				type = type || "fx";
			}
			return this.each(function () {
				var index,
					data = dataPriv.get(this),
					queue = data[type + "queue"],
					hooks = data[type + "queueHooks"],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue(this, type, []);

				if (hooks && hooks.stop) {
					hooks.stop.call(this, true);
				}

				// Look for any active animations, and finish them
				for (index = timers.length; index--;) {
					if (timers[index].elem === this && timers[index].queue === type) {
						timers[index].anim.stop(true);
						timers.splice(index, 1);
					}
				}

				// Look for any animations in the old queue and finish them
				for (index = 0; index < length; index++) {
					if (queue[index] && queue[index].finish) {
						queue[index].finish.call(this);
					}
				}

				// Turn off finishing flag
				delete data.finish;
			});
		}
	});

	jQuery.each(["toggle", "show", "hide"], function (i, name) {
		var cssFn = jQuery.fn[name];
		jQuery.fn[name] = function (speed, easing, callback) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply(this, arguments) :
				this.animate(genFx(name, true), speed, easing, callback);
		};
	});

	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function (name, props) {
		jQuery.fn[name] = function (speed, easing, callback) {
			return this.animate(props, speed, easing, callback);
		};
	});

	jQuery.timers = [];
	jQuery.fx.tick = function () {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = jQuery.now();

		for (; i < timers.length; i++) {
			timer = timers[i];

			// Checks the timer has not already been removed
			if (!timer() && timers[i] === timer) {
				timers.splice(i--, 1);
			}
		}

		if (!timers.length) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function (timer) {
		jQuery.timers.push(timer);
		if (timer()) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function () {
		if (!timerId) {
			timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
		}
	};

	jQuery.fx.stop = function () {
		window.clearInterval(timerId);

		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function (time, type) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";

		return this.queue(type, function (next, hooks) {
			var timeout = window.setTimeout(next, time);
			hooks.stop = function () {
				window.clearTimeout(timeout);
			};
		});
	};


	(function () {
		var input = document.createElement("input"),
			select = document.createElement("select"),
			opt = select.appendChild(document.createElement("option"));

		input.type = "checkbox";

		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement("input");
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();


	var boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend({
		attr: function (name, value) {
			return access(this, jQuery.attr, name, value, arguments.length > 1);
		},

		removeAttr: function (name) {
			return this.each(function () {
				jQuery.removeAttr(this, name);
			});
		}
	});

	jQuery.extend({
		attr: function (elem, name, value) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if (typeof elem.getAttribute === "undefined") {
				return jQuery.prop(elem, name, value);
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[name] ||
					(jQuery.expr.match.bool.test(name) ? boolHook : undefined);
			}

			if (value !== undefined) {
				if (value === null) {
					jQuery.removeAttr(elem, name);
					return;
				}

				if (hooks && "set" in hooks &&
					(ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				elem.setAttribute(name, value + "");
				return value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			ret = jQuery.find.attr(elem, name);

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function (elem, value) {
					if (!support.radioValue && value === "radio" &&
						jQuery.nodeName(elem, "input")) {
						var val = elem.value;
						elem.setAttribute("type", value);
						if (val) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function (elem, value) {
			var name, propName,
				i = 0,
				attrNames = value && value.match(rnotwhite);

			if (attrNames && elem.nodeType === 1) {
				while ((name = attrNames[i++])) {
					propName = jQuery.propFix[name] || name;

					// Boolean attributes get special treatment (#10870)
					if (jQuery.expr.match.bool.test(name)) {

						// Set corresponding property to false
						elem[propName] = false;
					}

					elem.removeAttribute(name);
				}
			}
		}
	});

	// Hooks for boolean attributes
	boolHook = {
		set: function (elem, value, name) {
			if (value === false) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr(elem, name);
			} else {
				elem.setAttribute(name, name);
			}
			return name;
		}
	};
	jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
		var getter = attrHandle[name] || jQuery.find.attr;

		attrHandle[name] = function (elem, name, isXML) {
			var ret, handle;
			if (!isXML) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[name];
				attrHandle[name] = ret;
				ret = getter(elem, name, isXML) != null ?
					name.toLowerCase() :
					null;
				attrHandle[name] = handle;
			}
			return ret;
		};
	});




	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend({
		prop: function (name, value) {
			return access(this, jQuery.prop, name, value, arguments.length > 1);
		},

		removeProp: function (name) {
			return this.each(function () {
				delete this[jQuery.propFix[name] || name];
			});
		}
	});

	jQuery.extend({
		prop: function (elem, name, value) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {

				// Fix name and attach hooks
				name = jQuery.propFix[name] || name;
				hooks = jQuery.propHooks[name];
			}

			if (value !== undefined) {
				if (hooks && "set" in hooks &&
					(ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				return (elem[name] = value);
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			return elem[name];
		},

		propHooks: {
			tabIndex: {
				get: function (elem) {

					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr(elem, "tabindex");

					return tabindex ?
						parseInt(tabindex, 10) :
						rfocusable.test(elem.nodeName) ||
							rclickable.test(elem.nodeName) && elem.href ?
							0 :
							-1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	});

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	if (!support.optSelected) {
		jQuery.propHooks.selected = {
			get: function (elem) {
				var parent = elem.parentNode;
				if (parent && parent.parentNode) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function (elem) {
				var parent = elem.parentNode;
				if (parent) {
					parent.selectedIndex;

					if (parent.parentNode) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each([
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function () {
		jQuery.propFix[this.toLowerCase()] = this;
	});




	var rclass = /[\t\r\n\f]/g;

	function getClass(elem) {
		return elem.getAttribute && elem.getAttribute("class") || "";
	}

	jQuery.fn.extend({
		addClass: function (value) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).addClass(value.call(this, j, getClass(this)));
				});
			}

			if (typeof value === "string" && value) {
				classes = value.match(rnotwhite) || [];

				while ((elem = this[i++])) {
					curValue = getClass(elem);
					cur = elem.nodeType === 1 &&
						(" " + curValue + " ").replace(rclass, " ");

					if (cur) {
						j = 0;
						while ((clazz = classes[j++])) {
							if (cur.indexOf(" " + clazz + " ") < 0) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		removeClass: function (value) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).removeClass(value.call(this, j, getClass(this)));
				});
			}

			if (!arguments.length) {
				return this.attr("class", "");
			}

			if (typeof value === "string" && value) {
				classes = value.match(rnotwhite) || [];

				while ((elem = this[i++])) {
					curValue = getClass(elem);

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 &&
						(" " + curValue + " ").replace(rclass, " ");

					if (cur) {
						j = 0;
						while ((clazz = classes[j++])) {

							// Remove *all* instances
							while (cur.indexOf(" " + clazz + " ") > -1) {
								cur = cur.replace(" " + clazz + " ", " ");
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		toggleClass: function (value, stateVal) {
			var type = typeof value;

			if (typeof stateVal === "boolean" && type === "string") {
				return stateVal ? this.addClass(value) : this.removeClass(value);
			}

			if (jQuery.isFunction(value)) {
				return this.each(function (i) {
					jQuery(this).toggleClass(
						value.call(this, i, getClass(this), stateVal),
						stateVal
					);
				});
			}

			return this.each(function () {
				var className, i, self, classNames;

				if (type === "string") {

					// Toggle individual class names
					i = 0;
					self = jQuery(this);
					classNames = value.match(rnotwhite) || [];

					while ((className = classNames[i++])) {

						// Check each className given, space separated list
						if (self.hasClass(className)) {
							self.removeClass(className);
						} else {
							self.addClass(className);
						}
					}

					// Toggle whole class name
				} else if (value === undefined || type === "boolean") {
					className = getClass(this);
					if (className) {

						// Store className if set
						dataPriv.set(this, "__className__", className);
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if (this.setAttribute) {
						this.setAttribute("class",
							className || value === false ?
								"" :
								dataPriv.get(this, "__className__") || ""
						);
					}
				}
			});
		},

		hasClass: function (selector) {
			var className, elem,
				i = 0;

			className = " " + selector + " ";
			while ((elem = this[i++])) {
				if (elem.nodeType === 1 &&
					(" " + getClass(elem) + " ").replace(rclass, " ")
						.indexOf(className) > -1
				) {
					return true;
				}
			}

			return false;
		}
	});




	var rreturn = /\r/g,
		rspaces = /[\x20\t\r\n\f]+/g;

	jQuery.fn.extend({
		val: function (value) {
			var hooks, ret, isFunction,
				elem = this[0];

			if (!arguments.length) {
				if (elem) {
					hooks = jQuery.valHooks[elem.type] ||
						jQuery.valHooks[elem.nodeName.toLowerCase()];

					if (hooks &&
						"get" in hooks &&
						(ret = hooks.get(elem, "value")) !== undefined
					) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?

						// Handle most common string cases
						ret.replace(rreturn, "") :

						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction(value);

			return this.each(function (i) {
				var val;

				if (this.nodeType !== 1) {
					return;
				}

				if (isFunction) {
					val = value.call(this, i, jQuery(this).val());
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if (val == null) {
					val = "";

				} else if (typeof val === "number") {
					val += "";

				} else if (jQuery.isArray(val)) {
					val = jQuery.map(val, function (value) {
						return value == null ? "" : value + "";
					});
				}

				hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

				// If set returns undefined, fall back to normal setting
				if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
					this.value = val;
				}
			});
		}
	});

	jQuery.extend({
		valHooks: {
			option: {
				get: function (elem) {

					var val = jQuery.find.attr(elem, "value");
					return val != null ?
						val :

						// Support: IE10-11+
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						jQuery.trim(jQuery.text(elem)).replace(rspaces, " ");
				}
			},
			select: {
				get: function (elem) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;

					// Loop through all the selected options
					for (; i < max; i++) {
						option = options[i];

						// IE8-9 doesn't update selected after form reset (#2551)
						if ((option.selected || i === index) &&

							// Don't return options that are disabled or in a disabled optgroup
							(support.optDisabled ?
								!option.disabled : option.getAttribute("disabled") === null) &&
							(!option.parentNode.disabled ||
								!jQuery.nodeName(option.parentNode, "optgroup"))) {

							// Get the specific value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if (one) {
								return value;
							}

							// Multi-Selects return an array
							values.push(value);
						}
					}

					return values;
				},

				set: function (elem, value) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray(value),
						i = options.length;

					while (i--) {
						option = options[i];
						if (option.selected =
							jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1
						) {
							optionSet = true;
						}
					}

					// Force browsers to behave consistently when non-matching value is set
					if (!optionSet) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});

	// Radios and checkboxes getter/setter
	jQuery.each(["radio", "checkbox"], function () {
		jQuery.valHooks[this] = {
			set: function (elem, value) {
				if (jQuery.isArray(value)) {
					return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1);
				}
			}
		};
		if (!support.checkOn) {
			jQuery.valHooks[this].get = function (elem) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});




	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend(jQuery.event, {

		trigger: function (event, data, elem, onlyHandlers) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [elem || document],
				type = hasOwn.call(event, "type") ? event.type : event,
				namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if (elem.nodeType === 3 || elem.nodeType === 8) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if (rfocusMorph.test(type + jQuery.event.triggered)) {
				return;
			}

			if (type.indexOf(".") > -1) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[jQuery.expando] ?
				event :
				new jQuery.Event(type, typeof event === "object" && event);

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.rnamespace = event.namespace ?
				new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if (!event.target) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ? [event] :
				jQuery.makeArray(data, [event]);

			// Allow special events to draw outside the lines
			special = jQuery.event.special[type] || {};
			if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

				bubbleType = special.delegateType || type;
				if (!rfocusMorph.test(bubbleType + type)) {
					cur = cur.parentNode;
				}
				for (; cur; cur = cur.parentNode) {
					eventPath.push(cur);
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if (tmp === (elem.ownerDocument || document)) {
					eventPath.push(tmp.defaultView || tmp.parentWindow || window);
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = (dataPriv.get(cur, "events") || {})[event.type] &&
					dataPriv.get(cur, "handle");
				if (handle) {
					handle.apply(cur, data);
				}

				// Native handler
				handle = ontype && cur[ontype];
				if (handle && handle.apply && acceptData(cur)) {
					event.result = handle.apply(cur, data);
					if (event.result === false) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if (!onlyHandlers && !event.isDefaultPrevented()) {

				if ((!special._default ||
					special._default.apply(eventPath.pop(), data) === false) &&
					acceptData(elem)) {

					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ontype];

						if (tmp) {
							elem[ontype] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[type]();
						jQuery.event.triggered = undefined;

						if (tmp) {
							elem[ontype] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		simulate: function (type, elem, event) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event, {
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// But now, this "simulate" function is used only for events
				// for which stopPropagation() is noop, so there is no need for that anymore.
				//
				// For the 1.x branch though, guard for "click" and "submit"
				// events is still used, but was moved to jQuery.event.stopPropagation function
				// because `originalEvent` should point to the original event for the constancy
				// with other events and for more focused logic
			}
			);

			jQuery.event.trigger(e, null, elem);

			if (e.isDefaultPrevented()) {
				event.preventDefault();
			}
		}

	});

	jQuery.fn.extend({

		trigger: function (type, data) {
			return this.each(function () {
				jQuery.event.trigger(type, data, this);
			});
		},
		triggerHandler: function (type, data) {
			var elem = this[0];
			if (elem) {
				return jQuery.event.trigger(type, data, elem, true);
			}
		}
	});


	jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu").split(" "),
		function (i, name) {

			// Handle event binding
			jQuery.fn[name] = function (data, fn) {
				return arguments.length > 0 ?
					this.on(name, null, data, fn) :
					this.trigger(name);
			};
		});

	jQuery.fn.extend({
		hover: function (fnOver, fnOut) {
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
		}
	});




	support.focusin = "onfocusin" in window;


	// Support: Firefox
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome, Safari
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
	if (!support.focusin) {
		jQuery.each({
			focus: "focusin",
			blur: "focusout"
		}, function (orig, fix) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function (event) {
				jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
			};

			jQuery.event.special[fix] = {
				setup: function () {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access(doc, fix);

					if (!attaches) {
						doc.addEventListener(orig, handler, true);
					}
					dataPriv.access(doc, fix, (attaches || 0) + 1);
				},
				teardown: function () {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access(doc, fix) - 1;

					if (!attaches) {
						doc.removeEventListener(orig, handler, true);
						dataPriv.remove(doc, fix);

					} else {
						dataPriv.access(doc, fix, attaches);
					}
				}
			};
		});
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = (/\?/);



	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function (data) {
		return JSON.parse(data + "");
	};


	// Cross-browser xml parsing
	jQuery.parseXML = function (data) {
		var xml;
		if (!data || typeof data !== "string") {
			return null;
		}

		// Support: IE9
		try {
			xml = (new window.DOMParser()).parseFromString(data, "text/xml");
		} catch (e) {
			xml = undefined;
		}

		if (!xml || xml.getElementsByTagName("parsererror").length) {
			jQuery.error("Invalid XML: " + data);
		}
		return xml;
	};


	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat("*"),

		// Anchor tag for parsing the document origin
		originAnchor = document.createElement("a");
	originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports(structure) {

		// dataTypeExpression is optional and defaults to "*"
		return function (dataTypeExpression, func) {

			if (typeof dataTypeExpression !== "string") {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];

			if (jQuery.isFunction(func)) {

				// For each dataType in the dataTypeExpression
				while ((dataType = dataTypes[i++])) {

					// Prepend if requested
					if (dataType[0] === "+") {
						dataType = dataType.slice(1) || "*";
						(structure[dataType] = structure[dataType] || []).unshift(func);

						// Otherwise append
					} else {
						(structure[dataType] = structure[dataType] || []).push(func);
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

		var inspected = {},
			seekingTransport = (structure === transports);

		function inspect(dataType) {
			var selected;
			inspected[dataType] = true;
			jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
				var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
				if (typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[dataTypeOrTransport]) {

					options.dataTypes.unshift(dataTypeOrTransport);
					inspect(dataTypeOrTransport);
					return false;
				} else if (seekingTransport) {
					return !(selected = dataTypeOrTransport);
				}
			});
			return selected;
		}

		return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend(target, src) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for (key in src) {
			if (src[key] !== undefined) {
				(flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
			}
		}
		if (deep) {
			jQuery.extend(true, target, deep);
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses(s, jqXHR, responses) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while (dataTypes[0] === "*") {
			dataTypes.shift();
			if (ct === undefined) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}

		// Check if we're dealing with a known content-type
		if (ct) {
			for (type in contents) {
				if (contents[type] && contents[type].test(ct)) {
					dataTypes.unshift(type);
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if (dataTypes[0] in responses) {
			finalDataType = dataTypes[0];
		} else {

			// Try convertible dataTypes
			for (type in responses) {
				if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
					finalDataType = type;
					break;
				}
				if (!firstDataType) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if (finalDataType) {
			if (finalDataType !== dataTypes[0]) {
				dataTypes.unshift(finalDataType);
			}
			return responses[finalDataType];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert(s, response, jqXHR, isSuccess) {
		var conv2, current, conv, tmp, prev,
			converters = {},

			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if (dataTypes[1]) {
			for (conv in s.converters) {
				converters[conv.toLowerCase()] = s.converters[conv];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while (current) {

			if (s.responseFields[current]) {
				jqXHR[s.responseFields[current]] = response;
			}

			// Apply the dataFilter if provided
			if (!prev && isSuccess && s.dataFilter) {
				response = s.dataFilter(response, s.dataType);
			}

			prev = current;
			current = dataTypes.shift();

			if (current) {

				// There's only work to do if current dataType is non-auto
				if (current === "*") {

					current = prev;

					// Convert response if prev dataType is non-auto and differs from current
				} else if (prev !== "*" && prev !== current) {

					// Seek a direct converter
					conv = converters[prev + " " + current] || converters["* " + current];

					// If none found, seek a pair
					if (!conv) {
						for (conv2 in converters) {

							// If conv2 outputs current
							tmp = conv2.split(" ");
							if (tmp[1] === current) {

								// If prev can be converted to accepted input
								conv = converters[prev + " " + tmp[0]] ||
									converters["* " + tmp[0]];
								if (conv) {

									// Condense equivalence converters
									if (conv === true) {
										conv = converters[conv2];

										// Otherwise, insert the intermediate dataType
									} else if (converters[conv2] !== true) {
										current = tmp[0];
										dataTypes.unshift(tmp[1]);
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if (conv !== true) {

						// Unless errors are allowed to bubble, catch and return them
						if (conv && s.throws) {
							response = conv(response);
						} else {
							try {
								response = conv(response);
							} catch (e) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return {
			state: "success",
			data: response
		};
	}

	jQuery.extend({

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test(location.protocol),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function (target, settings) {
			return settings ?

				// Building a settings object
				ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

				// Extending ajaxSettings
				ajaxExtend(jQuery.ajaxSettings, target);
		},

		ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
		ajaxTransport: addToPrefiltersOrTransports(transports),

		// Main method
		ajax: function (url, options) {

			// If url is an object, simulate pre-1.5 signature
			if (typeof url === "object") {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,

				// URL without anti-cache param
				cacheURL,

				// Response headers
				responseHeadersString,
				responseHeaders,

				// timeout handle
				timeoutTimer,

				// Url cleanup var
				urlAnchor,

				// To know if global events are to be dispatched
				fireGlobals,

				// Loop variable
				i,

				// Create the final options object
				s = jQuery.ajaxSetup({}, options),

				// Callbacks context
				callbackContext = s.context || s,

				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					(callbackContext.nodeType || callbackContext.jquery) ?
					jQuery(callbackContext) :
					jQuery.event,

				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks("once memory"),

				// Status-dependent callbacks
				statusCode = s.statusCode || {},

				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},

				// The jqXHR state
				state = 0,

				// Default abort message
				strAbort = "canceled",

				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function (key) {
						var match;
						if (state === 2) {
							if (!responseHeaders) {
								responseHeaders = {};
								while ((match = rheaders.exec(responseHeadersString))) {
									responseHeaders[match[1].toLowerCase()] = match[2];
								}
							}
							match = responseHeaders[key.toLowerCase()];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function () {
						return state === 2 ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function (name, value) {
						var lname = name.toLowerCase();
						if (!state) {
							name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
							requestHeaders[name] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function (type) {
						if (!state) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function (map) {
						var code;
						if (map) {
							if (state < 2) {
								for (code in map) {

									// Lazy-add the new callback in a way that preserves old ones
									statusCode[code] = [statusCode[code], map[code]];
								}
							} else {

								// Execute the appropriate callbacks
								jqXHR.always(map[jqXHR.status]);
							}
						}
						return this;
					},

					// Cancel the request
					abort: function (statusText) {
						var finalText = statusText || strAbort;
						if (transport) {
							transport.abort(finalText);
						}
						done(0, finalText);
						return this;
					}
				};

			// Attach deferreds
			deferred.promise(jqXHR).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ((url || s.url || location.href) + "").replace(rhash, "")
				.replace(rprotocol, location.protocol + "//");

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if (s.crossDomain == null) {
				urlAnchor = document.createElement("a");

				// Support: IE8-11+
				// IE throws exception if url is malformed, e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE8-11+
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch (e) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if (s.data && s.processData && typeof s.data !== "string") {
				s.data = jQuery.param(s.data, s.traditional);
			}

			// Apply prefilters
			inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

			// If request was aborted inside a prefilter, stop there
			if (state === 2) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if (fireGlobals && jQuery.active++ === 0) {
				jQuery.event.trigger("ajaxStart");
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test(s.type);

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if (!s.hasContent) {

				// If data is available, append data to url
				if (s.data) {
					cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if (s.cache === false) {
					s.url = rts.test(cacheURL) ?

						// If there is already a '_' parameter, set its value
						cacheURL.replace(rts, "$1_=" + nonce++) :

						// Otherwise add one to the end
						cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if (s.ifModified) {
				if (jQuery.lastModified[cacheURL]) {
					jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
				}
				if (jQuery.etag[cacheURL]) {
					jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
				}
			}

			// Set the correct header, if data is being sent
			if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
				jqXHR.setRequestHeader("Content-Type", s.contentType);
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
					s.accepts[s.dataTypes[0]] +
					(s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
					s.accepts["*"]
			);

			// Check for headers option
			for (i in s.headers) {
				jqXHR.setRequestHeader(i, s.headers[i]);
			}

			// Allow custom headers/mimetypes and early abort
			if (s.beforeSend &&
				(s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for (i in {
				success: 1,
				error: 1,
				complete: 1
			}) {
				jqXHR[i](s[i]);
			}

			// Get transport
			transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

			// If no transport, we auto-abort
			if (!transport) {
				done(-1, "No Transport");
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if (fireGlobals) {
					globalEventContext.trigger("ajaxSend", [jqXHR, s]);
				}

				// If request was aborted inside ajaxSend, stop there
				if (state === 2) {
					return jqXHR;
				}

				// Timeout
				if (s.async && s.timeout > 0) {
					timeoutTimer = window.setTimeout(function () {
						jqXHR.abort("timeout");
					}, s.timeout);
				}

				try {
					state = 1;
					transport.send(requestHeaders, done);
				} catch (e) {

					// Propagate exception as error if not done
					if (state < 2) {
						done(-1, e);

						// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}

			// Callback for when everything is done
			function done(status, nativeStatusText, responses, headers) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Called once
				if (state === 2) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if (timeoutTimer) {
					window.clearTimeout(timeoutTimer);
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if (responses) {
					response = ajaxHandleResponses(s, jqXHR, responses);
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert(s, response, jqXHR, isSuccess);

				// If successful, handle type chaining
				if (isSuccess) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if (s.ifModified) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if (modified) {
							jQuery.lastModified[cacheURL] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if (modified) {
							jQuery.etag[cacheURL] = modified;
						}
					}

					// if no content
					if (status === 204 || s.type === "HEAD") {
						statusText = "nocontent";

						// if not modified
					} else if (status === 304) {
						statusText = "notmodified";

						// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if (status || !statusText) {
						statusText = "error";
						if (status < 0) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = (nativeStatusText || statusText) + "";

				// Success/Error
				if (isSuccess) {
					deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
				} else {
					deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
				}

				// Status-dependent callbacks
				jqXHR.statusCode(statusCode);
				statusCode = undefined;

				if (fireGlobals) {
					globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
				}

				// Complete
				completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

				if (fireGlobals) {
					globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

					// Handle the global AJAX counter
					if (!(--jQuery.active)) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}

			return jqXHR;
		},

		getJSON: function (url, data, callback) {
			return jQuery.get(url, data, callback, "json");
		},

		getScript: function (url, callback) {
			return jQuery.get(url, undefined, callback, "script");
		}
	});

	jQuery.each(["get", "post"], function (i, method) {
		jQuery[method] = function (url, data, callback, type) {

			// Shift arguments if data argument was omitted
			if (jQuery.isFunction(data)) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax(jQuery.extend({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject(url) && url));
		};
	});


	jQuery._evalUrl = function (url) {
		return jQuery.ajax({
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	};


	jQuery.fn.extend({
		wrapAll: function (html) {
			var wrap;

			if (jQuery.isFunction(html)) {
				return this.each(function (i) {
					jQuery(this).wrapAll(html.call(this, i));
				});
			}

			if (this[0]) {

				// The elements to wrap the target around
				wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

				if (this[0].parentNode) {
					wrap.insertBefore(this[0]);
				}

				wrap.map(function () {
					var elem = this;

					while (elem.firstElementChild) {
						elem = elem.firstElementChild;
					}

					return elem;
				}).append(this);
			}

			return this;
		},

		wrapInner: function (html) {
			if (jQuery.isFunction(html)) {
				return this.each(function (i) {
					jQuery(this).wrapInner(html.call(this, i));
				});
			}

			return this.each(function () {
				var self = jQuery(this),
					contents = self.contents();

				if (contents.length) {
					contents.wrapAll(html);

				} else {
					self.append(html);
				}
			});
		},

		wrap: function (html) {
			var isFunction = jQuery.isFunction(html);

			return this.each(function (i) {
				jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
			});
		},

		unwrap: function () {
			return this.parent().each(function () {
				if (!jQuery.nodeName(this, "body")) {
					jQuery(this).replaceWith(this.childNodes);
				}
			}).end();
		}
	});


	jQuery.expr.filters.hidden = function (elem) {
		return !jQuery.expr.filters.visible(elem);
	};
	jQuery.expr.filters.visible = function (elem) {

		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		// Use OR instead of AND as the element is not visible if either is true
		// See tickets #10406 and #13132
		return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
	};




	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams(prefix, obj, traditional, add) {
		var name;

		if (jQuery.isArray(obj)) {

			// Serialize array item.
			jQuery.each(obj, function (i, v) {
				if (traditional || rbracket.test(prefix)) {

					// Treat each array item as a scalar.
					add(prefix, v);

				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]",
						v,
						traditional,
						add
					);
				}
			});

		} else if (!traditional && jQuery.type(obj) === "object") {

			// Serialize object item.
			for (name in obj) {
				buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
			}

		} else {

			// Serialize scalar item.
			add(prefix, obj);
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function (a, traditional) {
		var prefix,
			s = [],
			add = function (key, value) {

				// If value is a function, invoke it and return its value
				value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
				s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if (traditional === undefined) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {

			// Serialize the form elements
			jQuery.each(a, function () {
				add(this.name, this.value);
			});

		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for (prefix in a) {
				buildParams(prefix, a[prefix], traditional, add);
			}
		}

		// Return the resulting serialization
		return s.join("&").replace(r20, "+");
	};

	jQuery.fn.extend({
		serialize: function () {
			return jQuery.param(this.serializeArray());
		},
		serializeArray: function () {
			return this.map(function () {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop(this, "elements");
				return elements ? jQuery.makeArray(elements) : this;
			})
				.filter(function () {
					var type = this.type;

					// Use .is( ":disabled" ) so that fieldset[disabled] works
					return this.name && !jQuery(this).is(":disabled") &&
						rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
						(this.checked || !rcheckableType.test(type));
				})
				.map(function (i, elem) {
					var val = jQuery(this).val();

					return val == null ?
						null :
						jQuery.isArray(val) ?
							jQuery.map(val, function (val) {
								return {
									name: elem.name,
									value: val.replace(rCRLF, "\r\n")
								};
							}) : {
								name: elem.name,
								value: val.replace(rCRLF, "\r\n")
							};
				}).get();
		}
	});


	jQuery.ajaxSettings.xhr = function () {
		try {
			return new window.XMLHttpRequest();
		} catch (e) { }
	};

	var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
		xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport(function (options) {
		var callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if (support.cors || xhrSupported && !options.crossDomain) {
			return {
				send: function (headers, complete) {
					var i,
						xhr = options.xhr();

					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if (options.xhrFields) {
						for (i in options.xhrFields) {
							xhr[i] = options.xhrFields[i];
						}
					}

					// Override mime type if needed
					if (options.mimeType && xhr.overrideMimeType) {
						xhr.overrideMimeType(options.mimeType);
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if (!options.crossDomain && !headers["X-Requested-With"]) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for (i in headers) {
						xhr.setRequestHeader(i, headers[i]);
					}

					// Callback
					callback = function (type) {
						return function () {
							if (callback) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if (type === "abort") {
									xhr.abort();
								} else if (type === "error") {

									// Support: IE9
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if (typeof xhr.status !== "number") {
										complete(0, "error");
									} else {
										complete(

											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[xhr.status] || xhr.status,
										xhr.statusText,

										// Support: IE9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										(xhr.responseType || "text") !== "text" ||
											typeof xhr.responseText !== "string" ? {
											binary: xhr.response
										} : {
											text: xhr.responseText
										},
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback("error");

					// Support: IE9
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if (xhr.onabort !== undefined) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function () {

							// Check readyState before timeout as it changes
							if (xhr.readyState === 4) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout(function () {
									if (callback) {
										errorCallback();
									}
								});
							}
						};
					}

					// Create the abort callback
					callback = callback("abort");

					try {

						// Do send the request (this may raise an exception)
						xhr.send(options.hasContent && options.data || null);
					} catch (e) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if (callback) {
							throw e;
						}
					}
				},

				abort: function () {
					if (callback) {
						callback();
					}
				}
			};
		}
	});




	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function (text) {
				jQuery.globalEval(text);
				return text;
			}
		}
	});

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter("script", function (s) {
		if (s.cache === undefined) {
			s.cache = false;
		}
		if (s.crossDomain) {
			s.type = "GET";
		}
	});

	// Bind script tag hack transport
	jQuery.ajaxTransport("script", function (s) {

		// This transport only deals with cross domain requests
		if (s.crossDomain) {
			var script, callback;
			return {
				send: function (_, complete) {
					script = jQuery("<script>").prop({
						charset: s.scriptCharset,
						src: s.url
					}).on(
						"load error",
						callback = function (evt) {
							script.remove();
							callback = null;
							if (evt) {
								complete(evt.type === "error" ? 404 : 200, evt.type);
							}
						}
					);

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild(script[0]);
				},
				abort: function () {
					if (callback) {
						callback();
					}
				}
			};
		}
	});




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function () {
			var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
			this[callback] = true;
			return callback;
		}
	});

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ?
				"url" :
				typeof s.data === "string" &&
				(s.contentType || "")
					.indexOf("application/x-www-form-urlencoded") === 0 &&
				rjsonp.test(s.data) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if (jsonProp || s.dataTypes[0] === "jsonp") {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if (jsonProp) {
				s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
			} else if (s.jsonp !== false) {
				s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function () {
				if (!responseContainer) {
					jQuery.error(callbackName + " was not called");
				}
				return responseContainer[0];
			};

			// Force json dataType
			s.dataTypes[0] = "json";

			// Install callback
			overwritten = window[callbackName];
			window[callbackName] = function () {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always(function () {

				// If previous value didn't exist - remove it
				if (overwritten === undefined) {
					jQuery(window).removeProp(callbackName);

					// Otherwise restore preexisting value
				} else {
					window[callbackName] = overwritten;
				}

				// Save back as free
				if (s[callbackName]) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push(callbackName);
				}

				// Call if it was a function and we have a response
				if (responseContainer && jQuery.isFunction(overwritten)) {
					overwritten(responseContainer[0]);
				}

				responseContainer = overwritten = undefined;
			});

			// Delegate to script
			return "script";
		}
	});




	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function (data, context, keepScripts) {
		if (!data || typeof data !== "string") {
			return null;
		}
		if (typeof context === "boolean") {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec(data),
			scripts = !keepScripts && [];

		// Single tag
		if (parsed) {
			return [context.createElement(parsed[1])];
		}

		parsed = buildFragment([data], context, scripts);

		if (scripts && scripts.length) {
			jQuery(scripts).remove();
		}

		return jQuery.merge([], parsed.childNodes);
	};


	// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function (url, params, callback) {
		if (typeof url !== "string" && _load) {
			return _load.apply(this, arguments);
		}

		var selector, type, response,
			self = this,
			off = url.indexOf(" ");

		if (off > -1) {
			selector = jQuery.trim(url.slice(off));
			url = url.slice(0, off);
		}

		// If it's a function
		if (jQuery.isFunction(params)) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

			// Otherwise, build a param string
		} else if (params && typeof params === "object") {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if (self.length > 0) {
			jQuery.ajax({
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			}).done(function (responseText) {

				// Save response for use in complete callback
				response = arguments;

				self.html(selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

					// Otherwise use the full result
					responseText);

				// If the request succeeds, this function gets "data", "status", "jqXHR"
				// but they are ignored because response was set above.
				// If it fails, this function gets "jqXHR", "status", "error"
			}).always(callback && function (jqXHR, status) {
				self.each(function () {
					callback.apply(self, response || [jqXHR.responseText, status, jqXHR]);
				});
			});
		}

		return this;
	};




	// Attach a bunch of functions for handling common AJAX events
	jQuery.each([
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function (i, type) {
		jQuery.fn[type] = function (fn) {
			return this.on(type, fn);
		};
	});




	jQuery.expr.filters.animated = function (elem) {
		return jQuery.grep(jQuery.timers, function (fn) {
			return elem === fn.elem;
		}).length;
	};




	/**
	 * Gets a window from an element
	 */
	function getWindow(elem) {
		return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function (elem, options, i) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css(elem, "position"),
				curElem = jQuery(elem),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if (position === "static") {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css(elem, "top");
			curCSSLeft = jQuery.css(elem, "left");
			calculatePosition = (position === "absolute" || position === "fixed") &&
				(curCSSTop + curCSSLeft).indexOf("auto") > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if (calculatePosition) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat(curCSSTop) || 0;
				curLeft = parseFloat(curCSSLeft) || 0;
			}

			if (jQuery.isFunction(options)) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call(elem, i, jQuery.extend({}, curOffset));
			}

			if (options.top != null) {
				props.top = (options.top - curOffset.top) + curTop;
			}
			if (options.left != null) {
				props.left = (options.left - curOffset.left) + curLeft;
			}

			if ("using" in options) {
				options.using.call(elem, props);

			} else {
				curElem.css(props);
			}
		}
	};

	jQuery.fn.extend({
		offset: function (options) {
			if (arguments.length) {
				return options === undefined ?
					this :
					this.each(function (i) {
						jQuery.offset.setOffset(this, options, i);
					});
			}

			var docElem, win,
				elem = this[0],
				box = {
					top: 0,
					left: 0
				},
				doc = elem && elem.ownerDocument;

			if (!doc) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if (!jQuery.contains(docElem, elem)) {
				return box;
			}

			box = elem.getBoundingClientRect();
			win = getWindow(doc);
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function () {
			if (!this[0]) {
				return;
			}

			var offsetParent, offset,
				elem = this[0],
				parentOffset = {
					top: 0,
					left: 0
				};

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if (jQuery.css(elem, "position") === "fixed") {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();

			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if (!jQuery.nodeName(offsetParent[0], "html")) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
				parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
				left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function () {
			return this.map(function () {
				var offsetParent = this.offsetParent;

				while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			});
		}
	});

	// Create scrollLeft and scrollTop methods
	jQuery.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function (method, prop) {
		var top = "pageYOffset" === prop;

		jQuery.fn[method] = function (val) {
			return access(this, function (elem, method, val) {
				var win = getWindow(elem);

				if (val === undefined) {
					return win ? win[prop] : elem[method];
				}

				if (win) {
					win.scrollTo(!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);

				} else {
					elem[method] = val;
				}
			}, method, val, arguments.length);
		};
	});

	// Support: Safari<7-8+, Chrome<37-44+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each(["top", "left"], function (i, prop) {
		jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition,
			function (elem, computed) {
				if (computed) {
					computed = curCSS(elem, prop);

					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test(computed) ?
						jQuery(elem).position()[prop] + "px" :
						computed;
				}
			}
		);
	});


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each({
		Height: "height",
		Width: "width"
	}, function (name, type) {
		jQuery.each({
			padding: "inner" + name,
			content: type,
			"": "outer" + name
		},
			function (defaultExtra, funcName) {

				// Margin is only for outerHeight, outerWidth
				jQuery.fn[funcName] = function (margin, value) {
					var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
						extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

					return access(this, function (elem, type, value) {
						var doc;

						if (jQuery.isWindow(elem)) {

							// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
							// isn't a whole lot we can do. See pull request at this URL for discussion:
							// https://github.com/jquery/jquery/pull/764
							return elem.document.documentElement["client" + name];
						}

						// Get document width or height
						if (elem.nodeType === 9) {
							doc = elem.documentElement;

							// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
							// whichever is greatest
							return Math.max(
								elem.body["scroll" + name], doc["scroll" + name],
								elem.body["offset" + name], doc["offset" + name],
								doc["client" + name]
							);
						}

						return value === undefined ?

							// Get width or height on the element, requesting but not forcing parseFloat
							jQuery.css(elem, type, extra) :

							// Set width or height on the element
							jQuery.style(elem, type, value, extra);
					}, type, chainable ? margin : undefined, chainable, null);
				};
			});
	});


	jQuery.fn.extend({

		bind: function (types, data, fn) {
			return this.on(types, null, data, fn);
		},
		unbind: function (types, fn) {
			return this.off(types, null, fn);
		},

		delegate: function (selector, types, data, fn) {
			return this.on(types, selector, data, fn);
		},
		undelegate: function (selector, types, fn) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off(selector, "**") :
				this.off(types, selector || "**", fn);
		},
		size: function () {
			return this.length;
		}
	});

	jQuery.fn.andSelf = jQuery.fn.addBack;




	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if (typeof define === "function" && define.amd) {
		define("jquery", [], function () {
			return jQuery;
		});
	}



	var

		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function (deep) {
		if (window.$ === jQuery) {
			window.$ = _$;
		}

		if (deep && window.jQuery === jQuery) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if (!noGlobal) {
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
}));

/*! VelocityJS.org (1.2.3). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */

/*************************
   Velocity jQuery Shim
*************************/

/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */

/* This file contains the jQuery functions that Velocity relies on, thereby removing Velocity's dependency on a full copy of jQuery, and allowing it to work in any environment. */
/* These shimmed functions are only used if jQuery isn't present. If both this shim and jQuery are loaded, Velocity defaults to jQuery proper. */
/* Browser support: Using this shim instead of jQuery proper removes support for IE8. */

;
(function (window) {
	/***************
		 Setup
	***************/

	/* If jQuery is already loaded, there's no point in loading this shim. */
	if (window.jQuery) {
		return;
	}

	/* jQuery base. */
	var $ = function (selector, context) {
		return new $.fn.init(selector, context);
	};

	/********************
	   Private Methods
	********************/

	/* jQuery */
	$.isWindow = function (obj) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	};

	/* jQuery */
	$.type = function (obj) {
		if (obj == null) {
			return obj + "";
		}

		return typeof obj === "object" || typeof obj === "function" ?
			class2type[toString.call(obj)] || "object" :
			typeof obj;
	};

	/* jQuery */
	$.isArray = Array.isArray || function (obj) {
		return $.type(obj) === "array";
	};

	/* jQuery */
	function isArraylike(obj) {
		var length = obj.length,
			type = $.type(obj);

		if (type === "function" || $.isWindow(obj)) {
			return false;
		}

		if (obj.nodeType === 1 && length) {
			return true;
		}

		return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
	}

	/***************
	   $ Methods
	***************/

	/* jQuery: Support removed for IE<9. */
	$.isPlainObject = function (obj) {
		var key;

		if (!obj || $.type(obj) !== "object" || obj.nodeType || $.isWindow(obj)) {
			return false;
		}

		try {
			if (obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
				return false;
			}
		} catch (e) {
			return false;
		}

		for (key in obj) { }

		return key === undefined || hasOwn.call(obj, key);
	};

	/* jQuery */
	$.each = function (obj, callback, args) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike(obj);

		if (args) {
			if (isArray) {
				for (; i < length; i++) {
					value = callback.apply(obj[i], args);

					if (value === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					value = callback.apply(obj[i], args);

					if (value === false) {
						break;
					}
				}
			}

		} else {
			if (isArray) {
				for (; i < length; i++) {
					value = callback.call(obj[i], i, obj[i]);

					if (value === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					value = callback.call(obj[i], i, obj[i]);

					if (value === false) {
						break;
					}
				}
			}
		}

		return obj;
	};

	/* Custom */
	$.data = function (node, key, value) {
		/* $.getData() */
		if (value === undefined) {
			var id = node[$.expando],
				store = id && cache[id];

			if (key === undefined) {
				return store;
			} else if (store) {
				if (key in store) {
					return store[key];
				}
			}
			/* $.setData() */
		} else if (key !== undefined) {
			var id = node[$.expando] || (node[$.expando] = ++$.uuid);

			cache[id] = cache[id] || {};
			cache[id][key] = value;

			return value;
		}
	};

	/* Custom */
	$.removeData = function (node, keys) {
		var id = node[$.expando],
			store = id && cache[id];

		if (store) {
			$.each(keys, function (_, key) {
				delete store[key];
			});
		}
	};

	/* jQuery */
	$.extend = function () {
		var src, copyIsArray, copy, name, options, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		if (typeof target === "boolean") {
			deep = target;

			target = arguments[i] || {};
			i++;
		}

		if (typeof target !== "object" && $.type(target) !== "function") {
			target = {};
		}

		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {
			if ((options = arguments[i]) != null) {
				for (name in options) {
					src = target[name];
					copy = options[name];

					if (target === copy) {
						continue;
					}

					if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && $.isArray(src) ? src : [];

						} else {
							clone = src && $.isPlainObject(src) ? src : {};
						}

						target[name] = $.extend(deep, clone, copy);

					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		return target;
	};

	/* jQuery 1.4.3 */
	$.queue = function (elem, type, data) {
		function $makeArray(arr, results) {
			var ret = results || [];

			if (arr != null) {
				if (isArraylike(Object(arr))) {
					/* $.merge */
					(function (first, second) {
						var len = +second.length,
							j = 0,
							i = first.length;

						while (j < len) {
							first[i++] = second[j++];
						}

						if (len !== len) {
							while (second[j] !== undefined) {
								first[i++] = second[j++];
							}
						}

						first.length = i;

						return first;
					})(ret, typeof arr === "string" ? [arr] : arr);
				} else {
					[].push.call(ret, arr);
				}
			}

			return ret;
		}

		if (!elem) {
			return;
		}

		type = (type || "fx") + "queue";

		var q = $.data(elem, type);

		if (!data) {
			return q || [];
		}

		if (!q || $.isArray(data)) {
			q = $.data(elem, type, $makeArray(data));
		} else {
			q.push(data);
		}

		return q;
	};

	/* jQuery 1.4.3 */
	$.dequeue = function (elems, type) {
		/* Custom: Embed element iteration. */
		$.each(elems.nodeType ? [elems] : elems, function (i, elem) {
			type = type || "fx";

			var queue = $.queue(elem, type),
				fn = queue.shift();

			if (fn === "inprogress") {
				fn = queue.shift();
			}

			if (fn) {
				if (type === "fx") {
					queue.unshift("inprogress");
				}

				fn.call(elem, function () {
					$.dequeue(elem, type);
				});
			}
		});
	};

	/******************
	   $.fn Methods
	******************/

	/* jQuery */
	$.fn = $.prototype = {
		init: function (selector) {
			/* Just return the element wrapped inside an array; don't proceed with the actual jQuery node wrapping process. */
			if (selector.nodeType) {
				this[0] = selector;

				return this;
			} else {
				throw new Error("Not a DOM node.");
			}
		},

		offset: function () {
			/* jQuery altered code: Dropped disconnected DOM node checking. */
			var box = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {
				top: 0,
				left: 0
			};

			return {
				top: box.top + (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
				left: box.left + (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
			};
		},

		position: function () {
			/* jQuery */
			function offsetParent() {
				var offsetParent = this.offsetParent || document;

				while (offsetParent && (!offsetParent.nodeType.toLowerCase === "html" && offsetParent.style.position === "static")) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || document;
			}

			/* Zepto */
			var elem = this[0],
				offsetParent = offsetParent.apply(elem),
				offset = this.offset(),
				parentOffset = /^(?:body|html)$/i.test(offsetParent.nodeName) ? {
					top: 0,
					left: 0
				} : $(offsetParent).offset()

			offset.top -= parseFloat(elem.style.marginTop) || 0;
			offset.left -= parseFloat(elem.style.marginLeft) || 0;

			if (offsetParent.style) {
				parentOffset.top += parseFloat(offsetParent.style.borderTopWidth) || 0
				parentOffset.left += parseFloat(offsetParent.style.borderLeftWidth) || 0
			}

			return {
				top: offset.top - parentOffset.top,
				left: offset.left - parentOffset.left
			};
		}
	};

	/**********************
	   Private Variables
	**********************/

	/* For $.data() */
	var cache = {};
	$.expando = "velocity" + (new Date().getTime());
	$.uuid = 0;

	/* For $.queue() */
	var class2type = {},
		hasOwn = class2type.hasOwnProperty,
		toString = class2type.toString;

	var types = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
	for (var i = 0; i < types.length; i++) {
		class2type["[object " + types[i] + "]"] = types[i].toLowerCase();
	}

	/* Makes $(node) possible, without having to call init. */
	$.fn.init.prototype = $.fn;

	/* Globalize Velocity onto the window, and assign its Utilities property. */
	window.Velocity = {
		Utilities: $
	};
})(window);

/******************
	Velocity.js
******************/

;
(function (factory) {
	/* CommonJS module. */
	if (typeof module === "object" && typeof module.exports === "object") {
		module.exports = factory();
		/* AMD module. */
	} else if (typeof define === "function" && define.amd) {
		define(factory);
		/* Browser globals. */
	} else {
		factory();
	}
}(function () {
	return function (global, window, document, undefined) {

		/***************
			Summary
		***************/

		/*
		- CSS: CSS stack that works independently from the rest of Velocity.
		- animate(): Core animation method that iterates over the targeted elements and queues the incoming call onto each element individually.
		  - Pre-Queueing: Prepare the element for animation by instantiating its data cache and processing the call's options.
		  - Queueing: The logic that runs once the call has reached its point of execution in the element's $.queue() stack.
					  Most logic is placed here to avoid risking it becoming stale (if the element's properties have changed).
		  - Pushing: Consolidation of the tween data followed by its push onto the global in-progress calls container.
		- tick(): The single requestAnimationFrame loop responsible for tweening all in-progress calls.
		- completeCall(): Handles the cleanup process for each Velocity call.
		*/

		/*********************
		   Helper Functions
		*********************/

		/* IE detection. Gist: https://gist.github.com/julianshapiro/9098609 */
		var IE = (function () {
			if (document.documentMode) {
				return document.documentMode;
			} else {
				for (var i = 7; i > 4; i--) {
					var div = document.createElement("div");

					div.innerHTML = "<!--[if IE " + i + "]><span></span><![endif]-->";

					if (div.getElementsByTagName("span").length) {
						div = null;

						return i;
					}
				}
			}

			return undefined;
		})();

		/* rAF shim. Gist: https://gist.github.com/julianshapiro/9497513 */
		var rAFShim = (function () {
			var timeLast = 0;

			return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
				var timeCurrent = (new Date()).getTime(),
					timeDelta;

				/* Dynamically set delay on a per-tick basis to match 60fps. */
				/* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671 */
				timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));
				timeLast = timeCurrent + timeDelta;

				return setTimeout(function () {
					callback(timeCurrent + timeDelta);
				}, timeDelta);
			};
		})();

		/* Array compacting. Copyright Lo-Dash. MIT License: https://github.com/lodash/lodash/blob/master/LICENSE.txt */
		function compactSparseArray(array) {
			var index = -1,
				length = array ? array.length : 0,
				result = [];

			while (++index < length) {
				var value = array[index];

				if (value) {
					result.push(value);
				}
			}

			return result;
		}

		function sanitizeElements(elements) {
			/* Unwrap jQuery/Zepto objects. */
			if (Type.isWrapped(elements)) {
				elements = [].slice.call(elements);
				/* Wrap a single element in an array so that $.each() can iterate with the element instead of its node's children. */
			} else if (Type.isNode(elements)) {
				elements = [elements];
			}

			return elements;
		}

		var Type = {
			isString: function (variable) {
				return (typeof variable === "string");
			},
			isArray: Array.isArray || function (variable) {
				return Object.prototype.toString.call(variable) === "[object Array]";
			},
			isFunction: function (variable) {
				return Object.prototype.toString.call(variable) === "[object Function]";
			},
			isNode: function (variable) {
				return variable && variable.nodeType;
			},
			/* Copyright Martin Bohm. MIT License: https://gist.github.com/Tomalak/818a78a226a0738eaade */
			isNodeList: function (variable) {
				return typeof variable === "object" &&
					/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(variable)) &&
					variable.length !== undefined &&
					(variable.length === 0 || (typeof variable[0] === "object" && variable[0].nodeType > 0));
			},
			/* Determine if variable is a wrapped jQuery or Zepto element. */
			isWrapped: function (variable) {
				return variable && (variable.jquery || (window.Zepto && window.Zepto.zepto.isZ(variable)));
			},
			isSVG: function (variable) {
				return window.SVGElement && (variable instanceof window.SVGElement);
			},
			isEmptyObject: function (variable) {
				for (var name in variable) {
					return false;
				}

				return true;
			}
		};

		/*****************
		   Dependencies
		*****************/

		var $,
			isJQuery = false;

		if (global.fn && global.fn.jquery) {
			$ = global;
			isJQuery = true;
		} else {
			$ = window.Velocity.Utilities;
		}

		if (IE <= 8 && !isJQuery) {
			throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
		} else if (IE <= 7) {
			/* Revert to jQuery's $.animate(), and lose Velocity's extra features. */
			jQuery.fn.velocity = jQuery.fn.animate;

			/* Now that $.fn.velocity is aliased, abort this Velocity declaration. */
			return;
		}

		/*****************
			Constants
		*****************/

		var DURATION_DEFAULT = 400,
			EASING_DEFAULT = "swing";

		/*************
			State
		*************/

		var Velocity = {
			/* Container for page-wide Velocity state data. */
			State: {
				/* Detect mobile devices to determine if mobileHA should be turned on. */
				isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
				/* The mobileHA option's behavior changes on older Android devices (Gingerbread, versions 2.3.3-2.3.7). */
				isAndroid: /Android/i.test(navigator.userAgent),
				isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
				isChrome: window.chrome,
				isFirefox: /Firefox/i.test(navigator.userAgent),
				/* Create a cached element for re-use when checking for CSS property prefixes. */
				prefixElement: document.createElement("div"),
				/* Cache every prefix match to avoid repeating lookups. */
				prefixMatches: {},
				/* Cache the anchor used for animating window scrolling. */
				scrollAnchor: null,
				/* Cache the browser-specific property names associated with the scroll anchor. */
				scrollPropertyLeft: null,
				scrollPropertyTop: null,
				/* Keep track of whether our RAF tick is running. */
				isTicking: false,
				/* Container for every in-progress call to Velocity. */
				calls: []
			},
			/* Velocity's custom CSS stack. Made global for unit testing. */
			CSS: { /* Defined below. */ },
			/* A shim of the jQuery utility functions used by Velocity -- provided by Velocity's optional jQuery shim. */
			Utilities: $,
			/* Container for the user's custom animation redirects that are referenced by name in place of the properties map argument. */
			Redirects: { /* Manually registered by the user. */ },
			Easings: { /* Defined below. */ },
			/* Attempt to use ES6 Promises by default. Users can override this with a third-party promises library. */
			Promise: window.Promise,
			/* Velocity option defaults, which can be overriden by the user. */
			defaults: {
				queue: "",
				duration: DURATION_DEFAULT,
				easing: EASING_DEFAULT,
				begin: undefined,
				complete: undefined,
				progress: undefined,
				display: undefined,
				visibility: undefined,
				loop: false,
				delay: false,
				mobileHA: true,
				/* Advanced: Set to false to prevent property values from being cached between consecutive Velocity-initiated chain calls. */
				_cacheValues: true
			},
			/* A design goal of Velocity is to cache data wherever possible in order to avoid DOM requerying. Accordingly, each element has a data cache. */
			init: function (element) {
				$.data(element, "velocity", {
					/* Store whether this is an SVG element, since its properties are retrieved and updated differently than standard HTML elements. */
					isSVG: Type.isSVG(element),
					/* Keep track of whether the element is currently being animated by Velocity.
					   This is used to ensure that property values are not transferred between non-consecutive (stale) calls. */
					isAnimating: false,
					/* A reference to the element's live computedStyle object. Learn more here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */
					computedStyle: null,
					/* Tween data is cached for each animation on the element so that data can be passed across calls --
					   in particular, end values are used as subsequent start values in consecutive Velocity calls. */
					tweensContainer: null,
					/* The full root property values of each CSS hook being animated on this element are cached so that:
					   1) Concurrently-animating hooks sharing the same root can have their root values' merged into one while tweening.
					   2) Post-hook-injection root values can be transferred over to consecutively chained Velocity calls as starting root values. */
					rootPropertyValueCache: {},
					/* A cache for transform updates, which must be manually flushed via CSS.flushTransformCache(). */
					transformCache: {}
				});
			},
			/* A parallel to jQuery's $.css(), used for getting/setting Velocity's hooked CSS properties. */
			hook: null,
			/* Defined below. */
			/* Velocity-wide animation time remapping for testing purposes. */
			mock: false,
			version: {
				major: 1,
				minor: 2,
				patch: 2
			},
			/* Set to 1 or 2 (most verbose) to output debug info to console. */
			debug: false
		};

		/* Retrieve the appropriate scroll anchor and property name for the browser: https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY */
		if (window.pageYOffset !== undefined) {
			Velocity.State.scrollAnchor = window;
			Velocity.State.scrollPropertyLeft = "pageXOffset";
			Velocity.State.scrollPropertyTop = "pageYOffset";
		} else {
			Velocity.State.scrollAnchor = document.documentElement || document.body.parentNode || document.body;
			Velocity.State.scrollPropertyLeft = "scrollLeft";
			Velocity.State.scrollPropertyTop = "scrollTop";
		}

		/* Shorthand alias for jQuery's $.data() utility. */
		function Data(element) {
			/* Hardcode a reference to the plugin name. */
			var response = $.data(element, "velocity");

			/* jQuery <=1.4.2 returns null instead of undefined when no match is found. We normalize this behavior. */
			return response === null ? undefined : response;
		};

		/**************
			Easing
		**************/

		/* Step easing generator. */
		function generateStep(steps) {
			return function (p) {
				return Math.round(p * steps) * (1 / steps);
			};
		}

		/* Bezier curve function generator. Copyright Gaetan Renaudeau. MIT License: http://en.wikipedia.org/wiki/MIT_License */
		function generateBezier(mX1, mY1, mX2, mY2) {
			var NEWTON_ITERATIONS = 4,
				NEWTON_MIN_SLOPE = 0.001,
				SUBDIVISION_PRECISION = 0.0000001,
				SUBDIVISION_MAX_ITERATIONS = 10,
				kSplineTableSize = 11,
				kSampleStepSize = 1.0 / (kSplineTableSize - 1.0),
				float32ArraySupported = "Float32Array" in window;

			/* Must contain four arguments. */
			if (arguments.length !== 4) {
				return false;
			}

			/* Arguments must be numbers. */
			for (var i = 0; i < 4; ++i) {
				if (typeof arguments[i] !== "number" || isNaN(arguments[i]) || !isFinite(arguments[i])) {
					return false;
				}
			}

			/* X values must be in the [0, 1] range. */
			mX1 = Math.min(mX1, 1);
			mX2 = Math.min(mX2, 1);
			mX1 = Math.max(mX1, 0);
			mX2 = Math.max(mX2, 0);

			var mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);

			function A(aA1, aA2) {
				return 1.0 - 3.0 * aA2 + 3.0 * aA1;
			}

			function B(aA1, aA2) {
				return 3.0 * aA2 - 6.0 * aA1;
			}

			function C(aA1) {
				return 3.0 * aA1;
			}

			function calcBezier(aT, aA1, aA2) {
				return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
			}

			function getSlope(aT, aA1, aA2) {
				return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
			}

			function newtonRaphsonIterate(aX, aGuessT) {
				for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
					var currentSlope = getSlope(aGuessT, mX1, mX2);

					if (currentSlope === 0.0) return aGuessT;

					var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
					aGuessT -= currentX / currentSlope;
				}

				return aGuessT;
			}

			function calcSampleValues() {
				for (var i = 0; i < kSplineTableSize; ++i) {
					mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
				}
			}

			function binarySubdivide(aX, aA, aB) {
				var currentX, currentT, i = 0;

				do {
					currentT = aA + (aB - aA) / 2.0;
					currentX = calcBezier(currentT, mX1, mX2) - aX;
					if (currentX > 0.0) {
						aB = currentT;
					} else {
						aA = currentT;
					}
				} while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);

				return currentT;
			}

			function getTForX(aX) {
				var intervalStart = 0.0,
					currentSample = 1,
					lastSample = kSplineTableSize - 1;

				for (; currentSample != lastSample && mSampleValues[currentSample] <= aX; ++currentSample) {
					intervalStart += kSampleStepSize;
				}

				--currentSample;

				var dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample + 1] - mSampleValues[currentSample]),
					guessForT = intervalStart + dist * kSampleStepSize,
					initialSlope = getSlope(guessForT, mX1, mX2);

				if (initialSlope >= NEWTON_MIN_SLOPE) {
					return newtonRaphsonIterate(aX, guessForT);
				} else if (initialSlope == 0.0) {
					return guessForT;
				} else {
					return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
				}
			}

			var _precomputed = false;

			function precompute() {
				_precomputed = true;
				if (mX1 != mY1 || mX2 != mY2) calcSampleValues();
			}

			var f = function (aX) {
				if (!_precomputed) precompute();
				if (mX1 === mY1 && mX2 === mY2) return aX;
				if (aX === 0) return 0;
				if (aX === 1) return 1;

				return calcBezier(getTForX(aX), mY1, mY2);
			};

			f.getControlPoints = function () {
				return [{
					x: mX1,
					y: mY1
				}, {
					x: mX2,
					y: mY2
				}];
			};

			var str = "generateBezier(" + [mX1, mY1, mX2, mY2] + ")";
			f.toString = function () {
				return str;
			};

			return f;
		}

		/* Runge-Kutta spring physics function generator. Adapted from Framer.js, copyright Koen Bok. MIT License: http://en.wikipedia.org/wiki/MIT_License */
		/* Given a tension, friction, and duration, a simulation at 60FPS will first run without a defined duration in order to calculate the full path. A second pass
		   then adjusts the time delta -- using the relation between actual time and duration -- to calculate the path for the duration-constrained animation. */
		var generateSpringRK4 = (function () {
			function springAccelerationForState(state) {
				return (-state.tension * state.x) - (state.friction * state.v);
			}

			function springEvaluateStateWithDerivative(initialState, dt, derivative) {
				var state = {
					x: initialState.x + derivative.dx * dt,
					v: initialState.v + derivative.dv * dt,
					tension: initialState.tension,
					friction: initialState.friction
				};

				return {
					dx: state.v,
					dv: springAccelerationForState(state)
				};
			}

			function springIntegrateState(state, dt) {
				var a = {
					dx: state.v,
					dv: springAccelerationForState(state)
				},
					b = springEvaluateStateWithDerivative(state, dt * 0.5, a),
					c = springEvaluateStateWithDerivative(state, dt * 0.5, b),
					d = springEvaluateStateWithDerivative(state, dt, c),
					dxdt = 1.0 / 6.0 * (a.dx + 2.0 * (b.dx + c.dx) + d.dx),
					dvdt = 1.0 / 6.0 * (a.dv + 2.0 * (b.dv + c.dv) + d.dv);

				state.x = state.x + dxdt * dt;
				state.v = state.v + dvdt * dt;

				return state;
			}

			return function springRK4Factory(tension, friction, duration) {

				var initState = {
					x: -1,
					v: 0,
					tension: null,
					friction: null
				},
					path = [0],
					time_lapsed = 0,
					tolerance = 1 / 10000,
					DT = 16 / 1000,
					have_duration, dt, last_state;

				tension = parseFloat(tension) || 500;
				friction = parseFloat(friction) || 20;
				duration = duration || null;

				initState.tension = tension;
				initState.friction = friction;

				have_duration = duration !== null;

				/* Calculate the actual time it takes for this animation to complete with the provided conditions. */
				if (have_duration) {
					/* Run the simulation without a duration. */
					time_lapsed = springRK4Factory(tension, friction);
					/* Compute the adjusted time delta. */
					dt = time_lapsed / duration * DT;
				} else {
					dt = DT;
				}

				while (true) {
					/* Next/step function .*/
					last_state = springIntegrateState(last_state || initState, dt);
					/* Store the position. */
					path.push(1 + last_state.x);
					time_lapsed += 16;
					/* If the change threshold is reached, break. */
					if (!(Math.abs(last_state.x) > tolerance && Math.abs(last_state.v) > tolerance)) {
						break;
					}
				}

				/* If duration is not defined, return the actual time required for completing this animation. Otherwise, return a closure that holds the
				   computed path and returns a snapshot of the position according to a given percentComplete. */
				return !have_duration ? time_lapsed : function (percentComplete) {
					return path[(percentComplete * (path.length - 1)) | 0];
				};
			};
		}());

		/* jQuery easings. */
		Velocity.Easings = {
			linear: function (p) {
				return p;
			},
			swing: function (p) {
				return 0.5 - Math.cos(p * Math.PI) / 2
			},
			/* Bonus "spring" easing, which is a less exaggerated version of easeInOutElastic. */
			spring: function (p) {
				return 1 - (Math.cos(p * 4.5 * Math.PI) * Math.exp(-p * 6));
			}
		};

		/* CSS3 and Robert Penner easings. */
		$.each(
			[
				["ease", [0.25, 0.1, 0.25, 1.0]],
				["ease-in", [0.42, 0.0, 1.00, 1.0]],
				["ease-out", [0.00, 0.0, 0.58, 1.0]],
				["ease-in-out", [0.42, 0.0, 0.58, 1.0]],
				["easeInSine", [0.47, 0, 0.745, 0.715]],
				["easeOutSine", [0.39, 0.575, 0.565, 1]],
				["easeInOutSine", [0.445, 0.05, 0.55, 0.95]],
				["easeInQuad", [0.55, 0.085, 0.68, 0.53]],
				["easeOutQuad", [0.25, 0.46, 0.45, 0.94]],
				["easeInOutQuad", [0.455, 0.03, 0.515, 0.955]],
				["easeInCubic", [0.55, 0.055, 0.675, 0.19]],
				["easeOutCubic", [0.215, 0.61, 0.355, 1]],
				["easeInOutCubic", [0.645, 0.045, 0.355, 1]],
				["easeInQuart", [0.895, 0.03, 0.685, 0.22]],
				["easeOutQuart", [0.165, 0.84, 0.44, 1]],
				["easeInOutQuart", [0.77, 0, 0.175, 1]],
				["easeInQuint", [0.755, 0.05, 0.855, 0.06]],
				["easeOutQuint", [0.23, 1, 0.32, 1]],
				["easeInOutQuint", [0.86, 0, 0.07, 1]],
				["easeInExpo", [0.95, 0.05, 0.795, 0.035]],
				["easeOutExpo", [0.19, 1, 0.22, 1]],
				["easeInOutExpo", [1, 0, 0, 1]],
				["easeInCirc", [0.6, 0.04, 0.98, 0.335]],
				["easeOutCirc", [0.075, 0.82, 0.165, 1]],
				["easeInOutCirc", [0.785, 0.135, 0.15, 0.86]]
			],
			function (i, easingArray) {
				Velocity.Easings[easingArray[0]] = generateBezier.apply(null, easingArray[1]);
			});

		/* Determine the appropriate easing type given an easing input. */
		function getEasing(value, duration) {
			var easing = value;

			/* The easing option can either be a string that references a pre-registered easing,
			   or it can be a two-/four-item array of integers to be converted into a bezier/spring function. */
			if (Type.isString(value)) {
				/* Ensure that the easing has been assigned to jQuery's Velocity.Easings object. */
				if (!Velocity.Easings[value]) {
					easing = false;
				}
			} else if (Type.isArray(value) && value.length === 1) {
				easing = generateStep.apply(null, value);
			} else if (Type.isArray(value) && value.length === 2) {
				/* springRK4 must be passed the animation's duration. */
				/* Note: If the springRK4 array contains non-numbers, generateSpringRK4() returns an easing
				   function generated with default tension and friction values. */
				easing = generateSpringRK4.apply(null, value.concat([duration]));
			} else if (Type.isArray(value) && value.length === 4) {
				/* Note: If the bezier array contains non-numbers, generateBezier() returns false. */
				easing = generateBezier.apply(null, value);
			} else {
				easing = false;
			}

			/* Revert to the Velocity-wide default easing type, or fall back to "swing" (which is also jQuery's default)
			   if the Velocity-wide default has been incorrectly modified. */
			if (easing === false) {
				if (Velocity.Easings[Velocity.defaults.easing]) {
					easing = Velocity.defaults.easing;
				} else {
					easing = EASING_DEFAULT;
				}
			}

			return easing;
		}

		/*****************
			CSS Stack
		*****************/

		/* The CSS object is a highly condensed and performant CSS stack that fully replaces jQuery's.
		   It handles the validation, getting, and setting of both standard CSS properties and CSS property hooks. */
		/* Note: A "CSS" shorthand is aliased so that our code is easier to read. */
		var CSS = Velocity.CSS = {

			/*************
				RegEx
			*************/

			RegEx: {
				isHex: /^#([A-f\d]{3}){1,2}$/i,
				/* Unwrap a property value's surrounding text, e.g. "rgba(4, 3, 2, 1)" ==> "4, 3, 2, 1" and "rect(4px 3px 2px 1px)" ==> "4px 3px 2px 1px". */
				valueUnwrap: /^[A-z]+\((.*)\)$/i,
				wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
				/* Split a multi-value property into an array of subvalues, e.g. "rgba(4, 3, 2, 1) 4px 3px 2px 1px" ==> [ "rgba(4, 3, 2, 1)", "4px", "3px", "2px", "1px" ]. */
				valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/ig
			},

			/************
				Lists
			************/

			Lists: {
				colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
				transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
				transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
			},

			/************
				Hooks
			************/

			/* Hooks allow a subproperty (e.g. "boxShadowBlur") of a compound-value CSS property
			   (e.g. "boxShadow: X Y Blur Spread Color") to be animated as if it were a discrete property. */
			/* Note: Beyond enabling fine-grained property animation, hooking is necessary since Velocity only
			   tweens properties with single numeric values; unlike CSS transitions, Velocity does not interpolate compound-values. */
			Hooks: {
				/********************
					Registration
				********************/

				/* Templates are a concise way of indicating which subproperties must be individually registered for each compound-value CSS property. */
				/* Each template consists of the compound-value's base name, its constituent subproperty names, and those subproperties' default values. */
				templates: {
					"textShadow": ["Color X Y Blur", "black 0px 0px 0px"],
					"boxShadow": ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
					"clip": ["Top Right Bottom Left", "0px 0px 0px 0px"],
					"backgroundPosition": ["X Y", "0% 0%"],
					"transformOrigin": ["X Y Z", "50% 50% 0px"],
					"perspectiveOrigin": ["X Y", "50% 50%"]
				},

				/* A "registered" hook is one that has been converted from its template form into a live,
				   tweenable property. It contains data to associate it with its root property. */
				registered: {
					/* Note: A registered hook looks like this ==> textShadowBlur: [ "textShadow", 3 ],
					   which consists of the subproperty's name, the associated root property's name,
					   and the subproperty's position in the root's value. */
				},
				/* Convert the templates into individual hooks then append them to the registered object above. */
				register: function () {
					/* Color hooks registration: Colors are defaulted to white -- as opposed to black -- since colors that are
					   currently set to "transparent" default to their respective template below when color-animated,
					   and white is typically a closer match to transparent than black is. An exception is made for text ("color"),
					   which is almost always set closer to black than white. */
					for (var i = 0; i < CSS.Lists.colors.length; i++) {
						var rgbComponents = (CSS.Lists.colors[i] === "color") ? "0 0 0 1" : "255 255 255 1";
						CSS.Hooks.templates[CSS.Lists.colors[i]] = ["Red Green Blue Alpha", rgbComponents];
					}

					var rootProperty,
						hookTemplate,
						hookNames;

					/* In IE, color values inside compound-value properties are positioned at the end the value instead of at the beginning.
					   Thus, we re-arrange the templates accordingly. */
					if (IE) {
						for (rootProperty in CSS.Hooks.templates) {
							hookTemplate = CSS.Hooks.templates[rootProperty];
							hookNames = hookTemplate[0].split(" ");

							var defaultValues = hookTemplate[1].match(CSS.RegEx.valueSplit);

							if (hookNames[0] === "Color") {
								/* Reposition both the hook's name and its default value to the end of their respective strings. */
								hookNames.push(hookNames.shift());
								defaultValues.push(defaultValues.shift());

								/* Replace the existing template for the hook's root property. */
								CSS.Hooks.templates[rootProperty] = [hookNames.join(" "), defaultValues.join(" ")];
							}
						}
					}

					/* Hook registration. */
					for (rootProperty in CSS.Hooks.templates) {
						hookTemplate = CSS.Hooks.templates[rootProperty];
						hookNames = hookTemplate[0].split(" ");

						for (var i in hookNames) {
							var fullHookName = rootProperty + hookNames[i],
								hookPosition = i;

							/* For each hook, register its full name (e.g. textShadowBlur) with its root property (e.g. textShadow)
							   and the hook's position in its template's default value string. */
							CSS.Hooks.registered[fullHookName] = [rootProperty, hookPosition];
						}
					}
				},

				/*****************************
				   Injection and Extraction
				*****************************/

				/* Look up the root property associated with the hook (e.g. return "textShadow" for "textShadowBlur"). */
				/* Since a hook cannot be set directly (the browser won't recognize it), style updating for hooks is routed through the hook's root property. */
				getRoot: function (property) {
					var hookData = CSS.Hooks.registered[property];

					if (hookData) {
						return hookData[0];
					} else {
						/* If there was no hook match, return the property name untouched. */
						return property;
					}
				},
				/* Convert any rootPropertyValue, null or otherwise, into a space-delimited list of hook values so that
				   the targeted hook can be injected or extracted at its standard position. */
				cleanRootPropertyValue: function (rootProperty, rootPropertyValue) {
					/* If the rootPropertyValue is wrapped with "rgb()", "clip()", etc., remove the wrapping to normalize the value before manipulation. */
					if (CSS.RegEx.valueUnwrap.test(rootPropertyValue)) {
						rootPropertyValue = rootPropertyValue.match(CSS.RegEx.valueUnwrap)[1];
					}

					/* If rootPropertyValue is a CSS null-value (from which there's inherently no hook value to extract),
					   default to the root's default value as defined in CSS.Hooks.templates. */
					/* Note: CSS null-values include "none", "auto", and "transparent". They must be converted into their
					   zero-values (e.g. textShadow: "none" ==> textShadow: "0px 0px 0px black") for hook manipulation to proceed. */
					if (CSS.Values.isCSSNullValue(rootPropertyValue)) {
						rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
					}

					return rootPropertyValue;
				},
				/* Extracted the hook's value from its root property's value. This is used to get the starting value of an animating hook. */
				extractValue: function (fullHookName, rootPropertyValue) {
					var hookData = CSS.Hooks.registered[fullHookName];

					if (hookData) {
						var hookRoot = hookData[0],
							hookPosition = hookData[1];

						rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);

						/* Split rootPropertyValue into its constituent hook values then grab the desired hook at its standard position. */
						return rootPropertyValue.toString().match(CSS.RegEx.valueSplit)[hookPosition];
					} else {
						/* If the provided fullHookName isn't a registered hook, return the rootPropertyValue that was passed in. */
						return rootPropertyValue;
					}
				},
				/* Inject the hook's value into its root property's value. This is used to piece back together the root property
				   once Velocity has updated one of its individually hooked values through tweening. */
				injectValue: function (fullHookName, hookValue, rootPropertyValue) {
					var hookData = CSS.Hooks.registered[fullHookName];

					if (hookData) {
						var hookRoot = hookData[0],
							hookPosition = hookData[1],
							rootPropertyValueParts,
							rootPropertyValueUpdated;

						rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);

						/* Split rootPropertyValue into its individual hook values, replace the targeted value with hookValue,
						   then reconstruct the rootPropertyValue string. */
						rootPropertyValueParts = rootPropertyValue.toString().match(CSS.RegEx.valueSplit);
						rootPropertyValueParts[hookPosition] = hookValue;
						rootPropertyValueUpdated = rootPropertyValueParts.join(" ");

						return rootPropertyValueUpdated;
					} else {
						/* If the provided fullHookName isn't a registered hook, return the rootPropertyValue that was passed in. */
						return rootPropertyValue;
					}
				}
			},

			/*******************
			   Normalizations
			*******************/

			/* Normalizations standardize CSS property manipulation by pollyfilling browser-specific implementations (e.g. opacity)
			   and reformatting special properties (e.g. clip, rgba) to look like standard ones. */
			Normalizations: {
				/* Normalizations are passed a normalization target (either the property's name, its extracted value, or its injected value),
				   the targeted element (which may need to be queried), and the targeted property value. */
				registered: {
					clip: function (type, element, propertyValue) {
						switch (type) {
							case "name":
								return "clip";
							/* Clip needs to be unwrapped and stripped of its commas during extraction. */
							case "extract":
								var extracted;

								/* If Velocity also extracted this value, skip extraction. */
								if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
									extracted = propertyValue;
								} else {
									/* Remove the "rect()" wrapper. */
									extracted = propertyValue.toString().match(CSS.RegEx.valueUnwrap);

									/* Strip off commas. */
									extracted = extracted ? extracted[1].replace(/,(\s+)?/g, " ") : propertyValue;
								}

								return extracted;
							/* Clip needs to be re-wrapped during injection. */
							case "inject":
								return "rect(" + propertyValue + ")";
						}
					},

					blur: function (type, element, propertyValue) {
						switch (type) {
							case "name":
								return Velocity.State.isFirefox ? "filter" : "-webkit-filter";
							case "extract":
								var extracted = parseFloat(propertyValue);

								/* If extracted is NaN, meaning the value isn't already extracted. */
								if (!(extracted || extracted === 0)) {
									var blurComponent = propertyValue.toString().match(/blur\(([0-9]+[A-z]+)\)/i);

									/* If the filter string had a blur component, return just the blur value and unit type. */
									if (blurComponent) {
										extracted = blurComponent[1];
										/* If the component doesn't exist, default blur to 0. */
									} else {
										extracted = 0;
									}
								}

								return extracted;
							/* Blur needs to be re-wrapped during injection. */
							case "inject":
								/* For the blur effect to be fully de-applied, it needs to be set to "none" instead of 0. */
								if (!parseFloat(propertyValue)) {
									return "none";
								} else {
									return "blur(" + propertyValue + ")";
								}
						}
					},

					/* <=IE8 do not support the standard opacity property. They use filter:alpha(opacity=INT) instead. */
					opacity: function (type, element, propertyValue) {
						if (IE <= 8) {
							switch (type) {
								case "name":
									return "filter";
								case "extract":
									/* <=IE8 return a "filter" value of "alpha(opacity=\d{1,3})".
									   Extract the value and convert it to a decimal value to match the standard CSS opacity property's formatting. */
									var extracted = propertyValue.toString().match(/alpha\(opacity=(.*)\)/i);

									if (extracted) {
										/* Convert to decimal value. */
										propertyValue = extracted[1] / 100;
									} else {
										/* When extracting opacity, default to 1 since a null value means opacity hasn't been set. */
										propertyValue = 1;
									}

									return propertyValue;
								case "inject":
									/* Opacified elements are required to have their zoom property set to a non-zero value. */
									element.style.zoom = 1;

									/* Setting the filter property on elements with certain font property combinations can result in a
									   highly unappealing ultra-bolding effect. There's no way to remedy this throughout a tween, but dropping the
									   value altogether (when opacity hits 1) at leasts ensures that the glitch is gone post-tweening. */
									if (parseFloat(propertyValue) >= 1) {
										return "";
									} else {
										/* As per the filter property's spec, convert the decimal value to a whole number and wrap the value. */
										return "alpha(opacity=" + parseInt(parseFloat(propertyValue) * 100, 10) + ")";
									}
							}
							/* With all other browsers, normalization is not required; return the same values that were passed in. */
						} else {
							switch (type) {
								case "name":
									return "opacity";
								case "extract":
									return propertyValue;
								case "inject":
									return propertyValue;
							}
						}
					}
				},

				/*****************************
					Batched Registrations
				*****************************/

				/* Note: Batched normalizations extend the CSS.Normalizations.registered object. */
				register: function () {

					/*****************
						Transforms
					*****************/

					/* Transforms are the subproperties contained by the CSS "transform" property. Transforms must undergo normalization
					   so that they can be referenced in a properties map by their individual names. */
					/* Note: When transforms are "set", they are actually assigned to a per-element transformCache. When all transform
					   setting is complete complete, CSS.flushTransformCache() must be manually called to flush the values to the DOM.
					   Transform setting is batched in this way to improve performance: the transform style only needs to be updated
					   once when multiple transform subproperties are being animated simultaneously. */
					/* Note: IE9 and Android Gingerbread have support for 2D -- but not 3D -- transforms. Since animating unsupported
					   transform properties results in the browser ignoring the *entire* transform string, we prevent these 3D values
					   from being normalized for these browsers so that tweening skips these properties altogether
					   (since it will ignore them as being unsupported by the browser.) */
					if (!(IE <= 9) && !Velocity.State.isGingerbread) {
						/* Note: Since the standalone CSS "perspective" property and the CSS transform "perspective" subproperty
						share the same name, the latter is given a unique token within Velocity: "transformPerspective". */
						CSS.Lists.transformsBase = CSS.Lists.transformsBase.concat(CSS.Lists.transforms3D);
					}

					for (var i = 0; i < CSS.Lists.transformsBase.length; i++) {
						/* Wrap the dynamically generated normalization function in a new scope so that transformName's value is
						paired with its respective function. (Otherwise, all functions would take the final for loop's transformName.) */
						(function () {
							var transformName = CSS.Lists.transformsBase[i];

							CSS.Normalizations.registered[transformName] = function (type, element, propertyValue) {
								switch (type) {
									/* The normalized property name is the parent "transform" property -- the property that is actually set in CSS. */
									case "name":
										return "transform";
									/* Transform values are cached onto a per-element transformCache object. */
									case "extract":
										/* If this transform has yet to be assigned a value, return its null value. */
										if (Data(element) === undefined || Data(element).transformCache[transformName] === undefined) {
											/* Scale CSS.Lists.transformsBase default to 1 whereas all other transform properties default to 0. */
											return /^scale/i.test(transformName) ? 1 : 0;
											/* When transform values are set, they are wrapped in parentheses as per the CSS spec.
											   Thus, when extracting their values (for tween calculations), we strip off the parentheses. */
										} else {
											return Data(element).transformCache[transformName].replace(/[()]/g, "");
										}
									case "inject":
										var invalid = false;

										/* If an individual transform property contains an unsupported unit type, the browser ignores the *entire* transform property.
										   Thus, protect users from themselves by skipping setting for transform values supplied with invalid unit types. */
										/* Switch on the base transform type; ignore the axis by removing the last letter from the transform's name. */
										switch (transformName.substr(0, transformName.length - 1)) {
											/* Whitelist unit types for each transform. */
											case "translate":
												invalid = !/(%|px|em|rem|vw|vh|\d)$/i.test(propertyValue);
												break;
											/* Since an axis-free "scale" property is supported as well, a little hack is used here to detect it by chopping off its last letter. */
											case "scal":
											case "scale":
												/* Chrome on Android has a bug in which scaled elements blur if their initial scale
												   value is below 1 (which can happen with forcefeeding). Thus, we detect a yet-unset scale property
												   and ensure that its first value is always 1. More info: http://stackoverflow.com/questions/10417890/css3-animations-with-transform-causes-blurred-elements-on-webkit/10417962#10417962 */
												if (Velocity.State.isAndroid && Data(element).transformCache[transformName] === undefined && propertyValue < 1) {
													propertyValue = 1;
												}

												invalid = !/(\d)$/i.test(propertyValue);
												break;
											case "skew":
												invalid = !/(deg|\d)$/i.test(propertyValue);
												break;
											case "rotate":
												invalid = !/(deg|\d)$/i.test(propertyValue);
												break;
										}

										if (!invalid) {
											/* As per the CSS spec, wrap the value in parentheses. */
											Data(element).transformCache[transformName] = "(" + propertyValue + ")";
										}

										/* Although the value is set on the transformCache object, return the newly-updated value for the calling code to process as normal. */
										return Data(element).transformCache[transformName];
								}
							};
						})();
					}

					/*************
						Colors
					*************/

					/* Since Velocity only animates a single numeric value per property, color animation is achieved by hooking the individual RGBA components of CSS color properties.
					   Accordingly, color values must be normalized (e.g. "#ff0000", "red", and "rgb(255, 0, 0)" ==> "255 0 0 1") so that their components can be injected/extracted by CSS.Hooks logic. */
					for (var i = 0; i < CSS.Lists.colors.length; i++) {
						/* Wrap the dynamically generated normalization function in a new scope so that colorName's value is paired with its respective function.
						   (Otherwise, all functions would take the final for loop's colorName.) */
						(function () {
							var colorName = CSS.Lists.colors[i];

							/* Note: In IE<=8, which support rgb but not rgba, color properties are reverted to rgb by stripping off the alpha component. */
							CSS.Normalizations.registered[colorName] = function (type, element, propertyValue) {
								switch (type) {
									case "name":
										return colorName;
									/* Convert all color values into the rgb format. (Old IE can return hex values and color names instead of rgb/rgba.) */
									case "extract":
										var extracted;

										/* If the color is already in its hookable form (e.g. "255 255 255 1") due to having been previously extracted, skip extraction. */
										if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
											extracted = propertyValue;
										} else {
											var converted,
												colorNames = {
													black: "rgb(0, 0, 0)",
													blue: "rgb(0, 0, 255)",
													gray: "rgb(128, 128, 128)",
													green: "rgb(0, 128, 0)",
													red: "rgb(255, 0, 0)",
													white: "rgb(255, 255, 255)"
												};

											/* Convert color names to rgb. */
											if (/^[A-z]+$/i.test(propertyValue)) {
												if (colorNames[propertyValue] !== undefined) {
													converted = colorNames[propertyValue]
												} else {
													/* If an unmatched color name is provided, default to black. */
													converted = colorNames.black;
												}
												/* Convert hex values to rgb. */
											} else if (CSS.RegEx.isHex.test(propertyValue)) {
												converted = "rgb(" + CSS.Values.hexToRgb(propertyValue).join(" ") + ")";
												/* If the provided color doesn't match any of the accepted color formats, default to black. */
											} else if (!(/^rgba?\(/i.test(propertyValue))) {
												converted = colorNames.black;
											}

											/* Remove the surrounding "rgb/rgba()" string then replace commas with spaces and strip
											   repeated spaces (in case the value included spaces to begin with). */
											extracted = (converted || propertyValue).toString().match(CSS.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ");
										}

										/* So long as this isn't <=IE8, add a fourth (alpha) component if it's missing and default it to 1 (visible). */
										if (!(IE <= 8) && extracted.split(" ").length === 3) {
											extracted += " 1";
										}

										return extracted;
									case "inject":
										/* If this is IE<=8 and an alpha component exists, strip it off. */
										if (IE <= 8) {
											if (propertyValue.split(" ").length === 4) {
												propertyValue = propertyValue.split(/\s+/).slice(0, 3).join(" ");
											}
											/* Otherwise, add a fourth (alpha) component if it's missing and default it to 1 (visible). */
										} else if (propertyValue.split(" ").length === 3) {
											propertyValue += " 1";
										}

										/* Re-insert the browser-appropriate wrapper("rgb/rgba()"), insert commas, and strip off decimal units
										   on all values but the fourth (R, G, and B only accept whole numbers). */
										return (IE <= 8 ? "rgb" : "rgba") + "(" + propertyValue.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")";
								}
							};
						})();
					}
				}
			},

			/************************
			   CSS Property Names
			************************/

			Names: {
				/* Camelcase a property name into its JavaScript notation (e.g. "background-color" ==> "backgroundColor").
				   Camelcasing is used to normalize property names between and across calls. */
				camelCase: function (property) {
					return property.replace(/-(\w)/g, function (match, subMatch) {
						return subMatch.toUpperCase();
					});
				},

				/* For SVG elements, some properties (namely, dimensional ones) are GET/SET via the element's HTML attributes (instead of via CSS styles). */
				SVGAttribute: function (property) {
					var SVGAttributes = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";

					/* Certain browsers require an SVG transform to be applied as an attribute. (Otherwise, application via CSS is preferable due to 3D support.) */
					if (IE || (Velocity.State.isAndroid && !Velocity.State.isChrome)) {
						SVGAttributes += "|transform";
					}

					return new RegExp("^(" + SVGAttributes + ")$", "i").test(property);
				},

				/* Determine whether a property should be set with a vendor prefix. */
				/* If a prefixed version of the property exists, return it. Otherwise, return the original property name.
				   If the property is not at all supported by the browser, return a false flag. */
				prefixCheck: function (property) {
					/* If this property has already been checked, return the cached value. */
					if (Velocity.State.prefixMatches[property]) {
						return [Velocity.State.prefixMatches[property], true];
					} else {
						var vendors = ["", "Webkit", "Moz", "ms", "O"];

						for (var i = 0, vendorsLength = vendors.length; i < vendorsLength; i++) {
							var propertyPrefixed;

							if (i === 0) {
								propertyPrefixed = property;
							} else {
								/* Capitalize the first letter of the property to conform to JavaScript vendor prefix notation (e.g. webkitFilter). */
								propertyPrefixed = vendors[i] + property.replace(/^\w/, function (match) {
									return match.toUpperCase();
								});
							}

							/* Check if the browser supports this property as prefixed. */
							if (Type.isString(Velocity.State.prefixElement.style[propertyPrefixed])) {
								/* Cache the match. */
								Velocity.State.prefixMatches[property] = propertyPrefixed;

								return [propertyPrefixed, true];
							}
						}

						/* If the browser doesn't support this property in any form, include a false flag so that the caller can decide how to proceed. */
						return [property, false];
					}
				}
			},

			/************************
			   CSS Property Values
			************************/

			Values: {
				/* Hex to RGB conversion. Copyright Tim Down: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */
				hexToRgb: function (hex) {
					var shortformRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
						longformRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
						rgbParts;

					hex = hex.replace(shortformRegex, function (m, r, g, b) {
						return r + r + g + g + b + b;
					});

					rgbParts = longformRegex.exec(hex);

					return rgbParts ? [parseInt(rgbParts[1], 16), parseInt(rgbParts[2], 16), parseInt(rgbParts[3], 16)] : [0, 0, 0];
				},

				isCSSNullValue: function (value) {
					/* The browser defaults CSS values that have not been set to either 0 or one of several possible null-value strings.
					   Thus, we check for both falsiness and these special strings. */
					/* Null-value checking is performed to default the special strings to 0 (for the sake of tweening) or their hook
					   templates as defined as CSS.Hooks (for the sake of hook injection/extraction). */
					/* Note: Chrome returns "rgba(0, 0, 0, 0)" for an undefined color whereas IE returns "transparent". */
					return (value == 0 || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(value));
				},

				/* Retrieve a property's default unit type. Used for assigning a unit type when one is not supplied by the user. */
				getUnitType: function (property) {
					if (/^(rotate|skew)/i.test(property)) {
						return "deg";
					} else if (/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(property)) {
						/* The above properties are unitless. */
						return "";
					} else {
						/* Default to px for all other properties. */
						return "px";
					}
				},

				/* HTML elements default to an associated display type when they're not set to display:none. */
				/* Note: This function is used for correctly setting the non-"none" display value in certain Velocity redirects, such as fadeIn/Out. */
				getDisplayType: function (element) {
					var tagName = element && element.tagName.toString().toLowerCase();

					if (/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(tagName)) {
						return "inline";
					} else if (/^(li)$/i.test(tagName)) {
						return "list-item";
					} else if (/^(tr)$/i.test(tagName)) {
						return "table-row";
					} else if (/^(table)$/i.test(tagName)) {
						return "table";
					} else if (/^(tbody)$/i.test(tagName)) {
						return "table-row-group";
						/* Default to "block" when no match is found. */
					} else {
						return "block";
					}
				},

				/* The class add/remove functions are used to temporarily apply a "velocity-animating" class to elements while they're animating. */
				addClass: function (element, className) {
					if (element.classList) {
						element.classList.add(className);
					} else {
						element.className += (element.className.length ? " " : "") + className;
					}
				},

				removeClass: function (element, className) {
					if (element.classList) {
						element.classList.remove(className);
					} else {
						element.className = element.className.toString().replace(new RegExp("(^|\\s)" + className.split(" ").join("|") + "(\\s|$)", "gi"), " ");
					}
				}
			},

			/****************************
			   Style Getting & Setting
			****************************/

			/* The singular getPropertyValue, which routes the logic for all normalizations, hooks, and standard CSS properties. */
			getPropertyValue: function (element, property, rootPropertyValue, forceStyleLookup) {
				/* Get an element's computed property value. */
				/* Note: Retrieving the value of a CSS property cannot simply be performed by checking an element's
				   style attribute (which only reflects user-defined values). Instead, the browser must be queried for a property's
				   *computed* value. You can read more about getComputedStyle here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */
				function computePropertyValue(element, property) {
					/* When box-sizing isn't set to border-box, height and width style values are incorrectly computed when an
					   element's scrollbars are visible (which expands the element's dimensions). Thus, we defer to the more accurate
					   offsetHeight/Width property, which includes the total dimensions for interior, border, padding, and scrollbar.
					   We subtract border and padding to get the sum of interior + scrollbar. */
					var computedValue = 0;

					/* IE<=8 doesn't support window.getComputedStyle, thus we defer to jQuery, which has an extensive array
					   of hacks to accurately retrieve IE8 property values. Re-implementing that logic here is not worth bloating the
					   codebase for a dying browser. The performance repercussions of using jQuery here are minimal since
					   Velocity is optimized to rarely (and sometimes never) query the DOM. Further, the $.css() codepath isn't that slow. */
					if (IE <= 8) {
						computedValue = $.css(element, property); /* GET */
						/* All other browsers support getComputedStyle. The returned live object reference is cached onto its
						   associated element so that it does not need to be refetched upon every GET. */
					} else {
						/* Browsers do not return height and width values for elements that are set to display:"none". Thus, we temporarily
						   toggle display to the element type's default value. */
						var toggleDisplay = false;

						if (/^(width|height)$/.test(property) && CSS.getPropertyValue(element, "display") === 0) {
							toggleDisplay = true;
							CSS.setPropertyValue(element, "display", CSS.Values.getDisplayType(element));
						}

						function revertDisplay() {
							if (toggleDisplay) {
								CSS.setPropertyValue(element, "display", "none");
							}
						}

						if (!forceStyleLookup) {
							if (property === "height" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
								var contentBoxHeight = element.offsetHeight - (parseFloat(CSS.getPropertyValue(element, "borderTopWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderBottomWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingTop")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingBottom")) || 0);
								revertDisplay();

								return contentBoxHeight;
							} else if (property === "width" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
								var contentBoxWidth = element.offsetWidth - (parseFloat(CSS.getPropertyValue(element, "borderLeftWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderRightWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingLeft")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingRight")) || 0);
								revertDisplay();

								return contentBoxWidth;
							}
						}

						var computedStyle;

						/* For elements that Velocity hasn't been called on directly (e.g. when Velocity queries the DOM on behalf
						   of a parent of an element its animating), perform a direct getComputedStyle lookup since the object isn't cached. */
						if (Data(element) === undefined) {
							computedStyle = window.getComputedStyle(element, null); /* GET */
							/* If the computedStyle object has yet to be cached, do so now. */
						} else if (!Data(element).computedStyle) {
							computedStyle = Data(element).computedStyle = window.getComputedStyle(element, null); /* GET */
							/* If computedStyle is cached, use it. */
						} else {
							computedStyle = Data(element).computedStyle;
						}

						/* IE and Firefox do not return a value for the generic borderColor -- they only return individual values for each border side's color.
						   Also, in all browsers, when border colors aren't all the same, a compound value is returned that Velocity isn't setup to parse.
						   So, as a polyfill for querying individual border side colors, we just return the top border's color and animate all borders from that value. */
						if (property === "borderColor") {
							property = "borderTopColor";
						}

						/* IE9 has a bug in which the "filter" property must be accessed from computedStyle using the getPropertyValue method
						   instead of a direct property lookup. The getPropertyValue method is slower than a direct lookup, which is why we avoid it by default. */
						if (IE === 9 && property === "filter") {
							computedValue = computedStyle.getPropertyValue(property); /* GET */
						} else {
							computedValue = computedStyle[property];
						}

						/* Fall back to the property's style value (if defined) when computedValue returns nothing,
						   which can happen when the element hasn't been painted. */
						if (computedValue === "" || computedValue === null) {
							computedValue = element.style[property];
						}

						revertDisplay();
					}

					/* For top, right, bottom, and left (TRBL) values that are set to "auto" on elements of "fixed" or "absolute" position,
					   defer to jQuery for converting "auto" to a numeric value. (For elements with a "static" or "relative" position, "auto" has the same
					   effect as being set to 0, so no conversion is necessary.) */
					/* An example of why numeric conversion is necessary: When an element with "position:absolute" has an untouched "left"
					   property, which reverts to "auto", left's value is 0 relative to its parent element, but is often non-zero relative
					   to its *containing* (not parent) element, which is the nearest "position:relative" ancestor or the viewport (and always the viewport in the case of "position:fixed"). */
					if (computedValue === "auto" && /^(top|right|bottom|left)$/i.test(property)) {
						var position = computePropertyValue(element, "position"); /* GET */

						/* For absolute positioning, jQuery's $.position() only returns values for top and left;
						   right and bottom will have their "auto" value reverted to 0. */
						/* Note: A jQuery object must be created here since jQuery doesn't have a low-level alias for $.position().
						   Not a big deal since we're currently in a GET batch anyway. */
						if (position === "fixed" || (position === "absolute" && /top|left/i.test(property))) {
							/* Note: jQuery strips the pixel unit from its returned values; we re-add it here to conform with computePropertyValue's behavior. */
							computedValue = $(element).position()[property] + "px"; /* GET */
						}
					}

					return computedValue;
				}

				var propertyValue;

				/* If this is a hooked property (e.g. "clipLeft" instead of the root property of "clip"),
				   extract the hook's value from a normalized rootPropertyValue using CSS.Hooks.extractValue(). */
				if (CSS.Hooks.registered[property]) {
					var hook = property,
						hookRoot = CSS.Hooks.getRoot(hook);

					/* If a cached rootPropertyValue wasn't passed in (which Velocity always attempts to do in order to avoid requerying the DOM),
					   query the DOM for the root property's value. */
					if (rootPropertyValue === undefined) {
						/* Since the browser is now being directly queried, use the official post-prefixing property name for this lookup. */
						rootPropertyValue = CSS.getPropertyValue(element, CSS.Names.prefixCheck(hookRoot)[0]); /* GET */
					}

					/* If this root has a normalization registered, peform the associated normalization extraction. */
					if (CSS.Normalizations.registered[hookRoot]) {
						rootPropertyValue = CSS.Normalizations.registered[hookRoot]("extract", element, rootPropertyValue);
					}

					/* Extract the hook's value. */
					propertyValue = CSS.Hooks.extractValue(hook, rootPropertyValue);

					/* If this is a normalized property (e.g. "opacity" becomes "filter" in <=IE8) or "translateX" becomes "transform"),
					   normalize the property's name and value, and handle the special case of transforms. */
					/* Note: Normalizing a property is mutually exclusive from hooking a property since hook-extracted values are strictly
					   numerical and therefore do not require normalization extraction. */
				} else if (CSS.Normalizations.registered[property]) {
					var normalizedPropertyName,
						normalizedPropertyValue;

					normalizedPropertyName = CSS.Normalizations.registered[property]("name", element);

					/* Transform values are calculated via normalization extraction (see below), which checks against the element's transformCache.
					   At no point do transform GETs ever actually query the DOM; initial stylesheet values are never processed.
					   This is because parsing 3D transform matrices is not always accurate and would bloat our codebase;
					   thus, normalization extraction defaults initial transform values to their zero-values (e.g. 1 for scaleX and 0 for translateX). */
					if (normalizedPropertyName !== "transform") {
						normalizedPropertyValue = computePropertyValue(element, CSS.Names.prefixCheck(normalizedPropertyName)[0]); /* GET */

						/* If the value is a CSS null-value and this property has a hook template, use that zero-value template so that hooks can be extracted from it. */
						if (CSS.Values.isCSSNullValue(normalizedPropertyValue) && CSS.Hooks.templates[property]) {
							normalizedPropertyValue = CSS.Hooks.templates[property][1];
						}
					}

					propertyValue = CSS.Normalizations.registered[property]("extract", element, normalizedPropertyValue);
				}

				/* If a (numeric) value wasn't produced via hook extraction or normalization, query the DOM. */
				if (!/^[\d-]/.test(propertyValue)) {
					/* For SVG elements, dimensional properties (which SVGAttribute() detects) are tweened via
					   their HTML attribute values instead of their CSS style values. */
					if (Data(element) && Data(element).isSVG && CSS.Names.SVGAttribute(property)) {
						/* Since the height/width attribute values must be set manually, they don't reflect computed values.
						   Thus, we use use getBBox() to ensure we always get values for elements with undefined height/width attributes. */
						if (/^(height|width)$/i.test(property)) {
							/* Firefox throws an error if .getBBox() is called on an SVG that isn't attached to the DOM. */
							try {
								propertyValue = element.getBBox()[property];
							} catch (error) {
								propertyValue = 0;
							}
							/* Otherwise, access the attribute value directly. */
						} else {
							propertyValue = element.getAttribute(property);
						}
					} else {
						propertyValue = computePropertyValue(element, CSS.Names.prefixCheck(property)[0]); /* GET */
					}
				}

				/* Since property lookups are for animation purposes (which entails computing the numeric delta between start and end values),
				   convert CSS null-values to an integer of value 0. */
				if (CSS.Values.isCSSNullValue(propertyValue)) {
					propertyValue = 0;
				}

				if (Velocity.debug >= 2) console.log("Get " + property + ": " + propertyValue);

				return propertyValue;
			},

			/* The singular setPropertyValue, which routes the logic for all normalizations, hooks, and standard CSS properties. */
			setPropertyValue: function (element, property, propertyValue, rootPropertyValue, scrollData) {
				var propertyName = property;

				/* In order to be subjected to call options and element queueing, scroll animation is routed through Velocity as if it were a standard CSS property. */
				if (property === "scroll") {
					/* If a container option is present, scroll the container instead of the browser window. */
					if (scrollData.container) {
						scrollData.container["scroll" + scrollData.direction] = propertyValue;
						/* Otherwise, Velocity defaults to scrolling the browser window. */
					} else {
						if (scrollData.direction === "Left") {
							window.scrollTo(propertyValue, scrollData.alternateValue);
						} else {
							window.scrollTo(scrollData.alternateValue, propertyValue);
						}
					}
				} else {
					/* Transforms (translateX, rotateZ, etc.) are applied to a per-element transformCache object, which is manually flushed via flushTransformCache().
					   Thus, for now, we merely cache transforms being SET. */
					if (CSS.Normalizations.registered[property] && CSS.Normalizations.registered[property]("name", element) === "transform") {
						/* Perform a normalization injection. */
						/* Note: The normalization logic handles the transformCache updating. */
						CSS.Normalizations.registered[property]("inject", element, propertyValue);

						propertyName = "transform";
						propertyValue = Data(element).transformCache[property];
					} else {
						/* Inject hooks. */
						if (CSS.Hooks.registered[property]) {
							var hookName = property,
								hookRoot = CSS.Hooks.getRoot(property);

							/* If a cached rootPropertyValue was not provided, query the DOM for the hookRoot's current value. */
							rootPropertyValue = rootPropertyValue || CSS.getPropertyValue(element, hookRoot); /* GET */

							propertyValue = CSS.Hooks.injectValue(hookName, propertyValue, rootPropertyValue);
							property = hookRoot;
						}

						/* Normalize names and values. */
						if (CSS.Normalizations.registered[property]) {
							propertyValue = CSS.Normalizations.registered[property]("inject", element, propertyValue);
							property = CSS.Normalizations.registered[property]("name", element);
						}

						/* Assign the appropriate vendor prefix before performing an official style update. */
						propertyName = CSS.Names.prefixCheck(property)[0];

						/* A try/catch is used for IE<=8, which throws an error when "invalid" CSS values are set, e.g. a negative width.
						   Try/catch is avoided for other browsers since it incurs a performance overhead. */
						if (IE <= 8) {
							try {
								element.style[propertyName] = propertyValue;
							} catch (error) {
								if (Velocity.debug) console.log("Browser does not support [" + propertyValue + "] for [" + propertyName + "]");
							}
							/* SVG elements have their dimensional properties (width, height, x, y, cx, etc.) applied directly as attributes instead of as styles. */
							/* Note: IE8 does not support SVG elements, so it's okay that we skip it for SVG animation. */
						} else if (Data(element) && Data(element).isSVG && CSS.Names.SVGAttribute(property)) {
							/* Note: For SVG attributes, vendor-prefixed property names are never used. */
							/* Note: Not all CSS properties can be animated via attributes, but the browser won't throw an error for unsupported properties. */
							element.setAttribute(property, propertyValue);
						} else {
							element.style[propertyName] = propertyValue;
						}

						if (Velocity.debug >= 2) console.log("Set " + property + " (" + propertyName + "): " + propertyValue);
					}
				}

				/* Return the normalized property name and value in case the caller wants to know how these values were modified before being applied to the DOM. */
				return [propertyName, propertyValue];
			},

			/* To increase performance by batching transform updates into a single SET, transforms are not directly applied to an element until flushTransformCache() is called. */
			/* Note: Velocity applies transform properties in the same order that they are chronogically introduced to the element's CSS styles. */
			flushTransformCache: function (element) {
				var transformString = "";

				/* Certain browsers require that SVG transforms be applied as an attribute. However, the SVG transform attribute takes a modified version of CSS's transform string
				   (units are dropped and, except for skewX/Y, subproperties are merged into their master property -- e.g. scaleX and scaleY are merged into scale(X Y). */
				if ((IE || (Velocity.State.isAndroid && !Velocity.State.isChrome)) && Data(element).isSVG) {
					/* Since transform values are stored in their parentheses-wrapped form, we use a helper function to strip out their numeric values.
					   Further, SVG transform properties only take unitless (representing pixels) values, so it's okay that parseFloat() strips the unit suffixed to the float value. */
					function getTransformFloat(transformProperty) {
						return parseFloat(CSS.getPropertyValue(element, transformProperty));
					}

					/* Create an object to organize all the transforms that we'll apply to the SVG element. To keep the logic simple,
					   we process *all* transform properties -- even those that may not be explicitly applied (since they default to their zero-values anyway). */
					var SVGTransforms = {
						translate: [getTransformFloat("translateX"), getTransformFloat("translateY")],
						skewX: [getTransformFloat("skewX")],
						skewY: [getTransformFloat("skewY")],
						/* If the scale property is set (non-1), use that value for the scaleX and scaleY values
						   (this behavior mimics the result of animating all these properties at once on HTML elements). */
						scale: getTransformFloat("scale") !== 1 ? [getTransformFloat("scale"), getTransformFloat("scale")] : [getTransformFloat("scaleX"), getTransformFloat("scaleY")],
						/* Note: SVG's rotate transform takes three values: rotation degrees followed by the X and Y values
						   defining the rotation's origin point. We ignore the origin values (default them to 0). */
						rotate: [getTransformFloat("rotateZ"), 0, 0]
					};

					/* Iterate through the transform properties in the user-defined property map order.
					   (This mimics the behavior of non-SVG transform animation.) */
					$.each(Data(element).transformCache, function (transformName) {
						/* Except for with skewX/Y, revert the axis-specific transform subproperties to their axis-free master
						   properties so that they match up with SVG's accepted transform properties. */
						if (/^translate/i.test(transformName)) {
							transformName = "translate";
						} else if (/^scale/i.test(transformName)) {
							transformName = "scale";
						} else if (/^rotate/i.test(transformName)) {
							transformName = "rotate";
						}

						/* Check that we haven't yet deleted the property from the SVGTransforms container. */
						if (SVGTransforms[transformName]) {
							/* Append the transform property in the SVG-supported transform format. As per the spec, surround the space-delimited values in parentheses. */
							transformString += transformName + "(" + SVGTransforms[transformName].join(" ") + ")" + " ";

							/* After processing an SVG transform property, delete it from the SVGTransforms container so we don't
							   re-insert the same master property if we encounter another one of its axis-specific properties. */
							delete SVGTransforms[transformName];
						}
					});
				} else {
					var transformValue,
						perspective;

					/* Transform properties are stored as members of the transformCache object. Concatenate all the members into a string. */
					$.each(Data(element).transformCache, function (transformName) {
						transformValue = Data(element).transformCache[transformName];

						/* Transform's perspective subproperty must be set first in order to take effect. Store it temporarily. */
						if (transformName === "transformPerspective") {
							perspective = transformValue;
							return true;
						}

						/* IE9 only supports one rotation type, rotateZ, which it refers to as "rotate". */
						if (IE === 9 && transformName === "rotateZ") {
							transformName = "rotate";
						}

						transformString += transformName + transformValue + " ";
					});

					/* If present, set the perspective subproperty first. */
					if (perspective) {
						transformString = "perspective" + perspective + " " + transformString;
					}
				}

				CSS.setPropertyValue(element, "transform", transformString);
			}
		};

		/* Register hooks and normalizations. */
		CSS.Hooks.register();
		CSS.Normalizations.register();

		/* Allow hook setting in the same fashion as jQuery's $.css(). */
		Velocity.hook = function (elements, arg2, arg3) {
			var value = undefined;

			elements = sanitizeElements(elements);

			$.each(elements, function (i, element) {
				/* Initialize Velocity's per-element data cache if this element hasn't previously been animated. */
				if (Data(element) === undefined) {
					Velocity.init(element);
				}

				/* Get property value. If an element set was passed in, only return the value for the first element. */
				if (arg3 === undefined) {
					if (value === undefined) {
						value = Velocity.CSS.getPropertyValue(element, arg2);
					}
					/* Set property value. */
				} else {
					/* sPV returns an array of the normalized propertyName/propertyValue pair used to update the DOM. */
					var adjustedSet = Velocity.CSS.setPropertyValue(element, arg2, arg3);

					/* Transform properties don't automatically set. They have to be flushed to the DOM. */
					if (adjustedSet[0] === "transform") {
						Velocity.CSS.flushTransformCache(element);
					}

					value = adjustedSet;
				}
			});

			return value;
		};

		/*****************
			Animation
		*****************/

		var animate = function () {

			/******************
				Call Chain
			******************/

			/* Logic for determining what to return to the call stack when exiting out of Velocity. */
			function getChain() {
				/* If we are using the utility function, attempt to return this call's promise. If no promise library was detected,
				   default to null instead of returning the targeted elements so that utility function's return value is standardized. */
				if (isUtility) {
					return promiseData.promise || null;
					/* Otherwise, if we're using $.fn, return the jQuery-/Zepto-wrapped element set. */
				} else {
					return elementsWrapped;
				}
			}

			/*************************
			   Arguments Assignment
			*************************/

			/* To allow for expressive CoffeeScript code, Velocity supports an alternative syntax in which "elements" (or "e"), "properties" (or "p"), and "options" (or "o")
			   objects are defined on a container object that's passed in as Velocity's sole argument. */
			/* Note: Some browsers automatically populate arguments with a "properties" object. We detect it by checking for its default "names" property. */
			var syntacticSugar = (arguments[0] && (arguments[0].p || (($.isPlainObject(arguments[0].properties) && !arguments[0].properties.names) || Type.isString(arguments[0].properties)))),
				/* Whether Velocity was called via the utility function (as opposed to on a jQuery/Zepto object). */
				isUtility,
				/* When Velocity is called via the utility function ($.Velocity()/Velocity()), elements are explicitly
				   passed in as the first parameter. Thus, argument positioning varies. We normalize them here. */
				elementsWrapped,
				argumentIndex;

			var elements,
				propertiesMap,
				options;

			/* Detect jQuery/Zepto elements being animated via the $.fn method. */
			if (Type.isWrapped(this)) {
				isUtility = false;

				argumentIndex = 0;
				elements = this;
				elementsWrapped = this;
				/* Otherwise, raw elements are being animated via the utility function. */
			} else {
				isUtility = true;

				argumentIndex = 1;
				elements = syntacticSugar ? (arguments[0].elements || arguments[0].e) : arguments[0];
			}

			elements = sanitizeElements(elements);

			if (!elements) {
				return;
			}

			if (syntacticSugar) {
				propertiesMap = arguments[0].properties || arguments[0].p;
				options = arguments[0].options || arguments[0].o;
			} else {
				propertiesMap = arguments[argumentIndex];
				options = arguments[argumentIndex + 1];
			}

			/* The length of the element set (in the form of a nodeList or an array of elements) is defaulted to 1 in case a
			   single raw DOM element is passed in (which doesn't contain a length property). */
			var elementsLength = elements.length,
				elementsIndex = 0;

			/***************************
				Argument Overloading
			***************************/

			/* Support is included for jQuery's argument overloading: $.animate(propertyMap [, duration] [, easing] [, complete]).
			   Overloading is detected by checking for the absence of an object being passed into options. */
			/* Note: The stop and finish actions do not accept animation options, and are therefore excluded from this check. */
			if (!/^(stop|finish|finishAll)$/i.test(propertiesMap) && !$.isPlainObject(options)) {
				/* The utility function shifts all arguments one position to the right, so we adjust for that offset. */
				var startingArgumentPosition = argumentIndex + 1;

				options = {};

				/* Iterate through all options arguments */
				for (var i = startingArgumentPosition; i < arguments.length; i++) {
					/* Treat a number as a duration. Parse it out. */
					/* Note: The following RegEx will return true if passed an array with a number as its first item.
					   Thus, arrays are skipped from this check. */
					if (!Type.isArray(arguments[i]) && (/^(fast|normal|slow)$/i.test(arguments[i]) || /^\d/.test(arguments[i]))) {
						options.duration = arguments[i];
						/* Treat strings and arrays as easings. */
					} else if (Type.isString(arguments[i]) || Type.isArray(arguments[i])) {
						options.easing = arguments[i];
						/* Treat a function as a complete callback. */
					} else if (Type.isFunction(arguments[i])) {
						options.complete = arguments[i];
					}
				}
			}

			/***************
				Promises
			***************/

			var promiseData = {
				promise: null,
				resolver: null,
				rejecter: null
			};

			/* If this call was made via the utility function (which is the default method of invocation when jQuery/Zepto are not being used), and if
			   promise support was detected, create a promise object for this call and store references to its resolver and rejecter methods. The resolve
			   method is used when a call completes naturally or is prematurely stopped by the user. In both cases, completeCall() handles the associated
			   call cleanup and promise resolving logic. The reject method is used when an invalid set of arguments is passed into a Velocity call. */
			/* Note: Velocity employs a call-based queueing architecture, which means that stopping an animating element actually stops the full call that
			   triggered it -- not that one element exclusively. Similarly, there is one promise per call, and all elements targeted by a Velocity call are
			   grouped together for the purposes of resolving and rejecting a promise. */
			if (isUtility && Velocity.Promise) {
				promiseData.promise = new Velocity.Promise(function (resolve, reject) {
					promiseData.resolver = resolve;
					promiseData.rejecter = reject;
				});
			}

			/*********************
			   Action Detection
			*********************/

			/* Velocity's behavior is categorized into "actions": Elements can either be specially scrolled into view,
			   or they can be started, stopped, or reversed. If a literal or referenced properties map is passed in as Velocity's
			   first argument, the associated action is "start". Alternatively, "scroll", "reverse", or "stop" can be passed in instead of a properties map. */
			var action;

			switch (propertiesMap) {
				case "scroll":
					action = "scroll";
					break;

				case "reverse":
					action = "reverse";
					break;

				case "finish":
				case "finishAll":
				case "stop":
					/*******************
						Action: Stop
					*******************/

					/* Clear the currently-active delay on each targeted element. */
					$.each(elements, function (i, element) {
						if (Data(element) && Data(element).delayTimer) {
							/* Stop the timer from triggering its cached next() function. */
							clearTimeout(Data(element).delayTimer.setTimeout);

							/* Manually call the next() function so that the subsequent queue items can progress. */
							if (Data(element).delayTimer.next) {
								Data(element).delayTimer.next();
							}

							delete Data(element).delayTimer;
						}

						/* If we want to finish everything in the queue, we have to iterate through it
						   and call each function. This will make them active calls below, which will
						   cause them to be applied via the duration setting. */
						if (propertiesMap === "finishAll" && (options === true || Type.isString(options))) {
							/* Iterate through the items in the element's queue. */
							$.each($.queue(element, Type.isString(options) ? options : ""), function (_, item) {
								/* The queue array can contain an "inprogress" string, which we skip. */
								if (Type.isFunction(item)) {
									item();
								}
							});

							/* Clearing the $.queue() array is achieved by resetting it to []. */
							$.queue(element, Type.isString(options) ? options : "", []);
						}
					});

					var callsToStop = [];

					/* When the stop action is triggered, the elements' currently active call is immediately stopped. The active call might have
					   been applied to multiple elements, in which case all of the call's elements will be stopped. When an element
					   is stopped, the next item in its animation queue is immediately triggered. */
					/* An additional argument may be passed in to clear an element's remaining queued calls. Either true (which defaults to the "fx" queue)
					   or a custom queue string can be passed in. */
					/* Note: The stop command runs prior to Velocity's Queueing phase since its behavior is intended to take effect *immediately*,
					   regardless of the element's current queue state. */

					/* Iterate through every active call. */
					$.each(Velocity.State.calls, function (i, activeCall) {
						/* Inactive calls are set to false by the logic inside completeCall(). Skip them. */
						if (activeCall) {
							/* Iterate through the active call's targeted elements. */
							$.each(activeCall[1], function (k, activeElement) {
								/* If true was passed in as a secondary argument, clear absolutely all calls on this element. Otherwise, only
								   clear calls associated with the relevant queue. */
								/* Call stopping logic works as follows:
								   - options === true --> stop current default queue calls (and queue:false calls), including remaining queued ones.
								   - options === undefined --> stop current queue:"" call and all queue:false calls.
								   - options === false --> stop only queue:false calls.
								   - options === "custom" --> stop current queue:"custom" call, including remaining queued ones (there is no functionality to only clear the currently-running queue:"custom" call). */
								var queueName = (options === undefined) ? "" : options;

								if (queueName !== true && (activeCall[2].queue !== queueName) && !(options === undefined && activeCall[2].queue === false)) {
									return true;
								}

								/* Iterate through the calls targeted by the stop command. */
								$.each(elements, function (l, element) {
									/* Check that this call was applied to the target element. */
									if (element === activeElement) {
										/* Optionally clear the remaining queued calls. If we're doing "finishAll" this won't find anything,
										   due to the queue-clearing above. */
										if (options === true || Type.isString(options)) {
											/* Iterate through the items in the element's queue. */
											$.each($.queue(element, Type.isString(options) ? options : ""), function (_, item) {
												/* The queue array can contain an "inprogress" string, which we skip. */
												if (Type.isFunction(item)) {
													/* Pass the item's callback a flag indicating that we want to abort from the queue call.
													   (Specifically, the queue will resolve the call's associated promise then abort.)  */
													item(null, true);
												}
											});

											/* Clearing the $.queue() array is achieved by resetting it to []. */
											$.queue(element, Type.isString(options) ? options : "", []);
										}

										if (propertiesMap === "stop") {
											/* Since "reverse" uses cached start values (the previous call's endValues), these values must be
											   changed to reflect the final value that the elements were actually tweened to. */
											/* Note: If only queue:false animations are currently running on an element, it won't have a tweensContainer
											   object. Also, queue:false animations can't be reversed. */
											if (Data(element) && Data(element).tweensContainer && queueName !== false) {
												$.each(Data(element).tweensContainer, function (m, activeTween) {
													activeTween.endValue = activeTween.currentValue;
												});
											}

											callsToStop.push(i);
										} else if (propertiesMap === "finish" || propertiesMap === "finishAll") {
											/* To get active tweens to finish immediately, we forcefully shorten their durations to 1ms so that
											they finish upon the next rAf tick then proceed with normal call completion logic. */
											activeCall[2].duration = 1;
										}
									}
								});
							});
						}
					});

					/* Prematurely call completeCall() on each matched active call. Pass an additional flag for "stop" to indicate
					   that the complete callback and display:none setting should be skipped since we're completing prematurely. */
					if (propertiesMap === "stop") {
						$.each(callsToStop, function (i, j) {
							completeCall(j, true);
						});

						if (promiseData.promise) {
							/* Immediately resolve the promise associated with this stop call since stop runs synchronously. */
							promiseData.resolver(elements);
						}
					}

					/* Since we're stopping, and not proceeding with queueing, exit out of Velocity. */
					return getChain();

				default:
					/* Treat a non-empty plain object as a literal properties map. */
					if ($.isPlainObject(propertiesMap) && !Type.isEmptyObject(propertiesMap)) {
						action = "start";

						/****************
							Redirects
						****************/

						/* Check if a string matches a registered redirect (see Redirects above). */
					} else if (Type.isString(propertiesMap) && Velocity.Redirects[propertiesMap]) {
						var opts = $.extend({}, options),
							durationOriginal = opts.duration,
							delayOriginal = opts.delay || 0;

						/* If the backwards option was passed in, reverse the element set so that elements animate from the last to the first. */
						if (opts.backwards === true) {
							elements = $.extend(true, [], elements).reverse();
						}

						/* Individually trigger the redirect for each element in the set to prevent users from having to handle iteration logic in their redirect. */
						$.each(elements, function (elementIndex, element) {
							/* If the stagger option was passed in, successively delay each element by the stagger value (in ms). Retain the original delay value. */
							if (parseFloat(opts.stagger)) {
								opts.delay = delayOriginal + (parseFloat(opts.stagger) * elementIndex);
							} else if (Type.isFunction(opts.stagger)) {
								opts.delay = delayOriginal + opts.stagger.call(element, elementIndex, elementsLength);
							}

							/* If the drag option was passed in, successively increase/decrease (depending on the presense of opts.backwards)
							   the duration of each element's animation, using floors to prevent producing very short durations. */
							if (opts.drag) {
								/* Default the duration of UI pack effects (callouts and transitions) to 1000ms instead of the usual default duration of 400ms. */
								opts.duration = parseFloat(durationOriginal) || (/^(callout|transition)/.test(propertiesMap) ? 1000 : DURATION_DEFAULT);

								/* For each element, take the greater duration of: A) animation completion percentage relative to the original duration,
								   B) 75% of the original duration, or C) a 200ms fallback (in case duration is already set to a low value).
								   The end result is a baseline of 75% of the redirect's duration that increases/decreases as the end of the element set is approached. */
								opts.duration = Math.max(opts.duration * (opts.backwards ? 1 - elementIndex / elementsLength : (elementIndex + 1) / elementsLength), opts.duration * 0.75, 200);
							}

							/* Pass in the call's opts object so that the redirect can optionally extend it. It defaults to an empty object instead of null to
							   reduce the opts checking logic required inside the redirect. */
							Velocity.Redirects[propertiesMap].call(element, element, opts || {}, elementIndex, elementsLength, elements, promiseData.promise ? promiseData : undefined);
						});

						/* Since the animation logic resides within the redirect's own code, abort the remainder of this call.
						   (The performance overhead up to this point is virtually non-existant.) */
						/* Note: The jQuery call chain is kept intact by returning the complete element set. */
						return getChain();
					} else {
						var abortError = "Velocity: First argument (" + propertiesMap + ") was not a property map, a known action, or a registered redirect. Aborting.";

						if (promiseData.promise) {
							promiseData.rejecter(new Error(abortError));
						} else {
							console.log(abortError);
						}

						return getChain();
					}
			}

			/**************************
				Call-Wide Variables
			**************************/

			/* A container for CSS unit conversion ratios (e.g. %, rem, and em ==> px) that is used to cache ratios across all elements
			   being animated in a single Velocity call. Calculating unit ratios necessitates DOM querying and updating, and is therefore
			   avoided (via caching) wherever possible. This container is call-wide instead of page-wide to avoid the risk of using stale
			   conversion metrics across Velocity animations that are not immediately consecutively chained. */
			var callUnitConversionData = {
				lastParent: null,
				lastPosition: null,
				lastFontSize: null,
				lastPercentToPxWidth: null,
				lastPercentToPxHeight: null,
				lastEmToPx: null,
				remToPx: null,
				vwToPx: null,
				vhToPx: null
			};

			/* A container for all the ensuing tween data and metadata associated with this call. This container gets pushed to the page-wide
			   Velocity.State.calls array that is processed during animation ticking. */
			var call = [];

			/************************
			   Element Processing
			************************/

			/* Element processing consists of three parts -- data processing that cannot go stale and data processing that *can* go stale (i.e. third-party style modifications):
			   1) Pre-Queueing: Element-wide variables, including the element's data storage, are instantiated. Call options are prepared. If triggered, the Stop action is executed.
			   2) Queueing: The logic that runs once this call has reached its point of execution in the element's $.queue() stack. Most logic is placed here to avoid risking it becoming stale.
			   3) Pushing: Consolidation of the tween data followed by its push onto the global in-progress calls container.
			*/

			function processElement() {

				/*************************
				   Part I: Pre-Queueing
				*************************/

				/***************************
				   Element-Wide Variables
				***************************/

				var element = this,
					/* The runtime opts object is the extension of the current call's options and Velocity's page-wide option defaults. */
					opts = $.extend({}, Velocity.defaults, options),
					/* A container for the processed data associated with each property in the propertyMap.
					   (Each property in the map produces its own "tween".) */
					tweensContainer = {},
					elementUnitConversionData;

				/******************
				   Element Init
				******************/

				if (Data(element) === undefined) {
					Velocity.init(element);
				}

				/******************
				   Option: Delay
				******************/

				/* Since queue:false doesn't respect the item's existing queue, we avoid injecting its delay here (it's set later on). */
				/* Note: Velocity rolls its own delay function since jQuery doesn't have a utility alias for $.fn.delay()
				   (and thus requires jQuery element creation, which we avoid since its overhead includes DOM querying). */
				if (parseFloat(opts.delay) && opts.queue !== false) {
					$.queue(element, opts.queue, function (next) {
						/* This is a flag used to indicate to the upcoming completeCall() function that this queue entry was initiated by Velocity. See completeCall() for further details. */
						Velocity.velocityQueueEntryFlag = true;

						/* The ensuing queue item (which is assigned to the "next" argument that $.queue() automatically passes in) will be triggered after a setTimeout delay.
						   The setTimeout is stored so that it can be subjected to clearTimeout() if this animation is prematurely stopped via Velocity's "stop" command. */
						Data(element).delayTimer = {
							setTimeout: setTimeout(next, parseFloat(opts.delay)),
							next: next
						};
					});
				}

				/*********************
				   Option: Duration
				*********************/

				/* Support for jQuery's named durations. */
				switch (opts.duration.toString().toLowerCase()) {
					case "fast":
						opts.duration = 200;
						break;

					case "normal":
						opts.duration = DURATION_DEFAULT;
						break;

					case "slow":
						opts.duration = 600;
						break;

					default:
						/* Remove the potential "ms" suffix and default to 1 if the user is attempting to set a duration of 0 (in order to produce an immediate style change). */
						opts.duration = parseFloat(opts.duration) || 1;
				}

				/************************
				   Global Option: Mock
				************************/

				if (Velocity.mock !== false) {
					/* In mock mode, all animations are forced to 1ms so that they occur immediately upon the next rAF tick.
					   Alternatively, a multiplier can be passed in to time remap all delays and durations. */
					if (Velocity.mock === true) {
						opts.duration = opts.delay = 1;
					} else {
						opts.duration *= parseFloat(Velocity.mock) || 1;
						opts.delay *= parseFloat(Velocity.mock) || 1;
					}
				}

				/*******************
				   Option: Easing
				*******************/

				opts.easing = getEasing(opts.easing, opts.duration);

				/**********************
				   Option: Callbacks
				**********************/

				/* Callbacks must functions. Otherwise, default to null. */
				if (opts.begin && !Type.isFunction(opts.begin)) {
					opts.begin = null;
				}

				if (opts.progress && !Type.isFunction(opts.progress)) {
					opts.progress = null;
				}

				if (opts.complete && !Type.isFunction(opts.complete)) {
					opts.complete = null;
				}

				/*********************************
				   Option: Display & Visibility
				*********************************/

				/* Refer to Velocity's documentation (VelocityJS.org/#displayAndVisibility) for a description of the display and visibility options' behavior. */
				/* Note: We strictly check for undefined instead of falsiness because display accepts an empty string value. */
				if (opts.display !== undefined && opts.display !== null) {
					opts.display = opts.display.toString().toLowerCase();

					/* Users can pass in a special "auto" value to instruct Velocity to set the element to its default display value. */
					if (opts.display === "auto") {
						opts.display = Velocity.CSS.Values.getDisplayType(element);
					}
				}

				if (opts.visibility !== undefined && opts.visibility !== null) {
					opts.visibility = opts.visibility.toString().toLowerCase();
				}

				/**********************
				   Option: mobileHA
				**********************/

				/* When set to true, and if this is a mobile device, mobileHA automatically enables hardware acceleration (via a null transform hack)
				   on animating elements. HA is removed from the element at the completion of its animation. */
				/* Note: Android Gingerbread doesn't support HA. If a null transform hack (mobileHA) is in fact set, it will prevent other tranform subproperties from taking effect. */
				/* Note: You can read more about the use of mobileHA in Velocity's documentation: VelocityJS.org/#mobileHA. */
				opts.mobileHA = (opts.mobileHA && Velocity.State.isMobile && !Velocity.State.isGingerbread);

				/***********************
				   Part II: Queueing
				***********************/

				/* When a set of elements is targeted by a Velocity call, the set is broken up and each element has the current Velocity call individually queued onto it.
				   In this way, each element's existing queue is respected; some elements may already be animating and accordingly should not have this current Velocity call triggered immediately. */
				/* In each queue, tween data is processed for each animating property then pushed onto the call-wide calls array. When the last element in the set has had its tweens processed,
				   the call array is pushed to Velocity.State.calls for live processing by the requestAnimationFrame tick. */
				function buildQueue(next) {

					/*******************
					   Option: Begin
					*******************/

					/* The begin callback is fired once per call -- not once per elemenet -- and is passed the full raw DOM element set as both its context and its first argument. */
					if (opts.begin && elementsIndex === 0) {
						/* We throw callbacks in a setTimeout so that thrown errors don't halt the execution of Velocity itself. */
						try {
							opts.begin.call(elements, elements);
						} catch (error) {
							setTimeout(function () {
								throw error;
							}, 1);
						}
					}

					/*****************************************
					   Tween Data Construction (for Scroll)
					*****************************************/

					/* Note: In order to be subjected to chaining and animation options, scroll's tweening is routed through Velocity as if it were a standard CSS property animation. */
					if (action === "scroll") {
						/* The scroll action uniquely takes an optional "offset" option -- specified in pixels -- that offsets the targeted scroll position. */
						var scrollDirection = (/^x$/i.test(opts.axis) ? "Left" : "Top"),
							scrollOffset = parseFloat(opts.offset) || 0,
							scrollPositionCurrent,
							scrollPositionCurrentAlternate,
							scrollPositionEnd;

						/* Scroll also uniquely takes an optional "container" option, which indicates the parent element that should be scrolled --
						   as opposed to the browser window itself. This is useful for scrolling toward an element that's inside an overflowing parent element. */
						if (opts.container) {
							/* Ensure that either a jQuery object or a raw DOM element was passed in. */
							if (Type.isWrapped(opts.container) || Type.isNode(opts.container)) {
								/* Extract the raw DOM element from the jQuery wrapper. */
								opts.container = opts.container[0] || opts.container;
								/* Note: Unlike other properties in Velocity, the browser's scroll position is never cached since it so frequently changes
								   (due to the user's natural interaction with the page). */
								scrollPositionCurrent = opts.container["scroll" + scrollDirection]; /* GET */

								/* $.position() values are relative to the container's currently viewable area (without taking into account the container's true dimensions
								   -- say, for example, if the container was not overflowing). Thus, the scroll end value is the sum of the child element's position *and*
								   the scroll container's current scroll position. */
								scrollPositionEnd = (scrollPositionCurrent + $(element).position()[scrollDirection.toLowerCase()]) + scrollOffset; /* GET */
								/* If a value other than a jQuery object or a raw DOM element was passed in, default to null so that this option is ignored. */
							} else {
								opts.container = null;
							}
						} else {
							/* If the window itself is being scrolled -- not a containing element -- perform a live scroll position lookup using
							   the appropriate cached property names (which differ based on browser type). */
							scrollPositionCurrent = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + scrollDirection]]; /* GET */
							/* When scrolling the browser window, cache the alternate axis's current value since window.scrollTo() doesn't let us change only one value at a time. */
							scrollPositionCurrentAlternate = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + (scrollDirection === "Left" ? "Top" : "Left")]]; /* GET */

							/* Unlike $.position(), $.offset() values are relative to the browser window's true dimensions -- not merely its currently viewable area --
							   and therefore end values do not need to be compounded onto current values. */
							scrollPositionEnd = $(element).offset()[scrollDirection.toLowerCase()] + scrollOffset; /* GET */
						}

						/* Since there's only one format that scroll's associated tweensContainer can take, we create it manually. */
						tweensContainer = {
							scroll: {
								rootPropertyValue: false,
								startValue: scrollPositionCurrent,
								currentValue: scrollPositionCurrent,
								endValue: scrollPositionEnd,
								unitType: "",
								easing: opts.easing,
								scrollData: {
									container: opts.container,
									direction: scrollDirection,
									alternateValue: scrollPositionCurrentAlternate
								}
							},
							element: element
						};

						if (Velocity.debug) console.log("tweensContainer (scroll): ", tweensContainer.scroll, element);

						/******************************************
						   Tween Data Construction (for Reverse)
						******************************************/

						/* Reverse acts like a "start" action in that a property map is animated toward. The only difference is
						   that the property map used for reverse is the inverse of the map used in the previous call. Thus, we manipulate
						   the previous call to construct our new map: use the previous map's end values as our new map's start values. Copy over all other data. */
						/* Note: Reverse can be directly called via the "reverse" parameter, or it can be indirectly triggered via the loop option. (Loops are composed of multiple reverses.) */
						/* Note: Reverse calls do not need to be consecutively chained onto a currently-animating element in order to operate on cached values;
						   there is no harm to reverse being called on a potentially stale data cache since reverse's behavior is simply defined
						   as reverting to the element's values as they were prior to the previous *Velocity* call. */
					} else if (action === "reverse") {
						/* Abort if there is no prior animation data to reverse to. */
						if (!Data(element).tweensContainer) {
							/* Dequeue the element so that this queue entry releases itself immediately, allowing subsequent queue entries to run. */
							$.dequeue(element, opts.queue);

							return;
						} else {
							/*********************
							   Options Parsing
							*********************/

							/* If the element was hidden via the display option in the previous call,
							   revert display to "auto" prior to reversal so that the element is visible again. */
							if (Data(element).opts.display === "none") {
								Data(element).opts.display = "auto";
							}

							if (Data(element).opts.visibility === "hidden") {
								Data(element).opts.visibility = "visible";
							}

							/* If the loop option was set in the previous call, disable it so that "reverse" calls aren't recursively generated.
							   Further, remove the previous call's callback options; typically, users do not want these to be refired. */
							Data(element).opts.loop = false;
							Data(element).opts.begin = null;
							Data(element).opts.complete = null;

							/* Since we're extending an opts object that has already been extended with the defaults options object,
							   we remove non-explicitly-defined properties that are auto-assigned values. */
							if (!options.easing) {
								delete opts.easing;
							}

							if (!options.duration) {
								delete opts.duration;
							}

							/* The opts object used for reversal is an extension of the options object optionally passed into this
							   reverse call plus the options used in the previous Velocity call. */
							opts = $.extend({}, Data(element).opts, opts);

							/*************************************
							   Tweens Container Reconstruction
							*************************************/

							/* Create a deepy copy (indicated via the true flag) of the previous call's tweensContainer. */
							var lastTweensContainer = $.extend(true, {}, Data(element).tweensContainer);

							/* Manipulate the previous tweensContainer by replacing its end values and currentValues with its start values. */
							for (var lastTween in lastTweensContainer) {
								/* In addition to tween data, tweensContainers contain an element property that we ignore here. */
								if (lastTween !== "element") {
									var lastStartValue = lastTweensContainer[lastTween].startValue;

									lastTweensContainer[lastTween].startValue = lastTweensContainer[lastTween].currentValue = lastTweensContainer[lastTween].endValue;
									lastTweensContainer[lastTween].endValue = lastStartValue;

									/* Easing is the only option that embeds into the individual tween data (since it can be defined on a per-property basis).
									   Accordingly, every property's easing value must be updated when an options object is passed in with a reverse call.
									   The side effect of this extensibility is that all per-property easing values are forcefully reset to the new value. */
									if (!Type.isEmptyObject(options)) {
										lastTweensContainer[lastTween].easing = opts.easing;
									}

									if (Velocity.debug) console.log("reverse tweensContainer (" + lastTween + "): " + JSON.stringify(lastTweensContainer[lastTween]), element);
								}
							}

							tweensContainer = lastTweensContainer;
						}

						/*****************************************
						   Tween Data Construction (for Start)
						*****************************************/

					} else if (action === "start") {

						/*************************
							Value Transferring
						*************************/

						/* If this queue entry follows a previous Velocity-initiated queue entry *and* if this entry was created
						   while the element was in the process of being animated by Velocity, then this current call is safe to use
						   the end values from the prior call as its start values. Velocity attempts to perform this value transfer
						   process whenever possible in order to avoid requerying the DOM. */
						/* If values aren't transferred from a prior call and start values were not forcefed by the user (more on this below),
						   then the DOM is queried for the element's current values as a last resort. */
						/* Note: Conversely, animation reversal (and looping) *always* perform inter-call value transfers; they never requery the DOM. */
						var lastTweensContainer;

						/* The per-element isAnimating flag is used to indicate whether it's safe (i.e. the data isn't stale)
						   to transfer over end values to use as start values. If it's set to true and there is a previous
						   Velocity call to pull values from, do so. */
						if (Data(element).tweensContainer && Data(element).isAnimating === true) {
							lastTweensContainer = Data(element).tweensContainer;
						}

						/***************************
						   Tween Data Calculation
						***************************/

						/* This function parses property data and defaults endValue, easing, and startValue as appropriate. */
						/* Property map values can either take the form of 1) a single value representing the end value,
						   or 2) an array in the form of [ endValue, [, easing] [, startValue] ].
						   The optional third parameter is a forcefed startValue to be used instead of querying the DOM for
						   the element's current value. Read Velocity's docmentation to learn more about forcefeeding: VelocityJS.org/#forcefeeding */
						function parsePropertyValue(valueData, skipResolvingEasing) {
							var endValue = undefined,
								easing = undefined,
								startValue = undefined;

							/* Handle the array format, which can be structured as one of three potential overloads:
							   A) [ endValue, easing, startValue ], B) [ endValue, easing ], or C) [ endValue, startValue ] */
							if (Type.isArray(valueData)) {
								/* endValue is always the first item in the array. Don't bother validating endValue's value now
								   since the ensuing property cycling logic does that. */
								endValue = valueData[0];

								/* Two-item array format: If the second item is a number, function, or hex string, treat it as a
								   start value since easings can only be non-hex strings or arrays. */
								if ((!Type.isArray(valueData[1]) && /^[\d-]/.test(valueData[1])) || Type.isFunction(valueData[1]) || CSS.RegEx.isHex.test(valueData[1])) {
									startValue = valueData[1];
									/* Two or three-item array: If the second item is a non-hex string or an array, treat it as an easing. */
								} else if ((Type.isString(valueData[1]) && !CSS.RegEx.isHex.test(valueData[1])) || Type.isArray(valueData[1])) {
									easing = skipResolvingEasing ? valueData[1] : getEasing(valueData[1], opts.duration);

									/* Don't bother validating startValue's value now since the ensuing property cycling logic inherently does that. */
									if (valueData[2] !== undefined) {
										startValue = valueData[2];
									}
								}
								/* Handle the single-value format. */
							} else {
								endValue = valueData;
							}

							/* Default to the call's easing if a per-property easing type was not defined. */
							if (!skipResolvingEasing) {
								easing = easing || opts.easing;
							}

							/* If functions were passed in as values, pass the function the current element as its context,
							   plus the element's index and the element set's size as arguments. Then, assign the returned value. */
							if (Type.isFunction(endValue)) {
								endValue = endValue.call(element, elementsIndex, elementsLength);
							}

							if (Type.isFunction(startValue)) {
								startValue = startValue.call(element, elementsIndex, elementsLength);
							}

							/* Allow startValue to be left as undefined to indicate to the ensuing code that its value was not forcefed. */
							return [endValue || 0, easing, startValue];
						}

						/* Cycle through each property in the map, looking for shorthand color properties (e.g. "color" as opposed to "colorRed"). Inject the corresponding
						   colorRed, colorGreen, and colorBlue RGB component tweens into the propertiesMap (which Velocity understands) and remove the shorthand property. */
						$.each(propertiesMap, function (property, value) {
							/* Find shorthand color properties that have been passed a hex string. */
							if (RegExp("^" + CSS.Lists.colors.join("$|^") + "$").test(property)) {
								/* Parse the value data for each shorthand. */
								var valueData = parsePropertyValue(value, true),
									endValue = valueData[0],
									easing = valueData[1],
									startValue = valueData[2];

								if (CSS.RegEx.isHex.test(endValue)) {
									/* Convert the hex strings into their RGB component arrays. */
									var colorComponents = ["Red", "Green", "Blue"],
										endValueRGB = CSS.Values.hexToRgb(endValue),
										startValueRGB = startValue ? CSS.Values.hexToRgb(startValue) : undefined;

									/* Inject the RGB component tweens into propertiesMap. */
									for (var i = 0; i < colorComponents.length; i++) {
										var dataArray = [endValueRGB[i]];

										if (easing) {
											dataArray.push(easing);
										}

										if (startValueRGB !== undefined) {
											dataArray.push(startValueRGB[i]);
										}

										propertiesMap[property + colorComponents[i]] = dataArray;
									}

									/* Remove the intermediary shorthand property entry now that we've processed it. */
									delete propertiesMap[property];
								}
							}
						});

						/* Create a tween out of each property, and append its associated data to tweensContainer. */
						for (var property in propertiesMap) {

							/**************************
							   Start Value Sourcing
							**************************/

							/* Parse out endValue, easing, and startValue from the property's data. */
							var valueData = parsePropertyValue(propertiesMap[property]),
								endValue = valueData[0],
								easing = valueData[1],
								startValue = valueData[2];

							/* Now that the original property name's format has been used for the parsePropertyValue() lookup above,
							   we force the property to its camelCase styling to normalize it for manipulation. */
							property = CSS.Names.camelCase(property);

							/* In case this property is a hook, there are circumstances where we will intend to work on the hook's root property and not the hooked subproperty. */
							var rootProperty = CSS.Hooks.getRoot(property),
								rootPropertyValue = false;

							/* Other than for the dummy tween property, properties that are not supported by the browser (and do not have an associated normalization) will
							   inherently produce no style changes when set, so they are skipped in order to decrease animation tick overhead.
							   Property support is determined via prefixCheck(), which returns a false flag when no supported is detected. */
							/* Note: Since SVG elements have some of their properties directly applied as HTML attributes,
							   there is no way to check for their explicit browser support, and so we skip skip this check for them. */
							if (!Data(element).isSVG && rootProperty !== "tween" && CSS.Names.prefixCheck(rootProperty)[1] === false && CSS.Normalizations.registered[rootProperty] === undefined) {
								if (Velocity.debug) console.log("Skipping [" + rootProperty + "] due to a lack of browser support.");

								continue;
							}

							/* If the display option is being set to a non-"none" (e.g. "block") and opacity (filter on IE<=8) is being
							   animated to an endValue of non-zero, the user's intention is to fade in from invisible, thus we forcefeed opacity
							   a startValue of 0 if its startValue hasn't already been sourced by value transferring or prior forcefeeding. */
							if (((opts.display !== undefined && opts.display !== null && opts.display !== "none") || (opts.visibility !== undefined && opts.visibility !== "hidden")) && /opacity|filter/.test(property) && !startValue && endValue !== 0) {
								startValue = 0;
							}

							/* If values have been transferred from the previous Velocity call, extract the endValue and rootPropertyValue
							   for all of the current call's properties that were *also* animated in the previous call. */
							/* Note: Value transferring can optionally be disabled by the user via the _cacheValues option. */
							if (opts._cacheValues && lastTweensContainer && lastTweensContainer[property]) {
								if (startValue === undefined) {
									startValue = lastTweensContainer[property].endValue + lastTweensContainer[property].unitType;
								}

								/* The previous call's rootPropertyValue is extracted from the element's data cache since that's the
								   instance of rootPropertyValue that gets freshly updated by the tweening process, whereas the rootPropertyValue
								   attached to the incoming lastTweensContainer is equal to the root property's value prior to any tweening. */
								rootPropertyValue = Data(element).rootPropertyValueCache[rootProperty];
								/* If values were not transferred from a previous Velocity call, query the DOM as needed. */
							} else {
								/* Handle hooked properties. */
								if (CSS.Hooks.registered[property]) {
									if (startValue === undefined) {
										rootPropertyValue = CSS.getPropertyValue(element, rootProperty); /* GET */
										/* Note: The following getPropertyValue() call does not actually trigger a DOM query;
										   getPropertyValue() will extract the hook from rootPropertyValue. */
										startValue = CSS.getPropertyValue(element, property, rootPropertyValue);
										/* If startValue is already defined via forcefeeding, do not query the DOM for the root property's value;
										   just grab rootProperty's zero-value template from CSS.Hooks. This overwrites the element's actual
										   root property value (if one is set), but this is acceptable since the primary reason users forcefeed is
										   to avoid DOM queries, and thus we likewise avoid querying the DOM for the root property's value. */
									} else {
										/* Grab this hook's zero-value template, e.g. "0px 0px 0px black". */
										rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
									}
									/* Handle non-hooked properties that haven't already been defined via forcefeeding. */
								} else if (startValue === undefined) {
									startValue = CSS.getPropertyValue(element, property); /* GET */
								}
							}

							/**************************
							   Value Data Extraction
							**************************/

							var separatedValue,
								endValueUnitType,
								startValueUnitType,
								operator = false;

							/* Separates a property value into its numeric value and its unit type. */
							function separateValue(property, value) {
								var unitType,
									numericValue;

								numericValue = (value || "0")
									.toString()
									.toLowerCase()
									/* Match the unit type at the end of the value. */
									.replace(/[%A-z]+$/, function (match) {
										/* Grab the unit type. */
										unitType = match;

										/* Strip the unit type off of value. */
										return "";
									});

								/* If no unit type was supplied, assign one that is appropriate for this property (e.g. "deg" for rotateZ or "px" for width). */
								if (!unitType) {
									unitType = CSS.Values.getUnitType(property);
								}

								return [numericValue, unitType];
							}

							/* Separate startValue. */
							separatedValue = separateValue(property, startValue);
							startValue = separatedValue[0];
							startValueUnitType = separatedValue[1];

							/* Separate endValue, and extract a value operator (e.g. "+=", "-=") if one exists. */
							separatedValue = separateValue(property, endValue);
							endValue = separatedValue[0].replace(/^([+-\/*])=/, function (match, subMatch) {
								operator = subMatch;

								/* Strip the operator off of the value. */
								return "";
							});
							endValueUnitType = separatedValue[1];

							/* Parse float values from endValue and startValue. Default to 0 if NaN is returned. */
							startValue = parseFloat(startValue) || 0;
							endValue = parseFloat(endValue) || 0;

							/***************************************
							   Property-Specific Value Conversion
							***************************************/

							/* Custom support for properties that don't actually accept the % unit type, but where pollyfilling is trivial and relatively foolproof. */
							if (endValueUnitType === "%") {
								/* A %-value fontSize/lineHeight is relative to the parent's fontSize (as opposed to the parent's dimensions),
								   which is identical to the em unit's behavior, so we piggyback off of that. */
								if (/^(fontSize|lineHeight)$/.test(property)) {
									/* Convert % into an em decimal value. */
									endValue = endValue / 100;
									endValueUnitType = "em";
									/* For scaleX and scaleY, convert the value into its decimal format and strip off the unit type. */
								} else if (/^scale/.test(property)) {
									endValue = endValue / 100;
									endValueUnitType = "";
									/* For RGB components, take the defined percentage of 255 and strip off the unit type. */
								} else if (/(Red|Green|Blue)$/i.test(property)) {
									endValue = (endValue / 100) * 255;
									endValueUnitType = "";
								}
							}

							/***************************
							   Unit Ratio Calculation
							***************************/

							/* When queried, the browser returns (most) CSS property values in pixels. Therefore, if an endValue with a unit type of
							   %, em, or rem is animated toward, startValue must be converted from pixels into the same unit type as endValue in order
							   for value manipulation logic (increment/decrement) to proceed. Further, if the startValue was forcefed or transferred
							   from a previous call, startValue may also not be in pixels. Unit conversion logic therefore consists of two steps:
							   1) Calculating the ratio of %/em/rem/vh/vw relative to pixels
							   2) Converting startValue into the same unit of measurement as endValue based on these ratios. */
							/* Unit conversion ratios are calculated by inserting a sibling node next to the target node, copying over its position property,
							   setting values with the target unit type then comparing the returned pixel value. */
							/* Note: Even if only one of these unit types is being animated, all unit ratios are calculated at once since the overhead
							   of batching the SETs and GETs together upfront outweights the potential overhead
							   of layout thrashing caused by re-querying for uncalculated ratios for subsequently-processed properties. */
							/* Todo: Shift this logic into the calls' first tick instance so that it's synced with RAF. */
							function calculateUnitRatios() {

								/************************
									Same Ratio Checks
								************************/

								/* The properties below are used to determine whether the element differs sufficiently from this call's
								   previously iterated element to also differ in its unit conversion ratios. If the properties match up with those
								   of the prior element, the prior element's conversion ratios are used. Like most optimizations in Velocity,
								   this is done to minimize DOM querying. */
								var sameRatioIndicators = {
									myParent: element.parentNode || document.body,
									/* GET */
									position: CSS.getPropertyValue(element, "position"),
									/* GET */
									fontSize: CSS.getPropertyValue(element, "fontSize") /* GET */
								},
									/* Determine if the same % ratio can be used. % is based on the element's position value and its parent's width and height dimensions. */
									samePercentRatio = ((sameRatioIndicators.position === callUnitConversionData.lastPosition) && (sameRatioIndicators.myParent === callUnitConversionData.lastParent)),
									/* Determine if the same em ratio can be used. em is relative to the element's fontSize. */
									sameEmRatio = (sameRatioIndicators.fontSize === callUnitConversionData.lastFontSize);

								/* Store these ratio indicators call-wide for the next element to compare against. */
								callUnitConversionData.lastParent = sameRatioIndicators.myParent;
								callUnitConversionData.lastPosition = sameRatioIndicators.position;
								callUnitConversionData.lastFontSize = sameRatioIndicators.fontSize;

								/***************************
								   Element-Specific Units
								***************************/

								/* Note: IE8 rounds to the nearest pixel when returning CSS values, thus we perform conversions using a measurement
								   of 100 (instead of 1) to give our ratios a precision of at least 2 decimal values. */
								var measurement = 100,
									unitRatios = {};

								if (!sameEmRatio || !samePercentRatio) {
									var dummy = Data(element).isSVG ? document.createElementNS("http://www.w3.org/2000/svg", "rect") : document.createElement("div");

									Velocity.init(dummy);
									sameRatioIndicators.myParent.appendChild(dummy);

									/* To accurately and consistently calculate conversion ratios, the element's cascaded overflow and box-sizing are stripped.
									   Similarly, since width/height can be artificially constrained by their min-/max- equivalents, these are controlled for as well. */
									/* Note: Overflow must be also be controlled for per-axis since the overflow property overwrites its per-axis values. */
									$.each(["overflow", "overflowX", "overflowY"], function (i, property) {
										Velocity.CSS.setPropertyValue(dummy, property, "hidden");
									});
									Velocity.CSS.setPropertyValue(dummy, "position", sameRatioIndicators.position);
									Velocity.CSS.setPropertyValue(dummy, "fontSize", sameRatioIndicators.fontSize);
									Velocity.CSS.setPropertyValue(dummy, "boxSizing", "content-box");

									/* width and height act as our proxy properties for measuring the horizontal and vertical % ratios. */
									$.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function (i, property) {
										Velocity.CSS.setPropertyValue(dummy, property, measurement + "%");
									});
									/* paddingLeft arbitrarily acts as our proxy property for the em ratio. */
									Velocity.CSS.setPropertyValue(dummy, "paddingLeft", measurement + "em");

									/* Divide the returned value by the measurement to get the ratio between 1% and 1px. Default to 1 since working with 0 can produce Infinite. */
									unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth = (parseFloat(CSS.getPropertyValue(dummy, "width", null, true)) || 1) / measurement; /* GET */
									unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight = (parseFloat(CSS.getPropertyValue(dummy, "height", null, true)) || 1) / measurement; /* GET */
									unitRatios.emToPx = callUnitConversionData.lastEmToPx = (parseFloat(CSS.getPropertyValue(dummy, "paddingLeft")) || 1) / measurement; /* GET */

									sameRatioIndicators.myParent.removeChild(dummy);
								} else {
									unitRatios.emToPx = callUnitConversionData.lastEmToPx;
									unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth;
									unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight;
								}

								/***************************
								   Element-Agnostic Units
								***************************/

								/* Whereas % and em ratios are determined on a per-element basis, the rem unit only needs to be checked
								   once per call since it's exclusively dependant upon document.body's fontSize. If this is the first time
								   that calculateUnitRatios() is being run during this call, remToPx will still be set to its default value of null,
								   so we calculate it now. */
								if (callUnitConversionData.remToPx === null) {
									/* Default to browsers' default fontSize of 16px in the case of 0. */
									callUnitConversionData.remToPx = parseFloat(CSS.getPropertyValue(document.body, "fontSize")) || 16; /* GET */
								}

								/* Similarly, viewport units are %-relative to the window's inner dimensions. */
								if (callUnitConversionData.vwToPx === null) {
									callUnitConversionData.vwToPx = parseFloat(window.innerWidth) / 100; /* GET */
									callUnitConversionData.vhToPx = parseFloat(window.innerHeight) / 100; /* GET */
								}

								unitRatios.remToPx = callUnitConversionData.remToPx;
								unitRatios.vwToPx = callUnitConversionData.vwToPx;
								unitRatios.vhToPx = callUnitConversionData.vhToPx;

								if (Velocity.debug >= 1) console.log("Unit ratios: " + JSON.stringify(unitRatios), element);

								return unitRatios;
							}

							/********************
							   Unit Conversion
							********************/

							/* The * and / operators, which are not passed in with an associated unit, inherently use startValue's unit. Skip value and unit conversion. */
							if (/[\/*]/.test(operator)) {
								endValueUnitType = startValueUnitType;
								/* If startValue and endValue differ in unit type, convert startValue into the same unit type as endValue so that if endValueUnitType
								   is a relative unit (%, em, rem), the values set during tweening will continue to be accurately relative even if the metrics they depend
								   on are dynamically changing during the course of the animation. Conversely, if we always normalized into px and used px for setting values, the px ratio
								   would become stale if the original unit being animated toward was relative and the underlying metrics change during the animation. */
								/* Since 0 is 0 in any unit type, no conversion is necessary when startValue is 0 -- we just start at 0 with endValueUnitType. */
							} else if ((startValueUnitType !== endValueUnitType) && startValue !== 0) {
								/* Unit conversion is also skipped when endValue is 0, but *startValueUnitType* must be used for tween values to remain accurate. */
								/* Note: Skipping unit conversion here means that if endValueUnitType was originally a relative unit, the animation won't relatively
								   match the underlying metrics if they change, but this is acceptable since we're animating toward invisibility instead of toward visibility,
								   which remains past the point of the animation's completion. */
								if (endValue === 0) {
									endValueUnitType = startValueUnitType;
								} else {
									/* By this point, we cannot avoid unit conversion (it's undesirable since it causes layout thrashing).
									   If we haven't already, we trigger calculateUnitRatios(), which runs once per element per call. */
									elementUnitConversionData = elementUnitConversionData || calculateUnitRatios();

									/* The following RegEx matches CSS properties that have their % values measured relative to the x-axis. */
									/* Note: W3C spec mandates that all of margin and padding's properties (even top and bottom) are %-relative to the *width* of the parent element. */
									var axis = (/margin|padding|left|right|width|text|word|letter/i.test(property) || /X$/.test(property) || property === "x") ? "x" : "y";

									/* In order to avoid generating n^2 bespoke conversion functions, unit conversion is a two-step process:
									   1) Convert startValue into pixels. 2) Convert this new pixel value into endValue's unit type. */
									switch (startValueUnitType) {
										case "%":
											/* Note: translateX and translateY are the only properties that are %-relative to an element's own dimensions -- not its parent's dimensions.
											   Velocity does not include a special conversion process to account for this behavior. Therefore, animating translateX/Y from a % value
											   to a non-% value will produce an incorrect start value. Fortunately, this sort of cross-unit conversion is rarely done by users in practice. */
											startValue *= (axis === "x" ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight);
											break;

										case "px":
											/* px acts as our midpoint in the unit conversion process; do nothing. */
											break;

										default:
											startValue *= elementUnitConversionData[startValueUnitType + "ToPx"];
									}

									/* Invert the px ratios to convert into to the target unit. */
									switch (endValueUnitType) {
										case "%":
											startValue *= 1 / (axis === "x" ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight);
											break;

										case "px":
											/* startValue is already in px, do nothing; we're done. */
											break;

										default:
											startValue *= 1 / elementUnitConversionData[endValueUnitType + "ToPx"];
									}
								}
							}

							/*********************
							   Relative Values
							*********************/

							/* Operator logic must be performed last since it requires unit-normalized start and end values. */
							/* Note: Relative *percent values* do not behave how most people think; while one would expect "+=50%"
							   to increase the property 1.5x its current value, it in fact increases the percent units in absolute terms:
							   50 points is added on top of the current % value. */
							switch (operator) {
								case "+":
									endValue = startValue + endValue;
									break;

								case "-":
									endValue = startValue - endValue;
									break;

								case "*":
									endValue = startValue * endValue;
									break;

								case "/":
									endValue = startValue / endValue;
									break;
							}

							/**************************
							   tweensContainer Push
							**************************/

							/* Construct the per-property tween object, and push it to the element's tweensContainer. */
							tweensContainer[property] = {
								rootPropertyValue: rootPropertyValue,
								startValue: startValue,
								currentValue: startValue,
								endValue: endValue,
								unitType: endValueUnitType,
								easing: easing
							};

							if (Velocity.debug) console.log("tweensContainer (" + property + "): " + JSON.stringify(tweensContainer[property]), element);
						}

						/* Along with its property data, store a reference to the element itself onto tweensContainer. */
						tweensContainer.element = element;
					}

					/*****************
						Call Push
					*****************/

					/* Note: tweensContainer can be empty if all of the properties in this call's property map were skipped due to not
					   being supported by the browser. The element property is used for checking that the tweensContainer has been appended to. */
					if (tweensContainer.element) {
						/* Apply the "velocity-animating" indicator class. */
						CSS.Values.addClass(element, "velocity-animating");

						/* The call array houses the tweensContainers for each element being animated in the current call. */
						call.push(tweensContainer);

						/* Store the tweensContainer and options if we're working on the default effects queue, so that they can be used by the reverse command. */
						if (opts.queue === "") {
							Data(element).tweensContainer = tweensContainer;
							Data(element).opts = opts;
						}

						/* Switch on the element's animating flag. */
						Data(element).isAnimating = true;

						/* Once the final element in this call's element set has been processed, push the call array onto
						   Velocity.State.calls for the animation tick to immediately begin processing. */
						if (elementsIndex === elementsLength - 1) {
							/* Add the current call plus its associated metadata (the element set and the call's options) onto the global call container.
							   Anything on this call container is subjected to tick() processing. */
							Velocity.State.calls.push([call, elements, opts, null, promiseData.resolver]);

							/* If the animation tick isn't running, start it. (Velocity shuts it off when there are no active calls to process.) */
							if (Velocity.State.isTicking === false) {
								Velocity.State.isTicking = true;

								/* Start the tick loop. */
								tick();
							}
						} else {
							elementsIndex++;
						}
					}
				}

				/* When the queue option is set to false, the call skips the element's queue and fires immediately. */
				if (opts.queue === false) {
					/* Since this buildQueue call doesn't respect the element's existing queue (which is where a delay option would have been appended),
					   we manually inject the delay property here with an explicit setTimeout. */
					if (opts.delay) {
						setTimeout(buildQueue, opts.delay);
					} else {
						buildQueue();
					}
					/* Otherwise, the call undergoes element queueing as normal. */
					/* Note: To interoperate with jQuery, Velocity uses jQuery's own $.queue() stack for queuing logic. */
				} else {
					$.queue(element, opts.queue, function (next, clearQueue) {
						/* If the clearQueue flag was passed in by the stop command, resolve this call's promise. (Promises can only be resolved once,
						   so it's fine if this is repeatedly triggered for each element in the associated call.) */
						if (clearQueue === true) {
							if (promiseData.promise) {
								promiseData.resolver(elements);
							}

							/* Do not continue with animation queueing. */
							return true;
						}

						/* This flag indicates to the upcoming completeCall() function that this queue entry was initiated by Velocity.
						   See completeCall() for further details. */
						Velocity.velocityQueueEntryFlag = true;

						buildQueue(next);
					});
				}

				/*********************
					Auto-Dequeuing
				*********************/

				/* As per jQuery's $.queue() behavior, to fire the first non-custom-queue entry on an element, the element
				   must be dequeued if its queue stack consists *solely* of the current call. (This can be determined by checking
				   for the "inprogress" item that jQuery prepends to active queue stack arrays.) Regardless, whenever the element's
				   queue is further appended with additional items -- including $.delay()'s or even $.animate() calls, the queue's
				   first entry is automatically fired. This behavior contrasts that of custom queues, which never auto-fire. */
				/* Note: When an element set is being subjected to a non-parallel Velocity call, the animation will not begin until
				   each one of the elements in the set has reached the end of its individually pre-existing queue chain. */
				/* Note: Unfortunately, most people don't fully grasp jQuery's powerful, yet quirky, $.queue() function.
				   Lean more here: http://stackoverflow.com/questions/1058158/can-somebody-explain-jquery-queue-to-me */
				if ((opts.queue === "" || opts.queue === "fx") && $.queue(element)[0] !== "inprogress") {
					$.dequeue(element);
				}
			}

			/**************************
			   Element Set Iteration
			**************************/

			/* If the "nodeType" property exists on the elements variable, we're animating a single element.
			   Place it in an array so that $.each() can iterate over it. */
			$.each(elements, function (i, element) {
				/* Ensure each element in a set has a nodeType (is a real element) to avoid throwing errors. */
				if (Type.isNode(element)) {
					processElement.call(element);
				}
			});

			/******************
			   Option: Loop
			******************/

			/* The loop option accepts an integer indicating how many times the element should loop between the values in the
			   current call's properties map and the element's property values prior to this call. */
			/* Note: The loop option's logic is performed here -- after element processing -- because the current call needs
			   to undergo its queue insertion prior to the loop option generating its series of constituent "reverse" calls,
			   which chain after the current call. Two reverse calls (two "alternations") constitute one loop. */
			var opts = $.extend({}, Velocity.defaults, options),
				reverseCallsCount;

			opts.loop = parseInt(opts.loop);
			reverseCallsCount = (opts.loop * 2) - 1;

			if (opts.loop) {
				/* Double the loop count to convert it into its appropriate number of "reverse" calls.
				   Subtract 1 from the resulting value since the current call is included in the total alternation count. */
				for (var x = 0; x < reverseCallsCount; x++) {
					/* Since the logic for the reverse action occurs inside Queueing and therefore this call's options object
					   isn't parsed until then as well, the current call's delay option must be explicitly passed into the reverse
					   call so that the delay logic that occurs inside *Pre-Queueing* can process it. */
					var reverseOptions = {
						delay: opts.delay,
						progress: opts.progress
					};

					/* If a complete callback was passed into this call, transfer it to the loop redirect's final "reverse" call
					   so that it's triggered when the entire redirect is complete (and not when the very first animation is complete). */
					if (x === reverseCallsCount - 1) {
						reverseOptions.display = opts.display;
						reverseOptions.visibility = opts.visibility;
						reverseOptions.complete = opts.complete;
					}

					animate(elements, "reverse", reverseOptions);
				}
			}

			/***************
				Chaining
			***************/

			/* Return the elements back to the call chain, with wrapped elements taking precedence in case Velocity was called via the $.fn. extension. */
			return getChain();
		};

		/* Turn Velocity into the animation function, extended with the pre-existing Velocity object. */
		Velocity = $.extend(animate, Velocity);
		/* For legacy support, also expose the literal animate method. */
		Velocity.animate = animate;

		/**************
			Timing
		**************/

		/* Ticker function. */
		var ticker = window.requestAnimationFrame || rAFShim;

		/* Inactive browser tabs pause rAF, which results in all active animations immediately sprinting to their completion states when the tab refocuses.
		   To get around this, we dynamically switch rAF to setTimeout (which the browser *doesn't* pause) when the tab loses focus. We skip this for mobile
		   devices to avoid wasting battery power on inactive tabs. */
		/* Note: Tab focus detection doesn't work on older versions of IE, but that's okay since they don't support rAF to begin with. */
		if (!Velocity.State.isMobile && document.hidden !== undefined) {
			document.addEventListener("visibilitychange", function () {
				/* Reassign the rAF function (which the global tick() function uses) based on the tab's focus state. */
				if (document.hidden) {
					ticker = function (callback) {
						/* The tick function needs a truthy first argument in order to pass its internal timestamp check. */
						return setTimeout(function () {
							callback(true)
						}, 16);
					};

					/* The rAF loop has been paused by the browser, so we manually restart the tick. */
					tick();
				} else {
					ticker = window.requestAnimationFrame || rAFShim;
				}
			});
		}

		/************
			Tick
		************/

		/* Note: All calls to Velocity are pushed to the Velocity.State.calls array, which is fully iterated through upon each tick. */
		function tick(timestamp) {
			/* An empty timestamp argument indicates that this is the first tick occurence since ticking was turned on.
			   We leverage this metadata to fully ignore the first tick pass since RAF's initial pass is fired whenever
			   the browser's next tick sync time occurs, which results in the first elements subjected to Velocity
			   calls being animated out of sync with any elements animated immediately thereafter. In short, we ignore
			   the first RAF tick pass so that elements being immediately consecutively animated -- instead of simultaneously animated
			   by the same Velocity call -- are properly batched into the same initial RAF tick and consequently remain in sync thereafter. */
			if (timestamp) {
				/* We ignore RAF's high resolution timestamp since it can be significantly offset when the browser is
				   under high stress; we opt for choppiness over allowing the browser to drop huge chunks of frames. */
				var timeCurrent = (new Date).getTime();

				/********************
				   Call Iteration
				********************/

				var callsLength = Velocity.State.calls.length;

				/* To speed up iterating over this array, it is compacted (falsey items -- calls that have completed -- are removed)
				   when its length has ballooned to a point that can impact tick performance. This only becomes necessary when animation
				   has been continuous with many elements over a long period of time; whenever all active calls are completed, completeCall() clears Velocity.State.calls. */
				if (callsLength > 10000) {
					Velocity.State.calls = compactSparseArray(Velocity.State.calls);
				}

				/* Iterate through each active call. */
				for (var i = 0; i < callsLength; i++) {
					/* When a Velocity call is completed, its Velocity.State.calls entry is set to false. Continue on to the next call. */
					if (!Velocity.State.calls[i]) {
						continue;
					}

					/************************
					   Call-Wide Variables
					************************/

					var callContainer = Velocity.State.calls[i],
						call = callContainer[0],
						opts = callContainer[2],
						timeStart = callContainer[3],
						firstTick = !!timeStart,
						tweenDummyValue = null;

					/* If timeStart is undefined, then this is the first time that this call has been processed by tick().
					   We assign timeStart now so that its value is as close to the real animation start time as possible.
					   (Conversely, had timeStart been defined when this call was added to Velocity.State.calls, the delay
					   between that time and now would cause the first few frames of the tween to be skipped since
					   percentComplete is calculated relative to timeStart.) */
					/* Further, subtract 16ms (the approximate resolution of RAF) from the current time value so that the
					   first tick iteration isn't wasted by animating at 0% tween completion, which would produce the
					   same style value as the element's current value. */
					if (!timeStart) {
						timeStart = Velocity.State.calls[i][3] = timeCurrent - 16;
					}

					/* The tween's completion percentage is relative to the tween's start time, not the tween's start value
					   (which would result in unpredictable tween durations since JavaScript's timers are not particularly accurate).
					   Accordingly, we ensure that percentComplete does not exceed 1. */
					var percentComplete = Math.min((timeCurrent - timeStart) / opts.duration, 1);

					/**********************
					   Element Iteration
					**********************/

					/* For every call, iterate through each of the elements in its set. */
					for (var j = 0, callLength = call.length; j < callLength; j++) {
						var tweensContainer = call[j],
							element = tweensContainer.element;

						/* Check to see if this element has been deleted midway through the animation by checking for the
						   continued existence of its data cache. If it's gone, skip animating this element. */
						if (!Data(element)) {
							continue;
						}

						var transformPropertyExists = false;

						/**********************************
						   Display & Visibility Toggling
						**********************************/

						/* If the display option is set to non-"none", set it upfront so that the element can become visible before tweening begins.
						   (Otherwise, display's "none" value is set in completeCall() once the animation has completed.) */
						if (opts.display !== undefined && opts.display !== null && opts.display !== "none") {
							if (opts.display === "flex") {
								var flexValues = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];

								$.each(flexValues, function (i, flexValue) {
									CSS.setPropertyValue(element, "display", flexValue);
								});
							}

							CSS.setPropertyValue(element, "display", opts.display);
						}

						/* Same goes with the visibility option, but its "none" equivalent is "hidden". */
						if (opts.visibility !== undefined && opts.visibility !== "hidden") {
							CSS.setPropertyValue(element, "visibility", opts.visibility);
						}

						/************************
						   Property Iteration
						************************/

						/* For every element, iterate through each property. */
						for (var property in tweensContainer) {
							/* Note: In addition to property tween data, tweensContainer contains a reference to its associated element. */
							if (property !== "element") {
								var tween = tweensContainer[property],
									currentValue,
									/* Easing can either be a pre-genereated function or a string that references a pre-registered easing
									   on the Velocity.Easings object. In either case, return the appropriate easing *function*. */
									easing = Type.isString(tween.easing) ? Velocity.Easings[tween.easing] : tween.easing;

								/******************************
								   Current Value Calculation
								******************************/

								/* If this is the last tick pass (if we've reached 100% completion for this tween),
								   ensure that currentValue is explicitly set to its target endValue so that it's not subjected to any rounding. */
								if (percentComplete === 1) {
									currentValue = tween.endValue;
									/* Otherwise, calculate currentValue based on the current delta from startValue. */
								} else {
									var tweenDelta = tween.endValue - tween.startValue;
									currentValue = tween.startValue + (tweenDelta * easing(percentComplete, opts, tweenDelta));

									/* If no value change is occurring, don't proceed with DOM updating. */
									if (!firstTick && (currentValue === tween.currentValue)) {
										continue;
									}
								}

								tween.currentValue = currentValue;

								/* If we're tweening a fake 'tween' property in order to log transition values, update the one-per-call variable so that
								   it can be passed into the progress callback. */
								if (property === "tween") {
									tweenDummyValue = currentValue;
								} else {
									/******************
									   Hooks: Part I
									******************/

									/* For hooked properties, the newly-updated rootPropertyValueCache is cached onto the element so that it can be used
									   for subsequent hooks in this call that are associated with the same root property. If we didn't cache the updated
									   rootPropertyValue, each subsequent update to the root property in this tick pass would reset the previous hook's
									   updates to rootPropertyValue prior to injection. A nice performance byproduct of rootPropertyValue caching is that
									   subsequently chained animations using the same hookRoot but a different hook can use this cached rootPropertyValue. */
									if (CSS.Hooks.registered[property]) {
										var hookRoot = CSS.Hooks.getRoot(property),
											rootPropertyValueCache = Data(element).rootPropertyValueCache[hookRoot];

										if (rootPropertyValueCache) {
											tween.rootPropertyValue = rootPropertyValueCache;
										}
									}

									/*****************
										DOM Update
									*****************/

									/* setPropertyValue() returns an array of the property name and property value post any normalization that may have been performed. */
									/* Note: To solve an IE<=8 positioning bug, the unit type is dropped when setting a property value of 0. */
									var adjustedSetData = CSS.setPropertyValue(element, /* SET */
										property,
										tween.currentValue + (parseFloat(currentValue) === 0 ? "" : tween.unitType),
										tween.rootPropertyValue,
										tween.scrollData);

									/*******************
									   Hooks: Part II
									*******************/

									/* Now that we have the hook's updated rootPropertyValue (the post-processed value provided by adjustedSetData), cache it onto the element. */
									if (CSS.Hooks.registered[property]) {
										/* Since adjustedSetData contains normalized data ready for DOM updating, the rootPropertyValue needs to be re-extracted from its normalized form. ?? */
										if (CSS.Normalizations.registered[hookRoot]) {
											Data(element).rootPropertyValueCache[hookRoot] = CSS.Normalizations.registered[hookRoot]("extract", null, adjustedSetData[1]);
										} else {
											Data(element).rootPropertyValueCache[hookRoot] = adjustedSetData[1];
										}
									}

									/***************
									   Transforms
									***************/

									/* Flag whether a transform property is being animated so that flushTransformCache() can be triggered once this tick pass is complete. */
									if (adjustedSetData[0] === "transform") {
										transformPropertyExists = true;
									}

								}
							}
						}

						/****************
							mobileHA
						****************/

						/* If mobileHA is enabled, set the translate3d transform to null to force hardware acceleration.
						   It's safe to override this property since Velocity doesn't actually support its animation (hooks are used in its place). */
						if (opts.mobileHA) {
							/* Don't set the null transform hack if we've already done so. */
							if (Data(element).transformCache.translate3d === undefined) {
								/* All entries on the transformCache object are later concatenated into a single transform string via flushTransformCache(). */
								Data(element).transformCache.translate3d = "(0px, 0px, 0px)";

								transformPropertyExists = true;
							}
						}

						if (transformPropertyExists) {
							CSS.flushTransformCache(element);
						}
					}

					/* The non-"none" display value is only applied to an element once -- when its associated call is first ticked through.
					   Accordingly, it's set to false so that it isn't re-processed by this call in the next tick. */
					if (opts.display !== undefined && opts.display !== "none") {
						Velocity.State.calls[i][2].display = false;
					}
					if (opts.visibility !== undefined && opts.visibility !== "hidden") {
						Velocity.State.calls[i][2].visibility = false;
					}

					/* Pass the elements and the timing data (percentComplete, msRemaining, timeStart, tweenDummyValue) into the progress callback. */
					if (opts.progress) {
						opts.progress.call(callContainer[1],
							callContainer[1],
							percentComplete,
							Math.max(0, (timeStart + opts.duration) - timeCurrent),
							timeStart,
							tweenDummyValue);
					}

					/* If this call has finished tweening, pass its index to completeCall() to handle call cleanup. */
					if (percentComplete === 1) {
						completeCall(i);
					}
				}
			}

			/* Note: completeCall() sets the isTicking flag to false when the last call on Velocity.State.calls has completed. */
			if (Velocity.State.isTicking) {
				ticker(tick);
			}
		}

		/**********************
			Call Completion
		**********************/

		/* Note: Unlike tick(), which processes all active calls at once, call completion is handled on a per-call basis. */
		function completeCall(callIndex, isStopped) {
			/* Ensure the call exists. */
			if (!Velocity.State.calls[callIndex]) {
				return false;
			}

			/* Pull the metadata from the call. */
			var call = Velocity.State.calls[callIndex][0],
				elements = Velocity.State.calls[callIndex][1],
				opts = Velocity.State.calls[callIndex][2],
				resolver = Velocity.State.calls[callIndex][4];

			var remainingCallsExist = false;

			/*************************
			   Element Finalization
			*************************/

			for (var i = 0, callLength = call.length; i < callLength; i++) {
				var element = call[i].element;

				/* If the user set display to "none" (intending to hide the element), set it now that the animation has completed. */
				/* Note: display:none isn't set when calls are manually stopped (via Velocity("stop"). */
				/* Note: Display gets ignored with "reverse" calls and infinite loops, since this behavior would be undesirable. */
				if (!isStopped && !opts.loop) {
					if (opts.display === "none") {
						CSS.setPropertyValue(element, "display", opts.display);
					}

					if (opts.visibility === "hidden") {
						CSS.setPropertyValue(element, "visibility", opts.visibility);
					}
				}

				/* If the element's queue is empty (if only the "inprogress" item is left at position 0) or if its queue is about to run
				   a non-Velocity-initiated entry, turn off the isAnimating flag. A non-Velocity-initiatied queue entry's logic might alter
				   an element's CSS values and thereby cause Velocity's cached value data to go stale. To detect if a queue entry was initiated by Velocity,
				   we check for the existence of our special Velocity.queueEntryFlag declaration, which minifiers won't rename since the flag
				   is assigned to jQuery's global $ object and thus exists out of Velocity's own scope. */
				if (opts.loop !== true && ($.queue(element)[1] === undefined || !/\.velocityQueueEntryFlag/i.test($.queue(element)[1]))) {
					/* The element may have been deleted. Ensure that its data cache still exists before acting on it. */
					if (Data(element)) {
						Data(element).isAnimating = false;
						/* Clear the element's rootPropertyValueCache, which will become stale. */
						Data(element).rootPropertyValueCache = {};

						var transformHAPropertyExists = false;
						/* If any 3D transform subproperty is at its default value (regardless of unit type), remove it. */
						$.each(CSS.Lists.transforms3D, function (i, transformName) {
							var defaultValue = /^scale/.test(transformName) ? 1 : 0,
								currentValue = Data(element).transformCache[transformName];

							if (Data(element).transformCache[transformName] !== undefined && new RegExp("^\\(" + defaultValue + "[^.]").test(currentValue)) {
								transformHAPropertyExists = true;

								delete Data(element).transformCache[transformName];
							}
						});

						/* Mobile devices have hardware acceleration removed at the end of the animation in order to avoid hogging the GPU's memory. */
						if (opts.mobileHA) {
							transformHAPropertyExists = true;
							delete Data(element).transformCache.translate3d;
						}

						/* Flush the subproperty removals to the DOM. */
						if (transformHAPropertyExists) {
							CSS.flushTransformCache(element);
						}

						/* Remove the "velocity-animating" indicator class. */
						CSS.Values.removeClass(element, "velocity-animating");
					}
				}

				/*********************
				   Option: Complete
				*********************/

				/* Complete is fired once per call (not once per element) and is passed the full raw DOM element set as both its context and its first argument. */
				/* Note: Callbacks aren't fired when calls are manually stopped (via Velocity("stop"). */
				if (!isStopped && opts.complete && !opts.loop && (i === callLength - 1)) {
					/* We throw callbacks in a setTimeout so that thrown errors don't halt the execution of Velocity itself. */
					try {
						opts.complete.call(elements, elements);
					} catch (error) {
						setTimeout(function () {
							throw error;
						}, 1);
					}
				}

				/**********************
				   Promise Resolving
				**********************/

				/* Note: Infinite loops don't return promises. */
				if (resolver && opts.loop !== true) {
					resolver(elements);
				}

				/****************************
				   Option: Loop (Infinite)
				****************************/

				if (Data(element) && opts.loop === true && !isStopped) {
					/* If a rotateX/Y/Z property is being animated to 360 deg with loop:true, swap tween start/end values to enable
					   continuous iterative rotation looping. (Otherise, the element would just rotate back and forth.) */
					$.each(Data(element).tweensContainer, function (propertyName, tweenContainer) {
						if (/^rotate/.test(propertyName) && parseFloat(tweenContainer.endValue) === 360) {
							tweenContainer.endValue = 0;
							tweenContainer.startValue = 360;
						}

						if (/^backgroundPosition/.test(propertyName) && parseFloat(tweenContainer.endValue) === 100 && tweenContainer.unitType === "%") {
							tweenContainer.endValue = 0;
							tweenContainer.startValue = 100;
						}
					});

					Velocity(element, "reverse", {
						loop: true,
						delay: opts.delay
					});
				}

				/***************
				   Dequeueing
				***************/

				/* Fire the next call in the queue so long as this call's queue wasn't set to false (to trigger a parallel animation),
				   which would have already caused the next call to fire. Note: Even if the end of the animation queue has been reached,
				   $.dequeue() must still be called in order to completely clear jQuery's animation queue. */
				if (opts.queue !== false) {
					$.dequeue(element, opts.queue);
				}
			}

			/************************
			   Calls Array Cleanup
			************************/

			/* Since this call is complete, set it to false so that the rAF tick skips it. This array is later compacted via compactSparseArray().
			  (For performance reasons, the call is set to false instead of being deleted from the array: http://www.html5rocks.com/en/tutorials/speed/v8/) */
			Velocity.State.calls[callIndex] = false;

			/* Iterate through the calls array to determine if this was the final in-progress animation.
			   If so, set a flag to end ticking and clear the calls array. */
			for (var j = 0, callsLength = Velocity.State.calls.length; j < callsLength; j++) {
				if (Velocity.State.calls[j] !== false) {
					remainingCallsExist = true;

					break;
				}
			}

			if (remainingCallsExist === false) {
				/* tick() will detect this flag upon its next iteration and subsequently turn itself off. */
				Velocity.State.isTicking = false;

				/* Clear the calls array so that its length is reset. */
				delete Velocity.State.calls;
				Velocity.State.calls = [];
			}
		}

		/******************
			Frameworks
		******************/

		/* Both jQuery and Zepto allow their $.fn object to be extended to allow wrapped elements to be subjected to plugin calls.
		   If either framework is loaded, register a "velocity" extension pointing to Velocity's core animate() method.  Velocity
		   also registers itself onto a global container (window.jQuery || window.Zepto || window) so that certain features are
		   accessible beyond just a per-element scope. This master object contains an .animate() method, which is later assigned to $.fn
		   (if jQuery or Zepto are present). Accordingly, Velocity can both act on wrapped DOM elements and stand alone for targeting raw DOM elements. */
		global.Velocity = Velocity;

		if (global !== window) {
			/* Assign the element function to Velocity's core animate() method. */
			global.fn.velocity = animate;
			/* Assign the object function's defaults to Velocity's global defaults object. */
			global.fn.velocity.defaults = Velocity.defaults;
		}

		/***********************
		   Packaged Redirects
		***********************/

		/* slideUp, slideDown */
		$.each(["Down", "Up"], function (i, direction) {
			Velocity.Redirects["slide" + direction] = function (element, options, elementsIndex, elementsSize, elements, promiseData) {
				var opts = $.extend({}, options),
					begin = opts.begin,
					complete = opts.complete,
					computedValues = {
						height: "",
						marginTop: "",
						marginBottom: "",
						paddingTop: "",
						paddingBottom: ""
					},
					inlineValues = {};

				if (opts.display === undefined) {
					/* Show the element before slideDown begins and hide the element after slideUp completes. */
					/* Note: Inline elements cannot have dimensions animated, so they're reverted to inline-block. */
					opts.display = (direction === "Down" ? (Velocity.CSS.Values.getDisplayType(element) === "inline" ? "inline-block" : "block") : "none");
				}

				opts.begin = function () {
					/* If the user passed in a begin callback, fire it now. */
					begin && begin.call(elements, elements);

					/* Cache the elements' original vertical dimensional property values so that we can animate back to them. */
					for (var property in computedValues) {
						inlineValues[property] = element.style[property];

						/* For slideDown, use forcefeeding to animate all vertical properties from 0. For slideUp,
						   use forcefeeding to start from computed values and animate down to 0. */
						var propertyValue = Velocity.CSS.getPropertyValue(element, property);
						computedValues[property] = (direction === "Down") ? [propertyValue, 0] : [0, propertyValue];
					}

					/* Force vertical overflow content to clip so that sliding works as expected. */
					inlineValues.overflow = element.style.overflow;
					element.style.overflow = "hidden";
				}

				opts.complete = function () {
					/* Reset element to its pre-slide inline values once its slide animation is complete. */
					for (var property in inlineValues) {
						element.style[property] = inlineValues[property];
					}

					/* If the user passed in a complete callback, fire it now. */
					complete && complete.call(elements, elements);
					promiseData && promiseData.resolver(elements);
				};

				Velocity(element, computedValues, opts);
			};
		});

		/* fadeIn, fadeOut */
		$.each(["In", "Out"], function (i, direction) {
			Velocity.Redirects["fade" + direction] = function (element, options, elementsIndex, elementsSize, elements, promiseData) {
				var opts = $.extend({}, options),
					propertiesMap = {
						opacity: (direction === "In") ? 1 : 0
					},
					originalComplete = opts.complete;

				/* Since redirects are triggered individually for each element in the animated set, avoid repeatedly triggering
				   callbacks by firing them only when the final element has been reached. */
				if (elementsIndex !== elementsSize - 1) {
					opts.complete = opts.begin = null;
				} else {
					opts.complete = function () {
						if (originalComplete) {
							originalComplete.call(elements, elements);
						}

						promiseData && promiseData.resolver(elements);
					}
				}

				/* If a display was passed in, use it. Otherwise, default to "none" for fadeOut or the element-specific default for fadeIn. */
				/* Note: We allow users to pass in "null" to skip display setting altogether. */
				if (opts.display === undefined) {
					opts.display = (direction === "In" ? "auto" : "none");
				}

				Velocity(this, propertiesMap, opts);
			};
		});

		return Velocity;
	}((window.jQuery || window.Zepto || window), window, document);
}));

/******************
   Known Issues
******************/

/* The CSS spec mandates that the translateX/Y/Z transforms are %-relative to the element itself -- not its parent.
Velocity, however, doesn't make this distinction. Thus, converting to or from the % unit with these subproperties
will produce an inaccurate conversion value. The same issue exists with the cx/cy attributes of SVG circles and ellipses. */
/** @preserve jQuery animateNumber plugin v0.0.13
 * (c) 2013, Alexandr Borisov.
 * https://github.com/aishek/jquery-animateNumber
 */

// ['...'] notation using to avoid names minification by Google Closure Compiler
(function ($) {
	var reverse = function (value) {
		return value.split('').reverse().join('');
	};

	var defaults = {
		numberStep: function (now, tween) {
			var floored_number = Math.floor(now),
				target = $(tween.elem);

			target.text(floored_number);
		}
	};

	var handle = function (tween) {
		var elem = tween.elem;
		if (elem.nodeType && elem.parentNode) {
			var handler = elem._animateNumberSetter;
			if (!handler) {
				handler = defaults.numberStep;
			}
			handler(tween.now, tween);
		}
	};

	if (!$.Tween || !$.Tween.propHooks) {
		$.fx.step.number = handle;
	} else {
		$.Tween.propHooks.number = {
			set: handle
		};
	}

	var extract_number_parts = function (separated_number, group_length) {
		var numbers = separated_number.split('').reverse(),
			number_parts = [],
			current_number_part,
			current_index,
			q;

		for (var i = 0, l = Math.ceil(separated_number.length / group_length); i < l; i++) {
			current_number_part = '';
			for (q = 0; q < group_length; q++) {
				current_index = i * group_length + q;
				if (current_index === separated_number.length) {
					break;
				}

				current_number_part = current_number_part + numbers[current_index];
			}
			number_parts.push(current_number_part);
		}

		return number_parts;
	};

	var remove_precending_zeros = function (number_parts) {
		var last_index = number_parts.length - 1,
			last = reverse(number_parts[last_index]);

		number_parts[last_index] = reverse(parseInt(last, 10).toString());
		return number_parts;
	};

	$.animateNumber = {
		numberStepFactories: {
			/**
			 * Creates numberStep handler, which appends string to floored animated number on each step.
			 *
			 * @example
			 * // will animate to 100 with "1 %", "2 %", "3 %", ...
			 * $('#someid').animateNumber({
			 *   number: 100,
			 *   numberStep: $.animateNumber.numberStepFactories.append(' %')
			 * });
			 *
			 * @params {String} suffix string to append to animated number
			 * @returns {Function} numberStep-compatible function for use in animateNumber's parameters
			 */
			append: function (suffix) {
				return function (now, tween) {
					var floored_number = Math.floor(now),
						target = $(tween.elem);

					target.prop('number', now).text(floored_number + suffix);
				};
			},

			/**
			 * Creates numberStep handler, which format floored numbers by separating them to groups.
			 *
			 * @example
			 * // will animate with 1 ... 217,980 ... 95,217,980 ... 7,095,217,980
			 * $('#world-population').animateNumber({
			 *    number: 7095217980,
			 *    numberStep: $.animateNumber.numberStepFactories.separator(',')
			 * });
			 * @example
			 * // will animate with 1% ... 217,980% ... 95,217,980% ... 7,095,217,980%
			 * $('#salesIncrease').animateNumber({
			 *   number: 7095217980,
			 *   numberStep: $.animateNumber.numberStepFactories.separator(',', 3, '%')
			 * });
			 *
			 * @params {String} [separator=' '] string to separate number groups
			 * @params {String} [group_length=3] number group length
			 * @params {String} [suffix=''] suffix to append to number
			 * @returns {Function} numberStep-compatible function for use in animateNumber's parameters
			 */
			separator: function (separator, group_length, suffix) {
				separator = separator || ' ';
				group_length = group_length || 3;
				suffix = suffix || '';

				return function (now, tween) {
					var floored_number = Math.floor(now),
						separated_number = floored_number.toString(),
						target = $(tween.elem);

					if (separated_number.length > group_length) {
						var number_parts = extract_number_parts(separated_number, group_length);

						separated_number = remove_precending_zeros(number_parts).join(separator);
						separated_number = reverse(separated_number);
					}

					target.prop('number', now).text(separated_number + suffix);
				};
			}
		}
	};

	$.fn.animateNumber = function () {
		var options = arguments[0],
			settings = $.extend({}, defaults, options),

			target = $(this),
			args = [settings];

		for (var i = 1, l = arguments.length; i < l; i++) {
			args.push(arguments[i]);
		}

		// needs of custom step function usage
		if (options.numberStep) {
			// assigns custom step functions
			var items = this.each(function () {
				this._animateNumberSetter = options.numberStep;
			});

			// cleanup of custom step functions after animation
			var generic_complete = settings.complete;
			settings.complete = function () {
				items.each(function () {
					delete this._animateNumberSetter;
				});

				if (generic_complete) {
					generic_complete.apply(this, arguments);
				}
			};
		}

		return target.animate.apply(target, args);
	};

}(jQuery));
/*
 * jQuery EasyTabs plugin 3.2.0
 *
 * Copyright (c) 2010-2011 Steve Schwartz (JangoSteve)
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: Thu May 09 17:30:00 2013 -0500
 */
(function ($) {

	$.easytabs = function (container, options) {

		// Attach to plugin anything that should be available via
		// the $container.data('easytabs') object
		var plugin = this,
			$container = $(container),

			defaults = {
				animate: true,
				panelActiveClass: "active",
				tabActiveClass: "active",
				defaultTab: "li:first-child",
				animationSpeed: "normal",
				tabs: "> ul > li",
				updateHash: true,
				cycle: false,
				collapsible: false,
				collapsedClass: "collapsed",
				collapsedByDefault: true,
				uiTabs: false,
				transitionIn: 'fadeIn',
				transitionOut: 'fadeOut',
				transitionInEasing: 'swing',
				transitionOutEasing: 'swing',
				transitionCollapse: 'slideUp',
				transitionUncollapse: 'slideDown',
				transitionCollapseEasing: 'swing',
				transitionUncollapseEasing: 'swing',
				containerClass: "",
				tabsClass: "",
				tabClass: "",
				panelClass: "",
				cache: true,
				event: 'click',
				panelContext: $container
			},

			// Internal instance variables
			// (not available via easytabs object)
			$defaultTab,
			$defaultTabLink,
			transitions,
			lastHash,
			skipUpdateToHash,
			animationSpeeds = {
				fast: 200,
				normal: 400,
				slow: 600
			},

			// Shorthand variable so that we don't need to call
			// plugin.settings throughout the plugin code
			settings;

		// =============================================================
		// Functions available via easytabs object
		// =============================================================

		plugin.init = function () {

			plugin.settings = settings = $.extend({}, defaults, options);
			settings.bind_str = settings.event + ".easytabs";

			// Add jQuery UI's crazy class names to markup,
			// so that markup will match theme CSS
			if (settings.uiTabs) {
				settings.tabActiveClass = 'ui-tabs-selected';
				settings.containerClass = 'ui-tabs ui-widget ui-widget-content ui-corner-all';
				settings.tabsClass = 'ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all';
				settings.tabClass = 'ui-state-default ui-corner-top';
				settings.panelClass = 'ui-tabs-panel ui-widget-content ui-corner-bottom';
			}

			// If collapsible is true and defaultTab specified, assume user wants defaultTab showing (not collapsed)
			if (settings.collapsible && options.defaultTab !== undefined && options.collpasedByDefault === undefined) {
				settings.collapsedByDefault = false;
			}

			// Convert 'normal', 'fast', and 'slow' animation speed settings to their respective speed in milliseconds
			if (typeof (settings.animationSpeed) === 'string') {
				settings.animationSpeed = animationSpeeds[settings.animationSpeed];
			}

			$('a.anchor').remove().prependTo('body');

			// Store easytabs object on container so we can easily set
			// properties throughout
			$container.data('easytabs', {});

			plugin.setTransitions();

			plugin.getTabs();

			addClasses();

			setDefaultTab();

			bindToTabClicks();

			initHashChange();

			initCycle();

			// Append data-easytabs HTML attribute to make easy to query for
			// easytabs instances via CSS pseudo-selector
			$container.attr('data-easytabs', true);
		};

		// Set transitions for switching between tabs based on options.
		// Could be used to update transitions if settings are changes.
		plugin.setTransitions = function () {
			transitions = (settings.animate) ? {
				show: settings.transitionIn,
				hide: settings.transitionOut,
				speed: settings.animationSpeed,
				collapse: settings.transitionCollapse,
				uncollapse: settings.transitionUncollapse,
				halfSpeed: settings.animationSpeed / 2
			} : {
				show: "show",
				hide: "hide",
				speed: 0,
				collapse: "hide",
				uncollapse: "show",
				halfSpeed: 0
			};
		};

		// Find and instantiate tabs and panels.
		// Could be used to reset tab and panel collection if markup is
		// modified.
		plugin.getTabs = function () {
			var $matchingPanel;

			// Find the initial set of elements matching the setting.tabs
			// CSS selector within the container
			plugin.tabs = $container.find(settings.tabs),

				// Instantiate panels as empty jquery object
				plugin.panels = $(),

				plugin.tabs.each(function () {
					var $tab = $(this),
						$a = $tab.children('a'),

						// targetId is the ID of the panel, which is either the
						// `href` attribute for non-ajax tabs, or in the
						// `data-target` attribute for ajax tabs since the `href` is
						// the ajax URL
						targetId = $tab.children('a').data('target');

					$tab.data('easytabs', {});

					// If the tab has a `data-target` attribute, and is thus an ajax tab
					if (targetId !== undefined && targetId !== null) {
						$tab.data('easytabs').ajax = $a.attr('href');
					} else {
						targetId = $a.attr('href');
					}
					targetId = targetId.match(/#([^\?]+)/)[1];

					$matchingPanel = settings.panelContext.find("#" + targetId);

					// If tab has a matching panel, add it to panels
					if ($matchingPanel.length) {

						// Store panel height before hiding
						$matchingPanel.data('easytabs', {
							position: $matchingPanel.css('position'),
							visibility: $matchingPanel.css('visibility')
						});

						// Don't hide panel if it's active (allows `getTabs` to be called manually to re-instantiate tab collection)
						$matchingPanel.not(settings.panelActiveClass).hide();

						plugin.panels = plugin.panels.add($matchingPanel);

						$tab.data('easytabs').panel = $matchingPanel;

						// Otherwise, remove tab from tabs collection
					} else {
						plugin.tabs = plugin.tabs.not($tab);
						if ('console' in window) {
							console.warn('Warning: tab without matching panel for selector \'#' + targetId + '\' removed from set');
						}
					}
				});
		};

		// Select tab and fire callback
		plugin.selectTab = function ($clicked, callback) {
			var url = window.location,
				hash = url.hash.match(/^[^\?]*/)[0],
				$targetPanel = $clicked.parent().data('easytabs').panel,
				ajaxUrl = $clicked.parent().data('easytabs').ajax;

			// Tab is collapsible and active => toggle collapsed state
			if (settings.collapsible && !skipUpdateToHash && ($clicked.hasClass(settings.tabActiveClass) || $clicked.hasClass(settings.collapsedClass))) {
				plugin.toggleTabCollapse($clicked, $targetPanel, ajaxUrl, callback);

				// Tab is not active and panel is not active => select tab
			} else if (!$clicked.hasClass(settings.tabActiveClass) || !$targetPanel.hasClass(settings.panelActiveClass)) {
				activateTab($clicked, $targetPanel, ajaxUrl, callback);

				// Cache is disabled => reload (e.g reload an ajax tab).
			} else if (!settings.cache) {
				activateTab($clicked, $targetPanel, ajaxUrl, callback);
			}

		};

		// Toggle tab collapsed state and fire callback
		plugin.toggleTabCollapse = function ($clicked, $targetPanel, ajaxUrl, callback) {
			plugin.panels.stop(true, true);

			if (fire($container, "easytabs:before", [$clicked, $targetPanel, settings])) {
				plugin.tabs.filter("." + settings.tabActiveClass).removeClass(settings.tabActiveClass).children().removeClass(settings.tabActiveClass);

				// If panel is collapsed, uncollapse it
				if ($clicked.hasClass(settings.collapsedClass)) {

					// If ajax panel and not already cached
					if (ajaxUrl && (!settings.cache || !$clicked.parent().data('easytabs').cached)) {
						$container.trigger('easytabs:ajax:beforeSend', [$clicked, $targetPanel]);

						$targetPanel.load(ajaxUrl, function (response, status, xhr) {
							$clicked.parent().data('easytabs').cached = true;
							$container.trigger('easytabs:ajax:complete', [$clicked, $targetPanel, response, status, xhr]);
						});
					}

					// Update CSS classes of tab and panel
					$clicked.parent()
						.removeClass(settings.collapsedClass)
						.addClass(settings.tabActiveClass)
						.children()
						.removeClass(settings.collapsedClass)
						.addClass(settings.tabActiveClass);

					$targetPanel
						.addClass(settings.panelActiveClass)[transitions.uncollapse](transitions.speed, settings.transitionUncollapseEasing, function () {
							$container.trigger('easytabs:midTransition', [$clicked, $targetPanel, settings]);
							if (typeof callback == 'function') callback();
						});

					// Otherwise, collapse it
				} else {

					// Update CSS classes of tab and panel
					$clicked.addClass(settings.collapsedClass)
						.parent()
						.addClass(settings.collapsedClass);

					$targetPanel
						.removeClass(settings.panelActiveClass)[transitions.collapse](transitions.speed, settings.transitionCollapseEasing, function () {
							$container.trigger("easytabs:midTransition", [$clicked, $targetPanel, settings]);
							if (typeof callback == 'function') callback();
						});
				}
			}
		};


		// Find tab with target panel matching value
		plugin.matchTab = function (hash) {
			return plugin.tabs.find("[href='" + hash + "'],[data-target='" + hash + "']").first();
		};

		// Find panel with `id` matching value
		plugin.matchInPanel = function (hash) {
			return (hash && plugin.validId(hash) ? plugin.panels.filter(':has(' + hash + ')').first() : []);
		};

		// Make sure hash is a valid id value (admittedly strict in that HTML5 allows almost anything without a space)
		// but jQuery has issues with such id values anyway, so we can afford to be strict here.
		plugin.validId = function (id) {
			return id.substr(1).match(/^[A-Za-z][A-Za-z0-9\-_:\.]*$/);
		};

		// Select matching tab when URL hash changes
		plugin.selectTabFromHashChange = function () {
			var hash = window.location.hash.match(/^[^\?]*/)[0],
				$tab = plugin.matchTab(hash),
				$panel;

			if (settings.updateHash) {

				// If hash directly matches tab
				if ($tab.length) {
					skipUpdateToHash = true;
					plugin.selectTab($tab);

				} else {
					$panel = plugin.matchInPanel(hash);

					// If panel contains element matching hash
					if ($panel.length) {
						hash = '#' + $panel.attr('id');
						$tab = plugin.matchTab(hash);
						skipUpdateToHash = true;
						plugin.selectTab($tab);

						// If default tab is not active...
					} else if (!$defaultTab.hasClass(settings.tabActiveClass) && !settings.cycle) {

						// ...and hash is blank or matches a parent of the tab container or
						// if the last tab (before the hash updated) was one of the other tabs in this container.
						if (hash === '' || plugin.matchTab(lastHash).length || $container.closest(hash).length) {
							skipUpdateToHash = true;
							plugin.selectTab($defaultTabLink);
						}
					}
				}
			}
		};

		// Cycle through tabs
		plugin.cycleTabs = function (tabNumber) {
			if (settings.cycle) {
				tabNumber = tabNumber % plugin.tabs.length;
				$tab = $(plugin.tabs[tabNumber]).children("a").first();
				skipUpdateToHash = true;
				plugin.selectTab($tab, function () {
					setTimeout(function () {
						plugin.cycleTabs(tabNumber + 1);
					}, settings.cycle);
				});
			}
		};

		// Convenient public methods
		plugin.publicMethods = {
			select: function (tabSelector) {
				var $tab;

				// Find tab container that matches selector (like 'li#tab-one' which contains tab link)
				if (($tab = plugin.tabs.filter(tabSelector)).length === 0) {

					// Find direct tab link that matches href (like 'a[href="#panel-1"]')
					if (($tab = plugin.tabs.find("a[href='" + tabSelector + "']")).length === 0) {

						// Find direct tab link that matches selector (like 'a#tab-1')
						if (($tab = plugin.tabs.find("a" + tabSelector)).length === 0) {

							// Find direct tab link that matches data-target (lik 'a[data-target="#panel-1"]')
							if (($tab = plugin.tabs.find("[data-target='" + tabSelector + "']")).length === 0) {

								// Find direct tab link that ends in the matching href (like 'a[href$="#panel-1"]', which would also match http://example.com/currentpage/#panel-1)
								if (($tab = plugin.tabs.find("a[href$='" + tabSelector + "']")).length === 0) {

									$.error('Tab \'' + tabSelector + '\' does not exist in tab set');
								}
							}
						}
					}
				} else {
					// Select the child tab link, since the first option finds the tab container (like <li>)
					$tab = $tab.children("a").first();
				}
				plugin.selectTab($tab);
			}
		};

		// =============================================================
		// Private functions
		// =============================================================

		// Triggers an event on an element and returns the event result
		var fire = function (obj, name, data) {
			var event = $.Event(name);
			obj.trigger(event, data);
			return event.result !== false;
		}

		// Add CSS classes to markup (if specified), called by init
		var addClasses = function () {
			$container.addClass(settings.containerClass);
			plugin.tabs.parent().addClass(settings.tabsClass);
			plugin.tabs.addClass(settings.tabClass);
			plugin.panels.addClass(settings.panelClass);
		};

		// Set the default tab, whether from hash (bookmarked) or option,
		// called by init
		var setDefaultTab = function () {
			var hash = window.location.hash.match(/^[^\?]*/)[0],
				$selectedTab = plugin.matchTab(hash).parent(),
				$panel;

			// If hash directly matches one of the tabs, active on page-load
			if ($selectedTab.length === 1) {
				$defaultTab = $selectedTab;
				settings.cycle = false;

			} else {
				$panel = plugin.matchInPanel(hash);

				// If one of the panels contains the element matching the hash,
				// make it active on page-load
				if ($panel.length) {
					hash = '#' + $panel.attr('id');
					$defaultTab = plugin.matchTab(hash).parent();

					// Otherwise, make the default tab the one that's active on page-load
				} else {
					$defaultTab = plugin.tabs.parent().find(settings.defaultTab);
					if ($defaultTab.length === 0) {
						$.error("The specified default tab ('" + settings.defaultTab + "') could not be found in the tab set ('" + settings.tabs + "') out of " + plugin.tabs.length + " tabs.");
					}
				}
			}

			$defaultTabLink = $defaultTab.children("a").first();

			activateDefaultTab($selectedTab);
		};

		// Activate defaultTab (or collapse by default), called by setDefaultTab
		var activateDefaultTab = function ($selectedTab) {
			var defaultPanel,
				defaultAjaxUrl;

			if (settings.collapsible && $selectedTab.length === 0 && settings.collapsedByDefault) {
				$defaultTab
					.addClass(settings.collapsedClass)
					.children()
					.addClass(settings.collapsedClass);

			} else {

				defaultPanel = $($defaultTab.data('easytabs').panel);
				defaultAjaxUrl = $defaultTab.data('easytabs').ajax;

				if (defaultAjaxUrl && (!settings.cache || !$defaultTab.data('easytabs').cached)) {
					$container.trigger('easytabs:ajax:beforeSend', [$defaultTabLink, defaultPanel]);
					defaultPanel.load(defaultAjaxUrl, function (response, status, xhr) {
						$defaultTab.data('easytabs').cached = true;
						$container.trigger('easytabs:ajax:complete', [$defaultTabLink, defaultPanel, response, status, xhr]);
					});
				}

				$defaultTab.data('easytabs').panel
					.show()
					.addClass(settings.panelActiveClass);

				$defaultTab
					.addClass(settings.tabActiveClass)
					.children()
					.addClass(settings.tabActiveClass);
			}

			// Fire event when the plugin is initialised
			$container.trigger("easytabs:initialised", [$defaultTabLink, defaultPanel]);
		};

		// Bind tab-select funtionality to namespaced click event, called by
		// init
		var bindToTabClicks = function () {
			plugin.tabs.children("a").bind(settings.bind_str, function (e) {

				// Stop cycling when a tab is clicked
				settings.cycle = false;

				// Hash will be updated when tab is clicked,
				// don't cause tab to re-select when hash-change event is fired
				skipUpdateToHash = false;

				// Select the panel for the clicked tab
				plugin.selectTab($(this));

				// Don't follow the link to the anchor
				e.preventDefault ? e.preventDefault() : e.returnValue = false;
			});
		};

		// Activate a given tab/panel, called from plugin.selectTab:
		//
		//   * fire `easytabs:before` hook
		//   * get ajax if new tab is an uncached ajax tab
		//   * animate out previously-active panel
		//   * fire `easytabs:midTransition` hook
		//   * update URL hash
		//   * animate in newly-active panel
		//   * update CSS classes for inactive and active tabs/panels
		//
		// TODO: This could probably be broken out into many more modular
		// functions
		var activateTab = function ($clicked, $targetPanel, ajaxUrl, callback) {
			plugin.panels.stop(true, true);

			if (fire($container, "easytabs:before", [$clicked, $targetPanel, settings])) {
				var $visiblePanel = plugin.panels.filter(":visible"),
					$panelContainer = $targetPanel.parent(),
					targetHeight,
					visibleHeight,
					heightDifference,
					showPanel,
					hash = window.location.hash.match(/^[^\?]*/)[0];

				if (settings.animate) {
					targetHeight = getHeightForHidden($targetPanel);
					visibleHeight = $visiblePanel.length ? setAndReturnHeight($visiblePanel) : 0;
					heightDifference = targetHeight - visibleHeight;
				}

				// Set lastHash to help indicate if defaultTab should be
				// activated across multiple tab instances.
				lastHash = hash;

				// TODO: Move this function elsewhere
				showPanel = function () {
					// At this point, the previous panel is hidden, and the new one will be selected
					$container.trigger("easytabs:midTransition", [$clicked, $targetPanel, settings]);

					// Gracefully animate between panels of differing heights, start height change animation *after* panel change if panel needs to contract,
					// so that there is no chance of making the visible panel overflowing the height of the target panel
					if (settings.animate && settings.transitionIn == 'fadeIn') {
						if (heightDifference < 0)
							$panelContainer.animate({
								height: $panelContainer.height() + heightDifference
							}, transitions.halfSpeed).css({
								'min-height': ''
							});
					}

					if (settings.updateHash && !skipUpdateToHash) {
						//window.location = url.toString().replace((url.pathname + hash), (url.pathname + $clicked.attr("href")));
						// Not sure why this behaves so differently, but it's more straight forward and seems to have less side-effects
						if (window.history.pushState) {
							window.history.pushState(null, null, '#' + $targetPanel.attr('id'));
						} else {
							window.location.hash = '#' + $targetPanel.attr('id');
						}
					} else {
						skipUpdateToHash = false;
					}

					$targetPanel
					[transitions.show](transitions.speed, settings.transitionInEasing, function () {
						$panelContainer.css({
							height: '',
							'min-height': ''
						}); // After the transition, unset the height
						$container.trigger("easytabs:after", [$clicked, $targetPanel, settings]);
						// callback only gets called if selectTab actually does something, since it's inside the if block
						if (typeof callback == 'function') {
							callback();
						}
					});
				};

				if (ajaxUrl && (!settings.cache || !$clicked.parent().data('easytabs').cached)) {
					$container.trigger('easytabs:ajax:beforeSend', [$clicked, $targetPanel]);
					$targetPanel.load(ajaxUrl, function (response, status, xhr) {
						$clicked.parent().data('easytabs').cached = true;
						$container.trigger('easytabs:ajax:complete', [$clicked, $targetPanel, response, status, xhr]);
					});
				}

				// Gracefully animate between panels of differing heights, start height change animation *before* panel change if panel needs to expand,
				// so that there is no chance of making the target panel overflowing the height of the visible panel
				if (settings.animate && settings.transitionOut == 'fadeOut') {
					if (heightDifference > 0) {
						$panelContainer.animate({
							height: ($panelContainer.height() + heightDifference)
						}, transitions.halfSpeed);
					} else {
						// Prevent height jumping before height transition is triggered at midTransition
						$panelContainer.css({
							'min-height': $panelContainer.height()
						});
					}
				}

				// Change the active tab *first* to provide immediate feedback when the user clicks
				plugin.tabs.filter("." + settings.tabActiveClass).removeClass(settings.tabActiveClass).children().removeClass(settings.tabActiveClass);
				plugin.tabs.filter("." + settings.collapsedClass).removeClass(settings.collapsedClass).children().removeClass(settings.collapsedClass);
				$clicked.parent().addClass(settings.tabActiveClass).children().addClass(settings.tabActiveClass);

				plugin.panels.filter("." + settings.panelActiveClass).removeClass(settings.panelActiveClass);
				$targetPanel.addClass(settings.panelActiveClass);

				if ($visiblePanel.length) {
					$visiblePanel
					[transitions.hide](transitions.speed, settings.transitionOutEasing, showPanel);
				} else {
					$targetPanel
					[transitions.uncollapse](transitions.speed, settings.transitionUncollapseEasing, showPanel);
				}
			}
		};

		// Get heights of panels to enable animation between panels of
		// differing heights, called by activateTab
		var getHeightForHidden = function ($targetPanel) {

			if ($targetPanel.data('easytabs') && $targetPanel.data('easytabs').lastHeight) {
				return $targetPanel.data('easytabs').lastHeight;
			}

			// this is the only property easytabs changes, so we need to grab its value on each tab change
			var display = $targetPanel.css('display'),
				outerCloak,
				height;

			// Workaround with wrapping height, because firefox returns wrong
			// height if element itself has absolute positioning.
			// but try/catch block needed for IE7 and IE8 because they throw
			// an "Unspecified error" when trying to create an element
			// with the css position set.
			try {
				outerCloak = $('<div></div>', {
					'position': 'absolute',
					'visibility': 'hidden',
					'overflow': 'hidden'
				});
			} catch (e) {
				outerCloak = $('<div></div>', {
					'visibility': 'hidden',
					'overflow': 'hidden'
				});
			}
			height = $targetPanel
				.wrap(outerCloak)
				.css({
					'position': 'relative',
					'visibility': 'hidden',
					'display': 'block'
				})
				.outerHeight();

			$targetPanel.unwrap();

			// Return element to previous state
			$targetPanel.css({
				position: $targetPanel.data('easytabs').position,
				visibility: $targetPanel.data('easytabs').visibility,
				display: display
			});

			// Cache height
			$targetPanel.data('easytabs').lastHeight = height;

			return height;
		};

		// Since the height of the visible panel may have been manipulated due to interaction,
		// we want to re-cache the visible height on each tab change, called
		// by activateTab
		var setAndReturnHeight = function ($visiblePanel) {
			var height = $visiblePanel.outerHeight();

			if ($visiblePanel.data('easytabs')) {
				$visiblePanel.data('easytabs').lastHeight = height;
			} else {
				$visiblePanel.data('easytabs', {
					lastHeight: height
				});
			}
			return height;
		};

		// Setup hash-change callback for forward- and back-button
		// functionality, called by init
		var initHashChange = function () {

			// enabling back-button with jquery.hashchange plugin
			// http://benalman.com/projects/jquery-hashchange-plugin/
			if (typeof $(window).hashchange === 'function') {
				$(window).hashchange(function () {
					plugin.selectTabFromHashChange();
				});
			} else if ($.address && typeof $.address.change === 'function') { // back-button with jquery.address plugin http://www.asual.com/jquery/address/docs/
				$.address.change(function () {
					plugin.selectTabFromHashChange();
				});
			}
		};

		// Begin cycling if set in options, called by init
		var initCycle = function () {
			var tabNumber;
			if (settings.cycle) {
				tabNumber = plugin.tabs.index($defaultTab);
				setTimeout(function () {
					plugin.cycleTabs(tabNumber + 1);
				}, settings.cycle);
			}
		};


		plugin.init();

	};

	$.fn.easytabs = function (options) {
		var args = arguments;

		return this.each(function () {
			var $this = $(this),
				plugin = $this.data('easytabs');

			// Initialization was called with $(el).easytabs( { options } );
			if (undefined === plugin) {
				plugin = new $.easytabs(this, options);
				$this.data('easytabs', plugin);
			}

			// User called public method
			if (plugin.publicMethods[options]) {
				return plugin.publicMethods[options](Array.prototype.slice.call(args, 1));
			}
		});
	};

})(jQuery);
/*jshint browser:true */
/*!
 * FitVids 1.1
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 */

;
(function ($) {

	'use strict';

	$.fn.fitVids = function (options) {
		var settings = {
			customSelector: null,
			ignore: null
		};

		if (!document.getElementById('fit-vids-style')) {
			// appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
			var head = document.head || document.getElementsByTagName('head')[0];
			var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
			var div = document.createElement("div");
			div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
			head.appendChild(div.childNodes[1]);
		}

		if (options) {
			$.extend(settings, options);
		}

		return this.each(function () {
			var selectors = [
				'iframe[src*="player.vimeo.com"]',
				'iframe[src*="youtube.com"]',
				'iframe[src*="youtube-nocookie.com"]',
				'iframe[src*="kickstarter.com"][src*="video.html"]',
				'object',
				'embed'
			];

			if (settings.customSelector) {
				selectors.push(settings.customSelector);
			}

			var ignoreList = '.fitvidsignore';

			if (settings.ignore) {
				ignoreList = ignoreList + ', ' + settings.ignore;
			}

			var $allVideos = $(this).find(selectors.join(','));
			$allVideos = $allVideos.not('object object'); // SwfObj conflict patch
			$allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

			$allVideos.each(function () {
				var $this = $(this);
				if ($this.parents(ignoreList).length > 0) {
					return; // Disable FitVids on this video.
				}
				if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) {
					return;
				}
				if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width')))) {
					$this.attr('height', 9);
					$this.attr('width', 16);
				}
				var height = (this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10)))) ? parseInt($this.attr('height'), 10) : $this.height(),
					width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
					aspectRatio = height / width;
				if (!$this.attr('name')) {
					var videoName = 'fitvid' + $.fn.fitVids._count;
					$this.attr('name', videoName);
					$.fn.fitVids._count++;
				}
				$this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100) + '%');
				$this.removeAttr('height').removeAttr('width');
			});
		});
	};

	// Internal counter for unique video names.
	$.fn.fitVids._count = 0;

	// Works with either jQuery or Zepto
})(window.jQuery || window.Zepto);
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module unless amdModuleId is set
		define(["jquery"], function (a0) {
			return (factory(a0));
		});
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory(require("jquery"));
	} else {
		factory(jQuery);
	}
}(this, function (jQuery) {

	/** File generated by Grunt -- do not modify
	 *  JQUERY-FORM-VALIDATOR
	 *
	 *  @version 2.2.201
	 *  @website http://formvalidator.net/
	 *  @author Victor Jonsson, http://victorjonsson.se
	 *  @license MIT
	 */
	/**
	 * Deprecated functions and attributes
	 * @todo: Remove in release of 3.0
	 */
	(function ($, undefined) {

		'use strict';

		/**
		 * @deprecated
		 * @param language
		 * @param conf
		 */
		$.fn.validateForm = function (language, conf) {
			$.formUtils.warn('Use of deprecated function $.validateForm, use $.isValid instead');
			return this.isValid(language, conf, true);
		};

		$(window).on('validatorsLoaded formValidationSetup', function (evt, $form, config) {
			if (!$form) {
				$form = $('form');
			}

			addSupportForCustomErrorMessageCallback(config);
			addSupportForElementReferenceInPositionParam(config);
			addSupportForValidationDependingOnCheckedInput($form);
		});


		function addSupportForCustomErrorMessageCallback(config) {
			if (config &&
				config.errorMessagePosition === 'custom' &&
				typeof config.errorMessageCustom === 'function') {

				$.formUtils.warn('Use of deprecated function errorMessageCustom, use config.submitErrorMessageCallback instead');

				config.submitErrorMessageCallback = function ($form, errorMessages) {
					config.errorMessageCustom(
						$form,
						config.language.errorTitle,
						errorMessages,
						config
					);
				};
			}
		}

		function addSupportForElementReferenceInPositionParam(config) {
			if (config.errorMessagePosition && typeof config.errorMessagePosition === 'object') {
				$.formUtils.warn('Deprecated use of config parameter errorMessagePosition, use config.submitErrorMessageCallback instead');
				var $errorMessageContainer = config.errorMessagePosition;
				config.errorMessagePosition = 'top';
				config.submitErrorMessageCallback = function () {
					return $errorMessageContainer;
				};
			}
		}

		function addSupportForValidationDependingOnCheckedInput($form) {
			var $inputsDependingOnCheckedInputs = $form.find('[data-validation-if-checked]');
			if ($inputsDependingOnCheckedInputs.length) {
				$.formUtils.warn(
					'Detected use of attribute "data-validation-if-checked" which is ' +
					'deprecated. Use "data-validation-depends-on" provided by module "logic"'
				);
			}

			$inputsDependingOnCheckedInputs
				.on('beforeValidation', function () {

					var $elem = $(this),
						nameOfDependingInput = $elem.valAttr('if-checked');

					// Set the boolean telling us that the validation depends
					// on another input being checked
					var $dependingInput = $('input[name="' + nameOfDependingInput + '"]', $form),
						dependingInputIsChecked = $dependingInput.is(':checked'),
						valueOfDependingInput = ($.formUtils.getValue($dependingInput) || '').toString(),
						requiredValueOfDependingInput = $elem.valAttr('if-checked-value');

					if (!dependingInputIsChecked || !(!requiredValueOfDependingInput ||
						requiredValueOfDependingInput === valueOfDependingInput
					)) {
						$elem.valAttr('skipped', true);
					}

				});
		}

	})(jQuery);

	/**
	 * Utility methods used for displaying error messages (attached to $.formUtils)
	 */
	(function ($) {

		'use strict';

		var dialogs = {

			resolveErrorMessage: function ($elem, validator, validatorName, conf, language) {
				var errorMsgAttr = conf.validationErrorMsgAttribute + '-' + validatorName.replace('validate_', ''),
					validationErrorMsg = $elem.attr(errorMsgAttr);

				if (!validationErrorMsg) {
					validationErrorMsg = $elem.attr(conf.validationErrorMsgAttribute);
					if (!validationErrorMsg) {
						if (typeof validator.errorMessageKey !== 'function') {
							validationErrorMsg = language[validator.errorMessageKey];
						} else {
							validationErrorMsg = language[validator.errorMessageKey(conf)];
						}
						if (!validationErrorMsg) {
							validationErrorMsg = validator.errorMessage;
						}
					}
				}
				return validationErrorMsg;
			},
			getParentContainer: function ($elem) {
				if ($elem.valAttr('error-msg-container')) {
					return $($elem.valAttr('error-msg-container'));
				} else {
					var $parent = $elem.parent();
					if (!$parent.hasClass('form-group') && !$parent.closest('form').hasClass('form-horizontal')) {
						var $formGroup = $parent.closest('.form-group');
						if ($formGroup.length) {
							return $formGroup.eq(0);
						}
					}
					return $parent;
				}
			},
			applyInputErrorStyling: function ($input, conf) {
				$input
					.addClass(conf.errorElementClass)
					.removeClass('valid');

				this.getParentContainer($input)
					.addClass(conf.inputParentClassOnError)
					.removeClass(conf.inputParentClassOnSuccess);

				if (conf.borderColorOnError !== '') {
					$input.css('border-color', conf.borderColorOnError);
				}
			},
			applyInputSuccessStyling: function ($input, conf) {
				$input.addClass('valid');
				this.getParentContainer($input)
					.addClass(conf.inputParentClassOnSuccess);
			},
			removeInputStylingAndMessage: function ($input, conf) {

				// Reset input css
				$input
					.removeClass('valid')
					.removeClass(conf.errorElementClass)
					.css('border-color', '');

				var $parentContainer = dialogs.getParentContainer($input);

				// Reset parent css
				$parentContainer
					.removeClass(conf.inputParentClassOnError)
					.removeClass(conf.inputParentClassOnSuccess);

				// Remove possible error message
				if (typeof conf.inlineErrorMessageCallback === 'function') {
					var $errorMessage = conf.inlineErrorMessageCallback($input, conf);
					if ($errorMessage) {
						$errorMessage.html('');
					}
				} else {
					$parentContainer
						.find('.' + conf.errorMessageClass)
						.remove();
				}

			},
			removeAllMessagesAndStyling: function ($form, conf) {

				// Remove error messages in top of form
				if (typeof conf.submitErrorMessageCallback === 'function') {
					var $errorMessagesInTopOfForm = conf.submitErrorMessageCallback($form, conf);
					if ($errorMessagesInTopOfForm) {
						$errorMessagesInTopOfForm.html('');
					}
				} else {
					$form.find('.' + conf.errorMessageClass + '.alert').remove();
				}

				// Remove input css/messages
				$form.find('.' + conf.errorElementClass + ',.valid').each(function () {
					dialogs.removeInputStylingAndMessage($(this), conf);
				});
			},
			setInlineMessage: function ($input, errorMsg, conf) {

				this.applyInputErrorStyling($input, conf);

				var custom = document.getElementById($input.attr('name') + '_err_msg'),
					$messageContainer = false,
					setErrorMessage = function ($elem) {
						$.formUtils.$win.trigger('validationErrorDisplay', [$input, $elem]);
						$elem.html(errorMsg);
					},
					addErrorToMessageContainer = function () {
						var $found = false;
						$messageContainer.find('.' + conf.errorMessageClass).each(function () {
							if (this.inputReferer === $input[0]) {
								$found = $(this);
								return false;
							}
						});
						console.log($found);
						if ($found) {
							if (!errorMsg) {
								$found.remove();
							} else {
								setErrorMessage($found);
							}
						} else if (errorMsg !== '') {
							$message = $('<div class="' + conf.errorMessageClass + ' alert"></div>');
							setErrorMessage($message);
							$message[0].inputReferer = $input[0];
							$messageContainer.prepend($message);
						}
					},
					$message;

				if (custom) {
					// Todo: remove in 3.0
					$.formUtils.warn('Using deprecated element reference ' + custom.id);
					$messageContainer = $(custom);
					addErrorToMessageContainer();
				} else if (typeof conf.inlineErrorMessageCallback === 'function') {
					$messageContainer = conf.inlineErrorMessageCallback($input, conf);
					if (!$messageContainer) {
						// Error display taken care of by inlineErrorMessageCallback
						return;
					}
					addErrorToMessageContainer();
				} else {
					var $parent = this.getParentContainer($input);
					$message = $parent.find('.' + conf.errorMessageClass + '.help-block');
					if ($message.length === 0) {
						$message = $('<span></span>').addClass('help-block').addClass(conf.errorMessageClass);
						$message.appendTo($parent);
					}
					setErrorMessage($message);
				}
			},
			setMessageInTopOfForm: function ($form, errorMessages, conf, lang) {
				var view = '<div class="{errorMessageClass} alert alert-danger">' +
					'<strong>{errorTitle}</strong>' +
					'<ul>{fields}</ul>' +
					'</div>',
					$container = false;

				if (typeof conf.submitErrorMessageCallback === 'function') {
					$container = conf.submitErrorMessageCallback($form, errorMessages, conf);
					console.log($container);
					if (!$container) {
						// message display taken care of by callback
						return;
					}
				}

				var viewParams = {
					errorTitle: lang.errorTitle,
					fields: '',
					errorMessageClass: conf.errorMessageClass
				};

				$.each(errorMessages, function (i, msg) {
					viewParams.fields += '<li>' + msg + '</li>';
				});

				$.each(viewParams, function (param, value) {
					view = view.replace('{' + param + '}', value);
				});

				if ($container) {
					$container.html(view);
				} else {
					$form.children().eq(0).before($(view));
				}
			}
		};

		$.formUtils = $.extend($.formUtils || {}, {
			dialogs: dialogs
		});

	})(jQuery);

	/**
	 * File declaring all methods if this plugin which is applied to $.fn.
	 */
	(function ($, window) {

		'use strict';

		var _helpers = 0;


		/**
		 * Assigns validateInputOnBlur function to elements blur event
		 *
		 * @param {Object} language Optional, will override $.formUtils.LANG
		 * @param {Object} conf Optional, will override the default settings
		 * @return {jQuery}
		 */
		$.fn.validateOnBlur = function (language, conf) {
			this.find('*[data-validation]')
				.bind('blur.validation', function () {
					$(this).validateInputOnBlur(language, conf, true, 'blur');
				});
			if (conf.validateCheckboxRadioOnClick) {
				// bind click event to validate on click for radio & checkboxes for nice UX
				this.find('input[type=checkbox][data-validation],input[type=radio][data-validation]')
					.bind('click.validation', function () {
						$(this).validateInputOnBlur(language, conf, true, 'click');
					});
			}

			return this;
		};

		/*
		 * Assigns validateInputOnBlur function to elements custom event
		 * @param {Object} language Optional, will override $.formUtils.LANG
		 * @param {Object} settings Optional, will override the default settings
		 * * @return {jQuery}
		 */
		$.fn.validateOnEvent = function (language, config) {
			var $elements = this[0].nodeName === 'FORM' ? this.find('*[data-validation-event]') : this;
			$elements
				.each(function () {
					var $el = $(this),
						etype = $el.valAttr('event');
					if (etype) {
						$el
							.unbind(etype + '.validation')
							.bind(etype + '.validation', function (evt) {
								if ((evt || {}).keyCode !== 9) {
									$(this).validateInputOnBlur(language, config, true, etype);
								}
							});
					}
				});
			return this;
		};

		/**
		 * fade in help message when input gains focus
		 * fade out when input loses focus
		 * <input data-help="The info that I want to display for the user when input is focused" ... />
		 *
		 * @param {String} attrName - Optional, default is data-help
		 * @return {jQuery}
		 */
		$.fn.showHelpOnFocus = function (attrName) {
			if (!attrName) {
				attrName = 'data-validation-help';
			}

			// Remove previously added event listeners
			this.find('.has-help-txt')
				.valAttr('has-keyup-event', false)
				.removeClass('has-help-txt');

			// Add help text listeners
			this.find('textarea,input').each(function () {
				var $elem = $(this),
					className = 'jquery_form_help_' + (++_helpers),
					help = $elem.attr(attrName);

				if (help) {
					$elem
						.addClass('has-help-txt')
						.unbind('focus.help')
						.bind('focus.help', function () {
							var $help = $elem.parent().find('.' + className);
							if ($help.length === 0) {
								$help = $('<span />')
									.addClass(className)
									.addClass('help')
									.addClass('help-block') // twitter bs
									.text(help)
									.hide();

								$elem.after($help);
							}
							$help.fadeIn();
						})
						.unbind('blur.help')
						.bind('blur.help', function () {
							$(this)
								.parent()
								.find('.' + className)
								.fadeOut('slow');
						});
				}
			});

			return this;
		};

		/**
		 * @param {Function} cb
		 * @param {Object} [conf]
		 * @param {Object} [lang]
		 */
		$.fn.validate = function (cb, conf, lang) {
			var language = $.extend({}, $.formUtils.LANG, lang || {});
			this.each(function () {
				var $elem = $(this),
					formDefaultConfig = $elem.closest('form').get(0).validationConfig || {};

				$elem.one('validation', function (evt, isValid) {
					if (typeof cb === 'function') {
						cb(isValid, this, evt);
					}
				});

				$elem.validateInputOnBlur(
					language,
					$.extend({}, formDefaultConfig, conf || {}),
					true
				);
			});
		};

		/**
		 * Tells whether or not validation of this input will have to postpone the form submit ()
		 * @returns {Boolean}
		 */
		$.fn.willPostponeValidation = function () {
			return (this.valAttr('suggestion-nr') ||
				this.valAttr('postpone') ||
				this.hasClass('hasDatepicker')) &&
				!window.postponedValidation;
		};

		/**
		 * Validate single input when it loses focus
		 * shows error message in a span element
		 * that is appended to the parent element
		 *
		 * @param {Object} [language] Optional, will override $.formUtils.LANG
		 * @param {Object} [conf] Optional, will override the default settings
		 * @param {Boolean} attachKeyupEvent Optional
		 * @param {String} eventType
		 * @return {jQuery}
		 */
		$.fn.validateInputOnBlur = function (language, conf, attachKeyupEvent, eventType) {

			$.formUtils.eventType = eventType;

			if (this.willPostponeValidation()) {
				// This validation has to be postponed
				var _self = this,
					postponeTime = this.valAttr('postpone') || 200;

				window.postponedValidation = function () {
					_self.validateInputOnBlur(language, conf, attachKeyupEvent, eventType);
					window.postponedValidation = false;
				};

				setTimeout(function () {
					if (window.postponedValidation) {
						window.postponedValidation();
					}
				}, postponeTime);

				return this;
			}

			language = $.extend({}, $.formUtils.LANG, language || {});
			$.formUtils.dialogs.removeInputStylingAndMessage(this, conf);

			var $elem = this,
				$form = $elem.closest('form'),
				result = $.formUtils.validateInput(
					$elem,
					language,
					conf,
					$form,
					eventType
				);

			if (attachKeyupEvent) {
				$elem.unbind('keyup.validation');
			}

			if (result.shouldChangeDisplay) {
				if (result.isValid) {
					$.formUtils.dialogs.applyInputSuccessStyling($elem, conf);
				} else {
					$.formUtils.dialogs.setInlineMessage($elem, result.errorMsg, conf);
				}
			}

			if (!result.isValid && attachKeyupEvent) {
				$elem.bind('keyup.validation', function (evt) {
					if (evt.keyCode !== 9) {
						$(this).validateInputOnBlur(language, conf, false, 'keyup');
					}
				});
			}

			return this;
		};

		/**
		 * Short hand for fetching/adding/removing element attributes
		 * prefixed with 'data-validation-'
		 *
		 * @param {String} name
		 * @param {String|Boolean} [val]
		 * @return {String|undefined|jQuery}
		 * @protected
		 */
		$.fn.valAttr = function (name, val) {
			if (val === undefined) {
				return this.attr('data-validation-' + name);
			} else if (val === false || val === null) {
				return this.removeAttr('data-validation-' + name);
			} else {
				name = ((name.length > 0) ? '-' + name : '');
				return this.attr('data-validation' + name, val);
			}
		};

		/**
		 * Function that validates all inputs in active form
		 *
		 * @param {Object} [language]
		 * @param {Object} [conf]
		 * @param {Boolean} [displayError] Defaults to true
		 */
		$.fn.isValid = function (language, conf, displayError) {

			if ($.formUtils.isLoadingModules) {
				var $self = this;
				setTimeout(function () {
					$self.isValid(language, conf, displayError);
				}, 200);
				return null;
			}

			conf = $.extend({}, $.formUtils.defaultConfig(), conf || {});
			language = $.extend({}, $.formUtils.LANG, language || {});
			displayError = displayError !== false;

			if ($.formUtils.errorDisplayPreventedWhenHalted) {
				// isValid() was called programmatically with argument displayError set
				// to false when the validation was halted by any of the validators
				delete $.formUtils.errorDisplayPreventedWhenHalted;
				displayError = false;
			}

			$.formUtils.isValidatingEntireForm = true;
			$.formUtils.haltValidation = false;

			/**
			 * Adds message to error message stack if not already in the message stack
			 *
			 * @param {String} mess
			 * @para {jQuery} $elem
			 */
			var addErrorMessage = function (mess, $elem) {
				if ($.inArray(mess, errorMessages) < 0) {
					errorMessages.push(mess);
				}
				errorInputs.push($elem);
				$elem.attr('current-error', mess);
				if (displayError) {
					$.formUtils.dialogs.applyInputErrorStyling($elem, conf);
				}
			},

				/** Holds inputs (of type checkox or radio) already validated, to prevent recheck of mulitple checkboxes & radios */
				checkedInputs = [],

				/** Error messages for this validation */
				errorMessages = [],

				/** Input elements which value was not valid */
				errorInputs = [],

				/** Form instance */
				$form = this,

				/**
				 * Tells whether or not to validate element with this name and of this type
				 *
				 * @param {String} name
				 * @param {String} type
				 * @return {Boolean}
				 */
				ignoreInput = function (name, type) {
					if (type === 'submit' || type === 'button' || type === 'reset') {
						return true;
					}
					return $.inArray(name, conf.ignore || []) > -1;
				};

			// Reset style and remove error class
			if (displayError) {
				$.formUtils.dialogs.removeAllMessagesAndStyling($form, conf);
			}

			// Validate element values
			$form.find('input,textarea,select').filter(':not([type="submit"],[type="button"])').each(function () {
				var $elem = $(this),
					elementType = $elem.attr('type'),
					isCheckboxOrRadioBtn = elementType === 'radio' || elementType === 'checkbox',
					elementName = $elem.attr('name');

				if (!ignoreInput(elementName, elementType) && (!isCheckboxOrRadioBtn || $.inArray(elementName, checkedInputs) < 0)) {

					if (isCheckboxOrRadioBtn) {
						checkedInputs.push(elementName);
					}

					var result = $.formUtils.validateInput(
						$elem,
						language,
						conf,
						$form,
						'submit'
					);

					if (result.shouldChangeDisplay) {
						if (!result.isValid) {
							addErrorMessage(result.errorMsg, $elem);
						} else if (result.isValid) {
							$elem.valAttr('current-error', false);
							$.formUtils.dialogs.applyInputSuccessStyling($elem, conf);
						}
					}
				}

			});

			// Run validation callback
			if (typeof conf.onValidate === 'function') {
				var errors = conf.onValidate($form);
				if ($.isArray(errors)) {
					$.each(errors, function (i, err) {
						addErrorMessage(err.message, err.element);
					});
				} else if (errors && errors.element && errors.message) {
					addErrorMessage(errors.message, errors.element);
				}
			}

			// Reset form validation flag
			$.formUtils.isValidatingEntireForm = false;

			// Validation failed
			if (!$.formUtils.haltValidation && errorInputs.length > 0) {

				if (displayError) {

					if (conf.errorMessagePosition === 'top') {
						$.formUtils.dialogs.setMessageInTopOfForm($form, errorMessages, conf, language);
					} else {
						$.each(errorInputs, function (i, $input) {
							$.formUtils.dialogs.setInlineMessage($input, $input.attr('current-error'), conf);
						});
					}
					if (conf.scrollToTopOnError) {
						$.formUtils.$win.scrollTop($form.offset().top - 20);
					}

				}

				return false;
			}

			if (!displayError && $.formUtils.haltValidation) {
				$.formUtils.errorDisplayPreventedWhenHalted = true;
			}

			return !$.formUtils.haltValidation;
		};

		/**
		 * Plugin for displaying input length restriction
		 */
		$.fn.restrictLength = function (maxLengthElement) {
			new $.formUtils.lengthRestriction(this, maxLengthElement);
			return this;
		};

		/**
		 * Add suggestion dropdown to inputs having data-suggestions with a comma
		 * separated string with suggestions
		 * @param {Array} [settings]
		 * @returns {jQuery}
		 */
		$.fn.addSuggestions = function (settings) {
			var sugs = false;
			this.find('input').each(function () {
				var $field = $(this);

				sugs = $.split($field.attr('data-suggestions'));

				if (sugs.length > 0 && !$field.hasClass('has-suggestions')) {
					$.formUtils.suggest($field, sugs, settings);
					$field.addClass('has-suggestions');
				}
			});
			return this;
		};


	})(jQuery, window);

	/**
	 * Utility methods used for handling loading of modules (attached to $.formUtils)
	 */
	(function ($) {

		'use strict';

		$.formUtils = $.extend($.formUtils || {}, {

			/**
			 * @var {Boolean}
			 */
			isLoadingModules: false,

			/**
			 * @var {Object}
			 */
			loadedModules: {},

			/**
			 * @example
			 *  $.formUtils.loadModules('date, security.dev');
			 *
			 * Will load the scripts date.js and security.dev.js from the
			 * directory where this script resides. If you want to load
			 * the modules from another directory you can use the
			 * path argument.
			 *
			 * The script will be cached by the browser unless the module
			 * name ends with .dev
			 *
			 * @param {String} modules - Comma separated string with module file names (no directory nor file extension)
			 * @param {String} [path] - Optional, path where the module files is located if their not in the same directory as the core modules
			 * @param {function} [callback] - Optional, whether or not to fire event 'load' when modules finished loading
			 */
			loadModules: function (modules, path, callback) {

				if ($.formUtils.isLoadingModules) {
					setTimeout(function () {
						$.formUtils.loadModules(modules, path, callback);
					}, 10);
					return;
				}

				var hasLoadedAnyModule = false,
					loadModuleScripts = function (modules, path) {

						var moduleList = $.split(modules),
							numModules = moduleList.length,
							moduleLoadedCallback = function () {
								numModules--;
								if (numModules === 0) {
									$.formUtils.isLoadingModules = false;
									if (callback && hasLoadedAnyModule) {
										if (typeof callback === 'function') {
											callback();
										}
									}
								}
							};


						if (numModules > 0) {
							$.formUtils.isLoadingModules = true;
						}

						var cacheSuffix = '?_=' + (new Date().getTime()),
							appendToElement = document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0];

						$.each(moduleList, function (i, modName) {
							modName = $.trim(modName);
							if (modName.length === 0) {
								moduleLoadedCallback();
							} else {
								var scriptUrl = path + modName + (modName.slice(-3) === '.js' ? '' : '.js'),
									script = document.createElement('SCRIPT');

								if (scriptUrl in $.formUtils.loadedModules) {
									// already loaded
									moduleLoadedCallback();
								} else {

									// Remember that this script is loaded
									$.formUtils.loadedModules[scriptUrl] = 1;
									hasLoadedAnyModule = true;

									// Load the script
									script.type = 'text/javascript';
									script.onload = moduleLoadedCallback;
									script.src = scriptUrl + (scriptUrl.slice(-7) === '.dev.js' ? cacheSuffix : '');
									script.onerror = function () {
										$.formUtils.warn('Unable to load form validation module ' + scriptUrl);
									};
									script.onreadystatechange = function () {
										// IE 7 fix
										if (this.readyState === 'complete' || this.readyState === 'loaded') {
											moduleLoadedCallback();
											// Handle memory leak in IE
											this.onload = null;
											this.onreadystatechange = null;
										}
									};
									appendToElement.appendChild(script);
								}
							}
						});
					};

				if (path) {
					loadModuleScripts(modules, path);
				} else {
					var findScriptPathAndLoadModules = function () {
						var foundPath = false;
						$('script[src*="form-validator"]').each(function () {
							foundPath = this.src.substr(0, this.src.lastIndexOf('/')) + '/';
							if (foundPath === '/') {
								foundPath = '';
							}
							return false;
						});

						if (foundPath !== false) {
							loadModuleScripts(modules, foundPath);
							return true;
						}
						return false;
					};

					if (!findScriptPathAndLoadModules()) {
						$(findScriptPathAndLoadModules);
					}
				}
			}

		});

	})(jQuery);

	/**
	 * Setup function for the plugin
	 */
	(function ($) {

		'use strict';


		/**
		 * A bit smarter split function
		 * delimiter can be space, comma, dash or pipe
		 * @param {String} val
		 * @param {Function|String} [callback]
		 * @returns {Array|void}
		 */
		$.split = function (val, callback) {
			if (typeof callback !== 'function') {
				// return array
				if (!val) {
					return [];
				}
				var values = [];
				$.each(val.split(callback ? callback : /[,|\-\s]\s*/g),
					function (i, str) {
						str = $.trim(str);
						if (str.length) {
							values.push(str);
						}
					}
				);
				return values;
			} else if (val) {
				// exec callback func on each
				$.each(val.split(/[,|\-\s]\s*/g),
					function (i, str) {
						str = $.trim(str);
						if (str.length) {
							return callback(str, i);
						}
					}
				);
			}
		};

		/**
		 * Short hand function that makes the validation setup require less code
		 * @param conf
		 */
		$.validate = function (conf) {

			var defaultConf = $.extend($.formUtils.defaultConfig(), {
				form: 'form',
				validateOnEvent: false,
				validateOnBlur: true,
				validateCheckboxRadioOnClick: true,
				showHelpOnFocus: true,
				addSuggestions: true,
				modules: '',
				onModulesLoaded: null,
				language: false,
				onSuccess: false,
				onError: false,
				onElementValidate: false
			});

			conf = $.extend(defaultConf, conf || {});

			if (conf.lang && conf.lang !== 'en') {
				var langModule = 'lang/' + conf.lang + '.js';
				conf.modules += conf.modules.length ? ',' + langModule : langModule;
			}

			// Add validation to forms
			$(conf.form).each(function (i, form) {

				// Make a reference to the config for this form
				form.validationConfig = conf;

				// Trigger jQuery event that we're about to setup validation
				var $form = $(form);
				// $.formUtils.$win.trigger('formValidationSetup', [$form, conf]);
				$form.trigger('formValidationSetup', [$form, conf]);

				// Remove classes and event handlers that might have been
				// added by a previous call to $.validate
				$form.find('.has-help-txt')
					.unbind('focus.validation')
					.unbind('blur.validation');

				$form
					.removeClass('has-validation-callback')
					.unbind('submit.validation')
					.unbind('reset.validation')
					.find('input[data-validation],textarea[data-validation]')
					.unbind('blur.validation');

				// Validate when submitted
				$form.bind('submit.validation', function () {

					var $form = $(this);

					if ($.formUtils.haltValidation) {
						// pressing several times on submit button while validation is halted
						return false;
					}

					if ($.formUtils.isLoadingModules) {
						setTimeout(function () {
							$form.trigger('submit.validation');
						}, 200);
						return false;
					}

					var valid = $form.isValid(conf.language, conf);

					if ($.formUtils.haltValidation) {
						// Validation got halted by one of the validators
						return false;
					} else {
						if (valid && typeof conf.onSuccess === 'function') {
							var callbackResponse = conf.onSuccess($form);
							if (callbackResponse === false) {
								return false;
							}
						} else if (!valid && typeof conf.onError === 'function') {
							conf.onError($form);
							return false;
						} else {
							return valid;
						}
					}
				})
					.bind('reset.validation', function () {
						$.formUtils.dialogs.removeAllMessagesAndStyling($form, conf);
					})
					.addClass('has-validation-callback');

				if (conf.showHelpOnFocus) {
					$form.showHelpOnFocus();
				}
				if (conf.addSuggestions) {
					$form.addSuggestions();
				}
				if (conf.validateOnBlur) {
					$form.validateOnBlur(conf.language, conf);
					$form.bind('html5ValidationAttrsFound', function () {
						$form.validateOnBlur(conf.language, conf);
					});
				}
				if (conf.validateOnEvent) {
					$form.validateOnEvent(conf.language, conf);
				}
			});

			if (conf.modules !== '') {
				$.formUtils.loadModules(conf.modules, false, function () {
					if (typeof conf.onModulesLoaded === 'function') {
						conf.onModulesLoaded();
					}
					var $form = typeof conf.form === 'string' ? $(conf.form) : conf.form;
					$.formUtils.$win.trigger('validatorsLoaded', [$form, conf]);
				});
			}
		};

	})(jQuery);

	/**
	 * Utility methods and properties attached to $.formUtils
	 */
	(function ($, window) {

		'use strict';

		var $win = $(window);

		$.formUtils = $.extend($.formUtils || {}, {

			$win: $win,

			/**
			 * Default config for $(...).isValid();
			 */
			defaultConfig: function () {
				return {
					ignore: [], // Names of inputs not to be validated even though `validationRuleAttribute` containing the validation rules tells us to
					errorElementClass: 'error', // Class that will be put on elements which value is invalid
					borderColorOnError: '#b94a48', // Border color of elements which value is invalid, empty string to not change border color
					errorMessageClass: 'form-error', // class name of div containing error messages when validation fails
					validationRuleAttribute: 'data-validation', // name of the attribute holding the validation rules
					validationErrorMsgAttribute: 'data-validation-error-msg', // define custom err msg inline with element
					errorMessagePosition: 'element', // Can be either "top" or "element" or "custom"
					errorMessageTemplate: {
						container: '<div class="{errorMessageClass} alert alert-danger">{messages}</div>',
						messages: '<strong>{errorTitle}</strong><ul>{fields}</ul>',
						field: '<li>{msg}</li>'
					},
					scrollToTopOnError: true,
					dateFormat: 'yyyy-mm-dd',
					addValidClassOnAll: false, // whether or not to apply class="valid" even if the input wasn't validated
					decimalSeparator: '.',
					inputParentClassOnError: 'has-error', // twitter-bootstrap default class name
					inputParentClassOnSuccess: 'has-success', // twitter-bootstrap default class name
					validateHiddenInputs: false, // whether or not hidden inputs should be validated
					inlineErrorMessageCallback: false,
					submitErrorMessageCallback: false
				};
			},

			/**
			 * Available validators
			 */
			validators: {},

			/**
			 * Events triggered by form validator
			 */
			_events: {
				load: [],
				valid: [],
				invalid: []
			},

			/**
			 * Setting this property to true during validation will
			 * stop further validation from taking place and form will
			 * not be sent
			 */
			haltValidation: false,

			/**
			 * This variable will be true $.fn.isValid() is called
			 * and false when $.fn.validateOnBlur is called
			 */
			isValidatingEntireForm: false,

			/**
			 * Function for adding a validator
			 * @param {Object} validator
			 */
			addValidator: function (validator) {
				// prefix with "validate_" for backward compatibility reasons
				var name = validator.name.indexOf('validate_') === 0 ? validator.name : 'validate_' + validator.name;
				if (validator.validateOnKeyUp === undefined) {
					validator.validateOnKeyUp = true;
				}
				this.validators[name] = validator;
			},

			/**
			 * Warn user via the console if available
			 */
			warn: function (msg) {
				if ('console' in window) {
					if (typeof window.console.warn === 'function') {
						window.console.warn(msg);
					} else if (typeof window.console.log === 'function') {
						window.console.log(msg);
					}
				} else {
					alert(msg);
				}
			},

			/**
			 * Same as input $.fn.val() but also supporting input of typ radio or checkbox
			 * @example
			 *
			 *  $.formUtils.getValue('.myRadioButtons', $('#some-form'));
			 *  $.formUtils.getValue($('#some-form').find('.check-boxes'));
			 *
			 * @param query
			 * @param $parent
			 * @returns {String|Boolean}
			 */
			getValue: function (query, $parent) {
				var $inputs = $parent ? $parent.find(query) : query;
				if ($inputs.length > 0) {
					var type = $inputs.eq(0).attr('type');
					if (type === 'radio' || type === 'checkbox') {
						return $inputs.filter(':checked').val();
					} else {
						return $inputs.val();
					}
				}
				return false;
			},

			/**
			 * Validate the value of given element according to the validation rules
			 * found in the attribute data-validation. Will return an object representing
			 * a validation result, having the props shouldChangeDisplay, isValid and errorMsg
			 * @param {jQuery} $elem
			 * @param {Object} language ($.formUtils.LANG)
			 * @param {Object} conf
			 * @param {jQuery} $form
			 * @param {String} [eventContext]
			 * @return {Object}
			 */
			validateInput: function ($elem, language, conf, $form, eventContext) {

				conf = conf || $.formUtils.defaultConfig();
				language = language || $.formUtils.LANG;

				var value = this.getValue($elem);

				$elem
					.valAttr('skipped', false)
					.one('beforeValidation', function () {
						// Skip input because its hidden or disabled
						// Doing this in a callback makes it possible for others to prevent the default
						// behaviour by binding to the same event and call evt.stopImmediatePropagation()
						if ($elem.attr('disabled') || (!$elem.is(':visible') && !conf.validateHiddenInputs)) {
							$elem.valAttr('skipped', 1);
						}
					})
					.trigger('beforeValidation', [value, conf, language]);

				var inputIsOptional = $elem.valAttr('optional') === 'true',
					skipBecauseItsEmpty = !value && inputIsOptional,
					validationRules = $elem.attr(conf.validationRuleAttribute),
					isValid = true,
					errorMsg = '',
					result = {
						isValid: true,
						shouldChangeDisplay: true,
						errorMsg: ''
					};

				// For input type="number", browsers attempt to parse the entered value into a number.
				// If the input is not numeric, browsers handle the situation differently:
				// Chrome 48 simply disallows non-numeric input; FF 44 clears out the input box on blur;
				// Safari 5 parses the entered string to find a leading number.
				// If the input fails browser validation, the browser sets the input value equal to an empty string.
				// Therefore, we cannot distinguish (apart from hacks) between an empty input type="text" and one with a
				// value that can't be parsed by the browser.

				if (!validationRules || skipBecauseItsEmpty || $elem.valAttr('skipped')) {
					result.shouldChangeDisplay = conf.addValidClassOnAll;
					return result;
				}

				// Filter out specified characters
				var ignore = $elem.valAttr('ignore');
				if (ignore) {
					$.each(ignore.split(''), function (i, char) {
						value = value.replace(new RegExp('\\' + char), '');
					});
				}

				$.split(validationRules, function (rule) {

					if (rule.indexOf('validate_') !== 0) {
						rule = 'validate_' + rule;
					}

					var validator = $.formUtils.validators[rule];

					if (validator) {

						// special change of element for checkbox_group rule
						if (rule === 'validate_checkbox_group') {
							// set element to first in group, so error msg attr doesn't need to be set on all elements in group
							$elem = $form.find('[name="' + $elem.attr('name') + '"]:eq(0)');
						}

						if (eventContext !== 'keyup' || validator.validateOnKeyUp) {
							// A validator can prevent itself from getting triggered on keyup
							isValid = validator.validatorFunction(value, $elem, conf, language, $form);
						}

						if (!isValid) {
							errorMsg = $.formUtils.dialogs.resolveErrorMessage($elem, validator, rule, conf, language);
							return false; // break iteration
						}

					} else {

						// todo: Add some validator lookup function and tell immediately which module is missing
						throw new Error('Using undefined validator "' + rule +
							'". Maybe you have forgotten to load the module that "' + rule + '" belongs to?');

					}

				}, ' ');


				if (isValid === false) {
					$elem.trigger('validation', false);
					result.errorMsg = errorMsg;
					result.isValid = false;
					result.shouldChangeDisplay = true;
				} else if (isValid === null) {
					// A validatorFunction returning null means that it's not able to validate
					// the input at this time. Most probably some async stuff need to gets finished
					// first and then the validator will re-trigger the validation.
					result.shouldChangeDisplay = false;
				} else {
					$elem.trigger('validation', true);
					result.shouldChangeDisplay = true;
				}

				// Run element validation callback
				if (typeof conf.onElementValidate === 'function' && errorMsg !== null) {
					conf.onElementValidate(result.isValid, $elem, $form, errorMsg);
				}

				$elem.trigger('afterValidation', [result, eventContext]);

				return result;
			},

			/**
			 * Is it a correct date according to given dateFormat. Will return false if not, otherwise
			 * an array 0=>year 1=>month 2=>day
			 *
			 * @param {String} val
			 * @param {String} dateFormat
			 * @param {Boolean} [addMissingLeadingZeros]
			 * @return {Array}|{Boolean}
			 */
			parseDate: function (val, dateFormat, addMissingLeadingZeros) {
				var divider = dateFormat.replace(/[a-zA-Z]/gi, '').substring(0, 1),
					regexp = '^',
					formatParts = dateFormat.split(divider || null),
					matches, day, month, year;

				$.each(formatParts, function (i, part) {
					regexp += (i > 0 ? '\\' + divider : '') + '(\\d{' + part.length + '})';
				});

				regexp += '$';

				if (addMissingLeadingZeros) {
					var newValueParts = [];
					$.each(val.split(divider), function (i, part) {
						if (part.length === 1) {
							part = '0' + part;
						}
						newValueParts.push(part);
					});
					val = newValueParts.join(divider);
				}

				matches = val.match(new RegExp(regexp));
				if (matches === null) {
					return false;
				}

				var findDateUnit = function (unit, formatParts, matches) {
					for (var i = 0; i < formatParts.length; i++) {
						if (formatParts[i].substring(0, 1) === unit) {
							return $.formUtils.parseDateInt(matches[i + 1]);
						}
					}
					return -1;
				};

				month = findDateUnit('m', formatParts, matches);
				day = findDateUnit('d', formatParts, matches);
				year = findDateUnit('y', formatParts, matches);

				if ((month === 2 && day > 28 && (year % 4 !== 0 || year % 100 === 0 && year % 400 !== 0)) ||
					(month === 2 && day > 29 && (year % 4 === 0 || year % 100 !== 0 && year % 400 === 0)) ||
					month > 12 || month === 0) {
					return false;
				}
				if ((this.isShortMonth(month) && day > 30) || (!this.isShortMonth(month) && day > 31) || day === 0) {
					return false;
				}

				return [year, month, day];
			},

			/**
			 * skum fix. är talet 05 eller lägre ger parseInt rätt int annars får man 0 när man kör parseInt?
			 *
			 * @param {String} val
			 * @return {Number}
			 */
			parseDateInt: function (val) {
				if (val.indexOf('0') === 0) {
					val = val.replace('0', '');
				}
				return parseInt(val, 10);
			},

			/**
			 * Has month only 30 days?
			 *
			 * @param {Number} m
			 * @return {Boolean}
			 */
			isShortMonth: function (m) {
				return (m % 2 === 0 && m < 7) || (m % 2 !== 0 && m > 7);
			},

			/**
			 * Restrict input length
			 *
			 * @param {jQuery} $inputElement Jquery Html object
			 * @param {jQuery} $maxLengthElement jQuery Html Object
			 * @return void
			 */
			lengthRestriction: function ($inputElement, $maxLengthElement) {
				// read maxChars from counter display initial text value
				var maxChars = parseInt($maxLengthElement.text(), 10),
					charsLeft = 0,

					// internal function does the counting and sets display value
					countCharacters = function () {
						var numChars = $inputElement.val().length;
						if (numChars > maxChars) {
							// get current scroll bar position
							var currScrollTopPos = $inputElement.scrollTop();
							// trim value to max length
							$inputElement.val($inputElement.val().substring(0, maxChars));
							$inputElement.scrollTop(currScrollTopPos);
						}
						charsLeft = maxChars - numChars;
						if (charsLeft < 0) {
							charsLeft = 0;
						}

						// set counter text
						$maxLengthElement.text(charsLeft);
					};

				// bind events to this element
				// setTimeout is needed, cut or paste fires before val is available
				$($inputElement).bind('keydown keyup keypress focus blur', countCharacters)
					.bind('cut paste', function () {
						setTimeout(countCharacters, 100);
					});

				// count chars on pageload, if there are prefilled input-values
				$(document).bind('ready', countCharacters);
			},

			/**
			 * Test numeric against allowed range
			 *
			 * @param $value int
			 * @param $rangeAllowed str; (1-2, min1, max2, 10)
			 * @return array
			 */
			numericRangeCheck: function (value, rangeAllowed) {
				// split by dash
				var range = $.split(rangeAllowed),
					// min or max
					minmax = parseInt(rangeAllowed.substr(3), 10);

				if (range.length === 1 && rangeAllowed.indexOf('min') === -1 && rangeAllowed.indexOf('max') === -1) {
					range = [rangeAllowed, rangeAllowed]; // only a number, checking agains an exact number of characters
				}

				// range ?
				if (range.length === 2 && (value < parseInt(range[0], 10) || value > parseInt(range[1], 10))) {
					return ['out', range[0], range[1]];
				} // value is out of range
				else if (rangeAllowed.indexOf('min') === 0 && (value < minmax)) // min
				{
					return ['min', minmax];
				} // value is below min
				else if (rangeAllowed.indexOf('max') === 0 && (value > minmax)) // max
				{
					return ['max', minmax];
				} // value is above max
				// since no other returns executed, value is in allowed range
				return ['ok'];
			},


			_numSuggestionElements: 0,
			_selectedSuggestion: null,
			_previousTypedVal: null,

			/**
			 * Utility function that can be used to create plugins that gives
			 * suggestions when inputs is typed into
			 * @param {jQuery} $elem
			 * @param {Array} suggestions
			 * @param {Object} settings - Optional
			 * @return {jQuery}
			 */
			suggest: function ($elem, suggestions, settings) {
				var conf = {
					css: {
						maxHeight: '150px',
						background: '#FFF',
						lineHeight: '150%',
						textDecoration: 'underline',
						overflowX: 'hidden',
						overflowY: 'auto',
						border: '#CCC solid 1px',
						borderTop: 'none',
						cursor: 'pointer'
					},
					activeSuggestionCSS: {
						background: '#E9E9E9'
					}
				},
					setSuggsetionPosition = function ($suggestionContainer, $input) {
						var offset = $input.offset();
						$suggestionContainer.css({
							width: $input.outerWidth(),
							left: offset.left + 'px',
							top: (offset.top + $input.outerHeight()) + 'px'
						});
					};

				if (settings) {
					$.extend(conf, settings);
				}

				conf.css.position = 'absolute';
				conf.css['z-index'] = 9999;
				$elem.attr('autocomplete', 'off');

				if (this._numSuggestionElements === 0) {
					// Re-position suggestion container if window size changes
					$win.bind('resize', function () {
						$('.jquery-form-suggestions').each(function () {
							var $container = $(this),
								suggestID = $container.attr('data-suggest-container');
							setSuggsetionPosition($container, $('.suggestions-' + suggestID).eq(0));
						});
					});
				}

				this._numSuggestionElements++;

				var onSelectSuggestion = function ($el) {
					var suggestionId = $el.valAttr('suggestion-nr');
					$.formUtils._selectedSuggestion = null;
					$.formUtils._previousTypedVal = null;
					$('.jquery-form-suggestion-' + suggestionId).fadeOut('fast');
				};

				$elem
					.data('suggestions', suggestions)
					.valAttr('suggestion-nr', this._numSuggestionElements)
					.unbind('focus.suggest')
					.bind('focus.suggest', function () {
						$(this).trigger('keyup');
						$.formUtils._selectedSuggestion = null;
					})
					.unbind('keyup.suggest')
					.bind('keyup.suggest', function () {
						var $input = $(this),
							foundSuggestions = [],
							val = $.trim($input.val()).toLocaleLowerCase();

						if (val === $.formUtils._previousTypedVal) {
							return;
						} else {
							$.formUtils._previousTypedVal = val;
						}

						var hasTypedSuggestion = false,
							suggestionId = $input.valAttr('suggestion-nr'),
							$suggestionContainer = $('.jquery-form-suggestion-' + suggestionId);

						$suggestionContainer.scrollTop(0);

						// Find the right suggestions
						if (val !== '') {
							var findPartial = val.length > 2;
							$.each($input.data('suggestions'), function (i, suggestion) {
								var lowerCaseVal = suggestion.toLocaleLowerCase();
								if (lowerCaseVal === val) {
									foundSuggestions.push('<strong>' + suggestion + '</strong>');
									hasTypedSuggestion = true;
									return false;
								} else if (lowerCaseVal.indexOf(val) === 0 || (findPartial && lowerCaseVal.indexOf(val) > -1)) {
									foundSuggestions.push(suggestion.replace(new RegExp(val, 'gi'), '<strong>$&</strong>'));
								}
							});
						}

						// Hide suggestion container
						if (hasTypedSuggestion || (foundSuggestions.length === 0 && $suggestionContainer.length > 0)) {
							$suggestionContainer.hide();
						}

						// Create suggestion container if not already exists
						else if (foundSuggestions.length > 0 && $suggestionContainer.length === 0) {
							$suggestionContainer = $('<div></div>').css(conf.css).appendTo('body');
							$elem.addClass('suggestions-' + suggestionId);
							$suggestionContainer
								.attr('data-suggest-container', suggestionId)
								.addClass('jquery-form-suggestions')
								.addClass('jquery-form-suggestion-' + suggestionId);
						}

						// Show hidden container
						else if (foundSuggestions.length > 0 && !$suggestionContainer.is(':visible')) {
							$suggestionContainer.show();
						}

						// add suggestions
						if (foundSuggestions.length > 0 && val.length !== foundSuggestions[0].length) {

							// put container in place every time, just in case
							setSuggsetionPosition($suggestionContainer, $input);

							// Add suggestions HTML to container
							$suggestionContainer.html('');
							$.each(foundSuggestions, function (i, text) {
								$('<div></div>')
									.append(text)
									.css({
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
										padding: '5px'
									})
									.addClass('form-suggest-element')
									.appendTo($suggestionContainer)
									.click(function () {
										$input.focus();
										$input.val($(this).text());
										$input.trigger('change');
										onSelectSuggestion($input);
									});
							});
						}
					})
					.unbind('keydown.validation')
					.bind('keydown.validation', function (e) {
						var code = (e.keyCode ? e.keyCode : e.which),
							suggestionId,
							$suggestionContainer,
							$input = $(this);

						if (code === 13 && $.formUtils._selectedSuggestion !== null) {
							suggestionId = $input.valAttr('suggestion-nr');
							$suggestionContainer = $('.jquery-form-suggestion-' + suggestionId);
							if ($suggestionContainer.length > 0) {
								var newText = $suggestionContainer.find('div').eq($.formUtils._selectedSuggestion).text();
								$input.val(newText);
								$input.trigger('change');
								onSelectSuggestion($input);
								e.preventDefault();
							}
						} else {
							suggestionId = $input.valAttr('suggestion-nr');
							$suggestionContainer = $('.jquery-form-suggestion-' + suggestionId);
							var $suggestions = $suggestionContainer.children();
							if ($suggestions.length > 0 && $.inArray(code, [38, 40]) > -1) {
								if (code === 38) { // key up
									if ($.formUtils._selectedSuggestion === null) {
										$.formUtils._selectedSuggestion = $suggestions.length - 1;
									} else {
										$.formUtils._selectedSuggestion--;
									}
									if ($.formUtils._selectedSuggestion < 0) {
										$.formUtils._selectedSuggestion = $suggestions.length - 1;
									}
								} else if (code === 40) { // key down
									if ($.formUtils._selectedSuggestion === null) {
										$.formUtils._selectedSuggestion = 0;
									} else {
										$.formUtils._selectedSuggestion++;
									}
									if ($.formUtils._selectedSuggestion > ($suggestions.length - 1)) {
										$.formUtils._selectedSuggestion = 0;
									}
								}

								// Scroll in suggestion window
								var containerInnerHeight = $suggestionContainer.innerHeight(),
									containerScrollTop = $suggestionContainer.scrollTop(),
									suggestionHeight = $suggestionContainer.children().eq(0).outerHeight(),
									activeSuggestionPosY = suggestionHeight * ($.formUtils._selectedSuggestion);

								if (activeSuggestionPosY < containerScrollTop || activeSuggestionPosY > (containerScrollTop + containerInnerHeight)) {
									$suggestionContainer.scrollTop(activeSuggestionPosY);
								}

								$suggestions
									.removeClass('active-suggestion')
									.css('background', 'none')
									.eq($.formUtils._selectedSuggestion)
									.addClass('active-suggestion')
									.css(conf.activeSuggestionCSS);

								e.preventDefault();
								return false;
							}
						}
					})
					.unbind('blur.suggest')
					.bind('blur.suggest', function () {
						onSelectSuggestion($(this));
					});

				return $elem;
			},

			/**
			 * Error dialogs
			 *
			 * @var {Object}
			 */
			LANG: {
				errorTitle: 'Form submission failed!',
				requiredField: 'This is a required field',
				requiredFields: 'You have not answered all required fields',
				badTime: 'You have not given a correct time',
				badEmail: 'You have not given a correct e-mail address',
				badTelephone: 'You have not given a correct phone number',
				badSecurityAnswer: 'You have not given a correct answer to the security question',
				badDate: 'You have not given a correct date',
				lengthBadStart: 'The input value must be between ',
				lengthBadEnd: ' characters',
				lengthTooLongStart: 'The input value is longer than ',
				lengthTooShortStart: 'The input value is shorter than ',
				notConfirmed: 'Input values could not be confirmed',
				badDomain: 'Incorrect domain value',
				badUrl: 'The input value is not a correct URL',
				badCustomVal: 'The input value is incorrect',
				andSpaces: ' and spaces ',
				badInt: 'The input value was not a correct number',
				badSecurityNumber: 'Your social security number was incorrect',
				badUKVatAnswer: 'Incorrect UK VAT Number',
				badUKNin: 'Incorrect UK NIN',
				badUKUtr: 'Incorrect UK UTR Number',
				badStrength: 'The password isn\'t strong enough',
				badNumberOfSelectedOptionsStart: 'You have to choose at least ',
				badNumberOfSelectedOptionsEnd: ' answers',
				badAlphaNumeric: 'The input value can only contain alphanumeric characters ',
				badAlphaNumericExtra: ' and ',
				wrongFileSize: 'The file you are trying to upload is too large (max %s)',
				wrongFileType: 'Only files of type %s is allowed',
				groupCheckedRangeStart: 'Please choose between ',
				groupCheckedTooFewStart: 'Please choose at least ',
				groupCheckedTooManyStart: 'Please choose a maximum of ',
				groupCheckedEnd: ' item(s)',
				badCreditCard: 'The credit card number is not correct',
				badCVV: 'The CVV number was not correct',
				wrongFileDim: 'Incorrect image dimensions,',
				imageTooTall: 'the image can not be taller than',
				imageTooWide: 'the image can not be wider than',
				imageTooSmall: 'the image was too small',
				min: 'min',
				max: 'max',
				imageRatioNotAccepted: 'Image ratio is not be accepted',
				badBrazilTelephoneAnswer: 'The phone number entered is invalid',
				badBrazilCEPAnswer: 'The CEP entered is invalid',
				badBrazilCPFAnswer: 'The CPF entered is invalid',
				badPlPesel: 'The PESEL entered is invalid',
				badPlNip: 'The NIP entered is invalid',
				badPlRegon: 'The REGON entered is invalid',
				badreCaptcha: 'Please confirm that you are not a bot'
			}
		});

	})(jQuery, window);

	/**
	 * File declaring all default validators.
	 */
	(function ($) {

		/*
		 * Validate email
		 */
		$.formUtils.addValidator({
			name: 'email',
			validatorFunction: function (email) {

				var emailParts = email.toLowerCase().split('@'),
					localPart = emailParts[0],
					domain = emailParts[1];

				if (localPart && domain) {

					if (localPart.indexOf('"') === 0) {
						var len = localPart.length;
						localPart = localPart.replace(/\"/g, '');
						if (localPart.length !== (len - 2)) {
							return false; // It was not allowed to have more than two apostrophes
						}
					}

					return $.formUtils.validators.validate_domain.validatorFunction(emailParts[1]) &&
						localPart.indexOf('.') !== 0 &&
						localPart.substring(localPart.length - 1, localPart.length) !== '.' &&
						localPart.indexOf('..') === -1 &&
						!(/[^\w\+\.\-\#\-\_\~\!\$\&\'\(\)\*\+\,\;\=\:]/.test(localPart));
				}

				return false;
			},
			errorMessage: '',
			errorMessageKey: 'badEmail'
		});

		/*
		 * Validate domain name
		 */
		$.formUtils.addValidator({
			name: 'domain',
			validatorFunction: function (val) {
				return val.length > 0 &&
					val.length <= 253 && // Including sub domains
					!(/[^a-zA-Z0-9]/.test(val.slice(-2))) && !(/[^a-zA-Z0-9]/.test(val.substr(0, 1))) && !(/[^a-zA-Z0-9\.\-]/.test(val)) &&
					val.split('..').length === 1 &&
					val.split('.').length > 1;
			},
			errorMessage: '',
			errorMessageKey: 'badDomain'
		});

		/*
		 * Validate required
		 */
		$.formUtils.addValidator({
			name: 'required',
			validatorFunction: function (val, $el, config, language, $form) {
				switch ($el.attr('type')) {
					case 'checkbox':
						return $el.is(':checked');
					case 'radio':
						return $form.find('input[name="' + $el.attr('name') + '"]').filter(':checked').length > 0;
					default:
						return $.trim(val) !== '';
				}
			},
			errorMessage: '',
			errorMessageKey: function (config) {
				if (config.errorMessagePosition === 'top' || typeof config.errorMessagePosition === 'function') {
					return 'requiredFields';
				} else {
					return 'requiredField';
				}
			}
		});

		/*
		 * Validate length range
		 */
		$.formUtils.addValidator({
			name: 'length',
			validatorFunction: function (val, $el, conf, lang) {
				var lengthAllowed = $el.valAttr('length'),
					type = $el.attr('type');

				if (lengthAllowed === undefined) {
					alert('Please add attribute "data-validation-length" to ' + $el[0].nodeName + ' named ' + $el.attr('name'));
					return true;
				}

				// check if length is above min, below max or within range.
				var len = type === 'file' && $el.get(0).files !== undefined ? $el.get(0).files.length : val.length,
					lengthCheckResults = $.formUtils.numericRangeCheck(len, lengthAllowed),
					checkResult;

				switch (lengthCheckResults[0]) { // outside of allowed range
					case 'out':
						this.errorMessage = lang.lengthBadStart + lengthAllowed + lang.lengthBadEnd;
						checkResult = false;
						break;
					// too short
					case 'min':
						this.errorMessage = lang.lengthTooShortStart + lengthCheckResults[1] + lang.lengthBadEnd;
						checkResult = false;
						break;
					// too long
					case 'max':
						this.errorMessage = lang.lengthTooLongStart + lengthCheckResults[1] + lang.lengthBadEnd;
						checkResult = false;
						break;
					// ok
					default:
						checkResult = true;
				}

				return checkResult;
			},
			errorMessage: '',
			errorMessageKey: ''
		});

		/*
		 * Validate url
		 */
		$.formUtils.addValidator({
			name: 'url',
			validatorFunction: function (url) {
				// written by Scott Gonzalez: http://projects.scottsplayground.com/iri/
				// - Victor Jonsson added support for arrays in the url ?arg[]=sdfsdf
				// - General improvements made by Stéphane Moureau <https://github.com/TraderStf>

				var urlFilter = /^(https?|ftp):\/\/((((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|\[|\]|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
				if (urlFilter.test(url)) {
					var domain = url.split('://')[1],
						domainSlashPos = domain.indexOf('/');

					if (domainSlashPos > -1) {
						domain = domain.substr(0, domainSlashPos);
					}

					return $.formUtils.validators.validate_domain.validatorFunction(domain); // todo: add support for IP-addresses
				}
				return false;
			},
			errorMessage: '',
			errorMessageKey: 'badUrl'
		});

		/*
		 * Validate number (floating or integer)
		 */
		$.formUtils.addValidator({
			name: 'number',
			validatorFunction: function (val, $el, conf) {
				if (val !== '') {
					var allowing = $el.valAttr('allowing') || '',
						decimalSeparator = $el.valAttr('decimal-separator') || conf.decimalSeparator,
						allowsRange = false,
						begin, end,
						steps = $el.valAttr('step') || '',
						allowsSteps = false,
						sanitize = $el.attr('data-sanitize') || '',
						isFormattedWithNumeral = sanitize.match(/(^|[\s])numberFormat([\s]|$)/i);

					if (isFormattedWithNumeral) {
						if (!window.numeral) {
							throw new ReferenceError('The data-sanitize value numberFormat cannot be used without the numeral' +
								' library. Please see Data Validation in http://www.formvalidator.net for more information.');
						}
						//Unformat input first, then convert back to String
						if (val.length) {
							val = String(numeral().unformat(val));
						}
					}

					if (allowing.indexOf('number') === -1) {
						allowing += ',number';
					}

					if (allowing.indexOf('negative') === -1 && val.indexOf('-') === 0) {
						return false;
					}

					if (allowing.indexOf('range') > -1) {
						begin = parseFloat(allowing.substring(allowing.indexOf('[') + 1, allowing.indexOf(';')));
						end = parseFloat(allowing.substring(allowing.indexOf(';') + 1, allowing.indexOf(']')));
						allowsRange = true;
					}

					if (steps !== '') {
						allowsSteps = true;
					}

					if (decimalSeparator === ',') {
						if (val.indexOf('.') > -1) {
							return false;
						}
						// Fix for checking range with floats using ,
						val = val.replace(',', '.');
					}
					if (val.replace(/[0-9-]/g, '') === '' && (!allowsRange || (val >= begin && val <= end)) && (!allowsSteps || (val % steps === 0))) {
						return true;
					}

					if (allowing.indexOf('float') > -1 && val.match(new RegExp('^([0-9-]+)\\.([0-9]+)$')) !== null && (!allowsRange || (val >= begin && val <= end)) && (!allowsSteps || (val % steps === 0))) {
						return true;
					}
				}
				return false;
			},
			errorMessage: '',
			errorMessageKey: 'badInt'
		});

		/*
		 * Validate alpha numeric
		 */
		$.formUtils.addValidator({
			name: 'alphanumeric',
			validatorFunction: function (val, $el, conf, language) {
				var patternStart = '^([a-zA-Z0-9',
					patternEnd = ']+)$',
					additionalChars = $el.valAttr('allowing'),
					pattern = '';

				if (additionalChars) {
					pattern = patternStart + additionalChars + patternEnd;
					var extra = additionalChars.replace(/\\/g, '');
					if (extra.indexOf(' ') > -1) {
						extra = extra.replace(' ', '');
						extra += language.andSpaces || $.formUtils.LANG.andSpaces;
					}
					this.errorMessage = language.badAlphaNumeric + language.badAlphaNumericExtra + extra;
				} else {
					pattern = patternStart + patternEnd;
					this.errorMessage = language.badAlphaNumeric;
				}

				return new RegExp(pattern).test(val);
			},
			errorMessage: '',
			errorMessageKey: ''
		});

		/*
		 * Validate against regexp
		 */
		$.formUtils.addValidator({
			name: 'custom',
			validatorFunction: function (val, $el) {
				var regexp = new RegExp($el.valAttr('regexp'));
				return regexp.test(val);
			},
			errorMessage: '',
			errorMessageKey: 'badCustomVal'
		});

		/*
		 * Validate date
		 */
		$.formUtils.addValidator({
			name: 'date',
			validatorFunction: function (date, $el, conf) {
				var dateFormat = $el.valAttr('format') || conf.dateFormat || 'yyyy-mm-dd',
					addMissingLeadingZeros = $el.valAttr('require-leading-zero') === 'false';
				return $.formUtils.parseDate(date, dateFormat, addMissingLeadingZeros) !== false;
			},
			errorMessage: '',
			errorMessageKey: 'badDate'
		});


		/*
		 * Validate group of checkboxes, validate qty required is checked
		 * written by Steve Wasiura : http://stevewasiura.waztech.com
		 * element attrs
		 *    data-validation="checkbox_group"
		 *    data-validation-qty="1-2"  // min 1 max 2
		 *    data-validation-error-msg="chose min 1, max of 2 checkboxes"
		 */
		$.formUtils.addValidator({
			name: 'checkbox_group',
			validatorFunction: function (val, $el, conf, lang, $form) {
				// preset return var
				var isValid = true,
					// get name of element. since it is a checkbox group, all checkboxes will have same name
					elname = $el.attr('name'),
					// get checkboxes and count the checked ones
					$checkBoxes = $('input[type=checkbox][name^="' + elname + '"]', $form),
					checkedCount = $checkBoxes.filter(':checked').length,
					// get el attr that specs qty required / allowed
					qtyAllowed = $el.valAttr('qty');

				if (qtyAllowed === undefined) {
					var elementType = $el.get(0).nodeName;
					alert('Attribute "data-validation-qty" is missing from ' + elementType + ' named ' + $el.attr('name'));
				}

				// call Utility function to check if count is above min, below max, within range etc.
				var qtyCheckResults = $.formUtils.numericRangeCheck(checkedCount, qtyAllowed);

				// results will be array, [0]=result str, [1]=qty int
				switch (qtyCheckResults[0]) {
					// outside allowed range
					case 'out':
						this.errorMessage = lang.groupCheckedRangeStart + qtyAllowed + lang.groupCheckedEnd;
						isValid = false;
						break;
					// below min qty
					case 'min':
						this.errorMessage = lang.groupCheckedTooFewStart + qtyCheckResults[1] + lang.groupCheckedEnd;
						isValid = false;
						break;
					// above max qty
					case 'max':
						this.errorMessage = lang.groupCheckedTooManyStart + qtyCheckResults[1] + lang.groupCheckedEnd;
						isValid = false;
						break;
					// ok
					default:
						isValid = true;
				}

				if (!isValid) {
					var _triggerOnBlur = function () {
						$checkBoxes.unbind('click', _triggerOnBlur);
						$checkBoxes.filter('*[data-validation]').validateInputOnBlur(lang, conf, false, 'blur');
					};
					$checkBoxes.bind('click', _triggerOnBlur);
				}

				return isValid;
			}
			//   errorMessage : '', // set above in switch statement
			//   errorMessageKey: '' // not used
		});

	})(jQuery);


}));
/**
 * hoverIntent is similar to jQuery's built-in "hover" method except that
 * instead of firing the handlerIn function immediately, hoverIntent checks
 * to see if the user's mouse has slowed down (beneath the sensitivity
 * threshold) before firing the event. The handlerOut function is only
 * called after a matching handlerIn.
 *
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2013 Brian Cherne
 *
 * // basic usage ... just like .hover()
 * .hoverIntent( handlerIn, handlerOut )
 * .hoverIntent( handlerInOut )
 *
 * // basic usage ... with event delegation!
 * .hoverIntent( handlerIn, handlerOut, selector )
 * .hoverIntent( handlerInOut, selector )
 *
 * // using a basic configuration object
 * .hoverIntent( config )
 *
 * @param  handlerIn   function OR configuration object
 * @param  handlerOut  function OR selector for delegation OR undefined
 * @param  selector    selector OR undefined
 * @author Brian Cherne <brian(at)cherne(dot)net>
 **/
(function ($) {
	$.fn.hoverIntent = function (handlerIn, handlerOut, selector) {

		// default configuration values
		var cfg = {
			interval: 100,
			sensitivity: 7,
			timeout: 0
		};

		if (typeof handlerIn === "object") {
			cfg = $.extend(cfg, handlerIn);
		} else if ($.isFunction(handlerOut)) {
			cfg = $.extend(cfg, {
				over: handlerIn,
				out: handlerOut,
				selector: selector
			});
		} else {
			cfg = $.extend(cfg, {
				over: handlerIn,
				out: handlerIn,
				selector: handlerOut
			});
		}

		// instantiate variables
		// cX, cY = current X and Y position of mouse, updated by mousemove event
		// pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
		var cX, cY, pX, pY;

		// A private function for getting mouse position
		var track = function (ev) {
			cX = ev.pageX;
			cY = ev.pageY;
		};

		// A private function for comparing current and previous mouse position
		var compare = function (ev, ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			// compare mouse positions to see if they've crossed the threshold
			if ((Math.abs(pX - cX) + Math.abs(pY - cY)) < cfg.sensitivity) {
				$(ob).off("mousemove.hoverIntent", track);
				// set hoverIntent state to true (so mouseOut can be called)
				ob.hoverIntent_s = 1;
				return cfg.over.apply(ob, [ev]);
			} else {
				// set previous coordinates for next time
				pX = cX;
				pY = cY;
				// use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
				ob.hoverIntent_t = setTimeout(function () {
					compare(ev, ob);
				}, cfg.interval);
			}
		};

		// A private function for delaying the mouseOut function
		var delay = function (ev, ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			ob.hoverIntent_s = 0;
			return cfg.out.apply(ob, [ev]);
		};

		// A private function for handling mouse 'hovering'
		var handleHover = function (e) {
			// copy objects to be passed into t (required for event object to be passed in IE)
			var ev = jQuery.extend({}, e);
			var ob = this;

			// cancel hoverIntent timer if it exists
			if (ob.hoverIntent_t) {
				ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			}

			// if e.type == "mouseenter"
			if (e.type == "mouseenter") {
				// set "previous" X and Y position based on initial entry point
				pX = ev.pageX;
				pY = ev.pageY;
				// update "current" X and Y position based on mousemove
				$(ob).on("mousemove.hoverIntent", track);
				// start polling interval (self-calling timeout) to compare mouse coordinates over time
				if (ob.hoverIntent_s != 1) {
					ob.hoverIntent_t = setTimeout(function () {
						compare(ev, ob);
					}, cfg.interval);
				}

				// else e.type == "mouseleave"
			} else {
				// unbind expensive mousemove event
				$(ob).off("mousemove.hoverIntent", track);
				// if hoverIntent state is true, then call the mouseOut function after the specified delay
				if (ob.hoverIntent_s == 1) {
					ob.hoverIntent_t = setTimeout(function () {
						delay(ev, ob);
					}, cfg.timeout);
				}
			}
		};

		// listen for mouseenter and mouseleave
		return this.on({
			'mouseenter.hoverIntent': handleHover,
			'mouseleave.hoverIntent': handleHover
		}, cfg.selector);
	};
})(jQuery);
/**
 * author Christopher Blum
 *    - based on the idea of Remy Sharp, http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 *    - forked from http://github.com/zuk/jquery.inview/
 */
(function (factory) {
	if (typeof define == 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node, CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var inviewObjects = [],
		viewportSize, viewportOffset,
		d = document,
		w = window,
		documentElement = d.documentElement,
		timer;

	$.event.special.inview = {
		add: function (data) {
			inviewObjects.push({
				data: data,
				$element: $(this),
				element: this
			});
			// Use setInterval in order to also make sure this captures elements within
			// "overflow:scroll" elements or elements that appeared in the dom tree due to
			// dom manipulation and reflow
			// old: $(window).scroll(checkInView);
			//
			// By the way, iOS (iPad, iPhone, ...) seems to not execute, or at least delays
			// intervals while the user scrolls. Therefore the inview event might fire a bit late there
			//
			// Don't waste cycles with an interval until we get at least one element that
			// has bound to the inview event.
			if (!timer && inviewObjects.length) {
				timer = setInterval(checkInView, 250);
			}
		},

		remove: function (data) {
			for (var i = 0; i < inviewObjects.length; i++) {
				var inviewObject = inviewObjects[i];
				if (inviewObject.element === this && inviewObject.data.guid === data.guid) {
					inviewObjects.splice(i, 1);
					break;
				}
			}

			// Clear interval when we no longer have any elements listening
			if (!inviewObjects.length) {
				clearInterval(timer);
				timer = null;
			}
		}
	};

	function getViewportSize() {
		var mode, domObject, size = {
			height: w.innerHeight,
			width: w.innerWidth
		};

		// if this is correct then return it. iPad has compat Mode, so will
		// go into check clientHeight/clientWidth (which has the wrong value).
		if (!size.height) {
			mode = d.compatMode;
			if (mode || !$.support.boxModel) { // IE, Gecko
				domObject = mode === 'CSS1Compat' ?
					documentElement : // Standards
					d.body; // Quirks
				size = {
					height: domObject.clientHeight,
					width: domObject.clientWidth
				};
			}
		}

		return size;
	}

	function getViewportOffset() {
		return {
			top: w.pageYOffset || documentElement.scrollTop || d.body.scrollTop,
			left: w.pageXOffset || documentElement.scrollLeft || d.body.scrollLeft
		};
	}

	function checkInView() {
		if (!inviewObjects.length) {
			return;
		}

		var i = 0,
			$elements = $.map(inviewObjects, function (inviewObject) {
				var selector = inviewObject.data.selector,
					$element = inviewObject.$element;
				return selector ? $element.find(selector) : $element;
			});

		viewportSize = viewportSize || getViewportSize();
		viewportOffset = viewportOffset || getViewportOffset();

		for (; i < inviewObjects.length; i++) {
			// Ignore elements that are not in the DOM tree
			if (!$.contains(documentElement, $elements[i][0])) {
				continue;
			}

			var $element = $($elements[i]),
				elementSize = {
					height: $element[0].offsetHeight,
					width: $element[0].offsetWidth
				},
				elementOffset = $element.offset(),
				inView = $element.data('inview');

			// Don't ask me why because I haven't figured out yet:
			// viewportOffset and viewportSize are sometimes suddenly null in Firefox 5.
			// Even though it sounds weird:
			// It seems that the execution of this function is interferred by the onresize/onscroll event
			// where viewportOffset and viewportSize are unset
			if (!viewportOffset || !viewportSize) {
				return;
			}

			if (elementOffset.top + elementSize.height > viewportOffset.top &&
				elementOffset.top < viewportOffset.top + viewportSize.height &&
				elementOffset.left + elementSize.width > viewportOffset.left &&
				elementOffset.left < viewportOffset.left + viewportSize.width) {
				if (!inView) {
					$element.data('inview', true).trigger('inview', [true]);
				}
			} else if (inView) {
				$element.data('inview', false).trigger('inview', [false]);
			}
		}
	}

	$(w).on("scroll resize scrollstop", function () {
		viewportSize = viewportOffset = null;
	});

	// IE < 9 scrolls to focused elements without firing the "scroll" event
	if (!documentElement.addEventListener && documentElement.attachEvent) {
		documentElement.attachEvent("onfocusin", function () {
			viewportOffset = null;
		});
	}
}));
/*! sidr - v2.2.1 - 2016-02-17
 * http://www.berriart.com/sidr/
 * Copyright (c) 2013-2016 Alberto Varela; Licensed MIT */

(function () {
	'use strict';

	var babelHelpers = {};

	babelHelpers.classCallCheck = function (instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	};

	babelHelpers.createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	babelHelpers;

	var sidrStatus = {
		moving: false,
		opened: false
	};

	var helper = {
		// Check for valids urls
		// From : http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-an-url

		isUrl: function isUrl(str) {
			var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
				'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
				'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
				'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
				'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
				'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

			if (pattern.test(str)) {
				return true;
			} else {
				return false;
			}
		},


		// Add sidr prefixes
		addPrefixes: function addPrefixes($element) {
			this.addPrefix($element, 'id');
			this.addPrefix($element, 'class');
			$element.removeAttr('style');
		},
		addPrefix: function addPrefix($element, attribute) {
			var toReplace = $element.attr(attribute);

			if (typeof toReplace === 'string' && toReplace !== '' && toReplace !== 'sidr-inner') {
				$element.attr(attribute, toReplace.replace(/([A-Za-z0-9_.\-]+)/g, 'sidr-' + attribute + '-$1'));
			}
		},


		// Check if transitions is supported
		transitions: function () {
			var body = document.body || document.documentElement,
				style = body.style,
				supported = false,
				property = 'transition';

			if (property in style) {
				supported = true;
			} else {
				(function () {
					var prefixes = ['moz', 'webkit', 'o', 'ms'],
						prefix = undefined,
						i = undefined;

					property = property.charAt(0).toUpperCase() + property.substr(1);
					supported = function () {
						for (i = 0; i < prefixes.length; i++) {
							prefix = prefixes[i];
							if (prefix + property in style) {
								return true;
							}
						}

						return false;
					}();
					property = supported ? '-' + prefix.toLowerCase() + '-' + property.toLowerCase() : null;
				})();
			}

			return {
				supported: supported,
				property: property
			};
		}()
	};

	var $$2 = jQuery;

	var bodyAnimationClass = 'sidr-animating';
	var openAction = 'open';
	var closeAction = 'close';
	var transitionEndEvent = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
	var Menu = function () {
		function Menu(name) {
			babelHelpers.classCallCheck(this, Menu);

			this.name = name;
			this.item = $$2('#' + name);
			this.openClass = name === 'sidr' ? 'sidr-open' : 'sidr-open ' + name + '-open';
			this.menuWidth = this.item.outerWidth(true);
			this.speed = this.item.data('speed');
			this.side = this.item.data('side');
			this.displace = this.item.data('displace');
			this.timing = this.item.data('timing');
			this.method = this.item.data('method');
			this.onOpenCallback = this.item.data('onOpen');
			this.onCloseCallback = this.item.data('onClose');
			this.onOpenEndCallback = this.item.data('onOpenEnd');
			this.onCloseEndCallback = this.item.data('onCloseEnd');
			this.body = $$2(this.item.data('body'));
		}

		babelHelpers.createClass(Menu, [{
			key: 'getAnimation',
			value: function getAnimation(action, element) {
				var animation = {},
					prop = this.side;

				if (action === 'open' && element === 'body') {
					animation[prop] = this.menuWidth + 'px';
				} else if (action === 'close' && element === 'menu') {
					animation[prop] = '-' + this.menuWidth + 'px';
				} else {
					animation[prop] = 0;
				}

				return animation;
			}
		}, {
			key: 'prepareBody',
			value: function prepareBody(action) {
				var prop = action === 'open' ? 'hidden' : '';

				// Prepare page if container is body
				if (this.body.is('body')) {
					var $html = $$2('html'),
						scrollTop = $html.scrollTop();

					$html.css('overflow-x', prop).scrollTop(scrollTop);
				}
			}
		}, {
			key: 'openBody',
			value: function openBody() {
				if (this.displace) {
					var transitions = helper.transitions,
						$body = this.body;

					if (transitions.supported) {
						$body.css(transitions.property, this.side + ' ' + this.speed / 1000 + 's ' + this.timing).css(this.side, 0).css({
							width: $body.width(),
							position: 'absolute'
						});
						$body.css(this.side, this.menuWidth + 'px');
					} else {
						var bodyAnimation = this.getAnimation(openAction, 'body');

						$body.css({
							width: $body.width(),
							position: 'absolute'
						}).animate(bodyAnimation, {
							queue: false,
							duration: this.speed
						});
					}
				}
			}
		}, {
			key: 'onCloseBody',
			value: function onCloseBody() {
				var transitions = helper.transitions,
					resetStyles = {
						width: '',
						position: '',
						right: '',
						left: ''
					};

				if (transitions.supported) {
					resetStyles[transitions.property] = '';
				}

				this.body.css(resetStyles).unbind(transitionEndEvent);
			}
		}, {
			key: 'closeBody',
			value: function closeBody() {
				var _this = this;

				if (this.displace) {
					if (helper.transitions.supported) {
						this.body.css(this.side, 0).one(transitionEndEvent, function () {
							_this.onCloseBody();
						});
					} else {
						var bodyAnimation = this.getAnimation(closeAction, 'body');

						this.body.animate(bodyAnimation, {
							queue: false,
							duration: this.speed,
							complete: function complete() {
								_this.onCloseBody();
							}
						});
					}
				}
			}
		}, {
			key: 'moveBody',
			value: function moveBody(action) {
				if (action === openAction) {
					this.openBody();
				} else {
					this.closeBody();
				}
			}
		}, {
			key: 'onOpenMenu',
			value: function onOpenMenu(callback) {
				var name = this.name;

				sidrStatus.moving = false;
				sidrStatus.opened = name;

				this.item.unbind(transitionEndEvent);

				this.body.removeClass(bodyAnimationClass).addClass(this.openClass);

				this.onOpenEndCallback();

				if (typeof callback === 'function') {
					callback(name);
				}
			}
		}, {
			key: 'openMenu',
			value: function openMenu(callback) {
				var _this2 = this;

				var $item = this.item;

				if (helper.transitions.supported) {
					$item.css(this.side, 0).one(transitionEndEvent, function () {
						_this2.onOpenMenu(callback);
					});
				} else {
					var menuAnimation = this.getAnimation(openAction, 'menu');

					$item.css('display', 'block').animate(menuAnimation, {
						queue: false,
						duration: this.speed,
						complete: function complete() {
							_this2.onOpenMenu(callback);
						}
					});
				}
			}
		}, {
			key: 'onCloseMenu',
			value: function onCloseMenu(callback) {
				this.item.css({
					left: '',
					right: ''
				}).unbind(transitionEndEvent);
				$$2('html').css('overflow-x', '');

				sidrStatus.moving = false;
				sidrStatus.opened = false;

				this.body.removeClass(bodyAnimationClass).removeClass(this.openClass);

				this.onCloseEndCallback();

				// Callback
				if (typeof callback === 'function') {
					callback(name);
				}
			}
		}, {
			key: 'closeMenu',
			value: function closeMenu(callback) {
				var _this3 = this;

				var item = this.item;

				if (helper.transitions.supported) {
					item.css(this.side, '').one(transitionEndEvent, function () {
						_this3.onCloseMenu(callback);
					});
				} else {
					var menuAnimation = this.getAnimation(closeAction, 'menu');

					item.animate(menuAnimation, {
						queue: false,
						duration: this.speed,
						complete: function complete() {
							_this3.onCloseMenu();
						}
					});
				}
			}
		}, {
			key: 'moveMenu',
			value: function moveMenu(action, callback) {
				this.body.addClass(bodyAnimationClass);

				if (action === openAction) {
					this.openMenu(callback);
				} else {
					this.closeMenu(callback);
				}
			}
		}, {
			key: 'move',
			value: function move(action, callback) {
				// Lock sidr
				sidrStatus.moving = true;

				this.prepareBody(action);
				this.moveBody(action);
				this.moveMenu(action, callback);
			}
		}, {
			key: 'open',
			value: function open(callback) {
				var _this4 = this;

				// Check if is already opened or moving
				if (sidrStatus.opened === this.name || sidrStatus.moving) {
					return;
				}

				// If another menu opened close first
				if (sidrStatus.opened !== false) {
					var alreadyOpenedMenu = new Menu(sidrStatus.opened);

					alreadyOpenedMenu.close(function () {
						_this4.open(callback);
					});

					return;
				}

				this.move('open', callback);

				// onOpen callback
				this.onOpenCallback();
			}
		}, {
			key: 'close',
			value: function close(callback) {
				// Check if is already closed or moving
				if (sidrStatus.opened !== this.name || sidrStatus.moving) {
					return;
				}

				this.move('close', callback);

				// onClose callback
				this.onCloseCallback();
			}
		}, {
			key: 'toggle',
			value: function toggle(callback) {
				if (sidrStatus.opened === this.name) {
					this.close(callback);
				} else {
					this.open(callback);
				}
			}
		}]);
		return Menu;
	}();

	var $$1 = jQuery;

	function execute(action, name, callback) {
		var sidr = new Menu(name);

		switch (action) {
			case 'open':
				sidr.open(callback);
				break;
			case 'close':
				sidr.close(callback);
				break;
			case 'toggle':
				sidr.toggle(callback);
				break;
			default:
				$$1.error('Method ' + action + ' does not exist on jQuery.sidr');
				break;
		}
	}

	var i;
	var $ = jQuery;
	var publicMethods = ['open', 'close', 'toggle'];
	var methodName;
	var methods = {};
	var getMethod = function getMethod(methodName) {
		return function (name, callback) {
			// Check arguments
			if (typeof name === 'function') {
				callback = name;
				name = 'sidr';
			} else if (!name) {
				name = 'sidr';
			}

			execute(methodName, name, callback);
		};
	};
	for (i = 0; i < publicMethods.length; i++) {
		methodName = publicMethods[i];
		methods[methodName] = getMethod(methodName);
	}

	function sidr(method) {
		if (method === 'status') {
			return sidrStatus;
		} else if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'function' || typeof method === 'string' || !method) {
			return methods.toggle.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.sidr');
		}
	}

	var $$3 = jQuery;

	function fillContent($sideMenu, settings) {
		// The menu content
		if (typeof settings.source === 'function') {
			var newContent = settings.source(name);

			$sideMenu.html(newContent);
		} else if (typeof settings.source === 'string' && helper.isUrl(settings.source)) {
			$$3.get(settings.source, function (data) {
				$sideMenu.html(data);
			});
		} else if (typeof settings.source === 'string') {
			var htmlContent = '',
				selectors = settings.source.split(',');

			$$3.each(selectors, function (index, element) {
				htmlContent += '<div class="sidr-inner">' + $$3(element).html() + '</div>';
			});

			// Renaming ids and classes
			if (settings.renaming) {
				var $htmlContent = $$3('<div />').html(htmlContent);

				$htmlContent.find('*').each(function (index, element) {
					var $element = $$3(element);

					helper.addPrefixes($element);
				});
				htmlContent = $htmlContent.html();
			}

			$sideMenu.html(htmlContent);
		} else if (settings.source !== null) {
			$$3.error('Invalid Sidr Source');
		}

		return $sideMenu;
	}

	function fnSidr(options) {
		var transitions = helper.transitions,
			settings = $$3.extend({
				name: 'sidr', // Name for the 'sidr'
				speed: 200, // Accepts standard jQuery effects speeds (i.e. fast, normal or milliseconds)
				side: 'left', // Accepts 'left' or 'right'
				source: null, // Override the source of the content.
				renaming: true, // The ids and classes will be prepended with a prefix when loading existent content
				body: 'body', // Page container selector,
				displace: true, // Displace the body content or not
				timing: 'ease', // Timing function for CSS transitions
				method: 'toggle', // The method to call when element is clicked
				bind: 'touchstart click', // The event(s) to trigger the menu
				onOpen: function onOpen() { },
				// Callback when sidr start opening
				onClose: function onClose() { },
				// Callback when sidr start closing
				onOpenEnd: function onOpenEnd() { },
				// Callback when sidr end opening
				onCloseEnd: function onCloseEnd() { } // Callback when sidr end closing

			}, options),
			name = settings.name,
			$sideMenu = $$3('#' + name);

		// If the side menu do not exist create it
		if ($sideMenu.length === 0) {
			$sideMenu = $$3('<div />').attr('id', name).appendTo($$3('body'));
		}

		// Add transition to menu if are supported
		if (transitions.supported) {
			$sideMenu.css(transitions.property, settings.side + ' ' + settings.speed / 1000 + 's ' + settings.timing);
		}

		// Adding styles and options
		$sideMenu.addClass('sidr').addClass(settings.side).data({
			speed: settings.speed,
			side: settings.side,
			body: settings.body,
			displace: settings.displace,
			timing: settings.timing,
			method: settings.method,
			onOpen: settings.onOpen,
			onClose: settings.onClose,
			onOpenEnd: settings.onOpenEnd,
			onCloseEnd: settings.onCloseEnd
		});

		$sideMenu = fillContent($sideMenu, settings);

		return this.each(function () {
			var $this = $$3(this),
				data = $this.data('sidr'),
				flag = false;

			// If the plugin hasn't been initialized yet
			if (!data) {
				sidrStatus.moving = false;
				sidrStatus.opened = false;

				$this.data('sidr', name);

				$this.bind(settings.bind, function (event) {
					event.preventDefault();

					if (!flag) {
						flag = true;
						sidr(settings.method, name);

						setTimeout(function () {
							flag = false;
						}, 100);
					}
				});
			}
		});
	}

	jQuery.sidr = sidr;
	jQuery.fn.sidr = fnSidr;

}());
/*
 * jQuery Superfish Menu Plugin - v1.7.8
 * Copyright (c) 2016 
 *
 * Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 */

;
(function ($, w) {
	"use strict";

	var methods = (function () {
		// private properties and methods go here
		var c = {
			bcClass: 'sf-breadcrumb',
			menuClass: 'sf-js-enabled',
			anchorClass: 'sf-with-ul',
			menuArrowClass: 'sf-arrows'
		},
			ios = (function () {
				var ios = /^(?![\w\W]*Windows Phone)[\w\W]*(iPhone|iPad|iPod)/i.test(navigator.userAgent);
				if (ios) {
					// tap anywhere on iOS to unfocus a submenu
					$('html').css('cursor', 'pointer').on('click', $.noop);
				}
				return ios;
			})(),
			wp7 = (function () {
				var style = document.documentElement.style;
				return ('behavior' in style && 'fill' in style && /iemobile/i.test(navigator.userAgent));
			})(),
			unprefixedPointerEvents = (function () {
				return (!!w.PointerEvent);
			})(),
			toggleMenuClasses = function ($menu, o) {
				var classes = c.menuClass;
				if (o.cssArrows) {
					classes += ' ' + c.menuArrowClass;
				}
				$menu.toggleClass(classes);
			},
			setPathToCurrent = function ($menu, o) {
				return $menu.find('li.' + o.pathClass).slice(0, o.pathLevels)
					.addClass(o.hoverClass + ' ' + c.bcClass)
					.filter(function () {
						return ($(this).children(o.popUpSelector).hide().show().length);
					}).removeClass(o.pathClass);
			},
			toggleAnchorClass = function ($li) {
				$li.children('a').toggleClass(c.anchorClass);
			},
			toggleTouchAction = function ($menu) {
				var msTouchAction = $menu.css('ms-touch-action');
				var touchAction = $menu.css('touch-action');
				touchAction = touchAction || msTouchAction;
				touchAction = (touchAction === 'pan-y') ? 'auto' : 'pan-y';
				$menu.css({
					'ms-touch-action': touchAction,
					'touch-action': touchAction
				});
			},
			getMenu = function ($el) {
				return $el.closest('.' + c.menuClass);
			},
			getOptions = function ($el) {
				return getMenu($el).data('sf-options');
			},
			over = function () {
				var $this = $(this),
					o = getOptions($this);
				clearTimeout(o.sfTimer);
				$this.siblings().superfish('hide').end().superfish('show');
			},
			close = function (o) {
				o.retainPath = ($.inArray(this[0], o.$path) > -1);
				this.superfish('hide');

				if (!this.parents('.' + o.hoverClass).length) {
					o.onIdle.call(getMenu(this));
					if (o.$path.length) {
						$.proxy(over, o.$path)();
					}
				}
			},
			out = function () {
				var $this = $(this),
					o = getOptions($this);
				if (ios) {
					$.proxy(close, $this, o)();
				} else {
					clearTimeout(o.sfTimer);
					o.sfTimer = setTimeout($.proxy(close, $this, o), o.delay);
				}
			},
			touchHandler = function (e) {
				var $this = $(this),
					o = getOptions($this),
					$ul = $this.siblings(e.data.popUpSelector);

				if (o.onHandleTouch.call($ul) === false) {
					return this;
				}

				if ($ul.length > 0 && $ul.is(':hidden')) {
					$this.one('click.superfish', false);
					if (e.type === 'MSPointerDown' || e.type === 'pointerdown') {
						$this.trigger('focus');
					} else {
						$.proxy(over, $this.parent('li'))();
					}
				}
			},
			applyHandlers = function ($menu, o) {
				var targets = 'li:has(' + o.popUpSelector + ')';
				if ($.fn.hoverIntent && !o.disableHI) {
					$menu.hoverIntent(over, out, targets);
				} else {
					$menu
						.on('mouseenter.superfish', targets, over)
						.on('mouseleave.superfish', targets, out);
				}
				var touchevent = 'MSPointerDown.superfish';
				if (unprefixedPointerEvents) {
					touchevent = 'pointerdown.superfish';
				}
				if (!ios) {
					touchevent += ' touchend.superfish';
				}
				if (wp7) {
					touchevent += ' mousedown.superfish';
				}
				$menu
					.on('focusin.superfish', 'li', over)
					.on('focusout.superfish', 'li', out)
					.on(touchevent, 'a', o, touchHandler);
			};

		return {
			// public methods
			hide: function (instant) {
				if (this.length) {
					var $this = this,
						o = getOptions($this);
					if (!o) {
						return this;
					}
					var not = (o.retainPath === true) ? o.$path : '',
						$ul = $this.find('li.' + o.hoverClass).add(this).not(not).removeClass(o.hoverClass).children(o.popUpSelector),
						speed = o.speedOut;

					if (instant) {
						$ul.show();
						speed = 0;
					}
					o.retainPath = false;

					if (o.onBeforeHide.call($ul) === false) {
						return this;
					}

					$ul.stop(true, true).animate(o.animationOut, speed, function () {
						var $this = $(this);
						o.onHide.call($this);
					});
				}
				return this;
			},
			show: function () {
				var o = getOptions(this);
				if (!o) {
					return this;
				}
				var $this = this.addClass(o.hoverClass),
					$ul = $this.children(o.popUpSelector);

				if (o.onBeforeShow.call($ul) === false) {
					return this;
				}

				$ul.stop(true, true).animate(o.animation, o.speed, function () {
					o.onShow.call($ul);
				});
				return this;
			},
			destroy: function () {
				return this.each(function () {
					var $this = $(this),
						o = $this.data('sf-options'),
						$hasPopUp;
					if (!o) {
						return false;
					}
					$hasPopUp = $this.find(o.popUpSelector).parent('li');
					clearTimeout(o.sfTimer);
					toggleMenuClasses($this, o);
					toggleAnchorClass($hasPopUp);
					toggleTouchAction($this);
					// remove event handlers
					$this.off('.superfish').off('.hoverIntent');
					// clear animation's inline display style
					$hasPopUp.children(o.popUpSelector).attr('style', function (i, style) {
						return style.replace(/display[^;]+;?/g, '');
					});
					// reset 'current' path classes
					o.$path.removeClass(o.hoverClass + ' ' + c.bcClass).addClass(o.pathClass);
					$this.find('.' + o.hoverClass).removeClass(o.hoverClass);
					o.onDestroy.call($this);
					$this.removeData('sf-options');
				});
			},
			init: function (op) {
				return this.each(function () {
					var $this = $(this);
					if ($this.data('sf-options')) {
						return false;
					}
					var o = $.extend({}, $.fn.superfish.defaults, op),
						$hasPopUp = $this.find(o.popUpSelector).parent('li');
					o.$path = setPathToCurrent($this, o);

					$this.data('sf-options', o);

					toggleMenuClasses($this, o);
					toggleAnchorClass($hasPopUp);
					toggleTouchAction($this);
					applyHandlers($this, o);

					$hasPopUp.not('.' + c.bcClass).superfish('hide', true);

					o.onInit.call(this);
				});
			}
		};
	})();

	$.fn.superfish = function (method, args) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			return $.error('Method ' + method + ' does not exist on jQuery.fn.superfish');
		}
	};

	$.fn.superfish.defaults = {
		popUpSelector: 'ul,.sf-mega', // within menu context
		hoverClass: 'sfHover',
		pathClass: 'overrideThisToUse',
		pathLevels: 1,
		delay: 800,
		animation: {
			opacity: 'show'
		},
		animationOut: {
			opacity: 'hide'
		},
		speed: 'normal',
		speedOut: 'fast',
		cssArrows: true,
		disableHI: false,
		onInit: $.noop,
		onBeforeShow: $.noop,
		onShow: $.noop,
		onBeforeHide: $.noop,
		onHide: $.noop,
		onIdle: $.noop,
		onDestroy: $.noop,
		onHandleTouch: $.noop
	};

})(jQuery, window);

/*
	Name: YouTubePopUp
	Description: jQuery plugin to display YouTube or Vimeo video in PopUp, responsive and retina, easy to use.
	Version: 1.0.0
	Plugin URL: http://wp-time.com/youtube-popup-jquery-plugin/
	Written By: Qassim Hassan
	Twitter: @QQQHZ
	Websites: wp-time.com | qass.im | wp-plugins.in
	Dual licensed under the MIT and GPL licenses:
		http://www.opensource.org/licenses/mit-license.php
		http://www.gnu.org/licenses/gpl.html
	Copyright (c) 2016 - Qassim Hassan
*/

(function ($) {

	$.fn.YouTubePopUp = function (options) {

		var YouTubePopUpOptions = $.extend({
			autoplay: 1
		}, options);

		$(this).on('click', function (e) {

			var youtubeLink = $(this).attr("href");

			if (youtubeLink.match(/(youtube.com)/)) {
				var split_c = "v=";
				var split_n = 1;
			}

			if (youtubeLink.match(/(youtu.be)/) || youtubeLink.match(/(vimeo.com\/)+[0-9]/)) {
				var split_c = "/";
				var split_n = 3;
			}

			if (youtubeLink.match(/(vimeo.com\/)+[a-zA-Z]/)) {
				var split_c = "/";
				var split_n = 5;
			}

			var getYouTubeVideoID = youtubeLink.split(split_c)[split_n];

			var cleanVideoID = getYouTubeVideoID.replace(/(&)+(.*)/, "");

			if (youtubeLink.match(/(youtu.be)/) || youtubeLink.match(/(youtube.com)/)) {
				var videoEmbedLink = "https://www.youtube.com/embed/" + cleanVideoID + "?autoplay=" + YouTubePopUpOptions.autoplay + "";
			}

			if (youtubeLink.match(/(vimeo.com\/)+[0-9]/) || youtubeLink.match(/(vimeo.com\/)+[a-zA-Z]/)) {
				var videoEmbedLink = "https://player.vimeo.com/video/" + cleanVideoID + "?autoplay=" + YouTubePopUpOptions.autoplay + "";
			}

			$("body").append('<div class="YouTubePopUp-Wrap"><div class="YouTubePopUp-Content"><span class="YouTubePopUp-Close"></span><iframe src="' + videoEmbedLink + '" allowfullscreen></iframe></div></div>');


			$(".YouTubePopUp-Wrap, .YouTubePopUp-Close").click(function () {
				$(".YouTubePopUp-Wrap").addClass("YouTubePopUp-Hide").delay(515).queue(function () {
					$(this).remove();
				});
			});

			e.preventDefault();

		});

		$(document).keyup(function (e) {

			if (e.keyCode == 27) {
				$('.YouTubePopUp-Wrap, .YouTubePopUp-Close').click();
			}

		});

	};

}(jQuery));
/**
 * Owl Carousel v2.1.0
 * Copyright 2013-2016 David Deutsch
 * Licensed under MIT (https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE)
 */
/**
 * Owl carousel
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */
;
(function ($, window, document, undefined) {

	/**
	 * Creates a carousel.
	 * @class The Owl Carousel.
	 * @public
	 * @param {HTMLElement|jQuery} element - The element to create the carousel for.
	 * @param {Object} [options] - The options
	 */
	function Owl(element, options) {

		/**
		 * Current settings for the carousel.
		 * @public
		 */
		this.settings = null;

		/**
		 * Current options set by the caller including defaults.
		 * @public
		 */
		this.options = $.extend({}, Owl.Defaults, options);

		/**
		 * Plugin element.
		 * @public
		 */
		this.$element = $(element);

		/**
		 * Proxied event handlers.
		 * @protected
		 */
		this._handlers = {};

		/**
		 * References to the running plugins of this carousel.
		 * @protected
		 */
		this._plugins = {};

		/**
		 * Currently suppressed events to prevent them from beeing retriggered.
		 * @protected
		 */
		this._supress = {};

		/**
		 * Absolute current position.
		 * @protected
		 */
		this._current = null;

		/**
		 * Animation speed in milliseconds.
		 * @protected
		 */
		this._speed = null;

		/**
		 * Coordinates of all items in pixel.
		 * @todo The name of this member is missleading.
		 * @protected
		 */
		this._coordinates = [];

		/**
		 * Current breakpoint.
		 * @todo Real media queries would be nice.
		 * @protected
		 */
		this._breakpoint = null;

		/**
		 * Current width of the plugin element.
		 */
		this._width = null;

		/**
		 * All real items.
		 * @protected
		 */
		this._items = [];

		/**
		 * All cloned items.
		 * @protected
		 */
		this._clones = [];

		/**
		 * Merge values of all items.
		 * @todo Maybe this could be part of a plugin.
		 * @protected
		 */
		this._mergers = [];

		/**
		 * Widths of all items.
		 */
		this._widths = [];

		/**
		 * Invalidated parts within the update process.
		 * @protected
		 */
		this._invalidated = {};

		/**
		 * Ordered list of workers for the update process.
		 * @protected
		 */
		this._pipe = [];

		/**
		 * Current state information for the drag operation.
		 * @todo #261
		 * @protected
		 */
		this._drag = {
			time: null,
			target: null,
			pointer: null,
			stage: {
				start: null,
				current: null
			},
			direction: null
		};

		/**
		 * Current state information and their tags.
		 * @type {Object}
		 * @protected
		 */
		this._states = {
			current: {},
			tags: {
				'initializing': ['busy'],
				'animating': ['busy'],
				'dragging': ['interacting']
			}
		};

		$.each(['onResize', 'onThrottledResize'], $.proxy(function (i, handler) {
			this._handlers[handler] = $.proxy(this[handler], this);
		}, this));

		$.each(Owl.Plugins, $.proxy(function (key, plugin) {
			this._plugins[key.charAt(0).toLowerCase() + key.slice(1)] = new plugin(this);
		}, this));

		$.each(Owl.Workers, $.proxy(function (priority, worker) {
			this._pipe.push({
				'filter': worker.filter,
				'run': $.proxy(worker.run, this)
			});
		}, this));

		this.setup();
		this.initialize();
	}

	/**
	 * Default options for the carousel.
	 * @public
	 */
	Owl.Defaults = {
		items: 3,
		loop: false,
		center: false,
		rewind: false,

		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		freeDrag: false,

		margin: 0,
		stagePadding: 0,

		merge: false,
		mergeFit: true,
		autoWidth: false,

		startPosition: 0,
		rtl: false,

		smartSpeed: 250,
		fluidSpeed: false,
		dragEndSpeed: false,

		responsive: {},
		responsiveRefreshRate: 200,
		responsiveBaseElement: window,

		fallbackEasing: 'swing',

		info: false,

		nestedItemSelector: false,
		itemElement: 'div',
		stageElement: 'div',

		refreshClass: 'owl-refresh',
		loadedClass: 'owl-loaded',
		loadingClass: 'owl-loading',
		rtlClass: 'owl-rtl',
		responsiveClass: 'owl-responsive',
		dragClass: 'owl-drag',
		itemClass: 'owl-item',
		stageClass: 'owl-stage',
		stageOuterClass: 'owl-stage-outer',
		grabClass: 'owl-grab'
	};

	/**
	 * Enumeration for width.
	 * @public
	 * @readonly
	 * @enum {String}
	 */
	Owl.Width = {
		Default: 'default',
		Inner: 'inner',
		Outer: 'outer'
	};

	/**
	 * Enumeration for types.
	 * @public
	 * @readonly
	 * @enum {String}
	 */
	Owl.Type = {
		Event: 'event',
		State: 'state'
	};

	/**
	 * Contains all registered plugins.
	 * @public
	 */
	Owl.Plugins = {};

	/**
	 * List of workers involved in the update process.
	 */
	Owl.Workers = [{
		filter: ['width', 'settings'],
		run: function () {
			this._width = this.$element.width();
		}
	}, {
		filter: ['width', 'items', 'settings'],
		run: function (cache) {
			cache.current = this._items && this._items[this.relative(this._current)];
		}
	}, {
		filter: ['items', 'settings'],
		run: function () {
			this.$stage.children('.cloned').remove();
		}
	}, {
		filter: ['width', 'items', 'settings'],
		run: function (cache) {
			var margin = this.settings.margin || '',
				grid = !this.settings.autoWidth,
				rtl = this.settings.rtl,
				css = {
					'width': 'auto',
					'margin-left': rtl ? margin : '',
					'margin-right': rtl ? '' : margin
				};

			!grid && this.$stage.children().css(css);

			cache.css = css;
		}
	}, {
		filter: ['width', 'items', 'settings'],
		run: function (cache) {
			var width = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
				merge = null,
				iterator = this._items.length,
				grid = !this.settings.autoWidth,
				widths = [];

			cache.items = {
				merge: false,
				width: width
			};

			while (iterator--) {
				merge = this._mergers[iterator];
				merge = this.settings.mergeFit && Math.min(merge, this.settings.items) || merge;

				cache.items.merge = merge > 1 || cache.items.merge;

				widths[iterator] = !grid ? this._items[iterator].width() : width * merge;
			}

			this._widths = widths;
		}
	}, {
		filter: ['items', 'settings'],
		run: function () {
			var clones = [],
				items = this._items,
				settings = this.settings,
				view = Math.max(settings.items * 2, 4),
				size = Math.ceil(items.length / 2) * 2,
				repeat = settings.loop && items.length ? settings.rewind ? view : Math.max(view, size) : 0,
				append = '',
				prepend = '';

			repeat /= 2;

			while (repeat--) {
				clones.push(this.normalize(clones.length / 2, true));
				append = append + items[clones[clones.length - 1]][0].outerHTML;
				clones.push(this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
				prepend = items[clones[clones.length - 1]][0].outerHTML + prepend;
			}

			this._clones = clones;

			$(append).addClass('cloned').appendTo(this.$stage);
			$(prepend).addClass('cloned').prependTo(this.$stage);
		}
	}, {
		filter: ['width', 'items', 'settings'],
		run: function () {
			var rtl = this.settings.rtl ? 1 : -1,
				size = this._clones.length + this._items.length,
				iterator = -1,
				previous = 0,
				current = 0,
				coordinates = [];

			while (++iterator < size) {
				previous = coordinates[iterator - 1] || 0;
				current = this._widths[this.relative(iterator)] + this.settings.margin;
				coordinates.push(previous + current * rtl);
			}

			this._coordinates = coordinates;
		}
	}, {
		filter: ['width', 'items', 'settings'],
		run: function () {
			var padding = this.settings.stagePadding,
				coordinates = this._coordinates,
				css = {
					'width': Math.ceil(Math.abs(coordinates[coordinates.length - 1])) + padding * 2,
					'padding-left': padding || '',
					'padding-right': padding || ''
				};

			this.$stage.css(css);
		}
	}, {
		filter: ['width', 'items', 'settings'],
		run: function (cache) {
			var iterator = this._coordinates.length,
				grid = !this.settings.autoWidth,
				items = this.$stage.children();

			if (grid && cache.items.merge) {
				while (iterator--) {
					cache.css.width = this._widths[this.relative(iterator)];
					items.eq(iterator).css(cache.css);
				}
			} else if (grid) {
				cache.css.width = cache.items.width;
				items.css(cache.css);
			}
		}
	}, {
		filter: ['items'],
		run: function () {
			this._coordinates.length < 1 && this.$stage.removeAttr('style');
		}
	}, {
		filter: ['width', 'items', 'settings'],
		run: function (cache) {
			cache.current = cache.current ? this.$stage.children().index(cache.current) : 0;
			cache.current = Math.max(this.minimum(), Math.min(this.maximum(), cache.current));
			this.reset(cache.current);
		}
	}, {
		filter: ['position'],
		run: function () {
			this.animate(this.coordinates(this._current));
		}
	}, {
		filter: ['width', 'position', 'items', 'settings'],
		run: function () {
			var rtl = this.settings.rtl ? 1 : -1,
				padding = this.settings.stagePadding * 2,
				begin = this.coordinates(this.current()) + padding,
				end = begin + this.width() * rtl,
				inner, outer, matches = [],
				i, n;

			for (i = 0, n = this._coordinates.length; i < n; i++) {
				inner = this._coordinates[i - 1] || 0;
				outer = Math.abs(this._coordinates[i]) + padding * rtl;

				if ((this.op(inner, '<=', begin) && (this.op(inner, '>', end))) || (this.op(outer, '<', begin) && this.op(outer, '>', end))) {
					matches.push(i);
				}
			}

			this.$stage.children('.active').removeClass('active');
			this.$stage.children(':eq(' + matches.join('), :eq(') + ')').addClass('active');

			if (this.settings.center) {
				this.$stage.children('.center').removeClass('center');
				this.$stage.children().eq(this.current()).addClass('center');
			}
		}
	}];

	/**
	 * Initializes the carousel.
	 * @protected
	 */
	Owl.prototype.initialize = function () {
		this.enter('initializing');
		this.trigger('initialize');

		this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl);

		if (this.settings.autoWidth && !this.is('pre-loading')) {
			var imgs, nestedSelector, width;
			imgs = this.$element.find('img');
			nestedSelector = this.settings.nestedItemSelector ? '.' + this.settings.nestedItemSelector : undefined;
			width = this.$element.children(nestedSelector).width();

			if (imgs.length && width <= 0) {
				this.preloadAutoWidthImages(imgs);
			}
		}

		this.$element.addClass(this.options.loadingClass);

		// create stage
		this.$stage = $('<' + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>')
			.wrap('<div class="' + this.settings.stageOuterClass + '"/>');

		// append stage
		this.$element.append(this.$stage.parent());

		// append content
		this.replace(this.$element.children().not(this.$stage.parent()));

		// check visibility
		if (this.$element.is(':visible')) {
			// update view
			this.refresh();
		} else {
			// invalidate width
			this.invalidate('width');
		}

		this.$element
			.removeClass(this.options.loadingClass)
			.addClass(this.options.loadedClass);

		// register event handlers
		this.registerEventHandlers();

		this.leave('initializing');
		this.trigger('initialized');
	};

	/**
	 * Setups the current settings.
	 * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
	 * @todo Support for media queries by using `matchMedia` would be nice.
	 * @public
	 */
	Owl.prototype.setup = function () {
		var viewport = this.viewport(),
			overwrites = this.options.responsive,
			match = -1,
			settings = null;

		if (!overwrites) {
			settings = $.extend({}, this.options);
		} else {
			$.each(overwrites, function (breakpoint) {
				if (breakpoint <= viewport && breakpoint > match) {
					match = Number(breakpoint);
				}
			});

			settings = $.extend({}, this.options, overwrites[match]);
			delete settings.responsive;

			// responsive class
			if (settings.responsiveClass) {
				this.$element.attr('class',
					this.$element.attr('class').replace(new RegExp('(' + this.options.responsiveClass + '-)\\S+\\s', 'g'), '$1' + match)
				);
			}
		}

		if (this.settings === null || this._breakpoint !== match) {
			this.trigger('change', {
				property: {
					name: 'settings',
					value: settings
				}
			});
			this._breakpoint = match;
			this.settings = settings;
			this.invalidate('settings');
			this.trigger('changed', {
				property: {
					name: 'settings',
					value: this.settings
				}
			});
		}
	};

	/**
	 * Updates option logic if necessery.
	 * @protected
	 */
	Owl.prototype.optionsLogic = function () {
		if (this.settings.autoWidth) {
			this.settings.stagePadding = false;
			this.settings.merge = false;
		}
	};

	/**
	 * Prepares an item before add.
	 * @todo Rename event parameter `content` to `item`.
	 * @protected
	 * @returns {jQuery|HTMLElement} - The item container.
	 */
	Owl.prototype.prepare = function (item) {
		var event = this.trigger('prepare', {
			content: item
		});

		if (!event.data) {
			event.data = $('<' + this.settings.itemElement + '/>')
				.addClass(this.options.itemClass).append(item)
		}

		this.trigger('prepared', {
			content: event.data
		});

		return event.data;
	};

	/**
	 * Updates the view.
	 * @public
	 */
	Owl.prototype.update = function () {
		var i = 0,
			n = this._pipe.length,
			filter = $.proxy(function (p) {
				return this[p]
			}, this._invalidated),
			cache = {};

		while (i < n) {
			if (this._invalidated.all || $.grep(this._pipe[i].filter, filter).length > 0) {
				this._pipe[i].run(cache);
			}
			i++;
		}

		this._invalidated = {};

		!this.is('valid') && this.enter('valid');
	};

	/**
	 * Gets the width of the view.
	 * @public
	 * @param {Owl.Width} [dimension=Owl.Width.Default] - The dimension to return.
	 * @returns {Number} - The width of the view in pixel.
	 */
	Owl.prototype.width = function (dimension) {
		dimension = dimension || Owl.Width.Default;
		switch (dimension) {
			case Owl.Width.Inner:
			case Owl.Width.Outer:
				return this._width;
			default:
				return this._width - this.settings.stagePadding * 2 + this.settings.margin;
		}
	};

	/**
	 * Refreshes the carousel primarily for adaptive purposes.
	 * @public
	 */
	Owl.prototype.refresh = function () {
		this.enter('refreshing');
		this.trigger('refresh');

		this.setup();

		this.optionsLogic();

		this.$element.addClass(this.options.refreshClass);

		this.update();

		this.$element.removeClass(this.options.refreshClass);

		this.leave('refreshing');
		this.trigger('refreshed');
	};

	/**
	 * Checks window `resize` event.
	 * @protected
	 */
	Owl.prototype.onThrottledResize = function () {
		window.clearTimeout(this.resizeTimer);
		this.resizeTimer = window.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate);
	};

	/**
	 * Checks window `resize` event.
	 * @protected
	 */
	Owl.prototype.onResize = function () {
		if (!this._items.length) {
			return false;
		}

		if (this._width === this.$element.width()) {
			return false;
		}

		if (!this.$element.is(':visible')) {
			return false;
		}

		this.enter('resizing');

		if (this.trigger('resize').isDefaultPrevented()) {
			this.leave('resizing');
			return false;
		}

		this.invalidate('width');

		this.refresh();

		this.leave('resizing');
		this.trigger('resized');
	};

	/**
	 * Registers event handlers.
	 * @todo Check `msPointerEnabled`
	 * @todo #261
	 * @protected
	 */
	Owl.prototype.registerEventHandlers = function () {
		if ($.support.transition) {
			this.$stage.on($.support.transition.end + '.owl.core', $.proxy(this.onTransitionEnd, this));
		}

		if (this.settings.responsive !== false) {
			this.on(window, 'resize', this._handlers.onThrottledResize);
		}

		if (this.settings.mouseDrag) {
			this.$element.addClass(this.options.dragClass);
			this.$stage.on('mousedown.owl.core', $.proxy(this.onDragStart, this));
			this.$stage.on('dragstart.owl.core selectstart.owl.core', function () {
				return false
			});
		}

		if (this.settings.touchDrag) {
			this.$stage.on('touchstart.owl.core', $.proxy(this.onDragStart, this));
			this.$stage.on('touchcancel.owl.core', $.proxy(this.onDragEnd, this));
		}
	};

	/**
	 * Handles `touchstart` and `mousedown` events.
	 * @todo Horizontal swipe threshold as option
	 * @todo #261
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragStart = function (event) {
		var stage = null;

		if (event.which === 3) {
			return;
		}

		if ($.support.transform) {
			stage = this.$stage.css('transform').replace(/.*\(|\)| /g, '').split(',');
			stage = {
				x: stage[stage.length === 16 ? 12 : 4],
				y: stage[stage.length === 16 ? 13 : 5]
			};
		} else {
			stage = this.$stage.position();
			stage = {
				x: this.settings.rtl ?
					stage.left + this.$stage.width() - this.width() + this.settings.margin : stage.left,
				y: stage.top
			};
		}

		if (this.is('animating')) {
			$.support.transform ? this.animate(stage.x) : this.$stage.stop()
			this.invalidate('position');
		}

		this.$element.toggleClass(this.options.grabClass, event.type === 'mousedown');

		this.speed(0);

		this._drag.time = new Date().getTime();
		this._drag.target = $(event.target);
		this._drag.stage.start = stage;
		this._drag.stage.current = stage;
		this._drag.pointer = this.pointer(event);

		$(document).on('mouseup.owl.core touchend.owl.core', $.proxy(this.onDragEnd, this));

		$(document).one('mousemove.owl.core touchmove.owl.core', $.proxy(function (event) {
			var delta = this.difference(this._drag.pointer, this.pointer(event));

			$(document).on('mousemove.owl.core touchmove.owl.core', $.proxy(this.onDragMove, this));

			if (Math.abs(delta.x) < Math.abs(delta.y) && this.is('valid')) {
				return;
			}

			event.preventDefault();

			this.enter('dragging');
			this.trigger('drag');
		}, this));
	};

	/**
	 * Handles the `touchmove` and `mousemove` events.
	 * @todo #261
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragMove = function (event) {
		var minimum = null,
			maximum = null,
			pull = null,
			delta = this.difference(this._drag.pointer, this.pointer(event)),
			stage = this.difference(this._drag.stage.start, delta);

		if (!this.is('dragging')) {
			return;
		}

		event.preventDefault();

		if (this.settings.loop) {
			minimum = this.coordinates(this.minimum());
			maximum = this.coordinates(this.maximum() + 1) - minimum;
			stage.x = (((stage.x - minimum) % maximum + maximum) % maximum) + minimum;
		} else {
			minimum = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum());
			maximum = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum());
			pull = this.settings.pullDrag ? -1 * delta.x / 5 : 0;
			stage.x = Math.max(Math.min(stage.x, minimum + pull), maximum + pull);
		}

		this._drag.stage.current = stage;

		this.animate(stage.x);
	};

	/**
	 * Handles the `touchend` and `mouseup` events.
	 * @todo #261
	 * @todo Threshold for click event
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragEnd = function (event) {
		var delta = this.difference(this._drag.pointer, this.pointer(event)),
			stage = this._drag.stage.current,
			direction = delta.x > 0 ^ this.settings.rtl ? 'left' : 'right';

		$(document).off('.owl.core');

		this.$element.removeClass(this.options.grabClass);

		if (delta.x !== 0 && this.is('dragging') || !this.is('valid')) {
			this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
			this.current(this.closest(stage.x, delta.x !== 0 ? direction : this._drag.direction));
			this.invalidate('position');
			this.update();

			this._drag.direction = direction;

			if (Math.abs(delta.x) > 3 || new Date().getTime() - this._drag.time > 300) {
				this._drag.target.one('click.owl.core', function () {
					return false;
				});
			}
		}

		if (!this.is('dragging')) {
			return;
		}

		this.leave('dragging');
		this.trigger('dragged');
	};

	/**
	 * Gets absolute position of the closest item for a coordinate.
	 * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
	 * @protected
	 * @param {Number} coordinate - The coordinate in pixel.
	 * @param {String} direction - The direction to check for the closest item. Ether `left` or `right`.
	 * @return {Number} - The absolute position of the closest item.
	 */
	Owl.prototype.closest = function (coordinate, direction) {
		var position = -1,
			pull = 30,
			width = this.width(),
			coordinates = this.coordinates();

		if (!this.settings.freeDrag) {
			// check closest item
			$.each(coordinates, $.proxy(function (index, value) {
				// on a left pull, check on current index
				if (direction === 'left' && coordinate > value - pull && coordinate < value + pull) {
					position = index;
					// on a right pull, check on previous index
					// to do so, subtract width from value and set position = index + 1
				} else if (direction === 'right' && coordinate > value - width - pull && coordinate < value - width + pull) {
					position = index + 1;
				} else if (this.op(coordinate, '<', value) && this.op(coordinate, '>', coordinates[index + 1] || value - width)) {
					position = direction === 'left' ? index + 1 : index;
				}
				return position === -1;
			}, this));
		}

		if (!this.settings.loop) {
			// non loop boundries
			if (this.op(coordinate, '>', coordinates[this.minimum()])) {
				position = coordinate = this.minimum();
			} else if (this.op(coordinate, '<', coordinates[this.maximum()])) {
				position = coordinate = this.maximum();
			}
		}

		return position;
	};

	/**
	 * Animates the stage.
	 * @todo #270
	 * @public
	 * @param {Number} coordinate - The coordinate in pixels.
	 */
	Owl.prototype.animate = function (coordinate) {
		var animate = this.speed() > 0;

		this.is('animating') && this.onTransitionEnd();

		if (animate) {
			this.enter('animating');
			this.trigger('translate');
		}

		if ($.support.transform3d && $.support.transition) {
			this.$stage.css({
				transform: 'translate3d(' + coordinate + 'px,0px,0px)',
				transition: (this.speed() / 1000) + 's'
			});
		} else if (animate) {
			this.$stage.animate({
				left: coordinate + 'px'
			}, this.speed(), this.settings.fallbackEasing, $.proxy(this.onTransitionEnd, this));
		} else {
			this.$stage.css({
				left: coordinate + 'px'
			});
		}
	};

	/**
	 * Checks whether the carousel is in a specific state or not.
	 * @param {String} state - The state to check.
	 * @returns {Boolean} - The flag which indicates if the carousel is busy.
	 */
	Owl.prototype.is = function (state) {
		return this._states.current[state] && this._states.current[state] > 0;
	};

	/**
	 * Sets the absolute position of the current item.
	 * @public
	 * @param {Number} [position] - The new absolute position or nothing to leave it unchanged.
	 * @returns {Number} - The absolute position of the current item.
	 */
	Owl.prototype.current = function (position) {
		if (position === undefined) {
			return this._current;
		}

		if (this._items.length === 0) {
			return undefined;
		}

		position = this.normalize(position);

		if (this._current !== position) {
			var event = this.trigger('change', {
				property: {
					name: 'position',
					value: position
				}
			});

			if (event.data !== undefined) {
				position = this.normalize(event.data);
			}

			this._current = position;

			this.invalidate('position');

			this.trigger('changed', {
				property: {
					name: 'position',
					value: this._current
				}
			});
		}

		return this._current;
	};

	/**
	 * Invalidates the given part of the update routine.
	 * @param {String} [part] - The part to invalidate.
	 * @returns {Array.<String>} - The invalidated parts.
	 */
	Owl.prototype.invalidate = function (part) {
		if ($.type(part) === 'string') {
			this._invalidated[part] = true;
			this.is('valid') && this.leave('valid');
		}
		return $.map(this._invalidated, function (v, i) {
			return i
		});
	};

	/**
	 * Resets the absolute position of the current item.
	 * @public
	 * @param {Number} position - The absolute position of the new item.
	 */
	Owl.prototype.reset = function (position) {
		position = this.normalize(position);

		if (position === undefined) {
			return;
		}

		this._speed = 0;
		this._current = position;

		this.suppress(['translate', 'translated']);

		this.animate(this.coordinates(position));

		this.release(['translate', 'translated']);
	};

	/**
	 * Normalizes an absolute or a relative position of an item.
	 * @public
	 * @param {Number} position - The absolute or relative position to normalize.
	 * @param {Boolean} [relative=false] - Whether the given position is relative or not.
	 * @returns {Number} - The normalized position.
	 */
	Owl.prototype.normalize = function (position, relative) {
		var n = this._items.length,
			m = relative ? 0 : this._clones.length;

		if (!this.isNumeric(position) || n < 1) {
			position = undefined;
		} else if (position < 0 || position >= n + m) {
			position = ((position - m / 2) % n + n) % n + m / 2;
		}

		return position;
	};

	/**
	 * Converts an absolute position of an item into a relative one.
	 * @public
	 * @param {Number} position - The absolute position to convert.
	 * @returns {Number} - The converted position.
	 */
	Owl.prototype.relative = function (position) {
		position -= this._clones.length / 2;
		return this.normalize(position, true);
	};

	/**
	 * Gets the maximum position for the current item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
	Owl.prototype.maximum = function (relative) {
		var settings = this.settings,
			maximum = this._coordinates.length,
			boundary = Math.abs(this._coordinates[maximum - 1]) - this._width,
			i = -1,
			j;

		if (settings.loop) {
			maximum = this._clones.length / 2 + this._items.length - 1;
		} else if (settings.autoWidth || settings.merge) {
			// binary search
			while (maximum - i > 1) {
				Math.abs(this._coordinates[j = maximum + i >> 1]) < boundary ? i = j : maximum = j;
			}
		} else if (settings.center) {
			maximum = this._items.length - 1;
		} else {
			maximum = this._items.length - settings.items;
		}

		if (relative) {
			maximum -= this._clones.length / 2;
		}

		return Math.max(maximum, 0);
	};

	/**
	 * Gets the minimum position for the current item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
	Owl.prototype.minimum = function (relative) {
		return relative ? 0 : this._clones.length / 2;
	};

	/**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
	Owl.prototype.items = function (position) {
		if (position === undefined) {
			return this._items.slice();
		}

		position = this.normalize(position, true);
		return this._items[position];
	};

	/**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
	Owl.prototype.mergers = function (position) {
		if (position === undefined) {
			return this._mergers.slice();
		}

		position = this.normalize(position, true);
		return this._mergers[position];
	};

	/**
	 * Gets the absolute positions of clones for an item.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @returns {Array.<Number>} - The absolute positions of clones for the item or all if no position was given.
	 */
	Owl.prototype.clones = function (position) {
		var odd = this._clones.length / 2,
			even = odd + this._items.length,
			map = function (index) {
				return index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2
			};

		if (position === undefined) {
			return $.map(this._clones, function (v, i) {
				return map(i)
			});
		}

		return $.map(this._clones, function (v, i) {
			return v === position ? map(i) : null
		});
	};

	/**
	 * Sets the current animation speed.
	 * @public
	 * @param {Number} [speed] - The animation speed in milliseconds or nothing to leave it unchanged.
	 * @returns {Number} - The current animation speed in milliseconds.
	 */
	Owl.prototype.speed = function (speed) {
		if (speed !== undefined) {
			this._speed = speed;
		}

		return this._speed;
	};

	/**
	 * Gets the coordinate of an item.
	 * @todo The name of this method is missleanding.
	 * @public
	 * @param {Number} position - The absolute position of the item within `minimum()` and `maximum()`.
	 * @returns {Number|Array.<Number>} - The coordinate of the item in pixel or all coordinates.
	 */
	Owl.prototype.coordinates = function (position) {
		var multiplier = 1,
			newPosition = position - 1,
			coordinate;

		if (position === undefined) {
			return $.map(this._coordinates, $.proxy(function (coordinate, index) {
				return this.coordinates(index);
			}, this));
		}

		if (this.settings.center) {
			if (this.settings.rtl) {
				multiplier = -1;
				newPosition = position + 1;
			}

			coordinate = this._coordinates[position];
			coordinate += (this.width() - coordinate + (this._coordinates[newPosition] || 0)) / 2 * multiplier;
		} else {
			coordinate = this._coordinates[newPosition] || 0;
		}

		coordinate = Math.ceil(coordinate);

		return coordinate;
	};

	/**
	 * Calculates the speed for a translation.
	 * @protected
	 * @param {Number} from - The absolute position of the start item.
	 * @param {Number} to - The absolute position of the target item.
	 * @param {Number} [factor=undefined] - The time factor in milliseconds.
	 * @returns {Number} - The time in milliseconds for the translation.
	 */
	Owl.prototype.duration = function (from, to, factor) {
		if (factor === 0) {
			return 0;
		}

		return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((factor || this.settings.smartSpeed));
	};

	/**
	 * Slides to the specified item.
	 * @public
	 * @param {Number} position - The position of the item.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.to = function (position, speed) {
		var current = this.current(),
			revert = null,
			distance = position - this.relative(current),
			direction = (distance > 0) - (distance < 0),
			items = this._items.length,
			minimum = this.minimum(),
			maximum = this.maximum();

		if (this.settings.loop) {
			if (!this.settings.rewind && Math.abs(distance) > items / 2) {
				distance += direction * -1 * items;
			}

			position = current + distance;
			revert = ((position - minimum) % items + items) % items + minimum;

			if (revert !== position && revert - distance <= maximum && revert - distance > 0) {
				current = revert - distance;
				position = revert;
				this.reset(current);
			}
		} else if (this.settings.rewind) {
			maximum += 1;
			position = (position % maximum + maximum) % maximum;
		} else {
			position = Math.max(minimum, Math.min(maximum, position));
		}

		this.speed(this.duration(current, position, speed));
		this.current(position);

		if (this.$element.is(':visible')) {
			this.update();
		}
	};

	/**
	 * Slides to the next item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.next = function (speed) {
		speed = speed || false;
		this.to(this.relative(this.current()) + 1, speed);
	};

	/**
	 * Slides to the previous item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.prev = function (speed) {
		speed = speed || false;
		this.to(this.relative(this.current()) - 1, speed);
	};

	/**
	 * Handles the end of an animation.
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onTransitionEnd = function (event) {

		// if css2 animation then event object is undefined
		if (event !== undefined) {
			event.stopPropagation();

			// Catch only owl-stage transitionEnd event
			if ((event.target || event.srcElement || event.originalTarget) !== this.$stage.get(0)) {
				return false;
			}
		}

		this.leave('animating');
		this.trigger('translated');
	};

	/**
	 * Gets viewport width.
	 * @protected
	 * @return {Number} - The width in pixel.
	 */
	Owl.prototype.viewport = function () {
		var width;
		if (this.options.responsiveBaseElement !== window) {
			width = $(this.options.responsiveBaseElement).width();
		} else if (window.innerWidth) {
			width = window.innerWidth;
		} else if (document.documentElement && document.documentElement.clientWidth) {
			width = document.documentElement.clientWidth;
		} else {
			throw 'Can not detect viewport width.';
		}
		return width;
	};

	/**
	 * Replaces the current content.
	 * @public
	 * @param {HTMLElement|jQuery|String} content - The new content.
	 */
	Owl.prototype.replace = function (content) {
		this.$stage.empty();
		this._items = [];

		if (content) {
			content = (content instanceof jQuery) ? content : $(content);
		}

		if (this.settings.nestedItemSelector) {
			content = content.find('.' + this.settings.nestedItemSelector);
		}

		content.filter(function () {
			return this.nodeType === 1;
		}).each($.proxy(function (index, item) {
			item = this.prepare(item);
			this.$stage.append(item);
			this._items.push(item);
			this._mergers.push(item.find('[data-merge]').andSelf('[data-merge]').attr('data-merge') * 1 || 1);
		}, this));

		this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);

		this.invalidate('items');
	};

	/**
	 * Adds an item.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {HTMLElement|jQuery|String} content - The item content to add.
	 * @param {Number} [position] - The relative position at which to insert the item otherwise the item will be added to the end.
	 */
	Owl.prototype.add = function (content, position) {
		var current = this.relative(this._current);

		position = position === undefined ? this._items.length : this.normalize(position, true);
		content = content instanceof jQuery ? content : $(content);

		this.trigger('add', {
			content: content,
			position: position
		});

		content = this.prepare(content);

		if (this._items.length === 0 || position === this._items.length) {
			this._items.length === 0 && this.$stage.append(content);
			this._items.length !== 0 && this._items[position - 1].after(content);
			this._items.push(content);
			this._mergers.push(content.find('[data-merge]').andSelf('[data-merge]').attr('data-merge') * 1 || 1);
		} else {
			this._items[position].before(content);
			this._items.splice(position, 0, content);
			this._mergers.splice(position, 0, content.find('[data-merge]').andSelf('[data-merge]').attr('data-merge') * 1 || 1);
		}

		this._items[current] && this.reset(this._items[current].index());

		this.invalidate('items');

		this.trigger('added', {
			content: content,
			position: position
		});
	};

	/**
	 * Removes an item by its position.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {Number} position - The relative position of the item to remove.
	 */
	Owl.prototype.remove = function (position) {
		position = this.normalize(position, true);

		if (position === undefined) {
			return;
		}

		this.trigger('remove', {
			content: this._items[position],
			position: position
		});

		this._items[position].remove();
		this._items.splice(position, 1);
		this._mergers.splice(position, 1);

		this.invalidate('items');

		this.trigger('removed', {
			content: null,
			position: position
		});
	};

	/**
	 * Preloads images with auto width.
	 * @todo Replace by a more generic approach
	 * @protected
	 */
	Owl.prototype.preloadAutoWidthImages = function (images) {
		images.each($.proxy(function (i, element) {
			this.enter('pre-loading');
			element = $(element);
			$(new Image()).one('load', $.proxy(function (e) {
				element.attr('src', e.target.src);
				element.css('opacity', 1);
				this.leave('pre-loading');
				!this.is('pre-loading') && !this.is('initializing') && this.refresh();
			}, this)).attr('src', element.attr('src') || element.attr('data-src') || element.attr('data-src-retina'));
		}, this));
	};

	/**
	 * Destroys the carousel.
	 * @public
	 */
	Owl.prototype.destroy = function () {

		this.$element.off('.owl.core');
		this.$stage.off('.owl.core');
		$(document).off('.owl.core');

		if (this.settings.responsive !== false) {
			window.clearTimeout(this.resizeTimer);
			this.off(window, 'resize', this._handlers.onThrottledResize);
		}

		for (var i in this._plugins) {
			this._plugins[i].destroy();
		}

		this.$stage.children('.cloned').remove();

		this.$stage.unwrap();
		this.$stage.children().contents().unwrap();
		this.$stage.children().unwrap();

		this.$element
			.removeClass(this.options.refreshClass)
			.removeClass(this.options.loadingClass)
			.removeClass(this.options.loadedClass)
			.removeClass(this.options.rtlClass)
			.removeClass(this.options.dragClass)
			.removeClass(this.options.grabClass)
			.attr('class', this.$element.attr('class').replace(new RegExp(this.options.responsiveClass + '-\\S+\\s', 'g'), ''))
			.removeData('owl.carousel');
	};

	/**
	 * Operators to calculate right-to-left and left-to-right.
	 * @protected
	 * @param {Number} [a] - The left side operand.
	 * @param {String} [o] - The operator.
	 * @param {Number} [b] - The right side operand.
	 */
	Owl.prototype.op = function (a, o, b) {
		var rtl = this.settings.rtl;
		switch (o) {
			case '<':
				return rtl ? a > b : a < b;
			case '>':
				return rtl ? a < b : a > b;
			case '>=':
				return rtl ? a <= b : a >= b;
			case '<=':
				return rtl ? a >= b : a <= b;
			default:
				break;
		}
	};

	/**
	 * Attaches to an internal event.
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The event handler to attach.
	 * @param {Boolean} capture - Wether the event should be handled at the capturing phase or not.
	 */
	Owl.prototype.on = function (element, event, listener, capture) {
		if (element.addEventListener) {
			element.addEventListener(event, listener, capture);
		} else if (element.attachEvent) {
			element.attachEvent('on' + event, listener);
		}
	};

	/**
	 * Detaches from an internal event.
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The attached event handler to detach.
	 * @param {Boolean} capture - Wether the attached event handler was registered as a capturing listener or not.
	 */
	Owl.prototype.off = function (element, event, listener, capture) {
		if (element.removeEventListener) {
			element.removeEventListener(event, listener, capture);
		} else if (element.detachEvent) {
			element.detachEvent('on' + event, listener);
		}
	};

	/**
	 * Triggers a public event.
	 * @todo Remove `status`, `relatedTarget` should be used instead.
	 * @protected
	 * @param {String} name - The event name.
	 * @param {*} [data=null] - The event data.
	 * @param {String} [namespace=carousel] - The event namespace.
	 * @param {String} [state] - The state which is associated with the event.
	 * @param {Boolean} [enter=false] - Indicates if the call enters the specified state or not.
	 * @returns {Event} - The event arguments.
	 */
	Owl.prototype.trigger = function (name, data, namespace, state, enter) {
		var status = {
			item: {
				count: this._items.length,
				index: this.current()
			}
		},
			handler = $.camelCase(
				$.grep(['on', name, namespace], function (v) {
					return v
				})
					.join('-').toLowerCase()
			),
			event = $.Event(
				[name, 'owl', namespace || 'carousel'].join('.').toLowerCase(),
				$.extend({
					relatedTarget: this
				}, status, data)
			);

		if (!this._supress[name]) {
			$.each(this._plugins, function (name, plugin) {
				if (plugin.onTrigger) {
					plugin.onTrigger(event);
				}
			});

			this.register({
				type: Owl.Type.Event,
				name: name
			});
			this.$element.trigger(event);

			if (this.settings && typeof this.settings[handler] === 'function') {
				this.settings[handler].call(this, event);
			}
		}

		return event;
	};

	/**
	 * Enters a state.
	 * @param name - The state name.
	 */
	Owl.prototype.enter = function (name) {
		$.each([name].concat(this._states.tags[name] || []), $.proxy(function (i, name) {
			if (this._states.current[name] === undefined) {
				this._states.current[name] = 0;
			}

			this._states.current[name]++;
		}, this));
	};

	/**
	 * Leaves a state.
	 * @param name - The state name.
	 */
	Owl.prototype.leave = function (name) {
		$.each([name].concat(this._states.tags[name] || []), $.proxy(function (i, name) {
			this._states.current[name]--;
		}, this));
	};

	/**
	 * Registers an event or state.
	 * @public
	 * @param {Object} object - The event or state to register.
	 */
	Owl.prototype.register = function (object) {
		if (object.type === Owl.Type.Event) {
			if (!$.event.special[object.name]) {
				$.event.special[object.name] = {};
			}

			if (!$.event.special[object.name].owl) {
				var _default = $.event.special[object.name]._default;
				$.event.special[object.name]._default = function (e) {
					if (_default && _default.apply && (!e.namespace || e.namespace.indexOf('owl') === -1)) {
						return _default.apply(this, arguments);
					}
					return e.namespace && e.namespace.indexOf('owl') > -1;
				};
				$.event.special[object.name].owl = true;
			}
		} else if (object.type === Owl.Type.State) {
			if (!this._states.tags[object.name]) {
				this._states.tags[object.name] = object.tags;
			} else {
				this._states.tags[object.name] = this._states.tags[object.name].concat(object.tags);
			}

			this._states.tags[object.name] = $.grep(this._states.tags[object.name], $.proxy(function (tag, i) {
				return $.inArray(tag, this._states.tags[object.name]) === i;
			}, this));
		}
	};

	/**
	 * Suppresses events.
	 * @protected
	 * @param {Array.<String>} events - The events to suppress.
	 */
	Owl.prototype.suppress = function (events) {
		$.each(events, $.proxy(function (index, event) {
			this._supress[event] = true;
		}, this));
	};

	/**
	 * Releases suppressed events.
	 * @protected
	 * @param {Array.<String>} events - The events to release.
	 */
	Owl.prototype.release = function (events) {
		$.each(events, $.proxy(function (index, event) {
			delete this._supress[event];
		}, this));
	};

	/**
	 * Gets unified pointer coordinates from event.
	 * @todo #261
	 * @protected
	 * @param {Event} - The `mousedown` or `touchstart` event.
	 * @returns {Object} - Contains `x` and `y` coordinates of current pointer position.
	 */
	Owl.prototype.pointer = function (event) {
		var result = {
			x: null,
			y: null
		};

		event = event.originalEvent || event || window.event;

		event = event.touches && event.touches.length ?
			event.touches[0] : event.changedTouches && event.changedTouches.length ?
				event.changedTouches[0] : event;

		if (event.pageX) {
			result.x = event.pageX;
			result.y = event.pageY;
		} else {
			result.x = event.clientX;
			result.y = event.clientY;
		}

		return result;
	};

	/**
	 * Determines if the input is a Number or something that can be coerced to a Number
	 * @protected
	 * @param {Number|String|Object|Array|Boolean|RegExp|Function|Symbol} - The input to be tested
	 * @returns {Boolean} - An indication if the input is a Number or can be coerced to a Number
	 */
	Owl.prototype.isNumeric = function (number) {
		return !isNaN(parseFloat(number));
	};

	/**
	 * Gets the difference of two vectors.
	 * @todo #261
	 * @protected
	 * @param {Object} - The first vector.
	 * @param {Object} - The second vector.
	 * @returns {Object} - The difference.
	 */
	Owl.prototype.difference = function (first, second) {
		return {
			x: first.x - second.x,
			y: first.y - second.y
		};
	};

	/**
	 * The jQuery Plugin for the Owl Carousel
	 * @todo Navigation plugin `next` and `prev`
	 * @public
	 */
	$.fn.owlCarousel = function (option) {
		var args = Array.prototype.slice.call(arguments, 1);

		return this.each(function () {
			var $this = $(this),
				data = $this.data('owl.carousel');

			if (!data) {
				data = new Owl(this, typeof option == 'object' && option);
				$this.data('owl.carousel', data);

				$.each([
					'next', 'prev', 'to', 'destroy', 'refresh', 'replace', 'add', 'remove'
				], function (i, event) {
					data.register({
						type: Owl.Type.Event,
						name: event
					});
					data.$element.on(event + '.owl.carousel.core', $.proxy(function (e) {
						if (e.namespace && e.relatedTarget !== this) {
							this.suppress([event]);
							data[event].apply(this, [].slice.call(arguments, 1));
							this.release([event]);
						}
					}, data));
				});
			}

			if (typeof option == 'string' && option.charAt(0) !== '_') {
				data[option].apply(data, args);
			}
		});
	};

	/**
	 * The constructor for the jQuery Plugin
	 * @public
	 */
	$.fn.owlCarousel.Constructor = Owl;

})(window.Zepto || window.jQuery, window, document);

/**
 * AutoRefresh Plugin
 * @version 2.1.0
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function ($, window, document, undefined) {

	/**
	 * Creates the auto refresh plugin.
	 * @class The Auto Refresh Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var AutoRefresh = function (carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Refresh interval.
		 * @protected
		 * @type {number}
		 */
		this._interval = null;

		/**
		 * Whether the element is currently visible or not.
		 * @protected
		 * @type {Boolean}
		 */
		this._visible = null;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function (e) {
				if (e.namespace && this._core.settings.autoRefresh) {
					this.watch();
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, AutoRefresh.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	AutoRefresh.Defaults = {
		autoRefresh: true,
		autoRefreshInterval: 500
	};

	/**
	 * Watches the element.
	 */
	AutoRefresh.prototype.watch = function () {
		if (this._interval) {
			return;
		}

		this._visible = this._core.$element.is(':visible');
		this._interval = window.setInterval($.proxy(this.refresh, this), this._core.settings.autoRefreshInterval);
	};

	/**
	 * Refreshes the element.
	 */
	AutoRefresh.prototype.refresh = function () {
		if (this._core.$element.is(':visible') === this._visible) {
			return;
		}

		this._visible = !this._visible;

		this._core.$element.toggleClass('owl-hidden', !this._visible);

		this._visible && (this._core.invalidate('width') && this._core.refresh());
	};

	/**
	 * Destroys the plugin.
	 */
	AutoRefresh.prototype.destroy = function () {
		var handler, property;

		window.clearInterval(this._interval);

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.AutoRefresh = AutoRefresh;

})(window.Zepto || window.jQuery, window, document);

/**
 * Lazy Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function ($, window, document, undefined) {

	/**
	 * Creates the lazy plugin.
	 * @class The Lazy Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Lazy = function (carousel) {

		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Already loaded items.
		 * @protected
		 * @type {Array.<jQuery>}
		 */
		this._loaded = [];

		/**
		 * Event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel change.owl.carousel resized.owl.carousel': $.proxy(function (e) {
				if (!e.namespace) {
					return;
				}

				if (!this._core.settings || !this._core.settings.lazyLoad) {
					return;
				}

				if ((e.property && e.property.name == 'position') || e.type == 'initialized') {
					var settings = this._core.settings,
						n = (settings.center && Math.ceil(settings.items / 2) || settings.items),
						i = ((settings.center && n * -1) || 0),
						position = (e.property && e.property.value !== undefined ? e.property.value : this._core.current()) + i,
						clones = this._core.clones().length,
						load = $.proxy(function (i, v) {
							this.load(v)
						}, this);

					while (i++ < n) {
						this.load(clones / 2 + this._core.relative(position));
						clones && $.each(this._core.clones(this._core.relative(position)), load);
						position++;
					}
				}
			}, this)
		};

		// set the default options
		this._core.options = $.extend({}, Lazy.Defaults, this._core.options);

		// register event handler
		this._core.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	Lazy.Defaults = {
		lazyLoad: false
	};

	/**
	 * Loads all resources of an item at the specified position.
	 * @param {Number} position - The absolute position of the item.
	 * @protected
	 */
	Lazy.prototype.load = function (position) {
		var $item = this._core.$stage.children().eq(position),
			$elements = $item && $item.find('.owl-lazy');

		if (!$elements || $.inArray($item.get(0), this._loaded) > -1) {
			return;
		}

		$elements.each($.proxy(function (index, element) {
			var $element = $(element),
				image,
				url = (window.devicePixelRatio > 1 && $element.attr('data-src-retina')) || $element.attr('data-src');

			this._core.trigger('load', {
				element: $element,
				url: url
			}, 'lazy');

			if ($element.is('img')) {
				$element.one('load.owl.lazy', $.proxy(function () {
					$element.css('opacity', 1);
					this._core.trigger('loaded', {
						element: $element,
						url: url
					}, 'lazy');
				}, this)).attr('src', url);
			} else {
				image = new Image();
				image.onload = $.proxy(function () {
					$element.css({
						'background-image': 'url(' + url + ')',
						'opacity': '1'
					});
					this._core.trigger('loaded', {
						element: $element,
						url: url
					}, 'lazy');
				}, this);
				image.src = url;
			}
		}, this));

		this._loaded.push($item.get(0));
	};

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Lazy.prototype.destroy = function () {
		var handler, property;

		for (handler in this.handlers) {
			this._core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Lazy = Lazy;

})(window.Zepto || window.jQuery, window, document);

/**
 * AutoHeight Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function ($, window, document, undefined) {

	/**
	 * Creates the auto height plugin.
	 * @class The Auto Height Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var AutoHeight = function (carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel refreshed.owl.carousel': $.proxy(function (e) {
				if (e.namespace && this._core.settings.autoHeight) {
					this.update();
				}
			}, this),
			'changed.owl.carousel': $.proxy(function (e) {
				if (e.namespace && this._core.settings.autoHeight && e.property.name == 'position') {
					this.update();
				}
			}, this),
			'loaded.owl.lazy': $.proxy(function (e) {
				if (e.namespace && this._core.settings.autoHeight && e.element.closest('.' + this._core.settings.itemClass).index() === this._core.current()) {
					this.update();
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, AutoHeight.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	AutoHeight.Defaults = {
		autoHeight: false,
		autoHeightClass: 'owl-height'
	};

	/**
	 * Updates the view.
	 */
	AutoHeight.prototype.update = function () {
		var start = this._core._current,
			end = start + this._core.settings.items,
			visible = this._core.$stage.children().toArray().slice(start, end),
			heights = [],
			maxheight = 0;

		$.each(visible, function (index, item) {
			heights.push($(item).height());
		});

		maxheight = Math.max.apply(null, heights);

		this._core.$stage.parent()
			.height(maxheight)
			.addClass(this._core.settings.autoHeightClass);
	};

	AutoHeight.prototype.destroy = function () {
		var handler, property;

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.AutoHeight = AutoHeight;

})(window.Zepto || window.jQuery, window, document);

/**
 * Video Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function ($, window, document, undefined) {

	/**
	 * Creates the video plugin.
	 * @class The Video Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Video = function (carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Cache all video URLs.
		 * @protected
		 * @type {Object}
		 */
		this._videos = {};

		/**
		 * Current playing item.
		 * @protected
		 * @type {jQuery}
		 */
		this._playing = null;

		/**
		 * All event handlers.
		 * @todo The cloned content removale is too late
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function (e) {
				if (e.namespace) {
					this._core.register({
						type: 'state',
						name: 'playing',
						tags: ['interacting']
					});
				}
			}, this),
			'resize.owl.carousel': $.proxy(function (e) {
				if (e.namespace && this._core.settings.video && this.isInFullScreen()) {
					e.preventDefault();
				}
			}, this),
			'refreshed.owl.carousel': $.proxy(function (e) {
				if (e.namespace && this._core.is('resizing')) {
					this._core.$stage.find('.cloned .owl-video-frame').remove();
				}
			}, this),
			'changed.owl.carousel': $.proxy(function (e) {
				if (e.namespace && e.property.name === 'position' && this._playing) {
					this.stop();
				}
			}, this),
			'prepared.owl.carousel': $.proxy(function (e) {
				if (!e.namespace) {
					return;
				}

				var $element = $(e.content).find('.owl-video');

				if ($element.length) {
					$element.css('display', 'none');
					this.fetch($element, $(e.content));
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Video.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);

		this._core.$element.on('click.owl.video', '.owl-video-play-icon', $.proxy(function (e) {
			this.play(e);
		}, this));
	};

	/**
	 * Default options.
	 * @public
	 */
	Video.Defaults = {
		video: false,
		videoHeight: false,
		videoWidth: false
	};

	/**
	 * Gets the video ID and the type (YouTube/Vimeo/vzaar only).
	 * @protected
	 * @param {jQuery} target - The target containing the video data.
	 * @param {jQuery} item - The item containing the video.
	 */
	Video.prototype.fetch = function (target, item) {
		var type = (function () {
			if (target.attr('data-vimeo-id')) {
				return 'vimeo';
			} else if (target.attr('data-vzaar-id')) {
				return 'vzaar'
			} else {
				return 'youtube';
			}
		})(),
			id = target.attr('data-vimeo-id') || target.attr('data-youtube-id') || target.attr('data-vzaar-id'),
			width = target.attr('data-width') || this._core.settings.videoWidth,
			height = target.attr('data-height') || this._core.settings.videoHeight,
			url = target.attr('href');

		if (url) {

			/*
					Parses the id's out of the following urls (and probably more):
					https://www.youtube.com/watch?v=:id
					https://youtu.be/:id
					https://vimeo.com/:id
					https://vimeo.com/channels/:channel/:id
					https://vimeo.com/groups/:group/videos/:id
					https://app.vzaar.com/videos/:id

					Visual example: http://regexper.com/#(http%3A%7Chttps%3A%7C)%5C%2F%5C%2F(player.%7Cwww.%7Capp.)%3F(vimeo%5C.com%7Cyoutu(be%5C.com%7C%5C.be%7Cbe%5C.googleapis%5C.com)%7Cvzaar%5C.com)%5C%2F(video%5C%2F%7Cvideos%5C%2F%7Cembed%5C%2F%7Cchannels%5C%2F.%2B%5C%2F%7Cgroups%5C%2F.%2B%5C%2F%7Cwatch%5C%3Fv%3D%7Cv%5C%2F)%3F(%5BA-Za-z0-9._%25-%5D*)(%5C%26%5CS%2B)%3F
			*/

			id = url.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

			if (id[3].indexOf('youtu') > -1) {
				type = 'youtube';
			} else if (id[3].indexOf('vimeo') > -1) {
				type = 'vimeo';
			} else if (id[3].indexOf('vzaar') > -1) {
				type = 'vzaar';
			} else {
				throw new Error('Video URL not supported.');
			}
			id = id[6];
		} else {
			throw new Error('Missing video URL.');
		}

		this._videos[url] = {
			type: type,
			id: id,
			width: width,
			height: height
		};

		item.attr('data-video', url);

		this.thumbnail(target, this._videos[url]);
	};

	/**
	 * Creates video thumbnail.
	 * @protected
	 * @param {jQuery} target - The target containing the video data.
	 * @param {Object} info - The video info object.
	 * @see `fetch`
	 */
	Video.prototype.thumbnail = function (target, video) {
		var tnLink,
			icon,
			path,
			dimensions = video.width && video.height ? 'style="width:' + video.width + 'px;height:' + video.height + 'px;"' : '',
			customTn = target.find('img'),
			srcType = 'src',
			lazyClass = '',
			settings = this._core.settings,
			create = function (path) {
				icon = '<div class="owl-video-play-icon"></div>';

				if (settings.lazyLoad) {
					tnLink = '<div class="owl-video-tn ' + lazyClass + '" ' + srcType + '="' + path + '"></div>';
				} else {
					tnLink = '<div class="owl-video-tn" style="opacity:1;background-image:url(' + path + ')"></div>';
				}
				target.after(tnLink);
				target.after(icon);
			};

		// wrap video content into owl-video-wrapper div
		target.wrap('<div class="owl-video-wrapper"' + dimensions + '></div>');

		if (this._core.settings.lazyLoad) {
			srcType = 'data-src';
			lazyClass = 'owl-lazy';
		}

		// custom thumbnail
		if (customTn.length) {
			create(customTn.attr(srcType));
			customTn.remove();
			return false;
		}

		if (video.type === 'youtube') {
			path = "//img.youtube.com/vi/" + video.id + "/hqdefault.jpg";
			create(path);
		} else if (video.type === 'vimeo') {
			$.ajax({
				type: 'GET',
				url: '//vimeo.com/api/v2/video/' + video.id + '.json',
				jsonp: 'callback',
				dataType: 'jsonp',
				success: function (data) {
					path = data[0].thumbnail_large;
					create(path);
				}
			});
		} else if (video.type === 'vzaar') {
			$.ajax({
				type: 'GET',
				url: '//vzaar.com/api/videos/' + video.id + '.json',
				jsonp: 'callback',
				dataType: 'jsonp',
				success: function (data) {
					path = data.framegrab_url;
					create(path);
				}
			});
		}
	};

	/**
	 * Stops the current video.
	 * @public
	 */
	Video.prototype.stop = function () {
		this._core.trigger('stop', null, 'video');
		this._playing.find('.owl-video-frame').remove();
		this._playing.removeClass('owl-video-playing');
		this._playing = null;
		this._core.leave('playing');
		this._core.trigger('stopped', null, 'video');
	};

	/**
	 * Starts the current video.
	 * @public
	 * @param {Event} event - The event arguments.
	 */
	Video.prototype.play = function (event) {
		var target = $(event.target),
			item = target.closest('.' + this._core.settings.itemClass),
			video = this._videos[item.attr('data-video')],
			width = video.width || '100%',
			height = video.height || this._core.$stage.height(),
			html;

		if (this._playing) {
			return;
		}

		this._core.enter('playing');
		this._core.trigger('play', null, 'video');

		item = this._core.items(this._core.relative(item.index()));

		this._core.reset(item.index());

		if (video.type === 'youtube') {
			html = '<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/embed/' +
				video.id + '?autoplay=1&v=' + video.id + '" frameborder="0" allowfullscreen></iframe>';
		} else if (video.type === 'vimeo') {
			html = '<iframe src="//player.vimeo.com/video/' + video.id +
				'?autoplay=1" width="' + width + '" height="' + height +
				'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
		} else if (video.type === 'vzaar') {
			html = '<iframe frameborder="0"' + 'height="' + height + '"' + 'width="' + width +
				'" allowfullscreen mozallowfullscreen webkitAllowFullScreen ' +
				'src="//view.vzaar.com/' + video.id + '/player?autoplay=true"></iframe>';
		}

		$('<div class="owl-video-frame">' + html + '</div>').insertAfter(item.find('.owl-video'));

		this._playing = item.addClass('owl-video-playing');
	};

	/**
	 * Checks whether an video is currently in full screen mode or not.
	 * @todo Bad style because looks like a readonly method but changes members.
	 * @protected
	 * @returns {Boolean}
	 */
	Video.prototype.isInFullScreen = function () {
		var element = document.fullscreenElement || document.mozFullScreenElement ||
			document.webkitFullscreenElement;

		return element && $(element).parent().hasClass('owl-video-frame');
	};

	/**
	 * Destroys the plugin.
	 */
	Video.prototype.destroy = function () {
		var handler, property;

		this._core.$element.off('click.owl.video');

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Video = Video;

})(window.Zepto || window.jQuery, window, document);

/**
 * Animate Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function ($, window, document, undefined) {

	/**
	 * Creates the animate plugin.
	 * @class The Navigation Plugin
	 * @param {Owl} scope - The Owl Carousel
	 */
	var Animate = function (scope) {
		this.core = scope;
		this.core.options = $.extend({}, Animate.Defaults, this.core.options);
		this.swapping = true;
		this.previous = undefined;
		this.next = undefined;

		this.handlers = {
			'change.owl.carousel': $.proxy(function (e) {
				if (e.namespace && e.property.name == 'position') {
					this.previous = this.core.current();
					this.next = e.property.value;
				}
			}, this),
			'drag.owl.carousel dragged.owl.carousel translated.owl.carousel': $.proxy(function (e) {
				if (e.namespace) {
					this.swapping = e.type == 'translated';
				}
			}, this),
			'translate.owl.carousel': $.proxy(function (e) {
				if (e.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn)) {
					this.swap();
				}
			}, this)
		};

		this.core.$element.on(this.handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	Animate.Defaults = {
		animateOut: false,
		animateIn: false
	};

	/**
	 * Toggles the animation classes whenever an translations starts.
	 * @protected
	 * @returns {Boolean|undefined}
	 */
	Animate.prototype.swap = function () {

		if (this.core.settings.items !== 1) {
			return;
		}

		if (!$.support.animation || !$.support.transition) {
			return;
		}

		this.core.speed(0);

		var left,
			clear = $.proxy(this.clear, this),
			previous = this.core.$stage.children().eq(this.previous),
			next = this.core.$stage.children().eq(this.next),
			incoming = this.core.settings.animateIn,
			outgoing = this.core.settings.animateOut;

		if (this.core.current() === this.previous) {
			return;
		}

		if (outgoing) {
			left = this.core.coordinates(this.previous) - this.core.coordinates(this.next);
			previous.one($.support.animation.end, clear)
				.css({
					'left': left + 'px'
				})
				.addClass('animated owl-animated-out')
				.addClass(outgoing);
		}

		if (incoming) {
			next.one($.support.animation.end, clear)
				.addClass('animated owl-animated-in')
				.addClass(incoming);
		}
	};

	Animate.prototype.clear = function (e) {
		$(e.target).css({
			'left': ''
		})
			.removeClass('animated owl-animated-out owl-animated-in')
			.removeClass(this.core.settings.animateIn)
			.removeClass(this.core.settings.animateOut);
		this.core.onTransitionEnd();
	};

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Animate.prototype.destroy = function () {
		var handler, property;

		for (handler in this.handlers) {
			this.core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Animate = Animate;

})(window.Zepto || window.jQuery, window, document);

/**
 * Autoplay Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function ($, window, document, undefined) {

	/**
	 * Creates the autoplay plugin.
	 * @class The Autoplay Plugin
	 * @param {Owl} scope - The Owl Carousel
	 */
	var Autoplay = function (carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * The autoplay timeout.
		 * @type {Timeout}
		 */
		this._timeout = null;

		/**
		 * Indicates whenever the autoplay is paused.
		 * @type {Boolean}
		 */
		this._paused = false;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'changed.owl.carousel': $.proxy(function (e) {
				if (e.namespace && e.property.name === 'settings') {
					if (this._core.settings.autoplay) {
						this.play();
					} else {
						this.stop();
					}
				} else if (e.namespace && e.property.name === 'position') {
					//console.log('play?', e);
					if (this._core.settings.autoplay) {
						this._setAutoPlayInterval();
					}
				}
			}, this),
			'initialized.owl.carousel': $.proxy(function (e) {
				if (e.namespace && this._core.settings.autoplay) {
					this.play();
				}
			}, this),
			'play.owl.autoplay': $.proxy(function (e, t, s) {
				if (e.namespace) {
					this.play(t, s);
				}
			}, this),
			'stop.owl.autoplay': $.proxy(function (e) {
				if (e.namespace) {
					this.stop();
				}
			}, this),
			'mouseover.owl.autoplay': $.proxy(function () {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.pause();
				}
			}, this),
			'mouseleave.owl.autoplay': $.proxy(function () {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.play();
				}
			}, this),
			'touchstart.owl.core': $.proxy(function () {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.pause();
				}
			}, this),
			'touchend.owl.core': $.proxy(function () {
				if (this._core.settings.autoplayHoverPause) {
					this.play();
				}
			}, this)
		};

		// register event handlers
		this._core.$element.on(this._handlers);

		// set default options
		this._core.options = $.extend({}, Autoplay.Defaults, this._core.options);
	};

	/**
	 * Default options.
	 * @public
	 */
	Autoplay.Defaults = {
		autoplay: false,
		autoplayTimeout: 5000,
		autoplayHoverPause: false,
		autoplaySpeed: false
	};

	/**
	 * Starts the autoplay.
	 * @public
	 * @param {Number} [timeout] - The interval before the next animation starts.
	 * @param {Number} [speed] - The animation speed for the animations.
	 */
	Autoplay.prototype.play = function (timeout, speed) {
		this._paused = false;

		if (this._core.is('rotating')) {
			return;
		}

		this._core.enter('rotating');

		this._setAutoPlayInterval();
	};

	/**
	 * Gets a new timeout
	 * @private
	 * @param {Number} [timeout] - The interval before the next animation starts.
	 * @param {Number} [speed] - The animation speed for the animations.
	 * @return {Timeout}
	 */
	Autoplay.prototype._getNextTimeout = function (timeout, speed) {
		if (this._timeout) {
			window.clearTimeout(this._timeout);
		}
		return window.setTimeout($.proxy(function () {
			if (this._paused || this._core.is('busy') || this._core.is('interacting') || document.hidden) {
				return;
			}
			this._core.next(speed || this._core.settings.autoplaySpeed);
		}, this), timeout || this._core.settings.autoplayTimeout);
	};

	/**
	 * Sets autoplay in motion.
	 * @private
	 */
	Autoplay.prototype._setAutoPlayInterval = function () {
		this._timeout = this._getNextTimeout();
	};

	/**
	 * Stops the autoplay.
	 * @public
	 */
	Autoplay.prototype.stop = function () {
		if (!this._core.is('rotating')) {
			return;
		}

		window.clearTimeout(this._timeout);
		this._core.leave('rotating');
	};

	/**
	 * Stops the autoplay.
	 * @public
	 */
	Autoplay.prototype.pause = function () {
		if (!this._core.is('rotating')) {
			return;
		}

		this._paused = true;
	};

	/**
	 * Destroys the plugin.
	 */
	Autoplay.prototype.destroy = function () {
		var handler, property;

		this.stop();

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.autoplay = Autoplay;

})(window.Zepto || window.jQuery, window, document);

/**
 * Navigation Plugin
 * @version 2.1.0
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function ($, window, document, undefined) {
	'use strict';

	/**
	 * Creates the navigation plugin.
	 * @class The Navigation Plugin
	 * @param {Owl} carousel - The Owl Carousel.
	 */
	var Navigation = function (carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Indicates whether the plugin is initialized or not.
		 * @protected
		 * @type {Boolean}
		 */
		this._initialized = false;

		/**
		 * The current paging indexes.
		 * @protected
		 * @type {Array}
		 */
		this._pages = [];

		/**
		 * All DOM elements of the user interface.
		 * @protected
		 * @type {Object}
		 */
		this._controls = {};

		/**
		 * Markup for an indicator.
		 * @protected
		 * @type {Array.<String>}
		 */
		this._templates = [];

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * Overridden methods of the carousel.
		 * @protected
		 * @type {Object}
		 */
		this._overrides = {
			next: this._core.next,
			prev: this._core.prev,
			to: this._core.to
		};

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'prepared.owl.carousel': $.proxy(function (e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.push('<div class="' + this._core.settings.dotClass + '">' +
						$(e.content).find('[data-dot]').addBack('[data-dot]').attr('data-dot') + '</div>');
				}
			}, this),
			'added.owl.carousel': $.proxy(function (e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.splice(e.position, 0, this._templates.pop());
				}
			}, this),
			'remove.owl.carousel': $.proxy(function (e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.splice(e.position, 1);
				}
			}, this),
			'changed.owl.carousel': $.proxy(function (e) {
				if (e.namespace && e.property.name == 'position') {
					this.draw();
				}
			}, this),
			'initialized.owl.carousel': $.proxy(function (e) {
				if (e.namespace && !this._initialized) {
					this._core.trigger('initialize', null, 'navigation');
					this.initialize();
					this.update();
					this.draw();
					this._initialized = true;
					this._core.trigger('initialized', null, 'navigation');
				}
			}, this),
			'refreshed.owl.carousel': $.proxy(function (e) {
				if (e.namespace && this._initialized) {
					this._core.trigger('refresh', null, 'navigation');
					this.update();
					this.draw();
					this._core.trigger('refreshed', null, 'navigation');
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Navigation.Defaults, this._core.options);

		// register event handlers
		this.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 * @todo Rename `slideBy` to `navBy`
	 */
	Navigation.Defaults = {
		nav: false,
		navText: ['prev', 'next'],
		navSpeed: false,
		navElement: 'div',
		navContainer: false,
		navContainerClass: 'owl-nav',
		navClass: ['owl-prev', 'owl-next'],
		slideBy: 1,
		dotClass: 'owl-dot',
		dotsClass: 'owl-dots',
		dots: true,
		dotsEach: false,
		dotsData: false,
		dotsSpeed: false,
		dotsContainer: false
	};

	/**
	 * Initializes the layout of the plugin and extends the carousel.
	 * @protected
	 */
	Navigation.prototype.initialize = function () {
		var override,
			settings = this._core.settings;

		// create DOM structure for relative navigation
		this._controls.$relative = (settings.navContainer ? $(settings.navContainer) : $('<div>').addClass(settings.navContainerClass).appendTo(this.$element)).addClass('disabled');

		this._controls.$previous = $('<' + settings.navElement + '>')
			.addClass(settings.navClass[0])
			.html(settings.navText[0])
			.prependTo(this._controls.$relative)
			.on('click', $.proxy(function (e) {
				this.prev(settings.navSpeed);
			}, this));
		this._controls.$next = $('<' + settings.navElement + '>')
			.addClass(settings.navClass[1])
			.html(settings.navText[1])
			.appendTo(this._controls.$relative)
			.on('click', $.proxy(function (e) {
				this.next(settings.navSpeed);
			}, this));

		// create DOM structure for absolute navigation
		if (!settings.dotsData) {
			this._templates = [$('<div>')
				.addClass(settings.dotClass)
				.append($('<span>'))
				.prop('outerHTML')
			];
		}

		this._controls.$absolute = (settings.dotsContainer ? $(settings.dotsContainer) : $('<div>').addClass(settings.dotsClass).appendTo(this.$element)).addClass('disabled');

		this._controls.$absolute.on('click', 'div', $.proxy(function (e) {
			var index = $(e.target).parent().is(this._controls.$absolute) ? $(e.target).index() : $(e.target).parent().index();

			e.preventDefault();

			this.to(index, settings.dotsSpeed);
		}, this));

		// override public methods of the carousel
		for (override in this._overrides) {
			this._core[override] = $.proxy(this[override], this);
		}
	};

	/**
	 * Destroys the plugin.
	 * @protected
	 */
	Navigation.prototype.destroy = function () {
		var handler, control, property, override;

		for (handler in this._handlers) {
			this.$element.off(handler, this._handlers[handler]);
		}
		for (control in this._controls) {
			this._controls[control].remove();
		}
		for (override in this.overides) {
			this._core[override] = this._overrides[override];
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	/**
	 * Updates the internal state.
	 * @protected
	 */
	Navigation.prototype.update = function () {
		var i, j, k,
			lower = this._core.clones().length / 2,
			upper = lower + this._core.items().length,
			maximum = this._core.maximum(true),
			settings = this._core.settings,
			size = settings.center || settings.autoWidth || settings.dotsData ? 1 : settings.dotsEach || settings.items;

		if (settings.slideBy !== 'page') {
			settings.slideBy = Math.min(settings.slideBy, settings.items);
		}

		if (settings.dots || settings.slideBy == 'page') {
			this._pages = [];

			for (i = lower, j = 0, k = 0; i < upper; i++) {
				if (j >= size || j === 0) {
					this._pages.push({
						start: Math.min(maximum, i - lower),
						end: i - lower + size - 1
					});
					if (Math.min(maximum, i - lower) === maximum) {
						break;
					}
					j = 0, ++k;
				}
				j += this._core.mergers(this._core.relative(i));
			}
		}
	};

	/**
	 * Draws the user interface.
	 * @todo The option `dotsData` wont work.
	 * @protected
	 */
	Navigation.prototype.draw = function () {
		var difference,
			settings = this._core.settings,
			disabled = this._core.items().length <= settings.items,
			index = this._core.relative(this._core.current()),
			loop = settings.loop || settings.rewind;

		this._controls.$relative.toggleClass('disabled', !settings.nav || disabled);

		if (settings.nav) {
			this._controls.$previous.toggleClass('disabled', !loop && index <= this._core.minimum(true));
			this._controls.$next.toggleClass('disabled', !loop && index >= this._core.maximum(true));
		}

		this._controls.$absolute.toggleClass('disabled', !settings.dots || disabled);

		if (settings.dots) {
			difference = this._pages.length - this._controls.$absolute.children().length;

			if (settings.dotsData && difference !== 0) {
				this._controls.$absolute.html(this._templates.join(''));
			} else if (difference > 0) {
				this._controls.$absolute.append(new Array(difference + 1).join(this._templates[0]));
			} else if (difference < 0) {
				this._controls.$absolute.children().slice(difference).remove();
			}

			this._controls.$absolute.find('.active').removeClass('active');
			this._controls.$absolute.children().eq($.inArray(this.current(), this._pages)).addClass('active');
		}
	};

	/**
	 * Extends event data.
	 * @protected
	 * @param {Event} event - The event object which gets thrown.
	 */
	Navigation.prototype.onTrigger = function (event) {
		var settings = this._core.settings;

		event.page = {
			index: $.inArray(this.current(), this._pages),
			count: this._pages.length,
			size: settings && (settings.center || settings.autoWidth || settings.dotsData ? 1 : settings.dotsEach || settings.items)
		};
	};

	/**
	 * Gets the current page position of the carousel.
	 * @protected
	 * @returns {Number}
	 */
	Navigation.prototype.current = function () {
		var current = this._core.relative(this._core.current());
		return $.grep(this._pages, $.proxy(function (page, index) {
			return page.start <= current && page.end >= current;
		}, this)).pop();
	};

	/**
	 * Gets the current succesor/predecessor position.
	 * @protected
	 * @returns {Number}
	 */
	Navigation.prototype.getPosition = function (successor) {
		var position, length,
			settings = this._core.settings;

		if (settings.slideBy == 'page') {
			position = $.inArray(this.current(), this._pages);
			length = this._pages.length;
			successor ? ++position : --position;
			position = this._pages[((position % length) + length) % length].start;
		} else {
			position = this._core.relative(this._core.current());
			length = this._core.items().length;
			successor ? position += settings.slideBy : position -= settings.slideBy;
		}

		return position;
	};

	/**
	 * Slides to the next item or page.
	 * @public
	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
	 */
	Navigation.prototype.next = function (speed) {
		$.proxy(this._overrides.to, this._core)(this.getPosition(true), speed);
	};

	/**
	 * Slides to the previous item or page.
	 * @public
	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
	 */
	Navigation.prototype.prev = function (speed) {
		$.proxy(this._overrides.to, this._core)(this.getPosition(false), speed);
	};

	/**
	 * Slides to the specified item or page.
	 * @public
	 * @param {Number} position - The position of the item or page.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 * @param {Boolean} [standard=false] - Whether to use the standard behaviour or not.
	 */
	Navigation.prototype.to = function (position, speed, standard) {
		var length;

		if (!standard && this._pages.length) {
			length = this._pages.length;
			$.proxy(this._overrides.to, this._core)(this._pages[((position % length) + length) % length].start, speed);
		} else {
			$.proxy(this._overrides.to, this._core)(position, speed);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Navigation = Navigation;

})(window.Zepto || window.jQuery, window, document);

/**
 * Hash Plugin
 * @version 2.1.0
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function ($, window, document, undefined) {
	'use strict';

	/**
	 * Creates the hash plugin.
	 * @class The Hash Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Hash = function (carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Hash index for the items.
		 * @protected
		 * @type {Object}
		 */
		this._hashes = {};

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function (e) {
				if (e.namespace && this._core.settings.startPosition === 'URLHash') {
					$(window).trigger('hashchange.owl.navigation');
				}
			}, this),
			'prepared.owl.carousel': $.proxy(function (e) {
				if (e.namespace) {
					var hash = $(e.content).find('[data-hash]').addBack('[data-hash]').attr('data-hash');

					if (!hash) {
						return;
					}

					this._hashes[hash] = e.content;
				}
			}, this),
			'changed.owl.carousel': $.proxy(function (e) {
				if (e.namespace && e.property.name === 'position') {
					var current = this._core.items(this._core.relative(this._core.current())),
						hash = $.map(this._hashes, function (item, hash) {
							return item === current ? hash : null;
						}).join();

					if (!hash || window.location.hash.slice(1) === hash) {
						return;
					}

					window.location.hash = hash;
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Hash.Defaults, this._core.options);

		// register the event handlers
		this.$element.on(this._handlers);

		// register event listener for hash navigation
		$(window).on('hashchange.owl.navigation', $.proxy(function (e) {
			var hash = window.location.hash.substring(1),
				items = this._core.$stage.children(),
				position = this._hashes[hash] && items.index(this._hashes[hash]);

			if (position === undefined || position === this._core.current()) {
				return;
			}

			this._core.to(this._core.relative(position), false, true);
		}, this));
	};

	/**
	 * Default options.
	 * @public
	 */
	Hash.Defaults = {
		URLhashListener: false
	};

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Hash.prototype.destroy = function () {
		var handler, property;

		$(window).off('hashchange.owl.navigation');

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Hash = Hash;

})(window.Zepto || window.jQuery, window, document);

/**
 * Support Plugin
 *
 * @version 2.1.0
 * @author Vivid Planet Software GmbH
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function ($, window, document, undefined) {

	var style = $('<support>').get(0).style,
		prefixes = 'Webkit Moz O ms'.split(' '),
		events = {
			transition: {
				end: {
					WebkitTransition: 'webkitTransitionEnd',
					MozTransition: 'transitionend',
					OTransition: 'oTransitionEnd',
					transition: 'transitionend'
				}
			},
			animation: {
				end: {
					WebkitAnimation: 'webkitAnimationEnd',
					MozAnimation: 'animationend',
					OAnimation: 'oAnimationEnd',
					animation: 'animationend'
				}
			}
		},
		tests = {
			csstransforms: function () {
				return !!test('transform');
			},
			csstransforms3d: function () {
				return !!test('perspective');
			},
			csstransitions: function () {
				return !!test('transition');
			},
			cssanimations: function () {
				return !!test('animation');
			}
		};

	function test(property, prefixed) {
		var result = false,
			upper = property.charAt(0).toUpperCase() + property.slice(1);

		$.each((property + ' ' + prefixes.join(upper + ' ') + upper).split(' '), function (i, property) {
			if (style[property] !== undefined) {
				result = prefixed ? property : true;
				return false;
			}
		});

		return result;
	}

	function prefixed(property) {
		return test(property, true);
	}

	if (tests.csstransitions()) {
		/* jshint -W053 */
		$.support.transition = new String(prefixed('transition'))
		$.support.transition.end = events.transition.end[$.support.transition];
	}

	if (tests.cssanimations()) {
		/* jshint -W053 */
		$.support.animation = new String(prefixed('animation'))
		$.support.animation.end = events.animation.end[$.support.animation];
	}

	if (tests.csstransforms()) {
		/* jshint -W053 */
		$.support.transform = new String(prefixed('transform'));
		$.support.transform3d = tests.csstransforms3d();
	}

})(window.Zepto || window.jQuery, window, document);

/*********************************************************************
 *  #### Twitter Post Fetcher v16.0.2 ####
 *  Coded by Jason Mayes 2015. A present to all the developers out there.
 *  www.jasonmayes.com
 *  Please keep this disclaimer with my code if you use it. Thanks. :-)
 *  Got feedback or questions, ask here:
 *  http://www.jasonmayes.com/projects/twitterApi/
 *  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
 *  Updates will be posted to this site.
 *********************************************************************/
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		// Browser globals.
		factory();
	}
}(this, function () {
	var domNode = '';
	var maxTweets = 20;
	var parseLinks = true;
	var queue = [];
	var inProgress = false;
	var printTime = true;
	var printUser = true;
	var formatterFunction = null;
	var supportsClassName = true;
	var showRts = true;
	var customCallbackFunction = null;
	var showInteractionLinks = true;
	var showImages = false;
	var targetBlank = true;
	var lang = 'en';
	var permalinks = true;
	var dataOnly = false;
	var script = null;
	var scriptAdded = false;

	function handleTweets(tweets) {
		if (customCallbackFunction === null) {
			var x = tweets.length;
			var n = 0;
			var element = document.getElementById(domNode);
			var html = '<ul>';
			while (n < x) {
				html += '<li>' + tweets[n] + '</li>';
				n++;
			}
			html += '</ul>';
			element.innerHTML = html;
		} else {
			customCallbackFunction(tweets);
		}
	}

	function strip(data) {
		return data.replace(/<b[^>]*>(.*?)<\/b>/gi, function (a, s) {
			return s;
		})
			.replace(/class="(?!(tco-hidden|tco-display|tco-ellipsis))+.*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi,
				'');
	}

	function targetLinksToNewWindow(el) {
		var links = el.getElementsByTagName('a');
		for (var i = links.length - 1; i >= 0; i--) {
			links[i].setAttribute('target', '_blank');
		}
	}

	function getElementsByClassName(node, classname) {
		var a = [];
		var regex = new RegExp('(^| )' + classname + '( |$)');
		var elems = node.getElementsByTagName('*');
		for (var i = 0, j = elems.length; i < j; i++) {
			if (regex.test(elems[i].className)) {
				a.push(elems[i]);
			}
		}
		return a;
	}

	function extractImageUrl(image_data) {
		if (image_data !== undefined && image_data.innerHTML.indexOf('data-srcset') >= 0) {
			var data_src = image_data.innerHTML
				.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0];
			return decodeURIComponent(data_src).split('"')[1];
		}
	}

	var twitterFetcher = {
		fetch: function (config) {
			if (config.maxTweets === undefined) {
				config.maxTweets = 20;
			}
			if (config.enableLinks === undefined) {
				config.enableLinks = true;
			}
			if (config.showUser === undefined) {
				config.showUser = true;
			}
			if (config.showTime === undefined) {
				config.showTime = true;
			}
			if (config.dateFunction === undefined) {
				config.dateFunction = 'default';
			}
			if (config.showRetweet === undefined) {
				config.showRetweet = true;
			}
			if (config.customCallback === undefined) {
				config.customCallback = null;
			}
			if (config.showInteraction === undefined) {
				config.showInteraction = true;
			}
			if (config.showImages === undefined) {
				config.showImages = false;
			}
			if (config.linksInNewWindow === undefined) {
				config.linksInNewWindow = true;
			}
			if (config.showPermalinks === undefined) {
				config.showPermalinks = true;
			}
			if (config.dataOnly === undefined) {
				config.dataOnly = false;
			}

			if (inProgress) {
				queue.push(config);
			} else {
				inProgress = true;

				domNode = config.domId;
				maxTweets = config.maxTweets;
				parseLinks = config.enableLinks;
				printUser = config.showUser;
				printTime = config.showTime;
				showRts = config.showRetweet;
				formatterFunction = config.dateFunction;
				customCallbackFunction = config.customCallback;
				showInteractionLinks = config.showInteraction;
				showImages = config.showImages;
				targetBlank = config.linksInNewWindow;
				permalinks = config.showPermalinks;
				dataOnly = config.dataOnly;

				var head = document.getElementsByTagName('head')[0];
				if (script !== null) {
					head.removeChild(script);
				}
				script = document.createElement('script');
				script.type = 'text/javascript';
				if (config.list !== undefined) {
					script.src = 'https://syndication.twitter.com/timeline/list?' +
						'callback=twitterFetcher.callback&dnt=false&list_slug=' +
						config.list.listSlug + '&screen_name=' + config.list.screenName +
						'&suppress_response_codes=true&lang=' + (config.lang || lang) +
						'&rnd=' + Math.random();
				} else if (config.profile !== undefined) {
					script.src = 'https://syndication.twitter.com/timeline/profile?' +
						'callback=twitterFetcher.callback&dnt=false' +
						'&screen_name=' + config.profile.screenName +
						'&suppress_response_codes=true&lang=' + (config.lang || lang) +
						'&rnd=' + Math.random();
				} else if (config.likes !== undefined) {
					script.src = 'https://syndication.twitter.com/timeline/likes?' +
						'callback=twitterFetcher.callback&dnt=false' +
						'&screen_name=' + config.likes.screenName +
						'&suppress_response_codes=true&lang=' + (config.lang || lang) +
						'&rnd=' + Math.random();
				} else {
					script.src = 'https://cdn.syndication.twimg.com/widgets/timelines/' +
						config.id + '?&lang=' + (config.lang || lang) +
						'&callback=twitterFetcher.callback&' +
						'suppress_response_codes=true&rnd=' + Math.random();
				}
				head.appendChild(script);
			}
		},
		callback: function (data) {
			// Remove emoji and summary card images.
			data.body = data.body.replace(/(<img[^c]*class="Emoji[^>]*>)|(<img[^c]*class="u-block[^>]*>)/g, '');
			// Remove display images.
			if (!showImages) {
				data.body = data.body.replace(/(<img[^c]*class="NaturalImage-image[^>]*>|(<img[^c]*class="CroppedImage-image[^>]*>))/g, '');
			}
			// Remove avatar images.
			if (!printUser) {
				data.body = data.body.replace(/(<img[^c]*class="Avatar"[^>]*>)/g, '');
			}

			var div = document.createElement('div');
			div.innerHTML = data.body;
			if (typeof (div.getElementsByClassName) === 'undefined') {
				supportsClassName = false;
			}

			function swapDataSrc(element) {
				var avatarImg = element.getElementsByTagName('img')[0];
				avatarImg.src = avatarImg.getAttribute('data-src-2x');
				return element;
			}

			var tweets = [];
			var authors = [];
			var times = [];
			var images = [];
			var rts = [];
			var tids = [];
			var permalinksURL = [];
			var x = 0;

			if (supportsClassName) {
				var tmp = div.getElementsByClassName('timeline-Tweet');
				while (x < tmp.length) {
					if (tmp[x].getElementsByClassName('timeline-Tweet-retweetCredit').length > 0) {
						rts.push(true);
					} else {
						rts.push(false);
					}
					if (!rts[x] || rts[x] && showRts) {
						tweets.push(tmp[x].getElementsByClassName('timeline-Tweet-text')[0]);
						tids.push(tmp[x].getAttribute('data-tweet-id'));
						if (printUser) {
							authors.push(swapDataSrc(tmp[x].getElementsByClassName('timeline-Tweet-author')[0]));
						}
						times.push(tmp[x].getElementsByClassName('dt-updated')[0]);
						permalinksURL.push(tmp[x].getElementsByClassName('timeline-Tweet-timestamp')[0]);
						if (tmp[x].getElementsByClassName('timeline-Tweet-media')[0] !==
							undefined) {
							images.push(tmp[x].getElementsByClassName('timeline-Tweet-media')[0]);
						} else {
							images.push(undefined);
						}
					}
					x++;
				}
			} else {
				var tmp = getElementsByClassName(div, 'timeline-Tweet');
				while (x < tmp.length) {
					if (getElementsByClassName(tmp[x], 'timeline-Tweet-retweetCredit').length > 0) {
						rts.push(true);
					} else {
						rts.push(false);
					}
					if (!rts[x] || rts[x] && showRts) {
						tweets.push(getElementsByClassName(tmp[x], 'timeline-Tweet-text')[0]);
						tids.push(tmp[x].getAttribute('data-tweet-id'));
						if (printUser) {
							authors.push(swapDataSrc(getElementsByClassName(tmp[x], 'timeline-Tweet-author')[0]));
						}
						times.push(getElementsByClassName(tmp[x], 'dt-updated')[0]);
						permalinksURL.push(getElementsByClassName(tmp[x], 'timeline-Tweet-timestamp')[0]);
						if (getElementsByClassName(tmp[x], 'timeline-Tweet-media')[0] !== undefined) {
							images.push(getElementsByClassName(tmp[x], 'timeline-Tweet-media')[0]);
						} else {
							images.push(undefined);
						}
					}
					x++;
				}
			}

			if (tweets.length > maxTweets) {
				tweets.splice(maxTweets, (tweets.length - maxTweets));
				authors.splice(maxTweets, (authors.length - maxTweets));
				times.splice(maxTweets, (times.length - maxTweets));
				rts.splice(maxTweets, (rts.length - maxTweets));
				images.splice(maxTweets, (images.length - maxTweets));
				permalinksURL.splice(maxTweets, (permalinksURL.length - maxTweets));
			}

			var arrayTweets = [];
			var x = tweets.length;
			var n = 0;
			if (dataOnly) {
				while (n < x) {
					arrayTweets.push({
						tweet: tweets[n].innerHTML,
						author: authors[n].innerHTML,
						time: times[n].textContent,
						image: extractImageUrl(images[n]),
						rt: rts[n],
						tid: tids[n],
						permalinkURL: (permalinksURL[n] === undefined) ?
							'' : permalinksURL[n].href
					});
					n++;
				}
			} else {
				while (n < x) {
					if (typeof (formatterFunction) !== 'string') {
						var datetimeText = times[n].getAttribute('datetime');
						var newDate = new Date(times[n].getAttribute('datetime')
							.replace(/-/g, '/').replace('T', ' ').split('+')[0]);
						var dateString = formatterFunction(newDate, datetimeText);
						times[n].setAttribute('aria-label', dateString);

						if (tweets[n].textContent) {
							// IE hack.
							if (supportsClassName) {
								times[n].textContent = dateString;
							} else {
								var h = document.createElement('p');
								var t = document.createTextNode(dateString);
								h.appendChild(t);
								h.setAttribute('aria-label', dateString);
								times[n] = h;
							}
						} else {
							times[n].textContent = dateString;
						}
					}
					var op = '';
					if (parseLinks) {
						if (targetBlank) {
							targetLinksToNewWindow(tweets[n]);
							if (printUser) {
								targetLinksToNewWindow(authors[n]);
							}
						}
						if (printUser) {
							op += '<div class="user">' + strip(authors[n].innerHTML) +
								'</div>';
						}
						op += '<p class="tweet">' + strip(tweets[n].innerHTML) + '</p>';
						if (printTime) {
							if (permalinks) {
								op += '<p class="timePosted"><a href="' + permalinksURL[n] +
									'">' + times[n].getAttribute('aria-label') + '</a></p>';
							} else {
								op += '<p class="timePosted">' +
									times[n].getAttribute('aria-label') + '</p>';
							}
						}
					} else {
						if (tweets[n].textContent) {
							if (printUser) {
								op += '<p class="user">' + authors[n].textContent + '</p>';
							}
							op += '<p class="tweet">' + tweets[n].textContent + '</p>';
							if (printTime) {
								op += '<p class="timePosted">' + times[n].textContent + '</p>';
							}

						} else {
							if (printUser) {
								op += '<p class="user">' + authors[n].textContent + '</p>';
							}
							op += '<p class="tweet">' + tweets[n].textContent + '</p>';
							if (printTime) {
								op += '<p class="timePosted">' + times[n].textContent + '</p>';
							}
						}
					}
					if (showInteractionLinks) {
						op += '<p class="interact"><a href="https://twitter.com/intent/' +
							'tweet?in_reply_to=' + tids[n] +
							'" class="twitter_reply_icon"' +
							(targetBlank ? ' target="_blank">' : '>') +
							'Reply</a><a href="https://twitter.com/intent/retweet?' +
							'tweet_id=' + tids[n] + '" class="twitter_retweet_icon"' +
							(targetBlank ? ' target="_blank">' : '>') + 'Retweet</a>' +
							'<a href="https://twitter.com/intent/favorite?tweet_id=' +
							tids[n] + '" class="twitter_fav_icon"' +
							(targetBlank ? ' target="_blank">' : '>') + 'Favorite</a></p>';
					}
					if (showImages && images[n] !== undefined && extractImageUrl(images[n]) !== undefined) {
						op += '<div class="media">' +
							'<img src="' + extractImageUrl(images[n]) +
							'" alt="Image from tweet" />' + '</div>';
					}
					if (showImages) {
						arrayTweets.push(op);
					} else if (!showImages && tweets[n].textContent.length) {
						arrayTweets.push(op);
					}

					n++;
				}
			}

			handleTweets(arrayTweets);
			inProgress = false;

			if (queue.length > 0) {
				twitterFetcher.fetch(queue[0]);
				queue.splice(0, 1);
			}
		}
	};

	// It must be a global variable because it will be called by JSONP.
	window.twitterFetcher = twitterFetcher;
	return twitterFetcher;
}));

/**********************
   Velocity UI Pack
**********************/

/* VelocityJS.org UI Pack (5.0.4). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License. Portions copyright Daniel Eden, Christian Pucci. */

;
(function (factory) {
	/* CommonJS module. */
	if (typeof require === "function" && typeof exports === "object") {
		module.exports = factory();
		/* AMD module. */
	} else if (typeof define === "function" && define.amd) {
		define(["velocity"], factory);
		/* Browser globals. */
	} else {
		factory();
	}
}(function () {
	return function (global, window, document, undefined) {

		/*************
			Checks
		*************/

		if (!global.Velocity || !global.Velocity.Utilities) {
			window.console && console.log("Velocity UI Pack: Velocity must be loaded first. Aborting.");
			return;
		} else {
			var Velocity = global.Velocity,
				$ = Velocity.Utilities;
		}

		var velocityVersion = Velocity.version,
			requiredVersion = {
				major: 1,
				minor: 1,
				patch: 0
			};

		function greaterSemver(primary, secondary) {
			var versionInts = [];

			if (!primary || !secondary) {
				return false;
			}

			$.each([primary, secondary], function (i, versionObject) {
				var versionIntsComponents = [];

				$.each(versionObject, function (component, value) {
					while (value.toString().length < 5) {
						value = "0" + value;
					}
					versionIntsComponents.push(value);
				});

				versionInts.push(versionIntsComponents.join(""))
			});

			return (parseFloat(versionInts[0]) > parseFloat(versionInts[1]));
		}

		if (greaterSemver(requiredVersion, velocityVersion)) {
			var abortError = "Velocity UI Pack: You need to update Velocity (jquery.velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity.";
			alert(abortError);
			throw new Error(abortError);
		}

		/************************
		   Effect Registration
		************************/

		/* Note: RegisterUI is a legacy name. */
		Velocity.RegisterEffect = Velocity.RegisterUI = function (effectName, properties) {
			/* Animate the expansion/contraction of the elements' parent's height for In/Out effects. */
			function animateParentHeight(elements, direction, totalDuration, stagger) {
				var totalHeightDelta = 0,
					parentNode;

				/* Sum the total height (including padding and margin) of all targeted elements. */
				$.each(elements.nodeType ? [elements] : elements, function (i, element) {
					if (stagger) {
						/* Increase the totalDuration by the successive delay amounts produced by the stagger option. */
						totalDuration += i * stagger;
					}

					parentNode = element.parentNode;

					$.each(["height", "paddingTop", "paddingBottom", "marginTop", "marginBottom"], function (i, property) {
						totalHeightDelta += parseFloat(Velocity.CSS.getPropertyValue(element, property));
					});
				});

				/* Animate the parent element's height adjustment (with a varying duration multiplier for aesthetic benefits). */
				Velocity.animate(
					parentNode, {
					height: (direction === "In" ? "+" : "-") + "=" + totalHeightDelta
				}, {
					queue: false,
					easing: "ease-in-out",
					duration: totalDuration * (direction === "In" ? 0.6 : 1)
				}
				);
			}

			/* Register a custom redirect for each effect. */
			Velocity.Redirects[effectName] = function (element, redirectOptions, elementsIndex, elementsSize, elements, promiseData) {
				var finalElement = (elementsIndex === elementsSize - 1);

				if (typeof properties.defaultDuration === "function") {
					properties.defaultDuration = properties.defaultDuration.call(elements, elements);
				} else {
					properties.defaultDuration = parseFloat(properties.defaultDuration);
				}

				/* Iterate through each effect's call array. */
				for (var callIndex = 0; callIndex < properties.calls.length; callIndex++) {
					var call = properties.calls[callIndex],
						propertyMap = call[0],
						redirectDuration = (redirectOptions.duration || properties.defaultDuration || 1000),
						durationPercentage = call[1],
						callOptions = call[2] || {},
						opts = {};

					/* Assign the whitelisted per-call options. */
					opts.duration = redirectDuration * (durationPercentage || 1);
					opts.queue = redirectOptions.queue || "";
					opts.easing = callOptions.easing || "ease";
					opts.delay = parseFloat(callOptions.delay) || 0;
					opts._cacheValues = callOptions._cacheValues || true;

					/* Special processing for the first effect call. */
					if (callIndex === 0) {
						/* If a delay was passed into the redirect, combine it with the first call's delay. */
						opts.delay += (parseFloat(redirectOptions.delay) || 0);

						if (elementsIndex === 0) {
							opts.begin = function () {
								/* Only trigger a begin callback on the first effect call with the first element in the set. */
								redirectOptions.begin && redirectOptions.begin.call(elements, elements);

								var direction = effectName.match(/(In|Out)$/);

								/* Make "in" transitioning elements invisible immediately so that there's no FOUC between now
								   and the first RAF tick. */
								if ((direction && direction[0] === "In") && propertyMap.opacity !== undefined) {
									$.each(elements.nodeType ? [elements] : elements, function (i, element) {
										Velocity.CSS.setPropertyValue(element, "opacity", 0);
									});
								}

								/* Only trigger animateParentHeight() if we're using an In/Out transition. */
								if (redirectOptions.animateParentHeight && direction) {
									animateParentHeight(elements, direction[0], redirectDuration + opts.delay, redirectOptions.stagger);
								}
							}
						}

						/* If the user isn't overriding the display option, default to "auto" for "In"-suffixed transitions. */
						if (redirectOptions.display !== null) {
							if (redirectOptions.display !== undefined && redirectOptions.display !== "none") {
								opts.display = redirectOptions.display;
							} else if (/In$/.test(effectName)) {
								/* Inline elements cannot be subjected to transforms, so we switch them to inline-block. */
								var defaultDisplay = Velocity.CSS.Values.getDisplayType(element);
								opts.display = (defaultDisplay === "inline") ? "inline-block" : defaultDisplay;
							}
						}

						if (redirectOptions.visibility && redirectOptions.visibility !== "hidden") {
							opts.visibility = redirectOptions.visibility;
						}
					}

					/* Special processing for the last effect call. */
					if (callIndex === properties.calls.length - 1) {
						/* Append promise resolving onto the user's redirect callback. */
						function injectFinalCallbacks() {
							if ((redirectOptions.display === undefined || redirectOptions.display === "none") && /Out$/.test(effectName)) {
								$.each(elements.nodeType ? [elements] : elements, function (i, element) {
									Velocity.CSS.setPropertyValue(element, "display", "none");
								});
							}

							redirectOptions.complete && redirectOptions.complete.call(elements, elements);

							if (promiseData) {
								promiseData.resolver(elements || element);
							}
						}

						opts.complete = function () {
							if (properties.reset) {
								for (var resetProperty in properties.reset) {
									var resetValue = properties.reset[resetProperty];

									/* Format each non-array value in the reset property map to [ value, value ] so that changes apply
									   immediately and DOM querying is avoided (via forcefeeding). */
									/* Note: Don't forcefeed hooks, otherwise their hook roots will be defaulted to their null values. */
									if (Velocity.CSS.Hooks.registered[resetProperty] === undefined && (typeof resetValue === "string" || typeof resetValue === "number")) {
										properties.reset[resetProperty] = [properties.reset[resetProperty], properties.reset[resetProperty]];
									}
								}

								/* So that the reset values are applied instantly upon the next rAF tick, use a zero duration and parallel queueing. */
								var resetOptions = {
									duration: 0,
									queue: false
								};

								/* Since the reset option uses up the complete callback, we trigger the user's complete callback at the end of ours. */
								if (finalElement) {
									resetOptions.complete = injectFinalCallbacks;
								}

								Velocity.animate(element, properties.reset, resetOptions);
								/* Only trigger the user's complete callback on the last effect call with the last element in the set. */
							} else if (finalElement) {
								injectFinalCallbacks();
							}
						};

						if (redirectOptions.visibility === "hidden") {
							opts.visibility = redirectOptions.visibility;
						}
					}

					Velocity.animate(element, propertyMap, opts);
				}
			};

			/* Return the Velocity object so that RegisterUI calls can be chained. */
			return Velocity;
		};

		/*********************
		   Packaged Effects
		*********************/

		/* Externalize the packagedEffects data so that they can optionally be modified and re-registered. */
		/* Support: <=IE8: Callouts will have no effect, and transitions will simply fade in/out. IE9/Android 2.3: Most effects are fully supported, the rest fade in/out. All other browsers: full support. */
		Velocity.RegisterEffect.packagedEffects = {
			/* Animate.css */
			"callout.bounce": {
				defaultDuration: 550,
				calls: [
					[{
						translateY: -30
					}, 0.25],
					[{
						translateY: 0
					}, 0.125],
					[{
						translateY: -15
					}, 0.125],
					[{
						translateY: 0
					}, 0.25]
				]
			},
			/* Animate.css */
			"callout.shake": {
				defaultDuration: 800,
				calls: [
					[{
						translateX: -11
					}, 0.125],
					[{
						translateX: 11
					}, 0.125],
					[{
						translateX: -11
					}, 0.125],
					[{
						translateX: 11
					}, 0.125],
					[{
						translateX: -11
					}, 0.125],
					[{
						translateX: 11
					}, 0.125],
					[{
						translateX: -11
					}, 0.125],
					[{
						translateX: 0
					}, 0.125]
				]
			},
			/* Animate.css */
			"callout.flash": {
				defaultDuration: 1100,
				calls: [
					[{
						opacity: [0, "easeInOutQuad", 1]
					}, 0.25],
					[{
						opacity: [1, "easeInOutQuad"]
					}, 0.25],
					[{
						opacity: [0, "easeInOutQuad"]
					}, 0.25],
					[{
						opacity: [1, "easeInOutQuad"]
					}, 0.25]
				]
			},
			/* Animate.css */
			"callout.pulse": {
				defaultDuration: 825,
				calls: [
					[{
						scaleX: 1.1,
						scaleY: 1.1
					}, 0.50, {
						easing: "easeInExpo"
					}],
					[{
						scaleX: 1,
						scaleY: 1
					}, 0.50]
				]
			},
			/* Animate.css */
			"callout.swing": {
				defaultDuration: 950,
				calls: [
					[{
						rotateZ: 15
					}, 0.20],
					[{
						rotateZ: -10
					}, 0.20],
					[{
						rotateZ: 5
					}, 0.20],
					[{
						rotateZ: -5
					}, 0.20],
					[{
						rotateZ: 0
					}, 0.20]
				]
			},
			/* Animate.css */
			"callout.tada": {
				defaultDuration: 1000,
				calls: [
					[{
						scaleX: 0.9,
						scaleY: 0.9,
						rotateZ: -3
					}, 0.10],
					[{
						scaleX: 1.1,
						scaleY: 1.1,
						rotateZ: 3
					}, 0.10],
					[{
						scaleX: 1.1,
						scaleY: 1.1,
						rotateZ: -3
					}, 0.10],
					["reverse", 0.125],
					["reverse", 0.125],
					["reverse", 0.125],
					["reverse", 0.125],
					["reverse", 0.125],
					[{
						scaleX: 1,
						scaleY: 1,
						rotateZ: 0
					}, 0.20]
				]
			},
			"transition.fadeIn": {
				defaultDuration: 500,
				calls: [
					[{
						opacity: [1, 0]
					}]
				]
			},
			"transition.fadeOut": {
				defaultDuration: 500,
				calls: [
					[{
						opacity: [0, 1]
					}]
				]
			},
			/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
			"transition.flipXIn": {
				defaultDuration: 700,
				calls: [
					[{
						opacity: [1, 0],
						transformPerspective: [800, 800],
						rotateY: [0, -55]
					}]
				],
				reset: {
					transformPerspective: 0
				}
			},
			/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
			"transition.flipXOut": {
				defaultDuration: 700,
				calls: [
					[{
						opacity: [0, 1],
						transformPerspective: [800, 800],
						rotateY: 55
					}]
				],
				reset: {
					transformPerspective: 0,
					rotateY: 0
				}
			},
			/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
			"transition.flipYIn": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [1, 0],
						transformPerspective: [800, 800],
						rotateX: [0, -45]
					}]
				],
				reset: {
					transformPerspective: 0
				}
			},
			/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
			"transition.flipYOut": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [0, 1],
						transformPerspective: [800, 800],
						rotateX: 25
					}]
				],
				reset: {
					transformPerspective: 0,
					rotateX: 0
				}
			},
			/* Animate.css */
			/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
			"transition.flipBounceXIn": {
				defaultDuration: 900,
				calls: [
					[{
						opacity: [0.725, 0],
						transformPerspective: [400, 400],
						rotateY: [-10, 90]
					}, 0.50],
					[{
						opacity: 0.80,
						rotateY: 10
					}, 0.25],
					[{
						opacity: 1,
						rotateY: 0
					}, 0.25]
				],
				reset: {
					transformPerspective: 0
				}
			},
			/* Animate.css */
			/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
			"transition.flipBounceXOut": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [0.9, 1],
						transformPerspective: [400, 400],
						rotateY: -10
					}, 0.50],
					[{
						opacity: 0,
						rotateY: 90
					}, 0.50]
				],
				reset: {
					transformPerspective: 0,
					rotateY: 0
				}
			},
			/* Animate.css */
			/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
			"transition.flipBounceYIn": {
				defaultDuration: 850,
				calls: [
					[{
						opacity: [0.725, 0],
						transformPerspective: [400, 400],
						rotateX: [-10, 90]
					}, 0.50],
					[{
						opacity: 0.80,
						rotateX: 10
					}, 0.25],
					[{
						opacity: 1,
						rotateX: 0
					}, 0.25]
				],
				reset: {
					transformPerspective: 0
				}
			},
			/* Animate.css */
			/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
			"transition.flipBounceYOut": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [0.9, 1],
						transformPerspective: [400, 400],
						rotateX: -15
					}, 0.50],
					[{
						opacity: 0,
						rotateX: 90
					}, 0.50]
				],
				reset: {
					transformPerspective: 0,
					rotateX: 0
				}
			},
			/* Magic.css */
			"transition.swoopIn": {
				defaultDuration: 850,
				calls: [
					[{
						opacity: [1, 0],
						transformOriginX: ["100%", "50%"],
						transformOriginY: ["100%", "100%"],
						scaleX: [1, 0],
						scaleY: [1, 0],
						translateX: [0, -700],
						translateZ: 0
					}]
				],
				reset: {
					transformOriginX: "50%",
					transformOriginY: "50%"
				}
			},
			/* Magic.css */
			"transition.swoopOut": {
				defaultDuration: 850,
				calls: [
					[{
						opacity: [0, 1],
						transformOriginX: ["50%", "100%"],
						transformOriginY: ["100%", "100%"],
						scaleX: 0,
						scaleY: 0,
						translateX: -700,
						translateZ: 0
					}]
				],
				reset: {
					transformOriginX: "50%",
					transformOriginY: "50%",
					scaleX: 1,
					scaleY: 1,
					translateX: 0
				}
			},
			/* Magic.css */
			/* Support: Loses rotation in IE9/Android 2.3. (Fades and scales only.) */
			"transition.whirlIn": {
				defaultDuration: 850,
				calls: [
					[{
						opacity: [1, 0],
						transformOriginX: ["50%", "50%"],
						transformOriginY: ["50%", "50%"],
						scaleX: [1, 0],
						scaleY: [1, 0],
						rotateY: [0, 160]
					}, 1, {
						easing: "easeInOutSine"
					}]
				]
			},
			/* Magic.css */
			/* Support: Loses rotation in IE9/Android 2.3. (Fades and scales only.) */
			"transition.whirlOut": {
				defaultDuration: 750,
				calls: [
					[{
						opacity: [0, "easeInOutQuint", 1],
						transformOriginX: ["50%", "50%"],
						transformOriginY: ["50%", "50%"],
						scaleX: 0,
						scaleY: 0,
						rotateY: 160
					}, 1, {
						easing: "swing"
					}]
				],
				reset: {
					scaleX: 1,
					scaleY: 1,
					rotateY: 0
				}
			},
			"transition.shrinkIn": {
				defaultDuration: 750,
				calls: [
					[{
						opacity: [1, 0],
						transformOriginX: ["50%", "50%"],
						transformOriginY: ["50%", "50%"],
						scaleX: [1, 1.5],
						scaleY: [1, 1.5],
						translateZ: 0
					}]
				]
			},
			"transition.shrinkOut": {
				defaultDuration: 600,
				calls: [
					[{
						opacity: [0, 1],
						transformOriginX: ["50%", "50%"],
						transformOriginY: ["50%", "50%"],
						scaleX: 1.3,
						scaleY: 1.3,
						translateZ: 0
					}]
				],
				reset: {
					scaleX: 1,
					scaleY: 1
				}
			},
			"transition.expandIn": {
				defaultDuration: 700,
				calls: [
					[{
						opacity: [1, 0],
						transformOriginX: ["50%", "50%"],
						transformOriginY: ["50%", "50%"],
						scaleX: [1, 0.625],
						scaleY: [1, 0.625],
						translateZ: 0
					}]
				]
			},
			"transition.expandOut": {
				defaultDuration: 700,
				calls: [
					[{
						opacity: [0, 1],
						transformOriginX: ["50%", "50%"],
						transformOriginY: ["50%", "50%"],
						scaleX: 0.5,
						scaleY: 0.5,
						translateZ: 0
					}]
				],
				reset: {
					scaleX: 1,
					scaleY: 1
				}
			},
			/* Animate.css */
			"transition.bounceIn": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [1, 0],
						scaleX: [1.05, 0.3],
						scaleY: [1.05, 0.3]
					}, 0.40],
					[{
						scaleX: 0.9,
						scaleY: 0.9,
						translateZ: 0
					}, 0.20],
					[{
						scaleX: 1,
						scaleY: 1
					}, 0.50]
				]
			},
			/* Animate.css */
			"transition.bounceOut": {
				defaultDuration: 800,
				calls: [
					[{
						scaleX: 0.95,
						scaleY: 0.95
					}, 0.35],
					[{
						scaleX: 1.1,
						scaleY: 1.1,
						translateZ: 0
					}, 0.35],
					[{
						opacity: [0, 1],
						scaleX: 0.3,
						scaleY: 0.3
					}, 0.30]
				],
				reset: {
					scaleX: 1,
					scaleY: 1
				}
			},
			/* Animate.css */
			"transition.bounceUpIn": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [1, 0],
						translateY: [-30, 1000]
					}, 0.60, {
						easing: "easeOutCirc"
					}],
					[{
						translateY: 10
					}, 0.20],
					[{
						translateY: 0
					}, 0.20]
				]
			},
			/* Animate.css */
			"transition.bounceUpOut": {
				defaultDuration: 1000,
				calls: [
					[{
						translateY: 20
					}, 0.20],
					[{
						opacity: [0, "easeInCirc", 1],
						translateY: -1000
					}, 0.80]
				],
				reset: {
					translateY: 0
				}
			},
			/* Animate.css */
			"transition.bounceDownIn": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [1, 0],
						translateY: [30, -1000]
					}, 0.60, {
						easing: "easeOutCirc"
					}],
					[{
						translateY: -10
					}, 0.20],
					[{
						translateY: 0
					}, 0.20]
				]
			},
			/* Animate.css */
			"transition.bounceDownOut": {
				defaultDuration: 1000,
				calls: [
					[{
						translateY: -20
					}, 0.20],
					[{
						opacity: [0, "easeInCirc", 1],
						translateY: 1000
					}, 0.80]
				],
				reset: {
					translateY: 0
				}
			},
			/* Animate.css */
			"transition.bounceLeftIn": {
				defaultDuration: 750,
				calls: [
					[{
						opacity: [1, 0],
						translateX: [30, -1250]
					}, 0.60, {
						easing: "easeOutCirc"
					}],
					[{
						translateX: -10
					}, 0.20],
					[{
						translateX: 0
					}, 0.20]
				]
			},
			/* Animate.css */
			"transition.bounceLeftOut": {
				defaultDuration: 750,
				calls: [
					[{
						translateX: 30
					}, 0.20],
					[{
						opacity: [0, "easeInCirc", 1],
						translateX: -1250
					}, 0.80]
				],
				reset: {
					translateX: 0
				}
			},
			/* Animate.css */
			"transition.bounceRightIn": {
				defaultDuration: 750,
				calls: [
					[{
						opacity: [1, 0],
						translateX: [-30, 1250]
					}, 0.60, {
						easing: "easeOutCirc"
					}],
					[{
						translateX: 10
					}, 0.20],
					[{
						translateX: 0
					}, 0.20]
				]
			},
			/* Animate.css */
			"transition.bounceRightOut": {
				defaultDuration: 750,
				calls: [
					[{
						translateX: -30
					}, 0.20],
					[{
						opacity: [0, "easeInCirc", 1],
						translateX: 1250
					}, 0.80]
				],
				reset: {
					translateX: 0
				}
			},
			"transition.slideUpIn": {
				defaultDuration: 900,
				calls: [
					[{
						opacity: [1, 0],
						translateY: [0, 20],
						translateZ: 0
					}]
				]
			},
			"transition.slideUpOut": {
				defaultDuration: 900,
				calls: [
					[{
						opacity: [0, 1],
						translateY: -20,
						translateZ: 0
					}]
				],
				reset: {
					translateY: 0
				}
			},
			"transition.slideDownIn": {
				defaultDuration: 900,
				calls: [
					[{
						opacity: [1, 0],
						translateY: [0, -20],
						translateZ: 0
					}]
				]
			},
			"transition.slideDownOut": {
				defaultDuration: 900,
				calls: [
					[{
						opacity: [0, 1],
						translateY: 20,
						translateZ: 0
					}]
				],
				reset: {
					translateY: 0
				}
			},
			"transition.slideLeftIn": {
				defaultDuration: 1000,
				calls: [
					[{
						opacity: [1, 0],
						translateX: [0, -20],
						translateZ: 0
					}]
				]
			},
			"transition.slideLeftOut": {
				defaultDuration: 1050,
				calls: [
					[{
						opacity: [0, 1],
						translateX: -20,
						translateZ: 0
					}]
				],
				reset: {
					translateX: 0
				}
			},
			"transition.slideRightIn": {
				defaultDuration: 1000,
				calls: [
					[{
						opacity: [1, 0],
						translateX: [0, 20],
						translateZ: 0
					}]
				]
			},
			"transition.slideRightOut": {
				defaultDuration: 1050,
				calls: [
					[{
						opacity: [0, 1],
						translateX: 20,
						translateZ: 0
					}]
				],
				reset: {
					translateX: 0
				}
			},
			"transition.slideUpBigIn": {
				defaultDuration: 850,
				calls: [
					[{
						opacity: [1, 0],
						translateY: [0, 75],
						translateZ: 0
					}]
				]
			},
			"transition.slideUpBigOut": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [0, 1],
						translateY: -75,
						translateZ: 0
					}]
				],
				reset: {
					translateY: 0
				}
			},
			"transition.slideDownBigIn": {
				defaultDuration: 850,
				calls: [
					[{
						opacity: [1, 0],
						translateY: [0, -75],
						translateZ: 0
					}]
				]
			},
			"transition.slideDownBigOut": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [0, 1],
						translateY: 75,
						translateZ: 0
					}]
				],
				reset: {
					translateY: 0
				}
			},
			"transition.slideLeftBigIn": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [1, 0],
						translateX: [0, -75],
						translateZ: 0
					}]
				]
			},
			"transition.slideLeftBigOut": {
				defaultDuration: 750,
				calls: [
					[{
						opacity: [0, 1],
						translateX: -75,
						translateZ: 0
					}]
				],
				reset: {
					translateX: 0
				}
			},
			"transition.slideRightBigIn": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [1, 0],
						translateX: [0, 75],
						translateZ: 0
					}]
				]
			},
			"transition.slideRightBigOut": {
				defaultDuration: 750,
				calls: [
					[{
						opacity: [0, 1],
						translateX: 75,
						translateZ: 0
					}]
				],
				reset: {
					translateX: 0
				}
			},
			/* Magic.css */
			"transition.perspectiveUpIn": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [1, 0],
						transformPerspective: [800, 800],
						transformOriginX: [0, 0],
						transformOriginY: ["100%", "100%"],
						rotateX: [0, -180]
					}]
				],
				reset: {
					transformPerspective: 0,
					transformOriginX: "50%",
					transformOriginY: "50%"
				}
			},
			/* Magic.css */
			/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
			"transition.perspectiveUpOut": {
				defaultDuration: 850,
				calls: [
					[{
						opacity: [0, 1],
						transformPerspective: [800, 800],
						transformOriginX: [0, 0],
						transformOriginY: ["100%", "100%"],
						rotateX: -180
					}]
				],
				reset: {
					transformPerspective: 0,
					transformOriginX: "50%",
					transformOriginY: "50%",
					rotateX: 0
				}
			},
			/* Magic.css */
			/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
			"transition.perspectiveDownIn": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [1, 0],
						transformPerspective: [800, 800],
						transformOriginX: [0, 0],
						transformOriginY: [0, 0],
						rotateX: [0, 180]
					}]
				],
				reset: {
					transformPerspective: 0,
					transformOriginX: "50%",
					transformOriginY: "50%"
				}
			},
			/* Magic.css */
			/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
			"transition.perspectiveDownOut": {
				defaultDuration: 850,
				calls: [
					[{
						opacity: [0, 1],
						transformPerspective: [800, 800],
						transformOriginX: [0, 0],
						transformOriginY: [0, 0],
						rotateX: 180
					}]
				],
				reset: {
					transformPerspective: 0,
					transformOriginX: "50%",
					transformOriginY: "50%",
					rotateX: 0
				}
			},
			/* Magic.css */
			/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
			"transition.perspectiveLeftIn": {
				defaultDuration: 950,
				calls: [
					[{
						opacity: [1, 0],
						transformPerspective: [2000, 2000],
						transformOriginX: [0, 0],
						transformOriginY: [0, 0],
						rotateY: [0, -180]
					}]
				],
				reset: {
					transformPerspective: 0,
					transformOriginX: "50%",
					transformOriginY: "50%"
				}
			},
			/* Magic.css */
			/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
			"transition.perspectiveLeftOut": {
				defaultDuration: 950,
				calls: [
					[{
						opacity: [0, 1],
						transformPerspective: [2000, 2000],
						transformOriginX: [0, 0],
						transformOriginY: [0, 0],
						rotateY: -180
					}]
				],
				reset: {
					transformPerspective: 0,
					transformOriginX: "50%",
					transformOriginY: "50%",
					rotateY: 0
				}
			},
			/* Magic.css */
			/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
			"transition.perspectiveRightIn": {
				defaultDuration: 950,
				calls: [
					[{
						opacity: [1, 0],
						transformPerspective: [2000, 2000],
						transformOriginX: ["100%", "100%"],
						transformOriginY: [0, 0],
						rotateY: [0, 180]
					}]
				],
				reset: {
					transformPerspective: 0,
					transformOriginX: "50%",
					transformOriginY: "50%"
				}
			},
			/* Magic.css */
			/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
			"transition.perspectiveRightOut": {
				defaultDuration: 950,
				calls: [
					[{
						opacity: [0, 1],
						transformPerspective: [2000, 2000],
						transformOriginX: ["100%", "100%"],
						transformOriginY: [0, 0],
						rotateY: 180
					}]
				],
				reset: {
					transformPerspective: 0,
					transformOriginX: "50%",
					transformOriginY: "50%",
					rotateY: 0
				}
			}
		};

		/* Register the packaged effects. */
		for (var effectName in Velocity.RegisterEffect.packagedEffects) {
			Velocity.RegisterEffect(effectName, Velocity.RegisterEffect.packagedEffects[effectName]);
		}

		/*********************
		   Sequence Running
		**********************/

		/* Note: Sequence calls must use Velocity's single-object arguments syntax. */
		Velocity.RunSequence = function (originalSequence) {
			var sequence = $.extend(true, [], originalSequence);

			if (sequence.length > 1) {
				$.each(sequence.reverse(), function (i, currentCall) {
					var nextCall = sequence[i + 1];

					if (nextCall) {
						/* Parallel sequence calls (indicated via sequenceQueue:false) are triggered
						   in the previous call's begin callback. Otherwise, chained calls are normally triggered
						   in the previous call's complete callback. */
						var currentCallOptions = currentCall.o || currentCall.options,
							nextCallOptions = nextCall.o || nextCall.options;

						var timing = (currentCallOptions && currentCallOptions.sequenceQueue === false) ? "begin" : "complete",
							callbackOriginal = nextCallOptions && nextCallOptions[timing],
							options = {};

						options[timing] = function () {
							var nextCallElements = nextCall.e || nextCall.elements;
							var elements = nextCallElements.nodeType ? [nextCallElements] : nextCallElements;

							callbackOriginal && callbackOriginal.call(elements, elements);
							Velocity(currentCall);
						}

						if (nextCall.o) {
							nextCall.o = $.extend({}, nextCallOptions, options);
						} else {
							nextCall.options = $.extend({}, nextCallOptions, options);
						}
					}
				});

				sequence.reverse();
			}

			Velocity(sequence[0]);
		};
	}((window.jQuery || window.Zepto || window), window, document);
}));
/* jshint undef: true, unused: true, browser: true, strict: true */
/* global jQuery, twitterFetcher, google */

(function ($) {
	"use strict";

	// Module name: Scroll Top
	// Dependencies: no dependencies
	(function () {
		var scrollButton = $('.js-scroll-top');

		scrollButton.on("click", function (e) {
			e.preventDefault();
			$("html, body").animate({
				scrollTop: "0px"
			}, 2000);
		});
	})();

	// Module name: Scroll To
	// Dependencies: no dependencies
	(function () {
		var buttons = $('.js-scroll-to');

		buttons.each(function () {
			var button = $(this);
			var target = button.attr('href');
			var speed = button.data('speed') ? button.data('speed') : 1000;

			if (typeof target !== 'undefined' && $(target).length) {
				button.on('click', function (event) {
					event.preventDefault();

					$('html, body').animate({
						scrollTop: $(target).first().offset().top - $('.js-header').outerHeight()
					}, speed);
				});
			}
		});
	})();
	// Block name: Accordion
	// Dependencies: no dependencies
	(function () {
		$(".js-accordion").each(function () {
			var accordion = $(this);
			var select = {
				title: ".accordion__title",
				content: ".accordion__content"
			};

			var title = accordion.find(select.title);

			title.on('click', function (event) {
				event.preventDefault();
				$(this).toggleClass('accordion__title--active').parent().find(select.content).slideToggle();
			});
		});
	})();
	// Block name: Contact Form
	// Dependencies: jquery.form-validator.js
	// Docs: https://github.com/victorjonsson/jQuery-Form-Validator
	(function () {
		(function () {
			var form = $('.js-contact-form');

			if (form.length) {
				var submitForm = function ($form) {
					var formURL = $form.attr("action"); // Get the form's action
					var postData = $form.serialize(); // Serialize the form's data
					var successMessage = $('.js-contact-form__modal'); // Select the success modal

					// Submit an AJAX request
					$.ajax({
						url: formURL,
						type: "POST",
						data: postData,
						success: function () {
							// On success clear the data from the inputs
							$form.find('input:text, textarea').val('');
							// Show the success modal for 2 seconds
							successMessage.fadeIn().delay(2000).fadeOut();
						}
					});

					// Prevent form default behavior
					return false;
				};

				// Validate the contact form, if succeeded, call the submitForm function
				$.validate({
					form: form,
					onSuccess: submitForm,
					errorElementClass: "has-error",
					scrollToTopOnError: false
				});
			}
		})();
	})();
	// Block name: Carousel
	// Dependencies: owl.carousel.js
	// Docs: https://github.com/OwlCarousel2/OwlCarousel2
	(function () {
		$(".js-carousel").each(function () {
			var carousel = $(this);

			carousel.on('initialized.owl.carousel', function () {
				$(this).find('.owl-item.active:first, .owl-item.active:last').addClass('has-fade');
			}).owlCarousel({
				loop: true,
				responsive: {
					0: {
						items: 3
					},
					768: {
						items: 4
					},
					991: {
						items: 5
					},
					1200: {
						items: 7
					}
				}
			}).on("drag.owl.carousel", function () {
				$(this).find('.has-fade').removeClass('has-fade');
			}).on("dragged.owl.carousel", function () {
				$(this).find('.owl-item.active:first, .owl-item.active:last').addClass('has-fade');
			});
		});

	})();
	// Block name: Header
	// Dependencies: no dependencies
	// Docs: 
	(function () {
		var header = $(".js-header").first();
		var logo = header.find('.js-logo__image');

		var updateHeader = function () {
			if ($(window).scrollTop() === 0) {
				header.removeClass('header--fixed');
				if (logo.data('switch') === true) {
					logo.attr("src", "assets/img/logo/logo.png");
				}
			} else {
				header.addClass('header--fixed');
				if (logo.data('switch') === true) {
					logo.attr("src", "assets/img/logo/logo.png");
				}
			}
		};

		if (header.length) {
			updateHeader();
		}

		$(window).scroll(function () {
			updateHeader();
		});

	})();
	// Block name: Map
	// Dependencies: Google Maps API
	// Docs: https://developers.google.com/maps/
	(function () {
		var initialize = function () {
			if ($('#map').length) {
				var mapBlock = document.getElementById('map');
				var myLatlng = new google.maps.LatLng($(mapBlock).data('lon'), $(mapBlock).data('lat'));
				var mapStyle = [{
					"featureType": "all",
					"elementType": "labels.text.fill",
					"stylers": [{
						"saturation": 36
					}, {
						"color": "#000000"
					}, {
						"lightness": 40
					}]
				}, {
					"featureType": "all",
					"elementType": "labels.text.stroke",
					"stylers": [{
						"visibility": "on"
					}, {
						"color": "#000000"
					}, {
						"lightness": 16
					}]
				}, {
					"featureType": "all",
					"elementType": "labels.icon",
					"stylers": [{
						"visibility": "off"
					}]
				}, {
					"featureType": "administrative",
					"elementType": "geometry.fill",
					"stylers": [{
						"color": "#000000"
					}, {
						"lightness": 20
					}]
				}, {
					"featureType": "administrative",
					"elementType": "geometry.stroke",
					"stylers": [{
						"color": "#000000"
					}, {
						"lightness": 17
					}, {
						"weight": 1.2
					}]
				}, {
					"featureType": "landscape",
					"elementType": "geometry",
					"stylers": [{
						"color": "#000000"
					}, {
						"lightness": 20
					}]
				}, {
					"featureType": "poi",
					"elementType": "geometry",
					"stylers": [{
						"color": "#000000"
					}, {
						"lightness": 21
					}]
				}, {
					"featureType": "road.highway",
					"elementType": "geometry.fill",
					"stylers": [{
						"color": "#000000"
					}, {
						"lightness": 17
					}]
				}, {
					"featureType": "road.highway",
					"elementType": "geometry.stroke",
					"stylers": [{
						"color": "#000000"
					}, {
						"lightness": 29
					}, {
						"weight": 0.2
					}]
				}, {
					"featureType": "road.arterial",
					"elementType": "geometry",
					"stylers": [{
						"color": "#000000"
					}, {
						"lightness": 18
					}]
				}, {
					"featureType": "road.local",
					"elementType": "geometry",
					"stylers": [{
						"color": "#000000"
					}, {
						"lightness": 16
					}]
				}, {
					"featureType": "transit",
					"elementType": "geometry",
					"stylers": [{
						"color": "#000000"
					}, {
						"lightness": 19
					}]
				}, {
					"featureType": "water",
					"elementType": "geometry",
					"stylers": [{
						"color": "#000000"
					}, {
						"lightness": 17
					}]
				}];

				var mapOptions = {
					zoom: 15,
					center: myLatlng,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					styles: mapStyle,
					scrollwheel: false,
					mapTypeControl: true,
					mapTypeControlOptions: {
						style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
						position: google.maps.ControlPosition.TOP_LEFT
					},
					zoomControl: true,
					zoomControlOptions: {
						position: google.maps.ControlPosition.RIGHT_CENTER
					},
					scaleControl: true,
					streetViewControl: true,
					streetViewControlOptions: {
						position: google.maps.ControlPosition.RIGHT_TOP
					}
				};

				var map = new google.maps.Map(mapBlock, mapOptions);

				var image = {
					url: 'assets/img/common/map/pin.png'
				};

				var marker = new google.maps.Marker({
					position: myLatlng,
					icon: image
				});

				marker.setMap(map);
			}
		};

		google.maps.event.addDomListener(window, "load", initialize);
	})();
	// Block name: Menu
	// Dependencies: jquery.hoverIntent.js jquery.superfish.js
	// Docs: https://github.com/joeldbirch/superfish
	(function () {
		var menu = $('.js-menu');

		menu.superfish({
			delay: 300,
			autoArrows: false,
			speed: 'fast',
			disableHI: true
		});
	})();
	// Block name: Menu Trigger
	// Dependencies: jquery.sidr.js
	// Docs: https://github.com/artberri/sidr
	(function () {
		// Initialize Sidr plugin
		$('.js-menu-trigger').sidr({
			side: 'right',
			displace: false
		});

		// Close Sidr on click on menu anchors 
		$('.js-mobile-menu__close, #sidr a').on('click', function (event) {
			event.preventDefault();
			$.sidr('close', 'sidr');
		});

	})();
	// Block name: Preloader
	// Dependencies: no dependencies
	(function () {
		var preloader = $('.js-preloader');
		var preload = $('.js-preload-me').length;

		// Check if the preloader is active
		if (preload) {
			$(window).on("load", function () {
				preloader.fadeOut('slow', function () {
					$(this).remove();
				});
			});
		}
	})();
	// Block name: Slider
	// Dependencies: velocity.js, owl.carousel.js
	// Docs: 
	// https://github.com/julianshapiro/velocity
	// https://github.com/OwlCarousel2/OwlCarousel2
	(function () {
		$(window).load(function () {
			var sliders = $('.js-slider');

			sliders.each(function () {
				var slider = $(this);
				var duration = 1000;
				var animationOut = function (el) {
					el.find(".owl-item.active .slider__title").velocity("stop").velocity("transition.fadeOut", {
						duration: duration,
						display: null
					});

					el.find('.owl-item.active img').velocity("stop").velocity("transition.slideDownBigOut", {
						duration: duration,
						display: null,
						stagger: 100
					});
				};

				var animationIn = function (el) {
					var mySequence = [{
						e: el.find(".owl-item.active .slider__title"),
						p: "transition.fadeIn",
						display: null
					}, {
						e: el.find('.owl-item.active img.slider__image'),
						p: "transition.slideUpBigIn",
						o: {
							duration: duration,
							display: null,
							stagger: 150,
							sequenceQueue: false
						}
					}, {
						e: el.find('.owl-item.active img.slider__secondary'),
						p: "transition.slideUpBigIn",
						o: {
							delay: 150,
							duration: duration,
							display: null,
							stagger: 150,
							sequenceQueue: false
						}
					}];

					el.find(".owl-item.active .slider__title, .owl-item.active img.slider__image, .owl-item.active img.slider__secondary").velocity("stop", true);
					$.Velocity.RunSequence(mySequence);
				};

				slider.on("initialized.owl.carousel", function () {
					animationIn($(this));
				});

				slider.owlCarousel({
					items: 1,
					animateOut: "fadeOut",
					dots: true,
					mouseDrag: false,
					touchDrag: false,
					autoHeight: true,
					autoplay: true,
					autoplayTimeout: 5000
				});


				slider.on("translate.owl.carousel", function () {
					animationOut($(this));
				});

				slider.on("translated.owl.carousel", function () {
					animationIn($(this));
				});
			});
		});
	})();
	// Block name: Stats
	// Dependencies: jquery.animateNumber.js, jquery.inview.js
	// Docs: 
	// https://github.com/aishek/jquery-animateNumber
	// https://github.com/protonet/jquery.inview
	(function () {
		var numbers = $('.js-stats__number');

		numbers.each(function () {
			var number = $(this);
			var to = number.data('number');
			var units = number.data('units') ? number.data('units') : '';

			number.one("inview", function () {
				number.animateNumber({
					number: to,
					numberStep: $.animateNumber.numberStepFactories.append(units)
				}, 3000);
			});
		});
	})();
	// Block name: Tabs
	// Dependencies: jquery.easytabs.js, velocity.js
	// Docs: 
	// https://github.com/JangoSteve/jQuery-EasyTabs
	// https://github.com/julianshapiro/velocity
	(function () {
		$('.js-tabs').each(function () {
			var tabs = $(this);

			tabs.easytabs({
				tabActiveClass: "tab__title--active",
				updateHash: false
			});

			tabs.on("easytabs:before", function () {
				$(this).find('.tabs__content.active img').velocity("stop").velocity("transition.slideDownOut", {
					duration: 1500,
					display: null
				});
			});

			tabs.on("easytabs:midTransition", function (event, $clicked, $targetPanel) {
				$targetPanel.find('img').velocity("stop").velocity("transition.slideDownIn", {
					duration: 1500,
					display: null,
					stagger: 100
				});
			});
		});

	})();
	// Block name: Testimonials
	// Dependencies: jquery.easytabs.js, velocity.js
	// Docs: 
	// https://github.com/JangoSteve/jQuery-EasyTabs
	// https://github.com/julianshapiro/velocity
	(function () {
		$('.js-testimonials').each(function () {
			var tabs = $(this);

			// Initialize EasyTabs
			tabs.easytabs({
				tabActiveClass: "testimonials__title--active",
				updateHash: false
			});

			// Bind Hide Animation
			tabs.on("easytabs:before", function () {
				$(this).find('.testimonials__quote.active span').velocity("stop").velocity("transition.slideDownOut", {
					duration: 1000,
					display: null
				});
			});

			// Bind Show Animation
			tabs.on("easytabs:midTransition", function (event, $clicked, $targetPanel) {
				$targetPanel.find("span").velocity("stop").velocity("transition.slideDownIn", {
					duration: 1000,
					display: null
				});
			});
		});

	})();
	// Block name: Twitter Widget
	// Dependencies: owl.carousel.js, twitterFetcher.js
	// Docs: 	
	// https://github.com/OwlCarousel2/OwlCarousel2
	// https://github.com/jasonmayes/Twitter-Post-Fetcher
	(function () {
		// Select Twitter widget
		var widget = $(".js-twitter-widget").first();

		// Get configuration from the DOM
		var apiConfig = {
			user: widget.data("user"),
			max: widget.data("max"),
			lang: widget.data("lang")
		};

		// Render the template using fetched data
		var handleTweets = function (tweets) {
			for (var i = 0; i < tweets.length; i++) {
				$(".js-twitter-widget").first().append([
					'<div class="twitter-widget__tweet">',
					'<div class="twitter-widget__content">',
					'<div class="twitter-widget__user">' + tweets[i].author + '</div>',
					tweets[i].tweet,
					'</div>',
					'<div class="twitter-widget__date">— ' + tweets[i].time + '</div>',
					'</div>'
				].join(''));
			}

			// Initialize the slider
			$(".js-twitter-widget").first().owlCarousel({
				items: 1,
				loop: true,
				animateOut: 'fadeOutDown',
				animateIn: 'fadeInDown',
				autoplay: true,
				autoplayTimeout: 4000
			});
		};

		// Fetch Twitter Data
		twitterFetcher.fetch({
			"profile": {
				"screenName": apiConfig.user
			},
			"maxTweets": apiConfig.max,
			"enableLinks": true,
			"showUser": true,
			"showTime": true,
			"showRetweet": false,
			"dataOnly": true,
			"customCallback": handleTweets,
			"lang": apiConfig.lang
		});
	})();
	// Block name: Video
	// Dependencies: jquery.youtubepopup.js
	// Docs: https://github.com/QassimHassan/YouTube_PopUp
	(function () {
		$(".js-video").YouTubePopUp();
	})();

})(jQuery);