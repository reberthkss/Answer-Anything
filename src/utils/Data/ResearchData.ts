import {ResearchQuestionData} from "./ResearchQuestionData";
import {ResearchStatus, StatusTypes} from "./ResearchStatus";
import firebase from "firebase";
import { store } from "../../redux/ConfigureStore";

export interface FirestoreTimestamp {seconds: number, nanoseconds?: number}
export class Research {
    constructor(
        title: string | null = null,
        subtitle: string | null = null,
        description: string | null = null,
        questions: ResearchQuestionData[] = [new ResearchQuestionData()],
        status: ResearchStatus | null = null,
        roles: Map<string, string> | null = null,
        timestamp: FirestoreTimestamp = {seconds: Date.now()}
        ) {
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.questions = questions;
        this.status = status;
        this.roles = roles;
        this.timestamp = timestamp;
    }

    title: string | null;
    subtitle: string | null;
    description: string | null;
    questions: ResearchQuestionData[];
    status: ResearchStatus | null;
    roles: Map<string, string> | null;
    timestamp: FirestoreTimestamp;

    static from(data:  firebase.firestore.DocumentData): Research {
        const questions  = data["questions"]
            .map((data: firebase.firestore.DocumentData) => ResearchQuestionData.from(data));
        const status = data["status"] != null ? ResearchStatus[(data["status"]).toUpperCase() as StatusTypes] : null
        return new Research(
            data["title"],
            data["subtitle"],
            data["description"],
            questions,
            status,
            data["roles"],
            data["timestamp"]
        )
    }

    parseFirebase() {
        let roles: any = {}
        this.roles?.forEach((value, index) => roles = {...roles, [index]: value});
        return {
            "title": this.title,
            "subtitle": this.subtitle,
            "description": this.description,
            "questions": this.questions.map((question) => question.parseFirebase()),
            "status": this.status?.toUpperCase(),
            "roles": roles,
            "timestamp": firebase.firestore.FieldValue.serverTimestamp()
        }
    }

}
