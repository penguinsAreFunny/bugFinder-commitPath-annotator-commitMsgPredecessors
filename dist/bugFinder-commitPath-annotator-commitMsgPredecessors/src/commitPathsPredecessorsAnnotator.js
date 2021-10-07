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
        if (this.uniqueMode) {
            bugfinder_localityrecorder_commitpath_1.CommitPath.
            ;
        }
        var nPredecessorsArray = bugfinder_localityrecorder_commitpath_1.CommitPath
            .getNPredecessorsArray(localitiesToAnnotate, this.n, this.upToN, allLocalities);
        for (var i = 0; i < localitiesToAnnotate.length; i++) {
            var loc = localitiesToAnnotate[i];
            var nPredecessors = nPredecessorsArray[i];
            // upToN == false => locality has less than n predecessors
            if (nPredecessors == null)
                continue;
            // annotations of nPredecessors
            var annotations = this.commitPathAnnotator.annotate(nPredecessors);
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
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_ANNOTATOR_COMMITMSGPREDECESSORS_TYPES.uniqueMode),
        __metadata("design:type", Boolean)
    ], CommitPathsPredecessorsAnnotator.prototype, "uniqueMode", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWl0UGF0aHNQcmVkZWNlc3NvcnNBbm5vdGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWl0UGF0aHNQcmVkZWNlc3NvcnNBbm5vdGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXVEO0FBQ3ZELDJEQUEyRDtBQUMzRCwrRkFBaUU7QUFDakUsaUNBQW1GO0FBQ25GLDBEQUEyQjtBQUkzQjtJQUFBO0lBa0VBLENBQUM7SUFsREc7Ozs7O09BS0c7SUFDSCxtREFBUSxHQUFSLFVBQVMsb0JBQWtDLEVBQUUsYUFBMkI7O1FBQ3BFLElBQU0sR0FBRyxHQUFHLElBQUksaUNBQVcsRUFBc0IsQ0FBQTtRQUVqRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsa0RBQVU7Z0JBQ2QsQUFEZSxKQUFBLENBQUE7U0FDZDtRQUVELElBQU0sa0JBQWtCLEdBQXdCLGtEQUFVO2FBQ3JELHFCQUFxQixDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQTtRQUVuRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xELElBQU0sR0FBRyxHQUFHLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ25DLElBQU0sYUFBYSxHQUFHLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFBO1lBRTNDLDBEQUEwRDtZQUMxRCxJQUFJLGFBQWEsSUFBSSxJQUFJO2dCQUNyQixTQUFRO1lBRVosK0JBQStCO1lBQy9CLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUE7WUFFcEUsOENBQThDO1lBQzlDLElBQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxPQUFPLEVBQUU7aUJBQ25DLEdBQUcsQ0FBQyxVQUFBLEVBQUU7Z0JBQ0gsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFBO1lBQ2pCLENBQUMsQ0FBQztpQkFDRCxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRztnQkFDYixPQUFPLEdBQUcsR0FBRyxHQUFHLENBQUE7WUFDcEIsQ0FBQyxDQUFDLENBQUE7WUFFTixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQTtTQUMzQjtRQUVELElBQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBQSxFQUFFO1lBQ25DLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQTtRQUNqQixDQUFDLENBQUMsQ0FBQTtRQUVGLE1BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLG9CQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxVQUFDLEdBQUc7WUFDOUQsT0FBTyxHQUFHLENBQUE7UUFDZCxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRUgsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBOUREO1FBREMsSUFBQSxrQkFBTSxFQUFDLGtFQUEwRCxDQUFDLG1CQUFtQixDQUFDOztpRkFDckM7SUFHbEQ7UUFEQyxJQUFBLGtCQUFNLEVBQUMsa0VBQTBELENBQUMsQ0FBQyxDQUFDOzsrREFDNUQ7SUFHVDtRQURDLElBQUEsa0JBQU0sRUFBQyxrRUFBMEQsQ0FBQyxLQUFLLENBQUM7O21FQUMzRDtJQUdkO1FBREMsSUFBQSxrQkFBTSxFQUFDLGtFQUEwRCxDQUFDLFVBQVUsQ0FBQzs7d0VBQzNEO0lBR25CO1FBREMsSUFBQSxvQkFBUSxHQUFFO1FBQUUsSUFBQSxrQkFBTSxFQUFDLGtFQUEwRCxDQUFDLE1BQU0sQ0FBQzs7b0VBQ3hFO0lBZEwsZ0NBQWdDO1FBRDVDLElBQUEsc0JBQVUsR0FBRTtPQUNBLGdDQUFnQyxDQWtFNUM7SUFBRCx1Q0FBQztDQUFBLEFBbEVELElBa0VDO0FBbEVZLDRFQUFnQyJ9