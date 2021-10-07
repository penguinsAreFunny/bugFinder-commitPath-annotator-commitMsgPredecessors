import {inject, injectable} from "inversify";
import {Annotator, LocalityMap} from "bugfinder-framework";
import {CommitPath} from "bugfinder-localityrecorder-commitpath";
import {BUGFINDER_COMMITPATH_ANNOTATOR_COMMITMSGPREDECESSORS_TYPES} from "./TYPES";
import {GitFileType} from "bugfinder-localityrecorder-commit";

@injectable()
export class CommitPathsPredecessorsAnnotator implements Annotator<CommitPath, number> {
    @inject(BUGFINDER_COMMITPATH_ANNOTATOR_COMMITMSGPREDECESSORS_TYPES.commitPathAnnotator)
    commitPathAnnotator: Annotator<CommitPath, number>;

    @inject(BUGFINDER_COMMITPATH_ANNOTATOR_COMMITMSGPREDECESSORS_TYPES.n)
    n: number;

    private orderedLocalities: Map<number, CommitPath[]>
    private minOrder: number

    annotate(localitiesToAnnotate: CommitPath[], allLocalities: CommitPath[]): LocalityMap<CommitPath, number> {
        const map = new LocalityMap<CommitPath, number>();

        for (const loc of localitiesToAnnotate) {
            const nPredecessors: CommitPath[] = this.getNPredecessors(loc, this.n, allLocalities)

        }


        return map;
    }

    /**
     * TODO: renaming of paths
     * Returns up to n predecessor CommitPaths of locality
     * @param locality
     * @param n
     * @param allLocalities
     */
    getNPredecessors(locality: CommitPath, n: number, allLocalities: CommitPath[]): CommitPath[] {
        if (allLocalities == null || allLocalities.length == 0) {
            return []
        }

        // init: performance optimization
        if (this.orderedLocalities == null) {
            this.orderedLocalities = new Map<number, CommitPath[]>()

            for (const aLoc of allLocalities) {
                let cps = this.orderedLocalities.get(aLoc.commit.order)
                cps = cps == null ? [aLoc] : [...cps, aLoc]
                this.orderedLocalities.set(aLoc.commit.order, cps)

                if (this.minOrder == null) this.minOrder = aLoc.commit.order
                if (aLoc.commit.order < this.minOrder) this.minOrder = aLoc.commit.order
            }
        }

        // calculating predecessor CommitPaths
        let i = 0
        let curOrder = locality.commit.order - 1
        while (i < n && curOrder >= this.minOrder) {
            const cps = this.orderedLocalities.get(curOrder)
            const cpsWith = cps.filter(cp => {
                return cp.path.path == locality.path.path &&
                    (cp.path.type == GitFileType.added || cp.path.type == GitFileType.modified)
            })
        }

        return []
    }

}