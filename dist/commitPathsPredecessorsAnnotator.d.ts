import { Annotator, LocalityMap } from "bugfinder-framework";
import { CommitPath } from "bugfinder-localityrecorder-commitpath";
export declare class CommitPathsPredecessorsAnnotator implements Annotator<CommitPath, number> {
    commitPathAnnotator: Annotator<CommitPath, number>;
    n: number;
    upToN: boolean;
    /**
     * If upToN ist true the return value does not annotate localities which have less than n predecessors
     * Therefore the return value has undefined values for these localities
     * @param localitiesToAnnotate
     * @param allLocalities
     */
    annotate(localitiesToAnnotate: CommitPath[], allLocalities: CommitPath[]): LocalityMap<CommitPath, number>;
}
