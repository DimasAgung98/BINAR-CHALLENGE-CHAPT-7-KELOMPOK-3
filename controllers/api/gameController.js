//IMPORT DB
const { Result } = require('express-validator')
const {
    game_user,
    game_history,
    game_room
} = require('../../models')

module.exports = {
        //FUNCTION CREATE ROOM
        createRoom: async (req, res) => {
            try {
                const roomExist = await game_room.findOne({
                    where: {
                        room_name: req.body.room_name
                    }
                })
                //CHECK ROOM FULL OR NOT
                if(roomExist) return res.status(200).json({
                    room_name: req.body.room_name,
                    msg: 'ROOM NAME ALREADY USED'
                })
                //PLAYER INPUT USING FK P1_ID ON DB
                const playerInput = {
                    room_name: req.body.room_name,
                    p1_id: req.user.id,
                    p2_id: null
                }
                //CREATE A NEW ROOM
                const newRoom = await game_room.create(playerInput)

                //ROUND ON ROOM
                round = 1
                while (round <= 3) {
                    //CREATE DATA ON GAME_HISTORY ON DB
                    await game_history.create({
                            room_id: newRoom.id,
                            p1_pick: null,
                            p2_pick: null,
                            round: round,
                            round_winner: null
                        })
                        //INCREASED NUMBER OF ROUND
                        .then(() => round = round + 1)
                }
                //SHOW GAME ROUND
                const gameRound = await game_history.findAll({
                    where: {
                        room_id: newRoom.id
                    },
                    include: {
                        model: game_room
                    }
                })
                res.status(200).json(gameRound)
            } 
            catch (error) {
                res.status(500).json({
                    msg: 'CREATE ROOM METHOD ERROR'
                })
            }
        },
        // FUNCTION VIEW ROOM
        viewRoom: async (req, res) => {
            try {//FIND ROOM BY ID
                const detail = await game_room.findOne({ where: { id: req.params.id }})
                //CHECK ALREADY PLAYER ON ROOM
                const player_detail = [
                    await game_user.findOne({
                        where: { id: detail.p1_id },
                        attributes : ['id', 'username']
                    }),
                    await game_user.findOne({
                        where: { id: detail.p2_id },
                        attributes : ['id', 'username']
                    })
                ]
                res.status(200).json(player_detail)
            } catch (error) {
                res.status(500).json('VIEW ROOM METHOD ERROR')
            }
        },
        // FUNCTION JOIN ROOM
        joinRoom: async(req, res) => {
            try {
                const findRoom = await game_room.findOne({ where: { room_name: req.body.room_name }})
                // IF ROOM NOT EXIST
                if(!findRoom) {
                    return res.status(400).json({
                        msg: 'ROOM NOT FOUND'
                    })
                }
                //IF ALREADY JOIN ROOM
                //CHECK IF DATA USER ALREADY ON ROOM
                if (findRoom.p1_id == req.user.id || findRoom.p2_id == req.user.id ) {
                    return res.status(200).json({
                        id: req.user.id,
                        username: req.user.username,
                        msg: 'YOU ALREADY JOIN THIS ROOM'
                    })
                }
                //IF ROOM FULL
                //IF P2_ID FIELD FULLFILED
                if (findRoom.p2_id) {
                    return res.status(200).json({
                        room_name: findRoom.room_name,
                        msg: 'ROOM IS FULL'
                    })
                }
                //GET INPUT FROM PLAYER 2 TO JOIN A ROOM
                const input = {
                    p2_id: req.user.id
                }
                //UPDATE P2_ID ON GAME_ROOM
                await game_room.update(input, { where: { room_name: findRoom.room_name } })
                .then( Result => {
                    res.status(200).json({
                        msg: 'JOIN SUCCESS'
                    })
                })
            } catch (error) {
                res.status(500).json(
                    {
                        msg: 'JOIN ROOM METHOD ERROR'
                    }
                )
            }
        },
        // FUNCTION GAME ROOM AND FIGHT
        fightRoom: async (req, res) => {
            //USER INPUT
            
        }
    }