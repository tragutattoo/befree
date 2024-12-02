const Role = require('../models/role');

// Criar uma nova função
exports.createRole = async (req, res) => {
    try {
        const { name } = req.body;

        const role = new Role({ name });
        await role.save();

        return res.status(201).json({ message: 'Função criada com sucesso!', role });
    } catch (error) {
        console.error('Erro ao criar função:', error);
        return res.status(500).json({ message: 'Erro no servidor', error });
    }
};

// Listar todas as funções
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        return res.status(200).json({ roles });
    } catch (error) {
        console.error('Erro ao listar funções:', error);
        return res.status(500).json({ message: 'Erro no servidor', error });
    }
};
