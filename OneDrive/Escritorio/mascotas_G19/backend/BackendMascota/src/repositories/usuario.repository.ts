import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Mascota, Rol, RolUsuario} from '../models';
import {MascotaRepository} from './mascota.repository';
import {RolUsuarioRepository} from './rol-usuario.repository';
import {RolRepository} from './rol.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Usuario.prototype.id>;

  public readonly roles: HasManyThroughRepositoryFactory<Rol, typeof Rol.prototype.id,
          RolUsuario,
          typeof Usuario.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('RolUsuarioRepository') protected rolUsuarioRepositoryGetter: Getter<RolUsuarioRepository>, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Usuario, dataSource);
    this.roles = this.createHasManyThroughRepositoryFactoryFor('roles', rolRepositoryGetter, rolUsuarioRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
  }
}
