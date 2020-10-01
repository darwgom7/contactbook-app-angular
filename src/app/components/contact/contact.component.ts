import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service'
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

}
