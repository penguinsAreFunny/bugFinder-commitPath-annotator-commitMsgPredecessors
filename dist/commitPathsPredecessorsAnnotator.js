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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommitPathsPredecessorsAnnotator = void 0;
var inversify_1 = require("inversify");
var TYPES_1 = require("./TYPES");
var bugfinder_framework_1 = require("bugfinder-framework");
var bugfinder_localityrecorder_commitpath_1 = require("bugfinder-localityrecorder-commitpath");
var underscore_1 = __importDefault(require("underscore"));
var CommitPathsPredecessorsAnnotator = /** @class */ (function () {
    function CommitPathsPredecessorsAnnotator() {
    }
    /**
     * If upToN is false the return value does not annotate localities which have less than n predecessors
     * Therefore the return value has undefined values for these localities
     * @param localitiesToAnnotate
     * @param allLocalities
     */
    CommitPathsPredecessorsAnnotator.prototype.annotate = function (localitiesToAnnotate, allLocalities) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var map, nPredecessorsMap, i, loc, nPredecessors, annotations, annotation, annoValues;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        map = new bugfinder_framework_1.LocalityMap();
                        if (this.uniqueMode) {
                            bugfinder_localityrecorder_commitpath_1.CommitPath.setPredecessorDelegation(new bugfinder_localityrecorder_commitpath_1.PredecessorsUnique(this.logger));
                        }
                        nPredecessorsMap = bugfinder_localityrecorder_commitpath_1.CommitPath.getNPredecessorsMap(localitiesToAnnotate, this.n, this.upToN, this.uniqueMode, allLocalities);
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < localitiesToAnnotate.length)) return [3 /*break*/, 4];
                        loc = localitiesToAnnotate[i];
                        nPredecessors = nPredecessorsMap.getVal(loc);
                        // upToN == false => locality has less than n predecessors
                        if (nPredecessors == null)
                            return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commitPathAnnotator.annotate(nPredecessors)
                            // sum of all annotations of the nPredecessors
                        ];
                    case 2:
                        annotations = _b.sent();
                        annotation = annotations.toArray()
                            .map(function (el) {
                            return el.val;
                        })
                            .reduce(function (el1, el2) {
                            return el1 + el2;
                        });
                        map.set(loc, annotation);
                        _b.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        annoValues = map.toArray().map(function (el) {
                            return el.val;
                        });
                        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.info("Annotation count: ", underscore_1.default.countBy(annoValues, function (num) {
                            return num;
                        }));
                        return [2 /*return*/, map];
                }
            });
        });
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
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_ANNOTATOR_COMMITMSGPREDECESSORS_TYPES.uniqueMode),
        __metadata("design:type", Boolean)
    ], CommitPathsPredecessorsAnnotator.prototype, "uniqueMode", void 0);
    __decorate([
        (0, inversify_1.optional)(),
        (0, inversify_1.inject)(bugfinder_framework_1.SHARED_TYPES.logger),
        __metadata("design:type", Object)
    ], CommitPathsPredecessorsAnnotator.prototype, "logger", void 0);
    CommitPathsPredecessorsAnnotator = __decorate([
        (0, inversify_1.injectable)()
    ], CommitPathsPredecessorsAnnotator);
    return CommitPathsPredecessorsAnnotator;
}());
exports.CommitPathsPredecessorsAnnotator = CommitPathsPredecessorsAnnotator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWl0UGF0aHNQcmVkZWNlc3NvcnNBbm5vdGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29tbWl0UGF0aHNQcmVkZWNlc3NvcnNBbm5vdGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXVEO0FBQ3ZELGlDQUFtRjtBQUNuRiwyREFBeUU7QUFDekUsK0ZBQXFGO0FBRXJGLDBEQUEwQjtBQUcxQjtJQUFBO0lBb0VBLENBQUM7SUFwREc7Ozs7O09BS0c7SUFDRyxtREFBUSxHQUFkLFVBQWUsb0JBQWtDLEVBQUUsYUFBMkI7Ozs7Ozs7d0JBR3BFLEdBQUcsR0FBRyxJQUFJLGlDQUFXLEVBQXNCLENBQUE7d0JBRWpELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTs0QkFDakIsa0RBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLDBEQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO3lCQUMzRTt3QkFFSyxnQkFBZ0IsR0FDbEIsa0RBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQTt3QkFFbkcsQ0FBQyxHQUFHLENBQUM7Ozs2QkFBRSxDQUFBLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxNQUFNLENBQUE7d0JBQ3JDLEdBQUcsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQTt3QkFDN0IsYUFBYSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTt3QkFFbEQsMERBQTBEO3dCQUMxRCxJQUFJLGFBQWEsSUFBSSxJQUFJOzRCQUNyQix3QkFBUTt3QkFHUSxxQkFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQzs0QkFFMUUsOENBQThDOzBCQUY0Qjs7d0JBQXBFLFdBQVcsR0FBRyxTQUFzRDt3QkFHcEUsVUFBVSxHQUFHLFdBQVcsQ0FBQyxPQUFPLEVBQUU7NkJBQ25DLEdBQUcsQ0FBQyxVQUFBLEVBQUU7NEJBQ0gsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFBO3dCQUNqQixDQUFDLENBQUM7NkJBQ0QsTUFBTSxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUc7NEJBQ2IsT0FBTyxHQUFHLEdBQUcsR0FBRyxDQUFBO3dCQUNwQixDQUFDLENBQUMsQ0FBQTt3QkFFTixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQTs7O3dCQXBCcUIsQ0FBQyxFQUFFLENBQUE7Ozt3QkF1QjlDLFVBQVUsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUEsRUFBRTs0QkFDbkMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFBO3dCQUNqQixDQUFDLENBQUMsQ0FBQTt3QkFFRixNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxvQkFBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsVUFBQyxHQUFHOzRCQUM5RCxPQUFPLEdBQUcsQ0FBQTt3QkFDZCxDQUFDLENBQUMsQ0FBQyxDQUFBO3dCQUVILHNCQUFPLEdBQUcsRUFBQzs7OztLQUNkO0lBaEVEO1FBREMsSUFBQSxrQkFBTSxFQUFDLGtFQUEwRCxDQUFDLG1CQUFtQixDQUFDOztpRkFDckM7SUFHbEQ7UUFEQyxJQUFBLGtCQUFNLEVBQUMsa0VBQTBELENBQUMsQ0FBQyxDQUFDOzsrREFDNUQ7SUFHVDtRQURDLElBQUEsa0JBQU0sRUFBQyxrRUFBMEQsQ0FBQyxLQUFLLENBQUM7O21FQUMzRDtJQUdkO1FBREMsSUFBQSxrQkFBTSxFQUFDLGtFQUEwRCxDQUFDLFVBQVUsQ0FBQzs7d0VBQzNEO0lBR25CO1FBREMsSUFBQSxvQkFBUSxHQUFFO1FBQUUsSUFBQSxrQkFBTSxFQUFDLGtDQUFZLENBQUMsTUFBTSxDQUFDOztvRUFDMUI7SUFkTCxnQ0FBZ0M7UUFENUMsSUFBQSxzQkFBVSxHQUFFO09BQ0EsZ0NBQWdDLENBb0U1QztJQUFELHVDQUFDO0NBQUEsQUFwRUQsSUFvRUM7QUFwRVksNEVBQWdDIn0=