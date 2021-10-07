"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../../bugFinder-localityRecorder-commitPath/src");
var bugfinder_framework_1 = require("bugfinder-framework");
var bugfinder_framework_defaultcontainer_1 = require("bugfinder-framework-defaultcontainer");
__exportStar(require("./TYPES"), exports);
__exportStar(require("./filter"), exports);
__exportStar(require("./commitPathsPredecessorsAnnotator"), exports);
var logOptions = {
    debugToConsole: true,
    errorToConsole: true,
    infoToConsole: true,
    traceToConsole: true,
    warnToConsole: true,
    logFile: "./log.txt",
};
bugfinder_framework_defaultcontainer_1.annotatorContainer.bind(src_1.BUGFINDER_LOCALITYRECORDER_COMMITPATH_TYPES.logger).to(bugfinder_framework_1.FileAndConsoleLogger);
bugfinder_framework_defaultcontainer_1.annotatorContainer.bind(src_1.BUGFINDER_LOCALITYRECORDER_COMMITPATH_TYPES.logConfig).toConstantValue(logOptions);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUVBQTRHO0FBQzVHLDJEQUFvRTtBQUNwRSw2RkFBd0U7QUFHeEUsMENBQXVCO0FBQ3ZCLDJDQUF3QjtBQUN4QixxRUFBa0Q7QUFFbEQsSUFBTSxVQUFVLEdBQWM7SUFDMUIsY0FBYyxFQUFFLElBQUk7SUFDcEIsY0FBYyxFQUFFLElBQUk7SUFDcEIsYUFBYSxFQUFFLElBQUk7SUFDbkIsY0FBYyxFQUFFLElBQUk7SUFDcEIsYUFBYSxFQUFFLElBQUk7SUFDbkIsT0FBTyxFQUFFLFdBQVc7Q0FDdkIsQ0FBQTtBQUVELHlEQUFrQixDQUFDLElBQUksQ0FBUyxpREFBMkMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsMENBQW9CLENBQUMsQ0FBQTtBQUM1Ryx5REFBa0IsQ0FBQyxJQUFJLENBQVksaURBQTJDLENBQUMsU0FBUyxDQUFDLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBIn0=