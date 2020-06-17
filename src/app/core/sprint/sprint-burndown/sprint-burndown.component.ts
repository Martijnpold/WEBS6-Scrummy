import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import * as CanvasJS from '../../../../assets/canvasjs.min';
import { Observable, Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/model/task';
import { Sprint } from 'src/app/model/sprint';

@Component({
  selector: 'app-sprint-burndown',
  templateUrl: './sprint-burndown.component.html',
  styleUrls: ['./sprint-burndown.component.scss']
})
export class SprintBurndownComponent implements OnInit, OnDestroy {
  sprint$: Observable<Sprint>;
  tasks$: Observable<Task[]>;

  sprint_subscr: Subscription;
  tasks_subscr: Subscription;
  chart: CanvasJS.Chart;

  tasks: Task[];
  sprint: Sprint;
  dataPoints: any[][];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
  }

  ngOnInit(): void {
    this.sprint$ = this.data.sprint$;
    this.sprint_subscr = this.sprint$.subscribe(sprint => {
      this.sprint = sprint;
      this.addDataPoints();
    })

    this.tasks$ = this.data.tasks$;
    this.tasks_subscr = this.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.addDataPoints()
    });
  }

  ngOnDestroy() {
    this.sprint_subscr.unsubscribe();
    this.tasks_subscr.unsubscribe();
  }

  addDataPoints() {
    //Read data from sprint
    if (!this.sprint || !this.tasks) return;
    this.initChart();
    let start = this.sprint.startDate.toDate();
    let end = this.sprint.endDate.toDate();
    let days = this.datediff(start, end);

    //Update data baseline
    this.dataPoints[0].splice(0, this.dataPoints[0].length);
    this.dataPoints[1].splice(0, this.dataPoints[1].length);

    //Loop through dates from start to end, add data points
    let check = new Date(start);
    let day = 0;
    while (check <= end) {
      this.dataPoints[1].push({ x: new Date(check), y: this.getStoryPointsOnDay(check) })
      this.dataPoints[0].push({ x: new Date(check), y: this.getStoryPointsOnDay(start) * (Math.abs(day / days - 1)) })
      check.setDate(check.getDate() + 1);
      day++;
    }

    //Add estimate data points
    // this.dataPoints[0].push({ x: start, y: this.getStoryPointsOnDay(start) })
    // this.dataPoints[0].push({ x: end, y: 0 })

    this.chart.render();
  }

  getStoryPointsOnDay(date: Date) {
    let total = 0;
    for (let task of this.tasks) {
      console.log(total)
      console.log(task)
      if (!task.wasCompletedOn(date)) {
        console.log("finished " + total)
        total += task.story_points;
      }
    }
    return total;
  }

  initChart() {
    this.dataPoints = [];
    this.dataPoints.push([]);
    this.dataPoints.push([]);
    this.chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        text: "Sprint Burndown"
      },
      axisX: {
        valueFormatString: "DD MMM YYYY"
      },
      axisY: {
        title: "Story Points"
      },
      legend: {
        verticalAlign: "top",
        horizontalAlign: "right",
        dockInsidePlotArea: true
      },
      toolTip: {
        shared: true
      },
      data: [{
        name: "Planned Progress",
        showInLegend: true,
        legendMarkerType: "square",
        type: "line",
        color: "rgba(255,0,0,1)",
        lineThickness: 5,
        markerSize: 0,
        dataPoints: this.dataPoints[0]
      },
      {
        name: "Current Progress",
        showInLegend: true,
        legendMarkerType: "square",
        type: "area",
        color: "rgba(50,150,50,0.7)",
        markerSize: 0,
        dataPoints: this.dataPoints[1]
      }],
      options: {
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              return "Daily Ticket Sales: $ " + tooltipItem.yLabel;
            },
          }
        }
      }
    });
    this.chart.render();
  }

  datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

}
