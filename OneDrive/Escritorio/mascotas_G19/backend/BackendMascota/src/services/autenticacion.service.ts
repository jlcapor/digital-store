import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import { UsuarioRepository } from '../repositories/usuario.repository';
import {Llaves} from '../config/llaves';
import generatePassword from 'password-generator';
import { Usuario } from '../models/usuario.model';
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
  ) {}

  /*
   * Add service methods here
   */
  generarClave() {
    let clave = generatePassword(8, false);
    return clave;
  }

  cifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  identificarUsuario(usuario: string, clave: string) {
    try {
      let p = this.usuarioRepository.findOne({
        where: {correo: usuario, clave: clave},
      });
      if (p) {
        return p;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  generarTokenJWT(usuario: Usuario) {
    let token = jwt.sign(
      {
        data: {
          id: usuario.id,
          correo: usuario.correo,
          nombre: usuario.nombre,
        },
      },
      Llaves.claveJWT,
    );
    return token;
  }

  validarToken(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch (error) {
      return false;
    }
  }
}
