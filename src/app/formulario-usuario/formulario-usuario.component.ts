
import { Component, EventEmitter,Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { User } from '../nolose.service';



@Component({
  selector: 'app-formulario-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ReactiveFormsModule],
  templateUrl: './formulario-usuario.component.html',
  styleUrl: './formulario-usuario.component.css'
})
export class FormularioUsuarioComponent {
  @Input() usuario: User | null = null;
  @Output() usuarioRegistrado = new EventEmitter<User>();
  @Output() usuarioEditado = new EventEmitter<User>();
  @Output() formularioCerrado = new EventEmitter<void>();

  userss_Formulario = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    documento: new FormControl(''),
    password: new FormControl('')
  });

  ngOnChanges(changes: SimpleChanges) {
    console.log('Usuario recibido en formulario:', this.usuario);
    if (changes['usuario'] && this.usuario) {
      // Si hay usuario seleccionado, llenar el formulario con sus datos
      this.userss_Formulario.patchValue({
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        documento: this.usuario.documento,
        password: this.usuario.password
      });
    }
  }

  enviarFormulario() {
    const formValues = this.userss_Formulario.value;

    // Crea el usuario sin el campo `id`
  const usuarioModificado: Omit<User, 'id'> = {
    nombre: formValues.nombre || '', // Evita null/undefined
    apellido: formValues.apellido || '',
    documento: formValues.documento || '',
    password: formValues.password || ''
  };

  if (this.usuario) {
    this.usuarioEditado.emit(usuarioModificado); // Emite evento para edición
  } else {
    this.usuarioRegistrado.emit(usuarioModificado); // Emite evento para nuevo usuario
  }
    this.userss_Formulario.reset();
    this.formularioCerrado.emit(); // Cierra el formulario

  }

  cerrarFormulario() {
    this.formularioCerrado.emit();
  }
}