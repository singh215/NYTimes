import { Component, OnInit, Input } from '@angular/core';
import { NyTimesService } from '../services/ny-times.service';

@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.scss']
})
export class MasterDetailComponent implements OnInit {

  topStories: any[] = [];
  selectedStory: any;
  
  constructor(private nyService: NyTimesService) { }

  ngOnInit() {
    this.getTopStoriesByCategory('world');
  }

  getTopStoriesByCategory(category) {
    this.nyService.getTopStoriesByCategory(category).subscribe((result) => {
      console.log(result);
      if(result.results && result.results.length > 0) {
      this.topStories = result.results;
      this.selectedStory = this.topStories[0];
      }
    })
  }

  onStorySelect(story) {
    this.selectedStory = story;
  }

  readMore(selectedStory) {
    window.open(selectedStory.url);
  }

  onCategoryToggle(event) {
    this.getTopStoriesByCategory(event.value);
  }

}
