import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      MatToolbarModule,
      MatInputModule,
      MatButtonModule,
      MatFormFieldModule,
      MatIconModule,
      ReactiveFormsModule,
      MatGridListModule,
      MatSidenavModule,
      MatListModule,
      MatMenuModule,
      MatTooltipModule
    ],
    exports: [
      MatToolbarModule,
      MatInputModule,
      MatButtonModule,
      MatFormFieldModule,
      MatIconModule,
      ReactiveFormsModule,
      MatGridListModule,
      MatSidenavModule,
      MatListModule,
      MatMenuModule,
      MatTooltipModule
    ],

})
export class MaterialModule {}
