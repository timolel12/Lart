import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-where-to-find-us',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
  ],
  templateUrl: './where-to-find-us.component.html',
  styleUrl: './where-to-find-us.component.scss',
})
export class WhereToFindUsComponent {
  appointments = [
    {
      startDate: new Date(2025, 2, 16),
      endDate: new Date(2025, 2, 16),
      time: '11:00 - 18:00',
      description: 'Frühlingsmarkt Großheubach',
      url: 'https://www.grossheubach.de/freizeit-veranstaltungen/termine/veranstaltungskalender/fruehlingsmarkt/',
    },
    {
      startDate: new Date(2025, 2, 30),
      endDate: new Date(2025, 2, 30),
      time: '13:00 - 18:00',
      description: 'Dürmer Frühling - Walldürn',
      url: 'https://www.wallduern.de/de/Rathaus-Leben/Aktuelles/Stadtnachrichten/Stadtnachricht?view=publish&item=article&id=3486',
    },
    {
      startDate: new Date(2025, 3, 13),
      endDate: new Date(2025, 3, 13),
      time: '11:00 - 18:00',
      description: 'Frühlingsmarkt Klingenberg',
      url: 'https://www.stadt-klingenberg.de/seite/de/churfranken/036:584/-/Maerkte_in_Klingenberg.html',
    },
    {
      startDate: new Date(2025, 4, 4),
      endDate: new Date(2025, 4, 4),
      time: '11:00 - 18:00',
      description: 'Frühjahrsmarkt Großwallstadt',
      url: 'https://grosswallstadt.de/freizeit-tourismus/veranstaltungen/veranstaltungskalender',
    },
    {
      startDate: new Date(2025, 4, 18),
      endDate: new Date(2025, 4, 18),
      time: '13:00 - 18:00',
      description: 'Kunst Genuss Markt - Elsenfeld',
      url: 'https://www.elsenfeld.de/freizeit-vereine/veranstaltungen/2505-kunstgenuss/',
    },
    {
      startDate: new Date(2025, 11, 5),
      endDate: new Date(2025, 11, 7),
      time: '16:00 - 21:00',
      description: 'Kläusschenmarkt Elsenfeld',
      url: 'https://www.elsenfeld.de/freizeit-vereine/veranstaltungen/2512-klaeuschenmarkt/',
    },
  ];
  constructor() {}

  // Method to format the appointment date range
  formatAppointmentDateRange(startDate: Date, endDate: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const start = startDate.toLocaleDateString('de-DE', options);
    const end = endDate.toLocaleDateString('de-DE', options);

    if (startDate.getTime() === endDate.getTime()) {
      return start; // Same day appointment
    } else {
      return `${start} - ${end}`; // Multi-day appointment
    }
  }

  redirectTo(url: string): void {
    window.open(url, '_blank'); // Opens the URL in a new tab
  }
}
