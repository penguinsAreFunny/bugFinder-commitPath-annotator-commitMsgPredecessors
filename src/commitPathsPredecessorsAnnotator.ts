import {inject, injectable, optional} from "inversify";
import {Annotator, LocalityMap} from "bugfinder-framework";
import {CommitPath} from "bugfinder-localityrecorder-commitpath";
import {BUGFINDER_COMMITPATH_ANNOTATOR_COMMITMSGPREDECESSORS_TYPES} from "./TYPES";
import _ from 'underscore';
import {Logger} from "ts-log";

@injectable()
export class CommitPathsPredecessorsAnnotator implements Annotator<CommitPath, number> {
    @inject(BUGFINDER_COMMITPATH_ANNOTATOR_COMMITMSGPREDECESSORS_TYPES.commitPathAnnotator)
    commitPathAnnotator: Annotator<CommitPath, number>

    @inject(BUGFINDER_COMMITPATH_ANNOTATOR_COMMITMSGPREDECESSORS_TYPES.n)
    n: number

    @inject(BUGFINDER_COMMITPATH_ANNOTATOR_COMMITMSGPREDECESSORS_TYPES.upToN)
    upToN: boolean

    @optional() @inject(BUGFINDER_COMMITPATH_ANNOTATOR_COMMITMSGPREDECESSORS_TYPES.logger)
    logger: Logger

    /**
     * If upToN ist true the return value does not annotate localities which have less than n predecessors
     * Therefore the return value has undefined values for these localities
     * @param localitiesToAnnotate
     * @param allLocalities
     */
    annotate(localitiesToAnnotate: CommitPath[], allLocalities: CommitPath[]): LocalityMap<CommitPath, number> {
        const map = new LocalityMap<CommitPath, number>()

        const nPredecessorsArray: Array<CommitPath[]> = CommitPath
            .getNPredecessorsArray(localitiesToAnnotate, this.n, this.upToN, allLocalities)

        for (let i = 0; i < localitiesToAnnotate.length; i++) {
            const loc = localitiesToAnnotate[i]
            const nPredecessors = nPredecessorsArray[i]

            // upToN == false => locality has less than n predecessors
            if (nPredecessors == null)
                continue

            const localitiesToConsider = [...nPredecessors, loc]


            // annotations of nPredecessors
            const annotations = this.commitPathAnnotator.annotate(localitiesToConsider)

            // sum of all annotations of the nPredecessors
            const annotation = annotations.toArray()
                .map(el => {
                    return el.val
                })
                .reduce((el1, el2) => {
                    return el1 + el2
                })

            map.set(loc, annotation)
        }

        const annoValues = map.toArray().map(el => {
            return el.val
        })

        this.logger?.info("Annotation count: ", _.countBy(annoValues, (num) => {
            return num
        }))

        return map;
    }

}