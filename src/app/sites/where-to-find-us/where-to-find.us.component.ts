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
      startDate: new Date(2025, 8, 14),
      endDate: new Date(2025, 8, 14),
      time: '11:00 - 18:00',
      description: 'Kerbmarkt Eschau',
      url: 'https://www.eschau.de/rathaus-und-buergerservice/maerkte/',
    },
    {
      startDate: new Date(2025, 8, 28),
      endDate: new Date(2025, 8, 28),
      time: '11:00 - 18:00',
      description: 'Kirchweihmarkt Großwallstadt',
      url: 'https://grosswallstadt.de/freizeit-tourismus/veranstaltungen/veranstaltungskalender',
    },
    {
      startDate: new Date(2025, 9, 19),
      endDate: new Date(2025, 9, 19),
      time: '13:00 - 18:00',
      description: 'Dürmer Herbst - Walldürn',
      url: 'https://www.wallduern.de/de/Rathaus-Leben/Aktuelles/Maerkte-und-Feste/Duermer-Herbst-',
    },
    {
      startDate: new Date(2025, 10, 29),
      endDate: new Date(2025, 10, 30),
      time: '12:00 - 20:00',
      description: 'Weihnachtsmarkt Dettingen',
      url: '',
    },
    {
      startDate: new Date(2025, 11, 5),
      endDate: new Date(2025, 11, 7),
      time: '14:00 - 21:00',
      description: 'Weihnachtsmarkt Wertheim',
      url: 'https://www.weihnachtsmarkt-wertheim.de/',
    },
  ];
  constructor() {}

  formatAppointmentDateRange(startDate: Date, endDate: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const start = startDate.toLocaleDateString('de-DE', options);
    const end = endDate.toLocaleDateString('de-DE', options);

    if (startDate.getTime() === endDate.getTime()) {
      return start;
    } else {
      return `${start} - ${end}`;
    }
  }

  redirectTo(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
