import { Annotator, LocalityMap } from "bugfinder-framework";
import { CommitPath } from "bugfinder-localityrecorder-commitpath";
import { Logger } from "ts-log";
export declare class CommitPathsPredecessorsAnnotator implements Annotator<CommitPath, number> {
    commitPathAnnotator: Annotator<CommitPath, number>;
    n: number;
    upToN: boolean;
    uniqueMode: boolean;
    logger: Logger;
    /**
     * If upToN is false the return value does not annotate localities which have less than n predecessors
     * Therefore the return value has undefined values for these localities
     * @param localitiesToAnnotate
     * @param allLocalities
     */
    annotate(localitiesToAnnotate: CommitPath[], allLocalities: CommitPath[]): LocalityMap<CommitPath, number>;
}
