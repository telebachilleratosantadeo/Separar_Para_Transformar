import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule] 
})
export class EditarUsuarioPage implements OnInit {
  usuario: any = {
    nombre: '',
    apellidos: '',
    curp: '',
    foto: null
  };

  constructor(
    private userService: UserService,
    private navCtrl: NavController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    if (this.userService.usuarioSeleccionado) {
      this.usuario = this.userService.usuarioSeleccionado;
    }
  }

  guardar() {
    this.userService.actualizarUsuario(this.usuario.id, this.usuario).subscribe(async res => {
      const toast = await this.toastController.create({
        message: 'Usuario actualizado',
        duration: 2000,
        color: 'success'
      });
      toast.present();
      this.navCtrl.back();
    });
  }
}
