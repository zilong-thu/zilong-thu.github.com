/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, 0="" ie<9="" make="" sure="" we="" trim="" bom="" and="" nbsp="" rtrim="/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g," matches="" dashed="" string="" for="" camelizing="" rmsprefix="/^-ms-/," rdashalpha="/-([\da-z])/gi," used="" by="" jquery.camelcase="" as="" callback="" to="" replace()="" fcamelcase="function(" all,="" letter="" )="" {="" return="" letter.touppercase();="" };="" jquery.fn="jQuery.prototype" =="" the="" current="" version="" of="" jquery="" being="" jquery:="" version,="" constructor:="" jquery,="" start="" with="" an="" empty="" selector="" selector:="" "",="" default length="" a="" object="" is="" length:="" 0,="" toarray:="" function()="" slice.call(="" this="" );="" },="" get="" nth="" element="" in="" matched="" set="" or="" whole="" clean="" array="" get:="" function(="" num="" !="null" ?="" just="" one="" from="" (="" <="" this[="" +="" this.length="" ]="" :="" all="" elements="" take="" push="" it="" onto="" stack="" (returning="" new="" set)="" pushstack:="" elems="" build="" var="" ret="jQuery.merge(" this.constructor(),="" add="" old="" (as="" reference)="" ret.prevobject="this;" ret.context="this.context;" newly-formed="" ret;="" execute="" every="" set.="" (you="" can="" seed="" arguments="" args,="" but="" only="" internally.)="" each:="" callback,="" args="" jquery.each(="" this,="" map:="" this.pushstack(="" jquery.map(this,="" elem,="" i="" callback.call(="" i,="" elem="" }));="" slice:="" slice.apply(="" first:="" this.eq(="" last:="" -1="" eq:="" len="this.length," j="+i">= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9 0="" 1="" 2="" 2009="" handle="" iteration="" over="" inherited="" properties="" before="" own="" properties.="" if="" (="" support.ownlast="" )="" {="" for="" key="" in="" obj="" return="" hasown.call(="" obj,="" );="" }="" are="" enumerated="" firstly,="" so="" to="" speed="" up,="" last="" one="" is="" own,="" then="" all="" own.="" {}="" undefined="" ||="" },="" type:="" function(="" null="" +="" "";="" typeof="" "object"="" "function"="" ?="" class2type[="" tostring.call(obj)="" ]="" :="" obj;="" evaluates="" a="" script="" global="" context="" workarounds="" based="" on="" findings="" by="" jim="" driscoll="" http:="" weblogs.java.net="" blog="" archive="" 09="" 08="" eval-javascript-global-context="" globaleval:="" data="" &&="" jquery.trim(="" we="" use="" execscript="" internet="" explorer="" an="" anonymous="" function="" that="" window="" rather="" than="" jquery="" firefox="" window.execscript="" window[="" "eval"="" ].call(="" window,="" )(="" convert="" dashed="" camelcase;="" used="" the="" css="" and="" modules="" microsoft="" forgot="" hump="" their="" vendor="" prefix="" (#9572)="" camelcase:="" string="" string.replace(="" rmsprefix,="" "ms-"="" ).replace(="" rdashalpha,="" fcamelcase="" nodename:="" elem,="" name="" elem.nodename="" elem.nodename.tolowercase()="==" name.tolowercase();="" args="" internal="" usage="" only="" each:="" callback,="" var="" value,="" i="0," length="obj.length," isarray="isArraylike(" ;="" <="" length;="" i++="" value="callback.apply(" obj[="" ],="" false="" break;="" else="" special,="" fast,="" case="" most="" common="" of="" each="" i,="" support:="" android<4.1,="" ie<9="" trim:="" text="" ""="" rtrim,="" results="" makearray:="" arr,="" ret="results" [];="" arr="" !="null" isarraylike(="" object(arr)="" jquery.merge(="" ret,="" "string"="" [="" push.call(="" ret;="" inarray:="" len;="" indexof="" indexof.call(="" len="arr.length;" math.max(="" 0,="" 0;="" skip="" accessing="" sparse="" arrays="" arr[="" elem="" i;="" -1;="" merge:="" first,="" second="" j="0," while="" first[="" j++="" ];="" workaround="" casting="" .length="" nan="" otherwise="" arraylike="" objects="" (e.g.,="" nodelists)="" second[j]="" first.length="i;" first;="" grep:="" elems,="" invert="" callbackinverse,="" matches="[]," callbackexpect="!invert;" go="" through="" array,="" saving="" items="" pass="" validator="" callbackinverse="!callback(" elems[="" matches.push(="" matches;="" arg="" map:="" elems="" ),="" translating="" new="" values="" ret.push(="" every="" object,="" flatten="" any="" nested="" concat.apply(="" [],="" guid="" counter="" guid:="" 1,="" bind="" context,="" optionally="" partially="" applying="" arguments.="" proxy:="" fn,="" args,="" proxy,="" tmp;="" tmp="fn[" fn="tmp;" quick="" check="" determine="" target="" callable,="" spec="" this="" throws="" typeerror,="" but="" will="" just="" undefined.="" !jquery.isfunction(="" undefined;="" simulated="" arguments,="" proxy="function()" fn.apply(="" this,="" args.concat(="" slice.call(="" arguments="" };="" set="" unique="" handler="" same="" original="" handler,="" it="" can="" be="" removed="" proxy.guid="fn.guid" =="" fn.guid="" jquery.guid++;="" proxy;="" now:="" function()="" +(="" date()="" jquery.support="" not="" core="" other="" projects="" attach="" needs="" exist.="" support="" });="" populate="" class2type="" map="" jquery.each("boolean="" number="" array="" date="" regexp="" object="" error".split("="" "),="" function(i,="" name)="" "[object="" "="" "]"="" type="jQuery.type(" jquery.iswindow(="" false;="" obj.nodetype="==" true;="" "array"="" "number"=""> 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

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
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24 0="" workaround="" erroneous="" numeric="" interpretation="" of="" +"0x"="" return="" high="" !="=" ||="" escapedwhitespace="" ?="" escaped="" :="" <="" bmp="" codepoint="" string.fromcharcode(="" +="" 0x10000="" )="" supplemental="" plane="" (surrogate="" pair)="">> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0 1="" 8="" 9="" detect="" silently="" failing="" push.apply="" arr[="" preferreddoc.childnodes.length="" ].nodetype;="" }="" catch="" (="" e="" )="" {="" push="{" apply:="" arr.length="" ?="" leverage="" slice="" if="" possible="" function(="" target,="" els="" push_native.apply(="" slice.call(els)="" );="" :="" support:="" ie<9="" otherwise="" append="" directly="" var="" j="target.length," i="0;" can't="" trust="" nodelist.length="" while="" (target[j++]="els[i++])" {}="" target.length="j" -="" 1;="" };="" function="" sizzle(="" selector,="" context,="" results,="" seed="" match,="" elem,="" m,="" nodetype,="" qsa="" vars="" i,="" groups,="" old,="" nid,="" newcontext,="" newselector;="" context="" context.ownerdocument="" ||="" preferreddoc="" !="=" document="" setdocument(="" document;="" results="results" [];="" !selector="" typeof="" selector="" "string"="" return="" results;="" (nodetype="context.nodeType)" &&="" nodetype="" documentishtml="" !seed="" shortcuts="" (match="rquickExpr.exec(" ))="" speed-up:="" sizzle("#id")="" (m="match[1])" elem="context.getElementById(" m="" check="" parentnode="" to="" when="" blackberry="" 4.6="" returns="" nodes="" that="" are="" no="" longer="" in="" the="" (jquery="" #6963)="" elem.parentnode="" handle="" case="" where="" ie,="" opera,="" and="" webkit="" items="" by="" name="" instead="" of="" id="" elem.id="==" results.push(="" else="" is="" not="" a="" (elem="context.ownerDocument.getElementById(" contains(="" sizzle("tag")="" match[2]="" push.apply(="" context.getelementsbytagname(="" sizzle(".class")="" support.getelementsbyclassname="" context.getelementsbyclassname="" context.getelementsbyclassname(="" path="" support.qsa="" (!rbuggyqsa="" !rbuggyqsa.test(="" nid="old" =="" expando;="" newcontext="context;" newselector="nodeType" selector;="" works="" strangely="" on="" element-rooted="" queries="" we="" can="" work="" around="" this="" specifying="" an="" extra="" root="" working="" up="" from="" there="" (thanks="" andrew="" dupont="" for="" technique)="" ie="" doesn't="" object="" elements="" context.nodename.tolowercase()="" "object"="" groups="tokenize(" (old="context.getAttribute("id"))" rescape,="" "\\$&"="" context.setattribute(="" "id",="" +="" "']="" ";="" i--="" groups[i]="nid" toselector(="" testcontext(="" context.parentnode="" context;="" try="" newcontext.queryselectorall(="" catch(qsaerror)="" finally="" !old="" context.removeattribute("id");="" all="" others="" select(="" selector.replace(="" rtrim,="" "$1"="" ),="" **="" *="" create="" key-value="" caches="" limited="" size="" @returns="" {function(string,="" object)}="" data="" after="" storing="" it="" itself="" with="" property="" (space-suffixed)="" string="" (if="" cache="" larger="" than="" expr.cachelength)="" deleting="" oldest="" entry="" createcache()="" keys="[];" cache(="" key,="" value="" use="" (key="" "="" ")="" avoid="" collision="" native="" prototype="" properties="" (see="" issue="" #157)="" keys.push(="" key=""> Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
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
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
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
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
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
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
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
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8 1="" 4="" 7="" 8="" 9="" 11="" 16="" 2011="" 12359="" 13378="" verify="" that="" getattribute="" really="" returns="" attributes="" and="" not="" properties="" (excepting="" ie8="" booleans)="" support.attributes="assert(function(" div="" )="" {="" div.classname="i" ;="" return="" !div.getattribute("classname");="" });="" *="" getelement(s)by*="" ----------------------------------------------------------------------="" check="" if="" getelementsbytagname("*")="" only="" elements="" support.getelementsbytagname="assert(function(" div.appendchild(="" doc.createcomment("")="" );="" !div.getelementsbytagname("*").length;="" getelementsbyclassname="" can="" be="" trusted="" support.getelementsbyclassname="rnative.test(" doc.getelementsbyclassname="" &&="" assert(function(="" div.innerhtml="<div class='a'></div><div class='a i'></div>" support:="" safari<4="" catch="" class="" over-caching="" div.firstchild.classname="i" opera<10="" gebcn="" failure="" to="" find="" non-leading="" classes="" div.getelementsbyclassname("i").length="==" 2;="" ie<10="" getelementbyid="" by="" name="" the="" broken="" methods="" don't="" pick="" up="" programatically-set="" names,="" so="" use="" a="" roundabout="" getelementsbyname="" test="" support.getbyid="assert(function(" docelem.appendchild(="" ).id="expando;" !doc.getelementsbyname="" ||="" !doc.getelementsbyname(="" expando="" ).length;="" id="" filter="" (="" expr.find["id"]="function(" id,="" context="" typeof="" context.getelementbyid="" !="=" strundefined="" documentishtml="" var="" m="context.getElementById(" parentnode="" when="" blackberry="" 4.6="" nodes="" are="" no="" longer="" in="" document="" #6963="" m.parentnode="" ?="" [="" ]="" :="" [];="" }="" };="" expr.filter["id"]="function(" attrid="id.replace(" runescape,="" funescape="" function(="" elem="" elem.getattribute("id")="==" attrid;="" else="" ie6="" is="" reliable="" as="" shortcut="" delete="" expr.find["id"];="" node="typeof" elem.getattributenode="" elem.getattributenode("id");="" node.value="==" tag="" expr.find["tag"]="support.getElementsByTagName" tag,="" context.getelementsbytagname="" context.getelementsbytagname(="" elem,="" tmp="[]," i="0," results="context.getElementsByTagName(" out="" possible="" comments="" "*"="" while="" (elem="results[i++])" elem.nodetype="==" tmp.push(="" tmp;="" results;="" expr.find["class"]="support.getElementsByClassName" classname,="" context.getelementsbyclassname="" context.getelementsbyclassname(="" classname="" qsa="" matchesselector="" support="" matchesselector(:active)="" reports="" false="" true="" (ie9="" opera="" 11.5)="" rbuggymatches="[];" qsa(:focus)="" (chrome="" 21)="" we="" allow="" this="" because="" of="" bug="" throws="" an="" error="" whenever="" `document.activeelement`="" accessed="" on="" iframe="" so,="" :focus="" pass="" through="" all="" time="" avoid="" ie="" see="" http:="" bugs.jquery.com="" ticket="" rbuggyqsa="[];" (support.qsa="rnative.test(" doc.queryselectorall="" ))="" build="" regex="" strategy="" adopted="" from="" diego="" perini="" select="" set="" empty="" string="" purpose="" ie's="" treatment="" explicitly="" setting="" boolean="" content="" attribute,="" since="" its="" presence="" should="" enough="" ie8,="" 11-12.16="" nothing="" selected strings="" follow="" ^="or" $="or" attribute="" must="" unknown="" but="" "safe"="" for="" winrt="" msdn.microsoft.com="" en-us="" library="" hh465388.aspx#attribute_section="" div.queryselectorall("[msallowclip^="" ]").length="" rbuggyqsa.push(="" "[*^$]=" + whitespace + " *(?:''|\"\")"="" "value"="" treated="" correctly="" !div.queryselectorall("[selected]").length="" "\\["="" +="" whitespace="" "*(?:value|"="" booleans="" ")"="" webkit="" -="" :checked="" option="" www.w3.org="" tr="" rec-css3-selectors-20110929="" #checked="" here="" will="" later="" tests="" !div.queryselectorall(":checked").length="" rbuggyqsa.push(":checked");="" windows="" native="" apps="" type="" restricted="" during="" .innerhtml="" assignment="" input="doc.createElement("input");" input.setattribute(="" "type",="" "hidden"="" ).setattribute(="" "name",="" "d"="" enforce="" case-sensitivity="" div.queryselectorall("[name="d]").length" "name"="" "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(" :enabled").length="" ":enabled",="" ":disabled"="" 10-11="" does="" throw="" post-comma="" invalid="" pseudos="" div.queryselectorall("*,:x");="" rbuggyqsa.push(",.*:");="" (support.matchesselector="rnative.test(" (matches="docElem.matches" docelem.webkitmatchesselector="" docelem.mozmatchesselector="" docelem.omatchesselector="" docelem.msmatchesselector)="" it's="" do="" disconnected="" (ie="" 9)="" support.disconnectedmatch="matches.call(" div,="" "div"="" fail="" with="" exception="" gecko="" error,="" instead="" matches.call(="" "[s!="" ]:x"="" rbuggymatches.push(="" "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join(" |")="" new="" regexp(="" rbuggymatches.join("|")="" contains="" hascompare="rnative.test(" docelem.comparedocumentposition="" element="" another="" purposefully="" implement="" inclusive="" descendent="" in,="" contain="" itself="" rnative.test(="" docelem.contains="" a,="" b="" adown="a.nodeType" =="=" a.documentelement="" bup="b" b.parentnode;="" !!(="" bup.nodetype="==" adown.contains="" adown.contains(="" a.comparedocumentposition="" a.comparedocumentposition(="" &="" ));="" (b="b.parentNode)" true;="" false;="" sorting="" order="" sortorder="hasCompare" flag="" duplicate="" removal="" hasduplicate="true;" 0;="" sort="" method="" existence="" one="" has="" comparedocumentposition="" compare="!a.compareDocumentPosition" !b.comparedocumentposition;="" compare;="" calculate="" position="" both="" inputs="" belong="" same="" a.ownerdocument="" b.ownerdocument="" otherwise="" know="" they="" 1;="" (!support.sortdetached="" b.comparedocumentposition(="" compare)="" choose="" first="" related="" our="" preferred="" doc="" preferreddoc="" contains(preferreddoc,="" a)="" -1;="" b)="" maintain="" original="" sortinput="" indexof.call(="" sortinput,="" -1="" exit="" early="" identical="" cur,="" aup="a.parentNode," ap="[" ],="" bp="[" ];="" parentless="" either="" documents="" or="" !aup="" !bup="" siblings,="" quick="" siblingcheck(="" need="" full="" lists="" their="" ancestors="" comparison="" cur="a;" (cur="cur.parentNode)" ap.unshift(="" bp.unshift(="" walk="" down="" tree="" looking="" discrepancy="" ap[i]="==" bp[i]="" i++;="" sibling="" have="" common="" ancestor="" ap[i],="" doc;="" sizzle.matches="function(" expr,="" sizzle(="" null,="" sizzle.matchesselector="function(" expr="" vars="" needed="" elem.ownerdocument="" setdocument(="" make="" sure="" selectors="" quoted="" rattributequotes,="" "="$1" ]"="" support.matchesselector="" !rbuggymatches="" !rbuggymatches.test(="" !rbuggyqsa="" !rbuggyqsa.test(="" try="" ret="matches.call(" 9's="" well,="" said="" fragment="" elem.document="" elem.document.nodetype="" ret;="" catch(e)="" {}="" document,="" ).length=""> 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
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
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
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
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
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

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8 0="" 1="" new="" html5="" attribute="" values="" (e.g.,="" "search")="" appear="" with="" elem.type="==" "text"="" (="" (attr="elem.getAttribute("type"))" =="null" ||="" attr.tolowercase()="==" );="" },="" position-in-collection="" "first":="" createpositionalpseudo(function()="" {="" return="" [="" ];="" }),="" "last":="" createpositionalpseudo(function(="" matchindexes,="" length="" )="" -="" "eq":="" length,="" argument="" <="" ?="" +="" :="" "even":="" var="" i="0;" for="" ;="" length;="" matchindexes.push(="" }="" matchindexes;="" "odd":="" "lt":="" argument;="" --i="">= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, safari="" tolerate="" nodelist="" properties="" (ie:="" "length";="" safari:="" <number="">) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

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
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14 1="" 2="" 4="" 25="" always="" assume="" duplicates="" if="" they="" aren't="" passed="" to="" the="" comparison="" function="" support.detectduplicates="!!hasDuplicate;" initialize="" against="" default document="" setdocument();="" support:="" webkit<537.32="" -="" safari="" 6.0.3="" chrome="" (fixed="" in="" 27)="" detached="" nodes="" confoundingly="" follow="" *each="" other*="" support.sortdetached="assert(function(" div1="" )="" {="" should="" return="" 1,="" but="" returns="" (following)="" div1.comparedocumentposition(="" document.createelement("div")="" &="" 1;="" });="" ie<8="" prevent="" attribute="" property="" "interpolation"="" http:="" msdn.microsoft.com="" en-us="" library="" ms536429%28vs.85%29.aspx="" (="" !assert(function(="" div="" div.innerhtml="<a href='#'></a>" ;="" div.firstchild.getattribute("href")="==" "#"="" })="" addhandle(="" "type|href|height|width",="" function(="" elem,="" name,="" isxml="" !isxml="" elem.getattribute(="" name.tolowercase()="==" "type"="" ?="" :="" );="" }="" ie<9="" use="" defaultvalue="" place="" of="" getattribute("value")="" !support.attributes="" ||="" div.firstchild.setattribute(="" "value",="" ""="" div.firstchild.getattribute(="" "value"="" "";="" &&="" elem.nodename.tolowercase()="==" "input"="" elem.defaultvalue;="" getattributenode="" fetch="" booleans="" when="" getattribute="" lies="" div.getattribute("disabled")="=" null;="" booleans,="" var="" val;="" elem[="" name="" ]="==" true="" (val="elem.getAttributeNode(" ))="" val.specified="" val.value="" sizzle;="" })(="" window="" jquery.find="Sizzle;" jquery.expr="Sizzle.selectors;" jquery.expr[":"]="jQuery.expr.pseudos;" jquery.unique="Sizzle.uniqueSort;" jquery.text="Sizzle.getText;" jquery.isxmldoc="Sizzle.isXML;" jquery.contains="Sizzle.contains;" rneedscontext="jQuery.expr.match.needsContext;" rsingletag="(/^<(\w+)\s*\/?">(?:<\ \1="">|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <) rquickexpr="/^(?:\s*(<[\w\W]+">)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" 1="" &&="" selector.charat(="" selector.length="" -="" )="==" "="">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
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
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firinglength="" )="" {="" firinglength--;="" }="" if="" (="" index="" <="firingIndex" firingindex--;="" });="" return="" this;="" },="" check="" a="" given="" callback="" is="" in="" the="" list.="" no="" argument="" given,="" whether="" or="" not="" list="" has="" callbacks="" attached.="" has:="" function(="" fn="" ?="" jquery.inarray(="" fn,=""> -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9 0="" 1="" 6="" 7="" 9="" iteration="" over="" object's="" inherited="" properties="" before="" its="" own="" var="" i;="" for="" (="" i="" in="" jquery(="" support="" )="" {="" break;="" }="" support.ownlast="i" !="=" "0";="" note:="" most="" tests="" are="" defined="" their="" respective="" modules.="" false="" until="" the="" test="" is="" run="" support.inlineblockneedslayout="false;" execute="" asap="" case="" we="" need="" to="" set="" body.style.zoom="" jquery(function()="" minified:="" a,b,c,d="" val,="" div,="" body,="" container;="" body="document.getElementsByTagName(" "body"="" )[="" ];="" if="" !body="" ||="" !body.style="" return="" frameset="" docs="" that="" don't="" have="" a="" return;="" setup="" div="document.createElement(" "div"="" );="" container="document.createElement(" container.style.csstext="position:absolute;border:0;width:0;height:0;top:0;left:-9999px" ;="" body.appendchild(="" ).appendchild(="" typeof="" div.style.zoom="" strundefined="" support:="" ie<8="" check="" natively="" block-level="" elements="" act="" like="" inline-block="" when="" setting="" display="" 'inline'="" and="" giving="" them="" layout="" div.style.csstext="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1" =="" div.offsetwidth="==" 3;="" val="" prevent="" ie="" from="" affecting="" positioned="" #11048="" shrinking="" mode="" #12869="" body.removechild(="" });="" (function()="" only="" not="" already="" executed="" another="" module.="" (support.deleteexpando="=" null)="" ie<9="" support.deleteexpando="true;" try="" delete="" div.test;="" catch(="" e="" null="" avoid="" leaks="" ie.="" })();="" **="" *="" determines="" whether="" an="" object="" can="" data="" jquery.acceptdata="function(" elem="" nodata="jQuery.noData[" (elem.nodename="" +="" "="" ").tolowercase()="" ],="" nodetype="+elem.nodeType" 1;="" do="" on="" non-element="" dom="" nodes="" because="" it="" will="" be="" cleared="" (#8335).="" &&="" ?="" :="" accept="" unless="" otherwise="" specified;="" rejection="" conditional="" !nodata="" true="" elem.getattribute("classid")="==" nodata;="" };="" rbrace="/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/," rmultidash="/([A-Z])/g;" function="" dataattr(="" elem,="" key,="" nothing="" was="" found="" internally,="" fetch="" any="" html5="" data-*="" attribute="" undefined="" elem.nodetype="==" name="data-" key.replace(="" rmultidash,="" "-$1"="" ).tolowercase();="" "string"="" "true"="" "false"="" "null"="" convert="" number="" doesn't="" change="" string="" +data="" ""="==" rbrace.test(="" jquery.parsejson(="" data;="" {}="" make="" sure="" so="" isn't="" changed="" later="" jquery.data(="" else="" checks="" cache="" emptiness="" isemptydataobject(="" obj="" name;="" public="" empty,="" private="" still="" empty="" "data"="" jquery.isemptyobject(="" obj[name]="" continue;="" "tojson"="" false;="" true;="" internaldata(="" name,="" data,="" pvt="" internal="" use="" !jquery.acceptdata(="" ret,="" thiscache,="" internalkey="jQuery.expando," handle="" js="" objects="" differently="" ie6-7="" can't="" gc="" references="" properly="" across="" dom-js="" boundary="" isnode="elem.nodeType," global="" jquery="" cache;="" attached="" directly="" occur="" automatically="" jquery.cache="" defining="" id="" exists="" allows="" code="" shortcut="" same="" path="" as="" node="" with="" no="" elem[="" ]="" internalkey;="" doing="" more="" work="" than="" trying="" get="" has="" at="" all="" (!id="" !cache[id]="" (!pvt="" !cache[id].data))="" !id="" new="" unique="" each="" element="" since="" ends="" up="" jquery.guid++;="" !cache[="" exposing="" metadata="" plain="" serialized="" using="" json.stringify="" cache[="" tojson:="" jquery.noop="" passed="" jquery.data="" instead="" of="" key="" value="" pair;="" this="" gets="" shallow="" copied="" onto="" existing="" "object"="" "function"="" ].data="jQuery.extend(" ].data,="" thiscache="cache[" data()="" stored="" separate="" inside="" order="" collisions="" between="" user-defined="" data.="" !pvt="" !thiscache.data="" thiscache.data="{};" thiscache[="" jquery.camelcase(="" both="" converted-to-camel="" non-converted="" property="" names="" specified="" first="" find="" as-is="" ret="thisCache[" null|undefined="" camelcased="" ret;="" internalremovedata(="" i,="" see="" information="" jquery.expando="" jquery.expando;="" there="" entry="" object,="" purpose="" continuing="" ].data;="" array="" or="" space="" separated="" keys="" !jquery.isarray(="" manipulation="" split="" camel="" cased="" version="" by="" spaces="" ");="" "name"="" keys...="" initially="" created,="" via="" ("key",="" "val")="" signature,="" converted="" camelcase.="" way="" tell="" _how_="" added,="" remove="" camelcase="" key.="" #12786="" penalize="" argument="" path.="" jquery.map(="" jquery.camelcase="" while="" i--="" name[i]="" left="" cache,="" want="" continue="" let="" itself="" destroyed="" !isemptydataobject(thiscache)="" !jquery.isemptyobject(thiscache)="" destroy="" parent="" had="" been="" thing="" !isemptydataobject(="" jquery.cleandata(="" [="" supported="" expandos="" `cache`="" window="" per="" iswindow="" (#10080)="" jshint="" eqeqeq:="" fails,="" jquery.extend({="" cache:="" {},="" following="" (space-suffixed="" object.prototype="" collisions)="" throw="" uncatchable="" exceptions="" you="" attempt="" expando="" nodata:="" "applet="" ":="" true,="" "embed="" ...but="" flash="" (which="" classid)="" *can*="" "object="" "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"="" },="" hasdata:="" function(="" jquery.cache[="" elem[jquery.expando]="" !!elem="" data:="" removedata:="" only.="" _data:="" _removedata:="" jquery.fn.extend({="" attrs="elem" elem.attributes;="" special="" expections="" .data="" basically="" thwart="" jquery.access,="" implement="" relevant="" behavior="" ourselves="" values="" this.length="" !jquery._data(="" "parsedattrs"="" ie11+="" (#14894)="" attrs[="" ].name;="" name.indexof(="" "data-"="" name.slice(5)="" data[="" jquery._data(="" "parsedattrs",="" sets="" multiple this.each(function()="" this,="" arguments.length=""> 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link><table></table><a href="/a">a</a><input type="checkbox">";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type="radio" checked="checked" name="t">";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9 1="" 3="" 8="" opera="" does="" not="" clone="" events="" (and="" typeof="" div.attachevent="==" undefined).="" ie9-10="" clones="" bound="" via="" attachevent,="" but="" they="" don't="" trigger="" with="" .click()="" support.nocloneevent="true;" if="" (="" )="" {="" div.attachevent(="" "onclick",="" function()="" });="" div.clonenode(="" true="" ).click();="" }="" execute="" the="" test="" only="" already="" executed="" in="" another="" module.="" (support.deleteexpando="=" null)="" support:="" ie<9="" support.deleteexpando="true;" try="" delete="" div.test;="" catch(="" e="" })();="" (function()="" var="" i,="" eventname,="" div="document.createElement(" "div"="" );="" (lack="" submit="" change="" bubble),="" firefox="" 23+="" focusin="" event)="" for="" i="" submit:="" true,="" change:="" focusin:="" })="" eventname="on" +="" i;="" !(support[="" "bubbles"="" ]="eventName" window)="" beware="" of="" csp="" restrictions="" (https:="" developer.mozilla.org="" en="" security="" csp)="" div.setattribute(="" "t"="" support[="" ].expando="==" false;="" null="" elements="" to="" avoid="" leaks="" ie.="" rformelems="/^(?:input|select|textarea)$/i," rkeyevent="/^key/," rmouseevent="/^(?:mouse|pointer|contextmenu)|click/," rfocusmorph="/^(?:focusinfocus|focusoutblur)$/," rtypenamespace="/^([^.]*)(?:\.(.+)|)$/;" function="" returntrue()="" return="" true;="" returnfalse()="" safeactiveelement()="" document.activeelement;="" catch="" err="" *="" helper="" functions="" managing="" --="" part="" public="" interface.="" props="" dean="" edwards'="" addevent="" library="" many="" ideas.="" jquery.event="{" global:="" {},="" add:="" function(="" elem,="" types,="" handler,="" data,="" selector="" tmp,="" events,="" t,="" handleobjin,="" special,="" eventhandle,="" handleobj,="" handlers,="" type,="" namespaces,="" origtype,="" elemdata="jQuery._data(" elem="" attach="" nodata="" or="" text="" comment="" nodes="" (but="" allow="" plain="" objects)="" !elemdata="" return;="" caller="" can="" pass="" an="" object="" custom="" data="" lieu="" handler="" handler.handler="" handleobjin="handler;" make="" sure="" that="" has="" a="" unique="" id,="" used="" find="" remove="" it="" later="" !handler.guid="" handler.guid="jQuery.guid++;" init="" element's="" event="" structure="" and="" main="" this="" is="" first="" !(events="elemData.events)" =="" {};="" !(eventhandle="elemData.handle)" eventhandle="elemData.handle" discard="" second="" jquery.event.trigger()="" when="" called="" after="" page="" unloaded="" jquery="" !="=" strundefined="" &&="" (!e="" ||="" jquery.event.triggered="" e.type)="" ?="" jquery.event.dispatch.apply(="" eventhandle.elem,="" arguments="" :="" undefined;="" };="" add="" as="" property="" handle="" fn="" prevent="" memory="" leak="" ie="" non-native="" eventhandle.elem="elem;" multiple separated="" by="" space="" types="(" ""="" ).match(="" rnotwhite="" [="" ];="" t="types.length;" while="" t--="" tmp="rtypenamespace.exec(" types[t]="" [];="" type="origType" tmp[1];="" namespaces="(" tmp[2]="" ).split(="" "."="" ).sort();="" there="" *must*="" be="" no="" attaching="" namespace-only="" handlers="" !type="" continue;="" changes="" its="" use="" special="" changed="" defined,="" determine="" api="" otherwise="" given="" special.delegatetype="" special.bindtype="" type;="" update="" based="" on="" newly="" reset="" handleobj="" passed="" all="" type:="" origtype:="" data:="" handler:="" guid:="" handler.guid,="" selector:="" selector,="" needscontext:="" jquery.expr.match.needscontext.test(="" ),="" namespace:="" namespaces.join(".")="" },="" queue="" we're="" !(handlers="events[" ])="" handlers.delegatecount="0;" addeventlistener="" attachevent="" returns="" false="" !special.setup="" special.setup.call(="" bind="" global="" element="" elem.addeventlistener="" elem.addeventlistener(="" else="" elem.attachevent="" elem.attachevent(="" "on"="" special.add="" special.add.call(="" !handleobj.handler.guid="" handleobj.handler.guid="handler.guid;" list,="" delegates="" front="" handlers.splice(="" handlers.delegatecount++,="" 0,="" handlers.push(="" keep="" track="" which="" have="" ever="" been="" used,="" optimization="" jquery.event.global[="" nullify="" detach="" set="" from="" remove:="" mappedtypes="" j,="" origcount,="" jquery._data(="" once="" each="" type.namespace="" types;="" may="" omitted="" unbind="" (on="" namespace,="" provided)="" jquery.event.remove(="" types[="" ],="" new="" regexp(="" "(^|\\.)"="" namespaces.join("\\.(?:.*\\.|)")="" "(\\.|$)"="" matching="" origcount="j" handlers.length;="" j--="" j="" origtype="==" handleobj.origtype="" !handler="" handleobj.guid="" !tmp="" tmp.test(="" handleobj.namespace="" !selector="" handleobj.selector="" "**"="" handlers.delegatecount--;="" special.remove="" special.remove.call(="" generic="" we="" removed="" something="" more="" exist="" (avoids="" potential="" endless="" recursion="" during="" removal="" handlers)="" !handlers.length="" !special.teardown="" special.teardown.call(="" elemdata.handle="" jquery.removeevent(="" events[="" expando="" it's="" longer="" jquery.isemptyobject(="" elemdata.handle;="" removedata="" also="" checks="" emptiness="" clears="" empty="" so="" instead="" jquery._removedata(="" "events"="" trigger:="" event,="" onlyhandlers="" handle,="" ontype,="" cur,="" bubbletype,="" eventpath="[" document="" "type"="" event.type="" "namespace"="" event.namespace.split(".")="" cur="tmp" document;="" do="" elem.nodetype="==" focus="" blur="" morphs="" out;="" ensure="" firing="" them="" right="" now="" rfocusmorph.test(="" type.indexof(".")="">= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies="" on="" focus="" blur="" to="" hidden element="" (#1486,#12518)="" only="" reproducible="" winxp="" ie8="" native,="" not="" ie9="" in="" mode="" }="" jquery.event.triggered="undefined;" if="" (="" tmp="" )="" {="" elem[="" ontype="" ]="tmp;" return="" event.result;="" },="" dispatch:="" function(="" event="" make="" a="" writable="" jquery.event="" from="" the="" native="" object="" );="" var="" i,="" ret,="" handleobj,="" matched,="" j,="" handlerqueue="[]," args="slice.call(" arguments="" ),="" handlers="(" jquery._data(="" this,="" "events"="" ||="" {}="" )[="" event.type="" [],="" special="jQuery.event.special[" {};="" use="" fix-ed="" rather="" than="" (read-only)="" args[0]="event;" event.delegatetarget="this;" call="" predispatch="" hook="" for="" mapped="" type,="" and="" let="" it="" bail="" desired="" special.predispatch="" &&="" special.predispatch.call(="" false="" return;="" determine="" event,="" run="" delegates="" first;="" they="" may="" want="" stop="" propagation="" beneath="" us="" i="0;" while="" (matched="handlerQueue[" i++="" ])="" !event.ispropagationstopped()="" event.currenttarget="matched.elem;" j="0;" (handleobj="matched.handlers[" j++="" !event.isimmediatepropagationstopped()="" triggered="" must="" either="" 1)="" have="" no="" namespace,="" or="" 2)="" namespace(s)="" subset="" equal="" those="" bound="" (both="" can="" namespace).="" !event.namespace_re="" event.namespace_re.test(="" handleobj.namespace="" event.handleobj="handleObj;" event.data="handleObj.data;" ret="(" (jquery.event.special[="" handleobj.origtype="" {}).handle="" handleobj.handler="" .apply(="" matched.elem,="" !="=" undefined="" (event.result="ret)" =="=" event.preventdefault();="" event.stoppropagation();="" postdispatch="" type="" special.postdispatch="" special.postdispatch.call(="" handlers:="" sel,="" matches,="" delegatecount="handlers.delegateCount," cur="event.target;" find="" delegate="" black-hole="" svg="" <use=""> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9 0="" 1="==" 2="==" 3="" 4="" 2003="" fix="" target="" property="" (#1925)="" if="" (="" !event.target="" )="" {="" event.target="originalEvent.srcElement" ||="" document;="" }="" support:="" chrome="" 23+,="" safari?="" should="" not="" be="" a="" text="" node="" (#504,="" #13143)="" event.target.nodetype="==" ie<9="" for="" mouse="" key="" events,="" metakey="=false" it's="" undefined="" (#3368,="" #11328)="" event.metakey="!!event.metaKey;" return="" fixhook.filter="" ?="" fixhook.filter(="" event,="" originalevent="" :="" event;="" },="" includes="" some="" event="" props="" shared="" by="" keyevent="" and="" mouseevent="" props:="" "altkey="" bubbles="" cancelable="" ctrlkey="" currenttarget="" eventphase="" relatedtarget="" shiftkey="" timestamp="" view="" which".split("="" "),="" fixhooks:="" {},="" keyhooks:="" "char="" charcode="" keycode".split("="" filter:="" function(="" original="" add="" which="" events="" event.which="=" null="" !="null" original.charcode="" original.keycode;="" mousehooks:="" "button="" buttons="" clientx="" clienty="" fromelement="" offsetx="" offsety="" pagex="" pagey="" screenx="" screeny="" toelement".split("="" var="" body,="" eventdoc,="" doc,="" button="original.button," calculate="" y="" missing="" available="" event.pagex="=" &&="" original.clientx="" eventdoc="event.target.ownerDocument" doc="eventDoc.documentElement;" body="eventDoc.body;" +="" doc.scrollleft="" body.scrollleft="" -="" doc.clientleft="" body.clientleft="" );="" event.pagey="original.clientY" doc.scrolltop="" body.scrolltop="" doc.clienttop="" body.clienttop="" relatedtarget,="" necessary="" !event.relatedtarget="" event.relatedtarget="fromElement" =="=" original.toelement="" fromelement;="" click:="" left;="" middle;="" right="" note:="" is="" normalized,="" so="" don't="" use="" it="" !event.which="" &="" special:="" load:="" prevent="" triggered="" image.load="" from="" bubbling="" to="" window.load="" nobubble:="" true="" focus:="" fire="" native="" possible="" blur="" focus="" sequence="" correct="" trigger:="" function()="" this="" safeactiveelement()="" this.focus="" try="" this.focus();="" false;="" catch="" e="" we="" error="" on="" hidden element="" (#1486,="" #12518),="" let="" .trigger()="" run="" the="" handlers="" delegatetype:="" "focusin"="" blur:="" this.blur="" this.blur();="" "focusout"="" checkbox,="" checked state="" will="" jquery.nodename(="" this,="" "input"="" this.type="==" "checkbox"="" this.click="" this.click();="" cross-browser="" consistency,="" .click()="" links="" _default:="" event.target,="" "a"="" beforeunload:="" postdispatch:="" firefox="" 20+="" doesn't="" alert="" returnvalue="" field="" set.="" event.result="" event.originalevent="" event.originalevent.returnvalue="event.result;" simulate:="" type,="" elem,="" bubble="" piggyback="" donor="" simulate="" different="" one.="" fake="" avoid="" donor's="" stoppropagation,="" but="" simulated="" prevents="" default then="" do="" same="" donor.="" new="" jquery.event(),="" type:="" issimulated:="" true,="" originalevent:="" {}="" jquery.event.trigger(="" e,="" null,="" elem="" else="" jquery.event.dispatch.call(="" e.isdefaultprevented()="" event.preventdefault();="" };="" jquery.removeevent="document.removeEventListener" handle="" elem.removeeventlistener="" elem.removeeventlistener(="" handle,="" false="" name="on" type;="" elem.detachevent="" #8545,="" #7054,="" preventing="" memory="" leaks="" custom="" in="" ie6-8="" detachevent="" needed="" element,="" of="" that="" properly="" expose="" gc="" typeof="" elem[="" ]="==" strundefined="" elem.detachevent(="" name,="" jquery.event="function(" src,="" allow="" instantiation="" without="" 'new'="" keyword="" !(this="" instanceof="" jquery.event)="" jquery.event(="" object="" src="" src.type="" this.originalevent="src;" up="" document="" may="" have="" been="" marked="" as="" prevented="" handler="" lower="" down="" tree;="" reflect="" value.="" this.isdefaultprevented="src.defaultPrevented" src.defaultprevented="==" ie="" <="" 9,="" android="" 4.0="" src.returnvalue="==" returntrue="" returnfalse;="" type="" put="" explicitly="" provided="" properties="" onto="" jquery.extend(="" create="" incoming="" one="" this.timestamp="src" src.timestamp="" jquery.now();="" mark="" fixed="" this[="" jquery.expando="" based="" dom3="" specified="" ecmascript="" language="" binding="" http:="" www.w3.org="" tr="" wd-dom-level-3-events-20030331="" ecma-script-binding.html="" jquery.event.prototype="{" isdefaultprevented:="" returnfalse,="" ispropagationstopped:="" isimmediatepropagationstopped:="" preventdefault:="" !e="" return;="" preventdefault="" exists,="" e.preventdefault="" e.preventdefault();="" otherwise="" set="" e.returnvalue="false;" stoppropagation:="" this.ispropagationstopped="returnTrue;" stoppropagation="" e.stoppropagation="" e.stoppropagation();="" cancelbubble="" e.cancelbubble="true;" stopimmediatepropagation:="" this.isimmediatepropagationstopped="returnTrue;" e.stopimmediatepropagation="" e.stopimmediatepropagation();="" this.stoppropagation();="" mouseenter="" leave="" using="" mouseover="" out="" event-time="" checks="" jquery.each({="" mouseenter:="" "mouseover",="" mouseleave:="" "mouseout",="" pointerenter:="" "pointerover",="" pointerleave:="" "pointerout"="" orig,="" jquery.event.special[="" orig="" fix,="" bindtype:="" handle:="" ret,="" related="event.relatedTarget," handleobj="event.handleObj;" mousenter="" call="" outside="" target.="" nb:="" no="" left="" entered="" browser="" window="" !related="" (related="" !jquery.contains(="" target,="" ))="" event.type="handleObj.origType;" ret="handleObj.handler.apply(" arguments="" ret;="" });="" submit="" delegation="" !support.submitbubbles="" jquery.event.special.submit="{" setup:="" only="" need="" delegated="" form="" "form"="" lazy-add="" when="" descendant="" potentially="" submitted="" jquery.event.add(="" "click._submit="" keypress._submit",="" check="" avoids="" vml-related="" crash="" (#9807)="" "button"="" elem.form="" undefined;="" !jquery._data(="" form,="" "submitbubbles"="" "submit._submit",="" event._submit_bubble="true;" jquery._data(="" "submitbubbles",="" since="" an="" listener="" was="" user,="" tree="" delete="" event._submit_bubble;="" this.parentnode="" !event.istrigger="" jquery.event.simulate(="" "submit",="" this.parentnode,="" teardown:="" remove="" handlers;="" cleandata="" eventually="" reaps="" attached="" above="" jquery.event.remove(="" "._submit"="" change="" checkbox="" radio="" !support.changebubbles="" jquery.event.special.change="{" rformelems.test(="" this.nodename="" until="" blur;="" trigger="" click="" after="" propertychange.="" eat="" blur-change="" special.change.handle.="" still="" fires="" onchange="" second="" time="" blur.="" "radio"="" "propertychange._change",="" event.originalevent.propertyname="==" "checked"="" this._just_changed="true;" "click._change",="" triggered,="" (#11500)="" "change",="" inputs="" "beforeactivate._change",="" elem.nodename="" "changebubbles"="" "change._change",="" !event.issimulated="" "changebubbles",="" swallow="" radio,="" already="" them="" event.issimulated="" event.istrigger="" (elem.type="" elem.type="" "checkbox")="" event.handleobj.handler.apply(="" "._change"="" !rformelems.test(="" "bubbling"="" !support.focusinbubbles="" "focusin",="" attach="" single="" capturing="" while="" someone="" wants="" focusin="" focusout="" jquery.event.fix(="" ),="" attaches="jQuery._data(" !attaches="" doc.addeventlistener(="" handler,="" 1;="" doc.removeeventlistener(="" jquery._removedata(="" jquery.fn.extend({="" on:="" types,="" selector,="" data,="" fn,="" *internal*="" origfn;="" types="" can="" map="" "object"="" types-object,="" data="" selector="" "string"="" selector;="" this.on(="" types[="" ],="" this;="" fn="=" !fn="" origfn="fn;" empty="" set,="" contains="" info="" jquery().off(="" origfn.apply(="" guid="" caller="" fn.guid="origFn.guid" origfn.guid="jQuery.guid++" this.each(="" one:="" off:="" handleobj,="" types.preventdefault="" types.handleobj="" dispatched="" jquery(="" types.delegatetarget="" ).off(="" handleobj.namespace="" handleobj.origtype="" "."="" handleobj.origtype,="" handleobj.selector,="" handleobj.handler="" types-object="" [,="" selector]="" this.off(="" "function"="" fn]="" this.each(function()="" triggerhandler:="" function="" createsafefragment(="" list="nodeNames.split(" "|"="" safefrag="document.createDocumentFragment();" safefrag.createelement="" list.length="" safefrag.createelement(="" list.pop()="" safefrag;="" nodenames="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",="" rinlinejquery="/" jquery\d+="(?:null|\d+)" g,="" rnoshimcache="new" regexp("<(?:"="" ")[\\s="">]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+) ,="" rtbody="/<tbody/i," rhtml="/<|&#?\w+;/," rnoinnerhtml="/<(?:script|style|link)/i," checked="checked" or="" rchecked="/checked\s*(?:[^=]|=\s*.checked.)/i," rscripttype="/^$|\/(?:java|ecma)script/i," rscripttypemasked="/^true\/(.*)/," rcleanscript="/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)">\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple="multiple">", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8 1="" 11="" manipulating="" tables="" requires="" a="" tbody="" function="" manipulationtarget(="" elem,="" content="" )="" {="" return="" jquery.nodename(="" "table"="" &&="" content.nodetype="" !="=" ?="" :="" content.firstchild,="" "tr"="" elem.getelementsbytagname("tbody")[0]="" ||="" elem.appendchild(="" elem.ownerdocument.createelement("tbody")="" elem;="" }="" replace="" restore="" the="" type="" attribute="" of="" script="" elements="" for="" safe="" dom="" manipulation="" disablescript(="" elem="" elem.type="(jQuery.find.attr(" "type"="" null)="" +="" "="" elem.type;="" restorescript(="" var="" match="rscriptTypeMasked.exec(" );="" if="" (="" else="" elem.removeattribute("type");="" mark="" scripts="" as="" having="" already="" been="" evaluated="" setglobaleval(="" elems,="" refelements="" i="0;" ;="" (elem="elems[i])" i++="" jquery._data(="" "globaleval",="" !refelements="" refelements[i],="" "globaleval"="" clonecopyevent(="" src,="" dest="" dest.nodetype="" !jquery.hasdata(="" src="" return;="" type,="" i,="" l,="" olddata="jQuery._data(" ),="" curdata="jQuery._data(" dest,="" events="oldData.events;" delete="" curdata.handle;="" curdata.events="{};" in="" l="events[" ].length;="" <="" l;="" jquery.event.add(="" events[="" ][="" ]="" make="" cloned="" public="" data="" object="" copy="" from="" original="" curdata.data="" {},="" fixclonenodeissues(="" nodename,="" e,="" data;="" we="" do="" not="" need="" to="" anything="" non-elements="" nodename="dest.nodeName.toLowerCase();" ie6-8="" copies="" bound="" via="" attachevent="" when="" using="" clonenode.="" !support.nocloneevent="" dest[="" jquery.expando="" e="" data.events="" jquery.removeevent(="" data.handle="" event="" gets="" referenced="" instead="" copied="" expando="" too="" dest.removeattribute(="" ie="" blanks="" contents="" cloning="" scripts,="" and="" tries="" evaluate="" newly-set="" text="" "script"="" dest.text="" src.text="" ).text="src.text;" ie6-10="" improperly="" clones="" children="" classid.="" ie10="" throws="" nomodificationallowederror="" parent="" is="" null,="" #12132.="" "object"="" dest.parentnode="" dest.outerhtml="src.outerHTML;" this="" path="" appears="" unavoidable="" ie9.="" an="" element="" ie9,="" outerhtml="" strategy="" above="" sufficient.="" has="" innerhtml="" destination="" does="" not,="" src.innerhtml="" into="" dest.innerhtml.="" #10324="" support.html5clone="" !jquery.trim(dest.innerhtml)="" dest.innerhtml="src.innerHTML;" "input"="" rcheckabletype.test(="" src.type="" fails="" persist="" checked state="" checkbox="" or="" radio="" button.="" worse,="" ie6-7="" fail="" give="" appearance="" defaultchecked="" value="" isn't="" also="" set="" dest.defaultchecked="dest.checked" =="" src.checked;="" get="" confused="" end="" up="" setting="" button="" empty="" string="" "on"="" dest.value="" src.value="" selected option="" default options="" "option"="" dest.defaultselected="dest.selected" src.defaultselected;="" defaultvalue="" correct="" other="" types="" input="" fields="" "textarea"="" dest.defaultvalue="src.defaultValue;" jquery.extend({="" clone:="" function(="" dataandevents,="" deepdataandevents="" destelements,="" node,="" clone,="" srcelements,="" inpage="jQuery.contains(" elem.ownerdocument,="" jquery.isxmldoc(elem)="" !rnoshimcache.test(="" "<"="" elem.nodename="">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 1="" 2="" does="" not="" properly="" clone="" detached,="" unknown="" element="" nodes="" }="" else="" {="" fragmentdiv.innerhtml="elem.outerHTML;" fragmentdiv.removechild(="" );="" if="" (="" (!support.nocloneevent="" ||="" !support.noclonechecked)="" &&="" (elem.nodetype="==" elem.nodetype="==" 11)="" !jquery.isxmldoc(elem)="" )="" we="" eschew="" sizzle="" here="" for="" performance="" reasons:="" http:="" jsperf.com="" getall-vs-sizzle="" destelements="getAll(" srcelements="getAll(" elem="" fix="" all="" ie="" cloning="" issues="" i="0;" (node="srcElements[i])" !="null;" ++i="" ensure="" that="" the="" destination="" node="" is="" null;="" fixes="" #9587="" destelements[i]="" fixclonenodeissues(="" node,="" copy="" events="" from="" original="" to="" dataandevents="" deepdataandevents="" getall(="" i++="" clonecopyevent(="" elem,="" preserve="" script="" evaluation="" history="" clone,="" "script"="" destelements.length=""> 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9 0="" 1="" if="" (="" elem.options="" &&="" jquery.nodename(="" elem,="" "select"="" )="" {="" elem.options.length="0;" }="" return="" this;="" },="" clone:="" function(="" dataandevents,="" deepdataandevents="" dataandevents="dataAndEvents" =="null" ?="" false="" :="" dataandevents;="" deepdataandevents;="" this.map(function()="" jquery.clone(="" this,="" );="" });="" html:="" value="" access(="" var="" elem="this[" ]="" ||="" {},="" i="0," l="this.length;" undefined="" elem.nodetype="==" elem.innerhtml.replace(="" rinlinejquery,="" ""="" undefined;="" see="" we="" can="" take="" a="" shortcut="" and="" just="" use="" innerhtml="" typeof="" "string"="" !rnoinnerhtml.test(="" support.htmlserialize="" !rnoshimcache.test(="" support.leadingwhitespace="" !rleadingwhitespace.test(="" !wrapmap[="" (rtagname.exec(="" [="" "",="" ])[="" ].tolowercase()="" rxhtmltag,="" "<$1="">" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= 0="" last;="" i++="" )="" {="" elems="i" =="=" last="" ?="" this="" :="" this.clone(true);="" jquery(="" insert[i]="" )[="" original="" ](="" );="" modern="" browsers="" can="" apply="" jquery="" collections="" as="" arrays,="" but="" oldie="" needs="" a="" .get()="" push.apply(="" ret,="" elems.get()="" }="" return="" this.pushstack(="" ret="" };="" });="" var="" iframe,="" elemdisplay="{};" **="" *="" retrieve="" the="" actual="" display="" of="" element="" @param="" {string}="" name="" nodename="" {object}="" doc="" document="" object="" called="" only="" from="" within="" defaultdisplay="" function="" actualdisplay(="" name,="" style,="" elem="jQuery(" doc.createelement(="" ).appendto(="" doc.body="" ),="" getdefaultcomputedstyle="" might="" be="" reliably="" used="" on="" attached="" &&="" (="" style="window.getDefaultComputedStyle(" elem[="" ]="" use="" method="" is="" temporary="" fix="" (more="" like="" optmization)="" until="" something="" better="" comes="" along,="" since="" it="" was="" removed="" specification="" and="" supported="" in="" ff="" style.display="" jquery.css(="" ],="" "display"="" we="" don't="" have="" any="" data="" stored="" element,="" so="" "detach"="" fast="" way="" to="" get="" rid="" elem.detach();="" display;="" try="" determine="" default value="" an="" defaultdisplay(="" ];="" if="" !display="" nodename,="" simple="" fails,="" read="" inside="" iframe="" "none"="" ||="" already-created="" possible="" "<iframe="" frameborder="0" width="0" height="0">" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, 0="" 1="" 2="" 3="" 4="" 8="" 17="" 27="" 2007="" 13343="" android="" 2.3="" vendor-prefix="" box-sizing="" "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;"="" +="" "box-sizing:content-box;display:block;margin:0;border:0;"="" "padding:1px;width:1px;zoom:1";="" div.appendchild(="" document.createelement(="" "div"="" )="" ).style.width="5px" ;="" shrinkwrapblocksval="div.offsetWidth" !="=" 3;="" }="" body.removechild(="" container="" );="" return="" shrinkwrapblocksval;="" };="" })();="" var="" rmargin="(/^margin/);" rnumnonpx="new" regexp(="" "^("="" pnum="" ")(?!px)[a-z%]+$",="" "i"="" getstyles,="" curcss,="" rposition="/^(top|right|bottom|left)$/;" if="" (="" window.getcomputedstyle="" {="" getstyles="function(" elem="" elem.ownerdocument.defaultview.getcomputedstyle(="" elem,="" null="" curcss="function(" name,="" computed="" width,="" minwidth,="" maxwidth,="" ret,="" style="elem.style;" ||="" getstyles(="" getpropertyvalue="" is="" only="" needed="" for="" .css('filter')="" in="" ie9,="" see="" #12537="" ret="computed" ?="" computed.getpropertyvalue(="" name="" computed[="" ]="" :="" undefined;="" ""="" &&="" !jquery.contains(="" elem.ownerdocument,="" a="" tribute="" to="" the="" "awesome="" hack="" by="" dean="" edwards"="" chrome="" <="" and="" safari="" 5.0="" uses="" "computed="" value"="" instead="" of="" "used="" margin-right="" 5.1.7="" (at="" least)="" returns="" percentage="" larger="" set="" values,="" but="" width="" seems="" be="" reliably="" pixels="" this="" against="" cssom="" draft="" spec:="" http:="" dev.w3.org="" csswg="" #resolved-values="" rnumnonpx.test(="" rmargin.test(="" remember="" original="" values="" minwidth="style.minWidth;" maxwidth="style.maxWidth;" put="" new="" get="" value="" out="" style.minwidth="style.maxWidth" =="" style.width="ret;" revert="" changed="" style.maxwidth="maxWidth;" support:="" ie="" zindex="" as="" an="" integer.="" undefined="" "";="" else="" document.documentelement.currentstyle="" elem.currentstyle;="" left,="" rs,="" rsleft,="" avoid="" setting="" empty="" string="" here="" so="" we="" don't="" default auto="" style[="" ];="" from="" awesome="" edwards="" erik.eae.net="" archives="" 07="" 18.54.15="" #comment-102291="" we're="" not="" dealing="" with="" regular="" pixel="" number="" that="" has="" weird="" ending,="" need="" convert="" it="" position="" css="" attributes,="" those="" are="" proportional="" parent="" element="" can't="" measure="" because="" might="" trigger="" "stacking="" dolls"="" problem="" !rposition.test(="" left="style.left;" rs="elem.runtimeStyle;" rsleft="rs" rs.left;="" rs.left="elem.currentStyle.left;" style.left="name" "fontsize"="" "1em"="" ret;="" "px";="" "auto";="" function="" addgethookif(="" conditionfn,="" hookfn="" define="" hook,="" we'll="" check="" on="" first="" run="" it's="" really="" needed.="" get:="" function()="" condition="conditionFn();" test="" was="" ready="" at="" point;="" screw="" hook="" time="" again="" when="" next="" time.="" return;="" (or="" possible="" use="" due="" missing="" dependency),="" remove="" it.="" since="" there="" no="" other="" hooks="" marginright,="" whole="" object.="" delete="" this.get;="" needed;="" redefine="" support="" executed="" again.="" (this.get="hookFn).apply(" this,="" arguments="" (function()="" minified:="" b,c,d,e,f,g,="" h,i="" div,="" style,="" a,="" pixelpositionval,="" boxsizingreliableval,="" reliablehiddenoffsetsval,="" reliablemarginrightval;="" setup="" div="document.createElement(" div.innerhtml="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>" "a"="" )[="" a.style;="" finish="" early="" limited="" (non-browser)="" environments="" !style="" style.csstext="float:left;opacity:.5" ie<9="" make="" sure="" opacity="" exists="" (as="" opposed="" filter)="" support.opacity="style.opacity" "0.5";="" verify="" float="" existence="" (ie="" stylefloat="" cssfloat)="" support.cssfloat="!!style.cssFloat;" div.style.backgroundclip="content-box" div.clonenode(="" true="" ).style.backgroundclip="" support.clearclonestyle="div.style.backgroundClip" "content-box";="" firefox<29,="" support.boxsizing="style.boxSizing" style.mozboxsizing="==" style.webkitboxsizing="==" jquery.extend(support,="" reliablehiddenoffsets:="" reliablehiddenoffsetsval="=" computestyletests();="" reliablehiddenoffsetsval;="" },="" boxsizingreliable:="" boxsizingreliableval="=" boxsizingreliableval;="" pixelposition:="" pixelpositionval="=" pixelpositionval;="" reliablemarginright:="" reliablemarginrightval="=" });="" computestyletests()="" b,c,d,j="" body,="" container,="" contents;="" body="document.getElementsByTagName(" "body"="" !body="" !body.style="" fired="" too="" or="" unsupported="" environment,="" exit.="" container.style.csstext="position:absolute;border:0;width:0;height:0;top:0;left:-9999px" body.appendchild(="" ).appendchild(="" div.style.csstext="//" "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;"="" "box-sizing:border-box;display:block;margin-top:1%;top:1%;"="" "border:1px;padding:1px;width:4px;position:absolute";="" assume="" reasonable="" absence="" getcomputedstyle="" false;="" code="" ie<9.="" window.getcomputedstyle(="" {}="" ).top="" "1%";="" width:="" "4px"="" ).width="==" "4px";="" explicit="" incorrectly="" gets="" based="" (#3333)="" webkit="" bug="" -="" wrong="" contents="div.appendChild(" reset="" css:="" box-sizing;="" display;="" margin;="" border;="" padding="" contents.style.csstext="div.style.cssText" "box-sizing:content-box;display:block;margin:0;border:0;padding:0";="" contents.style.marginright="contents.style.width" "0";="" div.style.width="1px" contents,="" ).marginright="" ie8="" table="" cells="" still="" have="" offsetwidth="" height="" they="" display:none="" visible="" row;="" so,="" reliable="" determining="" been="" hidden directly="" using="" (it="" safe="" offsets="" hidden;="" don="" safety="" goggles="" #4512="" more="" information).="" "td"="" contents[="" ].style.csstext="margin:0;border:0;padding:0;display:none" ].offsetheight="==" 0;="" ].style.display="" method="" quickly="" swapping="" properties="" correct="" calculations.="" jquery.swap="function(" options,="" callback,="" args="" old="{};" insert="" ones="" options="" old[="" elem.style[="" []="" ralpha="/alpha\([^)]*\)/i," ropacity="/opacity\s*=\s*([^)]*)/," swappable="" display="" none="" starts="" except="" "table",="" "table-cell",="" "table-caption"="" values:="" https:="" developer.mozilla.org="" en-us="" docs="" rdisplayswap="/^(none|table(?!-c[ea]).+)/," rnumsplit="new" ")(.*)$",="" ),="" rrelnum="new" "^([+-])="("" ")",="" cssshow="{" position:="" "absolute",="" visibility:="" "hidden",="" display:="" "block"="" cssnormaltransform="{" letterspacing:="" "0",="" fontweight:="" "400"="" cssprefixes="[" "webkit",="" "o",="" "moz",="" "ms"="" property="" mapped="" potentially="" vendor="" prefixed="" vendorpropname(="" shortcut="" names="" name;="" capname="name.charAt(0).toUpperCase()" name.slice(1),="" origname="name," i="cssPrefixes.length;" while="" i--="" capname;="" origname;="" showhide(="" elements,="" show="" display,="" hidden,="" index="0," length="elements.length;" length;="" index++="" !elem.style="" continue;="" values[="" "olddisplay"="" inline="" learn="" being="" cascaded="" rules="" !values[="" "none"="" elem.style.display="" elements="" which="" overridden="" stylesheet="" whatever="" browser="" such="" ishidden(="" "olddisplay",="" defaultdisplay(elem.nodename)="" !hidden="" jquery._data(="" jquery.css(="" "display"="" most="" second="" loop constant="" reflow="" !show="" "none";="" elements;="" setpositivenumber(="" value,="" subtract="" matches="rnumsplit.exec(" guard="" "subtract",="" e.g.,="" used="" csshooks="" math.max(="" 0,="" matches[="" "px"="" value;="" augmentwidthorheight(="" extra,="" isborderbox,="" styles="" isborderbox="" "border"="" "content"="" already="" right="" measurement,="" augmentation="" otherwise="" initialize="" horizontal="" vertical="" "width"="" val="0;" 4;="" both="" box="" models="" exclude="" margin,="" add="" want="" extra="==" "margin"="" cssexpand[="" ],="" true,="" border-box="" includes="" padding,="" content="" "padding"="" point,="" isn't="" border="" nor="" "width",="" content,="" val;="" getwidthorheight(="" start="" offset="" property,="" equivalent="" valueisborderbox="true," elem.offsetwidth="" elem.offsetheight,="" "boxsizing",="" false,="" "border-box";="" some="" non-html="" offsetwidth,="" svg="" bugzilla.mozilla.org="" show_bug.cgi?id="649285" mathml="" fall="" back="" then="" uncomputed="" necessary="" unit="" pixels.="" stop="" return.="" rnumnonpx.test(val)="" case="" unreliable="" silently="" falls="" elem.style="" support.boxsizingreliable()="" normalize="" "",="" auto,="" prepare="" active="" model="" irrelevant="" valueisborderbox,="" jquery.extend({="" overriding="" behavior="" getting="" csshooks:="" opacity:="" function(="" should="" always="" "opacity"="" "1"="" automatically="" these="" possibly-unitless="" cssnumber:="" "columncount":="" "fillopacity":="" "flexgrow":="" "flexshrink":="" "fontweight":="" "lineheight":="" "opacity":="" "order":="" "orphans":="" "widows":="" "zindex":="" "zoom":="" whose="" you="" wish="" fix="" before="" cssprops:="" "float":="" "cssfloat"="" "stylefloat"="" dom="" node="" style:="" text="" comment="" nodes="" !elem="" elem.nodetype="==" working="" type,="" hooks,="" jquery.cssprops[="" version="" followed="" unprefixed="" jquery.csshooks[="" type="typeof" relative="" strings="" (+="or" numbers.="" #7345="" "string"="" (ret="rrelNum.exec(" ))="" ret[1]="" *="" ret[2]="" parsefloat(="" fixes="" #9237="" nan="" aren't="" set.="" see:="" #7116="" passed="" in,="" 'px'="" (except="" certain="" properties)="" "number"="" !jquery.cssnumber[="" #8908,="" can="" done="" correctly="" specifing="" setters="" csshooks,="" would="" mean="" eight="" (for="" every="" problematic="" property)="" identical="" functions="" !support.clearclonestyle="" name.indexof("background")="==" provided,="" just="" specified="" !hooks="" !("set"="" hooks)="" (value="hooks.set(" swallow="" errors="" 'invalid'="" (#5509)="" try="" catch(e)="" provided="" non-computed="" "get"="" object="" num,="" val,="" elem.style,="" otherwise,="" way="" exists,="" "normal"="" return,="" converting="" forced="" qualifier="" looks="" numeric="" num="parseFloat(" jquery.isnumeric(="" jquery.each([="" "height",="" i,="" computed,="" dimension="" info="" invisibly="" them="" however,="" must="" current="" benefit="" rdisplayswap.test(="" jquery.swap(="" cssshow,="" })="" set:="" "border-box",="" !support.opacity="" jquery.csshooks.opacity="{" filters="" ropacity.test(="" (computed="" elem.currentstyle="" elem.currentstyle.filter="" elem.style.filter)="" 0.01="" regexp.$1="" currentstyle="elem.currentStyle," "alpha(opacity=" + value * 100 + " )"="" filter="currentStyle" currentstyle.filter="" style.filter="" trouble="" does="" layout="" force="" zoom="" level="" style.zoom="1;" 1,="" exist="" attempt="" attribute="" #6652="" #12685="">= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 0="" 1="" 2="" 3="" 4="" panic="" based="" approach="" to="" setting="" things="" on="" disconnected="" nodes="" tween.prophooks.scrolltop="Tween.propHooks.scrollLeft" =="" {="" set:="" function(="" tween="" )="" if="" (="" tween.elem.nodetype="" &&="" tween.elem.parentnode="" tween.elem[="" tween.prop="" ]="tween.now;" }="" };="" jquery.easing="{" linear:="" p="" return="" p;="" },="" swing:="" 0.5="" -="" math.cos(="" *="" math.pi="" 2;="" jquery.fx="Tween.prototype.init;" back="" compat="" <1.8="" extension="" point="" jquery.fx.step="{};" var="" fxnow,="" timerid,="" rfxtypes="/^(?:toggle|show|hide)$/," rfxnum="new" regexp(="" "^(?:([+-])="|)("" +="" pnum="" ")([a-z%]*)$",="" "i"="" ),="" rrun="/queueHooks$/," animationprefilters="[" defaultprefilter="" ],="" tweeners="{" "*":="" [="" prop,="" value="" target="tween.cur()," parts="rfxnum.exec(" unit="parts" parts[="" ||="" jquery.cssnumber[="" prop="" ?="" ""="" :="" "px"="" starting="" computation="" is="" required for="" potential="" mismatches="" start="(" !="=" +target="" rfxnum.exec(="" jquery.css(="" tween.elem,="" scale="1," maxiterations="20;" start[="" trust="" units="" reported="" by="" jquery.css="" ];="" make="" sure="" we="" update="" the="" properties="" later="" [];="" iteratively="" approximate="" from="" a="" nonzero="" 1;="" do="" previous="" iteration="" zeroed="" out,="" double="" until="" get="" *something*="" use="" string="" doubling="" factor="" so="" don't="" accidentally="" see="" as="" unchanged="" below="" ".5";="" adjust="" and="" apply="" scale;="" jquery.style(="" );="" scale,="" tolerating="" zero="" or="" nan="" tween.cur()="" breaking="" loop perfect,="" we've="" just="" had="" enough="" while="" (scale="tween.cur()" target)="" --maxiterations="" +start="" 0;="" tween.unit="unit;" token="" was="" provided,="" we're="" doing="" relative="" animation="" tween.end="parts[" +parts[="" tween;="" animations="" created="" synchronously="" will="" run="" function="" createfxnow()="" settimeout(function()="" fxnow="undefined;" });="" generate="" parameters="" create="" standard="" genfx(="" type,="" includewidth="" which,="" attrs="{" height:="" type="" i="0;" include="" width,="" step="" all="" cssexpand="" values,="" skip="" over="" left="" right="" ;="" <="" which="cssExpand[" attrs[="" "margin"="" "padding"="" attrs.opacity="attrs.width" type;="" attrs;="" createtween(="" value,="" tween,="" collection="(" tweeners[="" []="" ).concat(="" "*"="" index="0," length="collection.length;" length;="" index++="" (tween="collection[" ].call(="" animation,="" ))="" done="" with="" this="" property="" defaultprefilter(="" elem,="" props,="" opts="" jshint="" validthis:="" true="" toggle,="" hooks,="" oldfire,="" display,="" checkdisplay,="" anim="this," orig="{}," style="elem.style," hidden="elem.nodeType" ishidden(="" elem="" datashow="jQuery._data(" "fxshow"="" handle="" queue:="" false="" promises="" !opts.queue="" hooks="jQuery._queueHooks(" "fx"="" hooks.unqueued="=" null="" oldfire="hooks.empty.fire;" hooks.empty.fire="function()" !hooks.unqueued="" oldfire();="" hooks.unqueued++;="" anim.always(function()="" makes="" that="" complete="" handler="" be="" called="" before="" completes="" hooks.unqueued--;="" !jquery.queue(="" ).length="" hooks.empty.fire();="" height="" width="" overflow="" pass="" elem.nodetype="==" "height"="" in="" props="" "width"="" nothing="" sneaks="" out="" record="" attributes="" because="" ie="" does="" not="" change="" attribute="" when="" overflowx="" overflowy="" are="" set="" same="" opts.overflow="[" style.overflow,="" style.overflowx,="" style.overflowy="" display="" inline-block="" inline="" elements="" having="" animated="" "display"="" test="" default currently="" "none"="" checkdisplay="display" jquery._data(="" "olddisplay"="" defaultdisplay(="" elem.nodename="" display;="" "inline"="" "float"="" inline-level="" accept="" inline-block;="" block-level="" need="" layout="" !support.inlineblockneedslayout="" style.display="inline-block" else="" style.zoom="1;" style.overflow="hidden" !support.shrinkwrapblocks()="" style.overflowx="opts.overflow[" show="" hide="" rfxtypes.exec(="" delete="" props[="" toggle="toggle" "toggle";="" "hide"="" "show"="" there="" stopped="" going="" proceed="" show,="" should="" pretend="" datashow[="" undefined="" continue;="" orig[="" any="" non-fx="" stops="" us="" restoring="" original="" !jquery.isemptyobject(="" "hidden"="" "fxshow",="" {}="" store="" state="" its="" enables="" .stop().toggle()="" "reverse"="" datashow.hidden="!hidden;" jquery(="" ).show();="" anim.done(function()="" ).hide();="" prop;="" jquery._removedata(="" 0,="" !(="" tween.start="prop" noop="" like="" .hide().hide(),="" restore="" an="" overwritten="" (display="==" display)="==" propfilter(="" specialeasing="" index,="" name,="" easing,="" hooks;="" camelcase,="" expand="" csshook="" name="jQuery.camelCase(" easing="specialEasing[" jquery.isarray(="" "expand"="" quite="" $.extend,="" wont="" overwrite="" keys="" already="" present.="" also="" reusing="" 'index'="" above="" have="" correct="" "name"="" specialeasing[="" animation(="" properties,="" options="" result,="" stopped,="" deferred="jQuery.Deferred().always(" function()="" match="" :animated="" selector="" tick.elem;="" }),="" tick="function()" false;="" currenttime="fxNow" createfxnow(),="" remaining="Math.max(" animation.starttime="" animation.duration="" archaic="" crash="" bug="" won't="" allow="" (#12497)="" temp="remaining" percent="1" temp,="" animation.tweens[="" ].run(="" deferred.notifywith(="" percent,="" ]);="" remaining;="" deferred.resolvewith(="" elem:="" props:="" jquery.extend(="" {},="" opts:="" true,="" specialeasing:="" originalproperties:="" originaloptions:="" options,="" starttime:="" duration:="" options.duration,="" tweens:="" [],="" createtween:="" end="" animation.opts,="" end,="" animation.opts.specialeasing[="" animation.opts.easing="" animation.tweens.push(="" stop:="" gotoend="" want="" tweens="" otherwise="" part="" animation.tweens.length="" this;="" resolve="" played="" last="" frame="" otherwise,="" reject="" deferred.rejectwith(="" animation.opts.specialeasing="" result="animationPrefilters[" animation.opts="" result;="" jquery.map(="" createtween,="" jquery.isfunction(="" animation.opts.start="" animation.opts.start.call(="" jquery.fx.timer(="" tick,="" anim:="" animation.opts.queue="" })="" attach="" callbacks="" animation.progress(="" animation.opts.progress="" .done(="" animation.opts.done,="" animation.opts.complete="" .fail(="" animation.opts.fail="" .always(="" animation.opts.always="" jquery.animation="jQuery.extend(" tweener:="" callback="" ");="" ].unshift(="" prefilter:="" callback,="" prepend="" animationprefilters.unshift(="" animationprefilters.push(="" jquery.speed="function(" speed,="" fn="" opt="speed" typeof="" speed="==" "object"="" complete:="" !fn="" easing:="" !jquery.isfunction(="" opt.duration="jQuery.fx.off" "number"="" jquery.fx.speeds="" jquery.fx.speeds[="" jquery.fx.speeds._default;="" normalize="" opt.queue=""> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link><table></table><a href="/a">a</a><input type="checkbox">";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
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
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9 0="" 7="" also="" clear="" defaultchecked="" defaultselected="" (if="" appropriate)="" }="" else="" {="" elem[="" jquery.camelcase(="" "default-"="" +="" name="" )="" ]="elem[" propname="" see="" #9699="" for="" explanation="" of="" this="" approach="" (setting="" first,="" then="" removal)="" jquery.attr(="" elem,="" name,="" ""="" );="" elem.removeattribute(="" getsetattribute="" ?="" :="" },="" attrhooks:="" type:="" set:="" function(="" value="" if="" (="" !support.radiovalue="" &&="" "radio"="" jquery.nodename(elem,="" "input")="" setting="" the="" type="" on="" a="" radio="" button="" after="" resets="" in="" ie6-9="" reset="" to="" default case="" is="" set="" during="" creation="" var="" val="elem.value;" elem.setattribute(="" "type",="" elem.value="val;" return="" value;="" });="" hook="" boolean="" attributes="" boolhook="{" value,="" false="" remove="" when="" jquery.removeattr(="" getsetinput="" ||="" !rusedefault.test(="" ie<8="" needs="" *property*="" !getsetattribute="" jquery.propfix[="" use="" and="" oldie="" name;="" };="" retrieve="" booleans="" specially="" jquery.each(="" jquery.expr.match.bool.source.match(="" \w+="" g="" ),="" i,="" getter="attrHandle[" jquery.find.attr;="" attrhandle[="" isxml="" ret,="" handle;="" !isxml="" avoid="" an="" infinite="" loop by="" temporarily="" removing="" function="" from="" handle="attrHandle[" ];="" ret="getter(" !="null" name.tolowercase()="" null;="" ret;="" fix="" attroperties="" !getsetinput="" jquery.attrhooks.value="{" jquery.nodename(="" "input"="" does="" not="" so="" that="" setattribute="" used="" elem.defaultvalue="value;" nodehook="" defined="" (#1954);="" otherwise="" fine="" nodehook.set(="" ie6="" do="" support="" getting="" some="" with="" get="" any="" attribute="" fixes="" almost="" every="" issue="" existing="" or="" create="" new="" node="" !ret="" elem.setattributenode(="" (ret="elem.ownerDocument.createAttribute(" ))="" ret.value="value" ;="" break="" association="" cloned="" elements="" using="" (#9646)="" "value"="" elem.getattribute(="" are="" constructed="" empty-string="" values="" attrhandle.id="attrHandle.name" =="" attrhandle.coords="function(" fixing="" retrieval="" requires="" module="" jquery.valhooks.button="{" get:="" ret.specified="" ret.value;="" nodehook.set="" contenteditable="" removals(#10429)="" empty="" string="" throws="" error="" as="" invalid="" jquery.attrhooks.contenteditable="{" width="" height="" auto="" instead="" string(="" bug="" #8150="" removals="" jquery.each([="" "width",="" "height"="" ],="" jquery.attrhooks[="" "auto"="" !support.style="" jquery.attrhooks.style="{" elem="" undefined="" note:="" ie="" uppercases="" css="" property="" names,="" but="" we="" were="" .tolowercase()="" .csstext,="" would="" destroy="" senstitivity="" url's,="" like="" "background"="" elem.style.csstext="" undefined;="" rfocusable="/^(?:input|select|textarea|button|object)$/i," rclickable="/^(?:a|area)$/i;" jquery.fn.extend({="" prop:="" access(="" this,="" jquery.prop,="" arguments.length=""> 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
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
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

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
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
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
			xml: /xml/,
			html: /html/,
			json: /json/
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
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
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
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
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
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 0="" 4="" 200="" 204="" 1223="" 12.12="" opera="" reports="" offsetwidths="" and="" offsetheights="" less="" than="" zero="" on="" some="" elements="" return="" elem.offsetwidth="" <="0" &&="" elem.offsetheight="" ||="" (!support.reliablehiddenoffsets()="" ((elem.style="" elem.style.display)="" jquery.css(="" elem,="" "display"="" ))="==" "none");="" };="" jquery.expr.filters.visible="function(" elem="" )="" {="" !jquery.expr.filters.hidden(="" );="" var="" r20="/%20/g," rbracket="/\[\]$/," rcrlf="/\r?\n/g," rsubmittertypes="/^(?:submit|button|image|reset|file)$/i," rsubmittable="/^(?:input|select|textarea|keygen)/i;" function="" buildparams(="" prefix,="" obj,="" traditional,="" add="" name;="" if="" (="" jquery.isarray(="" obj="" serialize="" array="" item.="" jquery.each(="" function(="" i,="" v="" traditional="" rbracket.test(="" prefix="" treat="" each="" item="" as="" a="" scalar.="" add(="" }="" else="" is="" non-scalar="" (array="" or="" object),="" encode="" its="" numeric="" index.="" +="" "["="" typeof="" "object"="" ?="" i="" :="" ""="" "]",="" v,="" });="" !traditional="" jquery.type(="" object="" for="" name="" in="" obj[="" ],="" scalar="" an="" of="" form="" set="" key="" values="" into="" query="" string="" jquery.param="function(" a,="" s="[]," key,="" value="" function,="" invoke="" it="" value()="" null="" s[="" s.length="" ]="encodeURIComponent(" "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the " old"="" way="" (the="" 1.3.2="" older="" did="" it),="" otherwise="" params="" recursively.="" a[="" the="" resulting="" serialization="" s.join(="" "&"="" ).replace(="" r20,="" "+"="" jquery.fn.extend({="" serialize:="" function()="" jquery.param(="" this.serializearray()="" },="" serializearray:="" this.map(function()="" can="" prophook="" "elements"="" to="" filter="" this,="" jquery.makearray(="" this;="" })="" .filter(function()="" type="this.type;" use="" .is(":disabled")="" so="" that="" fieldset[disabled]="" works="" this.name="" !jquery(="" this="" ).is(="" ":disabled"="" rsubmittable.test(="" this.nodename="" !rsubmittertypes.test(="" this.checked="" !rcheckabletype.test(="" .map(function(="" val="jQuery(" ).val();="" jquery.map(="" val,="" name:="" elem.name,="" value:="" val.replace(="" rcrlf,="" "\r\n"="" }).get();="" create="" request="" (this="" still="" attached="" ajaxsettings="" backward="" compatibility)="" jquery.ajaxsettings.xhr="window.ActiveXObject" !="=" undefined="" support:="" ie6+="" xhr="" cannot="" access="" local="" files,="" always="" activex="" case="" !this.islocal="" ie7-8="" oldie="" does="" not="" support="" non-rfc2616="" methods="" (#13240)="" see="" http:="" msdn.microsoft.com="" en-us="" library="" ie="" ms536648(v="vs.85).aspx" www.w3.org="" protocols="" rfc2616="" rfc2616-sec9.html#sec9="" although="" check="" six="" instead="" eight="" since="" also="" "trace"="" "connect"="" ^(get|post|head|put|delete|options)$="" i.test(="" this.type="" createstandardxhr()="" createactivexhr();="" all="" other="" browsers,="" standard="" xmlhttprequest="" createstandardxhr;="" xhrid="0," xhrcallbacks="{}," xhrsupported="jQuery.ajaxSettings.xhr();" ie<10="" open requests="" must="" be="" manually="" aborted="" unload="" (#5280)="" window.activexobject="" jquery(="" window="" ).on(="" "unload",="" xhrcallbacks[="" ](="" undefined,="" true="" determine="" properties="" support.cors="!!xhrSupported" "withcredentials"="" =="" !!xhrsupported;="" transport="" browser="" provide="" jquery.ajaxtransport(function(="" options="" cross="" domain="" only="" allowed="" supported="" through="" !options.crossdomain="" callback;="" send:="" headers,="" complete="" id="++xhrId;" socket="" xhr.open(="" options.type,="" options.url,="" options.async,="" options.username,="" options.password="" apply="" custom="" fields="" provided="" options.xhrfields="" xhr[="" ];="" override="" mime="" needed="" options.mimetype="" xhr.overridemimetype="" xhr.overridemimetype(="" x-requested-with="" header="" cross-domain="" requests,="" seeing="" conditions="" preflight="" are="" akin="" jigsaw="" puzzle,="" we="" simply="" never="" sure.="" (it="" per-request="" basis="" even="" using="" ajaxsetup)="" same-domain="" won't="" change="" already="" provided.="" !headers["x-requested-with"]="" headers["x-requested-with"]="XMLHttpRequest" ;="" headers="" ie<9="" ie's="" activexobject="" throws="" 'type="" mismatch'="" exception="" when="" setting="" null-value.="" keep="" consistent="" with="" implementations,="" cast="" ignore="" `undefined`.="" headers[="" xhr.setrequestheader(="" do="" send="" may="" raise="" which="" actually="" handled="" jquery.ajax="" (so="" no="" try="" catch="" here)="" xhr.send(="" options.hascontent="" options.data="" listener="" callback="function(" _,="" isabort="" status,="" statustext,="" responses;="" was="" called="" xhr.readystate="==" clean="" up="" delete="" xhr.onreadystatechange="jQuery.noop;" abort="" xhr.abort();="" responses="{};" status="xhr.status;" accessing="" binary-data="" responsetext="" (#11426)="" xhr.responsetext="==" "string"="" responses.text="xhr.responseText;" firefox="" statustext="" faulty="" catch(="" e="" normalize="" webkit="" giving="" empty="" non="" behaviors="" have="" data:="" assume="" success="" (success="" data="" get="" notified,="" that's="" best="" given="" current="" implementations)="" !status="" options.islocal="" 404;="" -="" #1450:="" sometimes="" returns="" should="" call="" complete(="" responses,="" xhr.getallresponseheaders()="" !options.async="" we're="" sync="" mode="" fire="" callback();="" (ie6="" &="" ie7)="" it's="" cache="" has="" been="" retrieved="" directly="" need="" settimeout(="" list="" active="" callbacks="" abort:="" callback(="" functions="" xhrs="" new="" window.xmlhttprequest();="" {}="" createactivexhr()="" window.activexobject(="" "microsoft.xmlhttp"="" install="" script="" datatype="" jquery.ajaxsetup({="" accepts:="" script:="" "text="" javascript,="" application="" ecmascript,="" x-ecmascript"="" contents:="" (?:java|ecma)script="" converters:="" script":="" text="" jquery.globaleval(="" text;="" handle="" cache's="" special="" global="" jquery.ajaxprefilter(="" "script",="" s.cache="==" s.crossdomain="" s.type="GET" s.global="false;" bind="" tag="" hack="" jquery.ajaxtransport(="" function(s)="" deals="" script,="" head="document.head" jquery("head")[0]="" document.documentelement;="" script.async="true;" s.scriptcharset="" script.charset="s.scriptCharset;" script.src="s.url;" attach="" handlers="" browsers="" script.onload="script.onreadystatechange" !script.readystate="" loaded|complete="" .test(="" script.readystate="" memory="" leak="" null;="" remove="" script.parentnode="" script.parentnode.removechild(="" dereference="" !isabort="" 200,="" "success"="" circumvent="" ie6="" bugs="" base="" (#2709="" #4378)="" by="" prepending="" native="" dom="" manipulation="" avoid="" our="" dommanip="" ajax="" trickery="" head.insertbefore(="" head.firstchild="" script.onload(="" oldcallbacks="[]," rjsonp="/(=)\?(?=&|$)|\?\?/;" default jsonp="" settings="" jsonp:="" "callback",="" jsonpcallback:="" jquery.expando="" "_"="" nonce++="" this[="" detect,="" "json="" jsonp",="" s,="" originalsettings,="" jqxhr="" callbackname,="" overwritten,="" responsecontainer,="" jsonprop="s.jsonp" false="" rjsonp.test(="" s.url="" "url"="" s.data="==" !(="" s.contenttype="" ).indexof("application="" x-www-form-urlencoded")="" "data"="" iff="" expected="" "jsonp"="" parameter="" s.datatypes[="" name,="" remembering="" preexisting="" associated="" callbackname="s.jsonpCallback" jquery.isfunction(="" s.jsonpcallback="" s.jsonpcallback()="" s.jsonpcallback;="" insert="" url="" ].replace(="" rjsonp,="" "$1"="" s.jsonp="" rquery.test(="" "?"="" json"]="function()" !responsecontainer="" jquery.error(="" called"="" responsecontainer[="" force="" json="" overwritten="window[" window[="" responsecontainer="arguments;" clean-up="" (fires="" after="" converters)="" jqxhr.always(function()="" restore="" save="" back="" free="" make="" sure="" re-using="" doesn't="" screw="" things="" around="" future="" oldcallbacks.push(="" response="" overwritten(="" undefined;="" delegate="" "script";="" html="" context="" (optional):="" specified,="" fragment="" will="" created="" context,="" defaults="" document="" keepscripts="" true,="" include="" scripts="" passed="" jquery.parsehtml="function(" data,="" !data="" "boolean"="" document;="" parsed="rsingleTag.exec(" ),="" [];="" single="" [="" context.createelement(="" parsed[1]="" scripts.length="" ).remove();="" jquery.merge(="" [],="" parsed.childnodes="" copy="" old="" load="" method="" _load="jQuery.fn.load;" **="" *="" page="" jquery.fn.load="function(" url,="" params,="" _load.apply(="" arguments="" selector,="" response,="" type,="" self="this," off="url.indexOf("" ");="">= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

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

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
</div></=></9></=9></29,></=></9></table></tfoot></thead></tbody></table></tbody></$1></=8></8></([\w:]+)></(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^></9></9></9></9></=></"></)></tag></\></14></9,></8></8></4.0></24></9></4.1,>