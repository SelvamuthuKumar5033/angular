import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  loading = false;
  private minDisplayTime = 500; // Minimum loader display time in milliseconds

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderService.loading.subscribe({
      next: (status: boolean) => {
        if (status) {
          // Show loader immediately
          this.loading = true;
        } else {
          setTimeout(() => {
            this.loading = false;
          }, this.minDisplayTime);
        }
      },
      error: (err) => {
        console.error('Error in loader subscription:', err);
        this.loading = false; 
      },
    });
  }
}
