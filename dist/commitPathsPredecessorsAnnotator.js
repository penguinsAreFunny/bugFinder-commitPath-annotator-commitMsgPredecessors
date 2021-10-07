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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommitPathsPredecessorsAnnotator = void 0;
var inversify_1 = require("inversify");
var bugfinder_framework_1 = require("bugfinder-framework");
var bugfinder_localityrecorder_commitpath_1 = require("bugfinder-localityrecorder-commitpath");
var TYPES_1 = require("./TYPES");
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
        var map = new bugfinder_framework_1.LocalityMap();
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
    CommitPathsPredecessorsAnnotator = __decorate([
        (0, inversify_1.injectable)()
    ], CommitPathsPredecessorsAnnotator);
    return CommitPathsPredecessorsAnnotator;
}());
exports.CommitPathsPredecessorsAnnotator = CommitPathsPredecessorsAnnotator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWl0UGF0aHNQcmVkZWNlc3NvcnNBbm5vdGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29tbWl0UGF0aHNQcmVkZWNlc3NvcnNBbm5vdGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTZDO0FBQzdDLDJEQUEyRDtBQUMzRCwrRkFBaUU7QUFDakUsaUNBQW1GO0FBR25GO0lBQUE7SUFnREEsQ0FBQztJQXRDRzs7Ozs7T0FLRztJQUNILG1EQUFRLEdBQVIsVUFBUyxvQkFBa0MsRUFBRSxhQUEyQjtRQUNwRSxJQUFNLEdBQUcsR0FBRyxJQUFJLGlDQUFXLEVBQXNCLENBQUE7UUFFakQsSUFBTSxrQkFBa0IsR0FBd0Isa0RBQVU7YUFDckQscUJBQXFCLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFBO1FBRW5GLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEQsSUFBTSxHQUFHLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDbkMsSUFBTSxhQUFhLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFFM0MsMERBQTBEO1lBQzFELElBQUksYUFBYSxJQUFJLElBQUk7Z0JBQ3JCLFNBQVE7WUFFWiwrQkFBK0I7WUFDL0IsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUVwRSw4Q0FBOEM7WUFDOUMsSUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLE9BQU8sRUFBRTtpQkFDbkMsR0FBRyxDQUFDLFVBQUEsRUFBRTtnQkFDSCxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUE7WUFDakIsQ0FBQyxDQUFDO2lCQUNELE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHO2dCQUNiLE9BQU8sR0FBRyxHQUFHLEdBQUcsQ0FBQTtZQUNwQixDQUFDLENBQUMsQ0FBQTtZQUVOLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFBO1NBQzNCO1FBRUQsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBNUNEO1FBREMsSUFBQSxrQkFBTSxFQUFDLGtFQUEwRCxDQUFDLG1CQUFtQixDQUFDOztpRkFDckM7SUFHbEQ7UUFEQyxJQUFBLGtCQUFNLEVBQUMsa0VBQTBELENBQUMsQ0FBQyxDQUFDOzsrREFDNUQ7SUFHVDtRQURDLElBQUEsa0JBQU0sRUFBQyxrRUFBMEQsQ0FBQyxLQUFLLENBQUM7O21FQUMzRDtJQVJMLGdDQUFnQztRQUQ1QyxJQUFBLHNCQUFVLEdBQUU7T0FDQSxnQ0FBZ0MsQ0FnRDVDO0lBQUQsdUNBQUM7Q0FBQSxBQWhERCxJQWdEQztBQWhEWSw0RUFBZ0MifQ==