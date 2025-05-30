import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobOffer } from '../models/job-offer';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiUrl = 'http://localhost:3000/api/offers';

  constructor(private http: HttpClient) {}

  createJobOffer(offer: JobOffer): Observable<any> {
    return this.http.post(this.apiUrl, offer);
  }

  getAllJobOffers(): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(this.apiUrl);
  }
  
  getJobOfferById(id: string): Observable<JobOffer> {
    return this.http.get<JobOffer>(`${this.apiUrl}/${id}`);
  }
}
