const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const User = require('../models/user')

const login = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({ message: 'E-mail ou senha inválidos.' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'E-mail ou senha inválidos.' })
        }

        const token = jwt.sign(
            {id: user._id, email: user.email},
            process.env.JWT_SECRET || 'secreta-trocar',
            {expiresIn: '1h'}
        )

        return res.status(200).json({message: "Login bem sucedido", token})
    } catch (err) {
        console.error("erro no login", err)
        return res.status(500).json({message: "Erro no servidor", err})
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const createUser = async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const {name, email, password, dateOfBirth, roles, cpf, phone, address} = req.body

        // Validação de email
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({ message: 'Este email já está em uso.' })
        }

        // Verificar se o CPF já está cadastrado
        if (cpf) {
            const existingCpf = await User.findOne({ cpf });
            if (existingCpf) {
                return res.status(400).json({ message: 'CPF já cadastrado' });
            }
        }

        // Processar a foto de perfil
        const profilePicture = req.file
            ? {
                  data: req.file.buffer,
                  contentType: req.file.mimetype,
              }
            : undefined;

        // Criar e salvar novo usuario
        const newUser = new User({name,
            email,
            password,
            dateOfBirth,
            roles, // Deve ser o ID de uma função existente
            cpf,
            profilePicture,
            phone,
            address,})
        await newUser.save()

        res.status(201).json({message: 'Usuario cadastrado com sucesso', user: newUser})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getAllUsers,
    createUser,
    login,
}