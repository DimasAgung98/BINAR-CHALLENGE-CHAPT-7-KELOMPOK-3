'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  class game_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      game_user.hasMany(models.game_room, {
        foreignKey: "p1_id",
        onDelete: "SET NULL",
      });
      game_user.hasMany(models.game_room, {
        foreignKey: "p2_id",
        onDelete: "SET NULL",
      });
    }

    static #encrypt(password) {
      return bcrypt.hashSync(password, 10)
    }

    static register = async ({
      username,
      password
    }) => {
      const encryptedPassword = this.#encrypt(password)
      return await this.create({
        username,
        password: encryptedPassword,
        asAdmin: false
      })
    }

    checkPassword = (password) => bcrypt.compareSync(password, this.password)
    
    generateToken = () => {
      const payload = {
        id: this.id,
        username: this.username,
      }
      const secret = 'iniadalahpasswordtoken'
      const token = jwt.sign(payload, secret)
      return token
    }
    
    static authenticate = async ({
      username,
      password
    }) => {
      try {
        const dataUser = await this.findOne({
          where: {
            username
          }
        })
        if (!dataUser) return Promise.reject('User not found!')

        const isPasswordValid = dataUser.checkPassword(password)
        if (!isPasswordValid) return Promise.reject('Wrong password!')

        return Promise.resolve(dataUser)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
  game_user.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    asAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'game_user',
  });
  return game_user;
};