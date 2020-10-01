import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service'
import { NgForm } from '@angular/forms'
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  filteredName: string
  constructor(public contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts()
  }
  resetForm(form: NgForm) {
    form.reset()
  }
  getContacts() {
    this.contactService.getContacts().subscribe(
      res => {
        this.contactService.contacts = res
      },
      err => console.log(err)
    )
  }
  addContact(form: NgForm) {
    //console.log(form.value)
    if (form.value._id) {
      this.contactService.updateContact(form.value).subscribe(
        res => {
          console.log(res)
        },
        err => console.log(err)
      )
    } else {
      this.contactService.addContact(form.value).subscribe(
        res => {
          this.getContacts()
          form.reset()
          console.log(res)
        },
        err => console.log(err)
      )
    }
  }
  deleteContact(id: string) {
    this.contactService.deleteContact(id).subscribe(
      res => {
        this.getContacts()
        console.log(res)
      },
      err => console.log(err)
    )
  }
  editContact(contact: Contact) {
    //console.log('Updating', contact)
    this.contactService.selectedContact = contact
  }
}
