import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Contact } from '../models/contact'
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  URL_API = 'http://localhost:3000/api/contacts'
  selectedContact: Contact = {
    name: '',
    phone: '',
    birth: null,
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
}
