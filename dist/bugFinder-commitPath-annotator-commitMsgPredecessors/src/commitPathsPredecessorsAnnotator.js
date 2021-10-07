"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommitPathsPredecessorsAnnotator = void 0;
var inversify_1 = require("inversify");
var bugfinder_framework_1 = require("bugfinder-framework");
var bugfinder_localityrecorder_commitpath_1 = require("bugfinder-localityrecorder-commitpath");
var TYPES_1 = require("./TYPES");
var underscore_1 = __importDefault(require("underscore"));
var CommitPathsPredecessorsAnnotator = /** @class */ (function () {
    function CommitPathsPredecessorsAnnotator() {
    }
    /**
     * If upToN ist true the return value does not annotate localities which have less than n predecessors
     * Therefore the return value has undefined values for these localities
     * @param localitiesToAnnotate
     * @param allLocalities
     */
    CommitPathsPredecessorsAnnotator.prototype.annotate = function (localitiesToAnnotate, allLocalities) {
        var _a;
        var map = new bugfinder_framework_1.LocalityMap();
        var nPredecessorsArray = bugfinder_localityrecorder_commitpath_1.CommitPath
            .getNPredecessorsArray(localitiesToAnnotate, this.n, this.upToN, allLocalities);
        for (var i = 0; i < localitiesToAnnotate.length; i++) {
            var loc = localitiesToAnnotate[i];
            var nPredecessors = nPredecessorsArray[i];
            // upToN == false => locality has less than n predecessors
            if (nPredecessors == null)
                continue;
            var localitiesToConsider = __spreadArray(__spreadArray([], __read(nPredecessors), false), [loc], false);
            // annotations of nPredecessors
            var annotations = this.commitPathAnnotator.annotate(localitiesToConsider);
            // sum of all annotations of the nPredecessors
            var annotation = annotations.toArray()
                .map(function (el) {
                return el.val;
            })
                .reduce(function (el1, el2) {
                return el1 + el2;
            });
            map.set(loc, annotation);
        }
        var annoValues = map.toArray().map(function (el) {
            return el.val;
        });
        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.info("Annotation count: ", underscore_1.default.countBy(annoValues, function (num) {
            return num;
        }));
        return map;
    };
    __decorate([
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_ANNOTATOR_COMMITMSGPREDECESSORS_TYPES.commitPathAnnotator),
        __metadata("design:type", Object)
    ], CommitPathsPredecessorsAnnotator.prototype, "commitPathAnnotator", void 0);
    __decorate([
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_ANNOTATOR_COMMITMSGPREDECESSORS_TYPES.n),
        __metadata("design:type", Number)
    ], CommitPathsPredecessorsAnnotator.prototype, "n", void 0);
    __decorate([
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_ANNOTATOR_COMMITMSGPREDECESSORS_TYPES.upToN),
        __metadata("design:type", Boolean)
    ], CommitPathsPredecessorsAnnotator.prototype, "upToN", void 0);
    __decorate([
        (0, inversify_1.optional)(),
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_ANNOTATOR_COMMITMSGPREDECESSORS_TYPES.logger),
        __metadata("design:type", Object)
    ], CommitPathsPredecessorsAnnotator.prototype, "logger", void 0);
    CommitPathsPredecessorsAnnotator = __decorate([
        (0, inversify_1.injectable)()
    ], CommitPathsPredecessorsAnnotator);
    return CommitPathsPredecessorsAnnotator;
}());
exports.CommitPathsPredecessorsAnnotator = CommitPathsPredecessorsAnnotator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWl0UGF0aHNQcmVkZWNlc3NvcnNBbm5vdGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWl0UGF0aHNQcmVkZWNlc3NvcnNBbm5vdGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUF1RDtBQUN2RCwyREFBMkQ7QUFDM0QsK0ZBQWlFO0FBQ2pFLGlDQUFtRjtBQUNuRiwwREFBMkI7QUFJM0I7SUFBQTtJQThEQSxDQUFDO0lBakRHOzs7OztPQUtHO0lBQ0gsbURBQVEsR0FBUixVQUFTLG9CQUFrQyxFQUFFLGFBQTJCOztRQUNwRSxJQUFNLEdBQUcsR0FBRyxJQUFJLGlDQUFXLEVBQXNCLENBQUE7UUFFakQsSUFBTSxrQkFBa0IsR0FBd0Isa0RBQVU7YUFDckQscUJBQXFCLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFBO1FBRW5GLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEQsSUFBTSxHQUFHLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDbkMsSUFBTSxhQUFhLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFFM0MsMERBQTBEO1lBQzFELElBQUksYUFBYSxJQUFJLElBQUk7Z0JBQ3JCLFNBQVE7WUFFWixJQUFNLG9CQUFvQiwwQ0FBTyxhQUFhLFlBQUUsR0FBRyxTQUFDLENBQUE7WUFHcEQsK0JBQStCO1lBQy9CLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtZQUUzRSw4Q0FBOEM7WUFDOUMsSUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLE9BQU8sRUFBRTtpQkFDbkMsR0FBRyxDQUFDLFVBQUEsRUFBRTtnQkFDSCxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUE7WUFDakIsQ0FBQyxDQUFDO2lCQUNELE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHO2dCQUNiLE9BQU8sR0FBRyxHQUFHLEdBQUcsQ0FBQTtZQUNwQixDQUFDLENBQUMsQ0FBQTtZQUVOLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFBO1NBQzNCO1FBRUQsSUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEVBQUU7WUFDbkMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFBO1FBQ2pCLENBQUMsQ0FBQyxDQUFBO1FBRUYsTUFBQSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsb0JBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFVBQUMsR0FBRztZQUM5RCxPQUFPLEdBQUcsQ0FBQTtRQUNkLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFSCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUExREQ7UUFEQyxJQUFBLGtCQUFNLEVBQUMsa0VBQTBELENBQUMsbUJBQW1CLENBQUM7O2lGQUNyQztJQUdsRDtRQURDLElBQUEsa0JBQU0sRUFBQyxrRUFBMEQsQ0FBQyxDQUFDLENBQUM7OytEQUM1RDtJQUdUO1FBREMsSUFBQSxrQkFBTSxFQUFDLGtFQUEwRCxDQUFDLEtBQUssQ0FBQzs7bUVBQzNEO0lBR2Q7UUFEQyxJQUFBLG9CQUFRLEdBQUU7UUFBRSxJQUFBLGtCQUFNLEVBQUMsa0VBQTBELENBQUMsTUFBTSxDQUFDOztvRUFDeEU7SUFYTCxnQ0FBZ0M7UUFENUMsSUFBQSxzQkFBVSxHQUFFO09BQ0EsZ0NBQWdDLENBOEQ1QztJQUFELHVDQUFDO0NBQUEsQUE5REQsSUE4REM7QUE5RFksNEVBQWdDIn0=