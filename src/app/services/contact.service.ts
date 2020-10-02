import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Contact } from '../models/contact'
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  //URL_API = 'http://localhost:3000/api/contacts'
  URL_API = 'https://contactbook-app-api-no3kawe7l.vercel.app/api/contacts'
  selectedContact: Contact = {
    name: '',
    phone: '',
    birth: '',
    address: '',
    email: ''
  };
  contacts: Contact[]
  constructor(private http: HttpClient) {
  }
  getContacts() {
    return this.http.get<Contact[]>(this.URL_API);
  }
  addContact(contact: Contact) {
    return this.http.post(this.URL_API, contact)
  }
  updateContact(contact: Contact) {
    return this.http.put(`${this.URL_API}/${contact._id}`, contact)
  }
  deleteContact(_id: string) {
    return this.http.delete(`${this.URL_API}/${_id}`)
  }
}
