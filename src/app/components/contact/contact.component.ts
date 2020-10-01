import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(public contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts()
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
    this.contactService.addContact(form.value).subscribe(
      res => {
        this.getContacts()
        form.reset()
        console.log(res)
      },
      err => console.log(err)
    )
  }
  deleteContact() {
    console.log('Deleting contact...')
  }
}
