import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service'
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  filteredName: string
  filteredEmail: string
  birthday: number
  isWrong: boolean = true
  controlForm: FormGroup
  constructor(public contactService: ContactService) {
  }

  ngOnInit(): void {
    this.getContacts()
  }
  validateData() {
    console.log(this.contactService.selectedContact.name)
    if (this.contactService.selectedContact.name !== ''
      && this.contactService.selectedContact.email !== ''
      && this.contactService.selectedContact.phone !== ''
      && this.contactService.selectedContact.address !== ''
    ) {
      this.isWrong = false
    } else {
      this.isWrong = true
    }
  }
  searchByName() {
    if (this.filteredName != '') {
      this.contactService.contacts = this.contactService.contacts.filter(res => {
        return res.name.toLowerCase().match(this.filteredName.toLowerCase())
      })
    } else if (this.filteredName == '') {
      this.ngOnInit()
    }
  }
  searchByEmail() {
    if (this.filteredEmail != '') {
      this.contactService.contacts = this.contactService.contacts.filter(res => {
        return res.email.toLowerCase().match(this.filteredEmail.toLowerCase())
      })
    } else if (this.filteredEmail == '') {
      this.ngOnInit()
    }
  }
  calcAge(date: string) {
    this.birthday = +new Date(date);
    return ~~((Date.now() - this.birthday) / (31557600000));
  }
  resetForm(form: NgForm) {
    this.getContacts()
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
          this.getContacts()
          form.reset()
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
