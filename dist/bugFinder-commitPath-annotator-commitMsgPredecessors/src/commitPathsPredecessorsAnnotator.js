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
            bugfinder_localityrecorder_commitpath_1.CommitPath.setPredecessorDelegation(new bugfinder_localityrecorder_commitpath_1.PredecessorsUnique(this.logger));
        }
        var nPredecessorsMap = bugfinder_localityrecorder_commitpath_1.CommitPath.getNPredecessorsMap(localitiesToAnnotate, this.n, this.upToN, allLocalities);
        for (var i = 0; i < localitiesToAnnotate.length; i++) {
            var loc = localitiesToAnnotate[i];
            var nPredecessors = nPredecessorsMap.getVal(loc);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWl0UGF0aHNQcmVkZWNlc3NvcnNBbm5vdGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWl0UGF0aHNQcmVkZWNlc3NvcnNBbm5vdGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXVEO0FBQ3ZELDJEQUEyRDtBQUMzRCwrRkFBcUY7QUFDckYsaUNBQW1GO0FBQ25GLDBEQUEyQjtBQUkzQjtJQUFBO0lBa0VBLENBQUM7SUFsREc7Ozs7O09BS0c7SUFDSCxtREFBUSxHQUFSLFVBQVMsb0JBQWtDLEVBQUUsYUFBMkI7O1FBQ3BFLElBQU0sR0FBRyxHQUFHLElBQUksaUNBQVcsRUFBc0IsQ0FBQTtRQUVqRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsa0RBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLDBEQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1NBQzNFO1FBRUQsSUFBTSxnQkFBZ0IsR0FDbEIsa0RBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUE7UUFFM0YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsRCxJQUFNLEdBQUcsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxJQUFNLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7WUFFbEQsMERBQTBEO1lBQzFELElBQUksYUFBYSxJQUFJLElBQUk7Z0JBQ3JCLFNBQVE7WUFFWiwrQkFBK0I7WUFDL0IsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUVwRSw4Q0FBOEM7WUFDOUMsSUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLE9BQU8sRUFBRTtpQkFDbkMsR0FBRyxDQUFDLFVBQUEsRUFBRTtnQkFDSCxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUE7WUFDakIsQ0FBQyxDQUFDO2lCQUNELE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHO2dCQUNiLE9BQU8sR0FBRyxHQUFHLEdBQUcsQ0FBQTtZQUNwQixDQUFDLENBQUMsQ0FBQTtZQUVOLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFBO1NBQzNCO1FBRUQsSUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEVBQUU7WUFDbkMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFBO1FBQ2pCLENBQUMsQ0FBQyxDQUFBO1FBRUYsTUFBQSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsb0JBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFVBQUMsR0FBRztZQUM5RCxPQUFPLEdBQUcsQ0FBQTtRQUNkLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFSCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUE5REQ7UUFEQyxJQUFBLGtCQUFNLEVBQUMsa0VBQTBELENBQUMsbUJBQW1CLENBQUM7O2lGQUNyQztJQUdsRDtRQURDLElBQUEsa0JBQU0sRUFBQyxrRUFBMEQsQ0FBQyxDQUFDLENBQUM7OytEQUM1RDtJQUdUO1FBREMsSUFBQSxrQkFBTSxFQUFDLGtFQUEwRCxDQUFDLEtBQUssQ0FBQzs7bUVBQzNEO0lBR2Q7UUFEQyxJQUFBLGtCQUFNLEVBQUMsa0VBQTBELENBQUMsVUFBVSxDQUFDOzt3RUFDM0Q7SUFHbkI7UUFEQyxJQUFBLG9CQUFRLEdBQUU7UUFBRSxJQUFBLGtCQUFNLEVBQUMsa0VBQTBELENBQUMsTUFBTSxDQUFDOztvRUFDeEU7SUFkTCxnQ0FBZ0M7UUFENUMsSUFBQSxzQkFBVSxHQUFFO09BQ0EsZ0NBQWdDLENBa0U1QztJQUFELHVDQUFDO0NBQUEsQUFsRUQsSUFrRUM7QUFsRVksNEVBQWdDIn0=