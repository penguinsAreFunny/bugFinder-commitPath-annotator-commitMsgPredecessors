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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommitPathsAnnotator = void 0;
var inversify_1 = require("inversify");
var bugfinder_framework_1 = require("bugfinder-framework");
var filter_1 = require("./filter");
var TYPES_1 = require("./TYPES");
var CommitPathsAnnotator = /** @class */ (function () {
    function CommitPathsAnnotator() {
    }
    CommitPathsAnnotator.prototype.annotate = function (localities) {
        var e_1, _a;
        var map = new bugfinder_framework_1.LocalityMap();
        try {
            for (var localities_1 = __values(localities), localities_1_1 = localities_1.next(); !localities_1_1.done; localities_1_1 = localities_1.next()) {
                var locality = localities_1_1.value;
                var annotation = ((0, filter_1.FILTER_CORRECTIVE_MESSAGE)(locality.commit)
                    && (0, filter_1.FILTER_LESS_OR_EQUAL_TWO_FILES)(locality.commit, this.testFileMatcher)
                    && (0, filter_1.FILTER_NO_MERGE_COMMIT)(locality.commit)
                    && (0, filter_1.FILTER_NO_TEST_FILE)(locality, this.testFileMatcher)) ? 1 : 0;
                map.set(locality, annotation);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (localities_1_1 && !localities_1_1.done && (_a = localities_1.return)) _a.call(localities_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return map;
    };
    __decorate([
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_ANNOTATOR_COMMITMSG_TYPES.testFileMatcher),
        __metadata("design:type", RegExp)
    ], CommitPathsAnnotator.prototype, "testFileMatcher", void 0);
    CommitPathsAnnotator = __decorate([
        (0, inversify_1.injectable)()
    ], CommitPathsAnnotator);
    return CommitPathsAnnotator;
}());
exports.CommitPathsAnnotator = CommitPathsAnnotator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWl0UGF0aHNBbm5vdGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29tbWl0UGF0aHNBbm5vdGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBNkM7QUFDN0MsMkRBQTJEO0FBRTNELG1DQUtrQjtBQUNsQixpQ0FBdUU7QUFHdkU7SUFBQTtJQWtCQSxDQUFDO0lBZEcsdUNBQVEsR0FBUixVQUFTLFVBQXdCOztRQUM3QixJQUFNLEdBQUcsR0FBRyxJQUFJLGlDQUFXLEVBQXNCLENBQUM7O1lBRWxELEtBQXNCLElBQUEsZUFBQSxTQUFBLFVBQVUsQ0FBQSxzQ0FBQSw4REFBQztnQkFBN0IsSUFBTSxRQUFRLHVCQUFBO2dCQUNkLElBQU0sVUFBVSxHQUFHLENBQUMsSUFBQSxrQ0FBeUIsRUFBQyxRQUFRLENBQUMsTUFBTSxDQUFDO3VCQUN2RCxJQUFBLHVDQUE4QixFQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQzt1QkFDckUsSUFBQSwrQkFBc0IsRUFBQyxRQUFRLENBQUMsTUFBTSxDQUFDO3VCQUN2QyxJQUFBLDRCQUFtQixFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQ2pFLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFBO2FBQ2hDOzs7Ozs7Ozs7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFkRDtRQURDLElBQUEsa0JBQU0sRUFBQyxzREFBOEMsQ0FBQyxlQUFlLENBQUM7a0NBQ3RELE1BQU07aUVBQUM7SUFGZixvQkFBb0I7UUFEaEMsSUFBQSxzQkFBVSxHQUFFO09BQ0Esb0JBQW9CLENBa0JoQztJQUFELDJCQUFDO0NBQUEsQUFsQkQsSUFrQkM7QUFsQlksb0RBQW9CIn0=