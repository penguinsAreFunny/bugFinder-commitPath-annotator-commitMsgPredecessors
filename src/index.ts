import {BUGFINDER_LOCALITYRECORDER_COMMITPATH_TYPES} from "bugfinder-localityrecorder-commitpath";
import {FileAndConsoleLogger, LogConfig} from "bugfinder-framework";
import {annotatorContainer} from "bugfinder-framework-defaultcontainer";
import {Logger} from "ts-log";

export * from "./TYPES"
export * from "./filter"
export * from "./commitPathsPredecessorsAnnotator"

const logOptions: LogConfig = {
    debugToConsole: true,
    errorToConsole: true,
    infoToConsole: true,
    traceToConsole: true,
    warnToConsole: true,
    logFile: "./log.txt",
}

annotatorContainer.bind<Logger>(BUGFINDER_LOCALITYRECORDER_COMMITPATH_TYPES.logger).to(FileAndConsoleLogger)
annotatorContainer.bind<LogConfig>(BUGFINDER_LOCALITYRECORDER_COMMITPATH_TYPES.logConfig).toConstantValue(logOptions)
