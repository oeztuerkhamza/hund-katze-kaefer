import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import Contact from './contact';

describe('Contact form', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Contact],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    });
  });

  function setup() {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    const form = (fixture.componentInstance as unknown as { form: Contact['form'] }).form;
    return { fixture, form };
  }

  it('requires name and a valid e-mail address', () => {
    const { form } = setup();
    expect(form.valid).toBeFalse();

    form.patchValue({ name: 'Erika', email: 'keine-adresse' });
    expect(form.controls.email.hasError('email')).toBeTrue();

    form.patchValue({ email: 'erika@example.org' });
    expect(form.valid).toBeTrue();
  });

  it('rejects an end date before the start date', () => {
    const { form } = setup();
    form.patchValue({
      name: 'Erika',
      email: 'erika@example.org',
      from: '2026-10-10',
      to: '2026-10-01',
    });
    expect(form.hasError('range')).toBeTrue();

    form.patchValue({ to: '2026-10-20' });
    expect(form.hasError('range')).toBeFalse();
  });

  it('shows an error summary and focuses the first invalid field on submit', async () => {
    const { fixture } = setup();
    const el: HTMLElement = fixture.nativeElement;
    document.body.appendChild(el);

    el.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(el.querySelector('[role="alert"]')?.textContent).toContain('markierten Felder');
    expect(document.activeElement?.id).toBe('f-name');
    el.remove();
  });
});
