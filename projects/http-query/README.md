<p align="center">
  <a href="https://github.com/ng-sm">
    <img src="https://avatars2.githubusercontent.com/u/64587411?s=150">
  </a>
</p>
<p align="center">
  HTTP Query module based on the @ngrx/store package.
</p>

## Installation

`yarn add @ngsm/http-query` or `npm i @ngsm/http-query --save`

## Requirements

Library requires `@ngrx/store` module.

## Usage

Import QueryModule in your app.module.ts: 
```ts
import { QueryModule } from '@ngsm/query';

...,
@NgModule({
  ....,
  imports: [
    ....,
    QueryModule
  ]
}
```


```ts
...
import { QueryFacade } from '@ngsm/query';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
})
export class CarsComponent implements OnInit {
  // Available methods:
  loader$ = this.queryFacade.isInProgress$('cars');
  query$ = this.queryFacade.query$<YOUR_TYPE>('getCars');
  response$ = this.queryFacade.response$<YOUR_TYPE>('getCars');
  body$ = this.queryFacade.body$<YOUR_TYPE>('getCars');
  error$ = this.queryFacade.error$('getCars');
  status$ = this.queryFacade.status$('getCars');

  constructor(
    private httpClient: HttpClient,
    private queryFacade: QueryFacade,
  ) {}

  ngOnInit() {
    this.getCars().subscribe();
  }

  getCars(): Observable<YOUR_TYPE> {
    return this.http.get('API_URL', {
      headers: { queryName: 'getCars', queryGroups: ['cars'] }
    });
  }
}
```

## Author

<table border="0">
  <tr>
    <td>
      <a href="https://github.com/sebastianmusial" style="color: white">
        <img src="https://github.com/sebastianmusial.png?s=150" width="150"/>
      </a>
    </td>
    <td>
      <p><strong>Sebastian Musiał</strong></p>
      <p><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDQ4IDQ4IiBoZWlnaHQ9IjQ4cHgiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDQ4IDQ4IiB3aWR0aD0iNDhweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGcgaWQ9IkV4cGFuZGVkIj48Zz48Zz48cGF0aCBkPSJNNDQsNDBINGMtMi4yMDYsMC00LTEuNzk0LTQtNFYxMmMwLTIuMjA2LDEuNzk0LTQsNC00aDQwYzIuMjA2LDAsNCwxLjc5NCw0LDR2MjRDNDgsMzguMjA2LDQ2LjIwNiw0MCw0NCw0MHogTTQsMTAgICAgIGMtMS4xMDMsMC0yLDAuODk3LTIsMnYyNGMwLDEuMTAzLDAuODk3LDIsMiwyaDQwYzEuMTAzLDAsMi0wLjg5NywyLTJWMTJjMC0xLjEwMy0wLjg5Ny0yLTItMkg0eiIvPjwvZz48Zz48cGF0aCBkPSJNMjQsMjkuMTkxTDYuNDU3LDE3Ljg0Yy0wLjQ2NC0wLjMwMS0wLjU5Ny0wLjkxOS0wLjI5Ny0xLjM4M3MwLjkxOS0wLjU5NiwxLjM4My0wLjI5N0wyNCwyNi44MDlMNDAuNDU3LDE2LjE2ICAgICBjMC40NjQtMC4yOTksMS4wODMtMC4xNjcsMS4zODMsMC4yOTdzMC4xNjcsMS4wODItMC4yOTcsMS4zODNMMjQsMjkuMTkxeiIvPjwvZz48Zz48cGF0aCBkPSJNNi4wMDEsMzRjLTAuMzIzLDAtMC42NDEtMC4xNTYtMC44MzMtMC40NDVjLTAuMzA3LTAuNDYtMC4xODMtMS4wOCwwLjI3Ny0xLjM4N2w5LTZjMC40Ni0wLjMwNywxLjA4MS0wLjE4MywxLjM4NywwLjI3NyAgICAgYzAuMzA3LDAuNDYsMC4xODMsMS4wOC0wLjI3NywxLjM4N2wtOSw2QzYuMzg0LDMzLjk0NSw2LjE5MSwzNCw2LjAwMSwzNHoiLz48L2c+PGc+PHBhdGggZD0iTTQxLjk5OSwzNGMtMC4xOSwwLTAuMzgzLTAuMDU1LTAuNTU0LTAuMTY4bC05LTZjLTAuNDYtMC4zMDctMC41ODQtMC45MjctMC4yNzctMS4zODcgICAgIGMwLjMwNi0wLjQ2LDAuOTI2LTAuNTg0LDEuMzg3LTAuMjc3bDksNmMwLjQ2LDAuMzA3LDAuNTg0LDAuOTI3LDAuMjc3LDEuMzg3QzQyLjY0LDMzLjg0NCw0Mi4zMjIsMzQsNDEuOTk5LDM0eiIvPjwvZz48L2c+PC9nPjwvc3ZnPg==" style="width: 18px; height: 18px; vertical-align: middle; margin: 0 5px 5px 0"> <a href="mailto:kontakt@sebastianmusial.pl">kontakt@sebastianmusial.pl</a></p>
      <p><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iNTEycHgiIGlkPSLlvaLnirZfMl8xXyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTJweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGcgaWQ9IuW9oueKtl8yIj48Zz48cGF0aCBkPSJNNDg1Ljk4LDExMy4xNDFjLTE2LjkyMyw3LjUwNi0zNS4xMDksMTIuNTc4LTU0LjE5NywxNC44NTggICAgYzE5LjQ4LTExLjY3OSwzNC40NDUtMzAuMTcxLDQxLjQ5LTUyLjIwOGMtMTguMjM0LDEwLjgxNC0zOC40MywxOC42NjgtNTkuOTI1LDIyLjg5OWMtMTcuMjEzLTE4LjM0MS00MS43MzgtMjkuNzk5LTY4Ljg4LTI5Ljc5OSAgICBjLTUyLjExNCwwLTk0LjM2OCw0Mi4yNS05NC4zNjgsOTQuMzY0YzAsNy4zOTYsMC44MzQsMTQuNTk4LDIuNDQ0LDIxLjUwNWMtNzguNDI3LTMuOTM2LTE0Ny45NjItNDEuNTA0LTE5NC41MDQtOTguNTk3ICAgIGMtOC4xMjMsMTMuOTM3LTEyLjc3NywzMC4xNDYtMTIuNzc3LDQ3LjQ0MWMwLDMyLjczOSwxNi42NTksNjEuNjIzLDQxLjk4LDc4LjU0NmMtMTUuNDY5LTAuNDkxLTMwLjAyLTQuNzM1LTQyLjc0Mi0xMS44MDQgICAgYy0wLjAwOSwwLjM5NS0wLjAwOSwwLjc4OC0wLjAwOSwxLjE4OGMwLDQ1LjcyMSwzMi41MjksODMuODU5LDc1LjY5OCw5Mi41MzFjLTcuOTE4LDIuMTU2LTE2LjI1NSwzLjMxMS0yNC44NjEsMy4zMTEgICAgYy02LjA4MSwwLTExLjk5Mi0wLjU5My0xNy43NTUtMS42OTNjMTIuMDA5LDM3LjQ4OCw0Ni44NTgsNjQuNzczLDg4LjE1Myw2NS41MzNjLTMyLjI5NiwyNS4zMTItNzIuOTg1LDQwLjM5Ni0xMTcuMTk4LDQwLjM5NiAgICBjLTcuNjE3LDAtMTUuMTI4LTAuNDQ2LTIyLjUxMS0xLjMyYzQxLjc2MiwyNi43NzUsOTEuMzY1LDQyLjQsMTQ0LjY1NSw0Mi40YzE3My41NzQsMCwyNjguNDkzLTE0My43OTQsMjY4LjQ5My0yNjguNDk2ICAgIGMwLTQuMDkxLTAuMDkyLTguMTYtMC4yNzMtMTIuMjA4QzQ1Ny4zMzIsMTQ4LjY4NCw0NzMuMzMsMTMyLjA2NCw0ODUuOTgsMTEzLjE0MXoiIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiMyQ0E3RTA7Ii8+PC9nPjwvZz48L3N2Zz4=" style="width: 18px; height: 18px; vertical-align: middle; margin: 0 5px 5px 0"> <a href="https://twitter.com/SebaMusial">@sebamusial</a></p>
    </td>
  </tr>
</table>
