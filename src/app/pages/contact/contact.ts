import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { SITE } from '../../core/site';
import { EmailLink } from '../../shared/email-link';
import { Icon } from '../../shared/icon';
import { PageIntro } from '../../shared/page-intro';
import { buildInquiryMail, InquiryForm } from './inquiry-mail';

export const SERVICE_OPTIONS = [
  'Katzenbetreuung',
  'Gassi-Service & Hundebetreuung',
  'Kleintierbetreuung',
  'Ernährungsberatung für Katzen',
  'Etwas anderes',
] as const;

export const ANIMAL_OPTIONS = [
  { key: 'hund', label: 'Hund' },
  { key: 'katze', label: 'Katze' },
  { key: 'kleintier', label: 'Kleintier' },
  { key: 'vogel', label: 'Vogel' },
  { key: 'exoten', label: 'Fische / Reptilien' },
  { key: 'andere', label: 'Andere' },
] as const;

type AnimalKey = (typeof ANIMAL_OPTIONS)[number]['key'];

/** "bis" must not be before "von". */
function dateRangeValidator(group: AbstractControl): ValidationErrors | null {
  const from = group.get('from')?.value as string;
  const to = group.get('to')?.value as string;
  return from && to && to < from ? { range: true } : null;
}

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink, Icon, PageIntro, EmailLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export default class Contact {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly document = inject(DOCUMENT);
  private readonly formEl = viewChild.required<ElementRef<HTMLFormElement>>('formEl');

  protected readonly site = SITE;
  protected readonly serviceOptions = SERVICE_OPTIONS;
  protected readonly animalOptions = ANIMAL_OPTIONS;
  protected readonly status = signal<'idle' | 'invalid' | 'opened'>('idle');

  protected readonly form = this.fb.group(
    {
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[+\d][\d\s/()-]{5,}$/)]],
      place: [''],
      service: this.fb.control<string>(SERVICE_OPTIONS[0], Validators.required),
      animals: this.fb.group(
        Object.fromEntries(ANIMAL_OPTIONS.map((a) => [a.key, false])) as Record<AnimalKey, boolean>,
      ),
      from: [''],
      to: [''],
      message: ['', [Validators.maxLength(2000)]],
    },
    { validators: dateRangeValidator },
  );

  protected invalid(name: 'name' | 'email' | 'phone' | 'message'): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || this.status() === 'invalid');
  }

  protected get rangeInvalid(): boolean {
    return (
      this.form.hasError('range') && (this.form.controls.to.touched || this.status() === 'invalid')
    );
  }

  /** Move keyboard focus to the first field with an error (in visual order). */
  private focusFirstError(): void {
    const order = ['name', 'email', 'phone', 'message'] as const;
    const first = order.find((key) => this.form.controls[key].invalid);
    const id = first ? `f-${first}` : this.form.hasError('range') ? 'f-to' : null;
    if (id) this.formEl().nativeElement.querySelector<HTMLElement>(`#${id}`)?.focus();
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.status.set('invalid');
      this.focusFirstError();
      return;
    }
    const value = this.form.getRawValue();
    const animals = ANIMAL_OPTIONS.filter((a) => value.animals[a.key]).map((a) => a.label);
    const mail = buildInquiryMail({ ...value, animals } satisfies InquiryForm, SITE.email);
    this.document.defaultView?.location.assign(mail);
    this.status.set('opened');
  }
}
