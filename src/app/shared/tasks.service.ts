import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { FbCreateResponse, Task } from "./interface";

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    
    constructor(private http: HttpClient) {}

    create(task: Task): Observable<Task> {
        return this.http.post<any>(`${environment.fbDbUrl}/tasks.json`, task)
            .pipe(map((res: FbCreateResponse) => {
                return {
                    ...task,
                   id: res.name,
                   date: new Date(task.date)
                }
            }))
    }

    getTasks(): Observable<Task[]> {
        return this.http.get(`${environment.fbDbUrl}/tasks.json`)
            .pipe(map<any, any>((res) => {
                return Object
                    .keys(res)
                    .map( key => ({
                        ...res[key],
                        id: key,
                        date: new Date(res[key].date)
                    }))
            }))
    }

    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.fbDbUrl}/tasks/${id}.json`)
    }
}