import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './contact.html',
    styleUrls: ['./contact.scss']
})
export class Contact {
    contactForm: FormGroup;
    submitted = false;

    constructor(private fb: FormBuilder) {
        this.contactForm = this.fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern('^[0-9+]{10,15}$')]],
            message: ['', [Validators.required, Validators.minLength(10)]]
        });
    }

    onSubmit() {
        this.submitted = true;
        if (this.contactForm.valid) {
            console.log('Form Submitted!', this.contactForm.value);
            alert('Thank you for contacting us! We will get back to you soon.');
            this.contactForm.reset();
            this.submitted = false;
        }
    }
}
