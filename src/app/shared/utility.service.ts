import { Injectable, Inject } from "@angular/core";
import { Http, Request, RequestOptions, RequestMethod, Headers, URLSearchParams, HTTP_PROVIDERS, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'

@Injectable()

export class UtilityService {

    http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    makePostRequest(url: string, params: Array<string>, body: Object) {
        var fullUrl: string = url;
        if(params && params.length > 0) {
            fullUrl = fullUrl + "/" + params.join("/");
        }
        console.log("DEBUG: POST FULL URL:",fullUrl, " BODY:",JSON.stringify(body));
        return new Promise((resolve, reject) => {
            var requestHeaders = new Headers();
            requestHeaders.append("Content-Type", "application/json");
            this.http.request(new Request({
                method: RequestMethod.Post,
                url: fullUrl,
                body: JSON.stringify(body),
                headers: requestHeaders
            }))
            .subscribe((success) => {
                console.log("DEBUG: POST RESPONSE:",fullUrl,":",success.json());
                resolve(success.json());
            }, (error) => {
                reject(error.json());
            });
        });
    }

    makeFileRequest(url: string, params: Array<string>, file:File, description:string, userId: string, taskId:string) {

        return new Promise((resolve, reject)=> {
            var formData:any = new FormData();

            formData.append('upl', file, file.name);
            formData.append('description', description);
            formData.append('userId', userId);
            formData.append('taskId', taskId);

            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response)); // NOT Json by default, it must be parsed.
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open('POST', '/api/cdn/add', true);
            xhr.send(formData);
        });
    }

    makeGetRequestObs(url: string, params: Array<string>, searchParams?: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: headers});

        var fullUrl: string = url;
        if(params && params.length > 0) {
            fullUrl = fullUrl + "/" + params.join("/");
        }

        if (searchParams) {
            let urlSearchParams: URLSearchParams = new URLSearchParams(searchParams);
            options.search = urlSearchParams;
        }

        console.log("DEBUG: GET FULL URL:",fullUrl);
        return this.http.get(fullUrl, options)
        .do((success) => {
            console.log("DEBUG: GET RESPONSE:",fullUrl,":",success.json());
        },
        (error) => {
                console.log("DEBUG: GET ERROR:",fullUrl,":",error);
            })
        .catch(UtilityService.extractError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    public static extractError(res: Response): Observable<Response> {
        let body = res.json();

        if (body.failure) {
            return Observable.throw(body.failure);
        }
        if (body.message) {
            return Observable.throw(body.message);
        }

        return Observable.throw(body);
    }

    makeGetRequest(url: string, params: Array<string>) {
        let obs = this.makeGetRequestObs(url, params);
        return new Promise((resolve, reject) => {
            obs
            .map(this.extractData)
            .subscribe((success) => {
                resolve(success);
            }, (error) => {
                reject(error);
            });
        });
    }

}
