"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredecessorDefault = void 0;
var bugfinder_localityrecorder_commit_1 = require("bugfinder-localityrecorder-commit");
var bugfinder_framework_1 = require("bugfinder-framework");
/**
 * Calculates predecessors of a CommitPath.
 */
var PredecessorDefault = /** @class */ (function () {
    function PredecessorDefault(logger) {
        this.logger = logger;
        // used for getNPredecessors: Performance optimization
        this.orderedLocalities = new Map();
    }
    /**
     * Performance optimizes wrapper call to CommitPath.getNPredecessors
     * Returns up to n predecessors for each CommitPath of localities
     * Returned array is in same order as localities and has same length. return[i] has the predecessor CommitPaths
     * of localities[i].
     * return[i] is null if upToN is false (exactly n predecessors should be returned) and there were less than n
     * predecessors in allLocalities
     * @param localities
     * @param n
     * @param upToN
     * @param allLocalities
     */
    PredecessorDefault.prototype.getNPredecessorsMap = function (localities, n, upToN, allLocalities) {
        var _a, _b;
        var preds = new bugfinder_framework_1.LocalityMap();
        var locsWithExactlyNPreds = 0;
        for (var i = 0; i < localities.length; i++) {
            var loc = localities[i];
            if (i % 50 == 0)
                console.log("Calculated the " + n + " predecessors from " + i + " of " + localities.length + " localities...");
            var pred = [];
            pred = i == 0 ? this.getNPredecessors(loc, n, upToN, allLocalities) :
                this.getNPredecessors(loc, n, upToN, allLocalities, false);
            if ((pred === null || pred === void 0 ? void 0 : pred.length) == n)
                locsWithExactlyNPreds++;
            if ((pred === null || pred === void 0 ? void 0 : pred.length) > n)
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.error("Error during getNPredecessorsArray: got more than " + n + " predecessors.");
            preds.set(loc, pred);
        }
        (_b = this.logger) === null || _b === void 0 ? void 0 : _b.info("Found " + locsWithExactlyNPreds + " localities with exactly " + n + " predecessors.");
        return preds;
    };
    /**
     * TODO: renaming of paths
     * Returns up to n predecessor CommitPaths of locality including locality. Predecessors match the path of locality
     * Returns null on finding less than n predecessors if upToN is false
     * @param locality
     * @param n
     * @param upToN also return predecessors if less than n predecessors are found. False: return null if less than
     *        n predecessors are found
     * @param allLocalities
     * @param initMode initializes map over allLocalities. If you want to call this function many times with same
     *          allLocalities you can set this to false after first call! This will achieve huge performance advantages
     */
    PredecessorDefault.prototype.getNPredecessors = function (locality, n, upToN, allLocalities, initMode) {
        var e_1, _a;
        var _b;
        if (initMode === void 0) { initMode = true; }
        if (allLocalities == null || allLocalities.length == 0) {
            return [];
        }
        var orderedLocalities;
        var minOrder;
        // init: performance optimization
        if (initMode) {
            // init map from order to CommitPath[] and set minOrder
            orderedLocalities = new Map();
            minOrder = allLocalities[0].commit.order;
            try {
                for (var allLocalities_1 = __values(allLocalities), allLocalities_1_1 = allLocalities_1.next(); !allLocalities_1_1.done; allLocalities_1_1 = allLocalities_1.next()) {
                    var aLoc = allLocalities_1_1.value;
                    var cps = orderedLocalities.get(aLoc.commit.order);
                    cps = cps == null ? [aLoc] : __spreadArray(__spreadArray([], __read(cps), false), [aLoc], false);
                    orderedLocalities.set(aLoc.commit.order, cps);
                    if (aLoc.commit.order < minOrder)
                        minOrder = aLoc.commit.order;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (allLocalities_1_1 && !allLocalities_1_1.done && (_a = allLocalities_1.return)) _a.call(allLocalities_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.orderedLocalities = orderedLocalities;
            this.minOrder = minOrder;
        }
        else {
            // get Map and minOrder from last calculations with initMode = true
            orderedLocalities = this.orderedLocalities;
            minOrder = this.minOrder;
        }
        // calculating predecessor CommitPaths
        var curOrder = locality.commit.order - 1;
        var predecessors = [locality];
        while (predecessors.length < n) {
            var pred = this.getNextPredecessor((_b = locality.path) === null || _b === void 0 ? void 0 : _b.path, orderedLocalities, curOrder, minOrder, allLocalities);
            if (pred == null)
                return predecessors;
            predecessors.push(pred);
            curOrder = pred.commit.order - 1;
        }
        if (!upToN && predecessors.length < n)
            return null;
        return predecessors;
    };
    /**
     * Returns the next predecessor CommitPath, returns null if all localities until minOrder were searched
     * and no match was found
     * @param path of the CommitPath of which the predecessor should be returned
     * @param orderedLocalities a map of order (of all localities: CommitPath[]) to CommitPath[] with that order
     * @param beginOrder order of the CommitPath of which the predecessor should be returned
     * @param minOrder min order of allLocalities
     * @param allLocalities
     */
    PredecessorDefault.prototype.getNextPredecessor = function (path, orderedLocalities, beginOrder, minOrder, allLocalities) {
        var _a;
        var curOrder = beginOrder;
        while (curOrder >= minOrder) {
            var cps = orderedLocalities.get(curOrder);
            if (cps == null) {
                curOrder--;
                continue;
            }
            var cpsMatched = cps.filter(function (cp) {
                var _a, _b, _c;
                return ((_a = cp.path) === null || _a === void 0 ? void 0 : _a.path) == path &&
                    (((_b = cp.path) === null || _b === void 0 ? void 0 : _b.type) == bugfinder_localityrecorder_commit_1.GitFileType.added || ((_c = cp.path) === null || _c === void 0 ? void 0 : _c.type) == bugfinder_localityrecorder_commit_1.GitFileType.modified);
            });
            if (cpsMatched.length > 0) {
                return cpsMatched[0];
            }
            else if (cpsMatched.length > 1) {
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.info("Found more than 1 matching CommitPath in one Commit. This seems to be"
                    + "an error. " + "Most likely the this.getNextPredecessor function has a bug.");
            }
            curOrder--;
        }
        return null;
    };
    return PredecessorDefault;
}());
exports.PredecessorDefault = PredecessorDefault;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJlZGVjZXNzb3JEZWZhdWx0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYnVnRmluZGVyLWxvY2FsaXR5UmVjb3JkZXItY29tbWl0UGF0aC9zcmMvY29tbWl0UGF0aC9QcmVkZWNlc3NvckRlZmF1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUZBQThEO0FBQzlELDJEQUFnRDtBQU1oRDs7R0FFRztBQUNIO0lBTUksNEJBQW9CLE1BQWU7UUFBZixXQUFNLEdBQU4sTUFBTSxDQUFTO1FBTG5DLHNEQUFzRDtRQUM5QyxzQkFBaUIsR0FBOEIsSUFBSSxHQUFHLEVBQXdCLENBQUE7SUFLdEYsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsZ0RBQW1CLEdBQW5CLFVBQW9CLFVBQXdCLEVBQUUsQ0FBUyxFQUFFLEtBQWMsRUFBRSxhQUEyQjs7UUFHaEcsSUFBTSxLQUFLLEdBQUcsSUFBSSxpQ0FBVyxFQUE0QixDQUFBO1FBQ3pELElBQUkscUJBQXFCLEdBQUcsQ0FBQyxDQUFBO1FBRTdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hDLElBQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUN6QixJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztnQkFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFrQixDQUFDLDJCQUFzQixDQUFDLFlBQU8sVUFBVSxDQUFDLE1BQU0sbUJBQWdCLENBQUMsQ0FBQTtZQUVuRyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUE7WUFDYixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUs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