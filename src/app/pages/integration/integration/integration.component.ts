import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ControllerService } from 'src/app/shared/services/controller.service';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss']
})
export class IntegrationComponent {

  constructor(
    private controllerService: ControllerService,
    private ts: ToastrService) { }

  integrate(type: string) {
    this.controllerService.integrate(type).then((response) => {
      console.log("response", response)
    }).catch((error) => {
      this.ts.error(`Error While Integrate to ${type}`, 'Error')
    })
  }
}
