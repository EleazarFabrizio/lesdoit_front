import { Component, OnInit , ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NoloseService , User} from '../nolose.service';
import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { NgFor } from '@angular/common';


import { CommonModule } from '@angular/common';
import {FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-cebolla',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatPaginatorModule, MatSortModule, MatTableModule,],
  templateUrl: './cebolla.component.html',
  styleUrl: './cebolla.component.css'
})

export class CebollaComponent implements OnInit {

  

  displayedColumns: string[] = ['nombre', 'apellido', 'documento'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  users: User[] = [];
  tableHTML: string = '';

  ngOnInit(): void {
    // Cargar los usuarios cuando el componente se inicialice
    this.fetchUsers();
  }

  newUser: User = {
    id: '',
    nombre: '',
    apellido: '',
    documento: '',
    password: ''
  };

  userss_Formulario: FormGroup | any;

  constructor(private noloseService: NoloseService) {

    this.userss_Formulario = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      documento: new FormControl(''),
      password: new FormControl('')
    });
  }


  // Método para manejar el evento del botón
  fetchUsers() {
    this.noloseService.get_nose().subscribe(users => {

      console.log(users)

      this.users = users
      
      console.log(this.users)
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.error('Error al obtener usuarios:', error);
    });
  }

  postUsers() {
    const { id, ...userData } = this.userss_Formulario.value;
    this.noloseService.post_nose(this.userss_Formulario.value).subscribe(users => {
      console.log(users)
      console.log('Usuarios obtenidos:', users);

      this.users.push(users);
      this.dataSource.data = this.users;
      this.userss_Formulario.reset();
    }, error => {
      console.error('Error al obtener usuarios:', error);
    });
  }

  eliminar_user(id:string) : void {
    console.log(id);
    this.noloseService.deleteUser(id).subscribe(() => {
      
      this.users = this.users.filter(user => user.documento !== id);
    });
  }
}
