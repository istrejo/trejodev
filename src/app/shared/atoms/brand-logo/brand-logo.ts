import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brand-logo',
  standalone: true,
  imports: [RouterLink],
  styleUrl: './brand-logo.scss',
  templateUrl: './brand-logo.html',
})
export class BrandLogo {}
