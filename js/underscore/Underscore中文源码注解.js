//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
/////////////////////////////////////////////////////////////////////////////////////////
//**   Underscore.js 中文源码注解
//**   wzl

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Reusable constructor function for prototype setting.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  //** Underscore的构造函数
  var _ = function(obj) {
    if (obj instanceof _) {
      return obj;
    }

    //** 如果 _ 的调用方式不是 new
    if (!(this instanceof _)) {
      return new _(obj);
    }
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  //** 将这个大的私有块作用域里的 _ 输出到外部
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    //** 如果是浏览器的话，将 _ 挂载为浏览器全局变量 window 的属性
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.7.0';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matches(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var isArrayLike = function(collection) {
    var length = collection && collection.length;
    return typeof length == 'number' && length >= 0 && length <= max_array_index;="" };="" collection="" functions="" --------------------="" the="" cornerstone,="" an="" `each`="" implementation,="" aka="" `foreach`.="" handles="" raw="" objects="" in="" addition="" to="" array-likes.="" treats="" all="" sparse="" array-likes="" as="" if="" they="" were="" dense.="" _.each="_.forEach" =="" function(obj,="" iteratee,="" context)="" {="" (obj="=" null)="" return="" obj;="" iteratee="optimizeCb(iteratee," context);="" var="" i,="" length="obj.length;" (isarraylike(obj))="" for="" (i="0;" i="" <="" length;="" i++)="" iteratee(obj[i],="" obj);="" }="" else="" keys="_.keys(obj);" iteratee(obj[keys[i]],="" keys[i],="" results="" of="" applying="" each="" element.="" _.map="_.collect" [];="" &&="" _.keys(obj),="" ||="" obj).length,="" currentkey;="" (var="" index="0;" index++)="" currentkey="keys" ?="" keys[index]="" :="" index;="" results[index]="iteratee(obj[currentKey]," currentkey,="" results;="" create="" a="" reducing="" function="" iterating="" left="" or="" right.="" createreduce(dir)="" optimized="" iterator="" using="" arguments.length="" main="" will="" deoptimize="" the,="" see="" #1991.="" iterator(obj,="" memo,="" keys,="" index,="" length)="" (;="">= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      if (obj == null) return memo;
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // **Transform** is an alternative to reduce that transforms `obj` to a new
  // `accumulator` object.
  _.transform = function(obj, iteratee, accumulator, context) {
    if (accumulator == null) {
      if (_.isArray(obj)) {
        accumulator = [];
      } else if (_.isObject(obj)) {
        var Ctor = obj.constructor;
        accumulator = baseCreate(typeof Ctor == 'function' && Ctor.prototype);
      } else {
        accumulator = {};
      }
    }
    if (obj == null) return accumulator;
    iteratee = optimizeCb(iteratee, context, 4);
    var keys = obj.length !== +obj.length && _.keys(obj),
      length = (keys || obj).length,
      index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (iteratee(accumulator, obj[currentKey], currentKey, obj) === false) break;
    }
    return accumulator;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  //** 返回第一个符合条件的值，别名为 `detect`。
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  //**
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    if (obj == null) return true;
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    if (obj == null) return false;
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, target, fromIndex) {
    if (obj == null) return false;
    if (!isArrayLike(obj)) obj = _.values(obj);
    return _.indexOf(obj, target, typeof fromIndex == 'number' && fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  // Returns a (stably) sorted copy of list, 
  // ranked in ascending order by the results of running each value through iteratee.
  // iteratee may also be the string name of the property to sort by (eg. length).
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  // 
  //** 把一个数组的“值”按照某种“键”进行分组，分组后的每个“键”都对应一个数组
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) {
      result[key].push(value);
    }else{
     result[key] = [value];
    }
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0, value;
    for (var i = startIndex || 0, length = input && input.length; i < length; i++) {
      value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, 'length').length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    var i = 0, length = array && array.length;
    if (typeof isSorted == 'number') {
      i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
    } else if (isSorted && length) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (item !== item) {
      return _.findIndex(slice.call(array, i), _.isNaN);
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {
    var idx = array ? array.length : 0;
    if (typeof from == 'number') {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    if (item !== item) {
      return _.findLastIndex(slice.call(array, 0, idx), _.isNaN);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };

  // Generator function to create the findIndex and findLastIndex functions
  //** 这个函数就使用了“柯里化”技术
  //** dir:
  //**     1 : 从前向后查找
  //**    -1 : 从后向前查找
  function createIndexFinder(dir) {
    //** predicate：断言函数
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = array != null && array.length;
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  //** 对于使用判断准则的查找，返回第一个符合条件的下标
  _.findIndex = createIndexFinder(1);

  _.findLastIndex = createIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 0="" 1)="" {="" stop="start" ||="" 0;="" start="0;" }="" step="step" 1;="" var="" length="Math.max(Math.ceil((stop" -="" start)="" step),="" 0);="" range="Array(length);" for="" (var="" idx="0;" <="" length;="" idx++,="" +="step)" range[idx]="start;" return="" range;="" };="" function="" (ahem)="" functions="" ------------------="" determines="" whether="" to="" execute="" a="" as="" constructor="" or="" normal="" with="" the="" provided="" arguments="" executebound="function(sourceFunc," boundfunc,="" context,="" callingcontext,="" args)="" if="" (!(callingcontext="" instanceof="" boundfunc))="" sourcefunc.apply(context,="" args);="" self="baseCreate(sourceFunc.prototype);" result="sourceFunc.apply(self," (_.isobject(result))="" result;="" self;="" create="" bound="" given="" object="" (assigning="" `this`,="" and="" arguments,="" optionally).="" delegates="" **ecmascript="" 5**'s="" native="" `function.bind`="" available.="" _.bind="function(func," context)="" (nativebind="" &&="" func.bind="==" nativebind)="" nativebind.apply(func,="" slice.call(arguments,="" 1));="" (!_.isfunction(func))="" throw="" new="" typeerror('bind="" must="" be="" called="" on="" function');="" args="slice.call(arguments," 2);="" bound()="" executebound(func,="" bound,="" this,="" args.concat(slice.call(arguments)));="" partially="" apply="" by="" creating="" version="" that="" has="" had="" some="" of="" its="" pre-filled,="" without="" changing="" dynamic="" `this`="" context.="" _="" acts="" placeholder,="" allowing="" any="" combination="" pre-filled.="" _.partial="function(func)" boundargs="slice.call(arguments," 1);="" position="0," i="0;" i++)="" args[i]="boundArgs[i]" =="=" ?="" arguments[position++]="" :="" boundargs[i];="" while="" (position="" arguments.length)="" args.push(arguments[position++]);="" bind="" number="" an="" object's="" methods="" object.="" remaining="" are="" method="" names="" bound.="" useful="" ensuring="" all="" callbacks="" defined="" belong="" it.="" _.bindall="function(obj)" i,="" key;="" (length="" error('bindall="" passed="" names');="" (i="1;" key="arguments[i];" obj[key]="_.bind(obj[key]," obj);="" obj;="" memoize="" expensive="" storing="" results.="" _.memoize="function(func," hasher)="" cache="memoize.cache;" address="" (hasher="" hasher.apply(this,="" arguments)="" key);="" (!_.has(cache,="" address))="" cache[address]="func.apply(this," arguments);="" cache[address];="" memoize.cache="{};" memoize;="" delays="" milliseconds,="" then="" calls="" it="" supplied.="" **="" 相当于settimeout函数="" _.delay="function(func," wait)="" args：把本函数的="" `func`="" `wait`两个变量去掉后的其他参数="" settimeout(function(){="" func.apply(null,="" },="" wait);="" defers="" function,="" scheduling="" run="" after="" current="" call="" stack="" cleared.="" _.defer="_.partial(_.delay," _,="" returns="" that,="" when="" invoked,="" will="" only="" triggered="" at="" most="" once="" during="" window="" time.="" normally,="" throttled="" much="" can,="" ever="" going="" more="" than="" per="" `wait`="" duration;="" but="" you'd="" like="" disable="" execution="" leading="" edge,="" pass="" `{leading:="" false}`.="" trailing="" ditto.="" _.throttle="function(func," wait,="" options)="" args,="" timeout="null;" previous="0;" (!options)="" options="{};" later="function()" false="" _.now();="" (!timeout)="" context="args" null;="" function()="" now="_.now();" (!previous="" options.leading="==" false)="" (now="" previous);="" (remaining=""> wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 0="" 1="" 8="" 9="" 11="" 1)="" func="null;" return="" memo;="" };="" returns="" a="" function="" that="" will="" be="" executed="" at="" most="" one="" time,="" no="" matter="" how="" often="" you="" call="" it.="" useful="" for="" lazy="" initialization.="" _.once="_.partial(_.before," 2);="" object="" functions="" ----------------="" keys="" in="" ie="" <="" won't="" iterated="" by="" `for="" key="" ...`="" and="" thus="" missed.="" var="" hasenumbug="!{toString:" null}.propertyisenumerable('tostring');="" nonenumerableprops="['constructor'," 'valueof',="" 'isprototypeof',="" 'tostring',="" 'propertyisenumerable',="" 'hasownproperty',="" 'tolocalestring'];="" collectnonenumprops(obj,="" keys)="" {="" nonenumidx="nonEnumerableProps.length;" proto="typeof" obj.constructor="==" 'function'="" ?="" funcproto="" :="" objproto;="" while="" (nonenumidx--)="" prop="nonEnumerableProps[nonEnumIdx];" if="" (prop="==" 'constructor'="" _.has(obj,="" prop)="" obj="" &&="" obj[prop]="" !="=" proto[prop]="" !_.contains(keys,="" prop))="" keys.push(prop);="" }="" retrieve="" the="" names="" of="" an="" object's="" own="" properties.="" **="" 获取一个对象的所有自有属性的名字="" delegates="" to="" **ecmascript="" 5**'s="" native="" `object.keys`="" _.keys="function(obj)" (!_.isobject(obj))="" [];="" (nativekeys){="" nativekeys(obj);="" 最开始的时候定义了="" nativekeys="Object.keys;" (var="" obj)="" (_.has(obj,="" key))="" keys.push(key);="" ahem,="" 9.="" (hasenumbug)="" keys);="" keys;="" all="" property="" object.="" _.keysin="function(obj)" values="" 返回一个对象的自有属性的值，以数组的形式="" _.values="function(obj)" length="keys.length;" i="0;" length;="" i++)="" values[i]="obj[keys[i]];" values;="" convert="" into="" list="" `[key,="" value]`="" pairs.="" _.pairs="function(obj)" pairs="Array(length);" pairs[i]="[keys[i]," obj[keys[i]]];="" pairs;="" invert="" must="" serializable.="" _.invert="function(obj)" result="{};" result[obj[keys[i]]]="keys[i];" result;="" sorted="" available="" on="" aliased="" as="" `methods`="" _.functions="_.methods" =="" function(obj)="" (_.isfunction(obj[key]))="" names.push(key);="" names.sort();="" extend="" given="" with="" properties="" passed-in="" object(s).="" _.extend="createAssigner(_.keysIn);" assigns="" object(s)="" (https:="" developer.mozilla.org="" docs="" web="" javascript="" reference="" global_objects="" assign)="" _.assign="createAssigner(_.keys);" first="" passes="" predicate="" test="" _.findkey="function(obj," predicate,="" context)="" context);="" key;="" (predicate(obj[key],="" key,="" obj))="" copy="" only="" containing="" whitelisted="" _.pick="function(obj," iteratee,="" (obj="=" null)="" (_.isfunction(iteratee))="" iteratee="optimizeCb(iteratee," (key="" value="obj[key];" (iteratee(value,="" result[key]="value;" else="" false,="" 1);="" object(obj);="" without="" blacklisted="" _.omit="function(obj," 1),="" string);="" key)="" key);="" _.pick(obj,="" fill="" default _.defaults="createAssigner(_.keysIn," true);="" creates="" inherits="" from="" prototype="" additional="" are="" provided="" then="" they="" added="" created="" _.create="function(prototype," props)="" (props)="" _.assign(result,="" props);="" create="" (shallow-cloned)="" duplicate="" _.clone="function(obj)" obj;="" _.isarray(obj)="" obj.slice()="" _.extend({},="" obj);="" invokes="" interceptor="" obj,="" obj.="" primary="" purpose="" this="" method="" is="" "tap="" into"="" chain,="" order="" perform="" operations="" intermediate="" results="" within="" chain.="" _.tap="function(obj," interceptor)="" interceptor(obj);="" internal="" recursive="" comparison="" `isequal`.="" eq="function(a," b,="" astack,="" bstack)="" identical="" objects="" equal.="" `0="==" -0`,="" but="" aren't="" identical.="" see="" [harmony="" `egal`="" proposal](http:="" wiki.ecmascript.org="" doku.php?id="harmony:egal)." (a="==" b)="" ||="" b;="" strict="" necessary="" because="" `null="=" undefined`.="" null="" b="=" unwrap="" any="" wrapped="" objects.="" instanceof="" _)="" (b="" compare="" `[[class]]`="" names.="" classname="toString.call(a);" (classname="" tostring.call(b))="" false;="" switch="" (classname)="" strings,="" numbers,="" regular="" expressions,="" dates,="" booleans="" compared="" value.="" case="" '[object="" regexp]':="" regexps="" coerced="" strings="" (note:="" ''="" +="" '="" i')="" string]':="" primitives="" their="" corresponding="" wrappers="" equivalent;="" thus,="" `"5"`="" equivalent="" `new="" string("5")`.="" number]':="" `nan`s="" equivalent,="" non-reflexive.="" object(nan)="" nan="" (+a="" +a)="" +b="" +b;="" performed="" other="" numeric="" values.="" +a="==" date]':="" boolean]':="" coerce="" dates="" primitive="" millisecond="" representations.="" note="" invalid="" representations="" `nan`="" not="" equivalent.="" arearrays="className" array]';="" (!arearrays)="" (typeof="" typeof="" )="" different="" constructors="" `object`s="" or="" `array`s="" frames="" are.="" actor="a.constructor," bctor="b.constructor;" (actor="" !(_.isfunction(actor)="" _.isfunction(bctor)="" bctor)="" ('constructor'="" b))="" assume="" equality="" cyclic="" structures.="" algorithm="" detecting="" structures="" adapted="" es="" 5.1="" section="" 15.12.3,="" abstract="" operation="" `jo`.="" initializing="" stack="" traversed="" it's="" done="" here="" since="" we="" need="" them="" arrays="" comparison.="" astack="aStack" bstack="bStack" (length--)="" linear="" search.="" performance="" inversely="" proportional="" number="" unique="" nested="" (astack[length]="==" a)="" bstack[length]="==" add="" astack.push(a);="" bstack.push(b);="" recursively="" arrays.="" (arearrays)="" array="" lengths="" determine="" deep="" necessary.="" (length="" b.length)="" contents,="" ignoring="" non-numeric="" (!eq(a[length],="" b[length],="" bstack))="" ensure="" both="" contain="" same="" before="" comparing="" equality.="" (_.keys(b).length="" length)="" each="" member="" (!(_.has(b,="" eq(a[key],="" b[key],="" bstack)))="" remove="" astack.pop();="" bstack.pop();="" true;="" check="" two="" _.isequal="function(a," eq(a,="" b);="" array,="" string,="" empty?="" "empty"="" has="" enumerable="" own-properties.="" 用于判断一个给定的="" 数组、字符串长丢是否为0，或者对象是否没有可枚举的自有属性="" _.isempty="function(obj)" (isarraylike(obj)="" (_.isarray(obj)="" _.isstring(obj)="" _.isarguments(obj)))="" obj.length="==" 0;="" _.keys(obj).length="==" dom="" element?="" dom元素的节点类型（nodetype）都是1（严格的数字1，而非字符串“1”）="" _.iselement="function(obj)" !!(obj="" obj.nodetype="==" array?="" ecma5's="" array.isarray="" 判断一个对象是否是一个数组="" 优先使用ecma5的原生判断方法="" array.isarray()="" _.isarray="nativeIsArray" tostring.call(obj)="==" variable="" object?="" _.isobject="function(obj)" type="typeof" 'object'="" !!obj;="" some="" istype="" methods:="" isarguments,="" isfunction,="" isstring,="" isnumber,="" isdate,="" isregexp,="" iserror.="" _.each(['arguments',="" 'function',="" 'string',="" 'number',="" 'date',="" 'regexp',="" 'error'],="" function(name)="" _['is'="" name]="function(obj)" name="" ']';="" });="" define="" fallback="" version="" browsers="" (ahem,="" 9),="" where="" there="" isn't="" inspectable="" "arguments"="" type.="" 根据="" arguments="" 类数组的一个独有的属性：callee（指向arguments所属的函数自身），来判断是否是arguments。="" (!_.isarguments(arguments))="" _.isarguments="function(obj)" 'callee');="" optimize="" `isfunction`="" appropriate.="" work="" around="" bug="" (#1621).="" safari="" (#1929)="" .="" int8array="" _.isfunction="function(obj)" finite="" number?="" _.isfinite="function(obj)" isfinite(obj)="" !isnan(parsefloat(obj));="" `nan`?="" (nan="" which="" does="" equal="" itself).="" _.isnan="function(obj)" _.isnumber(obj)="" +obj;="" boolean?="" _.isboolean="function(obj)" true="" false="" boolean]';="" null?="" _.isnull="function(obj)" null;="" undefined?="" _.isundefined="function(obj)" void="" shortcut="" checking="" directly="" itself="" (in="" words,="" prototype).="" 检测对象的某个属性是否存在而且是其自有属性="" _.has="function(obj," hasownproperty.call(obj,="" utility="" -----------------="" run="" underscore.js="" *noconflict*="" mode,="" returning="" `_`="" its="" previous="" owner.="" underscore="" _.noconflict="function()" root._="previousUnderscore;" this;="" keep="" identity="" iteratees.="" _.identity="function(value)" value;="" predicate-generating="" functions.="" outside="" underscore.="" _.constant="function(value)" function()="" _.noop="function(){};" _.property="function(key)" obj[key];="" generates="" (including="" those="" ancestors)="" _.propertyof="function(obj)" function(){}="" function(key)="" whether="" set="" `key:value`="" _.matches="function(attrs)" !length;="" pair="pairs[i]," (pair[1]="" obj[key]="" !(key="" **n**="" times.="" _.times="function(n," accum="Array(Math.max(0," n));="" context,="" n;="" accum[i]="iteratee(i);" accum;="" random="" integer="" between="" min="" max="" (inclusive).="" 这里有一个疑惑：如果min是非整数，那么返回值就不是整数了="" _.random="function(min," max)="" (max="=" math.floor(math.random()="" *="" -="" 1));="" (possibly="" faster)="" way="" get="" current="" timestamp="" integer.="" _.now="Date.now" new="" date().gettime();="" html="" entities="" escaping.="" escapemap="{" '&':="" '&amp;',="" '<':="" '&lt;',="">': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\s]+?)%>/g,
    interpolate : /<%=([\s\s]+?)%>/g,
    escape      : /<%-([\s\s]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  //** _ 的value()方法直接返回被Underscore包装之前的那个对象
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
  
  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));
</%-([\s\s]+?)%></%=([\s\s]+?)%></%([\s\s]+?)%></=></=></=>